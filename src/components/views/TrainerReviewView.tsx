import React, { useState } from 'react';
import { BrainCircuit, Check, RotateCcw, HelpCircle, Eye, EyeOff, Sparkles, BookOpen, Trophy } from 'lucide-react';
import { FLASHCARDS_DATA } from '../../data';
import { Flashcard } from '../../types';

interface TrainerReviewViewProps {
  knownCards: string[];
  onMarkCardKnown: (cardId: string, known: boolean) => void;
}

export const TrainerReviewView: React.FC<TrainerReviewViewProps> = ({
  knownCards,
  onMarkCardKnown
}) => {
  const [selectedMode, setSelectedMode] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const modes = [
    { id: 'all', label: 'Все карточки' },
    { id: 'date_to_event', label: '📅 Дата → Событие' },
    { id: 'event_to_date', label: '⚔️ Событие → Дата' },
    { id: 'person_to_fact', label: '👤 Личность → Деятельность' },
    { id: 'term_to_def', label: '📚 Термин → Определение' }
  ];

  const filteredCards = FLASHCARDS_DATA.filter(c => {
    if (selectedMode === 'all') return true;
    return c.mode === selectedMode;
  });

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const isCardMastered = currentCard ? knownCards.includes(currentCard.id) : false;

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex(prev => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrentIndex(prev => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleMasteryToggle = (known: boolean) => {
    if (!currentCard) return;
    onMarkCardKnown(currentCard.id, known);
    handleNext();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-16">
      {/* Title */}
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
          <BrainCircuit className="w-3.5 h-3.5" />
          <span>Интерактивный тренажёр-шпаргалка</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-stone-50">
          Проверь свои знания перед уроком
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          Подумай сам над вопросом, нажми «Показать ответ» и отметь, насколько уверенно помнишь материал.
        </p>
      </div>

      {/* Mode selection buttons */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedMode(m.id);
              setCurrentIndex(0);
              setShowAnswer(false);
            }}
            className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
              selectedMode === m.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:bg-stone-100'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Progress Counter & Mastery Score */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-2">
        <span>Карточка {currentIndex + 1} из {filteredCards.length}</span>
        <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
          <Trophy className="w-4 h-4" />
          <span>Выучено: {knownCards.length} карточек</span>
        </span>
      </div>

      {/* FLASHCARD INTERACTIVE DECK */}
      {currentCard && (
        <div className="relative p-6 sm:p-10 rounded-3xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl flex flex-col justify-between min-h-[320px] transition-all">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                {currentCard.category}
              </span>
              {isCardMastered && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                  ✓ Выучено
                </span>
              )}
            </div>

            {/* Question */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-1">
                ВОПРОС:
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-stone-50 leading-relaxed">
                {currentCard.question}
              </h2>
            </div>

            {/* Hint if any */}
            {currentCard.hint && !showAnswer && (
              <p className="text-xs text-stone-400 italic">
                💡 Подсказка: {currentCard.hint}
              </p>
            )}

            {/* Answer Box */}
            {showAnswer && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-stone-900 dark:text-stone-100 text-sm sm:text-base leading-relaxed animate-in fade-in duration-200">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 block mb-1">
                  ОТВЕТ / ШПАРГАЛКА:
                </span>
                <p className="font-medium font-serif">{currentCard.answer}</p>
                <div className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                  В учебнике: {currentCard.paragraphRef}, стр. {currentCard.pages}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-8 pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 transition-colors flex items-center justify-center gap-1.5"
            >
              {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showAnswer ? 'Скрыть ответ' : 'Показать ответ'}</span>
            </button>

            {showAnswer && (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleMasteryToggle(false)}
                  className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Повторить ещё</span>
                </button>

                <button
                  onClick={() => handleMasteryToggle(true)}
                  className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex items-center justify-center gap-1 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Знаю отлично!</span>
                </button>
              </div>
            )}

            {!showAnswer && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="px-3 py-2 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                >
                  ← Предыдущий
                </button>
                <button
                  onClick={handleNext}
                  className="px-3 py-2 text-xs font-semibold text-amber-600 hover:underline"
                >
                  Следующий →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
