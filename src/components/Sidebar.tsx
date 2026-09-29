import React from 'react';
import {
  Home,
  BookOpen,
  Layers,
  Users,
  Calendar,
  Bookmark,
  BrainCircuit,
  GraduationCap,
  Settings
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  favoritesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onNavigate,
  favoritesCount
}) => {
  const primaryNav = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'textbook', label: 'Учебник (§ 1–23)', icon: BookOpen },
    { id: 'topics', label: 'Темы курса', icon: Layers },
    { id: 'personalities', label: 'Личности', icon: Users },
    { id: 'dates', label: 'Даты и годы', icon: Calendar },
    { id: 'terms', label: 'Словарь терминов', icon: BookOpen }
  ];

  const studyTools = [
    { id: 'tests', label: 'Тесты и тренажёр', icon: BrainCircuit },
    { id: 'favorites', label: 'Закладки', icon: Bookmark, count: favoritesCount },
    { id: 'settings', label: 'Настройки', icon: Settings }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-stone-850/80 bg-stone-950/70 backdrop-blur-xl p-4 space-y-6">
      {/* Textbook Title Tag */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-950/40 to-stone-900/60 border border-amber-500/25 text-xs shadow-inner">
        <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-0.5 font-serif">
          <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Всеобщая история · 7 кл.</span>
        </div>
        <p className="text-[11px] text-stone-400 leading-tight">
          Учебник В. Р. Мединского и А. О. Чубарьяна (2026)
        </p>
      </div>

      {/* Main Section: Knowledge Base */}
      <div className="space-y-1">
        <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
          База знаний
        </div>
        {primaryNav.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-600/20'
                  : 'text-stone-300 hover:text-white hover:bg-stone-900/80'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Secondary Section: Tools */}
      <div className="space-y-1 pt-2 border-t border-stone-850">
        <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
          Инструменты
        </div>
        {studyTools.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-stone-800 text-stone-100 font-bold border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
              }`}
            >
              <div className="flex items-center gap-3 truncate">
                <Icon className="w-4 h-4 shrink-0 text-stone-400" />
                <span className="truncate">{item.label}</span>
              </div>
              {typeof item.count === 'number' && item.count > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-stone-800 text-stone-300 font-mono">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
