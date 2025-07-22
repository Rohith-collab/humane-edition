import React from 'react';
import PracticeSession from '../components/PracticeSession';
import { AnimatedAvatar } from '../components/AnimatedAvatar';
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Store,
  Clock,
  CreditCard,
  CheckCircle,
  Tag,
  Package
} from "lucide-react";

const ShoppingEnvironment = () => {
  return (
    <div className="space-y-6">
      {/* Store Scene */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border-2 border-dashed border-blue-300 dark:border-blue-600">
        <div className="flex items-center justify-center mb-4">
          <Store className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-center text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
          Retail Department Store
        </h3>
        <p className="text-center text-sm text-blue-600 dark:text-blue-400">
          Practice shopping and customer service interactions
        </p>
      </div>

      {/* Store Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-cyber-500/10 rounded-lg p-4 border border-cyber-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-4 h-4 text-cyber-500" />
            <span className="text-sm font-medium text-foreground">Department</span>
          </div>
          <p className="text-sm text-muted-foreground">Clothing & Electronics</p>
        </div>
        
        <div className="bg-nova-500/10 rounded-lg p-4 border border-nova-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-nova-500" />
            <span className="text-sm font-medium text-foreground">Hours</span>
          </div>
          <p className="text-sm text-muted-foreground">9 AM - 9 PM</p>
        </div>
      </div>

      {/* Current Promotions */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <Tag className="w-4 h-4 text-electric-500" />
          Current Promotions
        </h4>
        <div className="bg-background/50 rounded-lg p-4 border border-border/50">
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Summer Sale</span>
              <Badge variant="secondary" className="text-xs">30% OFF</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Buy 2 Get 1 Free</span>
              <Badge variant="secondary" className="text-xs">Electronics</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Free Shipping</span>
              <Badge variant="secondary" className="text-xs">Orders $50+</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Scenarios */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyber-500" />
          Practice Scenarios
        </h4>
        <div className="space-y-2">
          {[
            'Finding specific products',
            'Asking about sizes and colors',
            'Inquiring about prices and discounts',
            'Return and exchange policies',
            'Payment and checkout process'
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
              <span className="text-muted-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Tips */}
      <div className="bg-gradient-to-r from-cyber-500/10 to-electric-500/10 rounded-lg p-4 border border-cyber-500/20">
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-cyber-500" />
          Shopping Tips
        </h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Ask for assistance when needed</li>
          <li>• Compare prices and features</li>
          <li>• Check return policies</li>
          <li>• Be polite with staff</li>
        </ul>
      </div>

      {/* Customer Service */}
      <div className="bg-gradient-to-r from-nova-500/10 to-cyber-500/10 rounded-lg p-4 border border-nova-500/20">
        <h4 className="font-semibold text-foreground mb-2">Customer Service Available</h4>
        <p className="text-sm text-muted-foreground">
          Our AI sales associate is ready to help you with product questions, 
          sizing, pricing, and checkout assistance.
        </p>
      </div>

      {/* Session Status */}
      <div className="flex justify-center">
        <Badge className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 text-foreground border-blue-500/30">
          Shopping Session Active
        </Badge>
      </div>
    </div>
  );
};

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

export default function ShoppingPractice() {
  return (
    <PracticeSession
      scenario="Shopping Experience"
      systemPrompt={systemPrompt}
      environment={<ShoppingEnvironment />}
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
