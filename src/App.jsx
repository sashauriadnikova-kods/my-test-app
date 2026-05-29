// src/App.jsx
import React, { useState, useCallback } from 'react';

// Импорт экранов и утилит
import StartScreen from './components/StartScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import { shuffleArray } from './utils/helpers';

// Импорт базы вопросов
import { SECTION_TAU, SECTION_AI, SECTION_ELEC, SECTION_TECH, SECTION_DRIVE, MATCHING_QUESTIONS } from './data/questions';

export default function App() {
    // Состояния приложения
    const [screen, setScreen] = useState('start');       // 'start' | 'test' | 'results'
    const [questions, setQuestions] = useState([]);       // 50 обычных вопросов
    const [matchingQuestions, setMatchingQuestions] = useState([]); // Вопросы на соответствие
    const [questionIndex, setQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});   // { [questionIndex]: [selectedOptionIndexes] }
    const [userMatches, setUserMatches] = useState({});   // { [questionId]: { leftId: rightId } }

    // Генерация теста по ТЗ
    const generateTest = useCallback(() => {
        const tau = shuffleArray(SECTION_TAU).slice(0, 25);
        const ai = shuffleArray(SECTION_AI).slice(0, 9);
        const elec = shuffleArray(SECTION_ELEC).slice(0, 8);
        const tech = shuffleArray(SECTION_TECH).slice(0, 4);
        const drive = shuffleArray(SECTION_DRIVE).slice(0, 4);

        return {
            standard: shuffleArray([...tau, ...ai, ...elec, ...tech, ...drive]), // 50 вопросов
            matching: shuffleArray(MATCHING_QUESTIONS)
        };
    }, []);

    // Начало теста
    const handleStart = () => {
        const test = generateTest();
        setQuestions(test.standard);
        setMatchingQuestions(test.matching);
        setQuestionIndex(0);
        setUserAnswers({});
        setUserMatches({});
        setScreen('test');
    };

    // Завершение теста
    const handleFinish = () => {
        setScreen('results');
    };

    // Повторная попытка
    const handleRetry = () => {
        setScreen('start');
    };

    // Рендеринг экранов
    if (screen === 'start') {
        return <StartScreen onStart={handleStart} />;
    }

    if (screen === 'test') {
        return (
            <TestScreen
                questions={questions}
                matchingQuestions={matchingQuestions}
                onFinish={handleFinish}
                questionIndex={questionIndex}
                setQuestionIndex={setQuestionIndex}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                userMatches={userMatches}
                setUserMatches={setUserMatches}
            />
        );
    }

    return (
        <ResultsScreen
            questions={questions}
            userAnswers={userAnswers}
            matchingQuestions={matchingQuestions}
            userMatches={userMatches}
            onRetry={handleRetry}
        />
    );
}