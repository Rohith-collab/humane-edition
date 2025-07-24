import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import { 
  BookOpen, 
  Clock, 
  Target,
  ArrowRight,
  Play,
  CheckCircle,
  Lightbulb,
  FileText,
  MessageSquare,
  TrendingUp,
  Zap,
  Brain
} from "lucide-react";

const scenarios = [
  {
    title: "Basic Grammar Rules",
    description: "Master fundamental grammar concepts including tenses, articles, and sentence structure",
    difficulty: "Beginner",
    duration: "15-20 min",
    skills: ["Present/Past tenses", "Articles usage", "Subject-verb agreement", "Basic punctuation"],
    icon: BookOpen,
  },
  {
    title: "Advanced Sentence Structure",
    description: "Complex sentences, conditional statements, and sophisticated grammar patterns",
    difficulty: "Advanced",
    duration: "25-30 min",
    skills: ["Complex conditionals", "Passive voice", "Relative clauses", "Advanced conjunctions"],
    icon: Brain,
  },
  {
    title: "Business Writing",
    description: "Professional communication, formal writing, and business-specific grammar rules",
    difficulty: "Intermediate",
    duration: "20-25 min",
    skills: ["Formal tone", "Business vocabulary", "Email structure", "Professional grammar"],
    icon: FileText,
  },
];

const features = [
  {
    icon: Zap,
    title: "Real-Time Corrections",
    description: "Instant feedback on grammar mistakes with detailed explanations and examples",
  },
  {
    icon: Lightbulb,
    title: "Concept Explanation",
    description: "Clear explanations of grammar rules with practical examples and usage tips",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your improvement across different grammar topics and difficulty levels",
  },
];

export default function GrammarTutor() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50/50 via-background to-emerald-50/50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 text-foreground border-green-500/30 px-4 py-2">
              <BookOpen className="w-4 h-4 mr-2" />
              Grammar Tutor
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Perfect Your{" "}
              <span className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                Grammar
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master English grammar with personalized AI tutoring. Get real-time corrections, detailed explanations, and practice exercises tailored to your level.
            </p>
          </div>

          <Button 
            size="lg" 
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
          >
            <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Grammar Practice
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            AI-Powered Grammar Learning
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300">
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

      {/* Grammar Topics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Grammar Focus Areas</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive grammar training from basic rules to advanced concepts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <Card key={index} className="group hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 border-border/50 hover:border-green-500/50">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
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
                        {scenario.skills.length} topics
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Grammar Topics:</p>
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
        chatPath="/grammar/chat"
        title="Grammar Tutor"
      />
    </div>
  );
}
