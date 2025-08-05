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

// Firebase configuration with environment variable support
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyALuul1rqY88MPTXqNQ_xABD6xqfSrG7bQ",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "chatbot-3c584.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "chatbot-3c584",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "chatbot-3c584.appspot.com",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "4222313667",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:4222313667:web:c50b6dc0f3979e81062e76",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-W4TLMDKPLB",
};

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
