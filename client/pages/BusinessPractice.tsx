import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import {
  Briefcase,
  ArrowRight,
  Users,
  Mail,
  Phone,
  FileText,
  TrendingUp,
  Handshake,
  Calendar,
  PresentationChart,
} from "lucide-react";

const scenarios = [
  {
    title: "Business Meetings",
    description: "Lead productive meetings, facilitate discussions, and manage agendas effectively",
    difficulty: "Intermediate",
    duration: "20-25 min",
    skills: ["Meeting facilitation", "Decision making", "Time management", "Conflict resolution"],
    icon: Users,
  },
  {
    title: "Email Communication",
    description: "Write professional emails, proposals, and business correspondence",
    difficulty: "Beginner",
    duration: "15-20 min", 
    skills: ["Email etiquette", "Professional tone", "Clear communication", "Follow-up strategies"],
    icon: Mail,
  },
  {
    title: "Negotiations & Deals",
    description: "Navigate complex negotiations, close deals, and build win-win partnerships",
    difficulty: "Advanced",
    duration: "25-30 min",
    skills: ["Negotiation tactics", "Persuasion", "Relationship building", "Contract discussions"],
    icon: Handshake,
  },
];

const businessSkills = [
  {
    icon: Phone,
    title: "Phone Calls & Video Meetings",
    description: "Master professional phone etiquette and virtual meeting dynamics",
  },
  {
    icon: FileText,
    title: "Reports & Documentation",
    description: "Create clear, concise business reports and professional documentation",
  },
  {
    icon: PresentationChart,
    title: "Data Presentation",
    description: "Present complex data clearly and make data-driven recommendations",
  },
  {
    icon: Calendar,
    title: "Project Management",
    description: "Coordinate projects, manage timelines, and communicate with stakeholders",
  },
];

export default function BusinessPractice() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-cyber-50/50 via-background to-nova-50/50">
      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <Badge className="bg-gradient-to-r from-cyber-500/20 via-nova-500/20 to-electric-500/20 text-foreground border-cyber-500/30 px-4 py-2">
              <Briefcase className="w-4 h-4 mr-2" />
              Business English Mastery
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Excel in{" "}
              <span className="bg-gradient-to-r from-cyber-500 via-nova-500 to-electric-500 bg-clip-text text-transparent">
                Business
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Develop professional communication skills, master business vocabulary, and communicate with confidence in any corporate environment.
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-cyber-500 via-nova-500 to-electric-500 hover:from-cyber-600 hover:via-nova-600 hover:to-electric-600 text-white font-semibold px-8 py-4 text-lg glow-electric transition-all duration-300 group"
          >
            <Briefcase className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Start Business Practice
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Business Skills */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Professional Communication Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessSkills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card key={index} className="group bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyber-500/10">
                  <CardHeader className="text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyber-500 to-nova-500 rounded-xl flex items-center justify-center mx-auto glow group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{skill.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center">
                      {skill.description}
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
            <h2 className="text-3xl font-bold text-foreground">Business Scenarios</h2>
            <p className="text-lg text-muted-foreground">
              Practice real workplace situations and develop professional communication expertise
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {scenarios.map((scenario, index) => {
              const Icon = scenario.icon;
              return (
                <Card key={index} className="group hover:shadow-lg hover:shadow-cyber-500/10 transition-all duration-300 border-border/50 hover:border-cyber-500/50">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-gradient-to-br from-nova-500 to-electric-500 rounded-lg flex items-center justify-center">
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
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {scenario.duration}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {scenario.skills.length} skills
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Professional Skills:</p>
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
        chatPath="/business/chat"
        title="Business English Practice"
      />
    </div>
  );
}
