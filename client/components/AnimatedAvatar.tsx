import React from 'react';
import { cn } from "@/lib/utils";

interface AnimatedAvatarProps {
  type: 'waiter' | 'customer' | 'ai' | 'user' | 'human-interviewer' | 'human-teacher' | 'human-assistant';
  speaking?: boolean;
  emotion?: 'happy' | 'neutral' | 'thinking';
  className?: string;
}

export function AnimatedAvatar({ 
  type, 
  speaking = false, 
  emotion = 'neutral',
  className 
}: AnimatedAvatarProps) {
  const getAvatarContent = () => {
    switch (type) {
      case 'waiter':
        return (
          <div className="relative w-full h-full">
            {/* Waiter Character */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="url(#waiterBg)"
                  className={cn(
                    "transition-all duration-300",
                    speaking && "animate-pulse"
                  )}
                />
                
                {/* Waiter body */}
                <g className={cn(
                  "transition-transform duration-200",
                  speaking && "animate-bounce"
                )}>
                  {/* Vest */}
                  <path
                    d="M40 65 Q40 55 50 55 L70 55 Q80 55 80 65 L80 85 Q80 95 70 95 L50 95 Q40 95 40 85 Z"
                    fill="#1e3a8a"
                    stroke="#1e40af"
                    strokeWidth="1"
                  />
                  
                  {/* Shirt */}
                  <rect x="45" y="60" width="30" height="30" fill="#ffffff" rx="2" />
                  
                  {/* Face */}
                  <circle cx="60" cy="45" r="12" fill="#d4a574" />
                  
                  {/* Hair */}
                  <path
                    d="M48 35 Q60 30 72 35 Q75 38 72 42 L48 42 Q45 38 48 35"
                    fill="#8b4513"
                  />
                  
                  {/* Eyes */}
                  <circle cx="56" cy="43" r="1.5" fill="#000" />
                  <circle cx="64" cy="43" r="1.5" fill="#000" />
                  
                  {/* Mouth */}
                  <path
                    d={speaking 
                      ? "M56 48 Q60 52 64 48" 
                      : emotion === 'happy' 
                        ? "M56 48 Q60 51 64 48"
                        : "M57 48 L63 48"
                    }
                    stroke="#000"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
                  
                  {/* Bow tie */}
                  <path
                    d="M55 55 L58 58 L62 58 L65 55 L62 52 L58 52 Z"
                    fill="#dc2626"
                  />
                  
                  {/* Arms */}
                  <circle cx="38" cy="70" r="4" fill="#d4a574" />
                  <circle cx="82" cy="70" r="4" fill="#d4a574" />
                  
                  {/* Notepad (if speaking) */}
                  {speaking && (
                    <g className="animate-pulse">
                      <rect x="30" y="65" width="8" height="10" fill="#ffffff" stroke="#000" strokeWidth="0.5" />
                      <line x1="32" y1="67" x2="36" y2="67" stroke="#000" strokeWidth="0.3" />
                      <line x1="32" y1="69" x2="36" y2="69" stroke="#000" strokeWidth="0.3" />
                      <line x1="32" y1="71" x2="36" y2="71" stroke="#000" strokeWidth="0.3" />
                    </g>
                  )}
                </g>

                {/* Gradient definitions */}
                <defs>
                  <radialGradient id="waiterBg" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                    <stop offset="100%" stopColor="rgba(29, 78, 216, 0.2)" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
            
            {/* Speaking indicator */}
            {speaking && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
        );

      case 'customer':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="55"
                  fill="url(#customerBg)"
                  className={cn(
                    "transition-all duration-300",
                    speaking && "animate-pulse"
                  )}
                />
                
                {/* Customer body */}
                <g className={cn(
                  "transition-transform duration-200",
                  speaking && "animate-bounce"
                )}>
                  {/* Dress */}
                  <path
                    d="M42 65 Q42 55 52 55 L68 55 Q78 55 78 65 L82 90 Q82 95 77 95 L43 95 Q38 95 38 90 Z"
                    fill="#dc2626"
                    stroke="#b91c1c"
                    strokeWidth="1"
                  />
                  
                  {/* Face */}
                  <circle cx="60" cy="45" r="12" fill="#f3c5a8" />
                  
                  {/* Hair */}
                  <path
                    d="M48 35 Q60 28 72 35 Q74 40 70 44 L50 44 Q46 40 48 35"
                    fill="#4a2c17"
                  />
                  
                  {/* Eyes */}
                  <circle cx="56" cy="43" r="1.5" fill="#000" />
                  <circle cx="64" cy="43" r="1.5" fill="#000" />
                  
                  {/* Eyelashes */}
                  <path d="M54 41 L55 40" stroke="#000" strokeWidth="0.5" />
                  <path d="M66 40 L67 41" stroke="#000" strokeWidth="0.5" />
                  
                  {/* Mouth */}
                  <path
                    d={speaking 
                      ? "M56 48 Q60 52 64 48" 
                      : emotion === 'happy' 
                        ? "M56 48 Q60 51 64 48"
                        : "M57 48 L63 48"
                    }
                    stroke="#000"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                    className="transition-all duration-200"
                  />
                  
                  {/* Arms */}
                  <circle cx="40" cy="70" r="4" fill="#f3c5a8" />
                  <circle cx="80" cy="70" r="4" fill="#f3c5a8" />
                  
                  {/* Menu (if speaking) */}
                  {speaking && (
                    <g className="animate-pulse">
                      <rect x="32" y="62" width="10" height="12" fill="#8b4513" stroke="#654321" strokeWidth="0.5" rx="1" />
                      <rect x="33" y="63" width="8" height="10" fill="#f5f5dc" />
                      <line x1="34" y1="65" x2="40" y2="65" stroke="#000" strokeWidth="0.3" />
                      <line x1="34" y1="67" x2="40" y2="67" stroke="#000" strokeWidth="0.3" />
                      <line x1="34" y1="69" x2="38" y2="69" stroke="#000" strokeWidth="0.3" />
                    </g>
                  )}
                </g>

                {/* Gradient definitions */}
                <defs>
                  <radialGradient id="customerBg" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="rgba(220, 38, 38, 0.1)" />
                    <stop offset="100%" stopColor="rgba(185, 28, 28, 0.2)" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
            
            {/* Speaking indicator */}
            {speaking && (
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
        );

      case 'ai':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "w-full h-full bg-gradient-to-br from-nova-500 to-electric-500 rounded-full flex items-center justify-center transition-all duration-300",
                speaking && "scale-110 glow-electric animate-pulse"
              )}>
                <span className="text-white font-bold text-lg">AI</span>
              </div>
            </div>
            
            {/* AI thinking particles */}
            {speaking && (
              <div className="absolute inset-0">
                <div className="absolute top-2 left-4 w-1 h-1 bg-electric-400 rounded-full animate-ping" style={{ animationDelay: '0ms' }}></div>
                <div className="absolute top-4 right-3 w-1 h-1 bg-cyber-400 rounded-full animate-ping" style={{ animationDelay: '500ms' }}></div>
                <div className="absolute bottom-3 left-3 w-1 h-1 bg-nova-400 rounded-full animate-ping" style={{ animationDelay: '1000ms' }}></div>
              </div>
            )}
          </div>
        );

      case 'user':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "w-full h-full bg-gradient-to-br from-cyber-500 to-nova-500 rounded-full flex items-center justify-center transition-all duration-300",
                speaking && "scale-105 glow-cyber"
              )}>
                <span className="text-white font-bold text-sm">You</span>
              </div>
            </div>
            
            {/* Voice indicator */}
            {speaking && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-4 bg-cyber-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-6 bg-cyber-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-4 bg-cyber-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
        );

      case 'human-interviewer':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "w-full h-full rounded-full overflow-hidden border-2 border-nova-500/50 transition-all duration-300",
                speaking && "scale-105 border-nova-500 shadow-lg shadow-nova-500/30"
              )}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="Professional Interviewer"
                  className={cn(
                    "w-full h-full object-cover transition-all duration-300",
                    speaking && "brightness-110"
                  )}
                />
                {/* Speaking overlay */}
                {speaking && (
                  <div className="absolute inset-0 bg-gradient-to-br from-nova-500/20 to-electric-500/20 animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Voice waves */}
            {speaking && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-nova-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-4 bg-electric-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-5 bg-cyber-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-1 h-4 bg-electric-500 rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></div>
                  <div className="w-1 h-3 bg-nova-500 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            )}
          </div>
        );

      case 'human-teacher':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "w-full h-full rounded-full overflow-hidden border-2 border-emerald-500/50 transition-all duration-300",
                speaking && "scale-105 border-emerald-500 shadow-lg shadow-emerald-500/30"
              )}>
                <img
                  src="https://images.unsplash.com/photo-1559209172-e8d4c2d4b5e3?w=150&h=150&fit=crop&crop=face"
                  alt="Grammar Teacher"
                  className={cn(
                    "w-full h-full object-cover transition-all duration-300",
                    speaking && "brightness-110"
                  )}
                />
                {/* Speaking overlay */}
                {speaking && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Voice waves */}
            {speaking && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-5 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-1 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></div>
                  <div className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            )}
          </div>
        );

      case 'human-assistant':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={cn(
                "w-full h-full rounded-full overflow-hidden border-2 border-blue-500/50 transition-all duration-300",
                speaking && "scale-105 border-blue-500 shadow-lg shadow-blue-500/30"
              )}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
                  alt="Customer Assistant"
                  className={cn(
                    "w-full h-full object-cover transition-all duration-300",
                    speaking && "brightness-110"
                  )}
                />
                {/* Speaking overlay */}
                {speaking && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse"></div>
                )}
              </div>
            </div>

            {/* Voice waves */}
            {speaking && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1 h-5 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '450ms' }}></div>
                  <div className="w-1 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "relative transition-all duration-300",
      speaking && "animate-pulse",
      className
    )}>
      {getAvatarContent()}
    </div>
  );
}
