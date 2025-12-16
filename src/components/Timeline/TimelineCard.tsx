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
    threshold: 0.2,
  });

  const getYearColor = (year: number) => {
    if (year <= 2012) return 'text-blue-400';
    if (year <= 2019) return 'text-purple-400';
    return 'text-phoenix-red';
  };

  const getEraIcon = (year: number) => {
    if (year <= 2012) return '👧';
    if (year <= 2019) return '🎨';
    return '🔥';
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isRight ? 40 : -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex items-center min-h-[200px] md:min-h-[180px]`}
    >
      {/* Точка на линии */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <div className={`relative w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-white/20 ${
          item.year <= 2012 ? 'bg-blue-500' : 
          item.year <= 2019 ? 'bg-purple-500' : 
          'bg-phoenix-red'
        }`}>
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-current"></div>
        </div>
      </div>

      {/* Карточка */}
      <div className={`w-full md:w-[calc(50%-40px)] ${isRight ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
        <div className="relative group">
          {/* Фоновое свечение при наведении */}
          <div className={`absolute -inset-2 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition duration-500 ${
            item.year <= 2012 ? 'bg-blue-500' : 
            item.year <= 2019 ? 'bg-purple-500' : 
            'bg-phoenix-red'
          }`}></div>
          
          {/* Основная карточка */}
          <div className="relative bg-black/60 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-white/10 group-hover:border-white/30 transition-all duration-300">
            {/* Заголовок года и иконка */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h3 className={`text-xl md:text-2xl font-bold ${getYearColor(item.year)}`}>
                  {item.year}
                </h3>
                <div className="text-lg md:text-xl opacity-60">
                  {getEraIcon(item.year)}
                </div>
              </div>
              <div className="text-2xl md:text-3xl">{item.icon}</div>
            </div>
            
            {/* Заголовок события */}
            <h4 className="text-lg md:text-xl font-semibold mb-2 text-white">
              {item.title}
            </h4>
            
            {/* Описание */}
            <p className="text-white/70 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">
              {item.description}
            </p>
            
            {/* Детали */}
            {item.details && (
              <div className="space-y-1.5">
                {item.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs md:text-sm text-white/60">
                    <div className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"></div>
                    <span className="leading-tight">{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Соединительная линия к центру (только на десктопе) */}
          <div className={`absolute top-1/2 -translate-y-1/2 w-8 md:w-12 h-0.5 ${
            isRight 
              ? 'left-full md:-left-8 bg-gradient-to-l from-white/30 to-transparent' 
              : 'right-full md:-right-8 bg-gradient-to-r from-white/30 to-transparent'
          } hidden md:block`}></div>
        </div>
      </div>
    </motion.div>
  );
}