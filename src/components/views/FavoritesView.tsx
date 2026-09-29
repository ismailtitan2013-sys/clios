import React from 'react';
import { Star, BookOpen, Calendar, Users, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { ItemType } from '../../types';
import {
  TEXTBOOK_CHAPTERS,
  HISTORICAL_PERSONALITIES,
  HISTORICAL_DATES,
  TEXTBOOK_TERMS
} from '../../data';

interface FavoritesViewProps {
  favorites: string[];
  onSelectEntity: (id: string, type: ItemType) => void;
  onToggleFavorite: (id: string) => void;
  onNavigate: (tab: string) => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onSelectEntity,
  onToggleFavorite,
  onNavigate
}) => {
  // Resolve favorite items
  const resolvedItems = favorites.map(favId => {
    // Check paragraph
    const p = TEXTBOOK_CHAPTERS.find(x => x.id === favId);
    if (p) {
      return {
        id: p.id,
        type: 'paragraph' as ItemType,
        title: typeof p.number === 'number' ? `§ ${p.number}. ${p.title}` : p.title,
        subtitle: `${p.chapterTitle} · стр. ${p.pages}`,
        typeLabel: 'Параграф'
      };
    }

    // Check personality
    const pers = HISTORICAL_PERSONALITIES.find(x => x.id === favId);
    if (pers) {
      return {
        id: pers.id,
        type: 'personality' as ItemType,
        title: pers.name,
        subtitle: `${pers.years} · ${pers.role}`,
        typeLabel: 'Личность'
      };
    }

    // Check date
    const d = HISTORICAL_DATES.find(x => x.id === favId);
    if (d) {
      return {
        id: d.id,
        type: 'date' as ItemType,
        title: `${d.year} г. — ${d.eventTitle}`,
        subtitle: `${d.century} в. · ${d.region}`,
        typeLabel: 'Дата'
      };
    }

    // Check term
    const t = TEXTBOOK_TERMS.find(x => x.id === favId);
    if (t) {
      return {
        id: t.id,
        type: 'term' as ItemType,
        title: t.term,
        subtitle: t.category,
        typeLabel: 'Понятие'
      };
    }

    return null;
  }).filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Title */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
          Личная подборка
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100">
          Сохранённые материалы ({favorites.length})
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Важные даты, параграфы учебника, персоналии и понятия, отмеченные звёздочкой.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-stone-800 bg-stone-900/80 backdrop-blur-md space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
            <Star className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-serif text-stone-100">
              В закладках пока пусто
            </h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Нажимайте на значок звёздочки в статьях учебника, карточках деятелей или датах, чтобы быстро вернуться к ним перед уроком.
            </p>
          </div>
          <button
            onClick={() => onNavigate('textbook')}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md cursor-pointer transition-colors"
          >
            Перейти к учебнику
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {resolvedItems.map(item => {
            if (!item) return null;
            return (
              <div
                key={item.id}
                onClick={() => onSelectEntity(item.id, item.type)}
                className="group p-4 rounded-2xl border border-stone-800 bg-stone-900/80 backdrop-blur-md hover:border-amber-500/60 hover:bg-stone-850 flex items-center justify-between gap-4 transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center justify-center shrink-0">
                    <Bookmark className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-amber-400 px-1.5 py-0.2 rounded bg-stone-950 border border-stone-800">
                        {item.typeLabel}
                      </span>
                      <h3 className="font-bold text-sm text-stone-100 truncate group-hover:text-amber-300 transition-colors font-serif">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-400 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    className="p-2 text-stone-400 hover:text-rose-400 transition-colors"
                    title="Удалить из закладок"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
