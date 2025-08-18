import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALuul1rqY88MPTXqNQ_xABD6xqfSrG7bQ",
  authDomain: "chatbot-3c584.firebaseapp.com",
  projectId: "chatbot-3c584",
  storageBucket: "chatbot-3c584.firebasestorage.app",
  messagingSenderId: "4222313667",
  appId: "1:4222313667:web:92a865d4c963f61d062e76",
  measurementId: "G-TMDCQFXE5C",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
