import React from 'react';

// Defensive hook implementation that gracefully handles React context issues
export const useSessionTracking = (moduleName: string, autoStart = true) => {
  // Check if React hooks are available
  if (!React || typeof React.useRef !== 'function' || typeof React.useEffect !== 'function') {
    console.warn('React hooks not available, using fallback session tracking');
    return {
      isSessionActive: false,
      startSession: () => {},
      endSession: () => {},
      trackConversation: () => {},
      trackPractice: () => {},
      trackGrammar: () => {},
      trackPronunciation: () => {},
      recordFluencyImprovement: () => {},
      recordVocabularyLearned: () => {},
      currentSession: null
    };
  }

  const { useEffect, useRef } = React;

  // Dynamically import the context hook
  let analytics;
  try {
    const { useUserAnalytics } = require('@/contexts/UserAnalyticsContext');
    analytics = useUserAnalytics();
  } catch (error) {
    console.warn('UserAnalytics context not available, using fallback:', error);
    analytics = {
      startSession: () => {},
      endSession: () => {},
      recordActivity: () => {},
      updateFluencyScore: () => {},
      addWordsLearned: () => {},
      currentSession: null
    };
  }

  const {
    startSession,
    endSession,
    recordActivity,
    updateFluencyScore,
    addWordsLearned,
    currentSession
  } = analytics;

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
