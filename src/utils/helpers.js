export const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};
export const shuffleArray = (arr) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

// Новая функция для перемешивания вариантов ответов
export const shuffleQuestionOptions = (question) => {
    // Для вопросов на соответствие не перемешиваем
    if (question.type === 'matching' || !question.options) {
        return question;
    }

    // Создаём массив индексов [0, 1, 2, 3, ...]
    const indices = question.options.map((_, i) => i);
    // Перемешиваем индексы
    const shuffledIndices = shuffleArray(indices);

    // Создаём новые варианты ответов в перемешанном порядке
    const newOptions = shuffledIndices.map(i => question.options[i]);

    // Находим новые индексы правильных ответов
    const newCorrect = shuffledIndices
        .map((oldIdx, newIdx) => question.correct.includes(oldIdx) ? newIdx : -1)
        .filter(idx => idx !== -1);

    return {
        ...question,
        options: newOptions,
        correct: newCorrect
    };
};