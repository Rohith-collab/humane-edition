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
  Bot,
  ArrowRight,
  Brain,
  MessageCircle,
  Video,
  Users,
  Zap,
  Globe,
  Heart,
  Lightbulb,
  Sparkles,
  Mic2,
  Camera,
  Monitor,
} from "lucide-react";

const tutorPersonalities = [
  {
    title: "Professional Mentor",
    description:
      "Expert guidance for career development, business advice, and professional growth",
    personality: "Professional",
    expertise: "Business & Career",
    skills: [
      "Career coaching",
      "Business strategy",
      "Leadership development",
      "Interview prep",
    ],
    icon: Users,
  },
  {
    title: "Creative Companion",
    description:
      "Inspiring conversations about art, creativity, writing, and innovative thinking",
    personality: "Creative",
    expertise: "Arts & Innovation",
    skills: [
      "Creative writing",
      "Art appreciation",
      "Innovation thinking",
      "Design concepts",
    ],
    icon: Lightbulb,
  },
  {
    title: "Learning Buddy",
    description:
      "Patient teacher for academic subjects, explanations, and educational support",
    personality: "Educational",
    expertise: "Learning & Education",
    skills: [
      "Subject tutoring",
      "Study techniques",
      "Research methods",
      "Academic writing",
    ],
    icon: Brain,
  },
];

const features = [
  {
    icon: Video,
    title: "D-ID Integration",
    description:
      "Experience conversations with photorealistic human avatars that respond in real-time with natural facial expressions",
  },
  {
    icon: Brain,
    title: "GPT-4 Intelligence",
    description:
      "Powered by advanced AI with vast knowledge, creative thinking, and natural conversation abilities",
  },
  {
    icon: Mic2,
    title: "Voice Interaction",
    description:
      "Speak naturally and hear responses with realistic human voice synthesis and lip-sync technology",
  },
  {
    icon: Heart,
    title: "Emotional Intelligence",
    description:
      "AI that understands context, emotions, and adapts its communication style to your needs",
  },
];

const conversationTopics = [
  {
    icon: Globe,
    title: "General Knowledge",
    description:
      "Discuss anything from science and history to current events and philosophy",
  },
  {
    icon: Lightbulb,
    title: "Problem Solving",
    description:
      "Get help with complex problems, brainstorming, and creative solutions",
  },
  {
    icon: Monitor,
    title: "Technology & AI",
    description:
      "Explore cutting-edge technology, programming, and artificial intelligence topics",
  },
  {
    icon: Heart,
    title: "Personal Growth",
    description:
      "Discuss self-improvement, relationships, wellness, and life advice",
  },
];

export default function HumanoidPractice() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50/50 via-background to-violet-50/50 md:from-indigo-50/50 md:via-background md:to-violet-50/50">
      {/* Hero Section */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Mobile-optimized floating elements */}
        <div className="absolute top-10 left-4 w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-float sm:hidden"></div>
        <div className="absolute top-32 right-6 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full blur-lg animate-bounce-slow delay-300 sm:hidden"></div>
        <div className="absolute bottom-20 left-8 w-8 h-8 bg-gradient-to-br from-violet-500/30 to-indigo-500/30 rounded-full blur-sm animate-glow sm:hidden"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-violet-500/20 text-foreground border-indigo-500/30 px-3 py-1.5 sm:px-4 sm:py-2 text-sm glow">
              <Bot className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Humanoid AI Tutor
            </Badge>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Meet Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent animate-gradient">
                AI Companion
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Experience revolutionary conversations with photorealistic AI
              humans. Ask anything, explore ideas, and learn through natural
              dialogue with intelligent virtual beings.
            </p>
          </div>

          <div className="pt-2">
            <Button
              size="lg"
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-600 hover:via-purple-600 hover:to-violet-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg glow-electric transition-all duration-300 group w-full max-w-xs sm:max-w-sm mx-auto shimmer"
            >
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Conversation
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-8 sm:mb-12 px-2">
            Next-Generation AI Technology
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 shimmer overflow-hidden"
                >
                  <CardHeader className="text-center space-y-3 sm:space-y-4 pb-3 sm:pb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto glow group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <CardTitle className="text-base sm:text-lg font-semibold leading-tight">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-muted-foreground text-center text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conversation Topics */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground px-2">
              Unlimited Conversations
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Explore any topic with your AI companion - from casual chats to
              deep discussions
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {conversationTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Card
                  key={index}
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 shimmer overflow-hidden"
                >
                  <CardHeader className="text-center space-y-2 sm:space-y-4 p-3 sm:p-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 glow">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <CardTitle className="text-sm sm:text-base font-semibold leading-tight">
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6 pt-0">
                    <CardDescription className="text-muted-foreground text-center text-xs sm:text-sm leading-relaxed">
                      {topic.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tutor Personalities */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground px-2">
              Choose Your AI Personality
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Each AI tutor has unique expertise and communication style to
              match your needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {tutorPersonalities.map((tutor, index) => {
              const Icon = tutor.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 border-border/50 hover:border-indigo-500/50 overflow-hidden shimmer"
                >
                  <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs px-2 py-0.5">
                          {tutor.personality}
                        </Badge>
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          {tutor.expertise}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <CardTitle className="text-lg sm:text-xl font-semibold group-hover:text-indigo-400 transition-colors leading-tight">
                        {tutor.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-2 text-sm sm:text-base leading-relaxed">
                        {tutor.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        Specializations:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tutor.skills.map((skill, skillIndex) => (
                          <Badge
                            key={skillIndex}
                            variant="secondary"
                            className="text-xs px-2 py-0.5"
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

      {/* CTA Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-violet-500/5 relative overflow-hidden">
        {/* Mobile-optimized floating elements for CTA */}
        <div className="absolute top-8 right-4 w-14 h-14 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse sm:hidden"></div>
        <div className="absolute bottom-8 left-4 w-10 h-10 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 rounded-full blur-lg animate-bounce-slow delay-500 sm:hidden"></div>

        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground px-2 leading-tight">
              Ready to Meet Your AI Companion?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-2">
              Experience the future of human-AI interaction with photorealistic
              conversations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button
              size="lg"
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-600 hover:via-purple-600 hover:to-violet-600 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg glow-electric transition-all duration-300 group w-full max-w-sm mx-auto shimmer pulse-glow"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Your First Conversation
            </Button>
          </div>
        </div>
      </section>

      {/* Voice/Language Selection Modal */}
      <VoiceLanguageModal
        open={showModal}
        onClose={() => setShowModal(false)}
        chatPath="/humanoid/chat"
        title="Humanoid AI Tutor"
      />
    </div>
  );
}
