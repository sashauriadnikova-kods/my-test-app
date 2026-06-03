import React from 'react';

const KittyObserver = ({ mood = 'neutral', size = 'medium' }) => {
  const sizeStyles = {
    small: 'w-20 h-20',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const moodConfig = {
    greeting: { bgColor: 'from-pink-200 to-purple-200', blush: true, emoji: '🎉' },
    happy: { bgColor: 'from-yellow-200 to-pink-200', blush: true, emoji: '😊' },
    excited: { bgColor: 'from-yellow-300 to-orange-200', blush: true, emoji: '🤩' },
    thinking: { bgColor: 'from-blue-200 to-purple-200', blush: false, emoji: '🤔' },
    worried: { bgColor: 'from-orange-200 to-red-200', blush: false, emoji: '😟' },
    sad: { bgColor: 'from-blue-200 to-slate-300', blush: false, emoji: '😢' },
    neutral: { bgColor: 'from-gray-200 to-purple-200', blush: false, emoji: '👀' },
    crying: { bgColor: 'from-blue-300 to-slate-400', blush: false, emoji: '😿' },
  };

  const config = moodConfig[mood] || moodConfig.neutral;

  return (
    <div className={`fixed top-4 left-4 z-50 ${sizeStyles[size]} pointer-events-none`}>
      <div className="relative w-full h-full" style={{ animation: 'float 3s ease-in-out infinite' }}>
        <div className={`absolute inset-0 bg-gradient-to-br ${config.bgColor} rounded-full blur-xl opacity-60`} style={{ animation: 'pulse 2s ease-in-out infinite' }} />
        
        {/* Реалистичный SVG котик */}
        <svg viewBox="0 0 100 100" className="relative w-full h-full drop-shadow-lg">
          {/* Тело */}
          <ellipse cx="50" cy="75" rx="25" ry="18" fill="#FFE5B4" stroke="#D4A574" strokeWidth="1.5" />
          
          {/* Хвост */}
          <path
            d="M 72 75 Q 85 65 90 78 Q 92 85 85 82"
            fill="#FFE5B4"
            stroke="#D4A574"
            strokeWidth="1.5"
            style={{ animation: 'wag 2s ease-in-out infinite', transformOrigin: 'left center' }}
          />
          
          {/* Голова */}
          <circle cx="50" cy="50" r="25" fill="#FFE5B4" stroke="#D4A574" strokeWidth="1.5" />
          
          {/* Уши */}
          <path d="M 28 35 L 22 15 L 38 28 Z" fill="#FFE5B4" stroke="#D4A574" strokeWidth="1.5" />
          <path d="M 72 35 L 78 15 L 62 28 Z" fill="#FFE5B4" stroke="#D4A574" strokeWidth="1.5" />
          <path d="M 30 30 L 26 20 L 36 28 Z" fill="#FFB6C1" />
          <path d="M 70 30 L 74 20 L 64 28 Z" fill="#FFB6C1" />
          
          {/* Полоски на голове */}
          <path d="M 40 28 Q 50 22 60 28" stroke="#D4A574" strokeWidth="1.5" fill="none" />
          <path d="M 42 35 Q 50 30 58 35" stroke="#D4A574" strokeWidth="1.5" fill="none" />
          
          {/* Глаза */}
          {mood === 'excited' ? (
            <>
              <path d="M 38 48 Q 42 42 46 48" stroke="#4A3728" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 54 48 Q 58 42 62 48" stroke="#4A3728" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </>
          ) : mood === 'sad' || mood === 'crying' ? (
            <>
              <ellipse cx="41" cy="48" rx="3.5" ry="5" fill="#4A3728" />
              <ellipse cx="59" cy="48" rx="3.5" ry="5" fill="#4A3728" />
              {/* Блик в глазах */}
              <circle cx="42" cy="46" r="1.5" fill="white" opacity="0.8" />
              <circle cx="60" cy="46" r="1.5" fill="white" opacity="0.8" />
              {/* Слезы */}
              {mood === 'crying' && (
                <>
                  <path d="M 41 54 Q 38 62 41 65" stroke="#87CEEB" strokeWidth="2" fill="none" style={{ animation: 'tear 1.5s ease-in infinite' }} />
                  <path d="M 59 54 Q 62 62 59 65" stroke="#87CEEB" strokeWidth="2" fill="none" style={{ animation: 'tear 1.5s ease-in infinite 0.3s' }} />
                </>
              )}
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="41" cy="48" r="4" fill="#4A3728" />
              <circle cx="38" cy="45" r="1.5" fill="white" />
              <circle cx="59" cy="46" r="4" fill="#4A3728" />
              <circle cx="56" cy="43" r="1.5" fill="white" />
              {/* Брови */}
              <path d="M 36 42 Q 41 40 45 42" stroke="#4A3728" strokeWidth="1.5" fill="none" />
              <path d="M 55 43 Q 59 41 63 43" stroke="#4A3728" strokeWidth="1.5" fill="none" />
            </>
          ) : (
            <>
              <circle cx="41" cy="48" r="4" fill="#4A3728" />
              <circle cx="39" cy="45" r="1.5" fill="white" />
              <circle cx="59" cy="48" r="4" fill="#4A3728" />
              <circle cx="57" cy="45" r="1.5" fill="white" />
            </>
          )}
          
          {/* Нос */}
          <path d="M 47 55 L 53 55 L 50 58 Z" fill="#FFB6C1" stroke="#D4A574" strokeWidth="0.8" />
          
          {/* Рот */}
          {mood === 'happy' || mood === 'excited' ? (
            <path d="M 45 60 Q 50 66 55 60" stroke="#4A3728" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          ) : mood === 'sad' || mood === 'crying' ? (
            <path d="M 45 62 Q 50 58 55 62" stroke="#4A3728" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 46 60 L 54 60" stroke="#4A3728" strokeWidth="1.5" strokeLinecap="round" />
          )}
          
          {/* Румянец */}
          {config.blush && (
            <>
              <circle cx="32" cy="55" r="4" fill="#FFB6C1" opacity="0.5" />
              <circle cx="68" cy="55" r="4" fill="#FFB6C1" opacity="0.5" />
            </>
          )}
          
          {/* Усы */}
          <line x1="20" y1="57" x2="35" y2="59" stroke="#D4A574" strokeWidth="1" />
          <line x1="20" y1="62" x2="35" y2="62" stroke="#D4A574" strokeWidth="1" />
          <line x1="80" y1="57" x2="65" y2="59" stroke="#D4A574" strokeWidth="1" />
          <line x1="80" y1="62" x2="65" y2="62" stroke="#D4A574" strokeWidth="1" />
        </svg>
        
        <div className="absolute -bottom-1 left-1/2 text-xs bg-white/90 backdrop-blur px-2 py-1 rounded-full border border-purple-200 whitespace-nowrap font-medium text-gray-700 shadow-sm" style={{ transform: 'translateX(-50%)' }}>
          {mood === 'greeting' && 'Привет! 🎉'}
          {mood === 'happy' && 'Отлично! 😊'}
          {mood === 'excited' && 'Супер! 🤩'}
          {mood === 'thinking' && 'Хмм... 🤔'}
          {mood === 'worried' && 'Ой-ой 😟'}
          {mood === 'sad' && 'Не грусти 💙'}
          {mood === 'crying' && 'Всё будет хорошо!'}
          {mood === 'neutral' && 'Наблюдаю... 👀'}
        </div>
      </div>
    </div>
  );
};

export default KittyObserver;