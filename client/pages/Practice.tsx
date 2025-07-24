import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import {
  Briefcase,
  UtensilsCrossed,
  ShoppingBag,
  BookOpen,
  Presentation,
  Users,
  Megaphone,
  Globe2,
  Mic,
  ArrowRight,
  Clock,
  Target,
  Star,
  TrendingUp,
  Eye,
  MessageSquare,
  Volume2,
  Brain,
  Heart,
  Lightbulb,
  BarChart3,
  Handshake,
  Coffee,
  Zap,
  Bot,
} from "lucide-react";

const practiceCategories = [
  {
    id: "interview",
    title: "Job Interview",
    description:
      "Master professional interviews with AI interviewers and build confidence for any position",
    icon: Briefcase,
    difficulty: "Advanced",
    duration: "15-30 min",
    chatPath: "/practice/interview/chat",
    gradient: "from-nova-500 to-nova-600",
    bgGradient: "from-nova-50/50 via-background to-electric-50/50",
    features: [
      "Common interview questions",
      "Behavioral assessment",
      "Professional communication",
      "Confidence building",
    ],
    scenarios: [
      "Software Developer Interview",
      "Sales Representative Interview",
      "Manager Position Interview",
      "Customer Service Interview",
    ],
  },
  {
    id: "restaurant",
    title: "Restaurant Dining",
    description:
      "Navigate dining experiences from ordering to payment with perfect etiquette",
    icon: UtensilsCrossed,
    difficulty: "Intermediate",
    duration: "12-20 min",
    chatPath: "/practice/restaurant/chat",
    gradient: "from-amber-500 to-orange-600",
    bgGradient: "from-amber-50/50 via-background to-orange-50/50",
    features: [
      "Food vocabulary",
      "Polite requests",
      "Cultural etiquette",
      "Payment interactions",
    ],
    scenarios: [
      "Fine Dining Experience",
      "Casual Restaurant Visit",
      "Fast Food Ordering",
      "Special Dietary Requests",
    ],
  },
  {
    id: "shopping",
    title: "Shopping Experience",
    description:
      "Master retail conversations from browsing to purchasing with confidence",
    icon: ShoppingBag,
    difficulty: "Beginner",
    duration: "10-15 min",
    chatPath: "/practice/shopping/chat",
    gradient: "from-blue-500 to-purple-600",
    bgGradient: "from-blue-50/50 via-background to-purple-50/50",
    features: [
      "Product inquiries",
      "Price negotiations",
      "Return policies",
      "Customer service",
    ],
    scenarios: [
      "Clothing Store Shopping",
      "Electronics Purchase",
      "Grocery Shopping",
      "Online Store Support",
    ],
  },
  {
    id: "grammar",
    title: "Grammar Tutor",
    description:
      "Perfect your English grammar with personalized AI tutoring and real-time corrections",
    icon: BookOpen,
    difficulty: "All Levels",
    duration: "20-30 min",
    chatPath: "/grammar/chat",
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50/50 via-background to-emerald-50/50",
    features: [
      "Real-time corrections",
      "Grammar explanations",
      "Practice exercises",
      "Progress tracking",
    ],
    scenarios: [
      "Basic Grammar Rules",
      "Advanced Sentence Structure",
      "Business Writing",
      "Academic Writing",
    ],
  },
  {
    id: "presentation",
    title: "Presentation Skills",
    description:
      "Master the art of presenting with confidence, clarity, and compelling delivery",
    icon: Presentation,
    difficulty: "Intermediate",
    duration: "15-25 min",
    chatPath: "/presentation/chat",
    gradient: "from-nova-500 to-electric-500",
    bgGradient: "from-nova-50/50 via-background to-electric-50/50",
    features: [
      "Body language analysis",
      "Speech flow coaching",
      "Audience engagement",
      "Slide presentation",
    ],
    scenarios: [
      "Business Presentation",
      "Product Pitch",
      "Team Meeting",
      "Academic Defense",
    ],
  },
  {
    id: "social",
    title: "Social Conversation",
    description:
      "Build natural social connections through everyday conversations and networking",
    icon: Users,
    difficulty: "Intermediate",
    duration: "12-18 min",
    chatPath: "/social/chat",
    gradient: "from-electric-500 to-cyber-500",
    bgGradient: "from-electric-50/50 via-background to-cyber-50/50",
    features: [
      "Small talk mastery",
      "Networking skills",
      "Cultural awareness",
      "Relationship building",
    ],
    scenarios: [
      "Coffee Shop Conversations",
      "Party Networking",
      "Dating Conversations",
      "Workplace Social Events",
    ],
  },
  {
    id: "business",
    title: "Business English",
    description:
      "Excel in professional communication for meetings, negotiations, and corporate success",
    icon: Briefcase,
    difficulty: "Advanced",
    duration: "20-30 min",
    chatPath: "/business/chat",
    gradient: "from-cyber-500 to-nova-500",
    bgGradient: "from-cyber-50/50 via-background to-nova-50/50",
    features: [
      "Meeting facilitation",
      "Email communication",
      "Negotiation tactics",
      "Professional etiquette",
    ],
    scenarios: [
      "Board Meetings",
      "Client Negotiations",
      "Team Leadership",
      "International Business",
    ],
  },
  {
    id: "speaking",
    title: "Public Speaking",
    description:
      "Overcome stage fright and deliver powerful speeches that inspire any audience",
    icon: Megaphone,
    difficulty: "Advanced",
    duration: "18-25 min",
    chatPath: "/speaking/chat",
    gradient: "from-nova-500 to-cyber-500",
    bgGradient: "from-nova-50/50 via-background to-cyber-50/50",
    features: [
      "Confidence building",
      "Voice projection",
      "Audience engagement",
      "Persuasion techniques",
    ],
    scenarios: [
      "Keynote Speech",
      "Wedding Toast",
      "Political Speech",
      "Motivational Talk",
    ],
  },
  {
    id: "cultural",
    title: "Cultural Communication",
    description:
      "Navigate cross-cultural interactions with sensitivity and global awareness",
    icon: Globe2,
    difficulty: "Intermediate",
    duration: "15-20 min",
    chatPath: "/cultural/chat",
    gradient: "from-cyber-500 to-electric-500",
    bgGradient: "from-cyber-50/50 via-background to-electric-50/50",
    features: [
      "Cultural etiquette",
      "Global customs",
      "Business protocols",
      "Inclusive communication",
    ],
    scenarios: [
      "International Business",
      "Cultural Events",
      "Travel Interactions",
      "Diplomatic Conversations",
    ],
  },
  {
    id: "humanoid",
    title: "Humanoid AI Tutor",
    description:
      "Experience revolutionary conversations with photorealistic AI humans powered by D-ID technology",
    icon: Bot,
    difficulty: "All Levels",
    duration: "Unlimited",
    chatPath: "/humanoid/chat",
    gradient: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-50/50 via-background to-violet-50/50",
    features: [
      "D-ID integration",
      "GPT-4 intelligence",
      "Voice interaction",
      "Unlimited topics",
    ],
    scenarios: [
      "General Knowledge",
      "Creative Brainstorming",
      "Problem Solving",
      "Personal Development",
    ],
  },
];

const coreFeatures = [
  {
    icon: Brain,
    title: "AI-Powered Coaching",
    description:
      "Advanced AI analyzes your speech patterns and provides personalized feedback for rapid improvement",
    color: "nova",
  },
  {
    icon: Mic,
    title: "Voice Recognition",
    description:
      "Real-time pronunciation analysis with detailed phonetic feedback and accent coaching",
    color: "electric",
  },
  {
    icon: Eye,
    title: "Body Language Analysis",
    description:
      "Visual AI assessment of posture, gestures, and facial expressions for confident presence",
    color: "cyber",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description:
      "Detailed analytics and improvement metrics to track your English learning journey",
    color: "nova",
  },
];

export default function Practice() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    chatPath: string;
    title: string;
  }>({ chatPath: "", title: "" });

  const handleStartPractice = (category: (typeof practiceCategories)[0]) => {
    setModalConfig({
      chatPath: category.chatPath,
      title: category.title,
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-nova-500/20 via-electric-500/20 to-cyber-500/20 text-foreground border-nova-500/30 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Comprehensive English Practice
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Master English with{" "}
              <span className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 bg-clip-text text-transparent">
                AI-Powered Practice
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Choose from 9 comprehensive practice modes designed to build
              confidence in every aspect of English communication - from job
              interviews to public speaking.
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Advanced AI Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-nova-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-nova-500/10"
                >
                  <CardHeader className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-nova-500 to-electric-500 rounded-xl flex items-center justify-center mx-auto glow group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practice Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
              Choose Your Practice Mode
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Each mode is designed with specific scenarios, AI coaching, and
              personalized feedback to accelerate your English mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.id}
                  className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-nova-500/20 border-border/50 hover:border-nova-500/50 overflow-hidden ${
                    selectedCategory === category.id
                      ? "ring-2 ring-nova-500 border-nova-500"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category.id ? null : category.id,
                    )
                  }
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {category.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {category.duration}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <CardTitle className="text-xl font-semibold group-hover:text-nova-400 transition-colors">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-2">
                        {category.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features List */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        Key Features:
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {category.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center space-x-2"
                          >
                            <Star className="w-3 h-3 text-nova-400 fill-nova-400" />
                            <span className="text-xs text-muted-foreground">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Scenarios - Show when expanded */}
                    {selectedCategory === category.id && (
                      <div className="space-y-3 animate-in slide-in-from-top duration-300">
                        <p className="text-sm font-medium text-foreground">
                          Practice Scenarios:
                        </p>
                        <div className="space-y-1">
                          {category.scenarios.map((scenario, scenarioIndex) => (
                            <div
                              key={scenarioIndex}
                              className="flex items-center space-x-2"
                            >
                              <Target className="w-3 h-3 text-electric-400" />
                              <span className="text-xs text-muted-foreground">
                                {scenario}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartPractice(category);
                      }}
                      className={`w-full bg-gradient-to-r ${category.gradient} hover:opacity-90 text-white font-semibold transition-all duration-300 group/btn`}
                    >
                      <Mic className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                      Start Practice
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/50 via-background to-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, label: "Practice Modes", value: "9" },
              { icon: Target, label: "AI Accuracy", value: "99.2%" },
              { icon: TrendingUp, label: "Success Rate", value: "96%" },
              { icon: Heart, label: "User Satisfaction", value: "4.9/5" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-nova-500/20 to-electric-500/20 rounded-xl flex items-center justify-center mx-auto glow">
                    <Icon className="w-6 h-6 text-nova-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-foreground">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voice/Language Selection Modal */}
      <VoiceLanguageModal
        open={showModal}
        onClose={() => setShowModal(false)}
        chatPath={modalConfig.chatPath}
        title={modalConfig.title}
      />
    </div>
  );
}
