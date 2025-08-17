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
    "1:4222313667:web:0869438797c28c97062e76",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DDMMV2VMYG",
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services with error handling
let analytics: any = null;
let auth: any = null;
let db: any = null;

try {
  // Initialize Analytics only in production and with proper environment
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost"
  ) {
    analytics = getAnalytics(app);
  }

  // Initialize Auth
  auth = getAuth(app);

  // Initialize Firestore
  db = getFirestore(app);

  // Enable network connectivity detection
  if (typeof window !== "undefined") {
    window.addEventListener("online", () => {
      if (db) {
        enableNetwork(db).catch(console.error);
      }
    });

    window.addEventListener("offline", () => {
      if (db) {
        disableNetwork(db).catch(console.error);
      }
    });
  }
} catch (error) {
  console.error("Firebase initialization error:", error);

  // Log detailed error information
  console.error("Error details:", {
    message: error instanceof Error ? error.message : "Unknown error",
    hostname: window.location.hostname,
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
  });

  // Fallback initialization for development
  if (!auth) {
    auth = getAuth(app);
  }
  if (!db) {
    db = getFirestore(app);
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
