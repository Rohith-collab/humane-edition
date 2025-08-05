import { RequestHandler } from "express";
import { ChatRequest, ChatResponse, EmotionContext } from "@shared/api";

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
      emotionData,
    } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error("Invalid messages array:", messages);
      return res.status(400).json({
        success: false,
        error: "Messages array is required",
      });
    }

    const azureApiKey =
      "A8JgTwbZlu9NaV4GHr33zkdjYf9GDtrLQwnHtHdlYtoOG4HCYlTSJQQJ99BGACHYHv6XJ3w3AAAAACOGRv2n";
    const azureEndpoint =
      "https://yogar-mcyatzzl-eastus2.services.ai.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2023-07-01-preview";

    console.log("Making request to Azure OpenAI...");

    const response = await fetch(azureEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": azureApiKey,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "you are a bot just reply in single line of single sentence",
          },
          ...messages,
        ],
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
      data.choices?.[0]?.message?.content || "No response from bot.";

    // Prepare response with emotion awareness
    const responseData: ChatResponse = {
      success: true,
      response: chatResponse.trim(),
      emotionDetected: emotionData?.faceDetected || false,
      emotionalResponse: emotionData?.emotionalContext || undefined,
    };

    // Log emotion data for monitoring (optional)
    if (emotionData?.faceDetected) {
      console.log("Emotion-aware response:", {
        emotion: emotionData.emotions.dominant,
        confidence: emotionData.emotions.confidence,
        context: emotionData.emotionalContext,
      });
    }

    console.log("Sending response:", responseData);
    res.json(responseData);
  } catch (error) {
    console.error("Azure OpenAI Error:", error);

    // More detailed error response
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    res.status(500).json({
      success: false,
      error: `Failed to get response from AI: ${errorMessage}`,
      response: "Sorry, I could not process that right now. Please try again.",
      emotionDetected: false,
    } as ChatResponse);
  }
};
