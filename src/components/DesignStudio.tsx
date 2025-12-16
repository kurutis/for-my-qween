'use client';

import { motion } from 'framer-motion';
import { Figma, Layers, Code, Palette, Download, Eye } from 'lucide-react';

const projects = [
  { title: 'Бренд-бук "Феникс"', year: 2023, status: 'Дипломный проект' },
  { title: 'Логотип "自分"', year: 2022, status: 'Персональный бренд' },
  { title: 'UI/Kit для приложения', year: 2023, status: 'Курсовая работа' },
  { title: 'Айдентика кафе', year: 2022, status: 'Учебный проект' },
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
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-white">自分</span>
                    </div>
                    <div>
                      <p className="font-bold">personal-brand.fig</p>
                      <p className="text-sm text-white/60">Изменен сегодня</p>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-white/70">
                    Персональный логотип «себя» — символ самопознания и творческого роста
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
                    <div className="relative bg-black/50 rounded-xl p-6 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-lg font-bold">{project.title}</h4>
                        <span className="text-sm px-3 py-1 bg-gray-800 rounded-full">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-white/60 mb-4">{project.status}</p>
                      <div className="h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center">
                        <div className="text-4xl opacity-30">
                          {index === 0 && '🔥'}
                          {index === 1 && '🎴'}
                          {index === 2 && '📱'}
                          {index === 3 && '☕'}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
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