import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WifiOff } from "lucide-react";

export const OfflineModeBanner: React.FC = () => {
  const { currentUser } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Clear offline mode flags on component initialization and check if previously dismissed
  useEffect(() => {
    localStorage.removeItem("firebase-offline-mode");
    const wasDismissed = localStorage.getItem("banner-dismissed") === "true";
    setIsDismissed(wasDismissed);
  }, []);

  useEffect(() => {
    // Only show banner if explicitly set to offline mode and not dismissed
    const isOfflineMode =
      localStorage.getItem("firebase-offline-mode") === "true";

    // Don't show banner if Firebase is working (we have currentUser) or if dismissed
    if (isOfflineMode && !isDismissed && !currentUser) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [currentUser, isDismissed]);

  // Set offline mode flag when Firebase errors occur (only for critical errors)
  useEffect(() => {
    const handleFirebaseError = (event: any) => {
      // Only set offline mode for severe connectivity issues, not auth errors
      const errorCode = event.detail?.code;
      const isCriticalError =
        errorCode === "unavailable" ||
        errorCode === "network-request-failed" ||
        !navigator.onLine;

      if (isCriticalError) {
        localStorage.setItem("firebase-offline-mode", "true");
        if (!isDismissed && !currentUser) {
          setShowBanner(true);
        }
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
