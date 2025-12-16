'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Hero() {
  return (
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
  );
}