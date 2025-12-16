'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const featuredPhotos = [
  {
    src: '/images/daria/childhood/0.jpg',
    title: 'Начало пути',
    year: '2005',
    category: 'childhood',
  },
  {
    src: '/images/daria/teenage/3.jpg',
    title: 'Первые творения',
    year: '2014',
    category: 'teenage',
  },
  {
    src: '/images/daria/adult/0.jpg',
    title: 'Современный взгляд',
    year: '2023',
    category: 'adult',
  },
  {
    src: '/images/daria/childhood/5.jpg',
    title: 'Игры детства',
    year: '2008',
    category: 'childhood',
  },
  {
    src: '/images/daria/teenage/7.jpg',
    title: 'Поиск стиля',
    year: '2016',
    category: 'teenage',
  },
  {
    src: '/images/daria/adult/3.jpg',
    title: 'Профессионал',
    year: '2024',
    category: 'adult',
  },
];

export default function HeroPhotoCollage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  // Автопрокрутка
  // useEffect(() => {
  //   if (!isPlaying) return;
    
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % featuredPhotos.length);
  //   }, 4000);
    
  //   return () => clearInterval(interval);
  // }, [isPlaying]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredPhotos.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredPhotos.length) % featuredPhotos.length);
  };

  const getPhotoStyle = (index: number) => {
    const distance = (index - currentIndex + featuredPhotos.length) % featuredPhotos.length;
    
    if (distance === 0) {
      return {
        scale: 1,
        opacity: 1,
        zIndex: 30,
        rotate: 0,
      };
    } else if (distance === 1 || distance === featuredPhotos.length - 1) {
      return {
        scale: 0.85,
        opacity: 0.7,
        zIndex: 20,
        rotate: distance === 1 ? 5 : -5,
      };
    } else if (distance === 2 || distance === featuredPhotos.length - 2) {
      return {
        scale: 0.7,
        opacity: 0.4,
        zIndex: 10,
        rotate: distance === 2 ? 8 : -8,
      };
    } else {
      return {
        scale: 0.5,
        opacity: 0.2,
        zIndex: 0,
        rotate: 0,
      };
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80" />
      
      {/* Вращающийся коллаж */}
      <div className="relative w-full max-w-6xl h-96 md:h-[500px]">
        {featuredPhotos.map((photo, index) => {
          const style = getPhotoStyle(index);
          const distance = (index - currentIndex + featuredPhotos.length) % featuredPhotos.length;
          
          return (
            <motion.div
              key={index}
              initial={false}
              animate={{
                x: distance === 0 ? 0 : 
                    distance <= featuredPhotos.length / 2 ? 300 : -300,
                y: distance === 0 ? 0 : 100,
                scale: style.scale,
                opacity: style.opacity,
                rotate: style.rotate,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-80 md:w-80 md:h-96"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                {/* Фото */}
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                />
                
                {/* Градиентная маска */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Подпись */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{photo.title}</h3>
                      <p className="text-white/70 text-sm">{photo.year}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      photo.category === 'childhood' ? 'bg-blue-500/30 text-blue-300' :
                      photo.category === 'teenage' ? 'bg-purple-500/30 text-purple-300' :
                      'bg-rose-500/30 text-rose-300'
                    }`}>
                      {photo.category === 'childhood' ? 'Детство' :
                       photo.category === 'teenage' ? 'Отрочество' : 'Современность'}
                    </div>
                  </div>
                </div>
                
                {/* Эффект выбранного фото */}
                {distance === 0 && (
                  <div className="absolute inset-0 border-2 border-white/30 rounded-2xl" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Элементы управления */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button
          onClick={goToPrev}
          className="p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
        >
          <SkipBack className="w-5 h-5 text-white" />
        </button>
        
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-4 rounded-full bg-phoenix-red hover:bg-phoenix-red/80 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>
        
        <button
          onClick={goToNext}
          className="p-3 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
        >
          <SkipForward className="w-5 h-5 text-white" />
        </button>
      </div>
      
      {/* Индикатор прогресса */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredPhotos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-6 bg-phoenix-red' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Текстовая информация */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-phoenix-red to-lily-gold bg-clip-text text-transparent">
            Фотопортрет через годы
          </span>
        </h2>
        <p className="text-white/70 max-w-md mx-auto">
          Прокрутите, чтобы увидеть трансформацию от детской невинности к творческой зрелости
        </p>
      </div>
    </div>
  );
}