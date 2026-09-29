import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Calendar, Users, BookOpen, ArrowRight, Zap } from 'lucide-react';
import { QUICK_REVIEW_TOPICS } from '../../data';
import { ItemType } from '../../types';

interface QuickReviewViewProps {
  onSelectEntity: (id: string, type: ItemType) => void;
}

export const QuickReviewView: React.FC<QuickReviewViewProps> = ({ onSelectEntity }) => {
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);

  const currentTopic = QUICK_REVIEW_TOPICS[activeTopicIndex];

  return (
    <div className="space-y-6 pb-16">
      {/* Title */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>Экспресс-шпаргалка для 7 класса</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-stone-50">
          «Повторить за 10 минут перед контрольной»
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
          Концентрированная выжимка главного: только то, что реально спрашивают на уроках и в проверочных работах.
        </p>
      </div>

      {/* Topic Switcher Pills/Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {QUICK_REVIEW_TOPICS.map((topic, idx) => (
          <button
            key={topic.id}
            onClick={() => setActiveTopicIndex(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeTopicIndex === idx
                ? 'bg-amber-600 text-white border-amber-600 shadow-md scale-[1.02]'
                : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-amber-400'
            }`}
          >
            {topic.title.split('. ')[1] || topic.title}
          </button>
        ))}
      </div>

      {/* Main Review Sheet Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-lg space-y-6">
        <div>
          <div className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold mb-1">
            {currentTopic.paragraphs}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-50">
            {currentTopic.title}
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base leading-relaxed mt-2 p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            {currentTopic.summary}
          </p>
        </div>

        {/* 1. Главные даты */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>⭐ Главные даты, которые надо знать наизусть:</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {currentTopic.keyDates.map((kd, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-stone-800 dark:text-stone-200 font-medium">
                {kd}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Причины и последствия */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>📌 Главные причинно-следственные связи:</span>
          </h3>
          <div className="space-y-3">
            {currentTopic.causesAndEffects.map((ce, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200/80 dark:border-stone-800 text-xs sm:text-sm space-y-2">
                <div>
                  <span className="font-bold text-amber-800 dark:text-amber-300 block mb-0.5">❓ Причина:</span>
                  <p className="text-stone-700 dark:text-stone-300">{ce.cause}</p>
                </div>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">⚡ Следствие / Итог:</span>
                  <p className="text-stone-700 dark:text-stone-300">{ce.effect}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Ключевые личности и термины */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl border border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/30 text-xs">
            <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>Главные личности темы:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentTopic.keyFigures.map((kf, i) => (
                <span key={i} className="px-2.5 py-1 bg-white dark:bg-stone-700 rounded-lg border border-stone-200 dark:border-stone-600 font-medium text-stone-800 dark:text-stone-200">
                  {kf}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/30 text-xs">
            <span className="font-bold text-stone-900 dark:text-stone-100 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Главные термины темы:</span>
            </span>
            <div className="flex flex-wrap gap-1.5">
              {currentTopic.keyTerms.map((kt, i) => (
                <span key={i} className="px-2.5 py-1 bg-white dark:bg-stone-700 rounded-lg border border-stone-200 dark:border-stone-600 font-medium text-stone-800 dark:text-stone-200">
                  {kt}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
