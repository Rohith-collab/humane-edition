import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAnalytics } from "@/contexts/UserAnalyticsContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  MessageSquare,
  Award,
  Zap,
  ArrowLeft,
  RotateCcw,
  Star,
  Trophy,
  Flame,
  Brain,
  BarChart3,
  Users,
  Volume2,
  Play,
  Pause,
  ChevronRight,
  Sparkles,
  Activity,
  Eye,
  Coffee,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
} from "recharts";

interface UserStats {
  totalSessions: number;
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  fluencyScore: number;
  weeklyGoal: number;
  weeklyProgress: number;
  lastSessionDate: string;
  practiceModulesCompleted: number;
  conversationsHeld: number;
  wordsLearned: number;
  pronunciationAccuracy: number;
}

interface ModuleProgress {
  module: string;
  completed: number;
  total: number;
  accuracy: number;
  timeSpent: number;
}

interface WeeklyData {
  day: string;
  sessions: number;
  hours: number;
  fluency: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  requirement?: number;
  color: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { analytics, loading: analyticsLoading } = useUserAnalytics();
  const navigate = useNavigate();
  const [selectedMetric, setSelectedMetric] = useState<string>("fluency");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string>("");
  const [timeOfDay, setTimeOfDay] = useState<string>("");
  const [animatedStats, setAnimatedStats] = useState({
    fluencyScore: 0,
    currentStreak: 0,
    totalSessions: 0,
    weeklyProgress: 0,
  });

  const userStats: UserStats = analytics
    ? {
        totalSessions: analytics.totalSessions,
        totalHours: analytics.totalHours,
        currentStreak: analytics.currentStreak,
        longestStreak: analytics.longestStreak,
        fluencyScore: analytics.fluencyScore,
        weeklyGoal: analytics.weeklyGoal,
        weeklyProgress: analytics.weeklyProgress,
        lastSessionDate: analytics.lastSessionDate,
        practiceModulesCompleted: analytics.practiceModulesCompleted,
        conversationsHeld: analytics.conversationsHeld,
        wordsLearned: analytics.wordsLearned,
        pronunciationAccuracy: analytics.pronunciationAccuracy,
      }
    : {
        totalSessions: 47,
        totalHours: 35.8,
        currentStreak: 12,
        longestStreak: 25,
        fluencyScore: 78,
        weeklyGoal: 10,
        weeklyProgress: 7.2,
        lastSessionDate: new Date().toISOString().split('T')[0],
        practiceModulesCompleted: 15,
        conversationsHeld: 34,
        wordsLearned: 245,
        pronunciationAccuracy: 85,
      };

  const moduleProgress: ModuleProgress[] = analytics
    ? [
        { module: "Business English", ...analytics.moduleProgress.business },
        { module: "Social Conversation", ...analytics.moduleProgress.social },
        { module: "Interview Prep", ...analytics.moduleProgress.interview },
        {
          module: "Presentation Skills",
          ...analytics.moduleProgress.presentation,
        },
        {
          module: "Cultural Communication",
          ...analytics.moduleProgress.cultural,
        },
        { module: "Grammar Tutor", ...analytics.moduleProgress.grammar },
        { module: "Humanoid Tutor", ...analytics.moduleProgress.humanoid },
      ]
    : [
        {
          module: "Business English",
          completed: 8,
          total: 12,
          accuracy: 87,
          timeSpent: 4.2,
        },
        {
          module: "Social Conversation",
          completed: 7,
          total: 10,
          accuracy: 92,
          timeSpent: 3.1,
        },
        {
          module: "Interview Prep",
          completed: 5,
          total: 8,
          accuracy: 78,
          timeSpent: 2.8,
        },
        {
          module: "Presentation Skills",
          completed: 6,
          total: 9,
          accuracy: 84,
          timeSpent: 3.5,
        },
        {
          module: "Cultural Communication",
          completed: 4,
          total: 7,
          accuracy: 89,
          timeSpent: 2.1,
        },
        {
          module: "Grammar Tutor",
          completed: 12,
          total: 15,
          accuracy: 95,
          timeSpent: 5.8,
        },
        {
          module: "Humanoid Tutor",
          completed: 15,
          total: 20,
          accuracy: 82,
          timeSpent: 6.2,
        },
      ];

  const weeklyData: WeeklyData[] = analytics?.weeklyData.length
    ? analytics.weeklyData
    : [
        { day: "Mon", sessions: 2, hours: 1.5, fluency: 75 },
        { day: "Tue", sessions: 3, hours: 2.1, fluency: 76 },
        { day: "Wed", sessions: 1, hours: 0.8, fluency: 77 },
        { day: "Thu", sessions: 2, hours: 1.7, fluency: 78 },
        { day: "Fri", sessions: 3, hours: 2.3, fluency: 79 },
        { day: "Sat", sessions: 1, hours: 1.1, fluency: 78 },
        { day: "Sun", sessions: 2, hours: 1.8, fluency: 80 },
      ];

  const achievements: Achievement[] = [
    {
      id: "first-week",
      title: "First Steps",
      description: "Completed your first week of learning",
      icon: "🎯",
      earned: true,
      color: "from-yellow-500/20 to-yellow-600/10",
      rarity: "common",
    },
    {
      id: "streak-7",
      title: "Week Warrior",
      description: "Maintained a 7-day learning streak",
      icon: "🔥",
      earned: true,
      color: "from-orange-500/20 to-orange-600/10",
      rarity: "common",
    },
    {
      id: "conversations-10",
      title: "Conversation Starter",
      description: "Completed 10 AI conversations",
      icon: "💬",
      earned: true,
      progress: 34,
      requirement: 10,
      color: "from-green-500/20 to-green-600/10",
      rarity: "rare",
    },
    {
      id: "fluency-75",
      title: "Rising Star",
      description: "Reached 75% fluency score",
      icon: "⭐",
      earned: true,
      color: "from-purple-500/20 to-purple-600/10",
      rarity: "epic",
    },
    {
      id: "streak-30",
      title: "Dedication Master",
      description: "Achieve a 30-day streak",
      icon: "🏆",
      earned: false,
      progress: 12,
      requirement: 30,
      color: "from-blue-500/20 to-blue-600/10",
      rarity: "legendary",
    },
    {
      id: "fluency-90",
      title: "Expert Speaker",
      description: "Reach 90% fluency score",
      icon: "🌟",
      earned: false,
      progress: 78,
      requirement: 90,
      color: "from-indigo-500/20 to-indigo-600/10",
      rarity: "legendary",
    },
  ];

  const fluencyLevels = [
    { name: "Beginner", value: 15, color: "#ef4444" },
    { name: "Intermediate", value: 35, color: "#f59e0b" },
    { name: "Advanced", value: 30, color: "#10b981" },
    { name: "Expert", value: 20, color: "#3b82f6" },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "night";
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 30) return "🏆";
    if (streak >= 15) return "🔥";
    if (streak >= 7) return "⚡";
    if (streak >= 3) return "✨";
    return "💫";
  };

  const getFluencyLevel = (score: number) => {
    if (score >= 90)
      return {
        level: "Expert",
        color: "bg-blue-500",
        textColor: "text-blue-700",
        bgGradient: "from-blue-500/20 to-blue-600/10",
      };
    if (score >= 75)
      return {
        level: "Advanced",
        color: "bg-green-500",
        textColor: "text-green-700",
        bgGradient: "from-green-500/20 to-green-600/10",
      };
    if (score >= 50)
      return {
        level: "Intermediate",
        color: "bg-yellow-500",
        textColor: "text-yellow-700",
        bgGradient: "from-yellow-500/20 to-yellow-600/10",
      };
    return {
      level: "Beginner",
      color: "bg-red-500",
      textColor: "text-red-700",
      bgGradient: "from-red-500/20 to-red-600/10",
    };
  };

  const fluencyLevel = getFluencyLevel(userStats.fluencyScore);

  // Animate numbers on mount
  useEffect(() => {
    setTimeOfDay(getTimeOfDay());

    const animateValue = (
      start: number,
      end: number,
      duration: number,
      key: keyof typeof animatedStats,
    ) => {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setAnimatedStats((prev) => ({
          ...prev,
          [key]:
            current >= end
              ? key === "weeklyProgress"
                ? Number(end.toFixed(1))
                : Math.round(end)
              : prev[key],
        }));
      }, 16);

      return timer;
    };

    const timers = [
      setTimeout(
        () => animateValue(0, userStats.fluencyScore, 1500, "fluencyScore"),
        200,
      ),
      setTimeout(
        () => animateValue(0, userStats.currentStreak, 1200, "currentStreak"),
        400,
      ),
      setTimeout(
        () => animateValue(0, userStats.totalSessions, 1800, "totalSessions"),
        600,
      ),
      setTimeout(
        () => animateValue(0, userStats.weeklyProgress, 1400, "weeklyProgress"),
        800,
      ),
    ];

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [
    userStats.fluencyScore,
    userStats.currentStreak,
    userStats.totalSessions,
    userStats.weeklyProgress,
  ]);

  // Refresh data when user returns to dashboard
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && currentUser) {
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [currentUser]);

  if (analyticsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-nova-500/30 border-t-nova-500 rounded-full animate-spin mx-auto"></div>
            <div
              className="absolute inset-0 w-20 h-20 border-4 border-electric-500/20 border-r-electric-500 rounded-full animate-spin mx-auto"
              style={{ animationDirection: "reverse", animationDuration: "3s" }}
            ></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground animate-pulse">
              Loading your dashboard...
            </h2>
            <p className="text-muted-foreground animate-pulse">
              Analyzing your learning progress
            </p>
          </div>
          <div className="flex justify-center space-x-1">
            <div
              className="w-2 h-2 bg-nova-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-electric-500 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-cyber-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-all duration-1000 ${timeOfDay === "night" ? "from-slate-900 via-slate-800 to-slate-900" : timeOfDay === "morning" ? "from-amber-50/5 via-background to-orange-50/5" : ""}`}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Floating Action Buttons */}
        <div className="fixed top-6 right-6 z-50 flex space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-foreground hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:animate-bounce-slow" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 bg-nova-500/10 backdrop-blur-md border border-nova-500/20 rounded-xl px-4 py-3 text-foreground hover:bg-nova-500/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <RotateCcw className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>

        {/* Animated Header Section */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <Avatar className="h-20 w-20 ring-4 ring-nova-500/30 transition-all duration-300 group-hover:ring-nova-500/50 group-hover:scale-105">
                  <AvatarImage src="" alt={currentUser?.displayName || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-nova-500 to-electric-500 text-white text-2xl font-bold">
                    {currentUser?.displayName?.charAt(0) ||
                      currentUser?.email?.charAt(0) ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-cyber-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 bg-clip-text text-transparent animate-gradient">
                  {getGreeting()},{" "}
                  {currentUser?.displayName?.split(" ")[0] || "Learner"}!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Ready to continue your English learning journey? ✨
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Activity className="h-4 w-4" />
                    <span>Last active: Today</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>Viewing dashboard</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Animated Logo */}
            <div className="flex flex-col items-center space-y-3 group">
              <div className="relative">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9858961368ae4103b4a3c41674c30c55%2F2fd3f91b344249a2a81910776f370ec7?format=webp&width=800"
                  alt="Power My English Logo"
                  className="w-16 h-16 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-nova-500/20 to-electric-500/20 rounded-full blur-lg group-hover:from-nova-500/40 group-hover:to-electric-500/40 transition-all duration-300"></div>
              </div>
              <p className="text-xs font-medium text-electric-500/80 tracking-wide uppercase group-hover:text-electric-500 transition-colors duration-300">
                powered by power my english
              </p>
            </div>
          </div>

          {/* Animated Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card
              className="bg-gradient-to-br from-nova-500/10 to-nova-600/5 border-nova-200/20 hover:from-nova-500/20 hover:to-nova-600/10 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group"
              onMouseEnter={() => setHoveredCard("fluency")}
              onMouseLeave={() => setHoveredCard("")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Fluency Score
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-bold text-foreground tabular-nums">
                        {animatedStats.fluencyScore}%
                      </p>
                      {hoveredCard === "fluency" && (
                        <div className="animate-bounce-slow">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${fluencyLevel.textColor} ${fluencyLevel.bgGradient} border-0 group-hover:scale-105 transition-transform duration-300`}
                    >
                      {fluencyLevel.level}
                    </Badge>
                  </div>
                  <div className="relative">
                    <Target className="h-10 w-10 text-nova-500 group-hover:animate-pulse" />
                    <div className="absolute inset-0 bg-nova-500/20 rounded-full blur-md group-hover:bg-nova-500/40 transition-all duration-300"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-gradient-to-br from-electric-500/10 to-electric-600/5 border-electric-200/20 hover:from-electric-500/20 hover:to-electric-600/10 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group"
              onMouseEnter={() => setHoveredCard("streak")}
              onMouseLeave={() => setHoveredCard("")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Current Streak
                    </p>
                    <div className="flex items-center space-x-2">
                      <p className="text-3xl font-bold text-foreground tabular-nums flex items-center">
                        {animatedStats.currentStreak}
                        <span className="ml-2 text-2xl animate-bounce-slow">
                          {getStreakEmoji(userStats.currentStreak)}
                        </span>
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Best: {userStats.longestStreak} days
                    </p>
                  </div>
                  <div className="relative">
                    <Zap className="h-10 w-10 text-electric-500 group-hover:animate-pulse" />
                    {hoveredCard === "streak" && (
                      <div className="absolute inset-0 bg-electric-500/30 rounded-full animate-ping"></div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-gradient-to-br from-cyber-500/10 to-cyber-600/5 border-cyber-200/20 hover:from-cyber-500/20 hover:to-cyber-600/10 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group"
              onMouseEnter={() => setHoveredCard("sessions")}
              onMouseLeave={() => setHoveredCard("")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Total Sessions
                    </p>
                    <p className="text-3xl font-bold text-foreground tabular-nums">
                      {animatedStats.totalSessions}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {userStats.totalHours.toFixed(1)}h total practice
                    </p>
                  </div>
                  <div className="relative">
                    <Clock
                      className="h-10 w-10 text-cyber-500 group-hover:animate-spin"
                      style={{ animationDuration: "3s" }}
                    />
                    <div className="absolute inset-0 bg-cyber-500/20 rounded-full blur-md group-hover:bg-cyber-500/40 transition-all duration-300"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200/20 hover:from-green-500/20 hover:to-green-600/10 transition-all duration-500 hover:scale-105 hover:shadow-xl cursor-pointer group"
              onMouseEnter={() => setHoveredCard("goal")}
              onMouseLeave={() => setHoveredCard("")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      Weekly Goal
                    </p>
                    <p className="text-3xl font-bold text-foreground tabular-nums">
                      {userStats.weeklyProgress.toFixed(1)}h
                    </p>
                    <div className="space-y-1">
                      <Progress
                        value={
                          (userStats.weeklyProgress / userStats.weeklyGoal) *
                          100
                        }
                        className="h-2 transition-all duration-500 group-hover:h-3"
                      />
                      <p className="text-xs text-muted-foreground">
                        {Math.round(
                          (userStats.weeklyProgress / userStats.weeklyGoal) *
                            100,
                        )}
                        % complete
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <TrendingUp className="h-10 w-10 text-green-500 group-hover:animate-bounce" />
                    <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md group-hover:bg-green-500/40 transition-all duration-300"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-1">
            <TabsTrigger
              value="overview"
              className="rounded-lg transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-nova-500 data-[state=active]:to-electric-500 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="progress"
              className="rounded-lg transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-electric-500 data-[state=active]:to-cyber-500 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Progress
            </TabsTrigger>
            <TabsTrigger
              value="modules"
              className="rounded-lg transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyber-500 data-[state=active]:to-nova-500 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Modules
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="rounded-lg transition-all duration-300 hover:scale-105 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Weekly Activity Chart */}
              <Card className="hover:shadow-xl transition-all duration-500 group border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2 group-hover:text-nova-500 transition-colors duration-300">
                        <Activity className="h-5 w-5" />
                        <span>Weekly Activity</span>
                      </CardTitle>
                      <CardDescription className="mt-1">
                        Your learning sessions this week
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:scale-110 transition-transform duration-300"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                      />
                      <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        }}
                      />
                      <Bar
                        dataKey="sessions"
                        fill="url(#sessionGradient)"
                        radius={[4, 4, 0, 0]}
                      />
                      <defs>
                        <linearGradient
                          id="sessionGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.9}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.6}
                          />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Enhanced Fluency Progress Chart */}
              <Card className="hover:shadow-xl transition-all duration-500 group border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 group-hover:text-green-500 transition-colors duration-300">
                    <Brain className="h-5 w-5" />
                    <span>Fluency Progress</span>
                  </CardTitle>
                  <CardDescription>
                    Your speaking improvement trajectory
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis
                        dataKey="day"
                        tick={{ fontSize: 12 }}
                        axisLine={false}
                      />
                      <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="fluency"
                        stroke="#10b981"
                        strokeWidth={3}
                        fill="url(#fluencyGradient)"
                      />
                      <defs>
                        <linearGradient
                          id="fluencyGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#10b981"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#10b981"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer group border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium group-hover:text-blue-500 transition-colors duration-300">
                    Practice Modules
                  </CardTitle>
                  <BookOpen className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 group-hover:animate-bounce transition-all duration-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 tabular-nums">
                    {userStats.practiceModulesCompleted}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    completed this month
                  </p>
                  <div className="flex items-center mt-2 text-xs text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+{Math.max(1, Math.floor(userStats.practiceModulesCompleted * 0.2))} this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer group border-0 bg-gradient-to-br from-green-500/10 to-green-600/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium group-hover:text-green-500 transition-colors duration-300">
                    AI Conversations
                  </CardTitle>
                  <MessageSquare className="h-5 w-5 text-muted-foreground group-hover:text-green-500 group-hover:animate-bounce transition-all duration-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 tabular-nums">
                    {userStats.conversationsHeld}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    meaningful conversations
                  </p>
                  <div className="flex items-center mt-2 text-xs text-green-600">
                    <Coffee className="h-3 w-3 mr-1" />
                    <span>Avg {Math.round((userStats.totalHours * 60) / Math.max(1, userStats.conversationsHeld))} min each</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer group border-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium group-hover:text-purple-500 transition-colors duration-300">
                    Words Mastered
                  </CardTitle>
                  <Award className="h-5 w-5 text-muted-foreground group-hover:text-purple-500 group-hover:animate-bounce transition-all duration-300" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 tabular-nums">
                    {userStats.wordsLearned}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    vocabulary acquired
                  </p>
                  <div className="flex items-center mt-2 text-xs text-purple-600">
                    <Sparkles className="h-3 w-3 mr-1" />
                    <span>+{Math.max(5, Math.floor(userStats.wordsLearned * 0.06))} this week</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Overall Progress */}
              <Card className="hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-nova-500" />
                    <span>Overall Learning Progress</span>
                  </CardTitle>
                  <CardDescription>
                    Track your improvement across all skill areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      name: "Speaking Fluency",
                      value: userStats.fluencyScore,
                      color: "nova",
                    },
                    {
                      name: "Pronunciation",
                      value: userStats.pronunciationAccuracy,
                      color: "electric",
                    },
                    { name: "Grammar", value: 92, color: "cyber" },
                    { name: "Vocabulary", value: 88, color: "green" },
                  ].map((skill, index) => (
                    <div
                      key={skill.name}
                      className="space-y-2 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex justify-between text-sm">
                        <span className="font-medium group-hover:text-foreground transition-colors duration-300">
                          {skill.name}
                        </span>
                        <span className="font-bold tabular-nums">
                          {skill.value}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress
                          value={skill.value}
                          className="h-3 transition-all duration-500 group-hover:h-4"
                        />
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent to-white/20 rounded-full transition-all duration-500 group-hover:opacity-100 opacity-0"
                          style={{ width: `${skill.value}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>
                          {skill.value >= 90
                            ? "Expert"
                            : skill.value >= 75
                              ? "Advanced"
                              : skill.value >= 50
                                ? "Intermediate"
                                : "Beginner"}
                        </span>
                        <div className="h-1 w-1 bg-muted-foreground rounded-full"></div>
                        <span>
                          +{Math.floor(Math.random() * 5) + 1} this week
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Enhanced Skill Level Distribution */}
              <Card className="hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>Skill Level Distribution</span>
                  </CardTitle>
                  <CardDescription>
                    Your current standing across different proficiency levels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={fluencyLevels}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={40}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {fluencyLevels.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(0,0,0,0.8)",
                          border: "none",
                          borderRadius: "8px",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-8 animate-fadeIn">
            <div className="grid gap-6">
              {moduleProgress.map((module, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-500 hover:scale-[1.02] cursor-pointer group border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="space-y-1">
                        <h3 className="font-bold text-xl group-hover:text-nova-500 transition-colors duration-300">
                          {module.module}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {module.completed} of {module.total} lessons completed
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{module.timeSpent}h practiced</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Target className="h-3 w-3" />
                            <span>
                              {module.total - module.completed} remaining
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="relative">
                          <p className="text-3xl font-bold text-nova-600 tabular-nums">
                            {module.accuracy}%
                          </p>
                          <div className="absolute inset-0 bg-nova-500/20 rounded-lg blur-lg group-hover:bg-nova-500/40 transition-all duration-300"></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          accuracy score
                        </p>
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-nova-500/20 to-electric-500/20"
                        >
                          {module.accuracy >= 90
                            ? "Excellent"
                            : module.accuracy >= 80
                              ? "Good"
                              : "Improving"}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span>Completion Progress</span>
                        <span className="tabular-nums">
                          {Math.round((module.completed / module.total) * 100)}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress
                          value={(module.completed / module.total) * 100}
                          className="h-2 transition-all duration-500 group-hover:h-3"
                        />
                        <div
                          className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent to-white/30 rounded-full transition-all duration-500 group-hover:opacity-100 opacity-0"
                          style={{
                            width: `${(module.completed / module.total) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-4 hover:bg-nova-500/10 hover:text-nova-500 transition-all duration-300 group/btn"
                    >
                      <span>Continue Learning</span>
                      <ChevronRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent
            value="achievements"
            className="space-y-8 animate-fadeIn"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={achievement.id}
                  className={`bg-gradient-to-br ${achievement.color} border-0 hover:shadow-xl transition-all duration-500 hover:scale-105 cursor-pointer group relative overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="text-5xl mb-4 group-hover:animate-bounce-slow">
                      {achievement.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-foreground transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {achievement.description}
                    </p>

                    {achievement.earned ? (
                      <Badge
                        variant="secondary"
                        className="bg-green-500/20 text-green-700 border-green-500/30"
                      >
                        <Award className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    ) : (
                      <div className="space-y-2">
                        {achievement.progress && achievement.requirement && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>
                                {achievement.progress}/{achievement.requirement}
                              </span>
                            </div>
                            <Progress
                              value={
                                (achievement.progress /
                                  achievement.requirement) *
                                100
                              }
                              className="h-1"
                            />
                          </div>
                        )}
                        <Badge
                          variant="outline"
                          className="border-muted-foreground/30 text-muted-foreground"
                        >
                          {achievement.progress && achievement.requirement
                            ? "In Progress"
                            : "Locked"}
                        </Badge>
                      </div>
                    )}

                    <div className="absolute top-2 right-2">
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          achievement.rarity === "legendary"
                            ? "bg-yellow-500/20 text-yellow-700 border-yellow-500/30"
                            : achievement.rarity === "epic"
                              ? "bg-purple-500/20 text-purple-700 border-purple-500/30"
                              : achievement.rarity === "rare"
                                ? "bg-blue-500/20 text-blue-700 border-blue-500/30"
                                : "bg-gray-500/20 text-gray-700 border-gray-500/30"
                        }`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </CardContent>

                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
