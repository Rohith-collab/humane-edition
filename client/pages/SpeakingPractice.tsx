import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import {
  Megaphone,
  ArrowRight,
  Mic,
  Eye,
  Volume2,
  Heart,
  Brain,
  Timer,
  Award,
  Zap,
} from "lucide-react";

const speakingAreas = [
  {
    title: "Overcoming Stage Fright",
    description: "Conquer nervousness and build unshakeable confidence on stage",
    difficulty: "Beginner",
    duration: "12-15 min",
    skills: ["Anxiety management", "Breathing techniques", "Confidence building", "Mental preparation"],
    icon: Heart,
  },
  {
    title: "Voice & Delivery",
    description: "Master vocal techniques, pace, and powerful delivery that captivates audiences",
    difficulty: "Intermediate",
    duration: "18-22 min", 
    skills: ["Voice projection", "Pace control", "Emphasis techniques", "Vocal variety"],
    icon: Volume2,
  },
  {
    title: "Persuasive Speaking",
    description: "Learn to influence, persuade, and inspire through compelling speech",
    difficulty: "Advanced",
    duration: "20-25 min",
    skills: ["Persuasion techniques", "Emotional appeal", "Logical arguments", "Call to action"],
    icon: Brain,
  },
];

const techniques = [
  {
    icon: Mic,
    title: "Voice Training",
    description: "Develop proper breathing, projection, and vocal control for clear, powerful speech",
  },
  {
    icon: Eye,
    title: "Body Language",
    description: "Master gestures, posture, and eye contact to enhance your message",
  },
  {
    icon: Timer,
    title: "Timing & Rhythm",
    description: "Perfect your pacing, use of pauses, and speech rhythm for maximum impact",
  },
  {
    icon: Zap,
    title: "Engagement Techniques",
    description: "Learn to captivate your audience and maintain their attention throughout",
  },
];

export default function SpeakingPractice() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-nova-50/50 via-background to-cyber-50/50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-nova-500/20 via-electric-500/20 to-cyber-500/20 text-foreground border-nova-500/30 px-4 py-2">
              <Megaphone className="w-4 h-4 mr-2" />
              Public Speaking Mastery
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Command Any{" "}
              <span className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 bg-clip-text text-transparent">
                Stage
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transform your public speaking skills, overcome stage fright, and deliver powerful speeches that inspire and persuade any audience.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
          >
            <Megaphone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Speaking Practice
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Speaking Techniques */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Master Speaking Techniques
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techniques.map((technique, index) => {
              const Icon = technique.icon;
              return (
                <Card key={index} className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-nova-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-nova-500/10">
                  <CardHeader className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-nova-500 to-electric-500 rounded-xl flex items-center justify-center mx-auto glow group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{technique.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center">
                      {technique.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Speaking Areas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Focus Areas</h2>
            <p className="text-lg text-muted-foreground">
              Develop specific skills to become a confident and compelling public speaker
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {speakingAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Card key={index} className="group hover:shadow-lg hover:shadow-nova-500/10 transition-all duration-300 border-border/50 hover:border-nova-500/50">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gradient-to-br from-electric-500 to-cyber-500 rounded-lg flex items-center justify-center">
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
                        <Timer className="w-4 h-4 mr-1" />
                        {area.duration}
                      </div>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        {area.skills.length} skills
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Core Skills:</p>
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
        chatPath="/speaking/chat"
        title="Public Speaking Practice"
      />
    </div>
  );
}
