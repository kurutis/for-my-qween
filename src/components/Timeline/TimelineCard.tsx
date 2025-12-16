'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TimelineItem } from './data';

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isRight: boolean;
}

export default function TimelineCard({ item, index, isRight }: TimelineCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

   const getYearColor = (year: number) => {
        if (year <= 2011) return 'text-blue-400';
        if (year <= 2017) return 'text-purple-400';
        return 'text-phoenix-red';
    };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? 50 : -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex ${isRight ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Центральная линия */}
      <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-white/20 to-white/5 z-0"></div>
      
      {/* Точка на линии */}
      <div className={`absolute left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full border-4 border-black ${
        index <= 6 ? 'bg-blue-500' : 
        index <= 13 ? 'bg-purple-500' : 
        'bg-phoenix-red'
      } z-10`}></div>

      {/* Карточка */}
      <div className={`relative w-full md:w-1/2 ${isRight ? 'md:pr-12' : 'md:pl-12'} mt-8`}>
        <div className="relative group">
          {/* Фоновое свечение */}
          <div className={`absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500 ${
            index <= 6 ? 'bg-blue-500' : 
            index <= 13 ? 'bg-purple-500' : 
            'bg-phoenix-red'
          }`}></div>
          
          {/* Основная карточка */}
          <div className="relative bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-white/10 group-hover:border-white/30 transition-all duration-300">
            {/* Заголовок года */}
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-2xl font-bold ${getYearColor(item.year)}`}>
                {item.year}
              </h3>
              <div className="text-2xl">{item.icon}</div>
            </div>
            
            {/* Заголовок */}
            <h4 className="text-xl font-semibold mb-3 text-white">
              {item.title}
            </h4>
            
            {/* Описание */}
            <p className="text-white/70 mb-4 leading-relaxed">
              {item.description}
            </p>
            
            {/* Детали */}
            {item.details && (
              <div className="space-y-2 mb-4">
                {item.details.map((detail, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Иконка эпохи в углу */}
            <div className="absolute top-4 right-4 text-3xl opacity-20">
              {index <= 6 ? '👧' : index <= 13 ? '🎨' : '🔥'}
            </div>
          </div>
          
          {/* Соединительная линия к центру */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-12 h-1 ${
            isRight 
              ? 'left-full bg-gradient-to-l from-white/30 to-transparent' 
              : 'right-full bg-gradient-to-r from-white/30 to-transparent'
          } hidden md:block`}></div>
        </div>
      </div>
    </motion.div>
  );
}