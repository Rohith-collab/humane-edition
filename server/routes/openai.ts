import { RequestHandler } from "express";
import { ChatRequest, ChatResponse } from "@shared/api";

export const handleChat: RequestHandler = async (req, res) => {
  try {
    console.log(
      "Chat API called with body:",
      JSON.stringify(req.body, null, 2),
    );

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
      });
    }

    const azureApiKey = process.env.AZURE_OPENAI_API_KEY;
    const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;

    if (!azureApiKey || !azureEndpoint) {
      console.error("Missing required environment variables");
      return res.status(500).json({
        success: false,
        error: "Server configuration error",
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

    res.status(500).json({
      success: false,
      error: `Failed to get response from AI: ${errorMessage}`,
      response: "Sorry, I could not process that right now. Please try again.",
    } as ChatResponse);
  }
};
