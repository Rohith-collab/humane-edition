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
  const restaurantDesktopBackground =
    "https://cdn.builder.io/api/v1/image/assets%2Ffeea964a94124c0b94b020261a47ca2e%2F9169f80996df41bf9f460548aa9fd5b4?format=webp&width=800";
  const restaurantMobileBackground =
    "https://cdn.builder.io/api/v1/image/assets%2Ffeea964a94124c0b94b020261a47ca2e%2Fad9051c7df3d415e9215481db0df4535?format=webp&width=800";

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
      customBackgroundDesktop={restaurantDesktopBackground}
      customBackgroundMobile={restaurantMobileBackground}
    />
  );
}
