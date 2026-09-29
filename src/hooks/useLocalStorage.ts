import { useState, useEffect } from 'react';
import { UserHistoryItem, AppSettings, TestResult } from '../types';

const INITIAL_SETTINGS: AppSettings = {
  theme: 'light',
  fontSize: 'normal',
  enableSound: true,
  reducedMotion: false
};

export function useAppStorage() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('clio7_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('clio7_theme', theme);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Favorites state (Set of IDs)
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clio7_favorites');
      return saved ? JSON.parse(saved) : ['d_1492', 'columbus', 't_absolutism', 'ev_vgo'];
    } catch {
      return ['d_1492', 'columbus', 't_absolutism'];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('clio7_favorites', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  // History state
  const [history, setHistory] = useState<UserHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('clio7_history');
      return saved ? JSON.parse(saved) : [
        { id: 'columbus', type: 'personality', title: 'Христофор Колумб', subtitle: '1451—1506 · Мореплаватель', timestamp: Date.now() - 3600000 },
        { id: 't_absolutism', type: 'term', title: 'Абсолютизм', subtitle: 'Государство и право', timestamp: Date.now() - 7200000 },
        { id: 'd_1492', type: 'date', title: '1492 г. — Открытие Америки', subtitle: 'XV век · Америка', timestamp: Date.now() - 10800000 }
      ];
    } catch {
      return [];
    }
  });

  const addToHistory = (item: Omit<UserHistoryItem, 'timestamp'>) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.id !== item.id);
      const next = [{ ...item, timestamp: Date.now() }, ...filtered].slice(0, 20);
      try {
        localStorage.setItem('clio7_history', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('clio7_history');
    } catch (e) {
      console.warn(e);
    }
  };

  // Flashcard progress
  const [knownCards, setKnownCards] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clio7_known_cards');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const markCardKnown = (cardId: string, known: boolean) => {
    setKnownCards(prev => {
      const next = known
        ? (prev.includes(cardId) ? prev : [...prev, cardId])
        : prev.filter(c => c !== cardId);
      try {
        localStorage.setItem('clio7_known_cards', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  // Read paragraphs progress (IDs of read chapters)
  const [readParagraphs, setReadParagraphs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('clio7_read_paragraphs');
      return saved ? JSON.parse(saved) : ['intro', 'ch_1', 'ch_2'];
    } catch {
      return ['intro', 'ch_1', 'ch_2'];
    }
  });

  const toggleReadParagraph = (id: string) => {
    setReadParagraphs(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('clio7_read_paragraphs', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const isParagraphRead = (id: string) => readParagraphs.includes(id);

  // Test Results History
  const [testResults, setTestResults] = useState<TestResult[]>(() => {
    try {
      const saved = localStorage.getItem('clio7_test_results');
      return saved ? JSON.parse(saved) : [
        {
          id: 'tr_sample_1',
          timestamp: Date.now() - 86400000 * 2,
          topicTitle: 'Великие географические открытия',
          score: 8,
          totalQuestions: 10,
          percentage: 80,
          wrongQuestionIds: []
        }
      ];
    } catch {
      return [];
    }
  });

  const addTestResult = (result: Omit<TestResult, 'id' | 'timestamp'>) => {
    const newResult: TestResult = {
      ...result,
      id: `tr_${Date.now()}`,
      timestamp: Date.now()
    };
    setTestResults(prev => {
      const next = [newResult, ...prev].slice(0, 30);
      try {
        localStorage.setItem('clio7_test_results', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const clearTestResults = () => {
    setTestResults([]);
    try {
      localStorage.removeItem('clio7_test_results');
    } catch (e) {
      console.warn(e);
    }
  };

  // App Settings
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('clio7_settings');
      return saved ? { ...INITIAL_SETTINGS, ...JSON.parse(saved) } : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const updateAppSettings = (patch: Partial<AppSettings>) => {
    setAppSettings(prev => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem('clio7_settings', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  const resetAllData = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (e) {
      console.warn(e);
    }
  };

  return {
    theme,
    toggleTheme,
    favorites,
    toggleFavorite,
    isFavorite,
    history,
    addToHistory,
    clearHistory,
    knownCards,
    markCardKnown,
    readParagraphs,
    toggleReadParagraph,
    isParagraphRead,
    testResults,
    addTestResult,
    clearTestResults,
    appSettings,
    updateAppSettings,
    resetAllData
  };
}
