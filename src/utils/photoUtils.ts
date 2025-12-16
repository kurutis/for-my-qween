// Утилиты для работы с фото
export const getRandomPhoto = (category: 'childhood' | 'teenage' | 'adult', usedIndices: Set<number>) => {
  const maxPhotos = category === 'childhood' ? 10 : 
                    category === 'teenage' ? 10 : 7;
  
  // Получаем доступные индексы
  const availableIndices = Array.from({ length: maxPhotos }, (_, i) => i)
    .filter(i => !usedIndices.has(i));
  
  // Если все фото использованы, сбрасываем
  if (availableIndices.length === 0) {
    usedIndices.clear();
    return {
      src: `/images/daria/${category}/${Math.floor(Math.random() * maxPhotos)}.jpg`,
      index: Math.floor(Math.random() * maxPhotos)
    };
  }
  
  // Выбираем случайное доступное фото
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  usedIndices.add(randomIndex);
  
  return {
    src: `/images/daria/${category}/${randomIndex}.jpg`,
    index: randomIndex
  };
};

export const getCategoryByYear = (year: number): 'childhood' | 'teenage' | 'adult' => {
  if (year <= 2011) return 'childhood';
  if (year <= 2017) return 'teenage';
  return 'adult';
};

// Предопределенный порядок фото для таймлайна (чтобы избежать повторений)
export const getTimelinePhoto = (year: number, index: number) => {
  const category = getCategoryByYear(year);
  const maxPhotos = category === 'childhood' ? 10 : 
                    category === 'teenage' ? 10 : 7;
  
  // Используем индекс года для выбора фото (детерминировано)
  const photoIndex = (year * 13 + index) % maxPhotos; // Простая хэш-функция
  
  return `/images/daria/${category}/${photoIndex}.jpg`;
};