/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Emotion Detection Types
 */
export interface EmotionData {
  happy: number;
  sad: number;
  angry: number;
  fearful: number;
  disgusted: number;
  surprised: number;
  neutral: number;
  dominant: string;
  confidence: number;
}

export interface EmotionContext {
  faceDetected: boolean;
  emotions: EmotionData;
  timestamp: number;
  emotionalContext: string;
}

/**
 * Chat API types
 */
export interface ChatRequest {
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
  emotionData?: EmotionContext;
}

export interface ChatResponse {
  response: string;
  success: boolean;
  error?: string;
  emotionDetected?: boolean;
  emotionalResponse?: string;
}
