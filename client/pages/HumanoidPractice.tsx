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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-indigo-50/50 via-background to-violet-50/50 md:bg-gradient-to-br md:from-indigo-50/50 md:via-background md:to-violet-50/50 bg-cover bg-center bg-no-repeat"
         style={{
           backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://cdn.builder.io/api/v1/image/assets%2F9858961368ae4103b4a3c41674c30c55%2Fd11023333ae64e6480709f800ce25424?format=webp&width=800")',
           '@media (min-width: 768px)': {
             backgroundImage: 'none'
           }
         }}>
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-violet-500/20 text-foreground border-indigo-500/30 px-4 py-2">
              <Bot className="w-4 h-4 mr-2" />
              Humanoid AI Tutor
            </Badge>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Meet Your{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 bg-clip-text text-transparent">
                AI Companion
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience revolutionary conversations with photorealistic AI
              humans. Ask anything, explore ideas, and learn through natural
              dialogue with intelligent virtual beings.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-600 hover:via-purple-600 hover:to-violet-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
          >
            <Bot className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Conversation
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Next-Generation AI Technology
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                >
                  <CardHeader className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto glow group-hover:scale-110 transition-transform duration-300">
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

      {/* Conversation Topics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Unlimited Conversations
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore any topic with your AI companion - from casual chats to
              deep discussions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conversationTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Card
                  key={index}
                  className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <CardHeader className="text-center space-y-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-base font-semibold">
                      {topic.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center text-sm">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl font-bold text-foreground">
              Choose Your AI Personality
            </h2>
            <p className="text-lg text-muted-foreground">
              Each AI tutor has unique expertise and communication style to
              match your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tutorPersonalities.map((tutor, index) => {
              const Icon = tutor.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 border-border/50 hover:border-indigo-500/50 overflow-hidden"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center glow group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {tutor.personality}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {tutor.expertise}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <CardTitle className="text-xl font-semibold group-hover:text-indigo-400 transition-colors">
                        {tutor.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-2">
                        {tutor.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">
                        Specializations:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tutor.skills.map((skill, skillIndex) => (
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

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-violet-500/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to Meet Your AI Companion?
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the future of human-AI interaction with photorealistic
              conversations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 hover:from-indigo-600 hover:via-purple-600 hover:to-violet-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
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
