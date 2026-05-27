// src/components/QuestionCard.jsx
import React from 'react';
import { IMAGE_PATHS } from '../data/questions';
import { AlertCircle } from 'lucide-react';

export default function QuestionCard({ question, selectedAnswers, onToggle, questionNumber }) {
  const isMultiple = question.type === 'multiple';

  const renderQuestionImage = () => {
    if (!question.imageKey) return null;
    const src = IMAGE_PATHS[question.imageKey];
    if (!src) return null;
    return (
      <div className="w-full mb-6 bg-gray-50 rounded-xl p-3 flex justify-center border border-gray-100 overflow-hidden">
        <img src={src} alt="Визуализация" className="max-w-full h-auto max-h-72 object-contain rounded-lg" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-start gap-3 mb-4">
        <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white ${isMultiple ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-indigo-500 to-blue-500'}`}>
          {questionNumber}
        </span>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed">{question.text}</h2>
      </div>
      
      {renderQuestionImage()}

      <div className="space-y-3">
        {question.options.map((opt, idx) => {
          const optionData = typeof opt === 'string' ? { text: opt } : opt;
          const isSelected = selectedAnswers.includes(idx);
          const optionImageSrc = optionData.image ? IMAGE_PATHS[optionData.image] : null;

          return (
            <button key={idx} onClick={() => onToggle(idx, isMultiple)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-start gap-2 group ${isSelected ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}>
              
              <div className="flex items-center gap-3 w-full">
                <div className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${isMultiple ? 'rounded-lg' : 'rounded-full'} ${isSelected ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 group-hover:border-indigo-400'}`}>
                  {isSelected && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-base flex-grow ${isSelected ? 'text-indigo-700 font-medium' : 'text-gray-700'}`}>{optionData.text}</span>
              </div>

              {optionImageSrc && (
                <div className="w-full mt-1 border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <img src={optionImageSrc} alt={`График ${optionData.text}`} className="w-full h-auto max-h-32 object-contain" />
                </div>
              )}
            </button>
          );
        })}
      </div>
      {isMultiple && <p className="text-sm text-gray-400 mt-4 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Выберите все правильные ответы</p>}
    </div>
  );
}