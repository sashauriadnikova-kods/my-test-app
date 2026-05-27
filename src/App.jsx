import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import TestScreen from './components/TestScreen';
import ResultsScreen from './components/ResultsScreen';
import { shuffleArray } from './utils/helpers';
import { SECTION_TAU, SECTION_AI, SECTION_ELEC, SECTION_TECH, SECTION_DRIVE, MATCHING_QUESTIONS } from './data/questions';

export default function App() {
  const [screen, setScreen] = useState('start');
  const [questions, setQuestions] = useState([]);
  const [matchingQuestions, setMatchingQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [userMatches, setUserMatches] = useState({});

  const generateTest = useCallback(() => {
    const tau = shuffleArray(SECTION_TAU).slice(0, 25);
    const ai = shuffleArray(SECTION_AI).slice(0, 9);
    const elec = shuffleArray(SECTION_ELEC).slice(0, 8);
    const tech = shuffleArray(SECTION_TECH).slice(0, 4);
    const drive = shuffleArray(SECTION_DRIVE).slice(0, 4);
    return {
      standard: shuffleArray([...tau, ...ai, ...elec, ...tech, ...drive]),
      matching: shuffleArray(MATCHING_QUESTIONS)
    };
  }, []);

  const handleStart = () => {
    const test = generateTest();
    setQuestions(test.standard);
    setMatchingQuestions(test.matching);
    setQuestionIndex(0);
    setUserAnswers({});
    setUserMatches({});
    setScreen('test');
  };

  if (screen === 'start') return <StartScreen onStart={handleStart} />;
  if (screen === 'test') return <TestScreen questions={questions} matchingQuestions={matchingQuestions} onFinish={() => setScreen('results')} questionIndex={questionIndex} setQuestionIndex={setQuestionIndex} userAnswers={userAnswers} setUserAnswers={setUserAnswers} userMatches={userMatches} setUserMatches={setUserMatches} />;
  return <ResultsScreen questions={questions} userAnswers={userAnswers} matchingQuestions={matchingQuestions} userMatches={userMatches} onRetry={() => setScreen('start')} />;
}