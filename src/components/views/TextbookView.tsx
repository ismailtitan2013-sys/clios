import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  Users,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Sparkles,
  ArrowRight,
  Search,
  Check,
  Crown,
  Lock,
  Share2
} from 'lucide-react';
import { TEXTBOOK_CHAPTERS, HISTORICAL_PERSONALITIES, HISTORICAL_DATES, TEXTBOOK_TERMS } from '../../data';
import { ItemType, ParagraphData } from '../../types';
import { getParagraphImage } from '../../assets/images';

interface TextbookViewProps {
  onSelectEntity: (id: string, type: ItemType) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
  isParagraphRead: (id: string) => boolean;
  onToggleRead: (id: string) => void;
  initialParagraphId?: string;
}

export const TextbookView: React.FC<TextbookViewProps> = ({
  onSelectEntity,
  isFavorite,
  onToggleFavorite,
  isParagraphRead,
  onToggleRead,
  initialParagraphId
}) => {
  const [selectedParagraphId, setSelectedParagraphId] = useState<string>(
    initialParagraphId || TEXTBOOK_CHAPTERS[1]?.id || 'p1'
  );
  const [searchQuery, setSearchQuery] = useState('');

  const activeIndex = TEXTBOOK_CHAPTERS.findIndex(p => p.id === selectedParagraphId);
  const activeParagraph: ParagraphData = TEXTBOOK_CHAPTERS[activeIndex] || TEXTBOOK_CHAPTERS[0];

  const prevParagraph = activeIndex > 0 ? TEXTBOOK_CHAPTERS[activeIndex - 1] : null;
  const nextParagraph = activeIndex < TEXTBOOK_CHAPTERS.length - 1 ? TEXTBOOK_CHAPTERS[activeIndex + 1] : null;

  const isRead = isParagraphRead(activeParagraph.id);
  const isSaved = isFavorite(activeParagraph.id);

  // Filtered chapters for table of contents
  const filteredChapters = TEXTBOOK_CHAPTERS.filter(ch =>
    ch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ch.chapterTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(ch.number).includes(searchQuery)
  );

  // Group chapters by chapterTitle
  const chaptersGrouped: { [chapter: string]: ParagraphData[] } = {};
  filteredChapters.forEach(p => {
    if (!chaptersGrouped[p.chapterTitle]) {
      chaptersGrouped[p.chapterTitle] = [];
    }
    chaptersGrouped[p.chapterTitle].push(p);
  });

  const paragraphImage = getParagraphImage(activeParagraph.id);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Учебник Всеобщей истории (конец XV — XVII в.)
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-100">
            Все параграфы курса (§ 1–23)
          </h1>
        </div>
      </div>

      {/* Main Grid: Left Table of Contents, Right Reading Surface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation: Table of Contents */}
        <aside className="lg:col-span-4 p-4 rounded-3xl border border-stone-800 bg-stone-900/80 backdrop-blur-md shadow-lg space-y-4 max-h-[82vh] overflow-y-auto">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск параграфа..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Grouped list */}
          <div className="space-y-4">
            {Object.entries(chaptersGrouped).map(([chapterTitle, paragraphs]) => (
              <div key={chapterTitle} className="space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80 px-2 py-1">
                  {chapterTitle}
                </div>
                {paragraphs.map(p => {
                  const isSelected = p.id === selectedParagraphId;
                  const itemRead = isParagraphRead(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedParagraphId(p.id)}
                      className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between text-xs group cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium shadow-md shadow-amber-600/20'
                          : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="text-[10px] opacity-75 block font-mono">
                          {typeof p.number === 'number' ? `§ ${p.number}` : p.number} · стр. {p.pages}
                        </span>
                        <span className="font-serif truncate block font-medium">
                          {p.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {itemRead && (
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-40 group-hover:opacity-100'}`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* Right Content: Paragraph Article */}
        <article className="lg:col-span-8 rounded-3xl border border-stone-800 bg-stone-900/85 backdrop-blur-md shadow-2xl overflow-hidden space-y-7">
          {/* Visual Article Hero with Historical Artwork */}
          <div className="relative h-64 sm:h-72 overflow-hidden flex flex-col justify-end p-6 sm:p-8">
            <img
              src={paragraphImage}
              alt={activeParagraph.title}
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-60 contrast-110"
            />
            {/* Dark Gradients for perfect text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-transparent" />

            <div className="relative z-10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-stone-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                  {activeParagraph.chapterTitle} · стр. {activeParagraph.pages}
                </span>

                {/* Read & Bookmark Toggles */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleRead(activeParagraph.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all backdrop-blur-md border cursor-pointer ${
                      isRead
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60 shadow-md'
                        : 'bg-stone-950/80 text-stone-300 border-stone-700 hover:border-emerald-500'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isRead ? 'Изучено' : 'Отметить'}</span>
                  </button>

                  <button
                    onClick={() => onToggleFavorite(activeParagraph.id)}
                    className={`p-2 rounded-xl text-xs transition-all backdrop-blur-md border cursor-pointer ${
                      isSaved
                        ? 'bg-amber-950/80 text-amber-300 border-amber-500/60 shadow-md'
                        : 'bg-stone-950/80 text-stone-300 border-stone-700 hover:border-amber-500'
                    }`}
                    title={isSaved ? 'В закладках' : 'Сохранить'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-amber-400' : ''}`} />
                  </button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black font-serif text-stone-50 leading-tight text-shadow-md">
                {typeof activeParagraph.number === 'number' ? `§ ${activeParagraph.number}. ` : ''}{activeParagraph.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 pt-0 space-y-7">
            {/* 1. Main Question of the Lesson */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900/60 to-amber-950/30 border border-amber-500/30 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>Главный вопрос урока (?) из учебника:</span>
              </div>
              <p className="text-base sm:text-lg font-serif text-stone-100 leading-relaxed font-medium">
                «{activeParagraph.mainQuestion}»
              </p>
            </div>

            {/* 2. Structured Summary Points */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-200 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>Ключевое содержание параграфа:</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-200 leading-relaxed">
                {activeParagraph.summaryPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-stone-950/40 border border-stone-850 hover:border-stone-700 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-2 shadow-xs" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Linked Entities: Personalities and Terms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              {/* Linked Key Figures */}
              <div className="p-4 rounded-2xl bg-stone-950/50 border border-stone-800 space-y-2.5">
                <div className="font-bold text-stone-200 flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>Исторические личности параграфа:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeParagraph.keyPersonalities.map((name, i) => {
                    const match = HISTORICAL_PERSONALITIES.find(p => p.name.toLowerCase().includes(name.toLowerCase()));
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (match) onSelectEntity(match.id, 'personality');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-200 hover:text-amber-300 text-xs font-medium transition-all cursor-pointer"
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Linked Terms */}
              <div className="p-4 rounded-2xl bg-stone-950/50 border border-stone-800 space-y-2.5">
                <div className="font-bold text-stone-200 flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span>Основные понятия и термины:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeParagraph.keyConcepts.map((term, i) => {
                    const match = TEXTBOOK_TERMS.find(t => t.term.toLowerCase() === term.toLowerCase());
                    return (
                      <button
                        key={i}
                        onClick={() => {
                          if (match) onSelectEntity(match.id, 'term');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-700 hover:border-amber-400 text-stone-200 hover:text-amber-300 text-xs font-medium transition-all cursor-pointer"
                      >
                        {term}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 4. Synchronistic Table (World vs Russia) if present */}
            {activeParagraph.worldRussiaTable && (
              <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-3 text-xs">
                <h4 className="font-bold uppercase tracking-wider text-stone-200 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Синхронизация событий: Мир и Россия</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="font-bold text-amber-400 block">🌍 События в мире:</span>
                    <ul className="space-y-1.5 text-stone-300">
                      {activeParagraph.worldRussiaTable.world.map((w, idx) => (
                        <li key={idx} className="p-2 rounded-xl bg-stone-900/80 border border-stone-800">
                          <strong className="text-amber-300 font-mono">{w.year}</strong> — {w.event}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <span className="font-bold text-sky-400 block">🇷🇺 События в России:</span>
                    <ul className="space-y-1.5 text-stone-300">
                      {activeParagraph.worldRussiaTable.russia.map((r, idx) => (
                        <li key={idx} className="p-2 rounded-xl bg-stone-900/80 border border-stone-800">
                          <strong className="text-sky-300 font-mono">{r.year}</strong> — {r.event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Takeaways ("Подведём итоги") */}
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs sm:text-sm">
              <span className="font-bold uppercase tracking-wider text-amber-300 block mb-1 font-serif">
                Подведём итоги (из учебника Мединского и Чубарьяна):
              </span>
              <p className="italic font-serif text-stone-200 leading-relaxed">
                «{activeParagraph.takeaways}»
              </p>
            </div>

            {/* Bottom Next/Previous Paragraph Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-800 text-xs">
              {prevParagraph ? (
                <button
                  onClick={() => setSelectedParagraphId(prevParagraph.id)}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-amber-400" />
                  <span>Предыдущий ({typeof prevParagraph.number === 'number' ? `§ ${prevParagraph.number}` : prevParagraph.number})</span>
                </button>
              ) : <div />}

              {nextParagraph && (
                <button
                  onClick={() => setSelectedParagraphId(nextParagraph.id)}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-850 border border-stone-800 text-stone-300 flex items-center gap-2 transition-colors cursor-pointer ml-auto"
                >
                  <span>Следующий ({typeof nextParagraph.number === 'number' ? `§ ${nextParagraph.number}` : nextParagraph.number})</span>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </button>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
