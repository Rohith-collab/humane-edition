export interface PracticeSession {
  id: string;
  practiceType: string;
  startTime: number;
  endTime?: number;
  duration: number; // in seconds
  date: string; // YYYY-MM-DD format
  completed: boolean;
}

export interface DailyUsage {
  date: string; // YYYY-MM-DD format
  sessions: PracticeSession[];
  totalDuration: number; // in seconds
}

export interface PracticeLimit {
  practiceType: string;
  dailyLimitMinutes: number;
  displayName: string;
}

// Daily limits for each practice mode (in minutes)
export const PRACTICE_LIMITS: PracticeLimit[] = [
  { practiceType: "interview", dailyLimitMinutes: 30, displayName: "Job Interview" },
  { practiceType: "restaurant", dailyLimitMinutes: 20, displayName: "Restaurant Dining" },
  { practiceType: "shopping", dailyLimitMinutes: 15, displayName: "Shopping Experience" },
  { practiceType: "grammar", dailyLimitMinutes: 25, displayName: "Grammar Tutor" },
  { practiceType: "presentation", dailyLimitMinutes: 20, displayName: "Presentation Skills" },
  { practiceType: "social", dailyLimitMinutes: 18, displayName: "Social Conversation" },
  { practiceType: "business", dailyLimitMinutes: 25, displayName: "Business English" },
  { practiceType: "speaking", dailyLimitMinutes: 22, displayName: "Public Speaking" },
  { practiceType: "cultural", dailyLimitMinutes: 20, displayName: "Cultural Communication" },
  { practiceType: "humanoid", dailyLimitMinutes: 30, displayName: "Humanoid AI Tutor" },
];

export class UsageTracker {
  private storageKey = "aangilam_usage_tracking";

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  private getStoredData(): Record<string, DailyUsage> {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error("Error reading usage data:", error);
      return {};
    }
  }

  private saveData(data: Record<string, DailyUsage>): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving usage data:", error);
    }
  }

  public startSession(practiceType: string): string {
    const sessionId = `${practiceType}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const today = this.getTodayString();
    const data = this.getStoredData();

    if (!data[today]) {
      data[today] = {
        date: today,
        sessions: [],
        totalDuration: 0,
      };
    }

    const session: PracticeSession = {
      id: sessionId,
      practiceType,
      startTime: Date.now(),
      duration: 0,
      date: today,
      completed: false,
    };

    data[today].sessions.push(session);
    this.saveData(data);
    
    return sessionId;
  }

  public endSession(sessionId: string): void {
    const data = this.getStoredData();
    const today = this.getTodayString();

    if (!data[today]) return;

    const sessionIndex = data[today].sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) return;

    const session = data[today].sessions[sessionIndex];
    const endTime = Date.now();
    const duration = Math.floor((endTime - session.startTime) / 1000);

    session.endTime = endTime;
    session.duration = duration;
    session.completed = true;

    // Update total duration for the day
    data[today].totalDuration = data[today].sessions
      .filter(s => s.completed)
      .reduce((total, s) => total + s.duration, 0);

    this.saveData(data);
  }

  public updateSessionDuration(sessionId: string, currentDuration: number): void {
    const data = this.getStoredData();
    const today = this.getTodayString();

    if (!data[today]) return;

    const sessionIndex = data[today].sessions.findIndex(s => s.id === sessionId);
    if (sessionIndex === -1) return;

    data[today].sessions[sessionIndex].duration = currentDuration;
    this.saveData(data);
  }

  public getTodayUsage(practiceType?: string): DailyUsage | null {
    const data = this.getStoredData();
    const today = this.getTodayString();
    const todayData = data[today];

    if (!todayData) return null;

    if (practiceType) {
      const filteredSessions = todayData.sessions.filter(s => s.practiceType === practiceType);
      const totalDuration = filteredSessions
        .filter(s => s.completed)
        .reduce((total, s) => total + s.duration, 0);

      return {
        date: today,
        sessions: filteredSessions,
        totalDuration,
      };
    }

    return todayData;
  }

  public getUsageByDateRange(startDate: string, endDate: string): DailyUsage[] {
    const data = this.getStoredData();
    const result: DailyUsage[] = [];

    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      const dateString = date.toISOString().split('T')[0];
      const dayData = data[dateString];

      if (dayData) {
        result.push(dayData);
      } else {
        result.push({
          date: dateString,
          sessions: [],
          totalDuration: 0,
        });
      }
    }

    return result;
  }

  public getRemainingTime(practiceType: string): number {
    const limit = PRACTICE_LIMITS.find(l => l.practiceType === practiceType);
    if (!limit) return 0;

    const todayUsage = this.getTodayUsage(practiceType);
    const usedMinutes = todayUsage ? Math.floor(todayUsage.totalDuration / 60) : 0;
    const remainingMinutes = Math.max(0, limit.dailyLimitMinutes - usedMinutes);

    return remainingMinutes;
  }

  public isSessionLocked(practiceType: string): boolean {
    return this.getRemainingTime(practiceType) <= 0;
  }

  public getUsedTime(practiceType: string): number {
    const todayUsage = this.getTodayUsage(practiceType);
    return todayUsage ? Math.floor(todayUsage.totalDuration / 60) : 0;
  }

  public getPracticeLimit(practiceType: string): PracticeLimit | undefined {
    return PRACTICE_LIMITS.find(l => l.practiceType === practiceType);
  }

  public getAllPracticeStats(): Array<{
    practiceType: string;
    displayName: string;
    usedMinutes: number;
    limitMinutes: number;
    remainingMinutes: number;
    isLocked: boolean;
    usagePercentage: number;
  }> {
    return PRACTICE_LIMITS.map(limit => {
      const usedMinutes = this.getUsedTime(limit.practiceType);
      const remainingMinutes = this.getRemainingTime(limit.practiceType);
      const isLocked = this.isSessionLocked(limit.practiceType);
      const usagePercentage = Math.min(100, (usedMinutes / limit.dailyLimitMinutes) * 100);

      return {
        practiceType: limit.practiceType,
        displayName: limit.displayName,
        usedMinutes,
        limitMinutes: limit.dailyLimitMinutes,
        remainingMinutes,
        isLocked,
        usagePercentage,
      };
    });
  }

  public cleanOldData(daysToKeep: number = 30): void {
    const data = this.getStoredData();
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    const cutoffString = cutoffDate.toISOString().split('T')[0];

    const cleanedData: Record<string, DailyUsage> = {};
    
    Object.keys(data).forEach(dateString => {
      if (dateString >= cutoffString) {
        cleanedData[dateString] = data[dateString];
      }
    });

    this.saveData(cleanedData);
  }
}

// Singleton instance
export const usageTracker = new UsageTracker();

// Utility function to format time
export function formatMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }
  
  return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
}
