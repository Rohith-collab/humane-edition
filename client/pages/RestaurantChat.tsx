import React from 'react';
import PracticeSession from '../../client/components/PracticeSession';
import { HumanAvatar } from '../../client/components/HumanAvatar';

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
  // Restaurant scene background images
  const maleRestaurantScene =
    "https://cdn.builder.io/api/v1/image/assets%2F9858961368ae4103b4a3c41674c30c55%2F82c53005c60f41e2a36ba6b7e288ade6?format=webp&width=800";
  const femaleRestaurantScene =
    "https://cdn.builder.io/api/v1/image/assets%2F9858961368ae4103b4a3c41674c30c55%2F5be9055b1cc54cd4bbf4b32d356bdeaf?format=webp&width=800";

  return (
    <PracticeSession
      scenario="Restaurant Dining"
      systemPrompt={systemPrompt}
      environment={<div></div>}
      avatar={(speaking) => (
        <HumanAvatar
          type="waiter"
          speaking={speaking}
          className="w-full h-full"
        />
      )}
      userGender="male"
    />
  );
}
