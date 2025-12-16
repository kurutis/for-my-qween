'use client';

import { motion } from 'framer-motion';
import { Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const nailArtWorks = [
  {
    id: 1,
    image: '/nails/1.jpg',
    title: 'Работа 1',
    description: 'Современный стиль с геометрическими элементами'
  },
  {
    id: 2,
    image: '/nails/2.jpg',
    title: 'Работа 2',
    description: 'Элегантный дизайн с нежными акцентами'
  },
  {
    id: 3,
    image: '/nails/3.jpg',
    title: 'Работа 3',
    description: 'Вечерний образ с блестящими деталями'
  },
  {
    id: 4,
    image: '/nails/4.jpg',
    title: 'Работа 4',
    description: 'Яркий и выразительный дизайн'
  }
];

export default function SimpleNailGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % nailArtWorks.length);
    setIsLoading(true);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + nailArtWorks.length) % nailArtWorks.length);
    setIsLoading(true);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setIsLoading(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      
      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30">
        {/* Заголовок */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-pink-400">Галерея работ</h3>
            <p className="text-white/60">Персональная коллекция маникюра</p>
          </div>
        </div>

        {/* Основная фотография */}
        <div className="mb-6">
          <div className="relative aspect-square max-w-2xl mx-auto bg-black/50 rounded-xl overflow-hidden border border-white/10">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-12 h-12 border-3 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Используем обычный img для простоты */}
            <img
              src={nailArtWorks[currentIndex].image}
              alt={nailArtWorks[currentIndex].title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsLoading(false)}
            />
            
            {/* Навигационные кнопки */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            
            {/* Номер работы */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
              <span className="text-sm text-white">
                {currentIndex + 1} / {nailArtWorks.length}
              </span>
            </div>
          </div>
          
          {/* Описание текущей работы */}
          <div className="mt-4 text-center">
            <h4 className="text-lg font-semibold text-white mb-1">
              {nailArtWorks[currentIndex].title}
            </h4>
            <p className="text-white/60">
              {nailArtWorks[currentIndex].description}
            </p>
          </div>
        </div>

        {/* Миниатюры */}
        <div className="mt-8">
          <div className="grid grid-cols-4 gap-3">
            {nailArtWorks.map((work, index) => (
              <motion.button
                key={work.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToImage(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? 'border-pink-500'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Индикатор активной миниатюры */}
                {currentIndex === index && (
                  <div className="absolute inset-0 bg-pink-500/20 border-2 border-pink-500"></div>
                )}
                
                {/* Номер на миниатюре */}
                <div className={`absolute top-1.5 left-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  currentIndex === index
                    ? 'bg-pink-500 text-white'
                    : 'bg-black/60 text-white/90'
                }`}>
                  {index + 1}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Простое описание */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-sm text-white/60 text-center">
            Каждая работа — это уникальное сочетание вдохновения и мастерства. 
            Просто, элегантно, с душой.
          </p>
        </div>
      </div>
    </motion.div>
  );
}