import { useEffect, useRef } from 'react';
import { useUserAnalytics } from '@/contexts/UserAnalyticsContext';

export const useSessionTracking = (moduleName: string, autoStart = true) => {
  const {
    startSession,
    endSession,
    recordActivity,
    updateFluencyScore,
    addWordsLearned,
    currentSession
  } = useUserAnalytics();

  const sessionStarted = useRef(false);

  useEffect(() => {
    if (autoStart && !sessionStarted.current && !currentSession) {
      startSession(moduleName);
      sessionStarted.current = true;
    }

    // Cleanup function to end session when component unmounts
    return () => {
      if (sessionStarted.current && currentSession) {
        endSession();
        sessionStarted.current = false;
      }
    };
  }, [moduleName, autoStart]);

  // Manual session control
  const startManualSession = () => {
    if (!sessionStarted.current) {
      startSession(moduleName);
      sessionStarted.current = true;
    }
  };

  const endManualSession = () => {
    if (sessionStarted.current) {
      endSession();
      sessionStarted.current = false;
    }
  };

  // Activity tracking helpers
  const trackConversation = (duration: number, accuracy: number) => {
    recordActivity({
      type: 'conversation',
      duration,
      accuracy,
      timestamp: new Date()
    });
  };

  const trackPractice = (duration: number, accuracy: number) => {
    recordActivity({
      type: 'practice',
      duration,
      accuracy,
      timestamp: new Date()
    });
  };

  const trackGrammar = (duration: number, accuracy: number) => {
    recordActivity({
      type: 'grammar',
      duration,
      accuracy,
      timestamp: new Date()
    });
  };

  const trackPronunciation = (duration: number, accuracy: number) => {
    recordActivity({
      type: 'pronunciation',
      duration,
      accuracy,
      timestamp: new Date()
    });
  };

  // Convenient methods for different types of learning activities
  const recordFluencyImprovement = (score: number) => {
    updateFluencyScore(score);
  };

  const recordVocabularyLearned = (words: string[]) => {
    addWordsLearned(words);
  };

  return {
    isSessionActive: sessionStarted.current && !!currentSession,
    startSession: startManualSession,
    endSession: endManualSession,
    trackConversation,
    trackPractice,
    trackGrammar,
    trackPronunciation,
    recordFluencyImprovement,
    recordVocabularyLearned,
    currentSession
  };
};
