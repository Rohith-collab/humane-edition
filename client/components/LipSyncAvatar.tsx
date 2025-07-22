import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface LipSyncAvatarProps {
  type: 'interviewer' | 'teacher' | 'waiter' | 'assistant';
  speaking?: boolean;
  isLoading?: boolean;
  className?: string;
}

const avatarData = {
  interviewer: {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=face",
    name: "Michael Johnson",
    title: "Senior Interviewer",
    colors: "from-blue-500 to-indigo-600",
    background: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=1920&h=1080&fit=crop" // Office background
  },
  teacher: {
    image: "https://images.unsplash.com/photo-1559209172-e8d4c2d4b5e3?w=800&h=600&fit=crop&crop=face",
    name: "Sarah Williams", 
    title: "Grammar Teacher",
    colors: "from-green-500 to-emerald-600",
    background: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&h=1080&fit=crop" // Library/classroom background
  },
  waiter: {
    image: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=800&h=600&fit=crop&crop=face",
    name: "David Martinez",
    title: "Restaurant Server",
    colors: "from-amber-500 to-orange-600", 
    background: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop" // Restaurant background
  },
  assistant: {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=face",
    name: "Emma Chen",
    title: "Sales Associate", 
    colors: "from-purple-500 to-pink-600",
    background: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop" // Store background
  }
};

export function LipSyncAvatar({ type, speaking = false, isLoading = false, className }: LipSyncAvatarProps) {
  const avatar = avatarData[type];
  const [mouthState, setMouthState] = useState(0); // 0-3 for different mouth positions
  const [blinkState, setBlinkState] = useState(false);

  // Lip sync animation when speaking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (speaking || isLoading) {
      interval = setInterval(() => {
        setMouthState(prev => (prev + 1) % 4);
      }, 150); // Change mouth position every 150ms
    } else {
      setMouthState(0); // Closed mouth when not speaking
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [speaking, isLoading]);

  // Natural blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    }, 3000 + Math.random() * 2000); // Random blink every 3-5 seconds
    
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {/* Background Environment */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${avatar.background})` }}
      >
        {/* Overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>
      </div>

      {/* Main Avatar Container */}
      <div className="relative h-full flex items-center justify-center p-8">
        <div className={cn(
          "relative transition-all duration-300",
          speaking && "scale-105"
        )}>
          {/* Avatar Frame */}
          <div className={cn(
            `relative w-80 h-96 rounded-3xl overflow-hidden bg-gradient-to-br ${avatar.colors} p-1 transition-all duration-300`,
            speaking && "shadow-2xl animate-pulse"
          )}>
            <div className="w-full h-full rounded-3xl overflow-hidden bg-white relative">
              {/* Main Avatar Image */}
              <img
                src={avatar.image}
                alt={`${avatar.name} - ${avatar.title}`}
                className={cn(
                  "w-full h-full object-cover transition-all duration-200",
                  speaking && "brightness-110 contrast-105"
                )}
              />
              
              {/* Lip Sync Overlay */}
              <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  {/* Mouth Animation */}
                  <div className={cn(
                    "w-8 h-4 rounded-full transition-all duration-150",
                    speaking || isLoading ? 
                      mouthState === 0 ? "bg-red-900/80 scale-75" :
                      mouthState === 1 ? "bg-red-800/80 scale-100" :
                      mouthState === 2 ? "bg-red-900/80 scale-125" :
                      "bg-red-800/80 scale-90"
                    : "bg-red-900/60 scale-50"
                  )}></div>
                </div>
              </div>

              {/* Eye Blink Animation */}
              {blinkState && (
                <div className="absolute top-32 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-8">
                    <div className="w-8 h-1 bg-black/80 rounded-full"></div>
                    <div className="w-8 h-1 bg-black/80 rounded-full"></div>
                  </div>
                </div>
              )}

              {/* Speaking Indicator Wave */}
              {(speaking || isLoading) && (
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                    <div className="flex items-center justify-center space-x-1">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-1 rounded-full bg-gradient-to-t transition-all duration-150",
                            avatar.colors,
                            speaking ? "animate-pulse" : ""
                          )}
                          style={{
                            height: speaking || isLoading ? 
                              `${12 + Math.sin((Date.now() / 100) + i) * 8}px` : 
                              '4px',
                            animationDelay: `${i * 100}ms`
                          }}
                        ></div>
                      ))}
                    </div>
                    <div className="text-center text-white text-xs mt-1">
                      {isLoading ? 'Thinking...' : speaking ? 'Speaking...' : 'Ready'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Name Plate */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="bg-black/80 backdrop-blur-md text-white rounded-xl px-6 py-3 border border-white/20">
              <div className="text-center">
                <p className="font-semibold text-lg">{avatar.name}</p>
                <p className="text-sm opacity-80">{avatar.title}</p>
                <div className="flex items-center justify-center space-x-2 mt-1">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    speaking || isLoading ? "bg-green-400 animate-pulse" : "bg-gray-400"
                  )}></div>
                  <span className="text-xs">
                    {isLoading ? 'Processing' : speaking ? 'Speaking' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ambient Lighting Effect */}
          {speaking && (
            <div className={cn(
              `absolute inset-0 rounded-3xl bg-gradient-to-br ${avatar.colors} opacity-20 animate-ping pointer-events-none`
            )}></div>
          )}
        </div>
      </div>

      {/* Floating Particles when Speaking */}
      {speaking && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-2 h-2 rounded-full bg-gradient-to-br opacity-60 animate-bounce",
                avatar.colors
              )}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
