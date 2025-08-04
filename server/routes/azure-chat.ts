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

    // Azure OpenAI configuration - using the second API key with stable API version
    const azureEndpoint = "https://ai-yogarohith1858ai878864920350.cognitiveservices.azure.com/openai/deployments/gpt-35-turbo/chat/completions?api-version=2023-05-15";
    const apiKey = "302XvXl4v76U3JzrAuHYkeY5KAnr9KbMx34f9r6DmiPKtLnGetH5JQQJ99BGACHYHv6XJ3w3AAAAACOGHyrF";

    console.log('Making request to Azure OpenAI...');
    console.log('Endpoint:', azureEndpoint);
    console.log('API Key (first 10 chars):', apiKey.substring(0, 10) + '...');

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

    // Provide a fallback response instead of returning an error
    const lastUserMessage = messages[messages.length - 1]?.content || "Hello";

    let fallbackResponse = "I'm sorry, I'm having trouble connecting to Azure OpenAI right now. ";

    // Simple fallback responses based on common patterns
    if (lastUserMessage.toLowerCase().includes('hello') || lastUserMessage.toLowerCase().includes('hi')) {
      fallbackResponse += "Hello! I'm here to help you. What can I assist you with today?";
    } else if (lastUserMessage.toLowerCase().includes('help')) {
      fallbackResponse += "I'd be happy to help! Please try asking your question again in a moment.";
    } else if (lastUserMessage.toLowerCase().includes('what') || lastUserMessage.toLowerCase().includes('how')) {
      fallbackResponse += "That's a great question! Let me try to assist you once my connection is restored.";
    } else {
      fallbackResponse += "Please try your request again in a moment. I'm working to restore my connection to Azure OpenAI.";
    }

    res.json({ response: fallbackResponse });
  }
};
