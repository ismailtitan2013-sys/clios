import React, { useState } from 'react';
import { Search, Star, Calendar, Flag, BookOpen, ArrowRight, Filter } from 'lucide-react';
import { HISTORICAL_DATES } from '../../data';
import { ItemType } from '../../types';

interface DatesViewProps {
  onSelectEntity: (id: string, type: ItemType) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export const DatesView: React.FC<DatesViewProps> = ({
  onSelectEntity,
  isFavorite,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCentury, setSelectedCentury] = useState<'all' | 'XV' | 'XVI' | 'XVII'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [onlyKeyDates, setOnlyKeyDates] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'sync_table'>('cards');

  // Filter logic
  const filteredDates = HISTORICAL_DATES.filter(d => {
    if (onlyKeyDates && !d.isKey) return false;
    if (selectedCentury !== 'all' && d.century !== selectedCentury) return false;
    if (selectedRegion !== 'all' && d.region !== selectedRegion) return false;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchYear = d.year.toLowerCase().includes(q);
      const matchTitle = d.eventTitle.toLowerCase().includes(q);
      const matchDesc = d.description.toLowerCase().includes(q);
      const matchRussia = d.russiaParallel && d.russiaParallel.event.toLowerCase().includes(q);
      return matchYear || matchTitle || matchDesc || matchRussia;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            Категория · Хронограф 7 класса
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100">
            Важнейшие даты истории Нового времени
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Синхронизированные даты всеобщей истории (конец XV — XVII в.) и параллели с историей России.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-2xl self-start sm:self-auto text-xs">
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              viewMode === 'cards'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-100'
            }`}
          >
            Карточки
          </button>
          <button
            onClick={() => setViewMode('sync_table')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              viewMode === 'sync_table'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-stone-400 hover:text-stone-100'
            }`}
          >
            Таблица «Мир vs Россия»
          </button>
        </div>
      </div>

      {/* Control bar: search, century tabs, key toggle */}
      <div className="p-4 sm:p-5 rounded-3xl bg-stone-900/80 backdrop-blur-md border border-stone-800 shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Поиск по году или названию события (1492, Вена, революция)..."
              className="w-full pl-9 pr-4 py-2.5 bg-stone-950 text-stone-100 placeholder-stone-500 text-sm rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* "Только самое важное" Toggle Button */}
          <button
            onClick={() => setOnlyKeyDates(!onlyKeyDates)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
              onlyKeyDates
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                : 'bg-stone-950 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${onlyKeyDates ? 'text-amber-400 fill-amber-400' : ''}`} />
            <span>Только ключевые даты</span>
          </button>
        </div>

        {/* Centuries filter */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-stone-500 text-[11px] font-mono mr-1">Века:</span>
          {(['all', 'XV', 'XVI', 'XVII'] as const).map(century => (
            <button
              key={century}
              onClick={() => setSelectedCentury(century)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedCentury === century
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {century === 'all' ? 'Все века' : `${century} век`}
            </button>
          ))}
          <span className="ml-auto text-stone-400 text-xs font-mono">
            Найдено дат: {filteredDates.length}
          </span>
        </div>
      </div>

      {/* Display Mode: Cards vs Sync Table */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDates.map(date => {
            const favorited = isFavorite(date.id);
            return (
              <div
                key={date.id}
                onClick={() => onSelectEntity(date.id, 'date')}
                className="group relative p-5 rounded-3xl border border-stone-800 bg-stone-900/80 backdrop-blur-md hover:border-amber-500/60 shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black font-serif text-amber-400 group-hover:text-amber-300 transition-colors">
                        {date.year} г.
                      </span>
                      {date.isKey && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Ключевая
                        </span>
                      )}
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onToggleFavorite(date.id);
                      }}
                      className="p-1 text-stone-400 hover:text-amber-400"
                    >
                      <Star className={`w-4 h-4 ${favorited ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  <h3 className="font-bold text-base text-stone-100 mb-2 leading-snug font-serif">
                    {date.eventTitle}
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed mb-4 line-clamp-3">
                    {date.description}
                  </p>

                  {/* Russia Parallel block */}
                  {date.russiaParallel && (
                    <div className="p-3 rounded-2xl bg-stone-950/70 border border-stone-800 text-xs mb-3 space-y-1">
                      <div className="font-bold text-sky-400 flex items-center gap-1 text-[11px]">
                        <span>🇷🇺 В это же время в России:</span>
                      </div>
                      <div className="text-stone-300">
                        <strong className="text-sky-300 font-mono">{date.russiaParallel.year} г.</strong> — {date.russiaParallel.event}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="font-mono">{date.century} в. · {date.region}</span>
                  <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                    <span>Подробнее</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Synchronistic Table */
        <div className="rounded-3xl border border-stone-800 bg-stone-900/80 backdrop-blur-md overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-950 border-b border-stone-800 text-amber-300 font-serif">
                  <th className="p-4 w-28">Год</th>
                  <th className="p-4">Событие Всеобщей истории</th>
                  <th className="p-4">Событие в истории России</th>
                  <th className="p-4 w-32">Регион</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-850">
                {filteredDates.map(d => (
                  <tr
                    key={d.id}
                    onClick={() => onSelectEntity(d.id, 'date')}
                    className="hover:bg-stone-850/60 cursor-pointer transition-colors"
                  >
                    <td className="p-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                      {d.year} г.
                    </td>
                    <td className="p-4 text-stone-100 font-medium">
                      <div className="font-bold font-serif mb-0.5">{d.eventTitle}</div>
                      <div className="text-[11px] text-stone-400 line-clamp-1">{d.description}</div>
                    </td>
                    <td className="p-4 text-sky-200">
                      {d.russiaParallel ? (
                        <div>
                          <span className="font-mono text-sky-400 font-semibold">{d.russiaParallel.year} г.</span> — {d.russiaParallel.event}
                        </div>
                      ) : (
                        <span className="text-stone-600">—</span>
                      )}
                    </td>
                    <td className="p-4 text-stone-400 font-mono whitespace-nowrap">
                      {d.region}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
