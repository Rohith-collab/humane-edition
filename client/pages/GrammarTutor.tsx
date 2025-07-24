import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Target,
  CheckCircle,
  PenTool,
  FileText,
  ArrowLeft,
  Play
} from "lucide-react";

export default function GrammarTutor() {
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
                <h1 className="text-xl font-semibold text-foreground">Grammar Tutor</h1>
                <Badge variant="secondary" className="text-xs mt-1">
                  Learning Environment
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5 border-border/50">
          <CardContent className="p-8">
            {/* Study Room Scene */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-8 border-2 border-dashed border-green-300 dark:border-green-600">
                <div className="flex items-center justify-center mb-6">
                  <GraduationCap className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-center text-2xl font-semibold text-green-700 dark:text-green-300 mb-3">
                  Grammar Learning Studio
                </h3>
                <p className="text-center text-lg text-green-600 dark:text-green-400">
                  Interactive grammar lessons and corrections
                </p>
              </div>

              {/* Session Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-nova-500/10 rounded-lg p-6 border border-nova-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="w-5 h-5 text-nova-500" />
                    <span className="font-medium text-foreground">Focus</span>
                  </div>
                  <p className="text-muted-foreground">Grammar Correction</p>
                </div>
                
                <div className="bg-electric-500/10 rounded-lg p-6 border border-electric-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-electric-500" />
                    <span className="font-medium text-foreground">Duration</span>
                  </div>
                  <p className="text-muted-foreground">20-40 minutes</p>
                </div>
              </div>

              {/* Grammar Topics */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-emerald-500" />
                  Today's Grammar Focus
                </h4>
                <div className="bg-background/50 rounded-lg p-6 border border-border/50">
                  <div className="grid grid-cols-2 gap-6 text-base">
                    <div>
                      <p className="font-medium text-foreground mb-2">Tenses</p>
                      <p className="text-muted-foreground">Present, Past, Future</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2">Articles</p>
                      <p className="text-muted-foreground">A, An, The</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2">Prepositions</p>
                      <p className="text-muted-foreground">In, On, At, By</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2">Sentence Structure</p>
                      <p className="text-muted-foreground">Subject-Verb-Object</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Activities */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <PenTool className="w-5 h-5 text-cyber-500" />
                  Learning Activities
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Sentence correction exercises',
                    'Grammar rule explanations',
                    'Interactive examples',
                    'Common mistake identification',
                    'Writing practice with feedback',
                    'Real-time corrections'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-base">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study Tips */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-lg p-6 border border-emerald-500/20">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-500" />
                  Study Tips
                </h4>
                <ul className="text-muted-foreground space-y-2 text-base">
                  <li>• Practice with real examples</li>
                  <li>• Ask for explanations when confused</li>
                  <li>• Try forming your own sentences</li>
                  <li>• Review corrections carefully</li>
                </ul>
              </div>

              {/* Start Practice Button */}
              <div className="text-center pt-8">
                <Button
                  size="lg"
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-600 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold px-12 py-6 text-lg glow-electric transition-all duration-300 group"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Start Grammar Tutor
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
