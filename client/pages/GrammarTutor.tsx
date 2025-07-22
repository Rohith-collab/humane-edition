import React from 'react';
import PracticeSession from '../components/PracticeSession';
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Target,
  CheckCircle,
  PenTool,
  FileText
} from "lucide-react";

const GrammarEnvironment = () => {
  return (
    <div className="space-y-6">
      {/* Study Room Scene */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border-2 border-dashed border-green-300 dark:border-green-600">
        <div className="flex items-center justify-center mb-4">
          <GraduationCap className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-center text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
          Grammar Learning Studio
        </h3>
        <p className="text-center text-sm text-green-600 dark:text-green-400">
          Interactive grammar lessons and corrections
        </p>
      </div>

      {/* Session Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-nova-500/10 rounded-lg p-4 border border-nova-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-nova-500" />
            <span className="text-sm font-medium text-foreground">Focus</span>
          </div>
          <p className="text-sm text-muted-foreground">Grammar Correction</p>
        </div>
        
        <div className="bg-electric-500/10 rounded-lg p-4 border border-electric-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-electric-500" />
            <span className="text-sm font-medium text-foreground">Duration</span>
          </div>
          <p className="text-sm text-muted-foreground">20-40 minutes</p>
        </div>
      </div>

      {/* Grammar Topics */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          Today's Grammar Focus
        </h4>
        <div className="bg-background/50 rounded-lg p-4 border border-border/50">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-medium text-foreground">Tenses</p>
              <p className="text-muted-foreground">Present, Past, Future</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Articles</p>
              <p className="text-muted-foreground">A, An, The</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Prepositions</p>
              <p className="text-muted-foreground">In, On, At, By</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Sentence Structure</p>
              <p className="text-muted-foreground">Subject-Verb-Object</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Activities */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <PenTool className="w-4 h-4 text-cyber-500" />
          Learning Activities
        </h4>
        <div className="space-y-2">
          {[
            'Sentence correction exercises',
            'Grammar rule explanations',
            'Interactive examples',
            'Common mistake identification',
            'Writing practice with feedback'
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-lg p-4 border border-emerald-500/20">
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-500" />
          Study Tips
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Practice with real examples</li>
          <li>• Ask for explanations when confused</li>
          <li>• Try forming your own sentences</li>
          <li>• Review corrections carefully</li>
        </ul>
      </div>

      {/* Current Lesson */}
      <div className="bg-gradient-to-r from-nova-500/10 to-electric-500/10 rounded-lg p-4 border border-nova-500/20">
        <h4 className="font-semibold text-foreground mb-2">Interactive Grammar Lesson</h4>
        <p className="text-sm text-muted-foreground">
          Your AI grammar tutor will provide instant corrections, explanations, 
          and help you improve your English grammar step by step.
        </p>
      </div>

      {/* Session Status */}
      <div className="flex justify-center">
        <Badge className="bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 text-foreground border-green-500/30">
          Grammar Tutoring Session
        </Badge>
      </div>
    </div>
  );
};

const systemPrompt = `You are an expert English grammar tutor with a patient and encouraging teaching style.

IMPORTANT INSTRUCTIONS:
- Correct grammar mistakes gently and explain why
- Keep explanations simple and clear (1-2 sentences)
- Provide examples to illustrate grammar rules
- Encourage students and praise improvements
- Focus on one grammar concept at a time
- Give practical exercises and examples
- Be supportive and patient with learning progress
- Ask students to practice what they've learned

Start by greeting the student and asking what grammar topic they'd like to work on, or if they have a sentence they'd like you to check.`;

export default function GrammarTutor() {
  return (
    <PracticeSession
      scenario="Grammar Tutor"
      systemPrompt={systemPrompt}
      environment={<GrammarEnvironment />}
    />
  );
}
