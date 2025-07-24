import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import VoiceLanguageModal from "@/components/VoiceLanguageModal";
import { 
  UtensilsCrossed, 
  ChefHat, 
  Clock, 
  MapPin,
  CheckCircle,
  Coffee,
  Utensils,
  ArrowLeft,
  Play
} from "lucide-react";

export default function RestaurantPractice() {
  const [showModal, setShowModal] = useState(false);

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
                <h1 className="text-xl font-semibold text-foreground">Restaurant Dining Practice</h1>
                <Badge variant="secondary" className="text-xs mt-1">
                  Dining Environment
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-red-500/5 border-border/50">
          <CardContent className="p-8">
            {/* Restaurant Scene */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-8 border-2 border-dashed border-amber-300 dark:border-amber-600">
                <div className="flex items-center justify-center mb-6">
                  <UtensilsCrossed className="w-12 h-12 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-center text-2xl font-semibold text-amber-700 dark:text-amber-300 mb-3">
                  Fine Dining Restaurant
                </h3>
                <p className="text-center text-lg text-amber-600 dark:text-amber-400">
                  Practice ordering and dining etiquette
                </p>
              </div>

              {/* Restaurant Info */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-electric-500/10 rounded-lg p-6 border border-electric-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-electric-500" />
                    <span className="font-medium text-foreground">Location</span>
                  </div>
                  <p className="text-muted-foreground">Upscale Restaurant</p>
                </div>
                
                <div className="bg-nova-500/10 rounded-lg p-6 border border-nova-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-nova-500" />
                    <span className="font-medium text-foreground">Time</span>
                  </div>
                  <p className="text-muted-foreground">Dinner Service</p>
                </div>
              </div>

              {/* Menu Preview */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <ChefHat className="w-5 h-5 text-amber-500" />
                  Today's Menu Highlights
                </h4>
                <div className="bg-background/50 rounded-lg p-6 border border-border/50">
                  <div className="grid grid-cols-2 gap-6 text-base">
                    <div>
                      <p className="font-medium text-foreground mb-2">Appetizers</p>
                      <p className="text-muted-foreground">Caesar Salad, Soup of the Day</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2">Main Courses</p>
                      <p className="text-muted-foreground">Grilled Salmon, Ribeye Steak</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2">Beverages</p>
                      <p className="text-muted-foreground">Wine List, Craft Cocktails</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground mb-2">Desserts</p>
                      <p className="text-muted-foreground">Chocolate Cake, Crème Brûlée</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dining Scenarios */}
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground flex items-center gap-3">
                  <Utensils className="w-5 h-5 text-cyber-500" />
                  Practice Scenarios
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Making a reservation',
                    'Ordering food and drinks',
                    'Asking about ingredients',
                    'Requesting modifications',
                    'Asking for the check',
                    'Tipping etiquette'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-base">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dining Etiquette */}
              <div className="bg-gradient-to-r from-electric-500/10 to-cyber-500/10 rounded-lg p-6 border border-electric-500/20">
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-electric-500" />
                  Dining Etiquette Tips
                </h4>
                <ul className="text-muted-foreground space-y-2 text-base">
                  <li>• Use "please" and "thank you"</li>
                  <li>• Wait to be seated</li>
                  <li>• Ask questions about the menu</li>
                  <li>• Be patient with service</li>
                </ul>
              </div>

              {/* Start Practice Button */}
              <div className="text-center pt-8">
                <Button
                  size="lg"
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white font-semibold px-12 py-6 text-lg glow-electric transition-all duration-300 group"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                  Start Dining Practice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voice/Language Selection Modal */}
      <VoiceLanguageModal
        open={showModal}
        onClose={() => setShowModal(false)}
        chatPath="/practice/restaurant/chat"
        title="Restaurant Dining Practice"
      />
    </div>
  );
}
