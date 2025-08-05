import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";
import { generateSampleAnalytics } from "@/utils/sampleDataGenerator";
import { retryFirebaseConnection } from "@/lib/firebase";

interface SessionData {
  sessionId: string;
  startTime: Date;
  endTime?: Date;
  module: string;
  activities: ActivityData[];
  fluencyScores: number[];
  wordsLearned: string[];
  conversationAccuracy?: number;
}

interface ActivityData {
  type: "conversation" | "practice" | "grammar" | "pronunciation";
  duration: number;
  accuracy: number;
  timestamp: Date;
}

interface UserAnalytics {
  // Stats
  totalSessions: number;
  totalHours: number;
  currentStreak: number;
  longestStreak: number;
  fluencyScore: number;
  weeklyGoal: number;
  weeklyProgress: number;
  lastSessionDate: string;
  practiceModulesCompleted: number;
  conversationsHeld: number;
  wordsLearned: number;
  pronunciationAccuracy: number;

  // Module Progress
  moduleProgress: { [key: string]: ModuleStats };

  // Recent Activity
  recentSessions: SessionData[];
  weeklyData: WeeklyStats[];
}

interface ModuleStats {
  completed: number;
  total: number;
  accuracy: number;
  timeSpent: number;
  lastAccessed: Date;
}

interface WeeklyStats {
  day: string;
  sessions: number;
  hours: number;
  fluency: number;
  date: string;
}

interface UserAnalyticsContextType {
  analytics: UserAnalytics | null;
  currentSession: SessionData | null;
  startSession: (module: string) => void;
  endSession: () => void;
  recordActivity: (activity: ActivityData) => void;
  updateFluencyScore: (score: number) => void;
  addWordsLearned: (words: string[]) => void;
  loading: boolean;
}

const UserAnalyticsContext = createContext<
  UserAnalyticsContextType | undefined
>(undefined);

export const useUserAnalytics = () => {
  const context = useContext(UserAnalyticsContext);
  if (context === undefined) {
    throw new Error(
      "useUserAnalytics must be used within a UserAnalyticsProvider",
    );
  }
  return context;
};

const getDefaultAnalytics = (): UserAnalytics => ({
  totalSessions: 0,
  totalHours: 0,
  currentStreak: 0,
  longestStreak: 0,
  fluencyScore: 0,
  weeklyGoal: 10,
  weeklyProgress: 0,
  lastSessionDate: "",
  practiceModulesCompleted: 0,
  conversationsHeld: 0,
  wordsLearned: 0,
  pronunciationAccuracy: 0,
  moduleProgress: {
    business: {
      completed: 0,
      total: 12,
      accuracy: 0,
      timeSpent: 0,
      lastAccessed: new Date(),
    },
    social: {
      completed: 0,
      total: 10,
      accuracy: 0,
      timeSpent: 0,
      lastAccessed: new Date(),
    },
    interview: {
      completed: 0,
      total: 8,
      accuracy: 0,
      timeSpent: 0,
      lastAccessed: new Date(),
    },
    presentation: {
      completed: 0,
      total: 9,
      accuracy: 0,
      timeSpent: 0,
      lastAccessed: new Date(),
    },
    cultural: {
      completed: 0,
      total: 7,
      accuracy: 0,
      timeSpent: 0,
      lastAccessed: new Date(),
    },
    grammar: {
      completed: 0,
      total: 15,
      accuracy: 0,
      timeSpent: 0,
      lastAccessed: new Date(),
    },
    humanoid: {
      completed: 0,
      total: 20,
      accuracy: 0,
      timeSpent: 0,
      lastAccessed: new Date(),
    },
  },
  recentSessions: [],
  weeklyData: [],
});

function UserAnalyticsProvider({ children }: { children: React.ReactNode }) {
  // Wrap useAuth in try-catch to handle potential context issues
  let currentUser: any = null;
  let authLoading = true;

  try {
    const auth = useAuth();
    currentUser = auth.currentUser;
    authLoading = auth.loading;
  } catch (error) {
    console.error("Error accessing auth context:", error);
    // Return children without analytics if auth is not available
    return <>{children}</>;
  }

  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null);
  const [currentSession, setCurrentSession] = useState<SessionData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  // Load user analytics from Firestore
  useEffect(() => {
    const loadUserAnalytics = async () => {
      // Don't load analytics if auth is still loading
      if (authLoading) {
        return;
      }

      if (!currentUser) {
        setAnalytics(null);
        setLoading(false);
        return;
      }

      try {
        const analyticsDoc = await getDoc(
          doc(db, "userAnalytics", currentUser.uid),
        );

        if (analyticsDoc.exists()) {
          const data = analyticsDoc.data();
          setAnalytics({
            ...data,
            recentSessions: data.recentSessions || [],
            weeklyData: data.weeklyData || [],
          } as UserAnalytics);
        } else {
          // Create sample analytics for demo purposes
          try {
            const sampleData = generateSampleAnalytics(currentUser.uid);
            await setDoc(doc(db, "userAnalytics", currentUser.uid), sampleData);
            setAnalytics(sampleData as UserAnalytics);
          } catch (saveError) {
            // If we can't save to Firebase, just use the sample data locally
            console.log("Using sample data in offline mode");
            const sampleData = generateSampleAnalytics(currentUser.uid);
            setAnalytics(sampleData as UserAnalytics);
          }
        }
      } catch (error: any) {
        console.error("Error loading user analytics:", error);

        // If it's a network error, try to retry connection
        if (
          error.code === "unavailable" ||
          error.message?.includes("network")
        ) {
          console.log(
            "Network error detected, retrying Firebase connection...",
          );
          const retrySuccess = await retryFirebaseConnection();
          if (!retrySuccess) {
            console.log("Using default analytics due to network issues");
          }
        }

        // Use default analytics as fallback
        setAnalytics(getDefaultAnalytics());
      } finally {
        setLoading(false);
      }
    };

    loadUserAnalytics();
  }, [currentUser, authLoading]);

  // Start a new learning session
  const startSession = (module: string) => {
    const sessionId = `session_${Date.now()}`;
    const newSession: SessionData = {
      sessionId,
      startTime: new Date(),
      module,
      activities: [],
      fluencyScores: [],
      wordsLearned: [],
    };
    setCurrentSession(newSession);
  };

  // End current session and save data
  const endSession = async () => {
    if (!currentSession || !currentUser || !analytics) return;

    const endTime = new Date();
    const sessionDuration =
      (endTime.getTime() - currentSession.startTime.getTime()) /
      (1000 * 60 * 60); // in hours

    const updatedSession = {
      ...currentSession,
      endTime,
    };

    try {
      // Update analytics
      const updatedAnalytics = {
        ...analytics,
        totalSessions: analytics.totalSessions + 1,
        totalHours: analytics.totalHours + sessionDuration,
        lastSessionDate: endTime.toISOString().split("T")[0],
        recentSessions: [
          updatedSession,
          ...analytics.recentSessions.slice(0, 9),
        ], // Keep last 10 sessions
      };

      // Update module progress
      if (updatedAnalytics.moduleProgress[currentSession.module]) {
        updatedAnalytics.moduleProgress[currentSession.module].timeSpent +=
          sessionDuration;
        updatedAnalytics.moduleProgress[currentSession.module].lastAccessed =
          endTime;
      }

      // Calculate weekly progress
      const today = new Date().toISOString().split("T")[0];
      const thisWeekStart = new Date();
      thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());

      const weeklyHours = updatedAnalytics.recentSessions
        .filter(
          (session) =>
            session.endTime && new Date(session.endTime) >= thisWeekStart,
        )
        .reduce((total, session) => {
          if (session.endTime) {
            return (
              total +
              (session.endTime.getTime() - session.startTime.getTime()) /
                (1000 * 60 * 60)
            );
          }
          return total;
        }, 0);

      updatedAnalytics.weeklyProgress = weeklyHours;

      // Update conversation count based on activities
      const conversationActivities = currentSession.activities.filter(
        (activity) =>
          activity.type === "conversation" || activity.type === "practice",
      );
      updatedAnalytics.conversationsHeld += conversationActivities.length;

      // Generate/update weekly data
      const weeklyData = updatedAnalytics.weeklyData || [];
      const todayData = weeklyData.find((day) => day.date === today);

      if (todayData) {
        todayData.sessions += 1;
        todayData.hours += sessionDuration;
        todayData.fluency = Math.min(
          100,
          Math.max(todayData.fluency, updatedAnalytics.fluencyScore),
        );
      } else {
        // Create new day entry
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayName = dayNames[new Date().getDay()];

        weeklyData.push({
          day: dayName,
          sessions: 1,
          hours: sessionDuration,
          fluency: updatedAnalytics.fluencyScore,
          date: today,
        });
      }

      // Keep only last 7 days
      updatedAnalytics.weeklyData = weeklyData.slice(-7);

      // Update streak
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split("T")[0];

      if (
        analytics.lastSessionDate === yesterdayStr ||
        analytics.lastSessionDate === today
      ) {
        updatedAnalytics.currentStreak = analytics.currentStreak + 1;
        updatedAnalytics.longestStreak = Math.max(
          updatedAnalytics.currentStreak,
          analytics.longestStreak,
        );
      } else if (analytics.lastSessionDate !== today) {
        updatedAnalytics.currentStreak = 1;
      }

      // Save to Firestore
      await updateDoc(doc(db, "userAnalytics", currentUser.uid), {
        ...updatedAnalytics,
        updatedAt: serverTimestamp(),
      });

      setAnalytics(updatedAnalytics);
      setCurrentSession(null);
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

  // Record activity within current session
  const recordActivity = (activity: ActivityData) => {
    if (!currentSession) return;

    const updatedSession = {
      ...currentSession,
      activities: [...currentSession.activities, activity],
    };
    setCurrentSession(updatedSession);
  };

  // Update fluency score
  const updateFluencyScore = async (score: number) => {
    if (!currentUser || !analytics) return;

    try {
      const updatedAnalytics = {
        ...analytics,
        fluencyScore: Math.round((analytics.fluencyScore + score) / 2), // Simple average
      };

      if (currentSession) {
        setCurrentSession({
          ...currentSession,
          fluencyScores: [...currentSession.fluencyScores, score],
        });
      }

      await updateDoc(doc(db, "userAnalytics", currentUser.uid), {
        fluencyScore: updatedAnalytics.fluencyScore,
        updatedAt: serverTimestamp(),
      });

      setAnalytics(updatedAnalytics);
    } catch (error) {
      console.error("Error updating fluency score:", error);
    }
  };

  // Add words learned
  const addWordsLearned = async (words: string[]) => {
    if (!currentUser || !analytics) return;

    try {
      const updatedAnalytics = {
        ...analytics,
        wordsLearned: analytics.wordsLearned + words.length,
      };

      if (currentSession) {
        setCurrentSession({
          ...currentSession,
          wordsLearned: [...currentSession.wordsLearned, ...words],
        });
      }

      await updateDoc(doc(db, "userAnalytics", currentUser.uid), {
        wordsLearned: updatedAnalytics.wordsLearned,
        updatedAt: serverTimestamp(),
      });

      setAnalytics(updatedAnalytics);
    } catch (error) {
      console.error("Error adding words learned:", error);
    }
  };

  const value: UserAnalyticsContextType = {
    analytics,
    currentSession,
    startSession,
    endSession,
    recordActivity,
    updateFluencyScore,
    addWordsLearned,
    loading,
  };

  return (
    <UserAnalyticsContext.Provider value={value}>
      {children}
    </UserAnalyticsContext.Provider>
  );
};
