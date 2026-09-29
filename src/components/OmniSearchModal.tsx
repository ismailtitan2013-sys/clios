import React, { useState, useEffect, useRef } from 'react';
import { Search, X, AlertCircle, ArrowRight, BookOpen, Calendar, Users, Bookmark } from 'lucide-react';
import { performSmartSearch, SearchResultItem } from '../data';
import { ItemType } from '../types';

interface OmniSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntity: (id: string, type: ItemType) => void;
}

export const OmniSearchModal: React.FC<OmniSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectEntity,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveFilter('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { results, isHomework } = performSmartSearch(query);

  const filteredResults = activeFilter === 'all'
    ? results
    : results.filter(r => r.type === activeFilter);

  const quickPicks = [
    'Христофор Колумб',
    '1492',
    'Мартин Лютер',
    'Абсолютизм',
    'Тридцатилетняя война',
    'Тадж-Махал',
    'Оливер Кромвель',
    'Самоизоляция Японии'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-4 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-stone-900 rounded-3xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-stone-800 bg-stone-950/60">
          <Search className="w-5 h-5 text-amber-400 shrink-0 ml-1 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Что найти? (например: Колумб, 1492, Абсолютизм, § 2)..."
            className="w-full bg-transparent text-stone-100 placeholder-stone-500 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-200 rounded-md mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 text-stone-400 hover:text-stone-200 bg-stone-950 border border-stone-800 rounded-lg font-mono"
          >
            ESC
          </button>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-stone-800 bg-stone-950/40 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Всё' },
            { id: 'personality', label: '👤 Личности' },
            { id: 'date', label: '📅 Даты' },
            { id: 'event', label: '⚔️ События' },
            { id: 'term', label: '📚 Термины' },
            { id: 'paragraph', label: '📖 Параграфы' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-amber-600 text-white font-bold shadow-sm'
                  : 'text-stone-400 hover:bg-stone-800 hover:text-stone-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Homework solver warning / guide */}
        {isHomework && (
          <div className="mx-4 my-3 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/30 text-xs sm:text-sm text-stone-200 flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold text-amber-300 font-serif">
                Это интерактивный справочник, а не решебник!
              </strong>
              Мы не списываем домашние задания за ученика. Ниже собраны точные материалы учебника, термины и факты, по которым ты сможешь уверенно ответить сам!
            </div>
          </div>
        )}

        {/* Results / Suggestions Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {!query && (
            <div className="py-4 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Быстрые подсказки для поиска:
              </div>
              <div className="flex flex-wrap gap-2">
                {quickPicks.map(qp => (
                  <button
                    key={qp}
                    onClick={() => setQuery(qp)}
                    className="px-3 py-1.5 rounded-xl text-xs bg-stone-950 border border-stone-800 text-stone-300 hover:border-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {qp}
                  </button>
                ))}
              </div>
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 text-xs text-stone-400 space-y-1 leading-relaxed">
                <span className="font-semibold text-stone-200 block font-serif">Поиск понимает любые запросы:</span>
                <p>• По именам: «кто такой Колумб», «Пётр I», «Лютер»</p>
                <p>• По годам: «1492», «1588», «1649», «XVII век»</p>
                <p>• По терминам: «что такое абсолютизм», «мануфактура»</p>
                <p>• По параграфам: «§ 2», «Глава 1», «Индия Моголов»</p>
              </div>
            </div>
          )}

          {query && filteredResults.length === 0 && (
            <div className="py-12 text-center text-stone-400 space-y-3">
              <p className="text-sm">По запросу «{query}» ничего не найдено в учебнике.</p>
            </div>
          )}

          {filteredResults.map(item => (
            <div
              key={item.id}
              onClick={() => {
                onClose();
                onSelectEntity(item.id, item.type);
              }}
              className="group p-3.5 rounded-2xl border border-stone-800 bg-stone-950/50 hover:bg-stone-850 hover:border-amber-500/60 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-xs"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold text-amber-400 px-1.5 py-0.2 rounded bg-stone-900 border border-stone-800 font-mono">
                    {item.typeLabel}
                  </span>
                  <h4 className="font-bold text-sm text-stone-100 truncate group-hover:text-amber-300 font-serif">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-stone-400 line-clamp-1">
                  {item.subtitle || item.snippet}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
