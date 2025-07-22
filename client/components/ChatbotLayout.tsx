import React, { useState, useEffect } from 'react';
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
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

import { LipSyncAvatar } from "./LipSyncAvatar";

interface ChatbotLayoutProps {
  scenario: string;
  systemPrompt: string;
  backUrl: string;
  avatarType: 'interviewer' | 'teacher' | 'waiter' | 'assistant';
  onComplete?: () => void;
}

export default function ChatbotLayout({ 
  scenario, 
  systemPrompt, 
  backUrl,
  avatarType,
  onComplete 
}: ChatbotLayoutProps) {
  const [transcript, setTranscript] = useState('');
  const [reply, setReply] = useState('');
  const [typedText, setTypedText] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Array<{user: string, bot: string, timestamp: Date}>>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sessionInitialized, setSessionInitialized] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState(false);

  // XMLHttpRequest fallback function
  const makeXHRRequest = (requestBody: ChatRequest): Promise<string> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/chat', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.timeout = 30000;

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data: ChatResponse = JSON.parse(xhr.responseText);
            if (data.success) {
              resolve(data.response || 'No response from bot.');
            } else {
              reject(new Error(data.error || 'Failed to get AI response'));
            }
          } catch (parseErr) {
            reject(new Error('Failed to parse response'));
          }
        } else {
          reject(new Error(`XHR error! status: ${xhr.status}`));
        }
      };

      xhr.onerror = () => reject(new Error('XHR network error'));
      xhr.ontimeout = () => reject(new Error('XHR timeout'));

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
      console.log('Initializing practice session...');
      
      const welcomeMessage = await getGPTReply("Hello, let's start the practice session.");
      
      console.log('Welcome message received:', welcomeMessage);
      setReply(welcomeMessage);
      typeReply(welcomeMessage);
      
      if (soundEnabled) {
        speakText(welcomeMessage);
      }
    } catch (error) {
      console.error('Failed to initialize session:', error);
      
      // Use a more specific fallback based on the scenario
      const fallbackMessages = {
        'Job Interview': "Hello! I'm your AI interviewer. I'm ready to start your interview practice. Please tell me about yourself.",
        'Restaurant Dining': "Welcome to our restaurant! I'm your server for today. Would you like to see our menu?", 
        'Shopping Experience': "Hello! Welcome to our store. How can I help you find what you're looking for today?",
        'Grammar Tutor': "Hello! I'm your grammar tutor. I'm here to help you improve your English. What would you like to work on?"
      };
      
      const fallbackMessage = fallbackMessages[scenario as keyof typeof fallbackMessages] || 
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

  const getGPTReply = async (userInput: string, retryCount = 0): Promise<string> => {
    try {
      const requestBody: ChatRequest = {
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          { role: 'user', content: userInput }
        ],
        temperature: 0.7,
        max_tokens: 800
      };

      console.log('Making API request to /api/chat...');
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      // Try to use the original fetch, but with additional headers to avoid interference
      const response = await (window.fetch || fetch)('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cache-Control': 'no-cache',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal,
        credentials: 'same-origin'
      });

      clearTimeout(timeoutId);

      console.log('API response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data: ChatResponse = await response.json();
      console.log('API response data:', data);
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to get AI response');
      }

      // Clear any previous errors on successful response
      setApiError('');
      return data.response || 'No response from bot.';
    } catch (err) {
      console.error('Chat API Error (attempt ' + (retryCount + 1) + '):', err);
      
      // Try XMLHttpRequest as fallback if fetch fails
      if (retryCount === 0 && err instanceof Error && err.message.includes('Failed to fetch')) {
        console.log('Fetch failed, trying XMLHttpRequest fallback...');
        try {
          const result = await makeXHRRequest(requestBody);
          setApiError('');
          return result;
        } catch (xhrErr) {
          console.error('XMLHttpRequest also failed:', xhrErr);
        }
      }
      
      // Retry logic - retry up to 2 times with exponential backoff
      if (retryCount < 2) {
        console.log('Retrying in', (retryCount + 1) * 1000, 'ms...');
        await new Promise(resolve => setTimeout(resolve, (retryCount + 1) * 1000));
        return getGPTReply(userInput, retryCount + 1);
      }
      
      // If all retries failed, set error state and return a helpful error message
      let errorMessage = 'Sorry, I could not process that right now. Please try again in a moment.';
      
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Sorry, the request timed out. Please try again.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Sorry, there seems to be a connection issue. Please check your internet connection and try again.';
        }
        setApiError(err.message);
      }
      
      return errorMessage;
    }
  };

  const typeReply = (text: string) => {
    let i = 0;
    setReply('');

    const interval = setInterval(() => {
      if (i < text.length) {
        setReply(prev => prev + text[i]);
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
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        resolve('Speech recognition not supported');
        return;
      }

      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = () => {
        resolve('Speech recognition failed');
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
      setConversation(prev => [...prev, {
        user: inputText,
        bot: botResponse,
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error('Error handling input:', error);
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
      console.error('Voice input error:', error);
    } finally {
      setListening(false);
      setSpeaking(false);
    }
  };

  const handleTextSubmit = async () => {
    if (typedText.trim()) {
      await handleInput(typedText);
      setTypedText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleTextSubmit();
    }
  };

  const resetSession = () => {
    setConversation([]);
    setTranscript('');
    setReply('');
    setTypedText('');
    setSessionInitialized(false);
    initializeSession();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Header */}
      <div className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={backUrl}>
                <Button variant="ghost" size="sm" className="gap-2 hover:bg-muted/50">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-foreground">{scenario}</h1>
                <Badge variant="secondary" className="text-xs">
                  AI Conversation
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="gap-2"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="gap-2"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetSession}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={cn(
          "bg-background/60 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl overflow-hidden transition-all duration-500",
          isMinimized ? "h-20" : "h-[calc(100vh-12rem)]"
        )}>
          {!isMinimized && (
            <>
              {/* Avatar Section */}
              <div className="h-1/3 bg-gradient-to-br from-muted/30 via-background/80 to-muted/40 p-8 flex items-center justify-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-nova-500/20 via-transparent to-electric-500/20"></div>
                </div>
                
                <div className="relative">
                  <div className="w-32 h-32 mx-auto">
                    <HumanAvatar 
                      type={avatarType}
                      speaking={speaking || isLoading}
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* Connection Status */}
                  {apiError && (
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                      <div className="bg-red-500/90 text-white text-xs px-3 py-1 rounded-full">
                        Connection Error
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Conversation Area */}
              <div className="h-1/2 p-6 overflow-y-auto">
                {/* AI Response */}
                <div className="mb-6">
                  <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-2xl p-6 border border-border/30">
                    {isLoading ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-nova-500"></div>
                        <p className="text-muted-foreground">Thinking...</p>
                      </div>
                    ) : reply ? (
                      <p className="text-foreground text-lg leading-relaxed">{reply}</p>
                    ) : !sessionInitialized ? (
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-nova-500"></div>
                        <p className="text-muted-foreground">Initializing conversation...</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Ready to chat!</p>
                    )}
                  </div>
                </div>

                {/* User Input Display */}
                {transcript && (
                  <div className="mb-6 flex justify-end">
                    <div className="bg-gradient-to-r from-nova-500/20 to-electric-500/20 rounded-2xl p-4 border border-nova-500/30 max-w-2xl">
                      <p className="text-foreground"><strong>You:</strong> {transcript}</p>
                    </div>
                  </div>
                )}

                {/* Conversation History */}
                {conversation.length > 0 && (
                  <div className="space-y-4 mt-8">
                    <h3 className="text-sm font-medium text-muted-foreground">Previous Messages</h3>
                    <div className="space-y-3 max-h-40 overflow-y-auto">
                      {conversation.slice(-3).map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-end">
                            <div className="bg-gradient-to-r from-cyber-500/10 to-nova-500/10 rounded-lg p-3 max-w-sm text-sm">
                              <strong className="text-cyber-400">You:</strong> {item.user}
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-muted/30 rounded-lg p-3 max-w-sm text-sm">
                              <strong className="text-nova-400">AI:</strong> {item.bot}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input Controls */}
              <div className="h-1/6 p-6 border-t border-border/30 bg-gradient-to-r from-background/50 to-muted/20">
                <div className="space-y-4">
                  {/* Voice Input */}
                  <div className="flex justify-center">
                    <Button
                      onClick={handleVoiceInput}
                      disabled={listening || isLoading}
                      size="lg"
                      className={cn(
                        "transition-all duration-300 rounded-full w-16 h-16",
                        listening 
                          ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                          : "bg-gradient-to-r from-nova-500 to-electric-500 hover:from-nova-600 hover:to-electric-600 glow-electric"
                      )}
                    >
                      {listening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
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
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* Minimized View */}
          {isMinimized && (
            <div className="h-full flex items-center justify-between px-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12">
                  <HumanAvatar 
                    type={avatarType}
                    speaking={speaking || isLoading}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{scenario}</h3>
                  <p className="text-sm text-muted-foreground">Click to expand</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(false)}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
