import { RequestHandler } from "express";
import { ChatRequest, ChatResponse } from "@shared/api";

export const handleChat: RequestHandler = async (req, res) => {
  const startTime = Date.now();
  
  try {
    console.log("=== CHAT API REQUEST START ===");
    console.log("Timestamp:", new Date().toISOString());
    console.log("Request method:", req.method);
    console.log("Request headers:", JSON.stringify(req.headers, null, 2));
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    // Validate request method
    if (req.method !== "POST") {
      console.error("Invalid method:", req.method);
      return res.status(405).json({
        success: false,
        error: "Method not allowed. Use POST.",
        response: "Invalid request method.",
      } as ChatResponse);
    }

    // Validate request body exists
    if (!req.body) {
      console.error("Request body is missing");
      return res.status(400).json({
        success: false,
        error: "Request body is required",
        response: "Please provide a valid request body.",
      } as ChatResponse);
    }

    // Extract and validate request data
    let messages: any, temperature: number, max_tokens: number;
    
    try {
      const extracted = req.body as ChatRequest;
      messages = extracted.messages;
      temperature = extracted.temperature ?? 0.7;
      max_tokens = extracted.max_tokens ?? 800;
      
      console.log("Extracted parameters:", {
        messagesCount: Array.isArray(messages) ? messages.length : 'not array',
        temperature,
        max_tokens
      });
    } catch (extractError) {
      console.error("Error extracting request parameters:", extractError);
      return res.status(400).json({
        success: false,
        error: "Invalid request format",
        response: "Request body format is invalid.",
      } as ChatResponse);
    }

    // Validate messages array
    if (!messages || !Array.isArray(messages)) {
      console.error("Messages is not an array:", typeof messages, messages);
      return res.status(400).json({
        success: false,
        error: "Messages must be an array",
        response: "Please provide a valid messages array.",
      } as ChatResponse);
    }

    if (messages.length === 0) {
      console.error("Messages array is empty");
      return res.status(400).json({
        success: false,
        error: "Messages array cannot be empty",
        response: "Please provide at least one message.",
      } as ChatResponse);
    }

    // Validate each message structure
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (!message.role || !message.content) {
        console.error(`Invalid message at index ${i}:`, message);
        return res.status(400).json({
          success: false,
          error: `Message at index ${i} is missing role or content`,
          response: "All messages must have role and content.",
        } as ChatResponse);
      }
      
      if (!["system", "user", "assistant"].includes(message.role)) {
        console.error(`Invalid role at index ${i}:`, message.role);
        return res.status(400).json({
          success: false,
          error: `Invalid role "${message.role}" at message ${i}. Must be system, user, or assistant.`,
          response: "Message role must be system, user, or assistant.",
        } as ChatResponse);
      }
    }

    // Validate temperature and max_tokens
    if (typeof temperature !== "number" || temperature < 0 || temperature > 2) {
      console.error("Invalid temperature:", temperature);
      return res.status(400).json({
        success: false,
        error: "Temperature must be a number between 0 and 2",
        response: "Invalid temperature parameter.",
      } as ChatResponse);
    }

    if (typeof max_tokens !== "number" || max_tokens < 1 || max_tokens > 4000) {
      console.error("Invalid max_tokens:", max_tokens);
      return res.status(400).json({
        success: false,
        error: "max_tokens must be a number between 1 and 4000",
        response: "Invalid max_tokens parameter.",
      } as ChatResponse);
    }

    // Azure OpenAI configuration
    const azureApiKey = process.env.AZURE_OPENAI_API_KEY || 
      "302XvXl4v76U3JzrAuHYkeY5KAnr9KbMx34f9r6DmiPKtLnGetH5JQQJ99BGACHYHv6XJ3w3AAAAACOGHyrF";
    
    const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT ||
      "https://ai-yogarohith1858ai878864920350.cognitiveservices.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2025-01-01-preview";

    // Check if Azure credentials are available
    if (!azureApiKey) {
      console.error("Azure API key is missing");
      return res.status(500).json({
        success: false,
        error: "Azure OpenAI API key is not configured",
        response: "Service configuration error. Please contact support.",
      } as ChatResponse);
    }

    if (!azureEndpoint) {
      console.error("Azure endpoint is missing");
      return res.status(500).json({
        success: false,
        error: "Azure OpenAI endpoint is not configured",
        response: "Service configuration error. Please contact support.",
      } as ChatResponse);
    }

    console.log("=== AZURE OPENAI REQUEST ===");
    console.log("Endpoint:", azureEndpoint);
    console.log("API Key present:", !!azureApiKey);
    console.log("API Key length:", azureApiKey ? azureApiKey.length : 0);
    console.log("Request payload:", JSON.stringify({
      messages,
      temperature,
      max_tokens,
    }, null, 2));

    // Make request to Azure OpenAI
    let response: Response;
    try {
      response = await fetch(azureEndpoint, {
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
      
      console.log("Azure response status:", response.status);
      console.log("Azure response headers:", JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));
      
    } catch (fetchError) {
      console.error("=== FETCH ERROR ===");
      console.error("Fetch failed:", fetchError);
      console.error("Error type:", typeof fetchError);
      console.error("Error name:", fetchError instanceof Error ? fetchError.name : 'unknown');
      console.error("Error message:", fetchError instanceof Error ? fetchError.message : 'unknown');
      
      return res.status(500).json({
        success: false,
        error: "Network error connecting to Azure OpenAI",
        response: "Unable to connect to AI service. Please try again later.",
      } as ChatResponse);
    }

    // Handle non-200 responses
    if (!response.ok) {
      let errorDetails: string;
      let errorBody: any;
      
      try {
        const errorText = await response.text();
        errorDetails = errorText;
        
        // Try to parse as JSON for more details
        try {
          errorBody = JSON.parse(errorText);
        } catch {
          errorBody = { raw: errorText };
        }
      } catch (textError) {
        console.error("Error reading response text:", textError);
        errorDetails = "Could not read error response";
        errorBody = {};
      }

      console.error("=== AZURE API ERROR ===");
      console.error("Status:", response.status);
      console.error("Status text:", response.statusText);
      console.error("Error body:", errorBody);
      console.error("Error details:", errorDetails);

      // Handle specific error cases
      if (response.status === 401) {
        return res.status(500).json({
          success: false,
          error: "Azure OpenAI authentication failed",
          response: "Service authentication error. Please contact support.",
        } as ChatResponse);
      } else if (response.status === 403) {
        return res.status(500).json({
          success: false,
          error: "Azure OpenAI access forbidden",
          response: "Service access error. Please contact support.",
        } as ChatResponse);
      } else if (response.status === 429) {
        return res.status(429).json({
          success: false,
          error: "Rate limit exceeded",
          response: "Too many requests. Please wait a moment and try again.",
        } as ChatResponse);
      } else if (response.status >= 500) {
        return res.status(500).json({
          success: false,
          error: "Azure OpenAI service error",
          response: "AI service is temporarily unavailable. Please try again later.",
        } as ChatResponse);
      } else {
        return res.status(400).json({
          success: false,
          error: `Azure API error: ${response.status} - ${response.statusText}`,
          response: "Request could not be processed. Please check your message and try again.",
        } as ChatResponse);
      }
    }

    // Parse successful response
    let data: any;
    try {
      data = await response.json();
      console.log("=== AZURE RESPONSE SUCCESS ===");
      console.log("Response data:", JSON.stringify(data, null, 2));
    } catch (parseError) {
      console.error("=== JSON PARSE ERROR ===");
      console.error("Error parsing Azure response JSON:", parseError);
      return res.status(500).json({
        success: false,
        error: "Invalid response format from Azure OpenAI",
        response: "Service returned invalid data. Please try again.",
      } as ChatResponse);
    }

    // Extract chat response
    const chatResponse = data.choices?.[0]?.message?.content;
    
    if (!chatResponse) {
      console.error("=== MISSING RESPONSE CONTENT ===");
      console.error("Azure response structure:", JSON.stringify(data, null, 2));
      return res.status(500).json({
        success: false,
        error: "No response content from Azure OpenAI",
        response: "AI service did not return a response. Please try again.",
      } as ChatResponse);
    }

    // Success response
    const responseData: ChatResponse = {
      success: true,
      response: chatResponse.trim(),
    };

    const endTime = Date.now();
    console.log("=== CHAT API SUCCESS ===");
    console.log("Response data:", responseData);
    console.log("Processing time:", (endTime - startTime), "ms");
    console.log("=== CHAT API REQUEST END ===");

    return res.status(200).json(responseData);

  } catch (error) {
    const endTime = Date.now();
    
    console.error("=== UNHANDLED ERROR IN CHAT API ===");
    console.error("Processing time:", (endTime - startTime), "ms");
    console.error("Error type:", typeof error);
    console.error("Error constructor:", error?.constructor?.name);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    console.error("Full error object:", error);
    console.error("Request details:", {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body
    });

    // Extract meaningful error message
    let errorMessage = "Unknown server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else if (error && typeof error === "object") {
      errorMessage = JSON.stringify(error);
    }

    return res.status(500).json({
      success: false,
      error: `Server error: ${errorMessage}`,
      response: "An unexpected error occurred. Please try again later.",
    } as ChatResponse);
  }
};
