'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Quote } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen relative pt-4">
      {/* Логотип теперь в layout.tsx */}

      {/* Hero секция */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-white via-white to-phoenix-red bg-clip-text text-transparent">
              Дарья
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-white/80 mb-2">
            Портрет в 20 кадрах
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-phoenix-red to-transparent mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="relative">
            <Quote className="absolute -top-6 -left-6 w-8 h-8 text-phoenix-red/50" />
            <p className="text-xl md:text-2xl font-serif italic text-white/90 leading-relaxed">
              «Дизайн для меня — это творческое воплощение эмоций и желаний,
              приносящее глубокое удовольствие от воплощения замысла в идеальную форму.»
            </p>
            <Quote className="absolute -bottom-6 -right-6 w-8 h-8 text-phoenix-red/50 rotate-180" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-phoenix-red to-lily-gold rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-charcoal/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-phoenix-red mb-2">Феникс</h3>
              <p className="text-white/70">
                Символ трансформации, возрождения и неугасающей силы. 
                Отражение твоего пути к новым высотам.
              </p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-lily-gold to-white/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-charcoal/80 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-lily-gold mb-2">Лилия</h3>
              <p className="text-white/70">
                Эмблема изящества, чистоты и утонченной красоты. 
                Часть тебя, которая всегда остаётся нежной и совершенной.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Анимированная надпись */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 text-white/40 text-sm">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30"></div>
            Прокрути, чтобы исследовать
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30"></div>
          </div>
        </motion.div>
      </div>

      {/* Кнопка начала */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50"
      >
        <a
          href="/evolution"
          className="group relative px-8 py-4 bg-gradient-to-r from-phoenix-red to-phoenix-dark rounded-full border-2 border-phoenix-red/50 flex items-center gap-3 text-lg font-semibold hover:shadow-2xl hover:shadow-phoenix-red/30 transition-all duration-300 hover:scale-105"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          Начать путешествие
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
        </a>
      </motion.div>

      {/* Феникс анимация */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 0.5 }}
        className="fixed top-[calc(50%+2rem)] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 pointer-events-none z-0"
      >
        <div className="relative w-full h-full">
          {/* Стилизованный феникс */}
          <div className="absolute top-0 left-1/4 w-16 h-32 bg-gradient-to-b from-phoenix-red/20 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-8 left-2/4 w-24 h-40 bg-gradient-to-b from-phoenix-red/30 to-transparent rounded-full blur-xl"></div>
          <div className="absolute top-4 right-1/4 w-20 h-36 bg-gradient-to-b from-phoenix-red/25 to-transparent rounded-full blur-xl"></div>
          
          {/* Стилизованная лилия */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-8 h-24 bg-gradient-to-b from-white/10 to-transparent rounded-full"
                style={{
                  transform: `rotate(${i * 60}deg) translateY(-40px)`,
                  transformOrigin: 'bottom center'
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Подпись */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-8 right-6 text-sm text-white/50 flex items-center gap-2 z-50"
      >
        С любовью и восхищением <Heart className="w-4 h-4 fill-phoenix-red" />
      </motion.div>
    </div>
  );
}