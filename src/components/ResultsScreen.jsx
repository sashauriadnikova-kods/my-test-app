// src/components/ResultsScreen.jsx
import React, { useState, useEffect } from 'react';
import ReactConfetti from 'react-confetti';
import { RotateCcw, CheckCircle, XCircle } from 'lucide-react';

export default function ResultsScreen({ questions, userAnswers, onRetry }) {
    const [showDetails, setShowDetails] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Отслеживаем изменение размера окна для корректной работы конфетти
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Подсчёт баллов
    let correctCount = 0;
    const results = questions.map((q, idx) => {
        const userAnswer = userAnswers[idx] || [];
        // Для вопросов с множественным выбором проверяем точное совпадение массивов
        const isCorrect = userAnswer.length === q.correct.length &&
            userAnswer.every(a => q.correct.includes(a));
        if (isCorrect) correctCount++;
        return { question: q, userAnswer, isCorrect };
    });

    const totalQuestions = questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Система оценок
    let grade, gradeColor, gradeMessage;
    if (percentage === 100) {
        grade = "Отлично 🏆";
        gradeColor = "from-yellow-400 to-amber-500";
        gradeMessage = "Идеальный результат! Вы ответили правильно на все 50 вопросов.";
    } else if (percentage >= 42) {
        grade = "Отлично ";
        gradeColor = "from-green-400 to-emerald-500";
        gradeMessage = "Высокий уровень знаний. Так держать!";
    } else if (percentage >= 35) {
        grade = "Хорошо 👍";
        gradeColor = "from-blue-400 to-indigo-500";
        gradeMessage = "Хороший результат. Осталось немного до отличной оценки.";
    } else if (percentage >= 27) {
        grade = "Удовлетворительно ";
        gradeColor = "from-orange-400 to-red-400";
        gradeMessage = "Базовый материал усвоен, но есть пробелы. Повторите сложные темы.";
    } else {
        grade = "Неудовлетворительно 📉";
        gradeColor = "from-red-500 to-pink-600";
        gradeMessage = "Материал требует повторного изучения. Не сдавайтесь, попробуйте ещё раз!";
    }

    // Настройки анимации
    const confettiConfig = {
        numberOfPieces: percentage === 100 ? 300 : percentage === 0 ? 150 : 0,
        gravity: percentage === 0 ? 1.5 : 0.3,
        wind: percentage === 0 ? 0 : 0.1,
        colors: percentage === 0
            ? ['#9ca3af', '#6b7280', '#4b5563', '#374151'] // Серый дождь
            : ['#FFD700', '#FF4500', '#00BFFF', '#32CD32', '#FF1493', '#8A2BE2'], // Яркое конфетти
        recycle: true,
        width: percentage === 0 ? 3 : 8,
        height: percentage === 0 ? 15 : 8,
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4 relative overflow-hidden">
            {/* Анимация: конфетти (100%) или дождь (0%) */}
            {(percentage === 100 || percentage === 0) && (
                <ReactConfetti
                    width={windowSize.width}
                    height={windowSize.height}
                    numberOfPieces={confettiConfig.numberOfPieces}
                    recycle={confettiConfig.recycle}
                    gravity={confettiConfig.gravity}
                    wind={confettiConfig.wind}
                    colors={confettiConfig.colors}
                    shapes={['square', 'circle']}
                    style={{ width: confettiConfig.width, height: confettiConfig.height }}
                />
            )}

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Карточка результата */}
                <div className={`bg-gradient-to-br ${gradeColor} rounded-3xl p-8 md:p-10 text-center text-white shadow-2xl mb-6`}>
                    <div className="text-6xl md:text-7xl font-bold mb-2">{percentage}%</div>
                    <div className="text-xl md:text-2xl font-semibold mb-4">
                        {correctCount} из {totalQuestions} правильных
                    </div>
                    <div className="text-lg opacity-90">{grade}</div>
                    <p className="mt-3 text-sm md:text-base opacity-85 max-w-md mx-auto">
                        {gradeMessage}
                    </p>
                </div>

                {/* Кнопка подробностей */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full bg-white rounded-2xl shadow-lg p-5 mb-6 flex items-center justify-between hover:shadow-xl transition-shadow duration-200"
                >
                    <span className="font-semibold text-gray-700">
                        {showDetails ? 'Скрыть подробности' : 'Показать подробные результаты'}
                    </span>
                    <svg className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Детальный разбор */}
                {showDetails && (
                    <div className="space-y-4 mb-8">
                        {results.map((r, idx) => (
                            <div key={idx} className={`rounded-xl p-5 border-2 ${r.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                                <div className="flex items-start gap-3 mb-2">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${r.isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {r.isCorrect ? <CheckCircle className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />}
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-500">Вопрос {idx + 1}</span>
                                        <h3 className="font-semibold text-gray-800">{r.question.text}</h3>
                                    </div>
                                </div>
                                <div className="ml-10 space-y-1 text-sm">
                                    <p>Ваш ответ: <span className={r.isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium'}>
                                        {r.userAnswer.length > 0 ? r.userAnswer.map(i => r.question.options[i]).join(', ') : 'Нет ответа'}
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

                {/* Кнопка заново */}
                <button
                    onClick={onRetry}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <RotateCcw className="w-5 h-5" /> Пройти тест заново
                </button>
            </div>
        </div>
    );
}