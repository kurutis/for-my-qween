'use client';

import { motion } from 'framer-motion';
import { Figma, Layers, Code, Palette, Download, Eye } from 'lucide-react';

const projects = [
  { 
    title: '"Дом Вязанных Историй"', 
    year: 2025, 
    status: 'Дипломный проект',
    image: '/table/diplom.png',
    description: 'Веб-сайт для магазина вязанных изделий ручной работы'
  },
  { 
    title: 'Логотип "mocki"', 
    year: 2024, 
    status: 'Персональный бренд',
    image: '/icons/logo.svg',
    description: 'Персональный логотип'
  },
  { 
    title: 'Trowool', 
    year: 2024, 
    status: 'Курсовая работа',
    image: '/table/trowooll.png',
    description: 'Дизайн сайта для бренда шерстяных изделий'
  },
  { 
    title: 'Коллажик к песне', 
    year: 2022, 
    status: 'Учебный проект',
    image: '/table/collage.png',
    description: 'Художественный коллаж, вдохновлённый любимой песней'
  },
];

export default function DesignStudio() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gray-900/50 rounded-full px-6 py-3 border border-white/10 mb-6">
            <Figma className="w-5 h-5 text-pink-500" />
            <span className="text-white/80">Имитация рабочего стола Figma</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Кабинет веб-дизайнера
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Пространство, где рождаются идеи и принимают идеальную форму
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая панель - инструменты */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Инструменты
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Palette, name: 'Цветовая палитра', color: 'text-pink-400' },
                  { icon: Code, name: 'Компоненты', color: 'text-green-400' },
                  { icon: Eye, name: 'Прототип', color: 'text-yellow-400' },
                  { icon: Download, name: 'Экспорт', color: 'text-blue-400' },
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <tool.icon className={`w-5 h-5 ${tool.color}`} />
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-4">Активный файл</h4>
                <div className="bg-black/50 rounded-xl p-4 border-2 border-cyan-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                      <img 
                        src="/icons/logo.svg" 
                        alt="Логотип mocki" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'w-full h-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br from-cyan-500 to-pink-500';
                          fallback.textContent = 'mocki';
                          target.parentNode?.appendChild(fallback);
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-bold">жопный лого Даши.svg</p>
                      <p className="text-sm text-white/60">Изменен сегодня</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    Персональный логотип «mocki» — символ самопознания и творческого роста
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Центральная панель - проекты */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10 h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold">Рабочие проекты</h3>
                <div className="text-sm text-white/50">
                  Последнее обновление: сегодня
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative bg-black/50 rounded-xl border border-white/10 group-hover:border-cyan-500/30 transition-colors h-full flex flex-col overflow-hidden">
                      {/* Заголовок проекта поверх изображения */}
                      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 via-black/50 to-transparent p-4">
                        <div className="flex justify-between items-start">
                          <span className="text-sm px-3 py-1 bg-black/80 rounded-full text-white">
                            {project.year}
                          </span>
                        </div>
                      </div>
                      
                      {/* Изображение проекта - ЗАНИМАЕТ ВЕСЬ КОНТЕЙНЕР */}
                      <div className="flex-grow relative min-h-[200px]">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900';
                            const emoji = document.createElement('div');
                            emoji.className = 'text-4xl opacity-30';
                            if (index === 0) emoji.textContent = '🔥';
                            else if (index === 1) emoji.textContent = '🎴';
                            else if (index === 2) emoji.textContent = '📱';
                            else emoji.textContent = '☕';
                            fallback.appendChild(emoji);
                            target.parentNode?.appendChild(fallback);
                          }}
                        />
                        
                        {/* Увеличивающийся эффект при наведении */}
                        <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 transform"></div>
                      </div>
                      
                      {/* Описание под изображением (видно всегда) */}
                      <div className="p-4 bg-black/40 backdrop-blur-sm border-t border-white/10">
                        <p className="text-sm text-white/80 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Статус бар */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm text-white/60 mb-2">
                  <span>Проект «Будущее»</span>
                  <span>Release date: Сейчас и всегда</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-pink-500"
                  />
                </div>
                <p className="text-xs text-white/40 mt-2">
                  В активной разработке. Каждый день — новый коммит в репозиторий жизни.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}