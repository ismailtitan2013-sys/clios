export type ItemType = 'personality' | 'date' | 'event' | 'term' | 'paragraph';

export interface Personality {
  id: string;
  name: string;
  years: string;
  role: string;
  category: 'ruler' | 'commander' | 'explorer' | 'scientist' | 'culture' | 'reformer';
  categoryLabel: string;
  country: string;
  knownFor: string;
  whatToRemember: string[];
  keyDates: string[];
  relatedEvents: string[];
  relatedPersons?: string[];
  paragraphRef: string;
  pages: string;
  quote?: string;
  image?: string;
}

export interface HistoricalDate {
  id: string;
  year: string;
  exactDate?: string;
  century: 'XV' | 'XVI' | 'XVII';
  eventTitle: string;
  description: string;
  region: 'Европа' | 'Азия' | 'Америка' | 'Африка' | 'Россия';
  isKey: boolean; // "Только самое важное"
  russiaParallel?: {
    year: string;
    event: string;
  };
  relatedPersons: string[];
  paragraphRef: string;
  pages: string;
}

export interface HistoricalEvent {
  id: string;
  title: string;
  dateOrPeriod: string;
  century: 'XV' | 'XVI' | 'XVII';
  location: string;
  region: string;
  participants: string[];
  causes: string[];
  whatToRemember: string[];
  outcome: string;
  isCrucial: boolean;
  paragraphRef: string;
  pages: string;
  relatedPersons: string[];
}

export interface TermItem {
  id: string;
  term: string;
  definition: string;
  category: string;
  textbookContext: string;
  relatedTopics: string[];
  paragraphRef: string;
  pages: string;
  sourceTag?: 'textbook' | 'extended_curriculum';
}

export interface ParagraphData {
  id: string;
  number: number | string; // 1 to 23, or 'intro', 'conclusion'
  chapterNumber: number | string; // 1, 2, 3 or 'intro'
  chapterTitle: string;
  title: string;
  pages: string;
  mainQuestion: string;
  keyConcepts: string[];
  keyPersonalities: string[];
  worldRussiaTable?: {
    world: { year: string; event: string }[];
    russia: { year: string; event: string }[];
  };
  summaryPoints: string[];
  takeaways: string; // "Подведём итоги"
}

export interface QuickReviewTopic {
  id: string;
  title: string;
  chapterNumber?: number;
  paragraphs: string;
  summary: string;
  keyDates: string[];
  keyFigures: string[];
  keyTerms: string[];
  causesAndEffects: { cause: string; effect: string }[];
}

export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  paragraphRef: string;
  category: string;
}

export interface TestResult {
  id: string;
  timestamp: number;
  topicTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  wrongQuestionIds: string[];
}

export interface AppSettings {
  theme: 'light' | 'dark';
  fontSize: 'normal' | 'large';
  enableSound: boolean;
  reducedMotion: boolean;
}

export interface Flashcard {
  id: string;
  mode: 'date_to_event' | 'event_to_date' | 'person_to_fact' | 'term_to_def';
  question: string;
  answer: string;
  hint?: string;
  paragraphRef: string;
  pages: string;
  category: string;
}

export interface UserHistoryItem {
  id: string;
  type: ItemType;
  title: string;
  subtitle: string;
  timestamp: number;
}
