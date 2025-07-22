import React from 'react';
import PracticeSession from '../components/PracticeSession';
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Clock, 
  Target,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const InterviewEnvironment = () => {
  return (
    <div className="space-y-6">
      {/* Interview Room Setup */}
      <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 border-2 border-dashed border-slate-300 dark:border-slate-600">
        <div className="flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-slate-600 dark:text-slate-400" />
        </div>
        <h3 className="text-center text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
          Virtual Interview Room
        </h3>
        <p className="text-center text-sm text-slate-600 dark:text-slate-400">
          Professional setting with AI interviewer
        </p>
      </div>

      {/* Interview Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-nova-500/10 rounded-lg p-4 border border-nova-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-nova-500" />
            <span className="text-sm font-medium text-foreground">Position</span>
          </div>
          <p className="text-sm text-muted-foreground">Software Developer</p>
        </div>
        
        <div className="bg-electric-500/10 rounded-lg p-4 border border-electric-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-electric-500" />
            <span className="text-sm font-medium text-foreground">Duration</span>
          </div>
          <p className="text-sm text-muted-foreground">15-30 minutes</p>
        </div>
      </div>

      {/* Interview Guidelines */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Target className="w-4 h-4 text-cyber-500" />
          Interview Focus Areas
        </h4>
        <div className="space-y-2">
          {[
            'Technical background & experience',
            'Problem-solving approach',
            'Communication skills',
            'Behavioral questions',
            'Career goals & motivation'
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-cyber-500/10 to-nova-500/10 rounded-lg p-4 border border-cyber-500/20">
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-cyber-500" />
          Interview Tips
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Speak clearly and confidently</li>
          <li>• Use specific examples (STAR method)</li>
          <li>• Ask thoughtful questions</li>
          <li>• Maintain professional tone</li>
        </ul>
      </div>

      {/* Session Status */}
      <div className="flex justify-center">
        <Badge className="bg-gradient-to-r from-nova-500/20 via-electric-500/20 to-cyber-500/20 text-foreground border-nova-500/30">
          Live Interview Session
        </Badge>
      </div>
    </div>
  );
};

const systemPrompt = `You are a professional AI interviewer conducting a job interview for a Software Developer position.

IMPORTANT INSTRUCTIONS:
- Ask one question at a time and wait for the candidate's response
- Keep your responses concise (1-2 sentences maximum)
- Be professional but friendly
- Ask follow-up questions based on their answers
- Cover technical skills, experience, problem-solving, and behavioral aspects
- Give constructive feedback when appropriate

GRAMMAR CORRECTION:
- If the candidate makes grammar mistakes, gently correct them in a professional way
- Format corrections like: "Great answer! Just a small note: you said 'I have work' but it should be 'I have worked' or 'I worked'. Now, let me ask..."
- Don't interrupt the flow of the interview - incorporate corrections naturally
- Focus on helping them communicate more clearly for professional settings
- Be encouraging and supportive with corrections

Begin the interview by introducing yourself and asking the candidate to tell you about themselves.`;

export default function InterviewPractice() {
  return (
    <PracticeSession
      scenario="Job Interview"
      systemPrompt={systemPrompt}
      environment={<InterviewEnvironment />}
    />
  );
}
