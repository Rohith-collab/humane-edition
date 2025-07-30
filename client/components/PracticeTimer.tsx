import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PracticeTimerProps {
  elapsedTime: number;
  formattedTime: string;
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  className?: string;
  compact?: boolean;
}

export function PracticeTimer({
  elapsedTime,
  formattedTime,
  isRunning,
  onStart,
  onPause,
  onReset,
  className,
  compact = false,
}: PracticeTimerProps) {
  if (compact) {
    return (
      <div className={cn("flex items-center space-x-2", className)}>
        <Badge variant="outline" className="flex items-center space-x-1 text-xs">
          <Clock className="w-3 h-3" />
          <span>{formattedTime}</span>
        </Badge>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={isRunning ? onPause : onStart}
            className="h-6 w-6 p-0"
          >
            {isRunning ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-6 w-6 p-0"
          >
            <RotateCcw className="w-3 h-3" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center space-x-3 bg-card/50 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50",
        className,
      )}
    >
      <div className="flex items-center space-x-2">
        <div
          className={cn(
            "w-2 h-2 rounded-full",
            isRunning
              ? "bg-green-500 animate-pulse"
              : elapsedTime > 0
                ? "bg-yellow-500"
                : "bg-gray-400",
          )}
        />
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span className="font-mono text-sm font-medium text-foreground">
          {formattedTime}
        </span>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={isRunning ? onPause : onStart}
          className="h-7 w-7 p-0"
        >
          {isRunning ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-7 w-7 p-0"
        >
          <RotateCcw className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
