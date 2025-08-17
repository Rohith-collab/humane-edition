import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, retryFirebaseConnection } from "@/lib/firebase";

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
  isGuestMode: boolean;
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
  const [isGuestMode, setIsGuestMode] = useState(false);

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
      });

      // Handle specific Firebase errors
      if (error.code === "auth/network-request-failed") {
        // Try to provide more specific guidance
        const isOnline = navigator.onLine;
        const baseMessage = "Network connection failed.";
        const debugInfo = import.meta.env.DEV
          ? ` (Debug: hostname=${window.location.hostname}, online=${isOnline}, authDomain=${auth?.config?.authDomain})`
          : "";

        throw new Error(
          `${baseMessage} Please check your internet connection and try again.${debugInfo}`,
        );
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

  // Create a guest user for demo purposes
  const createGuestUser = () => {
    const guestUser = {
      uid: `guest_${Date.now()}`,
      email: 'guest@demo.local',
      displayName: 'Demo User',
      emailVerified: false,
      isAnonymous: true,
      metadata: {
        creationTime: new Date().toISOString(),
        lastSignInTime: new Date().toISOString(),
      },
      providerData: [],
      refreshToken: '',
      tenantId: null,
      delete: async () => {},
      getIdToken: async () => 'demo-token',
      getIdTokenResult: async () => ({
        authTime: new Date().toISOString(),
        expirationTime: new Date(Date.now() + 3600000).toISOString(),
        issuedAtTime: new Date().toISOString(),
        signInProvider: 'guest',
        signInSecondFactor: null,
        token: 'demo-token',
        claims: {},
      }),
      reload: async () => {},
      toJSON: () => ({}),
    } as User;

    return guestUser;
  };

  // Monitor auth state changes
  useEffect(() => {
    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
        if (user) {
          setIsGuestMode(false);
        }
      });

      return unsubscribe;
    } catch (error: any) {
      console.warn("Firebase auth unavailable, using guest mode:", error.message);
      // If Firebase auth completely fails, create a guest user
      const guestUser = createGuestUser();
      setCurrentUser(guestUser);
      setIsGuestMode(true);
      setLoading(false);

      // Return empty cleanup function
      return () => {};
    }
  }, []);

  const value: AuthContextType = {
    currentUser,
    login,
    register,
    logout,
    loading,
    isGuestMode,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
