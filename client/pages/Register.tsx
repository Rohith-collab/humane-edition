import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Mail, Lock, User, Bot, Sparkles, UserPlus } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !confirmPassword || !displayName) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await register(email, password, displayName);
      navigate('/');
    } catch (error: any) {
      setError('Failed to create account. Please try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-electric-50/50 via-background to-cyber-50/50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-electric-500/20 to-cyber-500/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-cyber-500/20 to-nova-500/20 rounded-full blur-xl float delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-nova-500/20 to-electric-500/20 rounded-full blur-xl animate-bounce-slow delay-500"></div>

      <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-border/50 shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-electric-500 via-cyber-500 to-nova-500 rounded-xl flex items-center justify-center glow">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-electric-500 via-cyber-500 to-nova-500 rounded-xl blur opacity-25"></div>
            </div>
          </div>

          <div>
            <CardTitle className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-electric-500 via-cyber-500 to-nova-500 bg-clip-text text-transparent">
                Join Aangilam
              </span>
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Create your account to start your AI-powered English learning journey
            </CardDescription>
          </div>

          <Badge className="bg-gradient-to-r from-electric-500/20 via-cyber-500/20 to-nova-500/20 text-foreground border-electric-500/30 px-3 py-1">
            <Sparkles className="w-4 h-4 mr-2" />
            Free AI Learning Platform
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

            {/* Display Name Field */}
            <div className="space-y-2">
              <Label htmlFor="displayName" className="text-sm font-medium flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Full Name</span>
              </Label>
              <Input
                id="displayName"
                type="text"
                placeholder="Enter your full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={loading}
                className="bg-background/50 border-border/50 focus:border-electric-500 focus:ring-electric-500"
                required
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center space-x-2">
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
                className="bg-background/50 border-border/50 focus:border-electric-500 focus:ring-electric-500"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="bg-background/50 border-border/50 focus:border-electric-500 focus:ring-electric-500"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Confirm Password</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="bg-background/50 border-border/50 focus:border-electric-500 focus:ring-electric-500"
                required
              />
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-electric-500 via-cyber-500 to-nova-500 hover:from-electric-600 hover:via-cyber-600 hover:to-nova-600 text-white font-semibold py-3 transition-all duration-300 group"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Create Account</span>
                </div>
              )}
            </Button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-electric-500 hover:text-electric-600 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </form>

          {/* Features Preview */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center mb-3">What's included in your free account:</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <Bot className="w-3 h-3 text-electric-500" />
                <span>AI-powered humanoid tutors with emotion detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3 h-3 text-cyber-500" />
                <span>Voice recognition and pronunciation coaching</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-3 h-3 text-nova-500" />
                <span>9+ practice modes: interviews, presentations, social chat</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3 h-3 text-electric-500" />
                <span>Personalized learning with progress tracking</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
