import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatRequest, ChatResponse } from "@shared/api";
import { AnimatedAvatar } from "./AnimatedAvatar";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { Link } from "react-router-dom";

interface PracticeSessionProps {
  scenario: string;
  systemPrompt: string;
  environment: React.ReactNode;
  avatar?: (speaking: boolean) => React.ReactNode;
  onComplete?: () => void;
}

export default function PracticeSession({
  scenario,
  systemPrompt,
  environment,
  avatar,
  onComplete,
}: PracticeSessionProps) {
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

  // Initialize session with welcome message
  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      setIsLoading(true);
      console.log("Initializing practice session...");

      const welcomeMessage = await getGPTReply(
        "Hello, let's start the practice session.",
      );

      console.log("Welcome message received:", welcomeMessage);
      setReply(welcomeMessage);
      typeReply(welcomeMessage);

      if (soundEnabled) {
        speakText(welcomeMessage);
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
    initializeSession();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/practice">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Practice
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {scenario} Practice
                </h1>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    AI-Powered Session
                  </Badge>
                  <Badge className="text-xs bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30">
                    Grammar Correction Enabled
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="gap-2"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetSession}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              {apiError && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setApiError("");
                    initializeSession();
                  }}
                  className="gap-2 text-red-500 border-red-500/50 hover:bg-red-500/10"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Connection
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mt-10">
          {/* Environment Section */}
          <div className="space-y-6 mt-px">
            <Card className="bg-gradient-to-br from-nova-500/5 via-electric-500/5 to-cyber-500/5 border-border/50"></Card>
          </div>

          {/* Conversation Section */}
          <div className="space-y-6">
            {/* AI Avatar & Response */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="my-12 mx-0 p-6">
                {/* Connection Status */}
                {apiError && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-red-400">
                        Connection Error
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setApiError("");
                          initializeSession();
                        }}
                        className="ml-auto text-red-400 hover:text-red-300"
                      >
                        Retry
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-6 mt-9">
                  <div className="w-24 h-24 flex-shrink-0">
                    {avatar ? (
                      avatar(speaking || isLoading)
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br from-nova-500 to-electric-500 rounded-full flex items-center justify-center transition-all duration-300 ${speaking ? "scale-110 glow-electric" : ""}`}
                      >
                        <span className="text-white font-bold text-lg">AI</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-r from-nova-500/10 to-electric-500/10 rounded-lg p-4 border border-nova-500/20">
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-nova-500"></div>
                          <p className="text-muted-foreground">
                            AI is thinking...
                          </p>
                        </div>
                      ) : reply ? (
                        <p className="text-foreground">{reply}</p>
                      ) : !sessionInitialized ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-nova-500"></div>
                          <p className="text-muted-foreground">
                            Initializing session...
                          </p>
                        </div>
                      ) : (
                        <p className="text-muted-foreground">
                          AI is ready to chat!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Input */}
            {transcript && (
              <Card className="bg-secondary/50 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 flex-shrink-0">
                      <AnimatedAvatar
                        type="user"
                        speaking={false}
                        emotion="neutral"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground">
                        <strong>You said:</strong> {transcript}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Input Controls */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Button
                      onClick={handleVoiceInput}
                      disabled={listening || isLoading}
                      className={`flex-1 transition-all duration-300 ${listening ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-nova-500 to-electric-500 hover:from-nova-600 hover:to-electric-600"} text-white glow-electric`}
                    >
                      {listening ? (
                        <>
                          <MicOff className="w-4 h-4 mr-2" />
                          Listening...
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Voice Input
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={typedText}
                      onChange={(e) => setTypedText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-nova-500 focus:border-transparent text-foreground placeholder-muted-foreground"
                    />
                    <Button
                      onClick={handleTextSubmit}
                      disabled={!typedText.trim() || isLoading}
                      className="bg-gradient-to-r from-electric-500 to-cyber-500 hover:from-electric-600 hover:to-cyber-600 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversation History */}
            {conversation.length > 0 && (
              <Card className="bg-card/30 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Conversation History
                  </h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {conversation.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="text-sm">
                          <strong className="text-cyber-400">You:</strong>{" "}
                          {item.user}
                        </div>
                        <div className="text-sm">
                          <strong className="text-nova-400">AI:</strong>{" "}
                          {item.bot}
                        </div>
                        {index < conversation.length - 1 && (
                          <hr className="border-border/30" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
