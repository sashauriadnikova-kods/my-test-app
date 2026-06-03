import React from 'react';

const KittyObserver = ({ mood = 'neutral', size = 'medium' }) => {
  const sizeStyles = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };

  const moodConfig = {
    greeting: { bgColor: 'from-pink-200 to-purple-200', mouth: 'M 35 50 Q 40 58 45 50', blush: true },
    happy: { bgColor: 'from-yellow-200 to-pink-200', mouth: 'M 32 48 Q 40 58 48 48', blush: true },
    excited: { bgColor: 'from-yellow-300 to-orange-200', mouth: 'M 32 46 Q 40 60 48 46', blush: true },
    thinking: { bgColor: 'from-blue-200 to-purple-200', mouth: 'M 36 50 L 44 50', blush: false },
    worried: { bgColor: 'from-orange-200 to-red-200', mouth: 'M 34 52 Q 40 46 46 52', blush: false },
    sad: { bgColor: 'from-blue-200 to-slate-300', mouth: 'M 34 54 Q 40 48 46 54', blush: false },
    neutral: { bgColor: 'from-gray-200 to-purple-200', mouth: 'M 36 50 L 44 50', blush: false },
    crying: { bgColor: 'from-blue-300 to-slate-400', mouth: 'M 34 54 Q 40 46 46 54', blush: false },
  };

  const config = moodConfig[mood] || moodConfig.neutral;

  return (
    <div className={`fixed top-4 left-4 z-50 ${sizeStyles[size]} pointer-events-none`}>
      <div className="relative w-full h-full" style={{ animation: 'float 3s ease-in-out infinite' }}>
        <div className={`absolute inset-0 bg-gradient-to-br ${config.bgColor} rounded-full blur-xl opacity-60`} style={{ animation: 'pulse 2s ease-in-out infinite' }} />
        
        <svg viewBox="0 0 80 80" className="relative w-full h-full" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
          <ellipse cx="40" cy="62" rx="22" ry="16" fill="#FFE5B4" stroke="#D4A574" strokeWidth="1.5" />
          <path d="M 58 62 Q 68 55 72 65 Q 74 72 68 70" fill="#FFE5B4" stroke="#D4A574" strokeWidth="1.5" style={{ animation: 'wag 2s ease-in-out infinite', transformOrigin: 'left' }} />
          <circle cx="40" cy="40" r="22" fill="#FFE5B4" stroke="#D4A574" strokeWidth="1.5" />
          <path d="M 22 28 L 18 12 L 32 22 Z" fill="#FFE5B4" stroke="#D4A574" strokeWidth="1.5" />
          <path d="M 58 28 L 62 12 L 48 22 Z" fill="#FFE5B4" stroke="#D4A574" strokeWidth="1.5" />
          <path d="M 24 24 L 22 16 L 30 22 Z" fill="#FFB6C1" />
          <path d="M 56 24 L 58 16 L 50 22 Z" fill="#FFB6C1" />
          <path d="M 32 22 Q 40 18 48 22" stroke="#D4A574" strokeWidth="1.2" fill="none" />
          <path d="M 34 28 Q 40 25 46 28" stroke="#D4A574" strokeWidth="1.2" fill="none" />
          
          {mood === 'excited' ? (
            <>
              <path d="M 30 38 Q 33 34 36 38" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M 44 38 Q 47 34 50 38" stroke="#4A3728" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          ) : mood === 'sad' || mood === 'crying' ? (
            <>
              <ellipse cx="33" cy="39" rx="3" ry="4" fill="#4A3728" />
              <ellipse cx="47" cy="39" rx="3" ry="4" fill="#4A3728" />
              {mood === 'crying' && (
                <>
                  <path d="M 33 44 Q 31 50 33 52" stroke="#87CEEB" strokeWidth="2" fill="none" style={{ animation: 'tear 1.5s ease-in infinite' }} />
                  <path d="M 47 44 Q 49 50 47 52" stroke="#87CEEB" strokeWidth="2" fill="none" style={{ animation: 'tear 1.5s ease-in infinite' }} />
                </>
              )}
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="33" cy="39" r="3.5" fill="#4A3728" />
              <circle cx="30" cy="37" r="1.2" fill="white" />
              <circle cx="47" cy="37" r="3.5" fill="#4A3728" />
              <circle cx="44" cy="35" r="1.2" fill="white" />
            </>
          ) : (
            <>
              <circle cx="33" cy="39" r="3.5" fill="#4A3728" />
              <circle cx="31" cy="37" r="1.2" fill="white" />
              <circle cx="47" cy="39" r="3.5" fill="#4A3728" />
              <circle cx="45" cy="37" r="1.2" fill="white" />
            </>
          )}
          
          <path d="M 38 45 L 42 45 L 40 47 Z" fill="#FFB6C1" stroke="#D4A574" strokeWidth="0.8" />
          <path d={config.mouth} stroke="#4A3728" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          
          {config.blush && (
            <>
              <circle cx="26" cy="45" r="3" fill="#FFB6C1" opacity="0.6" />
              <circle cx="54" cy="45" r="3" fill="#FFB6C1" opacity="0.6" />
            </>
          )}
          
          <line x1="15" y1="47" x2="30" y2="49" stroke="#D4A574" strokeWidth="0.8" />
          <line x1="15" y1="51" x2="30" y2="51" stroke="#D4A574" strokeWidth="0.8" />
          <line x1="65" y1="47" x2="50" y2="49" stroke="#D4A574" strokeWidth="0.8" />
          <line x1="65" y1="51" x2="50" y2="51" stroke="#D4A574" strokeWidth="0.8" />
        </svg>
        
        <div className="absolute -bottom-2 left-1/2 text-xs bg-white/80 backdrop-blur px-2 py-0.5 rounded-full border border-purple-200 whitespace-nowrap" style={{ transform: 'translateX(-50%)' }}>
          {mood === 'greeting' && 'Привет! 🎉'}
          {mood === 'happy' && 'Отлично! 😊'}
          {mood === 'excited' && 'Супер! 🎊'}
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