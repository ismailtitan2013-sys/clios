import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  BrainCircuit,
  Search,
  BookOpen,
  Calendar,
  Users,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { QUICK_REVIEW_TOPICS } from '../../data';
import { ItemType } from '../../types';
import { HISTORICAL_IMAGES } from '../../assets/images';

interface TopicsViewProps {
  onSelectEntity: (id: string, type: ItemType) => void;
  onNavigate: (tab: string) => void;
}

const TOPIC_ART_MAP: { [key: string]: string } = {
  qr_vgo: HISTORICAL_IMAGES.columbusVoyage,
  qr_capitalism: HISTORICAL_IMAGES.libraryHero,
  qr_reformation: HISTORICAL_IMAGES.reformation,
  qr_absolutism: HISTORICAL_IMAGES.versailles,
  qr_english_revolution: HISTORICAL_IMAGES.parliament,
  qr_orient: HISTORICAL_IMAGES.orientalGrandeur,
};

export const TopicsView: React.FC<TopicsViewProps> = ({
  onSelectEntity,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string>(QUICK_REVIEW_TOPICS[0]?.id || 'qr_vgo');

  const filteredTopics = QUICK_REVIEW_TOPICS.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTopic = QUICK_REVIEW_TOPICS.find(t => t.id === selectedTopicId) || QUICK_REVIEW_TOPICS[0];
  const activeImage = (activeTopic && TOPIC_ART_MAP[activeTopic.id]) || HISTORICAL_IMAGES.renaissanceStudy;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
          Тематические блоки Всеобщей истории (7 класс)
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-stone-100">
          Темы и причинно-следственные связи
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-2xl">
          Ключевые процессы эпохи раннего Нового времени в удобных конспектах: почему начались события, как они развивались и к чему привели.
        </p>
      </div>

      {/* Grid: Topics Selector + Topic Summary Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Topics Selector */}
        <div className="lg:col-span-4 p-4 rounded-3xl border border-stone-800 bg-stone-900/80 backdrop-blur-md shadow-lg space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Поиск по темам..."
              className="w-full pl-8 pr-3 py-2 text-xs bg-stone-950 border border-stone-800 rounded-xl text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-2 max-h-[75vh] overflow-y-auto">
            {filteredTopics.map((topic, idx) => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full p-3 rounded-2xl text-left transition-all text-xs flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white font-medium shadow-md shadow-amber-600/20'
                      : 'text-stone-300 hover:bg-stone-850 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 text-[10px] opacity-75 font-mono">
                    <span>Тема {idx + 1}</span>
                    <span>{topic.paragraphs}</span>
                  </div>
                  <div className="font-serif font-bold text-xs sm:text-sm leading-snug">
                    {topic.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Topic Content */}
        {activeTopic && (
          <div className="lg:col-span-8 rounded-3xl border border-stone-800 bg-stone-900/85 backdrop-blur-md shadow-2xl overflow-hidden space-y-6">
            {/* Visual Hero for Active Topic */}
            <div className="relative h-48 sm:h-56 overflow-hidden flex flex-col justify-end p-6 sm:p-8">
              <img
                src={activeImage}
                alt={activeTopic.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-50 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-transparent" />

              <div className="relative z-10 space-y-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-stone-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md">
                  {activeTopic.paragraphs}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-serif text-stone-50 leading-tight text-shadow-md">
                  {activeTopic.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 pt-0 space-y-6">
              {/* Summary */}
              <div className="p-4 rounded-2xl bg-stone-950/50 border border-stone-800 text-xs sm:text-sm text-stone-200 leading-relaxed font-serif">
                {activeTopic.summary}
              </div>

              {/* Causes and Effects */}
              {activeTopic.causesAndEffects && activeTopic.causesAndEffects.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-stone-100 font-serif uppercase tracking-wider text-amber-400">
                    Причинно-следственные связи:
                  </h4>
                  <div className="grid grid-cols-1 gap-3 text-xs">
                    {activeTopic.causesAndEffects.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 space-y-2">
                        <div className="text-amber-300 leading-relaxed">
                          <strong className="text-amber-400">Причина:</strong> {item.cause}
                        </div>
                        <div className="text-emerald-300 leading-relaxed border-t border-stone-850 pt-2">
                          <strong className="text-emerald-400">Следствие:</strong> {item.effect}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Figures & Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-4 rounded-2xl bg-stone-950/50 border border-stone-800 space-y-2">
                  <span className="font-bold text-stone-200 block font-serif">Ключевые даты:</span>
                  <ul className="space-y-1 text-stone-300">
                    {activeTopic.keyDates.map((kd, idx) => (
                      <li key={idx} className="font-mono text-amber-300">{kd}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950/50 border border-stone-800 space-y-2">
                  <span className="font-bold text-stone-200 block font-serif">Главные деятели:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeTopic.keyFigures.map((kf, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-xl bg-stone-900 border border-stone-750 text-stone-200">
                        {kf}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
