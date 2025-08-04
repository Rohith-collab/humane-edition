import { RequestHandler } from "express";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface AzureChatRequest {
  messages: Message[];
}

interface AzureChatResponse {
  response: string;
}

export const handleAzureChat: RequestHandler = async (req, res) => {
  try {
    const { messages }: AzureChatRequest = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Azure OpenAI configuration - try the second API key
    const azureEndpoint = "https://ai-yogarohith1858ai878864920350.cognitiveservices.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2024-02-15-preview";
    const apiKey = "302XvXl4v76U3JzrAuHYkeY5KAnr9KbMx34f9r6DmiPKtLnGetH5JQQJ99BGACHYHv6XJ3w3AAAAACOGHyrF";

    // Prepare the request payload
    const payload = {
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant powered by Azure OpenAI GPT-3.5 Turbo. Be friendly, informative, and concise in your responses."
        },
        ...messages
      ],
      max_tokens: 500,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    // Make request to Azure OpenAI
    const response = await fetch(azureEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure OpenAI API error:', response.status, errorText);
      throw new Error(`Azure OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response content
    const assistantMessage = data.choices?.[0]?.message?.content;
    
    if (!assistantMessage) {
      throw new Error('No response content from Azure OpenAI');
    }

    const chatResponse: AzureChatResponse = {
      response: assistantMessage
    };

    res.json(chatResponse);

  } catch (error) {
    console.error("Azure chat error:", error);
    
    if (error instanceof Error) {
      res.status(500).json({ 
        error: "Failed to get response from Azure OpenAI",
        details: error.message 
      });
    } else {
      res.status(500).json({ 
        error: "An unexpected error occurred" 
      });
    }
  }
};
