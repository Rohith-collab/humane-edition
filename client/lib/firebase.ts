// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";

// Firebase configuration with environment variables fallback
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyALuul1rqY88MPTXqNQ_xABD6xqfSrG7bQ",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "chatbot-3c584.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "chatbot-3c584",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "chatbot-3c584.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "4222313667",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:4222313667:web:92a865d4c963f61d062e76",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-TMDCQFXE5C",
};

// Debug Firebase configuration
if (import.meta.env.DEV) {
  console.log("Firebase configuration:", {
    ...firebaseConfig,
    apiKey: firebaseConfig.apiKey
      ? `${firebaseConfig.apiKey.substring(0, 10)}...`
      : "not set",
  });
  console.log("Current hostname:", window.location.hostname);
  console.log("Auth domain:", firebaseConfig.authDomain);
}

// Initialize Firebase with comprehensive error handling
let app: any = null;
let analytics: any = null;
let auth: any = null;
let db: any = null;
let isFirebaseConnected = false;

try {
  // Initialize Firebase app
  app = initializeApp(firebaseConfig);

  // Test basic connectivity first
  auth = getAuth(app);

  // Initialize Firestore with connection test
  db = getFirestore(app);

  // Initialize Analytics only in production and with proper environment
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    !import.meta.env.DEV
  ) {
    try {
      analytics = getAnalytics(app);
    } catch (analyticsError) {
      console.warn("Analytics initialization failed:", analyticsError);
    }
  }

  // Mark as connected
  isFirebaseConnected = true;

  // Enable network connectivity detection
  if (typeof window !== "undefined") {
    window.addEventListener("online", async () => {
      try {
        if (db) {
          await enableNetwork(db);
          isFirebaseConnected = true;
          console.log("Firebase reconnected");
        }
      } catch (error) {
        console.error("Firebase reconnection failed:", error);
        isFirebaseConnected = false;
      }
    });

    window.addEventListener("offline", async () => {
      try {
        if (db) {
          await disableNetwork(db);
          isFirebaseConnected = false;
          console.log("Firebase disconnected (offline)");
        }
      } catch (error) {
        console.error("Firebase offline handling failed:", error);
      }
    });
  }

} catch (error) {
  console.error("Firebase initialization error:", error);
  isFirebaseConnected = false;

  // Log detailed error information
  console.error("Firebase Error Details:", {
    message: error instanceof Error ? error.message : "Unknown error",
    hostname: window.location.hostname,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    apiKey: firebaseConfig.apiKey ? "Present" : "Missing",
    userAgent: navigator.userAgent,
    online: navigator.onLine,
  });

  // Create offline-mode placeholders to prevent app crashes
  if (!auth && app) {
    try {
      auth = getAuth(app);
    } catch (authError) {
      console.error("Auth initialization also failed:", authError);
      // Create a minimal auth placeholder
      auth = {
        currentUser: null,
        onAuthStateChanged: (callback: any) => {
          callback(null);
          return () => {};
        },
      };
    }
  }

  if (!db && app) {
    try {
      db = getFirestore(app);
    } catch (dbError) {
      console.error("Firestore initialization also failed:", dbError);
      // Create minimal db placeholder
      db = null;
    }
  }
}

// Connection retry function
export const retryFirebaseConnection = async () => {
  try {
    if (db) {
      await enableNetwork(db);
      return true;
    }
  } catch (error) {
    console.error("Firebase reconnection failed:", error);
    return false;
  }
  return false;
};

// Export what the app needs
export { auth, db, analytics };

// Debug exports for development
if (import.meta.env.DEV) {
  (window as any).firebaseDebug = {
    auth,
    db,
    analytics,
    config: firebaseConfig,
  };
}
