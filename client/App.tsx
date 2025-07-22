import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import InterviewPractice from "./pages/InterviewPractice";
import RestaurantPractice from "./pages/RestaurantPractice";
import ShoppingPractice from "./pages/ShoppingPractice";
import GrammarTutor from "./pages/GrammarTutor";
import InterviewChat from "./pages/InterviewChat";
import RestaurantChat from "./pages/RestaurantChat";
import ShoppingChat from "./pages/ShoppingChat";
import GrammarChat from "./pages/GrammarChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout component that includes navigation
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Navigation />
    {children}
  </div>
);

// Placeholder component for unimplemented pages
const PlaceholderPage = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <Layout>
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="w-24 h-24 bg-gradient-to-br from-nova-500/20 to-electric-500/20 rounded-2xl flex items-center justify-center mx-auto glow">
          <span className="text-4xl">🚧</span>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          This page is under development. Continue prompting to help build out
          this section!
        </p>
      </div>
    </div>
  </Layout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Index />
              </Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PlaceholderPage
                title="Dashboard"
                description="View your learning progress, achievements, and personalized insights."
              />
            }
          />
          <Route
            path="/practice"
            element={
              <Layout>
                <Practice />
              </Layout>
            }
          />
          <Route
            path="/practice/interview"
            element={
              <Layout>
                <InterviewPractice />
              </Layout>
            }
          />
          <Route
            path="/practice/restaurant"
            element={
              <Layout>
                <RestaurantPractice />
              </Layout>
            }
          />
          <Route
            path="/practice/shopping"
            element={
              <Layout>
                <ShoppingPractice />
              </Layout>
            }
          />
          <Route
            path="/grammar"
            element={
              <Layout>
                <GrammarTutor />
              </Layout>
            }
          />
          <Route
            path="/practice/interview/chat"
            element={<InterviewChat />}
          />
          <Route
            path="/practice/restaurant/chat"
            element={<RestaurantChat />}
          />
          <Route
            path="/practice/shopping/chat"
            element={<ShoppingChat />}
          />
          <Route
            path="/grammar/chat"
            element={<GrammarChat />}
          />
          <Route
            path="/pronunciation"
            element={
              <PlaceholderPage
                title="Pronunciation Coach"
                description="Perfect your pronunciation with real-time feedback and coaching."
              />
            }
          />
          <Route
            path="/stories"
            element={
              <PlaceholderPage
                title="Story Mode"
                description="Learn through immersive storytelling and interactive role-play."
              />
            }
          />
          <Route
            path="/settings"
            element={
              <PlaceholderPage
                title="Settings"
                description="Customize your learning experience and manage your account."
              />
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
