import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Wifi, WifiOff } from "lucide-react";
import {
  checkFirebaseStatus,
  testFirebaseConnectivity,
  checkDomainAuthorization,
} from "@/lib/firebaseStatus";
import { auth, db } from "@/lib/firebase";

interface FirebaseStatus {
  auth: boolean;
  firestore: boolean;
  network: boolean;
  errors: string[];
}

export default function FirebaseDebug() {
  const [status, setStatus] = useState<FirebaseStatus | null>(null);
  const [testing, setTesting] = useState(false);
  const [lastTest, setLastTest] = useState<Date | null>(null);
  const [domainCheck, setDomainCheck] = useState<any>(null);

  const runTest = async () => {
    setTesting(true);
    try {
      const result = await checkFirebaseStatus();
      const connectivityTest = await testFirebaseConnectivity();
      const domainAuth = checkDomainAuthorization();

      setStatus({
        ...result,
        firestore: connectivityTest,
      });
      setDomainCheck(domainAuth);
      setLastTest(new Date());
    } catch (error) {
      console.error("Firebase test failed:", error);

      // Better error message handling
      let errorMessage = "Unknown error";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error, null, 2);
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      setStatus({
        auth: false,
        firestore: false,
        network: navigator.onLine,
        errors: [`Test execution failed: ${errorMessage}`],
      });
    } finally {
      setTesting(false);
    }
  };

  useEffect(() => {
    runTest();
  }, []);

  const getStatusBadge = (isGood: boolean, label: string) => (
    <Badge
      variant={isGood ? "default" : "destructive"}
      className={`flex items-center gap-1 ${isGood ? "bg-green-600" : "bg-red-600"}`}
    >
      {isGood ? (
        <CheckCircle className="w-3 h-3" />
      ) : (
        <AlertCircle className="w-3 h-3" />
      )}
      {label}
    </Badge>
  );

  if (!import.meta.env.DEV) {
    return null; // Only show in development
  }

  return (
    <Card className="max-w-2xl mx-auto my-4 border-2 border-dashed border-yellow-400">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Wifi className="w-5 h-5" />
          Firebase Debug Panel
          <Badge variant="outline">DEV ONLY</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Overview */}
        {status && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {getStatusBadge(
              status.network,
              `Network: ${status.network ? "Online" : "Offline"}`,
            )}
            {getStatusBadge(
              status.auth,
              `Auth: ${status.auth ? "OK" : "Error"}`,
            )}
            {getStatusBadge(
              status.firestore,
              `Firestore: ${status.firestore ? "OK" : "Error"}`,
            )}
          </div>
        )}

        {/* Domain Authorization Warning */}
        {domainCheck?.isLikelyUnauthorized && (
          <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 font-semibold mb-2">
              <AlertCircle className="w-5 h-5" />
              LIKELY CAUSE: Domain Not Authorized
            </div>
            <div className="text-sm text-red-700 space-y-2">
              <p>
                Your app is running on{" "}
                <code className="bg-red-100 px-1 rounded">
                  {domainCheck.hostname}
                </code>{" "}
                but Firebase is configured for{" "}
                <code className="bg-red-100 px-1 rounded">
                  {domainCheck.authDomain}
                </code>
              </p>
              <p className="font-semibold">To fix this:</p>
              <ol className="list-decimal list-inside space-y-1 ml-2">
                <li>
                  Go to{" "}
                  <a
                    href={`https://console.firebase.google.com/project/${auth?.config?.projectId}/authentication/settings`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Firebase Console → Authentication → Settings
                  </a>
                </li>
                <li>Click "Authorized domains"</li>
                <li>
                  Add:{" "}
                  <code className="bg-red-100 px-1 rounded font-mono">
                    {domainCheck.hostname}
                  </code>
                </li>
                <li>Save and try again</li>
              </ol>
            </div>
          </div>
        )}

        {/* Configuration Info */}
        <div className="text-sm space-y-1 bg-muted p-3 rounded">
          <div>
            <strong>Hostname:</strong> {window.location.hostname}
          </div>
          <div>
            <strong>Auth Domain:</strong>{" "}
            {auth?.config?.authDomain || "Not available"}
          </div>
          <div>
            <strong>Project ID:</strong>{" "}
            {auth?.config?.projectId || "Not available"}
          </div>
          <div>
            <strong>Environment:</strong> {import.meta.env.MODE}
          </div>
          <div>
            <strong>Firebase Initialized:</strong>{" "}
            {auth && db ? "✅ Yes" : "❌ No"}
          </div>
          <div>
            <strong>Network Status:</strong>{" "}
            {navigator.onLine ? "✅ Online" : "❌ Offline"}
          </div>
          {domainCheck && (
            <div>
              <strong>Domain Status:</strong>{" "}
              {domainCheck.isLikelyUnauthorized
                ? "❌ Likely Unauthorized"
                : "✅ Likely OK"}
            </div>
          )}
        </div>

        {/* Errors */}
        {status?.errors && status.errors.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              Errors ({status.errors.length})
            </h4>
            <div className="space-y-1">
              {status.errors.map((error, index) => (
                <div
                  key={index}
                  className="text-sm bg-red-50 border border-red-200 p-2 rounded text-red-800"
                >
                  {error}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={runTest}
            disabled={testing}
            size="sm"
            variant="outline"
          >
            {testing ? "Testing..." : "Test Connection"}
          </Button>
          {lastTest && (
            <span className="text-xs text-muted-foreground flex items-center">
              Last test: {lastTest.toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Quick Help */}
        <div className="text-xs text-muted-foreground bg-blue-50 border border-blue-200 p-2 rounded">
          <strong>Common Issues:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              Domain not authorized in Firebase Console → Add{" "}
              {window.location.hostname} to authorized domains
            </li>
            <li>
              Network errors → Check internet connection and Firebase project
              status
            </li>
            <li>Auth errors → Verify Firebase configuration and API keys</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
