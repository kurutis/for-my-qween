'use client';

import { useEffect, useState } from 'react';
import { preloadImages } from '@/utils/imageUtils';

const allImageUrls = [
  // Детские фото
  ...Array.from({ length: 10 }, (_, i) => `/images/daria/childhood/${i}.jpg`),
  // Подростковые фото
  ...Array.from({ length: 10 }, (_, i) => `/images/daria/teenage/${i}.jpg`),
  // Взрослые фото
  ...Array.from({ length: 7 }, (_, i) => `/images/daria/adult/${i}.jpg`),
];

export default function ImagePreloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        preloadImages(allImageUrls);
        // Даем время на загрузку
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
        setLoaded(true); // Все равно продолжаем
      }
    };

    loadImages();
  }, []);

  if (loaded) return null;

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/30 border-t-phoenix-red rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="text-white/70">Загружаем фотографии...</p>
      </div>
    </div>
  );
}