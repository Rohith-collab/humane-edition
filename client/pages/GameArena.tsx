import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Gamepad2,
  Trophy,
  Zap,
  Crown,
  Star,
  Target,
  Users,
  Clock,
  Flame,
  Award,
  Play,
  Volume2,
  Settings,
  ChevronRight,
  Sparkles,
  Swords,
  Shield,
  Coins,
  Timer,
  Puzzle,
  ArrowDown,
  HelpCircle,
  Type,
  Search,
  AlertTriangle,
  Shuffle,
  Info,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface GameMode {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Expert";
  players: number;
  duration: string;
  reward: number;
  icon: React.ReactNode;
  color: string;
  isLocked: boolean;
  requirementText?: string;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  level: number;
  isCurrentUser?: boolean;
}

const GameArena = () => {
  const { currentUser } = useAuth();
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [userLevel, setUserLevel] = useState(15);
  const [userCoins, setUserCoins] = useState(2450);
  const [userXP, setUserXP] = useState(3680);
  const [nextLevelXP] = useState(4000);

  const gameModes: GameMode[] = [
    {
      id: "word-building-battles",
      title: "Word Building Battles",
      description: "Race the clock to form valid words from random letters. Solo or versus AI.",
      difficulty: "Easy",
      players: 1,
      duration: "1 min",
      reward: 50,
      icon: <Type className="h-6 w-6" />,
      color: "from-electric-500 to-electric-600",
      isLocked: false,
    },
    {
      id: "grammar-detective",
      title: "Grammar Detective",
      description: "Spot and fix errors in humorous passages before time runs out.",
      difficulty: "Medium",
      players: 1,
      duration: "3 min",
      reward: 100,
      icon: <Search className="h-6 w-6" />,
      color: "from-cyber-500 to-cyber-600",
      isLocked: false,
    },
    {
      id: "survival-mode",
      title: "Survival Mode",
      description: "One life. Rising difficulty. Miss once and it's game over.",
      difficulty: "Hard",
      players: 1,
      duration: "5 min",
      reward: 200,
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "from-red-500 to-red-600",
      isLocked: false,
    },
    {
      id: "jumbled-words",
      title: "Jumbled Words",
      description: "Unscramble letters into correct words under a timer.",
      difficulty: "Medium",
      players: 1,
      duration: "2 min",
      reward: 75,
      icon: <Shuffle className="h-6 w-6" />,
      color: "from-nova-500 to-nova-600",
      isLocked: false,
    },
    {
      id: "accent-arena",
      title: "Accent Arena",
      description: "Practice different English accents in this immersive challenge mode.",
      difficulty: "Hard",
      players: 1,
      duration: "8 min",
      reward: 250,
      icon: <Volume2 className="h-6 w-6" />,
      color: "from-cyan-500 to-cyan-600",
      isLocked: false,
    },
  ];

  const leaderboard: LeaderboardEntry[] = [
    { rank: 1, name: "Sarah Chen", score: 15420, avatar: "SC", level: 28 },
    { rank: 2, name: "Alex Rivera", score: 14850, avatar: "AR", level: 26 },
    { rank: 3, name: "Emma Watson", score: 14200, avatar: "EW", level: 25 },
    { rank: 4, name: "You", score: 13950, avatar: currentUser?.displayName?.charAt(0) || "U", level: userLevel, isCurrentUser: true },
    { rank: 5, name: "David Kim", score: 13100, avatar: "DK", level: 23 },
    { rank: 6, name: "Luna Garcia", score: 12800, avatar: "LG", level: 22 },
    { rank: 7, name: "James Wilson", score: 12450, avatar: "JW", level: 21 },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Hard": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Expert": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getLevelProgress = () => {
    return ((userXP % 1000) / 1000) * 100;
  };

  const scrollToGameModes = () => {
    const gameModeSection = document.getElementById('game-modes-section');
    if (gameModeSection) {
      gameModeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works-section');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background min-h-[60vh] sm:min-h-[80vh] flex items-center">
        <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.02\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"}></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 w-full">
          <div className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12">
            {/* Gaming Icons */}
            <div className="flex justify-center items-center space-x-6 sm:space-x-8 mb-6 opacity-0 animate-fadeIn" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              <div className="relative group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-electric-500 to-electric-600 rounded-2xl flex items-center justify-center glow-electric transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <Gamepad2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-electric-500/30 to-electric-600/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>

              <div className="relative group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyber-500 to-cyber-600 rounded-2xl flex items-center justify-center glow-cyber transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <Timer className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-cyber-500/30 to-cyber-600/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>

              <div className="relative group">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-nova-500 to-nova-600 rounded-2xl flex items-center justify-center glow transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <Puzzle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-nova-500/30 to-nova-600/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground leading-tight opacity-0 animate-fadeIn" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              <span className="bg-gradient-to-r from-electric-400 via-cyber-400 to-nova-400 bg-clip-text text-transparent text-gradient-animated">
                Level Up Your Language:
              </span>
              <br />
              <span className="text-foreground">Welcome to the Gaming Arena!</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed opacity-0 animate-fadeIn" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              Sharpen your English through exciting, interactive games.
              <br className="hidden sm:block" />
              <span className="text-electric-400 font-semibold">Not your average grammar lesson — it's an adventure!</span>
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-8 opacity-0 animate-fadeIn" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <Button
                onClick={scrollToGameModes}
                size="lg"
                className="bg-gradient-to-r from-electric-500 to-cyber-500 hover:from-electric-600 hover:to-cyber-600 text-white font-semibold px-8 py-4 rounded-xl glow-electric transition-all duration-300 hover:scale-105 text-lg w-full sm:w-auto min-w-[200px]"
              >
                Enter the Arena
                <ArrowDown className="h-5 w-5 ml-2" />
              </Button>

              <Button
                onClick={scrollToHowItWorks}
                variant="outline"
                size="lg"
                className="border-2 border-border hover:border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 text-lg w-full sm:w-auto min-w-[200px]"
              >
                How It Works
                <HelpCircle className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Card className="bg-card/80 backdrop-blur-md border-border hover:border-electric-500/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Crown className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-foreground">{userLevel}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Level</p>
                <div className="mt-2">
                  <Progress value={getLevelProgress()} className="h-1.5" />
                  <p className="text-xs text-muted-foreground mt-1">{userXP}/{nextLevelXP} XP</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-md border-border hover:border-cyber-500/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Coins className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-foreground">{userCoins.toLocaleString()}</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Coins</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-md border-border hover:border-nova-500/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-5 w-5 text-electric-400 mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-foreground">47</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Wins</p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-md border-border hover:border-red-500/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Flame className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-foreground">12</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Streak</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Modes */}
          <div id="game-modes-section" className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center">
                <Play className="h-6 w-6 sm:h-8 sm:w-8 text-electric-400 mr-3" />
                Game Modes
              </h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {gameModes.map((mode, index) => (
                <Card
                  key={mode.id}
                  className={`bg-card/80 backdrop-blur-md border transition-all duration-500 hover:scale-105 cursor-pointer group relative overflow-hidden ${
                    mode.isLocked
                      ? 'border-border hover:border-muted opacity-75'
                      : 'border-border hover:border-electric-500/50 glow-electric'
                  }`}
                  onClick={() => !mode.isLocked && setSelectedMode(mode.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-foreground/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${mode.color} glow`}>
                        {mode.icon}
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant="outline" className={getDifficultyColor(mode.difficulty)}>
                          {mode.difficulty}
                        </Badge>
                        {mode.isLocked && (
                          <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-muted">
                            🔒 Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-foreground text-lg sm:text-xl mt-4 group-hover:text-electric-400 transition-colors duration-300">
                      {mode.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {mode.description}
                    </p>

                    {mode.isLocked && mode.requirementText && (
                      <p className="text-yellow-400 text-xs font-medium bg-yellow-500/10 px-3 py-2 rounded-lg border border-yellow-500/20">
                        {mode.requirementText}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {mode.players === 1 ? 'Solo' : `${mode.players} players`}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {mode.duration}
                        </span>
                      </div>
                      <span className="flex items-center text-yellow-400 font-medium">
                        <Coins className="h-4 w-4 mr-1" />
                        +{mode.reward}
                      </span>
                    </div>

                    <Button
                      className={`w-full ${
                        mode.isLocked
                          ? 'bg-muted hover:bg-muted/80 text-muted-foreground cursor-not-allowed'
                          : 'bg-gradient-to-r from-electric-500 to-cyber-500 hover:from-electric-600 hover:to-cyber-600 text-white glow-electric'
                      } transition-all duration-300`}
                      disabled={mode.isLocked}
                    >
                      {mode.isLocked ? 'Locked' : 'Play Now'}
                      {!mode.isLocked && <ChevronRight className="h-4 w-4 ml-2" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-md border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-400 mr-2" />
                  Global Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <div 
                    key={entry.rank}
                    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                      entry.isCurrentUser 
                        ? 'bg-electric-500/20 border border-electric-500/30 glow-electric' 
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                      entry.rank === 1 ? 'bg-yellow-500 text-black' :
                      entry.rank === 2 ? 'bg-gray-300 text-black' :
                      entry.rank === 3 ? 'bg-orange-500 text-white' :
                      'bg-gray-700 text-gray-300'
                    }`}>
                      {entry.rank}
                    </div>
                    
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={`text-sm font-bold ${
                        entry.isCurrentUser ? 'bg-electric-500 text-white' : 'bg-gray-600 text-gray-200'
                      }`}>
                        {entry.avatar}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium truncate ${
                        entry.isCurrentUser ? 'text-electric-400' : 'text-white'
                      }`}>
                        {entry.name}
                      </p>
                      <p className="text-xs text-gray-400">Level {entry.level}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm font-bold text-cyan-400">{entry.score.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" className="w-full text-gray-400 hover:text-white mt-4">
                  View Full Leaderboard
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Daily Challenges */}
            <Card className="bg-black/60 backdrop-blur-md border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  Daily Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-nova-500/20 to-electric-500/20 rounded-xl border border-nova-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Word Master</h3>
                    <Badge variant="outline" className="bg-nova-500/20 text-nova-400 border-nova-500/30">
                      2/3 Complete
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Complete 3 Word Building Battles today</p>
                  <div className="flex items-center justify-between">
                    <Progress value={66} className="flex-1 mr-3 h-2" />
                    <span className="text-xs text-yellow-400 font-medium flex items-center">
                      <Coins className="h-3 w-3 mr-1" />
                      +100
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-cyber-500/20 to-green-500/20 rounded-xl border border-cyber-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Accent Expert</h3>
                    <Badge variant="outline" className="bg-cyber-500/20 text-cyber-400 border-cyber-500/30">
                      1/5 Complete
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Master 5 different accents in Accent Arena</p>
                  <div className="flex items-center justify-between">
                    <Progress value={20} className="flex-1 mr-3 h-2" />
                    <span className="text-xs text-yellow-400 font-medium flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      Badge
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works-section" className="bg-gradient-to-br from-black via-gray-900 to-black py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-electric-400 via-cyber-400 to-nova-400 bg-clip-text text-transparent">
                Why Gaming Works
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Transform your learning experience through the power of gamification and interactive challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-electric-500 to-electric-600 rounded-2xl flex items-center justify-center glow-electric group-hover:scale-110 transition-all duration-300">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Instant Feedback</h3>
              <p className="text-gray-300 leading-relaxed">
                Get immediate corrections and tips as you play. No waiting, no confusion — just rapid improvement through real-time guidance.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-cyber-500 to-cyber-600 rounded-2xl flex items-center justify-center glow-cyber group-hover:scale-110 transition-all duration-300">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Social Learning</h3>
              <p className="text-gray-300 leading-relaxed">
                Challenge friends and learners worldwide. Competition and collaboration make learning memorable and motivating.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-nova-500 to-nova-600 rounded-2xl flex items-center justify-center glow group-hover:scale-110 transition-all duration-300">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Adaptive Difficulty</h3>
              <p className="text-gray-300 leading-relaxed">
                Smart algorithms adjust challenge levels to your skill. Always in the perfect learning zone — never too easy, never overwhelming.
              </p>
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Button
              onClick={scrollToGameModes}
              size="lg"
              className="bg-gradient-to-r from-nova-500 to-electric-500 hover:from-nova-600 hover:to-electric-600 text-white font-semibold px-8 py-4 rounded-xl glow transition-all duration-300 hover:scale-105 text-lg"
            >
              Start Your Adventure
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameArena;
