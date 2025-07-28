import { RequestHandler } from "express";
import { ChatRequest, ChatResponse, EmotionContext } from "@shared/api";

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const {
      messages,
      temperature = 0.7,
      max_tokens = 800,
      emotionData,
    } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Messages array is required",
      });
    }

    const response = await fetch(
      "https://yogar-mcyatzzl-eastus2.services.ai.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2023-07-01-preview",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "A8JgTwbZlu9NaV4GHr33zkdjYf9GDtrLQwnHtHdlYtoOG4HCYlTSJQQJ99BGACHYHv6XJ3w3AAAAACOGRv2n",
        },
        body: JSON.stringify({
          messages,
          temperature,
          max_tokens,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`Azure API responded with status: ${response.status}`);
    }

    const data = await response.json();
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

    res.json(responseData);
  } catch (error) {
    console.error("Azure OpenAI Error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get response from AI",
      response: "Sorry, I could not process that right now.",
      emotionDetected: false,
    } as ChatResponse);
  }
};
