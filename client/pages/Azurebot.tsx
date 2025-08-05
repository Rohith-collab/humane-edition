import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Send, Bot, User, Loader2, Mic, MicOff } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const Azurebot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userInput = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      role: "user",
      timestamp: new Date(),
    };

    // Update messages and clear input immediately
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Get the current conversation history including the new user message
      const currentConversation = [...messages, userMessage];

      // Prepare the conversation for the API (only last 10 messages to avoid token limits)
      const recentMessages = currentConversation
        .slice(-10)
        .map((msg) => ({
          role: msg.role,
          content: msg.content.trim(),
        }))
        .filter((msg) => msg.content.length > 0);

      console.log("Sending messages:", recentMessages);

      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: recentMessages,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const data = await response.json();

      if (!data.response || typeof data.response !== 'string') {
        throw new Error('Invalid response format from server');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response.trim(),
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background/95 to-muted/20 overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 bg-card/50 backdrop-blur-sm border-r border-border/50 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="gap-2 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/20">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                AI Assistant
              </h2>
              <p className="text-sm text-muted-foreground">
                Always here to help
              </p>
            </div>
          </div>
        </div>

        {/* Chat Info */}
        <div className="p-6 space-y-4">
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <h3 className="font-medium text-foreground mb-2">Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Real-time responses
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                Voice input support
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                Context awareness
              </li>
            </ul>
          </div>

          <div className="bg-muted/30 rounded-xl p-4">
            <h3 className="font-medium text-foreground mb-2">Quick Tips</h3>
            <p className="text-sm text-muted-foreground">
              Ask me anything! I can help with questions, explanations, creative
              tasks, and more.
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-auto p-6 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Connected</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="h-16 bg-card/30 backdrop-blur-sm border-b border-border/50 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-primary/80 to-primary/60 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">
                AI Chat Assistant
              </h1>
              <p className="text-xs text-muted-foreground">
                Powered by advanced AI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "assistant" && (
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-full flex items-center justify-center border border-primary/20 flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}

              <div
                className={`max-w-[70%] relative group ${
                  message.role === "user" ? "order-1" : ""
                }`}
              >
                <div
                  className={`p-4 rounded-2xl shadow-sm ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-primary to-primary/90 text-primary-foreground"
                      : "bg-card border border-border/50 text-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
                <div
                  className={`text-xs text-muted-foreground mt-1 ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>

              {message.role === "user" && (
                <div className="w-10 h-10 bg-gradient-to-br from-muted via-muted/80 to-muted/60 rounded-full flex items-center justify-center border border-border/50 flex-shrink-0 order-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-full flex items-center justify-center border border-primary/20 flex-shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-card border border-border/50 p-4 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-6 bg-card/30 backdrop-blur-sm border-t border-border/50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={startListening}
                disabled={isListening || isLoading}
                className={`w-10 h-10 p-0 rounded-full border-2 transition-all ${
                  isListening
                    ? "bg-red-500 border-red-500 text-white animate-pulse"
                    : "hover:bg-primary/10 hover:border-primary/30"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="w-full px-4 py-3 pr-12 bg-background border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-foreground placeholder-muted-foreground transition-all"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 rounded-full transition-all ${
                    input.trim() && !isLoading
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Azurebot;
