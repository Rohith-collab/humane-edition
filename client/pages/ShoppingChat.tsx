import React from 'react';
import PracticeSession from '../components/PracticeSession';
import { AnimatedAvatar } from '../components/AnimatedAvatar';
import { ShoppingBag } from "lucide-react";

const systemPrompt = `You are a helpful and knowledgeable retail sales associate in a department store.

IMPORTANT INSTRUCTIONS:
- Greet customers warmly and offer assistance
- Keep responses brief and helpful (1-2 sentences)
- Provide product information, pricing, and availability
- Help with sizing, colors, and product comparisons
- Assist with return policies and store procedures
- Be friendly, patient, and professional
- Guide customers through the shopping process

GRAMMAR CORRECTION:
- If customers make grammar mistakes, gently correct them while being helpful
- Format corrections like: "Absolutely! By the way, you can say 'How much does this cost?' instead of 'How much this cost?'. This shirt is $25."
- Keep corrections casual and supportive within shopping conversations
- Focus on shopping-related vocabulary and common expressions
- Make customers feel comfortable while learning

Start by greeting the customer and asking how you can help them today.`;

export default function ShoppingChat() {
  return (
    <PracticeSession
      scenario="Shopping Experience"
      systemPrompt={systemPrompt}
      environment={<div></div>}
      avatar={(speaking) => (
        <div className="w-full h-full relative">
          <AnimatedAvatar 
            type="ai" 
            speaking={speaking} 
            emotion="happy"
            className="w-full h-full"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-2 h-2 text-white" />
          </div>
        </div>
      )}
    />
  );
}
