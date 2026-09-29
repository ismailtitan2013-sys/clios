import React, { useState } from 'react';
import { Search, Star, Users, CheckCircle2, BookOpen, ArrowRight, UserCheck, Sparkles } from 'lucide-react';
import { HISTORICAL_PERSONALITIES } from '../../data';
import { ItemType } from '../../types';

interface PersonalitiesViewProps {
  onSelectEntity: (id: string, type: ItemType) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export const PersonalitiesView: React.FC<PersonalitiesViewProps> = ({
  onSelectEntity,
  isFavorite,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [whoIsMode, setWhoIsMode] = useState(false);

  const categories = [
    { id: 'all', label: 'Все личности' },
    { id: 'ruler', label: '👑 Правители' },
    { id: 'explorer', label: '🧭 Первооткрыватели' },
    { id: 'commander', label: '⚔️ Полководцы' },
    { id: 'reformer', label: '⛪ Реформаторы' },
    { id: 'scientist', label: '🔬 Учёные' },
    { id: 'culture', label: '🎨 Культура и искусство' }
  ];

  const filteredPersons = HISTORICAL_PERSONALITIES.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase().replace(/^(кто такой|кто такая|кто такой был)\s+/i, '').trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchRole = p.role.toLowerCase().includes(q);
      const matchCountry = p.country.toLowerCase().includes(q);
      const matchKnown = p.knownFor.toLowerCase().includes(q);
      return matchName || matchRole || matchCountry || matchKnown;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            Категория · Галерея деятелей
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100">
            Исторические личности Нового времени
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Правители, мореплаватели, реформаторы, полководцы, мыслители и художники XV—XVII веков.
          </p>
        </div>

        {/* «Кто это?» Quick toggle button */}
        <button
          onClick={() => setWhoIsMode(!whoIsMode)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer ${
            whoIsMode
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-stone-900 border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-850'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Режим «Кто это?»</span>
        </button>
      </div>

      {/* Search & Categories Filter */}
      <div className="p-4 sm:p-5 rounded-3xl bg-stone-900/80 backdrop-blur-md border border-stone-800 shadow-lg space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={whoIsMode ? 'Спросите: «Кто такой Колумб?» или «Кто такой Лютер?»...' : 'Поиск по имени, роли или стране (Людовик, Ришельё, Шекспир)...'}
            className="w-full pl-9 pr-4 py-2.5 bg-stone-950 text-stone-100 placeholder-stone-500 text-sm rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white font-semibold shadow-md shadow-amber-600/20'
                  : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-stone-400 text-xs font-mono">
            Найдено: {filteredPersons.length}
          </span>
        </div>
      </div>

      {/* «Кто это?» Express Quick Answer Banner if active */}
      {whoIsMode && filteredPersons.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs sm:text-sm text-amber-200">
          💡 <strong>Быстрый экспресс-ответ:</strong> нажимайте на карточку любой личности, чтобы мгновенно увидеть формулу ответа: «Кто это», «Почему важен» и «Что запомнить для контрольной»!
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPersons.map(person => {
          const favorited = isFavorite(person.id);
          return (
            <div
              key={person.id}
              onClick={() => onSelectEntity(person.id, 'personality')}
              className="group relative p-5 rounded-3xl border border-stone-800 bg-stone-900/80 backdrop-blur-md hover:border-amber-500/60 shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Header: Name, years, bookmark */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-serif font-black flex items-center justify-center text-sm shadow-inner group-hover:scale-105 transition-transform">
                      {person.name.slice(0, 1)}
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-serif text-stone-100 group-hover:text-amber-300 transition-colors">
                        {person.name}
                      </h3>
                      <div className="text-xs font-mono font-medium text-amber-400">
                        {person.years}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onToggleFavorite(person.id);
                    }}
                    className="p-1.5 text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${favorited ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                {/* Subtitle / Role */}
                <div className="flex items-center gap-1.5 text-xs text-stone-400 mb-3">
                  <span className="font-medium text-stone-300">{person.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>{person.country}</span>
                </div>

                {/* Known for */}
                <div className="p-3 rounded-2xl bg-stone-950/60 border border-stone-850 text-xs text-stone-300 leading-relaxed mb-3">
                  <strong className="text-amber-300 block mb-0.5 font-serif">Кто это и чем известен:</strong>
                  {person.knownFor}
                </div>

                {/* Primary takeaway point */}
                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block font-serif">
                    Что запомнить:
                  </span>
                  <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                    {person.whatToRemember[0]}
                  </p>
                </div>
              </div>

              {/* Card Footer: Source & Link */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                <span className="font-mono text-stone-400">{person.paragraphRef}</span>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  <span>Шпаргалка</span>
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
