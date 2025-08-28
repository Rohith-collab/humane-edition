import React, { useState, useEffect } from "react";
import {
  getFirebaseConnectionStatus,
  retryFirebaseConnection,
} from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface ConnectionStatus {
  isConnected: boolean;
  hasAuth: boolean;
  hasFirestore: boolean;
  hasAnalytics: boolean;
  isOnline: boolean;
}

const FirebaseStatus: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus | null>(null);
  const [retrying, setRetrying] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const updateStatus = () => {
    const newStatus = getFirebaseConnectionStatus();
    setStatus(newStatus);
    setLastUpdate(new Date());
  };

  const handleRetry = async () => {
    setRetrying(true);
    try {
      const success = await retryFirebaseConnection();
      console.log("Retry result:", success);
      setTimeout(updateStatus, 1000); // Give it a moment to update
    } catch (error) {
      console.error("Retry failed:", error);
    } finally {
      setRetrying(false);
    }
  };

  useEffect(() => {
    updateStatus();

    // Update status every 10 seconds
    const interval = setInterval(updateStatus, 10000);

    // Listen for network changes
    const handleOnline = () => {
      console.log("Network came online");
      setTimeout(updateStatus, 1000);
    };

    const handleOffline = () => {
      console.log("Network went offline");
      updateStatus();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!status) {
    return null;
  }

  const hasIssues = !status.isOnline || !status.hasAuth || !status.isConnected;

  // Only show in development or when there are issues
  if (!import.meta.env.DEV && !hasIssues) {
    return null;
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 border-2 border-border bg-card/95 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {hasIssues ? (
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          ) : (
            <CheckCircle className="h-4 w-4 text-green-500" />
          )}
          Firebase Status
          {import.meta.env.DEV && (
            <Badge variant="outline" className="text-xs">
              DEV
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            {status.isOnline ? (
              <Wifi className="h-3 w-3 text-green-500" />
            ) : (
              <WifiOff className="h-3 w-3 text-red-500" />
            )}
            <span>Network: {status.isOnline ? "Online" : "Offline"}</span>
          </div>

          <div className="flex items-center gap-2">
            {status.isConnected ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <XCircle className="h-3 w-3 text-red-500" />
            )}
            <span>
              Firebase: {status.isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {status.hasAuth ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <XCircle className="h-3 w-3 text-red-500" />
            )}
            <span>Auth: {status.hasAuth ? "Ready" : "Failed"}</span>
          </div>

          <div className="flex items-center gap-2">
            {status.hasFirestore ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <XCircle className="h-3 w-3 text-red-500" />
            )}
            <span>Firestore: {status.hasFirestore ? "Ready" : "Failed"}</span>
          </div>
        </div>

        {hasIssues && (
          <div className="pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRetry}
              disabled={retrying || !status.isOnline}
              className="w-full text-xs"
            >
              {retrying ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-2 animate-spin" />
                  Retrying...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Retry Connection
                </>
              )}
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default FirebaseStatus;
