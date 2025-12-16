'use client';

import { useEffect, useState } from 'react';

interface Star {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  path: 'fly' | 'orbit' | 'shooting';
  color: string;
}

interface Petal {
  id: number;
  left: number;
  top: number;
  rotation: number;
  duration: number;
  delay: number;
}

interface PhoenixParticle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

interface StaticStar {
  id: number;
  left: number;
  top: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

// Предопределенные данные для избежания различий в генерации
const PREDEFINED_STARS: Star[] = [
  { id: 0, left: 46.85, top: 11.08, size: 2.45, duration: 20.02, delay: 6.81, path: 'fly', color: '#ffffff' },
  { id: 1, left: 9.10, top: 41.24, size: 3.83, duration: 10.03, delay: 13.84, path: 'shooting', color: '#ffffff' },
  { id: 2, left: 95.58, top: 2.08, size: 1.24, duration: 8.30, delay: 1.23, path: 'orbit', color: '#ffffff' },
  { id: 3, left: 95.89, top: 97.36, size: 1.25, duration: 20.12, delay: 7.03, path: 'orbit', color: '#ffffff' },
  { id: 4, left: 12.51, top: 91.86, size: 3.87, duration: 5.73, delay: 11.34, path: 'shooting', color: '#ffffff' },
  { id: 5, left: 39.83, top: 57.49, size: 2.35, duration: 8.24, delay: 1.56, path: 'fly', color: '#ffffff' },
  { id: 6, left: 23.45, top: 78.12, size: 3.12, duration: 15.45, delay: 3.21, path: 'fly', color: '#7ee2ff' },
  { id: 7, left: 67.89, top: 34.56, size: 1.89, duration: 12.34, delay: 4.56, path: 'orbit', color: '#ff6b9d' },
  { id: 8, left: 5.67, top: 12.34, size: 2.67, duration: 18.90, delay: 2.34, path: 'fly', color: '#ffde59' },
  { id: 9, left: 88.12, top: 65.43, size: 3.45, duration: 7.89, delay: 8.90, path: 'shooting', color: '#a8ff78' },
  { id: 10, left: 32.10, top: 45.67, size: 1.56, duration: 14.23, delay: 5.67, path: 'orbit', color: '#ffffff' },
  { id: 11, left: 71.23, top: 89.01, size: 2.89, duration: 9.87, delay: 6.54, path: 'fly', color: '#7ee2ff' },
  { id: 12, left: 15.78, top: 23.45, size: 3.34, duration: 16.78, delay: 1.89, path: 'shooting', color: '#ff6b9d' },
  { id: 13, left: 54.32, top: 67.89, size: 1.23, duration: 11.23, delay: 7.65, path: 'orbit', color: '#ffde59' },
  { id: 14, left: 92.34, top: 78.90, size: 2.78, duration: 13.45, delay: 3.45, path: 'fly', color: '#a8ff78' },
  { id: 15, left: 28.90, top: 56.78, size: 3.01, duration: 8.90, delay: 9.01, path: 'shooting', color: '#ffffff' },
  { id: 16, left: 61.23, top: 34.56, size: 1.67, duration: 17.89, delay: 2.78, path: 'orbit', color: '#7ee2ff' },
  { id: 17, left: 43.21, top: 89.01, size: 2.34, duration: 10.12, delay: 5.34, path: 'fly', color: '#ff6b9d' },
  { id: 18, left: 76.54, top: 12.34, size: 3.56, duration: 14.56, delay: 6.78, path: 'shooting', color: '#ffde59' },
  { id: 19, left: 19.87, top: 67.89, size: 1.89, duration: 12.34, delay: 4.23, path: 'orbit', color: '#a8ff78' },
];

const PREDEFINED_PETALS: Petal[] = [
  { id: 0, left: 84.65, top: 68.68, rotation: 345.89, duration: 6.49, delay: 2.90 },
  { id: 1, left: 23.45, top: 12.34, rotation: 45.67, duration: 5.12, delay: 1.23 },
  { id: 2, left: 56.78, top: 89.01, rotation: 123.45, duration: 7.89, delay: 3.45 },
  { id: 3, left: 12.34, top: 45.67, rotation: 267.89, duration: 4.56, delay: 0.78 },
  { id: 4, left: 78.90, top: 23.45, rotation: 89.01, duration: 8.90, delay: 4.12 },
  { id: 5, left: 34.56, top: 67.89, rotation: 156.78, duration: 6.78, delay: 2.34 },
  { id: 6, left: 67.89, top: 34.56, rotation: 298.12, duration: 5.45, delay: 1.67 },
  { id: 7, left: 45.67, top: 78.90, rotation: 67.89, duration: 7.12, delay: 3.01 },
  { id: 8, left: 89.01, top: 56.78, rotation: 189.23, duration: 8.34, delay: 4.56 },
  { id: 9, left: 23.45, top: 89.01, rotation: 345.67, duration: 6.90, delay: 2.78 },
];

const PREDEFINED_PHOENIX_PARTICLES: PhoenixParticle[] = [
  { id: 0, left: 20.13, top: 21.34, size: 8.00, duration: 4.13, delay: 1.64 },
  { id: 1, left: 65.43, top: 78.90, size: 5.67, duration: 7.89, delay: 2.34 },
  { id: 2, left: 34.56, top: 45.67, size: 6.78, duration: 5.12, delay: 3.45 },
  { id: 3, left: 89.01, top: 12.34, size: 7.23, duration: 6.78, delay: 1.23 },
  { id: 4, left: 12.34, top: 67.89, size: 4.56, duration: 8.90, delay: 4.56 },
  { id: 5, left: 56.78, top: 34.56, size: 5.89, duration: 5.67, delay: 2.90 },
  { id: 6, left: 78.90, top: 89.01, size: 6.12, duration: 7.34, delay: 3.12 },
  { id: 7, left: 23.45, top: 56.78, size: 7.45, duration: 6.45, delay: 1.89 },
  { id: 8, left: 67.89, top: 23.45, size: 5.23, duration: 8.12, delay: 4.23 },
  { id: 9, left: 45.67, top: 78.90, size: 6.78, duration: 5.89, delay: 2.67 },
];

const PREDEFINED_STATIC_STARS: StaticStar[] = [
  { id: 0, left: 25.67, top: 12.34, size: 1.23, opacity: 0.5, delay: 0.1, duration: 2.0 },
  { id: 1, left: 67.89, top: 45.67, size: 0.89, opacity: 0.7, delay: 0.3, duration: 3.0 },
  { id: 2, left: 12.34, top: 78.90, size: 1.56, opacity: 0.4, delay: 0.5, duration: 1.5 },
  { id: 3, left: 89.01, top: 34.56, size: 1.01, opacity: 0.8, delay: 0.2, duration: 2.5 },
  { id: 4, left: 34.56, top: 67.89, size: 0.67, opacity: 0.6, delay: 0.4, duration: 2.8 },
  { id: 5, left: 56.78, top: 23.45, size: 1.34, opacity: 0.3, delay: 0.6, duration: 1.8 },
  { id: 6, left: 78.90, top: 89.01, size: 0.78, opacity: 0.9, delay: 0.7, duration: 3.2 },
  { id: 7, left: 45.67, top: 12.34, size: 1.12, opacity: 0.5, delay: 0.9, duration: 2.2 },
  { id: 8, left: 23.45, top: 56.78, size: 0.95, opacity: 0.7, delay: 1.0, duration: 2.7 },
  { id: 9, left: 67.89, top: 78.90, size: 1.45, opacity: 0.4, delay: 1.2, duration: 1.9 },
];

export default function BackgroundEffects() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // На сервере не рендерим ничего сложного
  if (!isClient) {
    return (
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Только статичный фон на сервере */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-900/5 rounded-full blur-3xl"></div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Основные фоновые градиенты */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-900/5 rounded-full blur-3xl"></div>
      
      {/* Летающие звезды */}
      {PREDEFINED_STARS.map((star) => {
        let animation = '';
        let additionalStyles: React.CSSProperties = {};
        
        switch (star.path) {
          case 'fly':
            animation = `fly-star ${star.duration}s linear infinite`;
            additionalStyles = {
              animationDelay: `${star.delay}s`,
            };
            break;
          case 'orbit':
            animation = `orbit ${star.duration}s linear infinite`;
            additionalStyles = {
              animationDelay: `${star.delay}s`,
              transformOrigin: 'center',
            };
            break;
          case 'shooting':
            animation = `shooting-star ${star.duration * 0.5}s ease-out infinite`;
            additionalStyles = {
              animationDelay: `${star.delay * 2}s`,
            };
            break;
        }
        
        return (
          <div
            key={`star-${star.id}`}
            className={`absolute rounded-full ${
              star.path === 'shooting' 
                ? 'bg-gradient-to-r from-transparent via-white to-transparent' 
                : ''
            }`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.path !== 'shooting' ? star.color : undefined,
              animation,
              ...additionalStyles,
            }}
          />
        );
      })}
      
      {/* Мерцающие статические звезды */}
      {PREDEFINED_STATIC_STARS.map((star) => (
        <div
          key={`static-star-${star.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
      
      {/* Быстрые лепестки лилии */}
      {PREDEFINED_PETALS.map((petal) => (
        <div
          key={`petal-${petal.id}`}
          className="absolute w-2 h-8 bg-gradient-to-b from-red-500/30 to-transparent rounded-full"
          style={{
            left: `${petal.left}%`,
            top: `${petal.top}%`,
            transform: `rotate(${petal.rotation}deg)`,
            animation: `float-fast ${petal.duration}s linear infinite`,
            animationDelay: `${petal.delay}s`
          }}
        />
      ))}
      
      {/* Парящие частицы феникса */}
      {PREDEFINED_PHOENIX_PARTICLES.map((particle) => (
        <div
          key={`phoenix-particle-${particle.id}`}
          className="absolute rounded-full bg-gradient-to-br from-phoenix-red/40 to-transparent"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float-fast ${particle.duration}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
}