import React from 'react';
import { X, Star, BookOpen, Calendar, MapPin, Users, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  HISTORICAL_PERSONALITIES,
  HISTORICAL_DATES,
  HISTORICAL_EVENTS,
  TEXTBOOK_TERMS,
  TEXTBOOK_CHAPTERS
} from '../data';
import { ItemType } from '../types';

interface DetailModalProps {
  itemId: string | null;
  itemType?: ItemType;
  onClose: () => void;
  onSelectEntity: (id: string, type: ItemType) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  itemId,
  itemType,
  onClose,
  onSelectEntity,
  isFavorite,
  onToggleFavorite
}) => {
  if (!itemId) return null;

  // Find item across all collections
  const person = HISTORICAL_PERSONALITIES.find(p => p.id === itemId);
  const dateItem = HISTORICAL_DATES.find(d => d.id === itemId);
  const eventItem = HISTORICAL_EVENTS.find(e => e.id === itemId);
  const termItem = TEXTBOOK_TERMS.find(t => t.id === itemId);
  const paragraph = TEXTBOOK_CHAPTERS.find(p => p.id === itemId);

  const activeType: ItemType = itemType || (
    person ? 'personality' :
    dateItem ? 'date' :
    eventItem ? 'event' :
    termItem ? 'term' : 'paragraph'
  );

  const favorited = isFavorite(itemId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-stone-900 rounded-3xl border border-stone-800 shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-800 bg-stone-950/70">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="font-semibold uppercase tracking-wider text-amber-400 font-serif">
              {activeType === 'personality' && '👤 Историческая личность'}
              {activeType === 'date' && '📅 Историческая дата'}
              {activeType === 'event' && '⚔️ Историческое событие'}
              {activeType === 'term' && '📚 Понятие и термин'}
              {activeType === 'paragraph' && '📖 Параграф учебника'}
            </span>
            <span aria-hidden="true">·</span>
            <span>Учебник 7 класса</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleFavorite(itemId)}
              className={`p-2 rounded-lg transition-colors ${
                favorited
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100'
                  : 'text-stone-400 hover:text-amber-500 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={favorited ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <Star className={`w-5 h-5 ${favorited ? 'fill-amber-400 text-amber-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* PERSONALITY VIEW */}
          {person && activeType === 'personality' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-50">
                  {person.name}
                </h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-sm text-stone-500 dark:text-stone-400">
                  <span className="font-semibold text-stone-800 dark:text-stone-200">{person.years}</span>
                  <span aria-hidden="true">·</span>
                  <span>{person.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>{person.country}</span>
                </div>
              </div>

              {/* Known For summary */}
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                  Чем известен в истории
                </h4>
                <p className="text-stone-800 dark:text-stone-200 text-sm leading-relaxed">
                  {person.knownFor}
                </p>
              </div>

              {/* What to remember for test/lesson */}
              <div>
                <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-2.5 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Что важно помнить ученику 7 класса:</span>
                </h4>
                <ul className="space-y-2 text-sm text-stone-700 dark:text-stone-300">
                  {person.whatToRemember.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Dates & Links */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-stone-500 dark:text-stone-400 py-1">Ключевые даты:</span>
                  {person.keyDates.map((kd, idx) => (
                    <span key={idx} className="px-2 py-1 bg-stone-100 dark:bg-stone-800 rounded font-mono font-medium text-stone-700 dark:text-stone-300">
                      {kd}
                    </span>
                  ))}
                </div>
              </div>

              {/* Source in textbook */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-stone-100/70 dark:bg-stone-800/40 text-xs text-stone-600 dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Источник в учебнике: {person.paragraphRef}</span>
                </span>
                <span className="font-medium">стр. {person.pages}</span>
              </div>
            </div>
          )}

          {/* DATE VIEW */}
          {dateItem && activeType === 'date' && (
            <div className="space-y-5">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black font-display text-amber-600 dark:text-amber-400">
                  {dateItem.year}
                </span>
                {dateItem.exactDate && (
                  <span className="text-sm font-medium text-stone-500 dark:text-stone-400">
                    ({dateItem.exactDate})
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-stone-50">
                {dateItem.eventTitle}
              </h2>

              <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                <span>{dateItem.century} век</span>
                <span aria-hidden="true">·</span>
                <span>Регион: {dateItem.region}</span>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/80 dark:border-stone-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
                  Суть и значение события
                </h4>
                <p className="text-stone-800 dark:text-stone-200 text-sm leading-relaxed">
                  {dateItem.description}
                </p>
              </div>

              {/* Russian parallel */}
              {dateItem.russiaParallel && (
                <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 mb-1 flex items-center gap-1.5">
                    🇷🇺 А что происходило в России в это же время?
                  </h4>
                  <p className="text-stone-800 dark:text-stone-200 text-sm leading-relaxed">
                    <strong className="text-blue-900 dark:text-blue-200">{dateItem.russiaParallel.year}</strong> — {dateItem.russiaParallel.event}
                  </p>
                </div>
              )}

              {/* Source */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-stone-100/70 dark:bg-stone-800/40 text-xs text-stone-600 dark:text-stone-400">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>{dateItem.paragraphRef}</span>
                </span>
                <span>стр. {dateItem.pages}</span>
              </div>
            </div>
          )}

          {/* EVENT VIEW */}
          {eventItem && activeType === 'event' && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                  {eventItem.dateOrPeriod} · {eventItem.location}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-50">
                  {eventItem.title}
                </h2>
              </div>

              {/* Participants */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Кто участвовал:</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {eventItem.participants.map((pt, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-xs rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {pt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Causes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Почему произошло (причины):</span>
                </h4>
                <ul className="space-y-1.5 text-sm text-stone-700 dark:text-stone-300">
                  {eventItem.causes.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold shrink-0">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to remember */}
              <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
                  ⭐ Главные факты для запоминания:
                </h4>
                <ul className="space-y-1.5 text-sm text-stone-800 dark:text-stone-200">
                  {eventItem.whatToRemember.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  📌 Итог и исторические последствия:
                </h4>
                <p className="text-sm text-stone-800 dark:text-stone-200 font-medium">
                  {eventItem.outcome}
                </p>
              </div>

              {/* Source */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-stone-100/70 dark:bg-stone-800/40 text-xs text-stone-600 dark:text-stone-400">
                <span>{eventItem.paragraphRef}</span>
                <span>стр. {eventItem.pages}</span>
              </div>
            </div>
          )}

          {/* TERM VIEW */}
          {termItem && activeType === 'term' && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                  {termItem.category}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-50">
                  {termItem.term}
                </h2>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1.5">
                  Определение в учебнике
                </h4>
                <p className="text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-relaxed font-serif">
                  «{termItem.definition}»
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                  Где и как встречается в истории
                </h4>
                <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {termItem.textbookContext}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-stone-100/70 dark:bg-stone-800/40 text-xs text-stone-600 dark:text-stone-400">
                <span>{termItem.paragraphRef}</span>
                <span>стр. {termItem.pages}</span>
              </div>
            </div>
          )}

          {/* PARAGRAPH VIEW */}
          {paragraph && activeType === 'paragraph' && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                  {paragraph.chapterTitle} · стр. {paragraph.pages}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-50">
                  {typeof paragraph.number === 'number' ? `§ ${paragraph.number}. ` : ''}{paragraph.title}
                </h2>
              </div>

              {/* Main lesson question */}
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  <span>Главный вопрос урока (из учебника):</span>
                </h4>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {paragraph.mainQuestion}
                </p>
              </div>

              {/* Key concepts and persons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
                  <span className="font-bold text-stone-700 dark:text-stone-300 block mb-1.5">Основные понятия:</span>
                  <div className="flex flex-wrap gap-1">
                    {paragraph.keyConcepts.map((kc, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white dark:bg-stone-700 rounded border border-stone-200 dark:border-stone-600 text-stone-800 dark:text-stone-200">
                        {kc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-800">
                  <span className="font-bold text-stone-700 dark:text-stone-300 block mb-1.5">Исторические личности:</span>
                  <div className="flex flex-wrap gap-1">
                    {paragraph.keyPersonalities.map((kp, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white dark:bg-stone-700 rounded border border-stone-200 dark:border-stone-600 text-stone-800 dark:text-stone-200">
                        {kp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary bullets */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Краткая выжимка для ответа на уроке:
                </h4>
                <ul className="space-y-1.5 text-sm text-stone-700 dark:text-stone-300">
                  {paragraph.summaryPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Подведём итоги */}
              <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                  Подведём итоги (из учебника)
                </h4>
                <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 italic font-serif">
                  «{paragraph.takeaways}»
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-3 border-t border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/70 flex flex-col gap-2.5 text-xs">
          <div className="flex items-center justify-between pt-1 border-t border-stone-200/50 dark:border-stone-800">
            <span className="text-stone-400 text-[11px] hidden sm:inline">
              Учебник В. Р. Мединского и А. О. Чубарьяна (2026 г.)
            </span>
            <button
              onClick={onClose}
              className="ml-auto px-4 py-1.5 font-medium rounded-lg bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors"
            >
              Закрыть карточку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
