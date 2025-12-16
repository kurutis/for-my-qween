'use client';

import { motion } from 'framer-motion';
import { Sword, Shield, Zap, Globe, Users, Trophy, Target, Flame, Heart, Star } from 'lucide-react';
import Image from 'next/image';

const genshinData = {
  nickname: 'mock_06',
  adventureRank: 58,
  worldLevel: 8,
  favoriteCharacters: [
    { 
      name: 'Арлекино', 
      element: '🔥', 
      role: 'Главный DPS', 
      description: 'Абсолютный фаворит, сила и элегантность',
      color: 'from-red-500 to-orange-500',
      icon: '/icons/Arlecino.png'
    },
    { 
      name: 'Беннет', 
      element: '🔥', 
      role: 'Саппорт', 
      description: 'Незаменимый бустер и хилящий',
      color: 'from-yellow-500 to-amber-500',
      icon: '/icons/bennet.png'
    }, 
    { 
      name: 'Е Лань', 
      element: '💧', 
      role: 'Саппорт', 
      description: 'Гидро резонанс и контроль',
      color: 'from-blue-300 to-cyan-300',
      icon: '/icons/elan.png'
    },
    { 
      name: 'Флинс', 
      element: '⚡', 
      role: 'Саб-DPS', 
      description: 'Электро поддержка и свирл',
      color: 'from-teal-400 to-emerald-400',
      icon: '/icons/flins.png'
    },
  ],
  explorationProgress: [
    { region: 'Мондштадт', progress: 100, color: 'from-green-500 to-emerald-500' },
    { region: 'Ли Юэ', progress: 99.6, color: 'from-yellow-500 to-amber-500' },
    { region: 'Инадзума', progress: 100, color: 'from-purple-500 to-pink-500' },
    { region: 'Драконий хребет', progress: 99.1, color: 'from-blue-400 to-cyan-400' },
    { region: 'Энканомия', progress: 100, color: 'from-indigo-500 to-purple-500' },
    { region: 'Разлом', progress: 100, color: 'from-gray-600 to-gray-800' },
    { region: 'Сумеру', progress: 100, color: 'from-lime-500 to-green-500' },
    { region: 'Фонтейн', progress: 100, color: 'from-blue-500 to-cyan-400' },
    { region: 'Долина Ченьюй', progress: 100, color: 'from-rose-500 to-pink-500' },
    { region: 'Море древности', progress: 100, color: 'from-violet-500 to-purple-500' },
    { region: 'Натлан', progress: 75, color: 'from-orange-500 to-red-400' },
    { region: 'Нод-Край', progress: 38, color: 'from-red-400 to-pink-500' },
  ],
  achievements: 1106,
  playstyle: 'Исследователь/Коллекционер',
};

export default function GenshinWorld() {
  const totalExploration = genshinData.explorationProgress.reduce((sum, region) => sum + region.progress, 0) / genshinData.explorationProgress.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30">
        <div className="flex items-center gap-4 mb-6">
          {/* Иконка игры Genshin Impact на весь блок */}
          <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/images/genshin.png"
                alt="Genshin Impact Icon"
                fill
                className="object-cover"
                sizes="64px"
                priority
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">
              Мир Тейвата
            </h3>
            <p className="text-white/60">Genshin Impact</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Профиль игрока */}
          <div className="lg:col-span-1">
            <div className="bg-black/50 rounded-xl p-4 mb-4 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center animate-pulse">
                  <span className="text-xl">👑</span>
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{genshinData.nickname}</p>
                  <p className="text-sm text-white/60">Путешественник • AR{genshinData.adventureRank}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-300">
                    <Zap className="w-4 h-4" />
                    <span className="text-sm">Ранг приключений</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">{genshinData.adventureRank}</span>
                    <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Уровень мира</span>
                  </div>
                  <span className="text-xl font-bold text-white">{genshinData.worldLevel}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-300">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm">Достижения</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-white">{genshinData.achievements}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-cyan-900/30 via-purple-900/30 to-emerald-900/30 rounded-xl p-4 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-red-400" />
                <p className="text-sm text-white/80 italic">
                  «Исследование каждого уголка Тейвата — это как работа над дизайном: 
                  ищешь гармонию, баланс и красоту в каждой детали.»
                </p>
              </div>
            </div>
          </div>

          {/* Отряд мечты */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 text-white/80 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <span className="font-semibold text-lg">Основной отряд</span>
                <p className="text-sm text-white/60">Идеальная синергия элементов</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {genshinData.favoriteCharacters.map((character, index) => (
                <motion.div
                  key={character.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${character.color} rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300`}></div>
                  <div className="relative bg-black/50 rounded-xl p-4 border border-white/10 group-hover:border-white/30 transition-all duration-300 h-full">
                    <div className="flex flex-col h-full items-center text-center">
                      {/* Увеличенная иконка персонажа */}
                      <div className="relative w-20 h-20 mb-3">
                        <Image
                          src={character.icon}
                          alt={character.name}
                          fill
                          className="object-contain drop-shadow-lg"
                          sizes="80px"
                        />
                      </div>
                      
                      <div className="mb-2">
                        <h4 className="font-bold text-lg text-white mb-1">{character.name}</h4>
                        <p className={`text-sm font-medium ${
                          character.role.includes('DPS') ? 'text-red-300' :
                          character.role.includes('Саппорт') ? 'text-cyan-300' : 'text-emerald-300'
                        }`}>
                          {character.role}
                        </p>
                      </div>
                      
                      <p className="text-sm text-white/70 flex-grow">{character.description}</p>
                      
                      {character.name === 'Арлекино' && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                          <Flame className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Стиль игры */}
            <div className="p-4 bg-black/30 rounded-lg border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span className="text-white/70">Стиль игры:</span>
                </div>
                <span className="font-semibold text-cyan-300">{genshinData.playstyle}</span>
              </div>
              <div className="mt-2 text-sm text-white/50">
                Максимализм в исследовании, перфекционизм в коллекционировании, стратегия в битвах
              </div>
            </div>
          </div>
        </div>

        {/* Прогресс исследования мира */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h4 className="font-semibold text-lg text-white">Исследование мира</h4>
                <p className="text-sm text-white/60">Общий прогресс: {totalExploration.toFixed(1)}%</p>
              </div>
            </div>
            <div className="text-sm text-white/50">
              {genshinData.explorationProgress.filter(r => r.progress === 100).length}/{genshinData.explorationProgress.length} регионов завершено
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {genshinData.explorationProgress.map((region, index) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="bg-black/40 rounded-lg p-3 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white">{region.region}</span>
                    <span className={`text-sm font-bold ${
                      region.progress === 100 ? 'text-emerald-400' :
                      region.progress >= 90 ? 'text-green-400' :
                      region.progress >= 75 ? 'text-yellow-400' :
                      region.progress >= 50 ? 'text-orange-400' : 'text-red-400'
                    }`}>
                      {region.progress.toFixed(region.progress % 1 === 0 ? 0 : 1)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${region.progress}%` }}
                      transition={{ duration: 1.5, delay: index * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${region.color}`}
                    />
                  </div>
                  {region.progress === 100 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Общий прогресс */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between text-sm text-white/60 mb-3">
              <span>Общий прогресс исследования Тейвата</span>
              <span>{totalExploration.toFixed(1)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${totalExploration}%` }}
                transition={{ duration: 2, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500"
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-white/40">
              <span>В процессе: Натлан (75%), Нод-Край (38%)</span>
              <span>Завершено: 10 регионов</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}