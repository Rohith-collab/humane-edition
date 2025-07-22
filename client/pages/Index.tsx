import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Brain,
  Mic,
  Camera,
  BookOpen,
  MessageCircle,
  Theater,
  Zap,
  Globe,
  Star,
  Play,
  ArrowRight,
  Users,
  Target,
  Award,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Avatar",
    description:
      "Interact with our intelligent AI tutor that adapts to your learning style and provides personalized feedback.",
    color: "nova",
    gradient: "from-nova-500 to-nova-600",
  },
  {
    icon: Mic,
    title: "Voice Recognition",
    description:
      "Practice speaking with advanced voice input technology that analyzes your pronunciation in real-time.",
    color: "electric",
    gradient: "from-electric-500 to-electric-600",
  },
  {
    icon: Camera,
    title: "Emotion Detection",
    description:
      "Our facial recognition technology reads your emotions to provide empathetic and contextual learning support.",
    color: "cyber",
    gradient: "from-cyber-500 to-cyber-600",
  },
  {
    icon: BookOpen,
    title: "Grammar Correction",
    description:
      "Get instant feedback on your grammar with detailed explanations and practice exercises.",
    color: "nova",
    gradient: "from-nova-400 to-electric-500",
  },
  {
    icon: MessageCircle,
    title: "Pronunciation Coach",
    description:
      "Perfect your accent with our AI pronunciation coach that provides detailed phonetic feedback.",
    color: "electric",
    gradient: "from-electric-400 to-cyber-500",
  },
  {
    icon: Theater,
    title: "Interactive Stories",
    description:
      "Learn through immersive storytelling and role-play scenarios that make learning engaging and fun.",
    color: "cyber",
    gradient: "from-cyber-400 to-nova-500",
  },
];

const stats = [
  { icon: Users, label: "Active Learners", value: "50K+" },
  { icon: Globe, label: "Languages", value: "12+" },
  { icon: Award, label: "Success Rate", value: "94%" },
  { icon: Target, label: "Accuracy", value: "98%" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-nova-500/10 via-electric-500/10 to-cyber-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-background/50 to-background"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center space-y-8">
            {/* Badge */}
            <Badge className="bg-gradient-to-r from-nova-500/20 via-electric-500/20 to-cyber-500/20 text-foreground border-nova-500/30 glow">
              <Zap className="w-3 h-3 mr-1" />
              AI-Powered Learning Platform
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-nova-400 via-electric-400 to-cyber-400 bg-clip-text text-transparent">
                  HUMANE
                </span>
                <br />
                <span className="text-foreground">SpeakNova</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Master English with our revolutionary AI tutor featuring voice
                recognition, emotion detection, and interactive storytelling for
                an immersive learning experience.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
                asChild
              >
                <Link to="/practice">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Start Learning Now
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-nova-500/50 text-foreground hover:bg-nova-500/10 px-8 py-4 text-lg transition-all duration-300 group"
                asChild
              >
                <Link to="/dashboard">
                  View Dashboard
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-nova-500/20 to-electric-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-electric-500/20 to-cyber-500/20 rounded-full blur-xl float delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br from-cyber-500/20 to-nova-500/20 rounded-full blur-xl animate-bounce-slow delay-500"></div>
        <div className="absolute top-60 right-1/4 w-12 h-12 bg-gradient-to-br from-nova-500/30 to-cyber-500/30 rounded-full blur-lg animate-glow"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-card/50 via-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
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

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
              Revolutionary Learning Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of language learning with cutting-edge AI
              technology designed to accelerate your English mastery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-nova-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-nova-500/10 shimmer overflow-hidden"
                >
                  <CardHeader className="space-y-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-nova-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-nova-500/5 via-electric-500/5 to-cyber-500/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground">
              Ready to Transform Your English?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of learners who are already mastering English with
              our AI-powered platform.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300"
              asChild
            >
              <Link to="/practice">Begin Your Journey</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-nova-500/50 text-foreground hover:bg-nova-500/10 px-8 py-4 text-lg"
              asChild
            >
              <Link to="/dashboard">Explore Features</Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-2">4.9/5 from 10,000+ learners</span>
          </div>
        </div>
      </section>
    </div>
  );
}
