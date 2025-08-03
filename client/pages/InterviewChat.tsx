import React from 'react';
import PracticeSession from '../../client/components/PracticeSession';
import { HumanAvatar } from '../../client/components/HumanAvatar';

const systemPrompt = `You are a professional AI interviewer conducting a job interview for a Software Developer position. 



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
        <HumanAvatar
          type="interviewer"
          speaking={speaking}
          className="w-full h-full"
        />
      )}
    />
  );
}
// IMPORTANT INSTRUCTIONS:
// - Ask one question at a time and wait for the candidate's response
// - Keep your responses concise (1-2 sentences maximum)
// - Be professional but friendly
// - Ask follow-up questions based on their answers
// - Cover technical skills, experience, problem-solving, and behavioral aspects
// - Give constructive feedback when appropriate
