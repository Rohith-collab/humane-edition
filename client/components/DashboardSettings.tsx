import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAnalytics } from "@/contexts/UserAnalyticsContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  User,
  Settings,
  Bell,
  Shield,
  Palette,
  Download,
  Upload,
  Trash2,
  Camera,
  Volume2,
  Globe,
  Clock,
  Target,
  BookOpen,
  CreditCard,
  HelpCircle,
  LogOut,
  Save,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Zap,
  Brain,
  TrendingUp,
  Calendar,
  Moon,
  Sun,
  Monitor,
  Sparkles,
  Award,
  Star,
  Coffee,
  MessageSquare,
  BarChart3,
  Activity,
  RefreshCw,
  Lock,
  Unlock,
  Gamepad2,
  Headphones,
  Mic,
  Video,
  Smartphone,
  Laptop,
  Tablet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardPreferences {
  theme: "light" | "dark" | "system";
  compactMode: boolean;
  animationsEnabled: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  showProgressAnimations: boolean;
  displayMode: "detailed" | "compact" | "minimal";
  widgets: {
    quickStats: boolean;
    weeklyChart: boolean;
    fluencyProgress: boolean;
    achievements: boolean;
    moduleProgress: boolean;
    practiceReminder: boolean;
    leaderboard: boolean;
    dailyGoal: boolean;
  };
  privacy: {
    showProgress: boolean;
    allowLeaderboard: boolean;
    shareAchievements: boolean;
    dataAnalytics: boolean;
  };
  notifications: {
    practiceReminders: boolean;
    achievements: boolean;
    weeklyReports: boolean;
    milestones: boolean;
    streakWarnings: boolean;
  };
  learning: {
    difficultyLevel: "beginner" | "intermediate" | "advanced" | "expert";
    preferredTopics: string[];
    sessionLength: number;
    breakReminders: boolean;
    focusMode: boolean;
  };
  accessibility: {
    highContrast: boolean;
    largeText: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
    keyboardNavigation: boolean;
  };
}

interface DashboardSettingsProps {
  trigger?: React.ReactNode;
  onPreferencesChange?: (preferences: DashboardPreferences) => void;
}

const DashboardSettings: React.FC<DashboardSettingsProps> = ({
  trigger,
  onPreferencesChange,
}) => {
  const { currentUser } = useAuth();
  const { analytics } = useUserAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [activeTab, setActiveTab] = useState("display");

  const [preferences, setPreferences] = useState<DashboardPreferences>({
    theme: "system",
    compactMode: false,
    animationsEnabled: true,
    autoRefresh: true,
    refreshInterval: 30,
    showProgressAnimations: true,
    displayMode: "detailed",
    widgets: {
      quickStats: true,
      weeklyChart: true,
      fluencyProgress: true,
      achievements: true,
      moduleProgress: true,
      practiceReminder: true,
      leaderboard: false,
      dailyGoal: true,
    },
    privacy: {
      showProgress: true,
      allowLeaderboard: false,
      shareAchievements: true,
      dataAnalytics: true,
    },
    notifications: {
      practiceReminders: true,
      achievements: true,
      weeklyReports: false,
      milestones: true,
      streakWarnings: true,
    },
    learning: {
      difficultyLevel: "intermediate",
      preferredTopics: ["conversation", "business"],
      sessionLength: 30,
      breakReminders: true,
      focusMode: false,
    },
    accessibility: {
      highContrast: false,
      largeText: false,
      reducedMotion: false,
      screenReader: false,
      keyboardNavigation: false,
    },
  });

  const topicOptions = [
    { id: "conversation", label: "Conversation Skills", icon: "💬" },
    { id: "business", label: "Business English", icon: "💼" },
    { id: "academic", label: "Academic Writing", icon: "📚" },
    { id: "travel", label: "Travel English", icon: "✈️" },
    { id: "pronunciation", label: "Pronunciation", icon: "🗣️" },
    { id: "grammar", label: "Grammar", icon: "📝" },
    { id: "vocabulary", label: "Vocabulary", icon: "🔤" },
    { id: "interview", label: "Interview Prep", icon: "👔" },
    { id: "presentation", label: "Presentations", icon: "🎯" },
    { id: "cultural", label: "Cultural Awareness", icon: "🌍" },
  ];

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("dashboard_preferences");
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({ ...preferences, ...parsed });
      } catch (error) {
        console.error("Failed to load dashboard preferences:", error);
      }
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem("dashboard_preferences", JSON.stringify(preferences));
      
      // Call parent callback if provided
      if (onPreferencesChange) {
        onPreferencesChange(preferences);
      }

      setSaveMessage("Dashboard settings saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Failed to save settings. Please try again.");
      console.error("Error saving preferences:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    const defaultPreferences: DashboardPreferences = {
      theme: "system",
      compactMode: false,
      animationsEnabled: true,
      autoRefresh: true,
      refreshInterval: 30,
      showProgressAnimations: true,
      displayMode: "detailed",
      widgets: {
        quickStats: true,
        weeklyChart: true,
        fluencyProgress: true,
        achievements: true,
        moduleProgress: true,
        practiceReminder: true,
        leaderboard: false,
        dailyGoal: true,
      },
      privacy: {
        showProgress: true,
        allowLeaderboard: false,
        shareAchievements: true,
        dataAnalytics: true,
      },
      notifications: {
        practiceReminders: true,
        achievements: true,
        weeklyReports: false,
        milestones: true,
        streakWarnings: true,
      },
      learning: {
        difficultyLevel: "intermediate",
        preferredTopics: ["conversation", "business"],
        sessionLength: 30,
        breakReminders: true,
        focusMode: false,
      },
      accessibility: {
        highContrast: false,
        largeText: false,
        reducedMotion: false,
        screenReader: false,
        keyboardNavigation: false,
      },
    };
    setPreferences(defaultPreferences);
  };

  const handleTopicToggle = (topicId: string) => {
    setPreferences((prev) => ({
      ...prev,
      learning: {
        ...prev.learning,
        preferredTopics: prev.learning.preferredTopics.includes(topicId)
          ? prev.learning.preferredTopics.filter((t) => t !== topicId)
          : [...prev.learning.preferredTopics, topicId],
      },
    }));
  };

  const exportSettings = () => {
    const settingsData = {
      dashboardPreferences: preferences,
      userInfo: {
        email: currentUser?.email,
        displayName: currentUser?.displayName,
        createdAt: currentUser?.metadata.creationTime,
      },
      analytics: analytics,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(settingsData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-settings-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="group">
            <Settings className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
            <span className="ml-2 hidden sm:inline">Dashboard Settings</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-nova-500 to-electric-500 rounded-lg flex items-center justify-center">
              <Settings className="h-4 w-4 text-white" />
            </div>
            <span>Dashboard Settings</span>
          </DialogTitle>
          <DialogDescription>
            Customize your dashboard experience and learning preferences
          </DialogDescription>
        </DialogHeader>

        {saveMessage && (
          <Alert
            className={cn(
              "mb-4",
              saveMessage.includes("success")
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-red-500 bg-red-50 text-red-700",
            )}
          >
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <div className="overflow-y-auto max-h-[70vh]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-muted/30">
              <TabsTrigger value="display" className="flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span className="hidden sm:inline">Display</span>
              </TabsTrigger>
              <TabsTrigger value="widgets" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Widgets</span>
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center space-x-2">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Learning</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Privacy</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Access</span>
              </TabsTrigger>
            </TabsList>

            {/* Display Settings */}
            <TabsContent value="display" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Appearance & Theme</span>
                  </CardTitle>
                  <CardDescription>
                    Customize the visual appearance of your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Theme</Label>
                      <Select
                        value={preferences.theme}
                        onValueChange={(value: "light" | "dark" | "system") =>
                          setPreferences((prev) => ({ ...prev, theme: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">
                            <div className="flex items-center space-x-2">
                              <Sun className="h-4 w-4" />
                              <span>Light</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="dark">
                            <div className="flex items-center space-x-2">
                              <Moon className="h-4 w-4" />
                              <span>Dark</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="system">
                            <div className="flex items-center space-x-2">
                              <Monitor className="h-4 w-4" />
                              <span>System</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Display Mode</Label>
                      <Select
                        value={preferences.displayMode}
                        onValueChange={(value: "detailed" | "compact" | "minimal") =>
                          setPreferences((prev) => ({ ...prev, displayMode: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="detailed">📊 Detailed</SelectItem>
                          <SelectItem value="compact">📱 Compact</SelectItem>
                          <SelectItem value="minimal">🎯 Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable smooth animations and transitions
                        </p>
                      </div>
                      <Switch
                        checked={preferences.animationsEnabled}
                        onCheckedChange={(checked) =>
                          setPreferences((prev) => ({
                            ...prev,
                            animationsEnabled: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Progress Animations</Label>
                        <p className="text-sm text-muted-foreground">
                          Animate progress bars and stats on load
                        </p>
                      </div>
                      <Switch
                        checked={preferences.showProgressAnimations}
                        onCheckedChange={(checked) =>
                          setPreferences((prev) => ({
                            ...prev,
                            showProgressAnimations: checked,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Compact Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Reduce spacing and padding for more content
                        </p>
                      </div>
                      <Switch
                        checked={preferences.compactMode}
                        onCheckedChange={(checked) =>
                          setPreferences((prev) => ({ ...prev, compactMode: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Auto Refresh</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically refresh dashboard data
                        </p>
                      </div>
                      <Switch
                        checked={preferences.autoRefresh}
                        onCheckedChange={(checked) =>
                          setPreferences((prev) => ({ ...prev, autoRefresh: checked }))
                        }
                      />
                    </div>
                  </div>

                  {preferences.autoRefresh && (
                    <div className="space-y-2">
                      <Label>Refresh Interval</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[preferences.refreshInterval]}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              refreshInterval: value[0],
                            }))
                          }
                          max={300}
                          min={10}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>10 seconds</span>
                          <span className="font-medium">
                            {preferences.refreshInterval} seconds
                          </span>
                          <span>5 minutes</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Widget Settings */}
            <TabsContent value="widgets" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Dashboard Widgets</span>
                  </CardTitle>
                  <CardDescription>
                    Choose which widgets to display on your dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries({
                      quickStats: {
                        label: "Quick Stats",
                        description: "Fluency, streak, and session counters",
                        icon: TrendingUp,
                      },
                      weeklyChart: {
                        label: "Weekly Activity",
                        description: "Chart showing your weekly progress",
                        icon: BarChart3,
                      },
                      fluencyProgress: {
                        label: "Fluency Progress",
                        description: "Detailed fluency improvement chart",
                        icon: Brain,
                      },
                      achievements: {
                        label: "Achievements",
                        description: "Badges and learning milestones",
                        icon: Award,
                      },
                      moduleProgress: {
                        label: "Module Progress",
                        description: "Progress in each learning module",
                        icon: BookOpen,
                      },
                      practiceReminder: {
                        label: "Practice Reminder",
                        description: "Daily goal and practice streak",
                        icon: Clock,
                      },
                      leaderboard: {
                        label: "Leaderboard",
                        description: "Compare with other learners",
                        icon: Star,
                      },
                      dailyGoal: {
                        label: "Daily Goal",
                        description: "Track your daily learning target",
                        icon: Target,
                      },
                    }).map(([key, { label, description, icon: Icon }]) => (
                      <div
                        key={key}
                        className={cn(
                          "flex items-center justify-between p-4 border rounded-lg transition-all duration-200",
                          preferences.widgets[key as keyof typeof preferences.widgets]
                            ? "border-nova-500 bg-nova-500/5"
                            : "border-border",
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-muted-foreground" />
                          <div className="space-y-1">
                            <Label className="text-base font-medium">{label}</Label>
                            <p className="text-sm text-muted-foreground">
                              {description}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={
                            preferences.widgets[
                              key as keyof typeof preferences.widgets
                            ]
                          }
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              widgets: { ...prev.widgets, [key]: checked },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Learning Settings */}
            <TabsContent value="learning" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5" />
                    <span>Learning Preferences</span>
                  </CardTitle>
                  <CardDescription>
                    Customize your learning experience and goals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Difficulty Level</Label>
                      <Select
                        value={preferences.learning.difficultyLevel}
                        onValueChange={(value: "beginner" | "intermediate" | "advanced" | "expert") =>
                          setPreferences((prev) => ({
                            ...prev,
                            learning: { ...prev.learning, difficultyLevel: value },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">🌱 Beginner</SelectItem>
                          <SelectItem value="intermediate">📈 Intermediate</SelectItem>
                          <SelectItem value="advanced">🚀 Advanced</SelectItem>
                          <SelectItem value="expert">⭐ Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Session Length</Label>
                      <div className="space-y-2">
                        <Slider
                          value={[preferences.learning.sessionLength]}
                          onValueChange={(value) =>
                            setPreferences((prev) => ({
                              ...prev,
                              learning: { ...prev.learning, sessionLength: value[0] },
                            }))
                          }
                          max={120}
                          min={5}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>5 min</span>
                          <span className="font-medium">
                            {preferences.learning.sessionLength} minutes
                          </span>
                          <span>2 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Preferred Learning Topics</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {topicOptions.map((topic) => (
                        <div
                          key={topic.id}
                          className={cn(
                            "flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200",
                            preferences.learning.preferredTopics.includes(topic.id)
                              ? "border-nova-500 bg-nova-500/5 shadow-sm"
                              : "border-border hover:border-border/80",
                          )}
                          onClick={() => handleTopicToggle(topic.id)}
                        >
                          <span className="text-lg">{topic.icon}</span>
                          <span className="font-medium">{topic.label}</span>
                          {preferences.learning.preferredTopics.includes(topic.id) && (
                            <CheckCircle className="h-4 w-4 text-nova-500 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Break Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get reminded to take breaks during long sessions
                        </p>
                      </div>
                      <Switch
                        checked={preferences.learning.breakReminders}
                        onCheckedChange={(checked) =>
                          setPreferences((prev) => ({
                            ...prev,
                            learning: { ...prev.learning, breakReminders: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Focus Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Hide distracting elements during practice sessions
                        </p>
                      </div>
                      <Switch
                        checked={preferences.learning.focusMode}
                        onCheckedChange={(checked) =>
                          setPreferences((prev) => ({
                            ...prev,
                            learning: { ...prev.learning, focusMode: checked },
                          }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries({
                      practiceReminders: {
                        label: "Practice Reminders",
                        description: "Daily reminders to practice",
                      },
                      achievements: {
                        label: "Achievement Notifications",
                        description: "When you unlock new badges",
                      },
                      weeklyReports: {
                        label: "Weekly Progress Reports",
                        description: "Summary of your weekly progress",
                      },
                      milestones: {
                        label: "Milestone Celebrations",
                        description: "When you reach important milestones",
                      },
                      streakWarnings: {
                        label: "Streak Warnings",
                        description: "Alert before losing your streak",
                      },
                    }).map(([key, { label, description }]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <Label className="text-base font-medium">{label}</Label>
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                        </div>
                        <Switch
                          checked={
                            preferences.notifications[
                              key as keyof typeof preferences.notifications
                            ]
                          }
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              notifications: { ...prev.notifications, [key]: checked },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Privacy & Data</span>
                  </CardTitle>
                  <CardDescription>
                    Control your privacy and data sharing preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {Object.entries({
                      showProgress: {
                        label: "Show Progress Publicly",
                        description: "Allow others to see your learning progress",
                      },
                      allowLeaderboard: {
                        label: "Participate in Leaderboards",
                        description: "Include your scores in community rankings",
                      },
                      shareAchievements: {
                        label: "Share Achievements",
                        description: "Allow achievements to be shared socially",
                      },
                      dataAnalytics: {
                        label: "Data Analytics",
                        description: "Help improve the app with usage analytics",
                      },
                    }).map(([key, { label, description }]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <Label className="text-base font-medium">{label}</Label>
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                        </div>
                        <Switch
                          checked={
                            preferences.privacy[
                              key as keyof typeof preferences.privacy
                            ]
                          }
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              privacy: { ...prev.privacy, [key]: checked },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Data Management</h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={exportSettings}
                        className="flex-1"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Settings
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Accessibility Settings */}
            <TabsContent value="accessibility" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Accessibility</span>
                  </CardTitle>
                  <CardDescription>
                    Make the dashboard more accessible and easier to use
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries({
                      highContrast: {
                        label: "High Contrast Mode",
                        description: "Increase contrast for better visibility",
                      },
                      largeText: {
                        label: "Large Text",
                        description: "Increase font size throughout the dashboard",
                      },
                      reducedMotion: {
                        label: "Reduced Motion",
                        description: "Minimize animations and transitions",
                      },
                      screenReader: {
                        label: "Screen Reader Support",
                        description: "Enhanced support for screen readers",
                      },
                      keyboardNavigation: {
                        label: "Keyboard Navigation",
                        description: "Enhanced keyboard navigation support",
                      },
                    }).map(([key, { label, description }]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="space-y-1">
                          <Label className="text-base font-medium">{label}</Label>
                          <p className="text-sm text-muted-foreground">
                            {description}
                          </p>
                        </div>
                        <Switch
                          checked={
                            preferences.accessibility[
                              key as keyof typeof preferences.accessibility
                            ]
                          }
                          onCheckedChange={(checked) =>
                            setPreferences((prev) => ({
                              ...prev,
                              accessibility: { ...prev.accessibility, [key]: checked },
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardSettings;
