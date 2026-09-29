import React from 'react';
import { Search } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  theme,
  onToggleTheme
}) => {
  const navLinks = [
    { id: 'home', label: 'Главная' },
    { id: 'textbook', label: 'Учебник' },
    { id: 'topics', label: 'Темы' },
    { id: 'personalities', label: 'Личности' },
    { id: 'dates', label: 'Даты' },
    { id: 'terms', label: 'Термины' },
    { id: 'tests', label: 'Тесты' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-95 cursor-pointer"
            title="КЛИО"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-sm shadow-md transition-all bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 ring-1 ring-amber-500/40 group-hover:brightness-110">
              К7
            </div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-wider text-stone-100 group-hover:text-amber-400 transition-colors">
                КЛИО
              </span>
              <span className="text-[10px] text-amber-500/80 font-mono hidden sm:inline-block">
                7 класс
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-stone-300">
          {navLinks.map(link => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-all py-1 relative flex items-center gap-1.5 hover:text-stone-100 ${
                  isActive ? 'text-amber-400 font-bold' : 'text-stone-400'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full shadow-xs" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons: Search */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 text-xs transition-colors"
            title="Глобальный поиск (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-stone-400" />
            <span className="hidden sm:inline">Поиск</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-stone-400 bg-stone-950 rounded border border-stone-800">
              ⌘K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
