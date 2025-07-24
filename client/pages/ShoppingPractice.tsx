import React, { useState } from "react";
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
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import {
  ShoppingBag,
  Clock,
  Target,
  ArrowRight,
  Play,
  Shirt,
  Laptop,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  Search,
  RotateCcw,
} from "lucide-react";

const scenarios = [
  {
    title: "Clothing Store Shopping",
    description:
      "Find the perfect fit, compare styles, and navigate sizing with confidence",
    difficulty: "Beginner",
    duration: "12-15 min",
    skills: [
      "Size inquiries",
      "Style preferences",
      "Fitting room requests",
      "Price comparisons",
    ],
    icon: Shirt,
  },
  {
    title: "Electronics Purchase",
    description:
      "Compare specifications, understand warranties, and make informed tech decisions",
    difficulty: "Intermediate",
    duration: "18-22 min",
    skills: [
      "Tech specifications",
      "Warranty terms",
      "Feature comparisons",
      "Technical support",
    ],
    icon: Laptop,
  },
  {
    title: "Grocery Shopping",
    description:
      "Navigate food aisles, ask about products, and handle checkout efficiently",
    difficulty: "Beginner",
    duration: "10-15 min",
    skills: [
      "Product location",
      "Ingredient questions",
      "Checkout process",
      "Bag preferences",
    ],
    icon: ShoppingCart,
  },
];

const features = [
  {
    icon: Search,
    title: "Product Discovery",
    description:
      "Learn to describe what you're looking for and understand product recommendations",
  },
  {
    icon: MessageSquare,
    title: "Sales Interaction",
    description:
      "Practice with sales staff, ask for assistance, and handle sales pressure professionally",
  },
  {
    icon: RotateCcw,
    title: "Returns & Exchanges",
    description:
      "Master return policies, exchange procedures, and warranty claim conversations",
  },
];

export default function ShoppingPractice() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-foreground border-blue-500/30 px-4 py-2">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shopping Experience Practice
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Shop with{" "}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Confidence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master retail conversations from browsing to purchasing. Learn to
              interact with sales staff, handle returns, and navigate any
              shopping situation.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
          >
            <ShoppingBag className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Shopping Practice
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Retail Communication Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <CardHeader className="space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold">
                      {feature.title}
                    </CardTitle>
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

      {/* Shopping Scenarios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Shopping Scenarios
            </h2>
            <p className="text-lg text-muted-foreground">
              Practice different retail environments and shopping situations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 border-border/50 hover:border-blue-500/50"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {scenario.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {scenario.title}
                    </CardTitle>
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
                      <p className="text-sm font-medium text-foreground">
                        Shopping Skills:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {scenario.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="text-xs"
                          >
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
        chatPath="/practice/shopping/chat"
        title="Shopping Experience Practice"
      />
    </div>
  );
}
