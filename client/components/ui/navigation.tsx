import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Home,
  LayoutDashboard,
  Play,
  BookOpen,
  Mic,
  Theater,
  Settings,
  Menu,
  X,
  Presentation,
  Users,
  Briefcase,
  Megaphone,
  Globe2,
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Practice Mode", href: "/practice", icon: Play },
  { name: "Grammar Tutor", href: "/grammar", icon: BookOpen },
  { name: "Pronunciation Coach", href: "/pronunciation", icon: Mic },
  { name: "Story Mode", href: "/stories", icon: Theater },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navigation() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-nova-500 via-electric-500 to-cyber-500 rounded-xl flex items-center justify-center glow">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-nova-500 via-electric-500 to-cyber-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-nova-400 via-electric-400 to-cyber-400 bg-clip-text text-transparent">
                Aangilam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 group relative",
                    isActive
                      ? "text-nova-400 bg-nova-500/10 glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-nova-500/20 via-electric-500/20 to-cyber-500/20 rounded-lg -z-10"></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-medium glow-electric transition-all duration-300">
              Start Learning
            </Button>
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
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center space-x-3 rounded-lg mx-2",
                    isActive
                      ? "text-nova-400 bg-nova-500/10 glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="px-2 pt-4">
              <Button className="w-full bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-medium glow-electric transition-all duration-300">
                Start Learning
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
