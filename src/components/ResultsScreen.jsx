import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import KittyObserver from './KittyObserver';

// Компонент анимации для разных оценок
const ResultAnimation = ({ grade }) => {
  if (grade === 'excellent') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `confetti-fall ${2 + Math.random() * 2}s linear ${Math.random() * 3}s infinite`,
            }}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                ['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'][i % 5]
              }`}
              style={{ transform: `rotate(${Math.random() * 360}deg)` }}
            />
          </div>
        ))}
      </div>
    );
  }

  if (grade === 'good') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle 1.5s ease-in-out ${Math.random() * 2}s infinite`,
              fontSize: '20px',
            }}
          >
            ⭐
          </div>
        ))}
      </div>
    );
  }

  if (grade === 'satisfactory') {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `gentle 2s ease-in-out ${Math.random() * 2}s infinite`,
              fontSize: '24px',
            }}
          >
            💪
          </div>
        ))}
      </div>
    );
  }

  // Для неудовлетворительно — капли дождя
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            animation: `rain-drop ${1 + Math.random() * 2}s linear ${Math.random() * 2}s infinite`,
          }}
        >
          <div className="w-0.5 h-6 bg-gradient-to-b from-transparent to-blue-300 opacity-50" />
        </div>
      ))}
    </div>
  );
};

export default function ResultsScreen({ questions, userAnswers, matchingQuestions, userMatches, onRetry }) {
  const [showDetails, setShowDetails] = useState(false);
  
  let correctCount = 0;
  const results = questions.map((q, idx) => {
    const userAnswer = userAnswers[idx] || [];
    const isCorrect = userAnswer.length === q.correct.length && userAnswer.every(a => q.correct.includes(a));
    if (isCorrect) correctCount++;
    return { question: q, userAnswer, isCorrect };
  });

  // Система оценок по баллам
  let grade, gradeColor, gradeMessage, kittyMood, animationType;
  if (correctCount >= 42) {
    grade = "Отлично 🏆";
    gradeColor = "from-yellow-400 to-amber-500 pulse-gold";
    gradeMessage = "Превосходный результат! Вы отлично владеете материалом.";
    kittyMood = 'excited';
    animationType = 'excellent';
  } else if (correctCount >= 35) {
    grade = "Хорошо 🌟";
    gradeColor = "from-green-400 to-emerald-500";
    gradeMessage = "Хорошая работа! Есть небольшие пробелы, но в целом вы на высоте.";
    kittyMood = 'happy';
    animationType = 'good';
  } else if (correctCount >= 27) {
    grade = "Удовлетворительно 💪";
    gradeColor = "from-blue-400 to-indigo-500";
    gradeMessage = "Базовый уровень пройден. Рекомендуется повторить сложные темы.";
    kittyMood = 'worried';
    animationType = 'satisfactory';
  } else {
    grade = "Неудовлетворительно 📚";
    gradeColor = "from-red-400 to-pink-500";
    gradeMessage = "Не расстраивайтесь! Повторите материал и попробуйте снова. У вас всё получится!";
    kittyMood = 'sad';
    animationType = 'unsatisfactory';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 relative overflow-hidden">
      {/* Котик в углу */}
      <KittyObserver mood={kittyMood} size="medium" />
      
      {/* Анимация для оценки */}
      <ResultAnimation grade={animationType} />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className={`bg-gradient-to-br ${gradeColor} rounded-3xl p-8 md:p-10 text-center text-white shadow-2xl mb-6`}>
          <div className="text-6xl md:text-7xl font-bold mb-2">{correctCount} / 50</div>
          <div className="text-2xl font-bold mb-2">{grade}</div>
          <p className="text-lg opacity-90">{gradeMessage}</p>
        </div>

        <button onClick={() => setShowDetails(!showDetails)} className="w-full bg-white rounded-2xl shadow-lg p-5 mb-6 flex items-center justify-between hover:shadow-xl transition-shadow">
          <span className="font-semibold text-gray-700">{showDetails ? 'Скрыть подробности' : 'Показать подробные результаты'}</span>
          <svg className={`w-5 h-5 text-gray-500 transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDetails && (
          <div className="space-y-4 mb-8">
            {results.map((r, idx) => (
              <div key={idx} className={`rounded-xl p-5 border-2 ${r.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${r.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={r.isCorrect ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"} />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">Вопрос {idx + 1}</span>
                    <h3 className="font-semibold text-gray-800">{r.question.text}</h3>
                  </div>
                </div>
                <div className="ml-10 space-y-1 text-sm">
                  <p>Ваш ответ: <span className={r.isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                    {r.userAnswer.map(i => r.question.options[i]).join(', ') || 'Нет ответа'}
                  </span></p>
                  {!r.isCorrect && (
                    <p>Правильный ответ: <span className="text-green-700 font-medium">
                      {r.question.correct.map(i => r.question.options[i]).join(', ')}
                    </span></p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={onRetry} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
          <RotateCcw className="w-5 h-5" /> Пройти тест заново
        </button>
      </div>
    </div>
  );
}