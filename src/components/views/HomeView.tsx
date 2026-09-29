import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Bookmark,
  Award,
  Zap,
  BrainCircuit,
  GraduationCap,
  Layers
} from 'lucide-react';
import { TEXTBOOK_CHAPTERS, HISTORICAL_PERSONALITIES, HISTORICAL_DATES } from '../../data';
import { ItemType, UserHistoryItem } from '../../types';
import { HISTORICAL_IMAGES } from '../../assets/images';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onOpenSearch: () => void;
  onSelectEntity: (id: string, type: ItemType) => void;
  recentHistory: UserHistoryItem[];
  readParagraphs: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenSearch,
  onSelectEntity,
  recentHistory,
  readParagraphs
}) => {
  const totalParagraphs = TEXTBOOK_CHAPTERS.length;
  const readCount = readParagraphs.length;
  const progressPercent = Math.min(100, Math.round((readCount / totalParagraphs) * 100));

  // Featured key dates
  const featuredDates = HISTORICAL_DATES.filter(d => d.isKey).slice(0, 4);

  // Featured personalities
  const featuredPersons = HISTORICAL_PERSONALITIES.slice(0, 6);

  // Featured popular topics with corresponding atmospheric imagery
  const popularTopics = [
    {
      id: 'p2',
      title: 'Великие географические открытия',
      desc: 'Колумб, Васко да Гама, Магеллан. Новые морские пути и Новый Свет.',
      paragraph: '§ 2–3',
      century: 'Конец XV — XVI в.',
      image: HISTORICAL_IMAGES.columbusVoyage,
      tag: 'Открытия'
    },
    {
      id: 'p6',
      title: 'Эпоха Реформации в Европе',
      desc: 'Мартин Лютер, 95 тезисов, раскол церкви и рождение протестантизма.',
      paragraph: '§ 6–7',
      century: 'XVI в.',
      image: HISTORICAL_IMAGES.reformation,
      tag: 'Религия и общество'
    },
    {
      id: 'p12',
      title: 'Революция в Англии',
      desc: 'Борьба короля и парламента, Оливер Кромвель, казнь монарха и протекторат.',
      paragraph: '§ 12–13',
      century: 'XVII в.',
      image: HISTORICAL_IMAGES.parliament,
      tag: 'Политика'
    },
    {
      id: 'p10',
      title: 'Французский абсолютизм',
      desc: 'Кардинал Ришельё, Людовик XIV «король-солнце», Версаль и централизация.',
      paragraph: '§ 10–11',
      century: 'XVII в.',
      image: HISTORICAL_IMAGES.versailles,
      tag: 'Монархия'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      {/* 1. Grand Atmospheric Hero Section */}
      <section className="relative rounded-3xl border border-stone-800 bg-stone-900/90 shadow-2xl overflow-hidden min-h-[380px] flex flex-col justify-end p-6 sm:p-10 lg:p-12">
        {/* Hero Background Artwork */}
        <div className="absolute inset-0 z-0">
          <img
            src={HISTORICAL_IMAGES.hero}
            alt="Всеобщая история Нового времени"
            className="w-full h-full object-cover object-center filter brightness-60 contrast-110"
          />
          {/* Deep readable gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/70 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-sm">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Всеобщая история · 7 класс</span>
            <span className="text-amber-500/50">·</span>
            <span className="text-stone-300">Учебник В. Р. Мединского и А. О. Чубарьяна</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-stone-50 tracking-tight leading-tight text-shadow-md">
              КЛИО
            </h1>
            <p className="text-lg sm:text-2xl font-serif text-amber-200/95 italic font-medium text-shadow-sm">
              «История, которую можно понять»
            </p>
          </div>

          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl text-shadow-sm font-normal">
            Интерактивная образовательная среда по эпохе раннего Нового времени (конец XV — XVII в.):
            полный текст 23 параграфов учебника, хронограф, каталог деятелей, термины и тесты.
          </p>

          {/* Quick Navigation Badges */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
            <button
              onClick={onOpenSearch}
              className="px-3.5 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-medium transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <Search className="w-3.5 h-3.5 text-amber-400" />
              <span>Поиск по материалам (⌘K)</span>
            </button>
            <button
              onClick={() => onNavigate('textbook')}
              className="px-3.5 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-medium transition-all flex items-center gap-1.5 backdrop-blur-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Все 23 параграфа</span>
            </button>
            <button
              onClick={() => onNavigate('tests')}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold transition-all flex items-center gap-1.5 backdrop-blur-sm"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-amber-400" />
              <span>Пройти тест</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. User Progress & Continue Learning Cards */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Progress Card with Visual Style */}
        <div className="md:col-span-5 p-6 rounded-3xl border border-stone-800/80 bg-stone-900/70 backdrop-blur-md shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
              <span className="font-bold uppercase tracking-wider text-amber-400 font-serif">
                Прогресс по курсу
              </span>
              <span className="font-mono font-bold text-amber-400 text-sm">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-stone-950 border border-stone-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-stone-300 mt-2.5 leading-relaxed">
              Изучено <strong className="text-stone-100">{readCount}</strong> из <strong className="text-stone-100">{totalParagraphs}</strong> параграфов курса Нового времени.
            </p>
          </div>
        </div>

        {/* Recently Viewed History */}
        <div className="md:col-span-7 p-6 rounded-3xl border border-stone-800/80 bg-stone-900/70 backdrop-blur-md shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Недавно просмотренные материалы
              </span>
              <Clock className="w-3.5 h-3.5 text-stone-400" />
            </div>

            {recentHistory.length === 0 ? (
              <p className="text-xs text-stone-400 py-4 leading-relaxed">
                Вы ещё не открывали материалы. Выберите тему, личность или параграф ниже, чтобы продолжить погружение в историю.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recentHistory.slice(0, 4).map(item => (
                  <button
                    key={item.id}
                    onClick={() => onSelectEntity(item.id, item.type)}
                    className="p-3 rounded-2xl border border-stone-800 bg-stone-950/60 hover:border-amber-500/60 hover:bg-stone-900 text-left transition-all truncate group"
                  >
                    <div className="text-xs font-bold text-stone-100 group-hover:text-amber-300 truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-stone-400 truncate mt-0.5">
                      {item.subtitle}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
            <span className="text-stone-400 text-[11px]">История синхронизируется на лету</span>
            <button
              onClick={() => onNavigate('textbook')}
              className="font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
            >
              <span>Продолжить чтение</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Popular Course Themes with Rich Imagery Cards */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              Программа 7 класса
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-100">
              Популярные темы курса
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Ключевые исторические переломы раннего Нового времени
            </p>
          </div>
          <button
            onClick={() => onNavigate('topics')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>Все темы курса</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularTopics.map(topic => (
            <div
              key={topic.id}
              onClick={() => onNavigate('textbook')}
              className="group relative rounded-3xl border border-stone-800 bg-stone-900/80 overflow-hidden hover:border-amber-500/70 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between h-[320px]"
            >
              {/* Background Artwork */}
              <div className="absolute inset-0 z-0">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-900/30" />
              </div>

              {/* Top Tag & Metadata */}
              <div className="relative z-10 p-5 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
                  {topic.tag}
                </span>
                <span className="text-[11px] font-mono text-stone-300 bg-stone-950/70 px-2 py-0.5 rounded-lg">
                  {topic.paragraph}
                </span>
              </div>

              {/* Bottom Content with high contrast */}
              <div className="relative z-10 p-5 space-y-2">
                <div className="text-[11px] text-amber-400 font-mono font-medium">
                  {topic.century}
                </div>
                <h3 className="font-bold text-base text-stone-100 font-serif leading-snug group-hover:text-amber-300 transition-colors text-shadow-sm">
                  {topic.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {topic.desc}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-amber-400 font-semibold">
                  <span>Читать параграф</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Historical Personalities Catalog Preview */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              Персоналии
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-100">
              Исторические личности
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Правители, реформаторы, мореплаватели и мыслители XV–XVII вв.
            </p>
          </div>
          <button
            onClick={() => onNavigate('personalities')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>Весь каталог ({HISTORICAL_PERSONALITIES.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {featuredPersons.map(person => (
            <button
              key={person.id}
              onClick={() => onSelectEntity(person.id, 'personality')}
              className="p-4 rounded-2xl border border-stone-800 bg-stone-900/60 hover:bg-stone-850 hover:border-amber-500/60 text-left transition-all group flex flex-col justify-between shadow-sm cursor-pointer"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-black text-sm flex items-center justify-center mb-3 font-serif group-hover:scale-105 group-hover:border-amber-400 transition-all shadow-inner">
                  {person.name.slice(0, 1)}
                </div>
                <div className="font-bold text-xs text-stone-100 truncate group-hover:text-amber-300">
                  {person.name}
                </div>
                <div className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                  {person.role}
                </div>
              </div>
              <div className="text-[10px] text-amber-500/80 pt-3 font-mono">
                {person.years}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 5. Key Dates Section */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              Хронограф
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-100">
              Важные даты истории
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              События всеобщей истории в синхронизации с историей России
            </p>
          </div>
          <button
            onClick={() => onNavigate('dates')}
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
          >
            <span>Все даты курса</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredDates.map(date => (
            <div
              key={date.id}
              onClick={() => onSelectEntity(date.id, 'date')}
              className="p-5 rounded-2xl border border-stone-800 bg-stone-900/60 hover:bg-stone-850 hover:border-amber-500/60 transition-all cursor-pointer flex flex-col justify-between shadow-sm group"
            >
              <div className="space-y-2">
                <div className="text-2xl font-black font-serif text-amber-400 group-hover:text-amber-300 transition-colors">
                  {date.year} г.
                </div>
                <div className="text-xs font-bold text-stone-100 leading-snug">
                  {date.eventTitle}
                </div>
                <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed">
                  {date.description}
                </p>
              </div>

              {date.russiaParallel && (
                <div className="mt-3.5 pt-2.5 border-t border-stone-800 text-[11px] text-stone-300">
                  <span className="font-semibold text-sky-400">В России: </span>
                  {date.russiaParallel.event} ({date.russiaParallel.year} г.)
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
