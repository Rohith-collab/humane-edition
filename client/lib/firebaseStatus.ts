import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const checkFirebaseStatus = async () => {
  const status = {
    auth: false,
    firestore: false,
    network: navigator.onLine,
    errors: [] as string[]
  };

  try {
    // Check Auth
    if (auth) {
      status.auth = true;
    } else {
      status.errors.push('Auth not initialized');
    }

    // Check Firestore connection
    if (db) {
      try {
        // Try to read a simple document to test connection
        await getDoc(doc(db, 'test', 'connection'));
        status.firestore = true;
      } catch (error: any) {
        status.errors.push(`Firestore error: ${error.message}`);
      }
    } else {
      status.errors.push('Firestore not initialized');
    }

  } catch (error: any) {
    status.errors.push(`General error: ${error.message}`);
  }

  return status;
};

export const listenToFirebaseConnectivity = (callback: (connected: boolean) => void) => {
  // Listen to online/offline events
  const handleOnline = () => callback(true);
  const handleOffline = () => callback(false);
  
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  
  // Initial check
  callback(navigator.onLine);
  
  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
};

// Simple connectivity test
export const testFirebaseConnectivity = async () => {
  try {
    // Test a simple Firebase operation
    if (db) {
      await getDoc(doc(db, '__test__', 'connectivity'));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Firebase connectivity test failed:', error);
    return false;
  }
};
