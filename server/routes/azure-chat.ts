import { RequestHandler } from "express";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

interface AzureChatRequest {
  messages: Message[];
}

interface AzureChatResponse {
  response: string;
}

export const handleAzureChat: RequestHandler = async (req, res) => {
  let requestMessages: Message[] = [];

  try {
    const { messages }: AzureChatRequest = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Validate message structure
    for (const msg of messages) {
      if (!msg.role || !msg.content || typeof msg.content !== 'string') {
        return res.status(400).json({ error: "Invalid message format" });
      }
    }

    requestMessages = messages; // Store for fallback use

    // Azure OpenAI configuration - using the second API key with stable API version
    const azureEndpoint =
      "https://ai-yogarohith1858ai878864920350.cognitiveservices.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-05-15";
    const apiKey =
      "302XvXl4v76U3JzrAuHYkeY5KAnr9KbMx34f9r6DmiPKtLnGetH5JQQJ99BGACHYHv6XJ3w3AAAAACOGHyrF";

    console.log("Making request to AI service...");

    // Prepare the request payload
    const payload = {
      messages: [
        {
          role: "system" as const,
          content:
            "You are a helpful AI assistant. Be friendly, informative, and concise in your responses. Always respond in plain text without special formatting.",
        },
        ...messages,
      ],
      max_tokens: 800,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    // Make request to Azure OpenAI with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    const response = await fetch(azureEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();

    // Extract the response content with better validation
    const assistantMessage = data?.choices?.[0]?.message?.content;

    if (!assistantMessage || typeof assistantMessage !== 'string') {
      console.error("Invalid response structure:", JSON.stringify(data, null, 2));
      throw new Error("No valid response content from AI service");
    }

    // Clean up the response
    const cleanResponse = assistantMessage.trim();

    const chatResponse: AzureChatResponse = {
      response: cleanResponse,
    };

    res.json(chatResponse);
  } catch (error) {
    console.error("AI chat error:", error);

    // Provide a fallback response instead of returning an error
    const lastUserMessage = requestMessages.length > 0
      ? requestMessages[requestMessages.length - 1]?.content || "Hello"
      : "Hello";

    let fallbackResponse =
      "I'm sorry, I'm having trouble connecting to the AI service right now. ";

    // Simple fallback responses based on common patterns
    const lowerMessage = lastUserMessage.toLowerCase();
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      fallbackResponse +=
        "Hello! I'm here to help you. What can I assist you with today?";
    } else if (lowerMessage.includes("help")) {
      fallbackResponse +=
        "I'd be happy to help! Please try asking your question again in a moment.";
    } else if (lowerMessage.includes("what") || lowerMessage.includes("how")) {
      fallbackResponse +=
        "That's a great question! Let me try to assist you once my connection is restored.";
    } else {
      fallbackResponse +=
        "Please try your request again in a moment. I'm working to restore my connection to the AI service.";
    }

    res.json({ response: fallbackResponse });
  }
};
