import { PublicNavigation } from "@/components/ui/public-navigation";
import { OfflineModeBanner } from "@/components/OfflineModeBanner";

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      <OfflineModeBanner />
      {children}
    </div>
  );
};
