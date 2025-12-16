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
    { title: 'Детство', years: '2005-2012', color: 'from-blue-500/20 to-purple-500/20', icon: '👧' },
    { title: 'Отрочество', years: '2013-2019', color: 'from-purple-500/20 to-rose-500/20', icon: '🎨' },
    { title: 'Современность', years: '2020-2025', color: 'from-rose-500/20 to-phoenix-red/20', icon: '🔥' },
  ];

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Фоновая градиентная полоса */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 md:w-1 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-phoenix-red/30 z-0"></div>
      
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 px-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className={`h-40 rounded-2xl bg-gradient-to-br ${phase.color} p-6 flex flex-col justify-center items-center backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300`}>
                <div className="text-4xl mb-3">{phase.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{phase.title}</h3>
                <p className="text-white/70">{phase.years}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Таймлайн */}
        <div ref={ref} className="relative">
          {/* Центральная линия */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-phoenix-red/20 z-0"></div>
          
          <div className="space-y-20 md:space-y-24">
            {timelineData.map((item, index) => (
              <TimelineCard
                key={item.id}
                item={item}
                index={index}
                isRight={index % 2 === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}