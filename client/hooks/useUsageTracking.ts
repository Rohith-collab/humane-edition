import { useState, useEffect, useCallback } from "react";
import { usageTracker, PracticeSession, DailyUsage } from "@/lib/usageTracking";

interface UseUsageTrackingReturn {
  currentSessionId: string | null;
  isSessionActive: boolean;
  startSession: (practiceType: string) => string;
  endSession: () => void;
  updateDuration: (duration: number) => void;
  getTodayUsage: (practiceType?: string) => DailyUsage | null;
  getRemainingTime: (practiceType: string) => number;
  getUsedTime: (practiceType: string) => number;
  isSessionLocked: (practiceType: string) => boolean;
  getAllStats: () => Array<{
    practiceType: string;
    displayName: string;
    usedMinutes: number;
    limitMinutes: number;
    remainingMinutes: number;
    isLocked: boolean;
    usagePercentage: number;
  }>;
  refreshStats: () => void;
}

export function useUsageTracking(): UseUsageTrackingReturn {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const startSession = useCallback((practiceType: string): string => {
    // End any existing session before starting a new one
    if (currentSessionId) {
      usageTracker.endSession(currentSessionId);
    }

    const sessionId = usageTracker.startSession(practiceType);
    setCurrentSessionId(sessionId);
    setRefreshTrigger(prev => prev + 1);
    return sessionId;
  }, [currentSessionId]);

  const endSession = useCallback(() => {
    if (currentSessionId) {
      usageTracker.endSession(currentSessionId);
      setCurrentSessionId(null);
      setRefreshTrigger(prev => prev + 1);
    }
  }, [currentSessionId]);

  const updateDuration = useCallback((duration: number) => {
    if (currentSessionId) {
      usageTracker.updateSessionDuration(currentSessionId, duration);
      setRefreshTrigger(prev => prev + 1);
    }
  }, [currentSessionId]);

  const getTodayUsage = useCallback((practiceType?: string) => {
    return usageTracker.getTodayUsage(practiceType);
  }, [refreshTrigger]);

  const getRemainingTime = useCallback((practiceType: string) => {
    return usageTracker.getRemainingTime(practiceType);
  }, [refreshTrigger]);

  const getUsedTime = useCallback((practiceType: string) => {
    return usageTracker.getUsedTime(practiceType);
  }, [refreshTrigger]);

  const isSessionLocked = useCallback((practiceType: string) => {
    return usageTracker.isSessionLocked(practiceType);
  }, [refreshTrigger]);

  const getAllStats = useCallback(() => {
    return usageTracker.getAllPracticeStats();
  }, [refreshTrigger]);

  const refreshStats = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  // Clean old data on mount
  useEffect(() => {
    usageTracker.cleanOldData(30); // Keep 30 days of data
  }, []);

  // Auto-refresh stats every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTrigger(prev => prev + 1);
    }, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return {
    currentSessionId,
    isSessionActive: currentSessionId !== null,
    startSession,
    endSession,
    updateDuration,
    getTodayUsage,
    getRemainingTime,
    getUsedTime,
    isSessionLocked,
    getAllStats,
    refreshStats,
  };
}
