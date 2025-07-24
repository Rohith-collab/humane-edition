import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import { 
  Briefcase, 
  Users, 
  Clock, 
  Target,
  CheckCircle,
  TrendingUp,
  ArrowLeft,
  ArrowRight,
  Play,
  Star,
  Brain,
  MessageSquare,
  Eye,
  Handshake
} from "lucide-react";

const scenarios = [
  {
    title: "Software Developer Interview",
    description: "Technical questions, coding challenges, and system design discussions",
    difficulty: "Advanced",
    duration: "45-60 min",
    skills: ["Technical skills", "Problem solving", "Communication", "Team collaboration"],
    icon: Brain,
  },
  {
    title: "Sales Representative Interview", 
    description: "Customer relationship scenarios, sales techniques, and target achievement",
    difficulty: "Intermediate",
    duration: "30-45 min",
    skills: ["Persuasion", "Customer focus", "Results orientation", "Communication"],
    icon: TrendingUp,
  },
  {
    title: "Manager Position Interview",
    description: "Leadership scenarios, team management, and strategic decision making",
    difficulty: "Advanced", 
    duration: "45-60 min",
    skills: ["Leadership", "Decision making", "Team management", "Strategic thinking"],
    icon: Users,
  },
];

const features = [
  {
    icon: MessageSquare,
    title: "Interview Simulation",
    description: "Practice with realistic interview scenarios and common industry questions",
  },
  {
    icon: Eye,
    title: "Body Language Coaching",
    description: "AI analyzes your posture, eye contact, and gestures for professional presence",
  },
  {
    icon: Target,
    title: "Answer Optimization",
    description: "Get feedback on response structure, clarity, and persuasive impact",
  },
];

export default function InterviewPractice() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-nova-50/50 via-background to-electric-50/50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-nova-500/20 via-electric-500/20 to-cyber-500/20 text-foreground border-nova-500/30 px-4 py-2">
              <Briefcase className="w-4 h-4 mr-2" />
              Job Interview Practice
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Ace Your{" "}
              <span className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 bg-clip-text text-transparent">
                Dream Job
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Practice professional interviews with AI interviewers. Master common questions, body language, and confident responses to land your ideal position.
            </p>
          </div>

          <Button 
            size="lg" 
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
          >
            <Briefcase className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Interview Practice
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            AI-Powered Interview Coaching
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

      {/* Interview Scenarios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Interview Scenarios</h2>
            <p className="text-lg text-muted-foreground">
              Practice with role-specific interview simulations tailored to your career goals
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
                      <p className="text-sm font-medium text-foreground">Key Skills:</p>
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

      {/* Voice/Language Selection Modal */}
      <VoiceLanguageModal
        open={showModal}
        onClose={() => setShowModal(false)}
        chatPath="/practice/interview/chat"
        title="Job Interview Practice"
      />
    </div>
  );
}
