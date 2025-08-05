import React from 'react';
import { cn } from '../lib/utils';

interface AvatarProps {
  speaking?: boolean;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ speaking = false, className }) => {
  return (
    <div className={cn("relative w-32 h-32 mx-auto", className)}>
      {/* Avatar Circle */}
      <div
        className={cn(
          "w-full h-full rounded-full bg-gradient-to-br from-nova-400 to-electric-500 p-1 transition-all duration-300",
          speaking && "animate-pulse shadow-2xl glow"
        )}
      >
        <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
          {/* Avatar Image or Placeholder */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-nova-300 to-electric-400 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10.1 9.9 11 11 11V13H7L6 22H18L17 13H13V11C14.1 11 15 10.1 15 9Z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Speaking Indicator */}
      {speaking && (
        <div className="absolute -bottom-2 -right-2">
          <div className="w-6 h-6 bg-cyber-500 rounded-full flex items-center justify-center animate-bounce">
            <svg
              className="w-3 h-3 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C13.1 2 14 2.9 14 4V12C14 13.1 13.1 14 12 14C10.9 14 10 13.1 10 12V4C10 2.9 10.9 2 12 2M19 11C19 15.4 15.4 19 11 19V21H13V23H11V21H9V19C4.6 19 1 15.4 1 11H3C3 14.3 5.7 17 9 17H15C18.3 17 21 14.3 21 11H19Z" />
            </svg>
          </div>
        </div>
      )}

      {/* Pulse Animation Ring */}
      {speaking && (
        <div className="absolute inset-0 rounded-full border-2 border-nova-400 animate-ping opacity-75" />
      )}
    </div>
  );
};

export default Avatar;
