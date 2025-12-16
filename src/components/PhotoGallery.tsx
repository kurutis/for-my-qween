'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

const photoCategories = [
  {
    title: 'Детство',
    period: '2005-2011',
    folder: 'childhood',
    count: 10,
    color: 'from-blue-500/20 to-purple-500/20',
  },
  {
    title: 'Отрочество',
    period: '2012-2017',
    folder: 'teenage',
    count: 10,
    color: 'from-purple-500/20 to-rose-500/20',
  },
  {
    title: 'Современность',
    period: '2018-2025',
    folder: 'adult',
    count: 7,
    color: 'from-rose-500/20 to-phoenix-red/20',
  },
];

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const getPhotosForCategory = (categoryIndex: number) => {
    const category = photoCategories[categoryIndex];
    return Array.from({ length: category.count }).map((_, i) => ({
      id: i,
      src: `/images/daria/${category.folder}/${i}.jpg`,
      caption: `${category.title} - Фото ${i + 1}`,
      year: category.period,
    }));
  };

  const photos = getPhotosForCategory(selectedCategory);

  const handlePhotoClick = (index: number) => {
    setSelectedPhoto(index);
    setCurrentPhotoIndex(index);
  };

  const handleNextPhoto = () => {
    if (selectedPhoto !== null) {
      const nextIndex = (selectedPhoto + 1) % photos.length;
      setSelectedPhoto(nextIndex);
      setCurrentPhotoIndex(nextIndex);
    }
  };

  const handlePrevPhoto = () => {
    if (selectedPhoto !== null) {
      const prevIndex = (selectedPhoto - 1 + photos.length) % photos.length;
      setSelectedPhoto(prevIndex);
      setCurrentPhotoIndex(prevIndex);
    }
  };

  const handleDownload = () => {
    if (selectedPhoto !== null) {
      const link = document.createElement('a');
      link.href = photos[currentPhotoIndex].src;
      link.download = `daria-${photoCategories[selectedCategory].folder}-${currentPhotoIndex + 1}.jpg`;
      link.click();
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-white via-phoenix-red to-lily-gold bg-clip-text text-transparent">
            Фотогалерея
          </span>
        </h2>

        {/* Категории */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {photoCategories.map((category, index) => (
            <button
              key={category.title}
              onClick={() => {
                setSelectedCategory(index);
                setSelectedPhoto(null);
              }}
              className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 ${
                selectedCategory === index
                  ? 'border-phoenix-red bg-gradient-to-br ' + category.color
                  : 'border-white/10 bg-black/30 hover:border-white/30'
              }`}
            >
              <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
              <p className="text-white/70 mb-4">{category.period}</p>
              <p className="text-sm text-white/50 mb-4">{category.count} фото</p>
              <div className="text-4xl opacity-80">
                {index === 0 && '👶'}
                {index === 1 && '👩‍🎨'}
                {index === 2 && '🌟'}
              </div>
            </button>
          ))}
        </div>

        {/* Статистика */}
        <div className="mb-8 p-4 bg-black/30 rounded-xl border border-white/10">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">10</div>
              <div className="text-sm text-white/70">Детских фото</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">10</div>
              <div className="text-sm text-white/70">Подростковых фото</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-phoenix-red">7</div>
              <div className="text-sm text-white/70">Взрослых фото</div>
            </div>
          </div>
        </div>

        {/* Галерея */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => handlePhotoClick(index)}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/0 group-hover:from-black/30 group-hover:via-black/20 group-hover:to-black/40 transition-all duration-300 z-10"></div>
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `/images/fallback/${photoCategories[selectedCategory].folder}.jpg`;
                }}
              />
              <div className="absolute bottom-2 left-2 text-xs text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Фото {index + 1}
              </div>
            </button>
          ))}
        </div>

        {/* Информация о текущей категории */}
        <div className="text-center text-white/60 text-sm">
          Показано {photos.length} фото из категории "{photoCategories[selectedCategory].title}"
        </div>

        {/* Модальное окно для просмотра фото */}
        {selectedPhoto !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleDownload}
                className="p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors z-50"
                title="Скачать фото"
              >
                <Download className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-2 bg-black/50 rounded-full hover:bg-black/80 transition-colors z-50"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <button
              onClick={handlePrevPhoto}
              className="absolute left-4 p-3 bg-black/50 rounded-full hover:bg-black/80 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={handleNextPhoto}
              className="absolute right-4 p-3 bg-black/50 rounded-full hover:bg-black/80 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="relative w-full max-w-4xl h-3/4">
              <Image
                src={photos[currentPhotoIndex].src}
                alt={photos[currentPhotoIndex].caption}
                fill
                className="object-contain"
                sizes="100vw"
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `/images/fallback/${photoCategories[selectedCategory].folder}.jpg`;
                }}
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                {photos[currentPhotoIndex].caption} • {photos[currentPhotoIndex].year}
              </div>
            </div>

            {/* Миниатюры */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    setSelectedPhoto(index);
                    setCurrentPhotoIndex(index);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    currentPhotoIndex === index
                      ? 'border-phoenix-red scale-110'
                      : 'border-transparent hover:border-white/50'
                  }`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/images/fallback/${photoCategories[selectedCategory].folder}.jpg`;
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Номер фото */}
            <div className="absolute top-4 left-4 text-white bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}