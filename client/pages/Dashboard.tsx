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

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { analytics, loading: analyticsLoading } = useUserAnalytics();
  const navigate = useNavigate();

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
        totalSessions: 0,
        totalHours: 0,
        currentStreak: 0,
        longestStreak: 0,
        fluencyScore: 0,
        weeklyGoal: 10,
        weeklyProgress: 0,
        lastSessionDate: "",
        practiceModulesCompleted: 0,
        conversationsHeld: 0,
        wordsLearned: 0,
        pronunciationAccuracy: 0,
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
          completed: 0,
          total: 12,
          accuracy: 0,
          timeSpent: 0,
        },
        {
          module: "Social Conversation",
          completed: 0,
          total: 10,
          accuracy: 0,
          timeSpent: 0,
        },
        {
          module: "Interview Prep",
          completed: 0,
          total: 8,
          accuracy: 0,
          timeSpent: 0,
        },
        {
          module: "Presentation Skills",
          completed: 0,
          total: 9,
          accuracy: 0,
          timeSpent: 0,
        },
        {
          module: "Cultural Communication",
          completed: 0,
          total: 7,
          accuracy: 0,
          timeSpent: 0,
        },
        {
          module: "Grammar Tutor",
          completed: 0,
          total: 15,
          accuracy: 0,
          timeSpent: 0,
        },
        {
          module: "Humanoid Tutor",
          completed: 0,
          total: 20,
          accuracy: 0,
          timeSpent: 0,
        },
      ];

  const weeklyData: WeeklyData[] = analytics?.weeklyData.length
    ? analytics.weeklyData
    : [
        {
          day: "Mon",
          sessions: Math.max(0, Math.floor(Math.random() * 3)),
          hours: Math.max(0, Number((Math.random() * 2).toFixed(1))),
          fluency: Math.max(
            0,
            userStats.fluencyScore - 5 + Math.floor(Math.random() * 10),
          ),
        },
        {
          day: "Tue",
          sessions: Math.max(0, Math.floor(Math.random() * 3)),
          hours: Math.max(0, Number((Math.random() * 2).toFixed(1))),
          fluency: Math.max(
            0,
            userStats.fluencyScore - 5 + Math.floor(Math.random() * 10),
          ),
        },
        {
          day: "Wed",
          sessions: Math.max(0, Math.floor(Math.random() * 3)),
          hours: Math.max(0, Number((Math.random() * 2).toFixed(1))),
          fluency: Math.max(
            0,
            userStats.fluencyScore - 5 + Math.floor(Math.random() * 10),
          ),
        },
        {
          day: "Thu",
          sessions: Math.max(0, Math.floor(Math.random() * 3)),
          hours: Math.max(0, Number((Math.random() * 2).toFixed(1))),
          fluency: Math.max(
            0,
            userStats.fluencyScore - 5 + Math.floor(Math.random() * 10),
          ),
        },
        {
          day: "Fri",
          sessions: Math.max(0, Math.floor(Math.random() * 3)),
          hours: Math.max(0, Number((Math.random() * 2).toFixed(1))),
          fluency: Math.max(
            0,
            userStats.fluencyScore - 5 + Math.floor(Math.random() * 10),
          ),
        },
        {
          day: "Sat",
          sessions: Math.max(0, Math.floor(Math.random() * 3)),
          hours: Math.max(0, Number((Math.random() * 2).toFixed(1))),
          fluency: Math.max(
            0,
            userStats.fluencyScore - 5 + Math.floor(Math.random() * 10),
          ),
        },
        {
          day: "Sun",
          sessions: Math.max(0, Math.floor(Math.random() * 3)),
          hours: Math.max(0, Number((Math.random() * 2).toFixed(1))),
          fluency: Math.max(
            0,
            userStats.fluencyScore - 5 + Math.floor(Math.random() * 10),
          ),
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

  const getStreakEmoji = (streak: number) => {
    if (streak >= 10) return "🔥";
    if (streak >= 5) return "⚡";
    if (streak >= 3) return "✨";
    return "💫";
  };

  const getFluencyLevel = (score: number) => {
    if (score >= 90)
      return {
        level: "Expert",
        color: "bg-blue-500",
        textColor: "text-blue-700",
      };
    if (score >= 75)
      return {
        level: "Advanced",
        color: "bg-green-500",
        textColor: "text-green-700",
      };
    if (score >= 50)
      return {
        level: "Intermediate",
        color: "bg-yellow-500",
        textColor: "text-yellow-700",
      };
    return {
      level: "Beginner",
      color: "bg-red-500",
      textColor: "text-red-700",
    };
  };

  const fluencyLevel = getFluencyLevel(userStats.fluencyScore);

  // Refresh data when user returns to dashboard
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && currentUser) {
        // Refresh data when user returns to dashboard
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
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-nova-500/30 border-t-nova-500 rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-semibold text-foreground">
            Loading your dashboard...
          </h2>
          <p className="text-muted-foreground">
            Analyzing your learning progress
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="fixed top-6 right-20 z-50 flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-foreground hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Refresh Button */}
        <button
          onClick={() => window.location.reload()}
          className="fixed top-6 right-6 z-50 flex items-center space-x-2 bg-nova-500/10 backdrop-blur-md border border-nova-500/20 rounded-lg px-4 py-2 text-foreground hover:bg-nova-500/20 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="text-sm font-medium">Refresh</span>
        </button>
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 ring-2 ring-nova-500/30">
                <AvatarImage src="" alt={currentUser?.displayName || ""} />
                <AvatarFallback className="bg-gradient-to-br from-nova-500 to-electric-500 text-white text-xl font-bold">
                  {currentUser?.displayName?.charAt(0) ||
                    currentUser?.email?.charAt(0) ||
                    "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {getGreeting()}, {currentUser?.displayName || "Learner"}!
                </h1>
                <p className="text-muted-foreground">
                  Here's your English learning journey
                </p>
              </div>
            </div>

            {/* Logo and Branding */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F9858961368ae4103b4a3c41674c30c55%2F2fd3f91b344249a2a81910776f370ec7?format=webp&width=800"
                alt="Power My English Logo"
                className="w-16 h-16 object-contain"
              />
              <p className="text-xs font-medium text-electric-500/80 tracking-wide uppercase">
                powered by power my english
              </p>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-nova-500/10 to-nova-600/5 border-nova-200/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Fluency Score
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {userStats.fluencyScore}%
                    </p>
                    <Badge
                      variant="secondary"
                      className={`mt-1 ${fluencyLevel.textColor} ${fluencyLevel.color}/10`}
                    >
                      {fluencyLevel.level}
                    </Badge>
                  </div>
                  <Target className="h-8 w-8 text-nova-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-electric-500/10 to-electric-600/5 border-electric-200/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Current Streak
                    </p>
                    <p className="text-2xl font-bold text-foreground flex items-center">
                      {userStats.currentStreak}{" "}
                      {getStreakEmoji(userStats.currentStreak)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Best: {userStats.longestStreak} days
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-electric-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyber-500/10 to-cyber-600/5 border-cyber-200/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Total Sessions
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {userStats.totalSessions}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {userStats.totalHours}h total
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-cyber-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Weekly Goal
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {userStats.weeklyProgress}h
                    </p>
                    <Progress
                      value={
                        (userStats.weeklyProgress / userStats.weeklyGoal) * 100
                      }
                      className="mt-2"
                    />
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weekly Activity Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>
                    Your learning sessions this week
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sessions" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Fluency Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Fluency Progress</CardTitle>
                  <CardDescription>
                    Your speaking improvement over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="fluency"
                        stroke="#10b981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Learning Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Practice Modules
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userStats.practiceModulesCompleted}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    completed this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversations
                  </CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userStats.conversationsHeld}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    AI conversations held
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Words Learned
                  </CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {userStats.wordsLearned}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    new vocabulary acquired
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Overall Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall Learning Progress</CardTitle>
                  <CardDescription>
                    Track your improvement across all areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Speaking Fluency</span>
                      <span>{userStats.fluencyScore}%</span>
                    </div>
                    <Progress value={userStats.fluencyScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pronunciation Accuracy</span>
                      <span>{userStats.pronunciationAccuracy}%</span>
                    </div>
                    <Progress
                      value={userStats.pronunciationAccuracy}
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Grammar Understanding</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Vocabulary Knowledge</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Skill Level Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Skill Level Distribution</CardTitle>
                  <CardDescription>
                    Where you stand across different areas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={fluencyLevels}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {fluencyLevels.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid gap-4">
              {moduleProgress.map((module, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {module.module}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {module.completed} of {module.total} lessons completed
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-nova-600">
                          {module.accuracy}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          accuracy
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {Math.round((module.completed / module.total) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(module.completed / module.total) * 100}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{module.timeSpent}h practiced</span>
                        <span>
                          {module.total - module.completed} lessons remaining
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-yellow-200/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <h3 className="font-semibold">First Week Complete</h3>
                  <p className="text-sm text-muted-foreground">
                    Completed your first week of learning
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Earned
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">🔥</div>
                  <h3 className="font-semibold">Week Warrior</h3>
                  <p className="text-sm text-muted-foreground">
                    7-day learning streak
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Earned
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">💬</div>
                  <h3 className="font-semibold">Conversation Starter</h3>
                  <p className="text-sm text-muted-foreground">
                    Completed 10 AI conversations
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Earned
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <h3 className="font-semibold">Progress Master</h3>
                  <p className="text-sm text-muted-foreground">
                    Reached 75% fluency score
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Earned
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-200/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <h3 className="font-semibold">Goal Crusher</h3>
                  <p className="text-sm text-muted-foreground">
                    Met weekly learning goal
                  </p>
                  <Badge variant="outline" className="mt-2">
                    In Progress
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border-indigo-200/20">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">🌟</div>
                  <h3 className="font-semibold">Expert Level</h3>
                  <p className="text-sm text-muted-foreground">
                    Reach 90% fluency score
                  </p>
                  <Badge variant="outline" className="mt-2">
                    Locked
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
