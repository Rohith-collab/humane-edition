import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import {
  Globe2,
  ArrowRight,
  Users,
  MapPin,
  Calendar,
  Utensils,
  Handshake,
  Heart,
  Book,
  Star,
} from "lucide-react";

const culturalAreas = [
  {
    title: "Business Etiquette",
    description: "Navigate professional customs and business practices across different cultures",
    difficulty: "Intermediate",
    duration: "18-22 min",
    skills: ["Meeting protocols", "Gift-giving customs", "Hierarchy respect", "Communication styles"],
    icon: Handshake,
  },
  {
    title: "Social Customs",
    description: "Understand social norms, greetings, and everyday interactions in various cultures",
    difficulty: "Beginner",
    duration: "15-18 min", 
    skills: ["Greeting styles", "Personal space", "Conversation topics", "Social hierarchy"],
    icon: Heart,
  },
  {
    title: "Cross-Cultural Sensitivity",
    description: "Develop awareness of cultural differences and avoid common misunderstandings",
    difficulty: "Advanced",
    duration: "20-25 min",
    skills: ["Cultural awareness", "Conflict resolution", "Assumption checking", "Adaptation strategies"],
    icon: Globe2,
  },
];

const culturalTopics = [
  {
    icon: MapPin,
    title: "Regional Differences",
    description: "Understand communication styles across different English-speaking regions",
  },
  {
    icon: Utensils,
    title: "Dining Etiquette",
    description: "Master table manners and dining customs for international settings",
  },
  {
    icon: Calendar,
    title: "Holiday & Traditions",
    description: "Learn about celebrations, traditions, and cultural observances",
  },
  {
    icon: Book,
    title: "Religious Sensitivity",
    description: "Navigate religious considerations and inclusive communication practices",
  },
];

export default function CulturalPractice() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-cyber-50/50 via-background to-electric-50/50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-cyber-500/20 via-electric-500/20 to-nova-500/20 text-foreground border-cyber-500/30 px-4 py-2">
              <Globe2 className="w-4 h-4 mr-2" />
              Cultural Communication
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Bridge{" "}
              <span className="bg-gradient-to-r from-cyber-500 via-electric-500 to-nova-500 bg-clip-text text-transparent">
                Cultures
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Develop cultural intelligence, navigate global interactions with confidence, and communicate effectively across diverse cultural backgrounds.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-cyber-500 via-electric-500 to-nova-500 hover:from-cyber-600 hover:via-electric-600 hover:to-nova-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
          >
            <Globe2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Cultural Practice
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Cultural Topics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Cultural Understanding
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturalTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Card key={index} className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-500/10">
                  <CardHeader className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyber-500 to-electric-500 rounded-xl flex items-center justify-center mx-auto glow group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center">
                      {topic.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cultural Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Practice Areas</h2>
            <p className="text-lg text-muted-foreground">
              Master cross-cultural communication skills for global success
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {culturalAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card key={index} className="group hover:shadow-lg hover:shadow-cyber-500/10 transition-all duration-300 border-border/50 hover:border-cyber-500/50">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gradient-to-br from-nova-500 to-electric-500 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {area.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold">{area.title}</CardTitle>
                    <CardDescription>{area.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {area.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {area.skills.length} skills
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Cultural Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {area.skills.map((skill, skillIndex) => (
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
        chatPath="/cultural/chat"
        title="Cultural Communication Practice"
      />
    </div>
  );
}
