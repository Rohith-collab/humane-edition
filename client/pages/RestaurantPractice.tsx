import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import { 
  UtensilsCrossed, 
  Clock, 
  Target,
  ArrowRight,
  Play,
  Coffee,
  ChefHat,
  CreditCard,
  MessageSquare,
  Heart,
  Globe,
  Utensils
} from "lucide-react";

const scenarios = [
  {
    title: "Fine Dining Experience",
    description: "Navigate upscale restaurant etiquette, wine selection, and formal service",
    difficulty: "Advanced",
    duration: "20-25 min",
    skills: ["Fine dining etiquette", "Wine vocabulary", "Formal requests", "Payment protocols"],
    icon: ChefHat,
  },
  {
    title: "Casual Restaurant Visit",
    description: "Order comfort food, handle modifications, and interact with friendly staff",
    difficulty: "Beginner",
    duration: "12-15 min",
    skills: ["Menu navigation", "Order modifications", "Casual conversation", "Basic requests"],
    icon: Coffee,
  },
  {
    title: "Special Dietary Requests",
    description: "Communicate allergies, dietary restrictions, and special meal requirements",
    difficulty: "Intermediate",
    duration: "15-18 min",
    skills: ["Allergy communication", "Dietary restrictions", "Ingredient questions", "Health requirements"],
    icon: Heart,
  },
];

const features = [
  {
    icon: Utensils,
    title: "Menu Navigation",
    description: "Master food vocabulary, descriptions, and how to ask about ingredients and preparation",
  },
  {
    icon: MessageSquare,
    title: "Service Interaction",
    description: "Practice polite requests, complaints handling, and building rapport with restaurant staff",
  },
  {
    icon: Globe,
    title: "Cultural Etiquette",
    description: "Learn dining customs, tipping practices, and appropriate behavior in different restaurant settings",
  },
];

export default function RestaurantPractice() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-amber-50/50 via-background to-orange-50/50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 text-foreground border-amber-500/30 px-4 py-2">
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Restaurant Dining Practice
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Master{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Dining Excellence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Navigate dining experiences from ordering to payment with perfect etiquette. Learn food vocabulary, polite requests, and cultural customs.
            </p>
          </div>

          <Button 
            size="lg" 
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
          >
            <UtensilsCrossed className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Dining Practice
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Restaurant Communication Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300">
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

      {/* Dining Scenarios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Dining Scenarios</h2>
            <p className="text-lg text-muted-foreground">
              Practice various restaurant situations from casual to fine dining experiences
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <Card key={index} className="group hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 border-border/50 hover:border-amber-500/50">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
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
                      <p className="text-sm font-medium text-foreground">Dining Skills:</p>
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
        chatPath="/practice/restaurant/chat"
        title="Restaurant Dining Practice"
      />
    </div>
  );
}
