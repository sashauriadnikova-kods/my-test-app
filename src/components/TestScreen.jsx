import React, { useCallback, useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import MatchingQuestion from './MatchingQuestion';
import KittyObserver from './KittyObserver';

export default function TestScreen({ questions, matchingQuestions, onFinish, questionIndex, setQuestionIndex, userAnswers, setUserAnswers, userMatches, setUserMatches }) {
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const isMatching = questionIndex >= questions.length;
  const matchingIndex = questionIndex - questions.length;
  const currentQuestion = !isMatching ? questions[questionIndex] : null;
  const currentMatching = isMatching ? matchingQuestions[matchingIndex] : null;
  const totalItems = questions.length + matchingQuestions.length;
  const isLast = questionIndex === totalItems - 1;

  useEffect(() => {
    if (timeLeft <= 0) { onFinish(); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onFinish]);

  const handleToggle = useCallback((idx, isMultiple) => {
    setUserAnswers(prev => {
      const current = prev[questionIndex] || [];
      if (isMultiple) return current.includes(idx) ? { ...prev, [questionIndex]: current.filter(i => i !== idx) } : { ...prev, [questionIndex]: [...current, idx] };
      return { ...prev, [questionIndex]: [idx] };
    });
  }, [questionIndex, setUserAnswers]);

  const handleMatch = useCallback((qId, left, right) => {
    setUserMatches(prev => {
      const matches = { ...(prev[qId] || {}) };
      for (const [l, r] of Object.entries(matches)) if (r === right) delete matches[l];
      if (matches[left]) delete matches[left];
      matches[left] = right;
      return { ...prev, [qId]: matches };
    });
  }, [setUserMatches]);

  const selectedAnswers = currentQuestion ? (userAnswers[questionIndex] || []) : [];
  const hasAnswer = isMatching 
    ? Object.keys(userMatches[currentMatching?.id] || {}).length === currentMatching?.leftItems.length 
    : selectedAnswers.length > 0;

  // Определяем настроение котика
  let kittyMood = 'neutral';
  if (questionIndex === 0 && selectedAnswers.length === 0) kittyMood = 'thinking';
  else if (selectedAnswers.length >= 2) kittyMood = 'happy';
  else if (questionIndex > totalItems * 0.8) kittyMood = 'excited';
  else if (timeLeft < 300) kittyMood = 'worried';

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-6 px-4 relative">
      {/* Котик наблюдает */}
      <KittyObserver mood={kittyMood} size="small" />
      
      <div className="max-w-3xl mx-auto">
        <ProgressBar current={questionIndex} total={totalItems} timeLeft={timeLeft} isWarning={timeLeft < 300} />
        <div className="mt-6 mb-4 flex justify-between items-center">
          <button onClick={() => setQuestionIndex(prev => Math.max(0, prev - 1))} disabled={questionIndex === 0} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${questionIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-white hover:shadow'}`}>Назад</button>
          <button onClick={() => isLast ? onFinish() : setQuestionIndex(prev => prev + 1)} disabled={!hasAnswer} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white shadow-lg transition-all ${!hasAnswer ? 'bg-gray-400 cursor-not-allowed' : isLast ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}>
            {isLast ? 'Завершить тест' : 'Далее'}
          </button>
        </div>
        {isMatching ? (
          <MatchingQuestion question={currentMatching} userMatches={userMatches} onMatch={handleMatch} questionNumber={questionIndex + 1} />
        ) : (
          <QuestionCard question={currentQuestion} selectedAnswers={selectedAnswers} onToggle={handleToggle} questionNumber={questionIndex + 1} />
        )}
        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          {Array.from({ length: totalItems }).map((_, idx) => {
            const answered = idx >= questions.length ? Object.keys(userMatches[matchingQuestions[idx - questions.length]?.id] || {}).length > 0 : (userAnswers[idx] || []).length > 0;
            return (
              <button key={idx} onClick={() => setQuestionIndex(idx)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${idx === questionIndex ? 'bg-indigo-500 text-white shadow-md scale-110' : answered ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>{idx + 1}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}