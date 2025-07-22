import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ShoppingBag, 
  Store, 
  Clock, 
  CreditCard,
  CheckCircle,
  Tag,
  Package,
  ArrowLeft,
  Play
} from "lucide-react";

export default function ShoppingPractice() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/practice">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Practice
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Shopping Experience Practice</h1>
                <Badge variant="secondary" className="text-xs mt-1">
                  Retail Environment
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 border-border/50">
          <CardContent className="p-8">
            {/* Store Scene */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 border-2 border-dashed border-blue-300 dark:border-blue-600">
                <div className="flex items-center justify-center mb-6">
                  <Store className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-center text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-3">
                  Retail Department Store
                </h3>
                <p className="text-center text-lg text-blue-600 dark:text-blue-400">
                  Practice shopping and customer service interactions
                </p>
              </div>

              {/* Store Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-cyber-500/10 rounded-lg p-6 border border-cyber-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="w-5 h-5 text-cyber-500" />
                    <span className="font-medium text-foreground">Department</span>
                  </div>
                  <p className="text-muted-foreground">Clothing & Electronics</p>
                </div>
                
                <div className="bg-nova-500/10 rounded-lg p-6 border border-nova-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-nova-500" />
                    <span className="font-medium text-foreground">Hours</span>
                  </div>
                  <p className="text-muted-foreground">9 AM - 9 PM</p>
                </div>
              </div>

              {/* Current Promotions */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <Tag className="w-5 h-5 text-electric-500" />
                  Current Promotions
                </h4>
                <div className="bg-background/50 rounded-lg p-6 border border-border/50">
                  <div className="grid grid-cols-1 gap-4 text-base">
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Summer Sale</span>
                      <Badge variant="secondary" className="text-sm">30% OFF</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Buy 2 Get 1 Free</span>
                      <Badge variant="secondary" className="text-sm">Electronics</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-foreground">Free Shipping</span>
                      <Badge variant="secondary" className="text-sm">Orders $50+</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shopping Scenarios */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-cyber-500" />
                  Practice Scenarios
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Finding specific products',
                    'Asking about sizes and colors',
                    'Inquiring about prices and discounts',
                    'Return and exchange policies',
                    'Payment and checkout process',
                    'Customer service assistance'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-base">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shopping Tips */}
              <div className="bg-gradient-to-r from-cyber-500/10 to-electric-500/10 rounded-lg p-6 border border-cyber-500/20">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-cyber-500" />
                  Shopping Tips
                </h4>
                <ul className="text-muted-foreground space-y-2 text-base">
                  <li>• Ask for assistance when needed</li>
                  <li>• Compare prices and features</li>
                  <li>• Check return policies</li>
                  <li>• Be polite with staff</li>
                </ul>
              </div>

              {/* Start Practice Button */}
              <div className="text-center pt-8">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold px-12 py-6 text-lg glow-electric transition-all duration-300 group"
                  asChild
                >
                  <Link to="/practice/shopping/chat">
                    <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    Start Shopping Practice
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
