import React from 'react';
import PracticeSession from '../components/PracticeSession';
import { AnimatedAvatar } from '../components/AnimatedAvatar';
import { Briefcase } from "lucide-react";

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

export default function InterviewChat() {
  return (
    <PracticeSession
      scenario="Job Interview"
      systemPrompt={systemPrompt}
      environment={<div></div>}
      avatar={(speaking) => (
        <div className="w-full h-full relative">
          <AnimatedAvatar 
            type="ai" 
            speaking={speaking} 
            emotion="neutral"
            className="w-full h-full"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
            <Briefcase className="w-2 h-2 text-white" />
          </div>
        </div>
      )}
    />
  );
}
