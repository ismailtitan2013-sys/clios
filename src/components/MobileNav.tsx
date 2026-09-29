import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  BrainCircuit,
  Menu,
  X,
  Users,
  Calendar,
  Layers,
  Bookmark,
  Settings
} from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentTab, onNavigate }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mainItems = [
    { id: 'home', label: 'Главная', icon: Home },
    { id: 'textbook', label: 'Учебник', icon: BookOpen },
    { id: 'tests', label: 'Тесты', icon: BrainCircuit }
  ];

  const drawerItems = [
    { id: 'topics', label: 'Темы курса', icon: Layers },
    { id: 'personalities', label: 'Личности', icon: Users },
    { id: 'dates', label: 'Даты и годы', icon: Calendar },
    { id: 'terms', label: 'Словарь терминов', icon: BookOpen },
    { id: 'favorites', label: 'Закладки', icon: Bookmark },
    { id: 'settings', label: 'Настройки', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop and Panel */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="absolute bottom-0 inset-x-0 bg-stone-900 rounded-t-3xl p-5 border-t border-stone-800 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="font-bold text-sm text-stone-100 font-serif">
                Все разделы КЛИО
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-xl text-stone-400 hover:text-stone-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {drawerItems.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setDrawerOpen(false);
                    }}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-amber-600 text-white border-amber-600 font-semibold shadow-md'
                        : 'border-stone-800 bg-stone-950/80 text-stone-300 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-amber-400" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-xl border-t border-stone-800 py-1.5 px-2"
        style={{ paddingBottom: 'calc(0.375rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="flex items-center justify-around">
          {mainItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-colors cursor-pointer ${
                  isActive
                    ? 'text-amber-400 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] leading-tight font-medium">{item.label}</span>
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight font-medium">Ещё</span>
          </button>
        </div>
      </nav>
    </>
  );
};
