// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALuul1rqY88MPTXqNQ_xABD6xqfSrG7bQ",
  authDomain: "chatbot-3c584.firebaseapp.com",
  projectId: "chatbot-3c584",
  storageBucket: "chatbot-3c584.appspot.com",
  messagingSenderId: "4222313667",
  appId: "1:4222313667:web:c50b6dc0f3979e81062e76",
  measurementId: "G-W4TLMDKPLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Export what the app needs
export { auth, db };
