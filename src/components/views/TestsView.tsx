import React, { useState } from 'react';
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Layers,
  ChevronRight,
  Trophy,
  Filter
} from 'lucide-react';
import { FLASHCARDS_DATA, TEXTBOOK_CHAPTERS } from '../../data';
import { TestQuestion, TestResult } from '../../types';

interface TestsViewProps {
  onAddTestResult: (result: Omit<TestResult, 'id' | 'timestamp'>) => void;
  knownCards: string[];
  onMarkCardKnown: (cardId: string, known: boolean) => void;
}

// Built-in authentic curriculum quiz database with 4 options and detailed explanations
const CURRICULUM_QUESTIONS: TestQuestion[] = [
  {
    id: 'q_1',
    category: 'Великие географические открытия',
    paragraphRef: '§ 2',
    question: 'В каком году экспедиция Христофора Колумба впервые достигла островов Карибского бассейна (Нового Света)?',
    options: ['1488 г.', '1492 г.', '1498 г.', '1519 г.'],
    correctIndex: 1,
    explanation: '12 октября 1492 г. каравеллы «Санта-Мария», «Пинта» и «Нинья» подошли к острову Сан-Сальвадор.'
  },
  {
    id: 'q_2',
    category: 'Великие географические открытия',
    paragraphRef: '§ 2',
    question: 'Какой мореплаватель первым открыл прямой морской путь из Европы в Индию вокруг мыса Доброй Надежды?',
    options: ['Бартоломеу Диаш', 'Фернан Магеллан', 'Васко да Гама', 'Америго Веспуччи'],
    correctIndex: 2,
    explanation: 'В мае 1498 г. португальская флотилия под командованием Васко да Гамы бросила якорь в индийском порту Каликут.'
  },
  {
    id: 'q_3',
    category: 'Великие географические открытия',
    paragraphRef: '§ 2',
    question: 'Какое значение имело первое кругосветное плавание экспедиции Фернана Магеллана (1519–1522 гг.)?',
    options: [
      'Было доказано единство Мирового океана и шарообразность Земли',
      'Были открыты богатейшие месторождения золота в Бразилии',
      'Был заключён союз между Испанией и Османской империей',
      'Португалия установила монополию на плавание в Атлантике'
    ],
    correctIndex: 0,
    explanation: 'Экспедиция Магеллана на практике доказала шарообразность нашей планеты и то, что океаны образуют единую систему.'
  },
  {
    id: 'q_4',
    category: 'Реформация',
    paragraphRef: '§ 6',
    question: 'Что послужило началом движения Реформации в Германии в октябре 1517 года?',
    options: [
      'Созыв Тридентского собора католической церкви',
      'Обнародование 95 тезисов Мартина Лютера против продажи индульгенций',
      'Подписание Аугсбургского религиозного мира',
      'Восстание под предводительством Томаса Мюнцера'
    ],
    correctIndex: 1,
    explanation: '31 октября 1517 г. доктор богословия Мартин Лютер прибил к дверям замковой церкви Виттенберга 95 тезисов.'
  },
  {
    id: 'q_5',
    category: 'Реформация',
    paragraphRef: '§ 6',
    question: 'Какой принцип был закреплён Аугсбургским религиозным миром 1555 года в Германии?',
    options: [
      '«Один король, один закон, одна вера»',
      '«Чья власть, того и вера» (Cuius regio, eius religio)',
      'Свобода совести для каждого отдельного гражданина',
      'Полный запрет любых протестантских учений'
    ],
    correctIndex: 1,
    explanation: 'По Аугсбургскому миру немецкие князья получили право сами определять религию подданных на своих землях.'
  },
  {
    id: 'q_6',
    category: 'Реформация',
    paragraphRef: '§ 7',
    question: 'Кто был основателем ордена иезуитов («Общества Иисуса»), ставшего главной силой Контрреформации?',
    options: ['Игнатий де Лойола', 'Жан Кальвин', 'Филипп II', 'Эразм Роттердамский'],
    correctIndex: 0,
    explanation: 'Испанский дворянин Игнатий де Лойола основал орден иезуитов в 1534 году для защиты католической веры и власти папы.'
  },
  {
    id: 'q_7',
    category: 'Государства Европы',
    paragraphRef: '§ 10',
    question: 'Какой французский государственный деятель XVII века вошёл в историю формулой укрепления абсолютизма и борьбы с гугенотами?',
    options: ['Кардинал Ришельё', 'Герцог Сюлли', 'Жан Батист Кольбер', 'Жюль Мазарини'],
    correctIndex: 0,
    explanation: 'Кардинал Ришельё, первый министр короля Людовика XIII, подавил гугенотскую автономию и укрепил королевскую власть.'
  },
  {
    id: 'q_8',
    category: 'Английская революция',
    paragraphRef: '§ 12',
    question: 'Как звали лидера индепендентов и создателя армии «нового образца» в годы Гражданской войны в Англии?',
    options: ['Оливер Кромвель', 'Уильям Лод', 'Томас Мор', 'Джон Лилберн'],
    correctIndex: 0,
    explanation: 'Оливер Кромвель создал дисциплинированную армию «железнобоких» и стал лордом-протектором Английской республики.'
  }
];

export const TestsView: React.FC<TestsViewProps> = ({
  onAddTestResult,
  knownCards,
  onMarkCardKnown
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'flashcards'>('quiz');

  // Quiz state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState<string[]>([]);

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentQ = CURRICULUM_QUESTIONS[currentQIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore(prev => prev + 1);
    } else {
      setWrongQuestions(prev => [...prev, currentQ.id]);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < CURRICULUM_QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsQuizCompleted(true);
      const total = CURRICULUM_QUESTIONS.length;
      const percentage = Math.round((score / total) * 100);
      onAddTestResult({
        topicTitle: 'Итоговый тренажёр курса Нового времени',
        score,
        totalQuestions: total,
        percentage,
        wrongQuestionIds: wrongQuestions
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setWrongQuestions([]);
    setIsQuizCompleted(false);
  };

  const currentCard = FLASHCARDS_DATA[cardIndex];
  const isCurrentCardKnown = currentCard ? knownCards.includes(currentCard.id) : false;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            Самопроверка и тренажёр
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-100">
            Тесты и карточки самопроверки
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Проверьте знание дат, терминов и причинно-следственных связей школьного курса 7 класса.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-stone-900 border border-stone-800 rounded-2xl self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-600/20'
                : 'text-stone-400 hover:text-stone-100'
            }`}
          >
            Тест с вопросами
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
              activeTab === 'flashcards'
                ? 'bg-amber-600 text-white font-bold shadow-md shadow-amber-600/20'
                : 'text-stone-400 hover:text-stone-100'
            }`}
          >
            Флеш-карточки ({FLASHCARDS_DATA.length})
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        /* Quiz Mode */
        !isQuizCompleted ? (
          <div className="p-6 sm:p-9 rounded-3xl border border-stone-800 bg-stone-900/85 backdrop-blur-md shadow-2xl space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between text-xs text-stone-400 pb-3 border-b border-stone-800">
              <span className="font-mono text-amber-400 font-bold">
                Вопрос {currentQIndex + 1} из {CURRICULUM_QUESTIONS.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-950 border border-stone-800 text-stone-300">
                {currentQ.category} · {currentQ.paragraphRef}
              </span>
            </div>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-100 leading-snug">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isCorrect = idx === currentQ.correctIndex;
                const isChosen = idx === selectedOption;

                let optClass = 'bg-stone-950/70 border-stone-800 hover:border-amber-400/80 hover:bg-stone-850 text-stone-200';
                if (isAnswered) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md';
                  } else if (isChosen) {
                    optClass = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  } else {
                    optClass = 'opacity-40 border-stone-850 text-stone-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${optClass}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isChosen && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation after answer */}
            {isAnswered && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs text-stone-200 space-y-1.5 leading-relaxed">
                <span className="font-bold text-amber-300 font-serif block">
                  {selectedOption === currentQ.correctIndex ? '✓ Верно!' : '✗ Неверно. Пояснение:'}
                </span>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Bottom Next Button */}
            {isAnswered && (
              <div className="pt-3 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{currentQIndex === CURRICULUM_QUESTIONS.length - 1 ? 'Посмотреть результат' : 'Следующий вопрос'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results screen */
          <div className="p-8 sm:p-12 rounded-3xl border border-stone-800 bg-stone-900/90 backdrop-blur-md text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-serif text-stone-100">
                Тест успешно завершён!
              </h2>
              <p className="text-xs text-stone-400">
                Результаты сохранены в вашем профиле ученика
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 inline-block min-w-[240px]">
              <div className="text-5xl font-black font-serif text-amber-400">
                {score} / {CURRICULUM_QUESTIONS.length}
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Правильных ответов ({Math.round((score / CURRICULUM_QUESTIONS.length) * 100)}%)
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestartQuiz}
                className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Пройти заново</span>
              </button>
            </div>
          </div>
        )
      ) : (
        /* Flashcards Mode */
        <div className="space-y-6">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[300px] p-8 sm:p-12 rounded-3xl border border-stone-800 bg-stone-900/85 backdrop-blur-md shadow-2xl flex flex-col justify-between cursor-pointer hover:border-amber-500/60 transition-all select-none"
          >
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-mono text-amber-400">
                Карточка {cardIndex + 1} из {FLASHCARDS_DATA.length}
              </span>
              <span className="text-[11px] text-stone-400">Нажмите, чтобы перевернуть</span>
            </div>

            <div className="text-center py-8 space-y-3">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold block font-serif">
                {isFlipped ? 'Определение / Ответ:' : 'Понятие или событие:'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-100 max-w-xl mx-auto leading-relaxed">
                {isFlipped ? currentCard?.answer : currentCard?.question}
              </h3>
            </div>

            <div className="text-center text-xs text-stone-400">
              {isFlipped ? 'Нажмите ещё раз для возврата' : 'Нажмите для показа ответа'}
            </div>
          </div>

          {/* Flashcard Controls */}
          <div className="flex items-center justify-between gap-3 text-xs">
            <button
              onClick={() => {
                setIsFlipped(false);
                setCardIndex(prev => Math.max(0, prev - 1));
              }}
              disabled={cardIndex === 0}
              className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 disabled:opacity-30 text-stone-300 hover:text-white cursor-pointer"
            >
              Назад
            </button>

            <button
              onClick={() => {
                if (currentCard) {
                  onMarkCardKnown(currentCard.id, !isCurrentCardKnown);
                }
              }}
              className={`px-4 py-2 rounded-xl border font-semibold transition-all cursor-pointer ${
                isCurrentCardKnown
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              {isCurrentCardKnown ? '✓ Знаю эту тему' : 'Отметить как выученную'}
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setCardIndex(prev => Math.min(FLASHCARDS_DATA.length - 1, prev + 1));
              }}
              disabled={cardIndex === FLASHCARDS_DATA.length - 1}
              className="px-4 py-2 rounded-xl bg-stone-900 border border-stone-800 disabled:opacity-30 text-stone-300 hover:text-white cursor-pointer"
            >
              Дальше
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
