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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.error(
      "useAuth called outside of AuthProvider context. This usually means the component is not wrapped in <AuthProvider>",
    );
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

  // Login existing user with retry logic
  const login = async (email: string, password: string) => {
    const maxRetries = 3;
    let lastError: any = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        return; // Success, exit the function
      } catch (error: any) {
        lastError = error;
        console.log(
          `Login attempt ${attempt} failed:`,
          error.code,
          error.message,
        );

        // Don't retry for certain error types
        if (
          [
            "auth/invalid-email",
            "auth/user-disabled",
            "auth/user-not-found",
            "auth/wrong-password",
            "auth/invalid-login-credentials",
          ].includes(error.code)
        ) {
          break; // Stop retrying for these errors
        }

        // Wait before retry (exponential backoff)
        if (attempt < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
        }
      }
    }

    // Handle specific Firebase errors
    if (lastError.code === "auth/network-request-failed") {
      throw new Error(
        "Network connection failed. Please check your internet connection and try again.",
      );
    } else if (lastError.code === "auth/invalid-email") {
      throw new Error("Invalid email address.");
    } else if (lastError.code === "auth/user-disabled") {
      throw new Error("This account has been disabled.");
    } else if (lastError.code === "auth/user-not-found") {
      throw new Error("No account found with this email address.");
    } else if (
      lastError.code === "auth/wrong-password" ||
      lastError.code === "auth/invalid-login-credentials"
    ) {
      throw new Error("Incorrect email or password.");
    } else if (lastError.code === "auth/too-many-requests") {
      throw new Error(
        "Too many failed login attempts. Please try again later.",
      );
    } else {
      throw new Error(lastError.message || "Login failed. Please try again.");
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
