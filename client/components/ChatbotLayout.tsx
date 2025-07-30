import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatRequest, ChatResponse } from "@shared/api";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  ArrowLeft,
  RotateCcw,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { usePracticeTimer } from "@/hooks/usePracticeTimer";
import { PracticeTimer } from "./PracticeTimer";
import { useUsageTracking } from "@/hooks/useUsageTracking";

import { LipSyncAvatar } from "./LipSyncAvatar";

interface ChatbotLayoutProps {
  // New interface
  title?: string;
  welcomeMessage?: string;
  systemPrompt: string;
  backgroundImage?: string;
  theme?: string;
  practiceType?: string; // For usage tracking
  // Legacy interface
  scenario?: string;
  backUrl?: string;
  avatarType?: "interviewer" | "teacher" | "waiter" | "assistant";
  onComplete?: () => void;
}

export default function ChatbotLayout({
  title,
  welcomeMessage,
  systemPrompt,
  backgroundImage,
  theme,
  practiceType,
  // Legacy props
  scenario,
  backUrl,
  avatarType,
  onComplete,
}: ChatbotLayoutProps) {
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [typedText, setTypedText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<
    Array<{ user: string; bot: string; timestamp: Date }>
  >([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const [apiError, setApiError] = useState<string>("");
  const [userPreferences, setUserPreferences] = useState<any>(null);

  // Practice timer
  const {
    elapsedTime,
    formattedTime,
    isRunning: timerRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    stopTimer,
  } = usePracticeTimer();

  // Usage tracking
  const {
    startSession,
    endSession,
    updateDuration,
    getRemainingTime,
    isSessionLocked,
    getUsedTime,
  } = useUsageTracking();

  // XMLHttpRequest fallback function
  const makeXHRRequest = (requestBody: ChatRequest): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/chat", true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Accept", "application/json");
      xhr.timeout = 30000;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data: ChatResponse = JSON.parse(xhr.responseText);
            if (data.success) {
              resolve(data.response || "No response from bot.");
            } else {
              reject(new Error(data.error || "Failed to get AI response"));
            }
          } catch (parseErr) {
            reject(new Error("Failed to parse response"));
          }
        } else {
          reject(new Error(`XHR error! status: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error("XHR network error"));
      xhr.ontimeout = () => reject(new Error("XHR timeout"));

      xhr.send(JSON.stringify(requestBody));
    });
  };

  // Load user preferences and initialize session
  useEffect(() => {
    // Load user preferences from localStorage
    const savedPreferences = localStorage.getItem("aangilam_preferences");
    if (savedPreferences) {
      setUserPreferences(JSON.parse(savedPreferences));
    }

    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      console.log("Initializing practice session...");

      // Use provided welcome message or get from AI
      let welcomeMsg;
      if (welcomeMessage) {
        welcomeMsg = welcomeMessage;
      } else {
        welcomeMsg = await getGPTReply(
          "Hello, let's start the practice session.",
        );
      }

      console.log("Welcome message received:", welcomeMsg);
      setReply(welcomeMsg);
      typeReply(welcomeMsg);

      if (soundEnabled) {
        speakText(welcomeMsg);
      }
    } catch (error) {
      console.error("Failed to initialize session:", error);

      // Use a more specific fallback based on the scenario
      const fallbackMessages = {
        "Job Interview":
          "Hello! I'm your AI interviewer. I'm ready to start your interview practice. Please tell me about yourself.",
        "Restaurant Dining":
          "Welcome to our restaurant! I'm your server for today. Would you like to see our menu?",
        "Shopping Experience":
          "Hello! Welcome to our store. How can I help you find what you're looking for today?",
        "Grammar Tutor":
          "Hello! I'm your grammar tutor. I'm here to help you improve your English. What would you like to work on?",
      };

      const fallbackMessage =
        fallbackMessages[scenario as keyof typeof fallbackMessages] ||
        "Welcome! I'm ready to help you practice. How can I assist you today?";

      setReply(fallbackMessage);
      typeReply(fallbackMessage);

      if (soundEnabled) {
        speakText(fallbackMessage);
      }
    } finally {
      setIsLoading(false);
      setSessionInitialized(true);
      // Start the practice timer when session is ready
      startTimer();
      // Start usage tracking session
      if (practiceType) {
        startSession(practiceType);
      }
    }
  };

  const getGPTReply = async (
    userInput: string,
    retryCount = 0,
  ): Promise<string> => {
    try {
      const requestBody: ChatRequest = {
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          { role: "user", content: userInput },
        ],
        temperature: 0.7,
        max_tokens: 800,
      };

      console.log("Making API request to /api/chat...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      // Try to use the original fetch, but with additional headers to avoid interference
      const response = await (window.fetch || fetch)("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Cache-Control": "no-cache",
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
        credentials: "same-origin",
      });

      clearTimeout(timeoutId);

      console.log("API response status:", response.status);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`,
        );
      }

      const data: ChatResponse = await response.json();
      console.log("API response data:", data);

      if (!data.success) {
        throw new Error(data.error || "Failed to get AI response");
      }

      // Clear any previous errors on successful response
      setApiError("");
      return data.response || "No response from bot.";
    } catch (err) {
      console.error("Chat API Error (attempt " + (retryCount + 1) + "):", err);

      // Try XMLHttpRequest as fallback if fetch fails
      if (
        retryCount === 0 &&
        err instanceof Error &&
        err.message.includes("Failed to fetch")
      ) {
        console.log("Fetch failed, trying XMLHttpRequest fallback...");
        try {
          const result = await makeXHRRequest(requestBody);
          setApiError("");
          return result;
        } catch (xhrErr) {
          console.error("XMLHttpRequest also failed:", xhrErr);
        }
      }

      // Retry logic - retry up to 2 times with exponential backoff
      if (retryCount < 2) {
        console.log("Retrying in", (retryCount + 1) * 1000, "ms...");
        await new Promise((resolve) =>
          setTimeout(resolve, (retryCount + 1) * 1000),
        );
        return getGPTReply(userInput, retryCount + 1);
      }

      // If all retries failed, set error state and return a helpful error message
      let errorMessage =
        "Sorry, I could not process that right now. Please try again in a moment.";

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "Sorry, the request timed out. Please try again.";
        } else if (err.message.includes("Failed to fetch")) {
          errorMessage =
            "Sorry, there seems to be a connection issue. Please check your internet connection and try again.";
        }
        setApiError(err.message);
      }

      return errorMessage;
    }
  };

  const typeReply = (text: string) => {
    let i = 0;
    setReply("");

    const interval = setInterval(() => {
      if (i < text.length) {
        setReply((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  const speakText = (text: string) => {
    if (!soundEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  };

  const recognizeSpeech = (): Promise<string> => {
    return new Promise((resolve) => {
      if (
        !("webkitSpeechRecognition" in window) &&
        !("SpeechRecognition" in window)
      ) {
        resolve("Speech recognition not supported");
        return;
      }

      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = () => {
        resolve("Speech recognition failed");
      };

      recognition.start();
    });
  };

  const handleInput = async (inputText: string) => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setTranscript(inputText);

    try {
      const botResponse = await getGPTReply(inputText);
      setReply(botResponse);
      typeReply(botResponse);

      if (soundEnabled) {
        speakText(botResponse);
      }

      // Add to conversation history
      setConversation((prev) => [
        ...prev,
        {
          user: inputText,
          bot: botResponse,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error handling input:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = async () => {
    setListening(true);
    setSpeaking(true);

    try {
      const spokenText = await recognizeSpeech();
      await handleInput(spokenText);
    } catch (error) {
      console.error("Voice input error:", error);
    } finally {
      setListening(false);
      setSpeaking(false);
    }
  };

  const handleTextSubmit = async () => {
    if (typedText.trim()) {
      await handleInput(typedText);
      setTypedText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  const resetSession = () => {
    setConversation([]);
    setTranscript("");
    setReply("");
    setTypedText("");
    setSessionInitialized(false);
    resetTimer();
    initializeSession();
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Full D-ID Avatar */}
      <div
        className="w-1/2 h-screen relative"
        style={{
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {backgroundImage && (
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
        )}
        <LipSyncAvatar
          type={avatarType || "assistant"}
          speaking={speaking || isLoading}
          isLoading={isLoading}
          className="w-full h-full relative z-10"
        />

        {/* Connection Error Overlay */}
        {apiError && (
          <div className="absolute top-4 left-4 right-4">
            <div className="bg-red-500/90 backdrop-blur-sm text-white rounded-lg p-3 border border-red-400/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Connection Error</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setApiError("");
                    initializeSession();
                  }}
                  className="text-white hover:bg-white/20"
                >
                  Retry
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Chat Interface */}
      <div className="w-1/2 h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            {backUrl && (
              <Link to={backUrl}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
            )}
            {!backUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            <div>
              <h1 className="font-semibold text-foreground">
                {title || scenario}
              </h1>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  AI Conversation
                </Badge>
                {userPreferences && (
                  <Badge variant="outline" className="text-xs">
                    {userPreferences.voice} • {userPreferences.language}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Practice Timer */}
            <PracticeTimer
              elapsedTime={elapsedTime}
              formattedTime={formattedTime}
              isRunning={timerRunning}
              onStart={startTimer}
              onPause={pauseTimer}
              onReset={resetTimer}
              compact={true}
            />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={resetSession}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* Current Conversation */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {/* AI Response */}
            <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl p-4 border border-border/30">
              {isLoading ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-nova-500"></div>
                  <p className="text-muted-foreground text-sm">
                    AI is thinking...
                  </p>
                </div>
              ) : reply ? (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-nova-500 rounded-full"></div>
                    <span className="text-xs font-medium text-nova-500">
                      AI Response
                    </span>
                  </div>
                  <p className="text-foreground leading-relaxed">{reply}</p>
                </div>
              ) : !sessionInitialized ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-nova-500"></div>
                  <p className="text-muted-foreground text-sm">
                    Initializing conversation...
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Ready to start our conversation!
                </p>
              )}
            </div>

            {/* User Input Display */}
            {transcript && (
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-electric-500/20 to-cyber-500/20 rounded-2xl p-4 border border-electric-500/30 max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-electric-500 rounded-full"></div>
                    <span className="text-xs font-medium text-electric-500">
                      You said
                    </span>
                  </div>
                  <p className="text-foreground">{transcript}</p>
                </div>
              </div>
            )}

            {/* Conversation History */}
            {conversation.length > 0 && (
              <div className="space-y-3 border-t border-border/30 pt-4">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Conversation History
                </h3>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {conversation.slice(-5).map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-end">
                        <div className="bg-electric-500/10 rounded-lg p-3 max-w-[70%] text-sm">
                          <div className="text-electric-400 font-medium text-xs mb-1">
                            You
                          </div>
                          <div className="text-foreground">{item.user}</div>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-muted/30 rounded-lg p-3 max-w-[70%] text-sm">
                          <div className="text-nova-400 font-medium text-xs mb-1">
                            AI
                          </div>
                          <div className="text-foreground">{item.bot}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Controls */}
          <div className="border-t border-border/30 pt-4 space-y-4">
            {/* Voice Input */}
            <div className="flex justify-center">
              <Button
                onClick={handleVoiceInput}
                disabled={listening || isLoading}
                size="lg"
                className={cn(
                  "transition-all duration-300 rounded-full w-14 h-14",
                  listening
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-gradient-to-r from-nova-500 to-electric-500 hover:from-nova-600 hover:to-electric-600 shadow-lg",
                )}
              >
                {listening ? (
                  <MicOff className="w-5 h-5" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </Button>
            </div>

            {/* Text Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-background/80 border border-border/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent text-foreground placeholder-muted-foreground backdrop-blur-sm"
              />
              <Button
                onClick={handleTextSubmit}
                disabled={!typedText.trim() || isLoading}
                className="bg-gradient-to-r from-electric-500 to-cyber-500 hover:from-electric-600 hover:to-cyber-600 text-white rounded-xl px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
