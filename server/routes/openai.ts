import { RequestHandler } from "express";
import { ChatRequest, ChatResponse } from "@shared/api";

// Generate intelligent fallback responses when AI is not available
function generateFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm here to help you practice English. While I'm having some technical difficulties connecting to the full AI system, I can still guide your learning. What specific area would you like to work on - conversation, grammar, pronunciation, or vocabulary?";
  }

  if (message.includes('interview')) {
    return "Great! Interview practice is important. Here are some common interview questions to consider: 'Tell me about yourself', 'Why do you want this job?', and 'What are your strengths?' Would you like to practice answering any of these?";
  }

  if (message.includes('grammar') || message.includes('grammer')) {
    return "I'd be happy to help with grammar! Some key areas to focus on include verb tenses, articles (a, an, the), and sentence structure. What specific grammar topic would you like to practice?";
  }

  if (message.includes('pronunciation') || message.includes('speaking')) {
    return "Pronunciation practice is excellent for improving your speaking skills. Try reading aloud, practicing tongue twisters, and focusing on difficult sounds. What specific pronunciation challenges are you facing?";
  }

  if (message.includes('vocabulary') || message.includes('words')) {
    return "Building vocabulary is crucial for English fluency. I recommend reading regularly, keeping a vocabulary journal, and using new words in sentences. What topics or word types interest you most?";
  }

  // Default response
  return "I understand you'd like to practice English. While I'm experiencing some technical difficulties, I can still help guide your learning. Could you tell me more about what specific aspect of English you'd like to work on today?";
}

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

      // Provide an intelligent fallback response based on the user's message
      const userMessage = messages[messages.length - 1]?.content || "";
      const fallbackResponse = generateFallbackResponse(userMessage);

      return res.status(200).json({
        success: true,
        response: fallbackResponse,
        error: "AI service temporarily unavailable - using fallback mode",
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
