import { RequestHandler } from "express";
import { ChatRequest, ChatResponse } from "@shared/api";

export const handleChat: RequestHandler = async (req, res) => {
  try {
    console.log("=== CHAT API CALLED ===");
    console.log("Method:", req.method);
    console.log("Headers:", req.headers);
    console.log("Body:", JSON.stringify(req.body, null, 2));

    const {
      messages,
      temperature = 0.7,
      max_tokens = 800,
    } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error("Invalid messages array:", messages);
      return res.status(400).json({
        success: false,
        error: "Messages array is required",
        response: "Please provide a valid message to continue the conversation.",
      });
    }

    const azureApiKey = process.env.AZURE_OPENAI_API_KEY;
    const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;

    console.log("Environment check:");
    console.log("- AZURE_OPENAI_API_KEY:", azureApiKey ? "SET" : "MISSING");
    console.log("- AZURE_OPENAI_ENDPOINT:", azureEndpoint ? "SET" : "MISSING");

    if (!azureApiKey || !azureEndpoint || azureApiKey === "your_api_key_here") {
      console.error("Missing or invalid Azure OpenAI environment variables");
      return res.status(500).json({
        success: false,
        error: "Server configuration error - Azure OpenAI not configured",
        response: "I understand you're trying to chat with me. While I'm experiencing some technical difficulties connecting to the AI service, I can still help you practice. What would you like to work on today?",
      });
    }

    console.log("Making request to Azure OpenAI...");

    const response = await fetch(azureEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": azureApiKey,
      },
      body: JSON.stringify({
        messages,
        temperature,
        max_tokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Azure API error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Azure API responded with status: ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();
    console.log("Azure OpenAI response:", data);

    const chatResponse =
      data.choices?.[0]?.message?.content || "No response from AI.";

    const responseData: ChatResponse = {
      success: true,
      response: chatResponse.trim(),
    };

    console.log("Sending response:", responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Azure OpenAI Error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Provide a helpful fallback response instead of just an error
    const fallbackResponse = "I understand you'd like to practice. While I'm having some technical difficulties, I can still help guide your learning. What specific area would you like to work on - speaking, listening, grammar, or conversation skills?";

    res.status(200).json({
      success: true,
      response: fallbackResponse,
      error: `Technical issue: ${errorMessage}`,
    } as ChatResponse);
  }
};
