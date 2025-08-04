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
  MoreHorizontal,
  History,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PracticeSessionProps {
  scenario: string;
  systemPrompt: string;
  environment: React.ReactNode;
  avatar?: (speaking: boolean) => React.ReactNode;
  onComplete?: () => void;
  userGender?: "male" | "female";
  customBackgroundDesktop?: string;
  customBackgroundMobile?: string;
}

export default function PracticeSession({
  scenario,
  systemPrompt,
  environment,
  avatar,
  onComplete,
  userGender = "male",
  customBackgroundDesktop,
  customBackgroundMobile,
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
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Default interview scene background images
  const defaultMaleInterviewScene =
    "https://cdn.builder.io/api/v1/image/assets%2F9858961368ae4103b4a3c41674c30c55%2F82c53005c60f41e2a36ba6b7e288ade6?format=webp&width=800";
  const defaultFemaleInterviewScene =
    "https://cdn.builder.io/api/v1/image/assets%2F9858961368ae4103b4a3c41674c30c55%2F5be9055b1cc54cd4bbf4b32d356bdeaf?format=webp&width=800";

  // Use custom backgrounds if provided, otherwise fall back to defaults
  const desktopBackground = customBackgroundDesktop || (userGender === "male" ? defaultMaleInterviewScene : defaultFemaleInterviewScene);
  const mobileBackground = customBackgroundMobile || desktopBackground;

  // Session tracking - temporarily disabled to fix React hooks issue
  // const {
  //   isSessionActive,
  //   startSession: startTracking,
  //   endSession: endTracking,
  //   trackPractice,
  //   recordFluencyImprovement,
  //   recordVocabularyLearned,
  // } = useSessionTracking(scenario.toLowerCase(), false);

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
    // startTracking(); // Temporarily disabled
    setSessionStartTime(new Date());
    initializeSession();

    return () => {
      // endTracking(); // Temporarily disabled
    };
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

    try {
      console.log("Making API request to /api/chat...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const nativeFetch = window.fetch?.bind(window) || fetch;

      const response = await nativeFetch("/api/chat", {
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

      setApiError("");
      return data.response || "No response from bot.";
    } catch (err) {
      console.error("Chat API Error (attempt " + (retryCount + 1) + "):", err);

      if (
        retryCount === 0 &&
        err instanceof Error &&
        (err.message.includes("Failed to fetch") ||
          err.message.includes("fetch") ||
          err.message.includes("network"))
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

      if (retryCount < 2) {
        console.log("Retrying in", (retryCount + 1) * 1000, "ms...");
        await new Promise((resolve) =>
          setTimeout(resolve, (retryCount + 1) * 1000),
        );
        return getGPTReply(userInput, retryCount + 1);
      }

      const contextualResponses = {
        "Job Interview":
          "I understand you're preparing for an interview. While I'm having some technical difficulties, I can still help you practice. Please tell me about your experience or ask me a common interview question.",
        "Restaurant Dining":
          "Welcome to our restaurant! I apologize for the brief delay. How may I assist you with your dining experience today?",
        "Shopping Experience":
          "Hello! I'm here to help you with your shopping needs. What can I help you find today?",
        "Grammar Tutor":
          "I'm your grammar tutor, and I'm here to help you improve your English skills. What grammar topic would you like to practice?",
        "Business English":
          "Hello! I'm your business English coach. Despite some technical issues, I'm ready to help you with professional communication. What would you like to practice?",
        "Social Conversation":
          "Hi there! I'm here to help you practice social conversations. What social situation would you like to work on?",
        "Cultural Communication":
          "Welcome! I'm your cultural communication guide. Let's practice cross-cultural interactions. What scenario interests you?",
        "Presentation Skills":
          "Hello! I'm your presentation coach. I'm ready to help you develop your speaking and presentation skills. What would you like to work on?",
      };

      let errorMessage =
        contextualResponses[scenario as keyof typeof contextualResponses] ||
        "I'm experiencing some technical difficulties, but I'm still here to help you practice. What would you like to work on?";

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "Sorry, the request timed out. " + errorMessage;
        } else if (err.message.includes("Failed to fetch")) {
          setApiError("Connection issue - working in offline mode");
        } else {
          setApiError("Technical issue - limited functionality");
        }
      }

      return errorMessage;
    }
  };

  const typeReply = (text: string) => {
    let i = 0;
    setReply("");

    const interval = setInterval(() => {
      if (i < text.length) {
        setReply(text.substring(0, i + 1));
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

      setConversation((prev) => [
        ...prev,
        {
          user: inputText,
          bot: botResponse,
          timestamp: new Date(),
        },
      ]);

      // const estimatedDuration = Math.max(0.5, botResponse.length / 100);
      // trackPractice(estimatedDuration, 85); // Temporarily disabled
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 pointer-events-none" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/practice">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-white/80 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  {scenario} Practice
                </h1>
                <Badge
                  variant="secondary"
                  className="text-xs bg-white/10 text-white/70 border-white/20"
                >
                  Interview Mode
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-white/80 hover:text-white"
              >
                {soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetSession}
                className="text-white/80 hover:text-white"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/80 hover:text-white"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem
                    onClick={() => setShowHistory(true)}
                    className="text-white hover:bg-slate-700"
                  >
                    <History className="w-4 h-4 mr-2" />
                    View History
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main conversation area with background */}
      <div className="relative h-screen pt-20 pb-32">
        {/* Background image */}
        <div className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${desktopBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
        </div>

        {/* Mobile background */}
        <div className="md:hidden absolute inset-0 bg-cover bg-center bg-no-repeat">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${mobileBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          />
        </div>

        {/* Mobile background fallback */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/40" />

        {/* Speech bubbles container */}
        <div className="relative h-full flex items-center justify-center px-4 md:px-8">
          {/* User speech bubble - Left side */}
          {transcript && (
            <div className="absolute left-4 md:left-8 top-48 md:top-56 max-w-[280px] md:max-w-md">
              <div className="bg-white/80 text-slate-900 p-4 md:p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/30" style={{margin: "42px 0 0 176px"}}>
                <p className="text-sm font-medium">{transcript}</p>
                <p className="text-xs text-slate-500 mt-2">You</p>
              </div>
            </div>
          )}

          {/* AI speech bubble - Top right */}
          <div className="absolute right-4 md:right-8 top-32 md:top-40 max-w-[280px] md:max-w-md">
            <div className="bg-white/80 text-slate-900 p-4 md:p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/30" style={{marginTop: "111px"}}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                  <p className="text-slate-900">AI is thinking...</p>
                </div>
              ) : reply ? (
                <div>
                  <p className="text-sm font-medium">{reply}</p>
                  <p className="text-xs text-slate-500 mt-2">AI Interviewer</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-slate-500">
                    Ready to start the interview...
                  </p>
                  <p className="text-xs text-slate-500 mt-2">AI Interviewer</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input area - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-4xl mx-auto p-6">
          <div className="space-y-4">
            {/* Voice input button */}
            <div className="flex justify-center">
              <Button
                onClick={handleVoiceInput}
                disabled={listening || isLoading}
                className={`px-8 py-4 rounded-full transition-all duration-300 ${
                  listening
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                } text-white shadow-2xl`}
              >
                {listening ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Listening...
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Press to Speak
                  </>
                )}
              </Button>
            </div>

            {/* Text input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm"
              />
              <Button
                onClick={handleTextSubmit}
                disabled={!typedText.trim() || isLoading}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center justify-between">
              Conversation History
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHistory(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {conversation.length === 0 ? (
              <p className="text-white/60 text-center py-8">
                No conversation history yet.
              </p>
            ) : (
              conversation.map((item, index) => (
                <div
                  key={index}
                  className="space-y-3 p-4 bg-slate-700/50 rounded-lg"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold">U</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{item.user}</p>
                      <p className="text-xs text-white/50 mt-1">
                        {item.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold">AI</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{item.bot}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Connection error overlay */}
      {apiError && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-400">{apiError}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setApiError("");
                  initializeSession();
                }}
                className="text-red-400 hover:text-red-300"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
