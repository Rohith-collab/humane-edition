import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const checkFirebaseStatus = async () => {
  const status = {
    auth: false,
    firestore: false,
    network: navigator.onLine,
    errors: [] as string[],
  };

  try {
    // Check Auth
    if (auth) {
      status.auth = true;
    } else {
      status.errors.push("Auth not initialized");
    }

    // Check Firestore connection
    if (db) {
      try {
        // Try to read a simple document to test connection
        // Use a valid collection name (not reserved)
        await getDoc(doc(db, "connectivity", "test"));
        status.firestore = true;
      } catch (error: any) {
        // More detailed error analysis
        if (error.code === "unavailable") {
          status.errors.push(
            `Firestore unavailable: Cannot reach Firebase backend. Check domain authorization.`,
          );
        } else if (error.code === "permission-denied") {
          status.errors.push(`Firestore permission denied: ${error.message}`);
        } else {
          status.errors.push(
            `Firestore error: ${error.message} (${error.code || "unknown"})`,
          );
        }
      }
    } else {
      status.errors.push("Firestore not initialized");
    }
  } catch (error: any) {
    status.errors.push(`General error: ${error.message}`);
  }

  return status;
};

export const listenToFirebaseConnectivity = (
  callback: (connected: boolean) => void,
) => {
  // Listen to online/offline events
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  // Initial check
  callback(navigator.onLine);

  // Return cleanup function
  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
};

// Simple connectivity test
export const testFirebaseConnectivity = async () => {
  try {
    // Test a simple Firebase operation with valid collection name
    if (db) {
      await getDoc(doc(db, "connectivity", "test"));
      return true;
    }
    return false;
  } catch (error: any) {
    console.error("Firebase connectivity test failed:", {
      message: error.message,
      code: error.code,
      hostname: window.location.hostname,
    });
    return false;
  }
};

// Check if the current domain is likely unauthorized
export const checkDomainAuthorization = () => {
  const hostname = window.location.hostname;
  const authDomain = auth?.config?.authDomain;

  // Check if we're on a non-localhost domain that doesn't match authDomain
  const isUnauthorizedDomain =
    hostname !== "localhost" &&
    hostname !== "127.0.0.1" &&
    authDomain &&
    !hostname.includes(authDomain.replace(".firebaseapp.com", "")) &&
    (hostname.includes(".fly.dev") ||
      hostname.includes(".vercel.app") ||
      hostname.includes(".netlify.app"));

  return {
    hostname,
    authDomain,
    isLikelyUnauthorized: isUnauthorizedDomain,
    suggestedAction: isUnauthorizedDomain
      ? `Add "${hostname}" to authorized domains in Firebase Console`
      : null,
  };
};
