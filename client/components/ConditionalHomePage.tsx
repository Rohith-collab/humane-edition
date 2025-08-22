import { useAuth } from "@/contexts/AuthContext";
import { PublicLayout } from "@/components/PublicLayout";
import { OfflineModeBanner } from "@/components/OfflineModeBanner";
import { Navigation } from "@/components/ui/navigation";
import Index from "@/pages/Index";

export const ConditionalHomePage: React.FC = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    // Authenticated user - show home page with authenticated navigation
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <OfflineModeBanner />
        <Index />
      </div>
    );
  }

  // Unauthenticated user - show public homepage with sign in/up navigation
  return (
    <PublicLayout>
      <Index />
    </PublicLayout>
  );
};
