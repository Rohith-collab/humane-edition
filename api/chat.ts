import { VercelRequest, VercelResponse } from "@vercel/node";
import { ChatRequest, ChatResponse } from "../shared/api";

/**
 * ⚠️ CRITICAL: Environment Variables Required for Production
 *
 * This API endpoint will return 500 errors on Vercel if environment variables are not set.
 *
 * Required in Vercel Dashboard → Project Settings → Environment Variables:
 * - OPENAI_API_KEY (recommended)
 * - AZURE_OPENAI_API_KEY (fallback)
 * - AZURE_OPENAI_ENDPOINT (if using Azure)
 *
 * Set for BOTH Production and Preview environments.
 *
 * See VERCEL-DEPLOYMENT.md for complete setup instructions.
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("=== VERCEL API FUNCTION START ===");
    console.log("Environment variables status:", {
      OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
      AZURE_OPENAI_API_KEY: !!process.env.AZURE_OPENAI_API_KEY,
      AZURE_OPENAI_ENDPOINT: !!process.env.AZURE_OPENAI_ENDPOINT,
      NODE_ENV: process.env.NODE_ENV,
    });

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

    // Environment-based configuration with fallbacks
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const azureApiKey = process.env.AZURE_OPENAI_API_KEY ||
      "302XvXl4v76U3JzrAuHYkeY5KAnr9KbMx34f9r6DmiPKtLnGetH5JQQJ99BGACHYHv6XJ3w3AAAAACOGHyrF";
    const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT ||
      "https://ai-yogarohith1858ai878864920350.cognitiveservices.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2025-01-01-preview";

    const openaiEndpoint = "https://api.openai.com/v1/chat/completions";

    // Determine service priority: Environment OpenAI -> Environment Azure -> Fallback Azure
    const useOpenAI = openaiApiKey && !process.env.FORCE_AZURE;
    const useAzure = azureApiKey && (!useOpenAI || process.env.FORCE_AZURE);

    if (!useOpenAI && !useAzure) {
      console.error("No API keys available");
      return res.status(500).json({
        success: false,
        error: "API service not configured. Please set OPENAI_API_KEY or AZURE_OPENAI_API_KEY environment variables.",
        response: "Service configuration error. Please contact support.",
      });
    }

    console.log("=== API SERVICE SELECTION ===");
    console.log("Using service:", useOpenAI ? "OpenAI" : "Azure OpenAI");
    console.log("Has environment OPENAI_API_KEY:", !!openaiApiKey);
    console.log("Has environment AZURE keys:", !!process.env.AZURE_OPENAI_API_KEY);

    let response: Response;
    let usedService = "";

    // Try OpenAI first if available
    if (useOpenAI) {
      try {
        console.log("Attempting OpenAI request...");
        usedService = "OpenAI";

        response = await fetch(openaiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages,
            temperature,
            max_tokens,
          }),
        });

        console.log("OpenAI response status:", response.status);

        // If OpenAI fails with auth error, try Azure fallback
        if (!response.ok && (response.status === 401 || response.status === 403) && azureApiKey) {
          console.log("OpenAI auth failed, trying Azure fallback...");
          throw new Error("OpenAI auth failed, trying fallback");
        }
      } catch (openaiError) {
        if (azureApiKey) {
          console.log("OpenAI failed, falling back to Azure...");
          usedService = "Azure (Fallback)";

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
        } else {
          throw openaiError;
        }
      }
    } else {
      // Use Azure directly
      console.log("Using Azure OpenAI...");
      usedService = "Azure";

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
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${usedService} API error:`, {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });

      // Provide helpful error messages based on status
      if (response.status === 401 || response.status === 403) {
        return res.status(500).json({
          success: false,
          error: `${usedService} API authentication failed. Please check your API keys in Vercel environment variables.`,
          response: "API authentication error. Please contact support.",
        });
      } else if (response.status === 429) {
        return res.status(500).json({
          success: false,
          error: `${usedService} API rate limit exceeded.`,
          response: "Service is temporarily busy. Please try again in a moment.",
        });
      } else {
        throw new Error(
          `${usedService} API responded with status: ${response.status} - ${response.statusText}`,
        );
      }
    }

    const data = await response.json();
    console.log(`${usedService} response received:`, {
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length || 0,
      hasContent: !!data.choices?.[0]?.message?.content,
    });

    const chatResponse =
      data.choices?.[0]?.message?.content || "No response from AI.";

    const responseData: ChatResponse = {
      success: true,
      response: chatResponse.trim(),
    };

    console.log("=== SUCCESS ===");
    console.log("Service used:", usedService);
    console.log("Response length:", chatResponse.length);

    res.json(responseData);
  } catch (error) {
    console.error("=== API ERROR ===");
    console.error("Error details:", error);
    console.error("Error type:", typeof error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));

    // Environment diagnostic information
    console.error("Environment diagnostic:", {
      NODE_ENV: process.env.NODE_ENV,
      hasOpenAIKey: !!process.env.OPENAI_API_KEY,
      hasAzureKey: !!process.env.AZURE_OPENAI_API_KEY,
      hasAzureEndpoint: !!process.env.AZURE_OPENAI_ENDPOINT,
      vercelRegion: process.env.VERCEL_REGION,
      vercelUrl: process.env.VERCEL_URL,
    });

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    // Provide helpful error message based on the error
    let userMessage = "Sorry, I could not process that right now. Please try again.";
    let debugInfo = `Failed to get response from AI: ${errorMessage}`;

    if (errorMessage.includes("authentication") || errorMessage.includes("401") || errorMessage.includes("403")) {
      userMessage = "API authentication error. Please contact support.";
      debugInfo = "API key authentication failed. Check environment variables in Vercel Dashboard.";
    } else if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
      userMessage = "Network error. Please try again.";
      debugInfo = `Network request failed: ${errorMessage}`;
    }

    res.status(500).json({
      success: false,
      error: debugInfo,
      response: userMessage,
      // Add environment info in development
      ...(process.env.NODE_ENV === "development" && {
        debug: {
          hasOpenAIKey: !!process.env.OPENAI_API_KEY,
          hasAzureKey: !!process.env.AZURE_OPENAI_API_KEY,
          errorType: typeof error,
          originalError: errorMessage,
        }
      })
    } as ChatResponse);
  }
}
