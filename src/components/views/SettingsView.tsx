import React from 'react';
import {
  Settings,
  Sun,
  Moon,
  Type,
  Bell,
  Shield,
  Trash2,
  Download,
  Info,
  RotateCcw
} from 'lucide-react';
import { AppSettings } from '../../types';

interface SettingsViewProps {
  appSettings: AppSettings;
  onUpdateSettings: (patch: Partial<AppSettings>) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onResetAllData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  appSettings,
  onUpdateSettings,
  theme,
  onToggleTheme,
  onResetAllData
}) => {
  const handleExportData = () => {
    const dataToExport = {
      settings: appSettings,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clio7_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Title */}
      <div>
        <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
          Параметры
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-100">
          Настройки приложения
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-1">
          Управление локальными данными приложения.
        </p>
      </div>

      <div className="space-y-6">
        {/* 3. Export & Reset */}
        <section className="p-6 rounded-3xl border border-stone-800 bg-stone-900/80 backdrop-blur-md shadow-lg space-y-4">
          <h2 className="text-base font-bold font-serif text-stone-100 flex items-center gap-2">
            <span>Резервное копирование и сброс</span>
          </h2>
          <p className="text-xs text-stone-400 leading-relaxed">
            Все данные (история запросов, прочитанные параграфы, результаты тестов и настройки) хранятся локально в вашем браузере.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={handleExportData}
              className="px-4 py-2 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Экспорт данных (JSON)</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Вы уверены, что хотите сбросить историю чтения и тестов?')) {
                  onResetAllData();
                }
              }}
              className="px-4 py-2 rounded-xl bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/60 text-rose-300 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Сбросить локальные данные</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
