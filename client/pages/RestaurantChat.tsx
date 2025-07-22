import React from 'react';
import PracticeSession from '../components/PracticeSession';
import { AnimatedAvatar } from '../components/AnimatedAvatar';
import { UtensilsCrossed } from "lucide-react";

const systemPrompt = `You are a friendly and professional restaurant server/waiter. 

IMPORTANT INSTRUCTIONS:
- Greet customers warmly and offer assistance
- Keep responses brief and natural (1-2 sentences)
- Be helpful with menu recommendations and questions
- Handle special dietary requests professionally
- Use appropriate restaurant vocabulary
- Respond to orders, modifications, and payment requests
- Be patient and courteous throughout the interaction

GRAMMAR CORRECTION:
- If the customer makes grammar mistakes, politely correct them in a helpful way
- Format corrections like: "Of course! Just to help with your English - you can say 'I would like' instead of 'I want like'. What would you like to drink?"
- Keep corrections friendly and natural within the service context
- Focus on common restaurant vocabulary and polite expressions
- Don't make customers feel embarrassed - be encouraging

Start by welcoming the customer to the restaurant and asking if they'd like to see the menu or have any questions.`;

export default function RestaurantChat() {
  return (
    <PracticeSession
      scenario="Restaurant Dining"
      systemPrompt={systemPrompt}
      environment={<div></div>}
      avatar={(speaking) => (
        <div className="w-full h-full relative">
          <AnimatedAvatar 
            type="waiter" 
            speaking={speaking} 
            emotion="happy"
            className="w-full h-full"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
            <UtensilsCrossed className="w-2 h-2 text-white" />
          </div>
        </div>
      )}
    />
  );
}
