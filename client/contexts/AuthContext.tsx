import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, retryFirebaseConnection, getFirebaseConnectionStatus, safeFirebaseOperation } from "@/lib/firebase";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Register new user
  const register = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Update user profile with display name
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
        // Refresh the user to get updated profile
        await userCredential.user.reload();
        setCurrentUser(userCredential.user);
      }
    } catch (error: any) {
      // Handle specific Firebase errors
      if (error.code === "auth/network-request-failed") {
        throw new Error(
          "Network connection failed. Please check your internet connection and try again.",
        );
      } else if (error.code === "auth/email-already-in-use") {
        throw new Error("An account with this email already exists.");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        throw new Error("Password should be at least 6 characters long.");
      } else {
        throw new Error(
          error.message || "Registration failed. Please try again.",
        );
      }
    }
  };

  // Login existing user
  const login = async (email: string, password: string) => {
    // Check Firebase connection status first
    const connectionStatus = getFirebaseConnectionStatus();

    if (!connectionStatus.isOnline) {
      throw new Error("You appear to be offline. Please check your internet connection and try again.");
    }

    if (!connectionStatus.hasAuth) {
      throw new Error("Authentication service is not available. Please try again later.");
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      // Log detailed error information for debugging
      console.error("Firebase Auth Error:", {
        code: error.code,
        message: error.message,
        hostname: window.location.hostname,
        authDomain: auth?.config?.authDomain,
        projectId: auth?.config?.projectId,
        customToken: error.customData,
        connectionStatus,
      });

      // Handle specific Firebase errors
      if (error.code === "auth/network-request-failed" || error.message?.includes("fetch")) {
        // Try to reconnect
        const reconnected = await retryFirebaseConnection();
        const isOnline = navigator.onLine;
        const baseMessage = "Network connection to authentication service failed.";
        const debugInfo = import.meta.env.DEV
          ? ` (Debug: hostname=${window.location.hostname}, online=${isOnline}, reconnected=${reconnected}, authDomain=${auth?.config?.authDomain})`
          : "";

        if (reconnected) {
          // Retry the login once
          try {
            await signInWithEmailAndPassword(auth, email, password);
            return; // Success on retry
          } catch (retryError: any) {
            console.error("Login retry failed:", retryError);
            throw new Error(`${baseMessage} Retry failed. Please try again.${debugInfo}`);
          }
        } else {
          throw new Error(`${baseMessage} Please check your internet connection and try again.${debugInfo}`);
        }
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email address.");
      } else if (error.code === "auth/user-disabled") {
        throw new Error("This account has been disabled.");
      } else if (error.code === "auth/user-not-found") {
        throw new Error("No account found with this email address.");
      } else if (error.code === "auth/wrong-password") {
        throw new Error("Incorrect password.");
      } else if (error.code === "auth/too-many-requests") {
        throw new Error(
          "Too many failed login attempts. Please try again later.",
        );
      } else if (error.code === "auth/unauthorized-domain") {
        throw new Error(
          "This domain is not authorized for Firebase authentication. Please contact support.",
        );
      } else {
        // Include error code in development for easier debugging
        const debugCode = import.meta.env.DEV ? ` (Error: ${error.code})` : "";
        throw new Error(
          (error.message || "Login failed. Please try again.") + debugCode,
        );
      }
    }
  };

  // Logout user
  const logout = async () => {
    await signOut(auth);
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
