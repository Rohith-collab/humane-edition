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
import {
  User,
  Settings as SettingsIcon,
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
} from "lucide-react";

interface UserPreferences {
  language: string;
  proficiencyLevel: string;
  learningGoals: string[];
  dailyGoal: number;
  voiceSpeed: number;
  voiceGender: string;
  voiceAccent: string;
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
    achievements: boolean;
    weeklyReport: boolean;
  };
  privacy: {
    profileVisible: boolean;
    progressVisible: boolean;
    dataCollection: boolean;
    analytics: boolean;
  };
  appearance: {
    theme: string;
    language: string;
    fontSize: string;
    animations: boolean;
  };
}

const Settings = () => {
  const { currentUser, logout } = useAuth();
  const { analytics } = useUserAnalytics();
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: currentUser?.displayName || "",
    email: currentUser?.email || "",
    bio: "",
    location: "",
    website: "",
  });

  const [preferences, setPreferences] = useState<UserPreferences>({
    language: "en-US",
    proficiencyLevel: "intermediate",
    learningGoals: ["conversation", "business"],
    dailyGoal: 30,
    voiceSpeed: 1.0,
    voiceGender: "female",
    voiceAccent: "american",
    notifications: {
      email: true,
      push: true,
      reminders: true,
      achievements: true,
      weeklyReport: false,
    },
    privacy: {
      profileVisible: true,
      progressVisible: false,
      dataCollection: true,
      analytics: true,
    },
    appearance: {
      theme: "system",
      language: "en",
      fontSize: "medium",
      animations: true,
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const learningGoalOptions = [
    { id: "conversation", label: "Casual Conversation", icon: "💬" },
    { id: "business", label: "Business English", icon: "💼" },
    { id: "academic", label: "Academic Writing", icon: "📚" },
    { id: "travel", label: "Travel & Tourism", icon: "✈️" },
    { id: "pronunciation", label: "Pronunciation", icon: "🗣️" },
    { id: "grammar", label: "Grammar Mastery", icon: "📝" },
    { id: "vocabulary", label: "Vocabulary Building", icon: "🔤" },
    { id: "interview", label: "Job Interviews", icon: "👔" },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      // Here you would save to Firebase/backend
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSaveMessage("Settings saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleGoalToggle = (goalId: string) => {
    setPreferences((prev) => ({
      ...prev,
      learningGoals: prev.learningGoals.includes(goalId)
        ? prev.learningGoals.filter((g) => g !== goalId)
        : [...prev.learningGoals, goalId],
    }));
  };

  const handleExportData = () => {
    const data = {
      profile: profileData,
      preferences,
      analytics,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aangilam-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      try {
        // Here you would implement account deletion
        await logout();
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-nova-500 to-electric-500 rounded-lg flex items-center justify-center">
              <SettingsIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">
                Customize your learning experience
              </p>
            </div>
          </div>

          {saveMessage && (
            <Alert
              className={`mb-4 ${saveMessage.includes("success") ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}
            >
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>{saveMessage}</AlertDescription>
            </Alert>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger
              value="profile"
              className="flex items-center space-x-2"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="learning"
              className="flex items-center space-x-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Learning</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="flex items-center space-x-2"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="flex items-center space-x-2"
            >
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20 ring-2 ring-nova-500/30">
                    <AvatarImage src="" alt={profileData.displayName} />
                    <AvatarFallback className="bg-gradient-to-br from-nova-500 to-electric-500 text-white text-2xl">
                      {profileData.displayName?.charAt(0) ||
                        profileData.email?.charAt(0) ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max size 5MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={profileData.displayName}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          displayName: e.target.value,
                        }))
                      }
                      placeholder="Your display name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                      placeholder="City, Country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          website: e.target.value,
                        }))
                      }
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    placeholder="Tell us about yourself and your English learning journey..."
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData((prev) => ({
                          ...prev,
                          currentPassword: e.target.value,
                        }))
                      }
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowPasswords((prev) => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }))
                        }
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Preferences</CardTitle>
                <CardDescription>
                  Customize your learning experience and goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Proficiency Level</Label>
                    <Select
                      value={preferences.proficiencyLevel}
                      onValueChange={(value) =>
                        setPreferences((prev) => ({
                          ...prev,
                          proficiencyLevel: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">🌱 Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          📈 Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">🚀 Advanced</SelectItem>
                        <SelectItem value="fluent">⭐ Fluent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Daily Learning Goal</Label>
                    <div className="space-y-2">
                      <Slider
                        value={[preferences.dailyGoal]}
                        onValueChange={(value) =>
                          setPreferences((prev) => ({
                            ...prev,
                            dailyGoal: value[0],
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
                          {preferences.dailyGoal} minutes
                        </span>
                        <span>2 hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Learning Goals</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {learningGoalOptions.map((goal) => (
                      <div
                        key={goal.id}
                        className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                          preferences.learningGoals.includes(goal.id)
                            ? "border-nova-500 bg-nova-500/5 shadow-sm"
                            : "border-border hover:border-border/80"
                        }`}
                        onClick={() => handleGoalToggle(goal.id)}
                      >
                        <span className="text-lg">{goal.icon}</span>
                        <span className="font-medium">{goal.label}</span>
                        {preferences.learningGoals.includes(goal.id) && (
                          <CheckCircle className="h-4 w-4 text-nova-500 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Learning Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({ ...prev, language: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">🇺🇸 English (US)</SelectItem>
                      <SelectItem value="en-GB">🇬🇧 English (UK)</SelectItem>
                      <SelectItem value="en-AU">
                        🇦🇺 English (Australia)
                      </SelectItem>
                      <SelectItem value="en-CA">🇨🇦 English (Canada)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audio Tab */}
          <TabsContent value="audio" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Voice & Audio Settings</CardTitle>
                <CardDescription>
                  Customize voice synthesis and audio preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Voice Gender</Label>
                    <Select
                      value={preferences.voiceGender}
                      onValueChange={(value) =>
                        setPreferences((prev) => ({
                          ...prev,
                          voiceGender: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">👩 Female</SelectItem>
                        <SelectItem value="male">👨 Male</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Voice Accent</Label>
                    <Select
                      value={preferences.voiceAccent}
                      onValueChange={(value) =>
                        setPreferences((prev) => ({
                          ...prev,
                          voiceAccent: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="american">🇺🇸 American</SelectItem>
                        <SelectItem value="british">🇬🇧 British</SelectItem>
                        <SelectItem value="australian">
                          🇦🇺 Australian
                        </SelectItem>
                        <SelectItem value="canadian">🇨🇦 Canadian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Speech Speed</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[preferences.voiceSpeed]}
                      onValueChange={(value) =>
                        setPreferences((prev) => ({
                          ...prev,
                          voiceSpeed: value[0],
                        }))
                      }
                      max={2.0}
                      min={0.5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.5x (Slow)</span>
                      <span className="font-medium">
                        {preferences.voiceSpeed}x
                      </span>
                      <span>2.0x (Fast)</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Test Voice Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries({
                  email: {
                    label: "Email Notifications",
                    description: "Get updates via email",
                  },
                  push: {
                    label: "Push Notifications",
                    description: "Browser notifications",
                  },
                  reminders: {
                    label: "Learning Reminders",
                    description: "Daily practice reminders",
                  },
                  achievements: {
                    label: "Achievement Updates",
                    description: "When you unlock badges",
                  },
                  weeklyReport: {
                    label: "Weekly Progress Report",
                    description: "Summary of your learning",
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
                          notifications: {
                            ...prev.notifications,
                            [key]: checked,
                          },
                        }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data Settings</CardTitle>
                <CardDescription>
                  Control your privacy and data collection preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries({
                  profileVisible: {
                    label: "Public Profile",
                    description: "Make your profile visible to other learners",
                  },
                  progressVisible: {
                    label: "Progress Sharing",
                    description: "Allow sharing of learning progress",
                  },
                  dataCollection: {
                    label: "Data Collection",
                    description: "Help improve the app with usage data",
                  },
                  analytics: {
                    label: "Analytics & Insights",
                    description: "Enable detailed learning analytics",
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

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Data Management</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={handleExportData}
                      className="flex-1"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export My Data
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Import Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
                <CardDescription>
                  Manage your account settings and subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="text-base font-medium">
                        Account Status
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Active since{" "}
                        {new Date(
                          currentUser?.metadata.creationTime || "",
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="text-base font-medium">
                        Subscription Plan
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Free Plan - Upgrade for premium features
                      </p>
                    </div>
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Upgrade
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="text-base font-medium">
                        Help & Support
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Get help with your account
                      </p>
                    </div>
                    <Button variant="outline">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600">
                    Danger Zone
                  </h3>

                  <Alert className="border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      These actions are irreversible. Please proceed with
                      caution.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear All Learning Data
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleDeleteAccount}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account Permanently
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reset Changes
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
    </div>
  );
};

export default Settings;
