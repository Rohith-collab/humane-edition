import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  // Allow demo access to bot-chat without authentication
  const isDemoRoute = location.pathname === "/bot-chat";

  if (loading && !isDemoRoute) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nova-50/50 via-background to-electric-50/50 flex items-center justify-center">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 p-8">
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-nova-500 via-electric-500 to-cyber-500 rounded-xl flex items-center justify-center glow">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-nova-500 via-electric-500 to-cyber-500 rounded-xl blur opacity-25"></div>
            </div>
            <div className="text-center space-y-2">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-nova-500" />
                <span className="text-foreground font-medium">
                  Loading Aangilam...
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Preparing your AI learning experience
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Allow demo access to bot-chat or authenticated access to all routes
  return currentUser || isDemoRoute ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
