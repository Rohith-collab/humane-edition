import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { AlertCircle, Mail, Lock, Bot, Sparkles, LogIn } from "lucide-react";
import FirebaseDebug from "@/components/FirebaseDebug";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error: any) {
      setError(
        error.message || "Failed to log in. Please check your credentials.",
      );
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-background to-purple-50/50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-nova-500/20 to-electric-500/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-electric-500/20 to-cyber-500/20 rounded-full blur-xl float delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-cyber-500/20 to-nova-500/20 rounded-full blur-xl animate-bounce-slow delay-500"></div>

      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F9858961368ae4103b4a3c41674c30c55%2F2fd3f91b344249a2a81910776f370ec7?format=webp&width=800"
                alt="Power My English Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 bg-clip-text text-transparent">
                Welcome to Angilam
              </span>
            </CardTitle>
            <div className="mt-2 mb-3">
              <p className="text-xs font-medium text-electric-500/80 tracking-wide uppercase">
                powered by power my english
              </p>
            </div>
            <CardDescription className="text-muted-foreground">
              Sign in to access your AI-powered English learning experience
            </CardDescription>
          </div>

          <Badge className="bg-gradient-to-r from-nova-500/20 via-electric-500/20 to-cyber-500/20 text-foreground border-nova-500/30 px-3 py-1">
            <Bot className="w-4 h-4 mr-2" />
            AI-Powered Learning Platform
          </Badge>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Alert */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-red-500 text-sm">{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="bg-background/50 border-border/50 focus:border-nova-500 focus:ring-nova-500"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium flex items-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="bg-background/50 border-border/50 focus:border-nova-500 focus:ring-nova-500"
                required
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-semibold py-3 transition-all duration-300 group"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Sign In</span>
                </div>
              )}
            </Button>

            {/* Register Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-nova-500 hover:text-nova-600 font-medium transition-colors"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </form>

          {/* Features Preview */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center mb-3">
              What you'll get access to:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3 h-3 text-nova-500" />
                <span>AI Tutors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bot className="w-3 h-3 text-electric-500" />
                <span>Voice Practice</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3 h-3 text-cyber-500" />
                <span>Emotion Detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <Bot className="w-3 h-3 text-nova-500" />
                <span>9+ Practice Modes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Firebase Debug Panel (Development Only) */}
      <FirebaseDebug />
    </div>
  );
}
