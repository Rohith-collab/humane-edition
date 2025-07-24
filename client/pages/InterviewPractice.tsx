import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import { 
  Building2, 
  Users, 
  Clock, 
  Target,
  CheckCircle,
  TrendingUp,
  ArrowLeft,
  Play
} from "lucide-react";

export default function InterviewPractice() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/practice">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Practice
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Job Interview Practice</h1>
                <Badge variant="secondary" className="text-xs mt-1">
                  Professional Environment
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gradient-to-br from-nova-500/5 via-electric-500/5 to-cyber-500/5 border-border/50">
          <CardContent className="p-8">
            {/* Interview Room Setup */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg p-8 border-2 border-dashed border-slate-300 dark:border-slate-600">
                <div className="flex items-center justify-center mb-6">
                  <Building2 className="w-12 h-12 text-slate-600 dark:text-slate-400" />
                </div>
                <h3 className="text-center text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Virtual Interview Room
                </h3>
                <p className="text-center text-lg text-slate-600 dark:text-slate-400">
                  Professional setting with AI interviewer
                </p>
              </div>

              {/* Interview Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-nova-500/10 rounded-lg p-6 border border-nova-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-5 h-5 text-nova-500" />
                    <span className="font-medium text-foreground">Position</span>
                  </div>
                  <p className="text-muted-foreground">Software Developer</p>
                </div>
                
                <div className="bg-electric-500/10 rounded-lg p-6 border border-electric-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-electric-500" />
                    <span className="font-medium text-foreground">Duration</span>
                  </div>
                  <p className="text-muted-foreground">15-30 minutes</p>
                </div>
              </div>

              {/* Interview Guidelines */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <Target className="w-5 h-5 text-cyber-500" />
                  Interview Focus Areas
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Technical background & experience',
                    'Problem-solving approach',
                    'Communication skills',
                    'Behavioral questions',
                    'Career goals & motivation',
                    'Team collaboration'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-base">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-r from-cyber-500/10 to-nova-500/10 rounded-lg p-6 border border-cyber-500/20">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-cyber-500" />
                  Interview Tips
                </h4>
                <ul className="text-muted-foreground space-y-2 text-base">
                  <li>• Speak clearly and confidently</li>
                  <li>• Use specific examples (STAR method)</li>
                  <li>• Ask thoughtful questions</li>
                  <li>• Maintain professional tone</li>
                </ul>
              </div>

              {/* Start Practice Button */}
              <div className="text-center pt-8">
                <Button
                  size="lg"
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-nova-500 via-electric-500 to-cyber-500 hover:from-nova-600 hover:via-electric-600 hover:to-cyber-600 text-white font-semibold px-12 py-6 text-lg glow-electric transition-all duration-300 group"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Start Interview Practice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
