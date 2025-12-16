'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { timelineData } from './data';
import TimelineCard from './TimelineCard';

export default function Timeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const phases = [
    { title: 'Детство', years: '2005-2011', color: 'from-blue-500/20 to-purple-500/20' },
    { title: 'Отрочество', years: '2012-2017', color: 'from-purple-500/20 to-rose-500/20' },
    { title: 'Современность', years: '2018-2025', color: 'from-rose-500/20 to-phoenix-red/20' },
  ];

  return (
    <div className="min-h-screen py-20 px-4 relative">
      {/* Фоновая градиентная полоса */}
      <div className="fixed left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-phoenix-red z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-white via-phoenix-red to-lily-gold bg-clip-text text-transparent">
            20 лет эволюции
          </span>
        </motion.h2>

        {/* Фазы */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className={`h-48 rounded-2xl bg-gradient-to-br ${phase.color} p-6 flex flex-col justify-center items-center backdrop-blur-sm border border-white/10`}>
                <h3 className="text-2xl font-bold mb-2">{phase.title}</h3>
                <p className="text-white/70">{phase.years}</p>
                <div className="mt-4 text-4xl">
                  {index === 0 && '👧'}
                  {index === 1 && '🎨'}
                  {index === 2 && '🔥'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Таймлайн */}
        <div ref={ref} className="space-y-32">
          {timelineData.map((item, index) => (
            <TimelineCard
                key={item.id} // Используем уникальный ID
                item={item}
                index={index}
                isRight={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}