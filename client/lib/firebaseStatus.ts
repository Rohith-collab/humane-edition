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
            `Firestore unavailable: Cannot reach Firebase backend. Check domain authorization and internet connection.`,
          );
        } else if (error.code === "permission-denied") {
          status.errors.push(`Firestore permission denied - this is expected if security rules restrict access to the 'connectivity' collection. Firestore is likely working but access is restricted.`);
          // Don't mark as failed if it's just permission denied, as this might be expected
          status.firestore = true;
        } else if (error.code === "failed-precondition") {
          status.errors.push(`Firestore failed-precondition: ${error.message} - check Firebase project configuration`);
        } else {
          // Better error message handling
          const errorMessage = error?.message || JSON.stringify(error) || 'Unknown error';
          status.errors.push(
            `Firestore error: ${errorMessage} (${error.code || "unknown"})`,
          );
        }
      }
    } else {
      status.errors.push("Firestore not initialized");
    }
  } catch (error: any) {
    // Better error message handling
    const errorMessage = error?.message || (typeof error === 'object' ? JSON.stringify(error) : String(error)) || 'Unknown error';
    status.errors.push(`General error: ${errorMessage}`);
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
    // Check if db is available first
    if (!db) {
      console.error("Firebase db not initialized");
      return false;
    }

    console.log("Testing Firebase connectivity...");

    // Test a simple Firebase operation with valid collection name
    const testDoc = doc(db, "connectivity", "test");
    console.log("Created doc reference:", testDoc.path);

    const docSnap = await getDoc(testDoc);
    console.log("Firebase connectivity test successful - document exists:", docSnap.exists());

    return true;
  } catch (error: any) {
    // Log the full error object for debugging
    console.error("Firebase connectivity test failed:");
    console.error("Full error object:", error);
    console.error("Error type:", typeof error);
    console.error("Error constructor:", error?.constructor?.name);

    // More detailed error information
    const errorDetails = {
      message: error?.message || 'No message',
      code: error?.code || 'No code',
      hostname: window.location.hostname,
      stack: error?.stack || 'No stack trace',
      customData: error?.customData || 'No custom data',
      details: error?.details || 'No details'
    };

    console.error("Error details:", errorDetails);

    // Log more detailed error information for debugging
    if (error.code === 'permission-denied') {
      console.warn("Firebase permission denied - this is expected if no security rules are set for the 'connectivity' collection");
    } else if (error.code === 'unavailable') {
      console.error("Firebase service unavailable - check internet connection and Firebase project status");
    } else if (error.code === 'failed-precondition') {
      console.warn("Firebase failed-precondition - possibly due to missing indexes or configuration");
    } else {
      console.error("Unknown Firebase error type:", error.code);
    }

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
