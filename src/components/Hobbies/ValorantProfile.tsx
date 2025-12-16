'use client';

import { motion } from 'framer-motion';
import { Swords, Shield, Zap } from 'lucide-react';
import Image from 'next/image';

const agentData = {
  nickname: 'モッキンジェイ#0654',
  mainAgent: 'Clove',
  role: 'Контроллер',
  favoriteMap: 'Bind',
  playstyle: 'Тактический поддержка',
  stats: {
    wins: 90,
    headshots: '29,9%',
    rating: 'Immortal 1 | 35RR',
  },
};

export default function ValorantProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative group"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden">
            <Image
              src="/icons/valorant.png"
              alt="Valorant"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-red-400">Тактический шутер</h3>
            <p className="text-white/60">Valorant</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-black/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Zap className="w-4 h-4" />
                <span className="font-semibold">Игровой профиль</span>
              </div>
              <p className="text-2xl font-mono text-white">{agentData.nickname}</p>
            </div>

            <div className="bg-black/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <Swords className="w-4 h-4" />
                <span className="font-semibold">Основной агент</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                  <Image
                    src="/icons/clove.png"
                    alt={agentData.mainAgent}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{agentData.mainAgent}</p>
                  <p className="text-white/60">{agentData.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <Shield className="w-4 h-4" />
                <span className="font-semibold">Статистика</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{agentData.stats.wins}</p>
                  <p className="text-xs text-white/60">Побед</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{agentData.stats.headshots}</p>
                  <p className="text-xs text-white/60">Хедшотов</p>
                </div>
                <div className="col-span-2 text-center mt-2">
                  <p className="text-lg font-bold text-yellow-400">{agentData.stats.rating}</p>
                  <p className="text-xs text-white/60">Рейтинг</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-cyan-900/30 rounded-lg p-4 border border-green-500/20">
              <p className="text-sm text-white/80 italic">
                «Стратегическое мышление и точность — ключ к победе. Каждая карта — это новая задача для дизайна тактики.»
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}