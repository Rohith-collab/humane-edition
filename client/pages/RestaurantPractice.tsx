import React from 'react';
import PracticeSession from '../components/PracticeSession';
import { AnimatedAvatar } from '../components/AnimatedAvatar';
import { Badge } from "@/components/ui/badge";
import {
  UtensilsCrossed,
  ChefHat,
  Clock,
  MapPin,
  CheckCircle,
  Coffee,
  Utensils
} from "lucide-react";

const RestaurantEnvironment = () => {
  return (
    <div className="space-y-6">
      {/* Restaurant Scene */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-6 border-2 border-dashed border-amber-300 dark:border-amber-600">
        <div className="flex items-center justify-center mb-4">
          <UtensilsCrossed className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>
        <h3 className="text-center text-lg font-semibold text-amber-700 dark:text-amber-300 mb-2">
          Fine Dining Restaurant
        </h3>
        <p className="text-center text-sm text-amber-600 dark:text-amber-400">
          Practice ordering and dining etiquette
        </p>
      </div>

      {/* Restaurant Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-electric-500/10 rounded-lg p-4 border border-electric-500/20">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-electric-500" />
            <span className="text-sm font-medium text-foreground">Location</span>
          </div>
          <p className="text-sm text-muted-foreground">Upscale Restaurant</p>
        </div>
        
        <div className="bg-nova-500/10 rounded-lg p-4 border border-nova-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-nova-500" />
            <span className="text-sm font-medium text-foreground">Time</span>
          </div>
          <p className="text-sm text-muted-foreground">Dinner Service</p>
        </div>
      </div>

      {/* Menu Preview */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-amber-500" />
          Today's Menu Highlights
        </h4>
        <div className="bg-background/50 rounded-lg p-4 border border-border/50">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="font-medium text-foreground">Appetizers</p>
              <p className="text-muted-foreground">Caesar Salad, Soup of the Day</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Main Courses</p>
              <p className="text-muted-foreground">Grilled Salmon, Ribeye Steak</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Beverages</p>
              <p className="text-muted-foreground">Wine List, Craft Cocktails</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Desserts</p>
              <p className="text-muted-foreground">Chocolate Cake, Crème Brûlée</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dining Scenarios */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Utensils className="w-4 h-4 text-cyber-500" />
          Practice Scenarios
        </h4>
        <div className="space-y-2">
          {[
            'Making a reservation',
            'Ordering food and drinks',
            'Asking about ingredients',
            'Requesting modifications',
            'Asking for the check'
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dining Etiquette */}
      <div className="bg-gradient-to-r from-electric-500/10 to-cyber-500/10 rounded-lg p-4 border border-electric-500/20">
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <Coffee className="w-4 h-4 text-electric-500" />
          Dining Etiquette Tips
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Use "please" and "thank you"</li>
          <li>• Wait to be seated</li>
          <li>• Ask questions about the menu</li>
          <li>• Be patient with service</li>
        </ul>
      </div>

      {/* Session Status */}
      <div className="flex justify-center">
        <Badge className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 text-foreground border-amber-500/30">
          Dining Experience Active
        </Badge>
      </div>
    </div>
  );
};

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

export default function RestaurantPractice() {
  return (
    <PracticeSession
      scenario="Restaurant Dining"
      systemPrompt={systemPrompt}
      environment={<RestaurantEnvironment />}
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
