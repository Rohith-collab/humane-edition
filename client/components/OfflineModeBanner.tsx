import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";

export const OfflineModeBanner: React.FC = () => {
  const { currentUser } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Clear any existing offline mode flag on component mount
    localStorage.removeItem("firebase-offline-mode");

    // Show banner if user is logged in but potentially in offline mode
    // We detect this by checking if we have a user but localStorage has offline flag
    const isOfflineMode =
      localStorage.getItem("firebase-offline-mode") === "true";

    if (currentUser && isOfflineMode && !isDismissed) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [currentUser, isDismissed]);

  // Set offline mode flag when Firebase errors occur
  useEffect(() => {
    const handleFirebaseError = () => {
      localStorage.setItem("firebase-offline-mode", "true");
      if (currentUser && !isDismissed) {
        setShowBanner(true);
      }
    };

    // Listen for Firebase errors
    window.addEventListener("firebase-offline", handleFirebaseError);

    return () => {
      window.removeEventListener("firebase-offline", handleFirebaseError);
    };
  }, [currentUser, isDismissed]);

  if (!showBanner) {
    return null;
  }

  return (
    <Alert className="m-4 border-yellow-500/50 bg-yellow-500/10">
      <WifiOff className="h-4 w-4" />
      <AlertDescription className="flex items-center justify-between">
        <span>
          Running in offline mode with sample data. Your progress will be stored
          locally.
        </span>
        <button
          onClick={() => {
            setIsDismissed(true);
            localStorage.setItem("banner-dismissed", "true");
          }}
          className="text-xs underline ml-4 hover:no-underline"
        >
          Dismiss
        </button>
      </AlertDescription>
    </Alert>
  );
};
