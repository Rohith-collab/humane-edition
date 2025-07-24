import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import {
  Presentation,
  ArrowRight,
  Target,
  Clock,
  Users,
  TrendingUp,
  Lightbulb,
  BarChart3,
  MessageSquare,
  Eye,
} from "lucide-react";

const scenarios = [
  {
    title: "Business Presentation",
    description: "Present quarterly results to stakeholders",
    difficulty: "Intermediate",
    duration: "15-20 min",
    skills: ["Data presentation", "Executive communication", "Q&A handling"],
    icon: BarChart3,
  },
  {
    title: "Product Pitch",
    description: "Convince investors about your innovative product",
    difficulty: "Advanced",
    duration: "10-15 min", 
    skills: ["Persuasion", "Storytelling", "Market analysis"],
    icon: Lightbulb,
  },
  {
    title: "Team Meeting",
    description: "Lead a project update meeting with your team",
    difficulty: "Beginner",
    duration: "8-12 min",
    skills: ["Team leadership", "Project updates", "Delegation"],
    icon: Users,
  },
];

const features = [
  {
    icon: Eye,
    title: "Body Language Analysis",
    description: "AI analyzes your posture, gestures, and eye contact for professional presence",
  },
  {
    icon: MessageSquare,
    title: "Speech Flow Coaching",
    description: "Practice smooth transitions, eliminating filler words, and maintaining pace",
  },
  {
    icon: Target,
    title: "Audience Engagement",
    description: "Learn techniques to captivate your audience and handle difficult questions",
  },
];

export default function PresentationPractice() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-nova-50/50 via-background to-electric-50/50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-nova-500/20 via-electric-500/20 to-cyber-500/20 text-foreground border-nova-500/30 px-4 py-2">
              <Presentation className="w-4 h-4 mr-2" />
              Presentation Skills Training
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Master the Art of{" "}
              <span className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 bg-clip-text text-transparent">
                Presenting
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build confidence, enhance your delivery, and captivate any audience with AI-powered presentation coaching.
            </p>
          </div>

          <Link to="/presentation/chat">
            <Button size="lg" className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group">
              <Presentation className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Presentation Practice
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            AI-Powered Presentation Coaching
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-nova-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-nova-500/10">
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-nova-500 to-electric-500 rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Practice Scenarios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Practice Scenarios</h2>
            <p className="text-lg text-muted-foreground">
              Choose from real-world presentation scenarios to practice your skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <Card key={index} className="group hover:shadow-lg hover:shadow-nova-500/10 transition-all duration-300 border-border/50 hover:border-nova-500/50">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gradient-to-br from-electric-500 to-cyber-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {scenario.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold">{scenario.title}</CardTitle>
                    <CardDescription>{scenario.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {scenario.duration}
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {scenario.skills.length} skills
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Focus Areas:</p>
                      <div className="flex flex-wrap gap-1">
                        {scenario.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
