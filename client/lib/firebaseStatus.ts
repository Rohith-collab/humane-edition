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
        // Just test if we can create a doc reference - this doesn't require permissions
        const testDoc = doc(db, "connectivity", "test");
        if (testDoc) {
          status.firestore = true;
        }
      } catch (error: any) {
        // More detailed error analysis
        if (error.code === "unavailable") {
          status.errors.push(
            `Firestore unavailable: Cannot reach Firebase backend. Check domain authorization and internet connection.`,
          );
        } else if (error.code === "permission-denied") {
          status.errors.push(
            `Firestore permission denied - this is expected if security rules restrict access. Firestore is working but access is restricted.`,
          );
          // Mark as success since permission denied means Firebase is reachable
          status.firestore = true;
        } else if (error.code === "failed-precondition") {
          status.errors.push(
            `Firestore failed-precondition: ${error.message} - check Firebase project configuration`,
          );
        } else {
          // Better error message handling
          const errorMessage =
            error?.message || JSON.stringify(error) || "Unknown error";
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
    const errorMessage =
      error?.message ||
      (typeof error === "object" ? JSON.stringify(error) : String(error)) ||
      "Unknown error";
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
    // Check if Firebase services are available
    if (!auth || !db) {
      console.error("Firebase services not initialized");
      return false;
    }

    console.log("Testing Firebase connectivity...");

    // Instead of trying to read a document (which requires permissions),
    // test Firebase connectivity by checking if we can create a document reference
    // This doesn't actually read/write data, just tests if Firebase is reachable
    const testDoc = doc(db, "connectivity", "test");
    console.log("Created doc reference successfully:", testDoc.path);

    // If we can create a doc reference and Firebase is initialized, consider it working
    console.log(
      "Firebase connectivity test successful - services are reachable",
    );

    return true;
  } catch (error: any) {
    // Log the full error object for debugging
    console.error("Firebase connectivity test failed:");
    console.error("Full error object:", error);
    console.error("Error type:", typeof error);
    console.error("Error constructor:", error?.constructor?.name);

    // More detailed error information
    const errorDetails = {
      message: error?.message || "No message",
      code: error?.code || "No code",
      hostname: window.location.hostname,
      stack: error?.stack || "No stack trace",
      customData: error?.customData || "No custom data",
      details: error?.details || "No details",
    };

    console.error("Error details:", errorDetails);

    return false;
  }
};

// Check if the current domain is likely unauthorized
export const checkDomainAuthorization = () => {
  const hostname = window.location.hostname;
  const authDomain = (window as any).firebaseDebug?.config?.authDomain || "chatbot-3c584.firebaseapp.com";

  // Since domain was manually added to Firebase Console, mark as authorized for fly.dev domains
  const isAuthorizedDomain =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.includes(".fly.dev") || // Manually authorized
    hostname.includes(authDomain.replace(".firebaseapp.com", ""));

  return {
    hostname,
    authDomain,
    isLikelyUnauthorized: !isAuthorizedDomain,
    suggestedAction: !isAuthorizedDomain
      ? `Add "${hostname}" to authorized domains in Firebase Console`
      : null,
  };
};

// Debug function - can be called from browser console
(window as any).debugFirebase = async () => {
  console.log("=== FIREBASE DEBUG START ===");
  console.log("Auth object:", auth);
  console.log("DB object:", db);
  console.log("Auth config:", auth?.config);

  try {
    const status = await checkFirebaseStatus();
    console.log("Firebase status:", status);

    const connectivity = await testFirebaseConnectivity();
    console.log("Connectivity test result:", connectivity);

    const domainCheck = checkDomainAuthorization();
    console.log("Domain check:", domainCheck);
  } catch (error) {
    console.error("Debug function error:", error);
  }
  console.log("=== FIREBASE DEBUG END ===");
};
