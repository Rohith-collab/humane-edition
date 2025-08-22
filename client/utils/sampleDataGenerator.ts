import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const generateSampleAnalytics = (userId: string) => {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Generate realistic and consistent sample data
  const totalSessions = 47;
  const totalHours = 35.8; // More realistic hours for 47 sessions
  const currentStreak = 12;
  const longestStreak = 25; // Longer than current streak
  const fluencyScore = 78;
  const weeklyGoal = 10;
  const weeklyProgress = 7.2; // Realistic progress toward goal
  const practiceModulesCompleted = 15;
  const conversationsHeld = 34; // More realistic number
  const wordsLearned = 245; // Consistent with learning progress
  const pronunciationAccuracy = 85;

  const sampleData = {
    totalSessions,
    totalHours,
    currentStreak,
    longestStreak,
    fluencyScore,
    weeklyGoal,
    weeklyProgress,
    lastSessionDate: today.toISOString().split('T')[0],
    practiceModulesCompleted,
    conversationsHeld,
    wordsLearned,
    pronunciationAccuracy,
    
    moduleProgress: {
      business: { completed: 8, total: 12, accuracy: 87, timeSpent: 4.2, lastAccessed: new Date() },
      social: { completed: 7, total: 10, accuracy: 92, timeSpent: 3.1, lastAccessed: new Date() },
      interview: { completed: 5, total: 8, accuracy: 78, timeSpent: 2.8, lastAccessed: new Date() },
      presentation: { completed: 6, total: 9, accuracy: 84, timeSpent: 3.5, lastAccessed: new Date() },
      cultural: { completed: 4, total: 7, accuracy: 89, timeSpent: 2.1, lastAccessed: new Date() },
      grammar: { completed: 12, total: 15, accuracy: 95, timeSpent: 5.8, lastAccessed: new Date() },
      humanoid: { completed: 15, total: 20, accuracy: 82, timeSpent: 6.2, lastAccessed: new Date() }
    },
    
    recentSessions: [
      {
        sessionId: 'session_1',
        startTime: new Date(today.getTime() - 2 * 60 * 60 * 1000),
        endTime: new Date(today.getTime() - 1 * 60 * 60 * 1000),
        module: 'business',
        activities: [
          { type: 'conversation', duration: 30, accuracy: 87, timestamp: new Date() },
          { type: 'practice', duration: 30, accuracy: 91, timestamp: new Date() }
        ],
        fluencyScores: [85, 89],
        wordsLearned: ['negotiation', 'proposal', 'deadline']
      },
      {
        sessionId: 'session_2',
        startTime: new Date(today.getTime() - 24 * 60 * 60 * 1000),
        endTime: new Date(today.getTime() - 23 * 60 * 60 * 1000),
        module: 'social',
        activities: [
          { type: 'conversation', duration: 45, accuracy: 92, timestamp: new Date(today.getTime() - 24 * 60 * 60 * 1000) }
        ],
        fluencyScores: [88],
        wordsLearned: ['casual', 'friendly', 'weekend']
      }
    ],
    
    weeklyData: [
      { day: 'Mon', sessions: 2, hours: 1.5, fluency: 75, date: getDateForDay(0) },
      { day: 'Tue', sessions: 3, hours: 2.1, fluency: 76, date: getDateForDay(1) },
      { day: 'Wed', sessions: 1, hours: 0.8, fluency: 77, date: getDateForDay(2) },
      { day: 'Thu', sessions: 2, hours: 1.7, fluency: 78, date: getDateForDay(3) },
      { day: 'Fri', sessions: 3, hours: 2.3, fluency: 79, date: getDateForDay(4) },
      { day: 'Sat', sessions: 1, hours: 1.1, fluency: 78, date: getDateForDay(5) },
      { day: 'Sun', sessions: 2, hours: 1.8, fluency: 80, date: getDateForDay(6) }
    ],
    
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  
  return sampleData;
};

function getDateForDay(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - (6 - daysAgo)); // This week's dates
  return date.toISOString().split('T')[0];
}

export const initializeSampleData = async (userId: string) => {
  try {
    const sampleData = generateSampleAnalytics(userId);
    await setDoc(doc(db, 'userAnalytics', userId), sampleData);
    return sampleData;
  } catch (error) {
    console.error('Error initializing sample data:', error);
    throw error;
  }
};
