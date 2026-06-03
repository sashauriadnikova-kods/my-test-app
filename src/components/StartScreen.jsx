import React from 'react';
import { Play } from 'lucide-react';
import KittyObserver from './KittyObserver';

export default function StartScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Котик приветствует */}
      <KittyObserver mood="greeting" size="medium" />
      
      {/* Декоративные круги */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70" style={{ animation: 'pulse 3s ease-in-out infinite' }} />
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70" style={{ animation: 'pulse 4s ease-in-out infinite' }} />
      
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center relative z-10">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Тестирование знаний</h1>
        <p className="text-gray-500 mb-8 text-lg">Комплексный тест из 50 вопросов • 40 минут</p>
        <div className="flex flex-wrap justify-center gap-2 mb-8 text-sm">
          {['ТАУ: 25', 'ИИ: 9', 'Электроника: 8', 'Электротехника: 4', 'Приводы: 4'].map(tag => (
            <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800" style={{ animation: 'gentle 2s ease-in-out infinite' }}>{tag}</span>
          ))}
        </div>
        <button onClick={onStart} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
          <Play className="w-5 h-5" /> Начать тест
        </button>
        <p className="text-xs text-gray-400 mt-4">С вами котик-помощник! 🐱</p>
      </div>
    </div>
  );
}