import { TEXTBOOK_CHAPTERS } from './chapters';
import { HISTORICAL_PERSONALITIES } from './personalities';
import { HISTORICAL_DATES } from './dates';
import { HISTORICAL_EVENTS } from './events';
import { TEXTBOOK_TERMS } from './terms';
import { QUICK_REVIEW_TOPICS } from './quickReview';
import { FLASHCARDS_DATA } from './flashcards';

export {
  TEXTBOOK_CHAPTERS,
  HISTORICAL_PERSONALITIES,
  HISTORICAL_DATES,
  HISTORICAL_EVENTS,
  TEXTBOOK_TERMS,
  QUICK_REVIEW_TOPICS,
  FLASHCARDS_DATA
};

export interface SearchResultItem {
  id: string;
  type: 'personality' | 'date' | 'event' | 'term' | 'paragraph';
  typeLabel: string;
  title: string;
  subtitle: string;
  snippet: string;
  paragraphRef: string;
  pages: string;
  sourceText?: string;
  isHomeworkQuery?: boolean;
}

// Check if student is asking for a homework solution
export function detectHomeworkQuery(query: string): boolean {
  const q = query.toLowerCase();
  const homeworkKeywords = [
    'ответь на вопросы',
    'вопрос 1',
    'вопрос 2',
    'домашнее задание',
    'сделай дз',
    'решебник',
    'гдз',
    'сочинение на тему',
    'готовый ответ',
    'вопросы к параграфу'
  ];
  return homeworkKeywords.some(kw => q.includes(kw));
}

// Unified multi-entity search helper
export function performSmartSearch(rawQuery: string): {
  results: SearchResultItem[];
  isHomework: boolean;
  cleanQuery: string;
} {
  const cleanQuery = rawQuery.trim().toLowerCase();
  if (!cleanQuery) {
    return { results: [], isHomework: false, cleanQuery: '' };
  }

  const isHomework = detectHomeworkQuery(cleanQuery);

  // Normalize query removing typical prefix questions: "кто такой", "что такое", "что произошло в"
  const normalized = cleanQuery
    .replace(/^кто (такой|такая|такие)\s+/i, '')
    .replace(/^что такое\s+/i, '')
    .replace(/^что произошло в\s+/i, '')
    .replace(/^битва при\s+/i, '')
    .replace(/^битва под\s+/i, '')
    .replace(/^когда было\s+/i, '')
    .trim();

  const searchTokens = (normalized || cleanQuery).split(/\s+/).filter(Boolean);

  const matchesText = (text: string): boolean => {
    const lower = text.toLowerCase();
    return searchTokens.every(token => lower.includes(token));
  };

  const results: SearchResultItem[] = [];

  // 1. Personalities
  HISTORICAL_PERSONALITIES.forEach(p => {
    if (
      matchesText(p.name) ||
      matchesText(p.knownFor) ||
      p.whatToRemember.some(w => matchesText(w)) ||
      matchesText(p.role) ||
      matchesText(p.country)
    ) {
      results.push({
        id: p.id,
        type: 'personality',
        typeLabel: '👤 Историческая личность',
        title: p.name,
        subtitle: `${p.years} · ${p.role}`,
        snippet: p.knownFor,
        paragraphRef: p.paragraphRef,
        pages: p.pages
      });
    }
  });

  // 2. Dates
  HISTORICAL_DATES.forEach(d => {
    if (
      matchesText(d.year) ||
      matchesText(d.eventTitle) ||
      matchesText(d.description) ||
      (d.russiaParallel && matchesText(d.russiaParallel.event))
    ) {
      results.push({
        id: d.id,
        type: 'date',
        typeLabel: '📅 Историческая дата',
        title: `${d.year} г. — ${d.eventTitle}`,
        subtitle: `${d.century} век · ${d.region}`,
        snippet: d.description,
        paragraphRef: d.paragraphRef,
        pages: d.pages
      });
    }
  });

  // 3. Events
  HISTORICAL_EVENTS.forEach(ev => {
    if (
      matchesText(ev.title) ||
      matchesText(ev.location) ||
      matchesText(ev.outcome) ||
      ev.participants.some(pt => matchesText(pt)) ||
      ev.causes.some(c => matchesText(c))
    ) {
      results.push({
        id: ev.id,
        type: 'event',
        typeLabel: '⚔️ Историческое событие',
        title: ev.title,
        subtitle: `${ev.dateOrPeriod} · ${ev.location}`,
        snippet: ev.outcome,
        paragraphRef: ev.paragraphRef,
        pages: ev.pages
      });
    }
  });

  // 4. Terms
  TEXTBOOK_TERMS.forEach(t => {
    if (
      matchesText(t.term) ||
      matchesText(t.definition) ||
      matchesText(t.textbookContext)
    ) {
      results.push({
        id: t.id,
        type: 'term',
        typeLabel: '📚 Исторический термин',
        title: t.term,
        subtitle: t.category,
        snippet: t.definition,
        paragraphRef: t.paragraphRef,
        pages: t.pages
      });
    }
  });

  // 5. Paragraphs
  TEXTBOOK_CHAPTERS.forEach(ch => {
    const titleWithNum = typeof ch.number === 'number' ? `§ ${ch.number}. ${ch.title}` : `${ch.number}. ${ch.title}`;
    if (
      matchesText(titleWithNum) ||
      matchesText(ch.mainQuestion) ||
      ch.keyConcepts.some(kc => matchesText(kc)) ||
      ch.keyPersonalities.some(kp => matchesText(kp))
    ) {
      results.push({
        id: ch.id,
        type: 'paragraph',
        typeLabel: '📖 Параграф учебника',
        title: titleWithNum,
        subtitle: `${ch.chapterTitle} · стр. ${ch.pages}`,
        snippet: ch.mainQuestion,
        paragraphRef: titleWithNum,
        pages: ch.pages
      });
    }
  });

  return { results, isHomework, cleanQuery };
}
