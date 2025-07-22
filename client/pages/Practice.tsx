import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Briefcase, 
  UtensilsCrossed, 
  ShoppingBag, 
  Play, 
  Clock, 
  Star,
  Users,
  Mic,
  Video,
  CheckCircle,
  ArrowRight,
  Target,
  TrendingUp
} from "lucide-react";

const scenarios = [
  {
    id: "interview",
    title: "Job Interview",
    description: "Practice professional interviews with AI interviewers. Master common questions, body language, and confident responses.",
    icon: Briefcase,
    difficulty: "Advanced",
    duration: "15-30 min",
    participants: "1-on-1",
    gradient: "from-nova-500 to-nova-600",
    bgGradient: "from-nova-500/10 to-nova-600/5",
    features: [
      "Common interview questions",
      "Behavioral assessment",
      "Professional communication",
      "Confidence building"
    ],
    scenarios: [
      "Software Developer Interview",
      "Sales Representative Interview", 
      "Manager Position Interview",
      "Customer Service Interview"
    ]
  },
  {
    id: "restaurant",
    title: "Restaurant Dining",
    description: "Navigate dining experiences from ordering to payment. Learn food vocabulary, polite requests, and cultural etiquette.",
    icon: UtensilsCrossed,
    difficulty: "Intermediate",
    duration: "10-20 min",
    participants: "Customer & Staff",
    gradient: "from-electric-500 to-electric-600",
    bgGradient: "from-electric-500/10 to-electric-600/5",
    features: [
      "Menu vocabulary",
      "Ordering etiquette",
      "Dietary requirements",
      "Payment conversations"
    ],
    scenarios: [
      "Fine Dining Experience",
      "Fast Casual Ordering",
      "Coffee Shop Interaction",
      "Dietary Restrictions Discussion"
    ]
  },
  {
    id: "shopping",
    title: "Shopping Experience",
    description: "Master retail conversations from browsing to purchasing. Practice negotiations, returns, and customer service interactions.",
    icon: ShoppingBag,
    difficulty: "Beginner",
    duration: "8-15 min",
    participants: "Shopper & Assistant",
    gradient: "from-cyber-500 to-cyber-600",
    bgGradient: "from-cyber-500/10 to-cyber-600/5",
    features: [
      "Product inquiries",
      "Price negotiations",
      "Size and fit discussions",
      "Return procedures"
    ],
    scenarios: [
      "Clothing Store Visit",
      "Electronics Shopping",
      "Grocery Store Trip",
      "Online Support Chat"
    ]
  }
];

const stats = [
  { icon: Users, label: "Active Sessions", value: "1.2K+", color: "nova" },
  { icon: Target, label: "Success Rate", value: "89%", color: "electric" },
  { icon: TrendingUp, label: "Improvement", value: "+45%", color: "cyber" },
  { icon: Star, label: "Avg Rating", value: "4.8", color: "nova" }
];

export default function Practice() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-nova-500/5 via-electric-500/5 to-cyber-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-gradient-to-r from-nova-500/20 via-electric-500/20 to-cyber-500/20 text-foreground border-nova-500/30 glow">
              <Play className="w-3 h-3 mr-1" />
              Interactive Practice Mode
            </Badge>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-bold text-foreground">
                Scenario-Based Learning
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Practice real-world conversations with AI-powered scenarios. Build confidence through 
                immersive role-play experiences tailored to your learning goals.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center space-y-2">
                    <div className={`w-10 h-10 bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 rounded-lg flex items-center justify-center mx-auto glow`}>
                      <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Scenarios Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Learning Scenario
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select from our curated scenarios designed to improve your English in real-world situations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <Card 
                  key={scenario.id}
                  className={`group relative overflow-hidden bg-gradient-to-br ${scenario.bgGradient} border-border/50 hover:border-nova-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-nova-500/20`}
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                  </div>

                  <CardHeader className="relative space-y-4 pb-6">
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 bg-gradient-to-br ${scenario.gradient} rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {scenario.difficulty}
                      </Badge>
                    </div>
                    
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground group-hover:text-nova-400 transition-colors">
                        {scenario.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                        {scenario.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="relative space-y-6">
                    {/* Session Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {scenario.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {scenario.participants}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">What You'll Practice:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {scenario.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Available Scenarios */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground">Available Scenarios:</h4>
                      <div className="space-y-2">
                        {scenario.scenarios.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground bg-background/50 rounded-lg px-3 py-2">
                            {item}
                          </div>
                        ))}
                        <div className="text-xs text-muted-foreground text-center py-1">
                          +{scenario.scenarios.length - 2} more scenarios
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <Button 
                        className={`flex-1 bg-gradient-to-r ${scenario.gradient} hover:opacity-90 text-white font-semibold glow-electric transition-all duration-300 group`}
                      >
                        <Mic className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        Start Practice
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-border/50 hover:bg-background/80"
                      >
                        <Video className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Start Practicing?
            </h2>
            <p className="text-lg text-muted-foreground">
              Choose any scenario above or let our AI recommend the best practice session for your current level.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300"
            >
              AI Recommended Session
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-nova-500/50 text-foreground hover:bg-nova-500/10 px-8 py-4 text-lg group"
              asChild
            >
              <Link to="/dashboard">
                View Progress
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="pt-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Complete 3 scenarios to unlock advanced practice modes</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
