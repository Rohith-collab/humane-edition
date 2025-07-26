import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export const generateSampleAnalytics = (userId: string) => {
  const today = new Date();
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Generate realistic sample data
  const sampleData = {
    totalSessions: 47,
    totalHours: 23.5,
    currentStreak: 7,
    longestStreak: 12,
    fluencyScore: 78,
    weeklyGoal: 10,
    weeklyProgress: 7.5,
    lastSessionDate: today.toISOString().split('T')[0],
    practiceModulesCompleted: 15,
    conversationsHeld: 32,
    wordsLearned: 284,
    pronunciationAccuracy: 85,
    
    moduleProgress: {
      business: { completed: 8, total: 12, accuracy: 89, timeSpent: 4.2, lastAccessed: new Date() },
      social: { completed: 6, total: 10, accuracy: 82, timeSpent: 3.8, lastAccessed: new Date() },
      interview: { completed: 5, total: 8, accuracy: 91, timeSpent: 2.1, lastAccessed: new Date() },
      presentation: { completed: 7, total: 9, accuracy: 87, timeSpent: 3.5, lastAccessed: new Date() },
      cultural: { completed: 4, total: 7, accuracy: 78, timeSpent: 1.9, lastAccessed: new Date() },
      grammar: { completed: 9, total: 15, accuracy: 93, timeSpent: 6.2, lastAccessed: new Date() },
      humanoid: { completed: 3, total: 20, accuracy: 85, timeSpent: 2.8, lastAccessed: new Date() }
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
      }
    ],
    
    weeklyData: [
      { day: 'Mon', sessions: 2, hours: 1.5, fluency: 75, date: getDateForDay(0) },
      { day: 'Tue', sessions: 3, hours: 2.1, fluency: 76, date: getDateForDay(1) },
      { day: 'Wed', sessions: 1, hours: 0.8, fluency: 74, date: getDateForDay(2) },
      { day: 'Thu', sessions: 4, hours: 2.8, fluency: 78, date: getDateForDay(3) },
      { day: 'Fri', sessions: 2, hours: 1.4, fluency: 77, date: getDateForDay(4) },
      { day: 'Sat', sessions: 3, hours: 2.2, fluency: 79, date: getDateForDay(5) },
      { day: 'Sun', sessions: 2, hours: 1.7, fluency: 78, date: getDateForDay(6) }
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
