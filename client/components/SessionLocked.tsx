import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Lock, 
  Clock, 
  Calendar, 
  ArrowLeft, 
  TrendingUp,
  RotateCcw,
  Timer
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatMinutes } from "@/lib/usageTracking";

interface SessionLockedProps {
  practiceType: string;
  displayName: string;
  usedMinutes: number;
  limitMinutes: number;
  onGoBack?: () => void;
}

export function SessionLocked({
  practiceType,
  displayName,
  usedMinutes,
  limitMinutes,
  onGoBack,
}: SessionLockedProps) {
  const usagePercentage = (usedMinutes / limitMinutes) * 100;
  
  const getResetTime = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const hoursUntilReset = Math.ceil((tomorrow.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (hoursUntilReset === 1) {
      return "1 hour";
    } else if (hoursUntilReset < 1) {
      const minutesUntilReset = Math.ceil((tomorrow.getTime() - now.getTime()) / (1000 * 60));
      return `${minutesUntilReset} minutes`;
    } else {
      return `${hoursUntilReset} hours`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-card/80 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
            <Lock className="w-8 h-8 text-amber-500" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-foreground">
              Session Limit Reached
            </CardTitle>
            <p className="text-muted-foreground">
              You've completed your daily {displayName} practice session
            </p>
          </div>

          <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/30">
            <Timer className="w-3 h-3 mr-1" />
            Daily Limit: {formatMinutes(limitMinutes)}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Usage Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Today's Usage</span>
              <span className="font-medium text-foreground">
                {formatMinutes(usedMinutes)} / {formatMinutes(limitMinutes)}
              </span>
            </div>
            <Progress 
              value={Math.min(usagePercentage, 100)} 
              className="h-2"
            />
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <span>{usagePercentage.toFixed(0)}% of daily limit used</span>
            </div>
          </div>

          {/* Reset Information */}
          <div className="bg-muted/30 rounded-lg p-4 border border-border/30">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-nova-500/20 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-4 h-4 text-nova-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Limit resets in {getResetTime()}
                </p>
                <p className="text-xs text-muted-foreground">
                  New practice sessions will be available tomorrow
                </p>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-electric-500/5 rounded-lg p-4 border border-electric-500/20">
            <p className="text-sm font-medium text-foreground mb-2">
              Continue learning with:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Try other available practice modes</li>
              <li>• Review your progress on the dashboard</li>
              <li>• Check grammar tips and study materials</li>
              <li>• Plan tomorrow's practice sessions</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <Link to="/dashboard" className="w-full">
              <Button className="w-full bg-gradient-to-r from-nova-500 to-electric-500 hover:from-nova-600 hover:to-electric-600 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                View Progress Dashboard
              </Button>
            </Link>

            <div className="flex space-x-3">
              <Link to="/practice" className="flex-1">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Other Practices
                </Button>
              </Link>
              
              {onGoBack && (
                <Button 
                  variant="ghost" 
                  onClick={onGoBack}
                  className="flex-1"
                >
                  Go Back
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
