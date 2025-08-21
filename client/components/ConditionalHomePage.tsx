import { useAuth } from "@/contexts/AuthContext";
import { PublicLayout } from "@/components/PublicLayout";
import { Navigate } from "react-router-dom";
import Index from "@/pages/Index";

export const ConditionalHomePage: React.FC = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    // Authenticated user - redirect to dashboard instead of staying on homepage
    return <Navigate to="/dashboard" replace />;
  }

  // Unauthenticated user - show public homepage with sign in/up navigation
  return (
    <PublicLayout>
      <Index />
    </PublicLayout>
  );
};
