import { Link } from "react-router-dom";
import { Button } from "./button";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

// Navigation items removed - home navigation handled by logo/app name click

export function PublicNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-nova-500 via-electric-500 to-cyber-500 rounded-xl flex items-center justify-center glow">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-nova-500 via-electric-500 to-cyber-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-nova-400 via-electric-400 to-cyber-400 bg-clip-text text-transparent">
                Aangilam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Items removed, home navigation handled by logo */}

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="flex items-center space-x-2 hover:bg-nova-500/10 hover:text-nova-400"
              >
                <Link to="/login">
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white glow-electric transition-all duration-300"
              >
                <Link to="/register">
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span>Sign Up</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 bg-gradient-to-b from-background via-background/95 to-background/90 backdrop-blur-lg rounded-b-xl border-x border-b border-border/50">
            {/* Mobile Auth Buttons */}
            <div className="px-2 pt-4 space-y-3">
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full flex items-center justify-center space-x-2 hover:bg-nova-500/10 hover:text-nova-400"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/login">
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white glow-electric transition-all duration-300"
                  asChild
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Link to="/register">
                    <UserPlus className="w-4 h-4 mr-2" />
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
