import React, { useState } from 'react';
import { Search, Star, Flame, MapPin, Users, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { HISTORICAL_EVENTS } from '../../data';
import { ItemType } from '../../types';

interface EventsViewProps {
  onSelectEntity: (id: string, type: ItemType) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  onSelectEntity,
  isFavorite,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCentury, setSelectedCentury] = useState<'all' | 'XV' | 'XVI' | 'XVII'>('all');

  const filteredEvents = HISTORICAL_EVENTS.filter(e => {
    if (selectedCentury !== 'all' && e.century !== selectedCentury) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = e.title.toLowerCase().includes(q);
      const matchLoc = e.location.toLowerCase().includes(q);
      const matchPart = e.participants.some(p => p.toLowerCase().includes(q));
      const matchOutcome = e.outcome.toLowerCase().includes(q);
      return matchTitle || matchLoc || matchPart || matchOutcome;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Title & Description */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
          Режим «Что произошло?» · События
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-stone-50">
          Ключевые события и битвы Нового времени
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Четкая структура для ответа: Когда, Где, Кто участвовал, Причины, Что запомнить и Итог.
        </p>
      </div>

      {/* Search and filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Поиск по событиям (Северная война, Павия, Варфоломеевская ночь, Вена)..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 dark:bg-stone-800/60 text-stone-900 dark:text-stone-100 placeholder-stone-400 text-sm rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-400 font-medium">Век:</span>
          {(['all', 'XV', 'XVI', 'XVII'] as const).map(c => (
            <button
              key={c}
              onClick={() => setSelectedCentury(c)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedCentury === c
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200'
              }`}
            >
              {c === 'all' ? 'Все века' : `${c} век`}
            </button>
          ))}
          <span className="ml-auto text-stone-400 font-mono">Найдено: {filteredEvents.length}</span>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredEvents.map(event => {
          const favorited = isFavorite(event.id);
          return (
            <div
              key={event.id}
              onClick={() => onSelectEntity(event.id, 'event')}
              className="group p-5 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-sm hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-mono">
                      📅 {event.dateOrPeriod} · {event.century} в.
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-stone-900 dark:text-stone-50 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mt-0.5">
                      {event.title}
                    </h3>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onToggleFavorite(event.id);
                    }}
                    className="p-1 text-stone-400 hover:text-amber-500 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${favorited ? 'fill-amber-400 text-amber-500' : ''}`} />
                  </button>
                </div>

                {/* Where & Who */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate"><strong>Где:</strong> {event.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-400">
                    <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate"><strong>Кто:</strong> {event.participants.slice(0, 2).join(', ')}</span>
                  </div>
                </div>

                {/* Why it happened */}
                <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/40 text-xs text-stone-700 dark:text-stone-300 space-y-1">
                  <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                    <HelpCircle className="w-3 h-3 text-amber-600" />
                    <span>Почему произошло (причина):</span>
                  </span>
                  <p className="line-clamp-2">{event.causes[0]}</p>
                </div>

                {/* Outcome */}
                <div className="text-xs text-stone-700 dark:text-stone-300">
                  <strong className="text-stone-900 dark:text-stone-100">📌 Главный итог: </strong>
                  <span>{event.outcome}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400">
                <span>{event.paragraphRef}</span>
                <span className="text-amber-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-medium">
                  <span>Вся карточка события</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
