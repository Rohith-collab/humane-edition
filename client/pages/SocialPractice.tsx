import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Users,
  ArrowRight,
  Coffee,
  Calendar,
  MapPin,
  Smile,
  MessageCircle,
  Heart,
  Handshake,
  PartyPopper,
} from "lucide-react";

const scenarios = [
  {
    title: "Small Talk & Networking",
    description: "Master casual conversations at social events and professional gatherings",
    difficulty: "Beginner",
    duration: "10-15 min",
    skills: ["Ice breakers", "Weather talk", "Current events", "Professional networking"],
    icon: Handshake,
  },
  {
    title: "Making Plans & Invitations",
    description: "Learn to suggest activities, make invitations, and coordinate social events",
    difficulty: "Intermediate",
    duration: "12-18 min", 
    skills: ["Event planning", "Time coordination", "Polite invitations", "Group activities"],
    icon: Calendar,
  },
  {
    title: "Dating & Relationships",
    description: "Navigate romantic conversations with confidence and cultural awareness",
    difficulty: "Advanced",
    duration: "15-20 min",
    skills: ["Flirting appropriately", "Expressing interest", "Setting boundaries", "Cultural sensitivity"],
    icon: Heart,
  },
];

const conversationTopics = [
  {
    icon: Coffee,
    title: "Casual Meetups",
    description: "Coffee dates, casual hangouts, and informal gatherings",
  },
  {
    icon: PartyPopper,
    title: "Social Events",
    description: "Parties, celebrations, and group social activities",
  },
  {
    icon: MapPin,
    title: "Travel & Experiences",
    description: "Sharing travel stories and discussing experiences",
  },
  {
    icon: Smile,
    title: "Humor & Banter",
    description: "Appropriate humor, playful teasing, and light-hearted conversations",
  },
];

export default function SocialPractice() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-electric-50/50 via-background to-cyber-50/50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-electric-500/20 via-cyber-500/20 to-nova-500/20 text-foreground border-electric-500/30 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Social Conversation Practice
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Connect Through{" "}
              <span className="bg-gradient-to-r from-electric-500 via-cyber-500 to-nova-500 bg-clip-text text-transparent">
                Conversation
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the art of social interaction, build meaningful connections, and navigate everyday conversations with confidence.
            </p>
          </div>

          <Link to="/social/chat">
            <Button size="lg" className="bg-gradient-to-r from-electric-500 via-cyber-500 to-nova-500 hover:from-electric-600 hover:via-cyber-600 hover:to-nova-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group">
              <Users className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Social Practice
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Conversation Topics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Conversation Topics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conversationTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <Card key={index} className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-electric-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/10">
                  <CardHeader className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-electric-500 to-cyber-500 rounded-xl flex items-center justify-center mx-auto glow group-hover:scale-110 transition-transform duration-300">
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

      {/* Practice Scenarios */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-card/30 via-background to-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">Social Scenarios</h2>
            <p className="text-lg text-muted-foreground">
              Practice real-world social situations and build natural conversation skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <Card key={index} className="group hover:shadow-lg hover:shadow-electric-500/10 transition-all duration-300 border-border/50 hover:border-electric-500/50">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyber-500 to-nova-500 rounded-lg flex items-center justify-center">
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
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {scenario.duration}
                      </div>
                      <div className="flex items-center">
                        <Smile className="w-4 h-4 mr-1" />
                        {scenario.skills.length} skills
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Skills You'll Learn:</p>
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
