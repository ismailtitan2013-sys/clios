import React, { useState } from 'react';
import { Clock, Calendar, ArrowRight, Flag, Compass, Flame, BookOpen, Sparkles } from 'lucide-react';
import { HISTORICAL_DATES } from '../../data';
import { ItemType } from '../../types';

interface TimelineViewProps {
  onSelectEntity: (id: string, type: ItemType) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onSelectEntity }) => {
  const [selectedCentury, setSelectedCentury] = useState<'all' | 'XV' | 'XVI' | 'XVII'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sort dates chronologically
  const sortedDates = [...HISTORICAL_DATES].sort((a, b) => {
    const yearA = parseInt(a.year.split('—')[0].replace(/\D/g, '')) || 0;
    const yearB = parseInt(b.year.split('—')[0].replace(/\D/g, '')) || 0;
    return yearA - yearB;
  });

  const filteredTimeline = sortedDates.filter(d => {
    if (selectedCentury !== 'all' && d.century !== selectedCentury) return false;
    if (selectedCategory !== 'all' && d.region !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
            Интерактивная лента времени
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-stone-50">
            Хронологическая лента Нового времени
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
            Путешествие по событиям рубежа Средневековья и Нового времени: от падения Константинополя и плаваний Колумба до Славной революции.
          </p>
        </div>

        {/* Quick Century Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800 rounded-xl self-start sm:self-auto text-xs">
          {(['all', 'XV', 'XVI', 'XVII'] as const).map(c => (
            <button
              key={c}
              onClick={() => setSelectedCentury(c)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCentury === c
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              {c === 'all' ? 'Вся эпоха' : `${c} век`}
            </button>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs">
        <span className="text-stone-400 font-medium">Фильтр региона:</span>
        {['all', 'Европа', 'Азия', 'Америка', 'Африка', 'Россия'].map(r => (
          <button
            key={r}
            onClick={() => setSelectedCategory(r)}
            className={`px-3 py-1 rounded-lg transition-colors ${
              selectedCategory === r
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            {r === 'all' ? 'Все' : r}
          </button>
        ))}
      </div>

      {/* Visual Timeline Path */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-300 dark:border-amber-800/60 space-y-8 ml-3 sm:ml-6">
        {filteredTimeline.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onSelectEntity(item.id, 'date')}
            className="group relative cursor-pointer"
          >
            {/* Timeline node dot */}
            <div className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
              item.isKey
                ? 'bg-amber-500 border-white dark:border-stone-900 ring-4 ring-amber-400/20'
                : 'bg-stone-300 dark:bg-stone-700 border-white dark:border-stone-900'
            }`} />

            {/* Event Box */}
            <div className="p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 group-hover:border-amber-400 dark:group-hover:border-amber-600 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="text-xl sm:text-2xl font-black font-display text-amber-600 dark:text-amber-400">
                  {item.year} г.
                </span>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {item.century} век · {item.region}
                </span>
                {item.isKey && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded-full">
                    Ключевая дата
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1.5">
                {item.eventTitle}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-3">
                {item.description}
              </p>

              {/* Parallel in Russia */}
              {item.russiaParallel && (
                <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 text-xs text-stone-700 dark:text-stone-300 mb-2">
                  <span className="font-semibold text-blue-900 dark:text-blue-300 block mb-0.5">
                    🇷🇺 В России: {item.russiaParallel.year}
                  </span>
                  <span>{item.russiaParallel.event}</span>
                </div>
              )}

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                <span>{item.paragraphRef} · стр. {item.pages}</span>
                <span className="text-amber-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-medium">
                  <span>Шпаргалка</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
