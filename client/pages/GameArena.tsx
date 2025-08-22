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
      id: "speed-talk",
      title: "Speed Talk Challenge",
      description: "Race against time! Speak as many words correctly as possible in 60 seconds.",
      difficulty: "Easy",
      players: 1,
      duration: "1 min",
      reward: 50,
      icon: <Zap className="h-6 w-6" />,
      color: "from-electric-500 to-electric-600",
      isLocked: false,
    },
    {
      id: "pronunciation-battle",
      title: "Pronunciation Battle",
      description: "Challenge other players in real-time pronunciation competitions.",
      difficulty: "Medium",
      players: 4,
      duration: "5 min",
      reward: 150,
      icon: <Swords className="h-6 w-6" />,
      color: "from-red-500 to-red-600",
      isLocked: false,
    },
    {
      id: "vocabulary-royale",
      title: "Vocabulary Royale",
      description: "Last player standing wins! Use words strategically to eliminate opponents.",
      difficulty: "Hard",
      players: 16,
      duration: "10 min",
      reward: 300,
      icon: <Crown className="h-6 w-6" />,
      color: "from-yellow-500 to-yellow-600",
      isLocked: false,
    },
    {
      id: "grammar-guardian",
      title: "Grammar Guardian",
      description: "Defend your fortress by fixing grammar mistakes in incoming sentences.",
      difficulty: "Medium",
      players: 1,
      duration: "3 min",
      reward: 100,
      icon: <Shield className="h-6 w-6" />,
      color: "from-green-500 to-green-600",
      isLocked: false,
    },
    {
      id: "conversation-conquest",
      title: "Conversation Conquest",
      description: "Master complex dialogue scenarios in this turn-based strategy game.",
      difficulty: "Expert",
      players: 2,
      duration: "15 min",
      reward: 500,
      icon: <Target className="h-6 w-6" />,
      color: "from-purple-500 to-purple-600",
      isLocked: true,
      requirementText: "Reach Level 20 to unlock",
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
      isLocked: true,
      requirementText: "Complete 5 pronunciation battles",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className={"absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.02\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"}></div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <div className="flex justify-center">
              <div className="relative group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-electric-500 via-cyber-500 to-nova-500 rounded-3xl flex items-center justify-center glow-electric transition-all duration-500 group-hover:scale-110">
                  <Gamepad2 className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-br from-electric-500/30 via-cyber-500/30 to-nova-500/30 rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              <span className="bg-gradient-to-r from-electric-400 via-cyber-400 to-nova-400 bg-clip-text text-transparent text-gradient-animated">
                Game Arena
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Challenge yourself and others in exciting English learning games. 
              <span className="text-electric-400 font-semibold"> Level up your skills</span> while having fun!
            </p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Card className="bg-black/40 backdrop-blur-md border-gray-700/50 hover:border-electric-500/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Crown className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-white">{userLevel}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">Level</p>
                <div className="mt-2">
                  <Progress value={getLevelProgress()} className="h-1.5" />
                  <p className="text-xs text-gray-500 mt-1">{userXP}/{nextLevelXP} XP</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border-gray-700/50 hover:border-cyber-500/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Coins className="h-5 w-5 text-yellow-400 mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-white">{userCoins.toLocaleString()}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">Coins</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border-gray-700/50 hover:border-nova-500/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="h-5 w-5 text-electric-400 mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-white">47</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">Wins</p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-md border-gray-700/50 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Flame className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-lg sm:text-2xl font-bold text-white">12</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400">Streak</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Modes */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center">
                <Play className="h-6 w-6 sm:h-8 sm:w-8 text-electric-400 mr-3" />
                Game Modes
              </h2>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {gameModes.map((mode, index) => (
                <Card 
                  key={mode.id}
                  className={`bg-black/60 backdrop-blur-md border transition-all duration-500 hover:scale-105 cursor-pointer group relative overflow-hidden ${
                    mode.isLocked 
                      ? 'border-gray-700/50 hover:border-gray-600/50 opacity-75' 
                      : 'border-gray-700/50 hover:border-electric-500/50 glow-electric'
                  }`}
                  onClick={() => !mode.isLocked && setSelectedMode(mode.id)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
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
                          <Badge variant="outline" className="bg-gray-800/50 text-gray-400 border-gray-600/50">
                            🔒 Locked
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-white text-lg sm:text-xl mt-4 group-hover:text-electric-400 transition-colors duration-300">
                      {mode.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {mode.description}
                    </p>

                    {mode.isLocked && mode.requirementText && (
                      <p className="text-yellow-400 text-xs font-medium bg-yellow-500/10 px-3 py-2 rounded-lg border border-yellow-500/20">
                        {mode.requirementText}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-gray-400">
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
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 cursor-not-allowed' 
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
            <Card className="bg-black/60 backdrop-blur-md border-gray-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
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
                    <h3 className="font-semibold text-white">Speed Round Master</h3>
                    <Badge variant="outline" className="bg-nova-500/20 text-nova-400 border-nova-500/30">
                      2/3 Complete
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Win 3 Speed Talk challenges today</p>
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
                    <h3 className="font-semibold text-white">Perfect Pronunciation</h3>
                    <Badge variant="outline" className="bg-cyber-500/20 text-cyber-400 border-cyber-500/30">
                      1/5 Complete
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">Score 100% accuracy in pronunciation battles</p>
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
    </div>
  );
};

export default GameArena;
