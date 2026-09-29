import React, { useState } from 'react';
import { Search, Star, Bookmark, Tag, ArrowRight, Check } from 'lucide-react';
import { TEXTBOOK_TERMS } from '../../data';
import { ItemType } from '../../types';

interface TermsViewProps {
  onSelectEntity: (id: string, type: ItemType) => void;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (id: string) => void;
}

export const TermsView: React.FC<TermsViewProps> = ({
  onSelectEntity,
  isFavorite,
  onToggleFavorite
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Все понятия' },
    { id: 'Экономика', label: '💰 Экономика и торговля' },
    { id: 'Политика', label: '👑 Государство и власть' },
    { id: 'Религия', label: '⛪ Религия и церковь' },
    { id: 'Военное дело', label: '⚔️ Военное дело' },
    { id: 'Культура', label: '🎨 Культура и наука' }
  ];

  const filteredTerms = TEXTBOOK_TERMS.filter(t => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTerm = t.term.toLowerCase().includes(q);
      const matchDef = t.definition.toLowerCase().includes(q);
      return matchTerm || matchDef;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Title */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          Справочник терминов
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100">
          Словарь исторических понятий 7 класса
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Точные формулировки и определения из учебника В. Р. Мединского и А. О. Чубарьяна.
        </p>
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
            placeholder="Поиск термина или понятия (мануфактура, абсолютизм, реформация)..."
            className="w-full pl-9 pr-4 py-2.5 bg-stone-950 text-stone-100 placeholder-stone-500 text-sm rounded-xl border border-stone-800 focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-600/20'
                  : 'bg-stone-950 border border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="ml-auto text-stone-400 text-xs font-mono">
            Терминов: {filteredTerms.length}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTerms.map(term => {
          const favorited = isFavorite(term.id);
          return (
            <div
              key={term.id}
              onClick={() => onSelectEntity(term.id, 'term')}
              className="group relative p-5 rounded-3xl border border-stone-800 bg-stone-900/80 backdrop-blur-md hover:border-amber-500/60 shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold font-serif text-stone-100 group-hover:text-amber-300 transition-colors">
                    {term.term}
                  </h3>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onToggleFavorite(term.id);
                    }}
                    className="p-1 text-stone-400 hover:text-amber-400"
                  >
                    <Star className={`w-4 h-4 ${favorited ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full bg-stone-950 text-amber-400/90 border border-stone-850 text-[10px] font-mono mb-3">
                  {term.category}
                </div>

                <p className="text-xs text-stone-300 leading-relaxed mb-4">
                  {term.definition}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                <span className="font-mono">{term.paragraphRef}</span>
                <span className="text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold">
                  <span>Справка</span>
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
