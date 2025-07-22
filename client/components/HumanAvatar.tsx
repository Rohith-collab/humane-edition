import React from 'react';
import { cn } from "@/lib/utils";

interface HumanAvatarProps {
  type: 'interviewer' | 'teacher' | 'waiter' | 'assistant';
  speaking?: boolean;
  name?: string;
  className?: string;
}

const avatarData = {
  interviewer: {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    name: "Michael Johnson",
    title: "Senior Interviewer",
    colors: "from-blue-500 to-indigo-600"
  },
  teacher: {
    image: "https://images.unsplash.com/photo-1559209172-e8d4c2d4b5e3?w=300&h=300&fit=crop&crop=face",
    name: "Sarah Williams",
    title: "Grammar Teacher", 
    colors: "from-green-500 to-emerald-600"
  },
  waiter: {
    image: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?w=300&h=300&fit=crop&crop=face",
    name: "David Martinez",
    title: "Restaurant Server",
    colors: "from-amber-500 to-orange-600"
  },
  assistant: {
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face", 
    name: "Emma Chen",
    title: "Sales Associate",
    colors: "from-purple-500 to-pink-600"
  }
};

export function HumanAvatar({ type, speaking = false, name, className }: HumanAvatarProps) {
  const avatar = avatarData[type];
  const displayName = name || avatar.name;

  return (
    <div className={cn("relative", className)}>
      {/* Main Avatar Container */}
      <div className={cn(
        "relative w-full h-full rounded-2xl overflow-hidden transition-all duration-300",
        speaking && "scale-105 shadow-2xl"
      )}>
        {/* Professional border */}
        <div className={cn(
          `absolute inset-0 rounded-2xl bg-gradient-to-br ${avatar.colors} p-0.5 transition-all duration-300`,
          speaking && "animate-pulse"
        )}>
          <div className="w-full h-full rounded-2xl overflow-hidden bg-background">
            {/* Avatar Image */}
            <img
              src={avatar.image}
              alt={`${displayName} - ${avatar.title}`}
              className={cn(
                "w-full h-full object-cover transition-all duration-300",
                speaking && "brightness-110 contrast-105"
              )}
            />
            
            {/* Speaking Overlay */}
            {speaking && (
              <div className={cn(
                `absolute inset-0 bg-gradient-to-br ${avatar.colors} opacity-20 animate-pulse`
              )}></div>
            )}
          </div>
        </div>

        {/* Speaking Indicator */}
        {speaking && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></div>
                  <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
                </div>
                <span className="text-white text-xs font-medium">Speaking...</span>
              </div>
            </div>
          </div>
        )}

        {/* Professional Badge */}
        <div className="absolute top-3 right-3">
          <div className={cn(
            `bg-gradient-to-r ${avatar.colors} text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg`,
            speaking && "animate-pulse"
          )}>
            AI
          </div>
        </div>
      </div>

      {/* Name Plate */}
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 shadow-lg">
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">{displayName}</p>
            <p className="text-xs text-muted-foreground">{avatar.title}</p>
          </div>
        </div>
      </div>

      {/* Subtle Animation Ring */}
      {speaking && (
        <div className={cn(
          `absolute inset-0 rounded-2xl bg-gradient-to-br ${avatar.colors} opacity-30 animate-ping`,
          "pointer-events-none"
        )}></div>
      )}
    </div>
  );
}
