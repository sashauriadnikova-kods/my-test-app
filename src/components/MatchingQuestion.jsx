import React, { useState } from 'react';

export default function MatchingQuestion({ question, userMatches, onMatch, questionNumber }) {
  const [selectedLeft, setSelectedLeft] = useState(null);

  const handleLeftClick = (id) => setSelectedLeft(selectedLeft === id ? null : id);
  const handleRightClick = (id) => { if (selectedLeft) { onMatch(question.id, selectedLeft, id); setSelectedLeft(null); } };

  const isMatchedLeft = (id) => Object.values(userMatches[question.id] || {}).includes(id);
  const isMatchedRight = (id) => Object.entries(userMatches[question.id] || {}).some(([, val]) => val === id);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white bg-gradient-to-br from-purple-500 to-pink-500">{questionNumber}</span>
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">{question.text}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Элементы:</h3>
          {question.leftItems.map(item => (
            <button key={item.id} onClick={() => handleLeftClick(item.id)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm ${selectedLeft === item.id ? 'border-purple-500 bg-purple-50' : isMatchedLeft(item.id) ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-purple-300'}`}>
              {item.text}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Соответствия:</h3>
          {question.rightItems.map(item => (
            <button key={item.id} onClick={() => handleRightClick(item.id)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all text-sm ${isMatchedRight(item.id) ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-purple-300'}`}>
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}