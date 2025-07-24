// Fallback emotion detection service for testing without face-api.js models
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

class FallbackEmotionDetectionService {
  private isInitialized = false;
  private videoElement: HTMLVideoElement | null = null;
  private stream: MediaStream | null = null;
  private detectionInterval: NodeJS.Timeout | null = null;
  private mockEmotionIndex = 0;

  // Mock emotions for testing
  private mockEmotions = [
    {
      dominant: "happy",
      confidence: 0.8,
      happy: 0.8,
      sad: 0.1,
      angry: 0.0,
      fearful: 0.0,
      disgusted: 0.0,
      surprised: 0.0,
      neutral: 0.1,
    },
    {
      dominant: "neutral",
      confidence: 0.7,
      happy: 0.2,
      sad: 0.1,
      angry: 0.0,
      fearful: 0.0,
      disgusted: 0.0,
      surprised: 0.0,
      neutral: 0.7,
    },
    {
      dominant: "sad",
      confidence: 0.6,
      happy: 0.1,
      sad: 0.6,
      angry: 0.1,
      fearful: 0.1,
      disgusted: 0.0,
      surprised: 0.0,
      neutral: 0.1,
    },
    {
      dominant: "surprised",
      confidence: 0.7,
      happy: 0.2,
      sad: 0.0,
      angry: 0.0,
      fearful: 0.1,
      disgusted: 0.0,
      surprised: 0.7,
      neutral: 0.0,
    },
    {
      dominant: "angry",
      confidence: 0.5,
      happy: 0.0,
      sad: 0.1,
      angry: 0.5,
      fearful: 0.2,
      disgusted: 0.1,
      surprised: 0.0,
      neutral: 0.1,
    },
  ];

  async initialize(): Promise<void> {
    console.log(
      "Using fallback emotion detection service (no models required)",
    );
    this.isInitialized = true;
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate loading time
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

    if (this.stream) {
      video.srcObject = this.stream;
    }
  }

  async detectEmotion(): Promise<FaceDetectionResult> {
    if (!this.videoElement || !this.isInitialized) {
      throw new Error("Emotion detection not properly initialized");
    }

    // Check if video is playing and has valid dimensions
    const hasValidVideo =
      this.videoElement.videoWidth > 0 && this.videoElement.videoHeight > 0;

    if (!hasValidVideo) {
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

    // Use mock emotions for demo
    const mockEmotion =
      this.mockEmotions[this.mockEmotionIndex % this.mockEmotions.length];
    this.mockEmotionIndex++;

    return {
      emotions: mockEmotion,
      faceDetected: true,
      timestamp: Date.now(),
    };
  }

  startContinuousDetection(
    callback: (result: FaceDetectionResult) => void,
    interval: number = 3000,
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

export const fallbackEmotionDetectionService =
  new FallbackEmotionDetectionService();
