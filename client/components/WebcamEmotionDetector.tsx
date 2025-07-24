import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Camera,
  CameraOff,
  Eye,
  EyeOff,
  Smile,
  Frown,
  Angry,
  Meh,
  AlertTriangle,
  Zap,
  Heart,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  emotionDetectionService,
  FaceDetectionResult,
  EmotionData,
} from "@/lib/emotionDetection";

interface WebcamEmotionDetectorProps {
  onEmotionDetected: (result: FaceDetectionResult) => void;
  isActive: boolean;
  className?: string;
}

// Emotion icon mapping
const emotionIcons = {
  happy: Smile,
  sad: Frown,
  angry: Angry,
  neutral: Meh,
  fearful: AlertTriangle,
  surprised: Zap,
  disgusted: EyeOff,
};

// Emotion colors
const emotionColors = {
  happy: "text-green-500",
  sad: "text-blue-500",
  angry: "text-red-500",
  neutral: "text-gray-500",
  fearful: "text-yellow-500",
  surprised: "text-purple-500",
  disgusted: "text-orange-500",
};

export const WebcamEmotionDetector: React.FC<WebcamEmotionDetectorProps> = ({
  onEmotionDetected,
  isActive,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentEmotion, setCurrentEmotion] =
    useState<FaceDetectionResult | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [error, setError] = useState<string>("");
  const [showPreview, setShowPreview] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);

  // Initialize emotion detection service
  useEffect(() => {
    const initService = async () => {
      try {
        await emotionDetectionService.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError("Failed to initialize emotion detection");
        console.error("Emotion detection init error:", err);
      }
    };

    initService();
  }, []);

  // Start webcam and emotion detection
  const startWebcam = async () => {
    if (!isInitialized) {
      setError("Emotion detection not initialized");
      return;
    }

    try {
      setError("");
      const stream = await emotionDetectionService.startWebcam();

      if (videoRef.current && canvasRef.current) {
        emotionDetectionService.attachVideoElement(
          videoRef.current,
          canvasRef.current,
        );
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        setIsWebcamActive(true);
        setPermissionGranted(true);

        // Start continuous emotion detection
        startEmotionDetection();
      }
    } catch (err) {
      setError("Failed to access webcam. Please allow camera permissions.");
      console.error("Webcam error:", err);
    }
  };

  // Stop webcam
  const stopWebcam = () => {
    emotionDetectionService.stopWebcam();
    setIsWebcamActive(false);
    setIsDetecting(false);
    setCurrentEmotion(null);
  };

  // Start emotion detection
  const startEmotionDetection = () => {
    setIsDetecting(true);
    emotionDetectionService.startContinuousDetection((result) => {
      setCurrentEmotion(result);
      onEmotionDetected(result);
    }, 2000); // Detect every 2 seconds
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      emotionDetectionService.stopWebcam();
    };
  }, []);

  // Auto-start/stop based on isActive prop
  useEffect(() => {
    if (isActive && !isWebcamActive && isInitialized) {
      startWebcam();
    } else if (!isActive && isWebcamActive) {
      stopWebcam();
    }
  }, [isActive, isWebcamActive, isInitialized]);

  const getDominantEmotionIcon = (emotion: string) => {
    const IconComponent =
      emotionIcons[emotion as keyof typeof emotionIcons] || Meh;
    return IconComponent;
  };

  const getDominantEmotionColor = (emotion: string) => {
    return (
      emotionColors[emotion as keyof typeof emotionColors] || "text-gray-500"
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Webcam Controls */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Eye className="w-5 h-5 text-indigo-500" />
              <span>Emotion Detection</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="text-muted-foreground"
              >
                {showPreview ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant={isWebcamActive ? "destructive" : "default"}
                size="sm"
                onClick={isWebcamActive ? stopWebcam : startWebcam}
                disabled={!isInitialized}
                className={cn(
                  !isWebcamActive &&
                    "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600",
                )}
              >
                {isWebcamActive ? (
                  <>
                    <CameraOff className="w-4 h-4 mr-2" />
                    Stop
                  </>
                ) : (
                  <>
                    <Camera className="w-4 h-4 mr-2" />
                    Start
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Status Indicators */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  isInitialized ? "bg-green-500 animate-pulse" : "bg-gray-400",
                )}
              />
              <span className="text-muted-foreground">
                {isInitialized ? "Models Loaded" : "Loading..."}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  isWebcamActive ? "bg-blue-500 animate-pulse" : "bg-gray-400",
                )}
              />
              <span className="text-muted-foreground">
                {isWebcamActive ? "Camera Active" : "Camera Off"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  currentEmotion?.faceDetected
                    ? "bg-purple-500 animate-pulse"
                    : "bg-gray-400",
                )}
              />
              <span className="text-muted-foreground">
                {currentEmotion?.faceDetected ? "Face Detected" : "No Face"}
              </span>
            </div>
          </div>

          {/* Video Preview */}
          {showPreview && (
            <div className="relative">
              <video
                ref={videoRef}
                className={cn(
                  "w-full h-32 object-cover rounded-lg bg-black",
                  !isWebcamActive && "hidden",
                )}
                muted
                playsInline
              />
              <canvas ref={canvasRef} className="hidden" />

              {!isWebcamActive && (
                <div className="w-full h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Camera Off</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Current Emotion Display */}
          {currentEmotion && currentEmotion.faceDetected && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Current Emotion:
                </span>
                <div className="flex items-center space-x-2">
                  {React.createElement(
                    getDominantEmotionIcon(currentEmotion.emotions.dominant),
                    {
                      className: cn(
                        "w-5 h-5",
                        getDominantEmotionColor(
                          currentEmotion.emotions.dominant,
                        ),
                      ),
                    },
                  )}
                  <Badge variant="outline" className="text-xs capitalize">
                    {currentEmotion.emotions.dominant}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(currentEmotion.emotions.confidence * 100)}%
                  </Badge>
                </div>
              </div>

              {/* Emotion Breakdown */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Emotion Analysis:
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(currentEmotion.emotions)
                    .filter(
                      ([key]) => !["dominant", "confidence"].includes(key),
                    )
                    .map(([emotion, value]) => (
                      <div key={emotion} className="flex justify-between">
                        <span className="capitalize text-muted-foreground">
                          {emotion}:
                        </span>
                        <span className="font-medium">
                          {Math.round((value as number) * 100)}%
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Privacy Notice */}
          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-xs text-muted-foreground">
              🔒 Your webcam data is processed locally for emotion detection. No
              video is stored or transmitted.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebcamEmotionDetector;
