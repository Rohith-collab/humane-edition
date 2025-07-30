import { RequestHandler } from "express";
import { ChatRequest, ChatResponse, EmotionContext } from "@shared/api";

// Response cleaning and validation utilities
const cleanResponse = (text: string): string => {
  if (!text || typeof text !== 'string') {
    return "I apologize, but I'm having trouble generating a response right now.";
  }

  return text
    // Remove undefined/null literals that may have been concatenated
    .replace(/undefined|null/gi, '')
    // Fix common encoding issues
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€\u009d/g, '"')
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Fix repeated characters (but not intentional ones like "sooo")
    .replace(/(.)\1{3,}/g, '$1$1')
    // Remove trailing punctuation repetition
    .replace(/([.!?]){2,}/g, '$1')
    // Ensure proper sentence spacing
    .replace(/\.\s*([a-z])/g, '. $1')
    // Remove any HTML tags that might have leaked through
    .replace(/<[^>]*>/g, '')
    // Trim and ensure proper ending
    .trim();
};

const validateResponse = (text: string): boolean => {
  // Check for minimum length
  if (!text || text.length < 5) return false;

  // Check for excessive repetition
  const words = text.split(' ');
  if (words.length < 3) return false;

  // Check for meaningful content (not just punctuation/numbers)
  const meaningfulContent = text.replace(/[^a-zA-Z]/g, '');
  if (meaningfulContent.length < 3) return false;

  return true;
};

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const {
      messages,
      temperature = 0.6, // Slightly lower for more precision
      max_tokens = 800,
      emotionData,
    } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Messages array is required",
      });
    }

    // Enhanced Azure OpenAI request with better parameters for precision
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
          // Additional parameters for better response quality
          top_p: 0.95,
          frequency_penalty: 0.1,
          presence_penalty: 0.1,
          stop: null,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Azure API Error: ${response.status} - ${errorText}`);
      throw new Error(`Azure API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Enhanced response extraction with validation
    let chatResponse = data.choices?.[0]?.message?.content;

    if (!chatResponse) {
      throw new Error("No valid response content received from Azure OpenAI");
    }

    // Clean and validate the response
    chatResponse = cleanResponse(chatResponse);

    if (!validateResponse(chatResponse)) {
      console.warn("Invalid response detected, using fallback");
      chatResponse = "I apologize, but I need to rephrase my response. Could you please repeat your question?";
    }

    // Prepare response with emotion awareness
    const responseData: ChatResponse = {
      success: true,
      response: chatResponse,
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
