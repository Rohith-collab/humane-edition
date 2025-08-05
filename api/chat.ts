import { VercelRequest, VercelResponse } from '@vercel/node';
import { ChatRequest, ChatResponse } from '../shared/api';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST requests are supported.',
    });
  }

  try {
    console.log('Vercel Chat API called with body:', JSON.stringify(req.body, null, 2));

    const {
      messages,
      temperature = 0.7,
      max_tokens = 800,
      emotionData,
    } = req.body as ChatRequest;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid messages array:', messages);
      return res.status(400).json({
        success: false,
        error: 'Messages array is required',
      });
    }

    const azureApiKey = process.env.AZURE_OPENAI_API_KEY || 
      'A8JgTwbZlu9NaV4GHr33zkdjYf9GDtrLQwnHtHdlYtoOG4HCYlTSJQQJ99BGACHYHv6XJ3w3AAAAACOGRv2n';
    const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT ||
      'https://yogar-mcyatzzl-eastus2.services.ai.azure.com/openai/deployments/gpt-4.1-mini/chat/completions?api-version=2023-07-01-preview';

    console.log('Making request to Azure OpenAI...');

    const response = await fetch(azureEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': azureApiKey,
      },
      body: JSON.stringify({
        messages: messages, // Use the messages exactly as sent from client
        temperature,
        max_tokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(
        `Azure API responded with status: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log('Azure OpenAI response:', data);

    const chatResponse = data.choices?.[0]?.message?.content || 'No response from bot.';

    // Prepare response with emotion awareness
    const responseData: ChatResponse = {
      success: true,
      response: chatResponse.trim(),
      emotionDetected: emotionData?.faceDetected || false,
      emotionalResponse: emotionData?.emotionalContext || undefined,
    };

    // Log emotion data for monitoring (optional)
    if (emotionData?.faceDetected) {
      console.log('Emotion-aware response:', {
        emotion: emotionData.emotions.dominant,
        confidence: emotionData.emotions.confidence,
        context: emotionData.emotionalContext,
      });
    }

    console.log('Sending response:', responseData);
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Azure OpenAI Error:', error);

    // More detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    res.status(500).json({
      success: false,
      error: `Failed to get response from AI: ${errorMessage}`,
      response: 'Sorry, I could not process that right now. Please try again.',
      emotionDetected: false,
    } as ChatResponse);
  }
}
