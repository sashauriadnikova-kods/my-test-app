// src/components/ProgressBar.jsx
import React from 'react';
import { formatTime } from '../utils/helpers';

export default function ProgressBar({ current, total, timeLeft, isWarning }) {
  const percent = ((current + 1) / total) * 100;
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
        <span>Вопрос {current + 1} из {total}</span>
        <span className={`font-mono text-lg font-bold ${isWarning ? 'text-red-600 animate-pulse' : 'text-indigo-600'}`}>
          ⏱ {formatTime(timeLeft)}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" 
          style={{ width: `${percent}%` }} 
        />
      </div>
    </div>
  );
}