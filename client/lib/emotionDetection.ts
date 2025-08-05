// Emotion Detection Service using face-api.js
// Note: Fallback service available in emotionDetectionFallback.ts

// Dynamic import to handle optional dependency
let faceapi: any = null;

async function loadFaceApi() {
  try {
    faceapi = await import('face-api.js');
    return faceapi;
  } catch (error) {
    console.warn('face-api.js not available, using fallback detection');
    return null;
  }
}

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

export interface FaceDetectionResult {
  emotions: EmotionData;
  faceDetected: boolean;
  timestamp: number;
}

class EmotionDetectionService {
  private isInitialized = false;
  private videoElement: HTMLVideoElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private stream: MediaStream | null = null;
  private detectionInterval: NodeJS.Timeout | null = null;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Load face-api.js dynamically
      faceapi = await loadFaceApi();

      if (!faceapi) {
        console.warn("Using fallback emotion detection");
        this.isInitialized = true;
        return;
      }

      // Load face-api.js models
      const MODEL_URL = "/models"; // You'll need to add face-api.js models to public/models

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);

      this.isInitialized = true;
      console.log("Emotion detection models loaded successfully");
    } catch (error) {
      console.error("Failed to load emotion detection models:", error);
      this.isInitialized = true; // Continue with fallback
    }
  }

  async startWebcam(): Promise<MediaStream> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user",
        },
        audio: false,
      });

      return this.stream;
    } catch (error) {
      console.error("Failed to access webcam:", error);
      throw new Error("Webcam access denied");
    }
  }

  attachVideoElement(video: HTMLVideoElement, canvas: HTMLCanvasElement): void {
    this.videoElement = video;
    this.canvas = canvas;

    if (this.stream) {
      video.srcObject = this.stream;
    }
  }

  async detectEmotion(): Promise<FaceDetectionResult> {
    if (!this.videoElement || !this.canvas || !this.isInitialized) {
      throw new Error("Emotion detection not properly initialized");
    }

    try {
      // Detect face and expressions
      const detection = await faceapi
        .detectSingleFace(
          this.videoElement,
          new faceapi.TinyFaceDetectorOptions(),
        )
        .withFaceLandmarks()
        .withFaceExpressions();

      if (!detection) {
        return {
          emotions: {
            happy: 0,
            sad: 0,
            angry: 0,
            fearful: 0,
            disgusted: 0,
            surprised: 0,
            neutral: 1,
            dominant: "neutral",
            confidence: 0,
          },
          faceDetected: false,
          timestamp: Date.now(),
        };
      }

      const expressions = detection.expressions;

      // Find dominant emotion
      const emotions = {
        happy: expressions.happy,
        sad: expressions.sad,
        angry: expressions.angry,
        fearful: expressions.fearful,
        disgusted: expressions.disgusted,
        surprised: expressions.surprised,
        neutral: expressions.neutral,
        dominant: "",
        confidence: 0,
      };

      // Determine dominant emotion
      let maxValue = 0;
      let dominantEmotion = "neutral";

      Object.entries(expressions).forEach(([emotion, value]) => {
        if (value > maxValue) {
          maxValue = value;
          dominantEmotion = emotion;
        }
      });

      emotions.dominant = dominantEmotion;
      emotions.confidence = maxValue;

      return {
        emotions,
        faceDetected: true,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error("Emotion detection failed:", error);
      return {
        emotions: {
          happy: 0,
          sad: 0,
          angry: 0,
          fearful: 0,
          disgusted: 0,
          surprised: 0,
          neutral: 1,
          dominant: "neutral",
          confidence: 0,
        },
        faceDetected: false,
        timestamp: Date.now(),
      };
    }
  }

  startContinuousDetection(
    callback: (result: FaceDetectionResult) => void,
    interval: number = 2000,
  ): void {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
    }

    this.detectionInterval = setInterval(async () => {
      try {
        const result = await this.detectEmotion();
        callback(result);
      } catch (error) {
        console.error("Continuous emotion detection error:", error);
      }
    }, interval);
  }

  stopContinuousDetection(): void {
    if (this.detectionInterval) {
      clearInterval(this.detectionInterval);
      this.detectionInterval = null;
    }
  }

  stopWebcam(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }

    this.stopContinuousDetection();
  }

  // Analyze emotional context for AI response
  analyzeEmotionalContext(emotions: EmotionData): string {
    const { dominant, confidence } = emotions;

    if (confidence < 0.3) {
      return "I notice you're here with me. How are you feeling right now?";
    }

    switch (dominant) {
      case "sad":
        return "I can see you seem a bit down. Would you like to talk about what's bothering you? I'm here to listen and help.";
      case "angry":
        return "I sense you might be feeling frustrated or upset. Sometimes it helps to talk through these feelings. What's on your mind?";
      case "fearful":
        return "You seem worried or anxious about something. Take a deep breath - I'm here to support you. What's causing you concern?";
      case "surprised":
        return "You look surprised! Did something unexpected happen? I'd love to hear about it.";
      case "happy":
        return "I can see you're in a good mood! That's wonderful. What's making you happy today?";
      case "disgusted":
        return "You seem bothered by something. Want to talk about what's troubling you?";
      default:
        return "I'm here and ready to chat with you. What would you like to explore today?";
    }
  }

  // Format emotion data for backend
  formatEmotionData(result: FaceDetectionResult): any {
    return {
      faceDetected: result.faceDetected,
      emotions: result.emotions,
      timestamp: result.timestamp,
      emotionalContext: this.analyzeEmotionalContext(result.emotions),
    };
  }
}

// Use fallback service for immediate testing
// export const emotionDetectionService = new EmotionDetectionService();
import { fallbackEmotionDetectionService } from "./emotionDetectionFallback";
export const emotionDetectionService = fallbackEmotionDetectionService;
