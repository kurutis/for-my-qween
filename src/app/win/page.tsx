'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cake, 
  Sparkles, 
  Heart, 
  Star, 
  PartyPopper,
  Gift,
  Home,
  ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti';

export default function WinPage() {
  const [cakeLayers, setCakeLayers] = useState<boolean[]>([false, false, false]);
  const [candles, setCandles] = useState<boolean[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Инициализация
  useEffect(() => {
    // Устанавливаем размер окна для конфетти
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Анимация слоев торта
    const layerTimers: NodeJS.Timeout[] = [];
    for (let i = 0; i < 3; i++) {
      const timer = setTimeout(() => {
        setCakeLayers(prev => {
          const newLayers = [...prev];
          newLayers[i] = true;
          return newLayers;
        });
      }, 500 + (i * 300));
      layerTimers.push(timer);
    }
    
    // Анимация свечей
    const candlesTimers: NodeJS.Timeout[] = [];
    for (let i = 0; i < 20; i++) {
      const timer = setTimeout(() => {
        setCandles(prev => [...prev, true]);
      }, 1400 + (i * 50));
      candlesTimers.push(timer);
    }

    // Сообщение
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);

    // Останавливаем конфетти через 10 секунд
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => {
      layerTimers.forEach(timer => clearTimeout(timer));
      candlesTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(messageTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-900/20 via-purple-900/30 to-black py-20 px-4 overflow-hidden">
      {/* Конфетти */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={true}
          numberOfPieces={150}
          gravity={0.1}
          colors={['#FF6B6B', '#FFD166', '#06D6A0', '#7209B7', '#FF9E6D']}
        />
      )}

      {/* Плавающие элементы */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {['🎉', '✨', '🎈', '🥳', '🎁'][i % 5]}
          </motion.div>
        ))}
      </div>

      {/* Кнопка возврата */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/40 transition-colors group"
      >
        <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">На главную</span>
      </Link>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              ПОЗДРАВЛЯЕМ!
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/80"
          >
            Ты собрала пазл и открыла особенное поздравление!
          </motion.p>
        </div>

        {/* Анимированный торт */}
        <div className="relative flex flex-col items-center justify-center min-h-[60vh]">
          {/* Стрелка-подсказка */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.5 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <ChevronDown className="w-6 h-6 text-white/50" />
            <span className="text-white/50 text-sm">смотри вниз!</span>
          </motion.div>

          {/* Торт */}
          <div className="relative mt-8">
            {/* Ярусы торта */}
            <div className="relative flex flex-col items-center">
              {/* Третий ярус (верхний) */}
              {cakeLayers[2] && (
                <motion.div
                  initial={{ y: -80, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1 
                  }}
                  className="w-48 h-16 bg-gradient-to-b from-pink-300 to-pink-400 rounded-t-xl shadow-xl relative z-30"
                >
                  {/* Верхний крем */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-40 h-4 bg-white/90 rounded-full"></div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-pink-200/80 rounded-full"></div>
                </motion.div>
              )}

              {/* Второй ярус */}
              {cakeLayers[1] && (
                <motion.div
                  initial={{ y: -80, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15 
                  }}
                  className="w-56 h-20 bg-gradient-to-b from-purple-300 to-purple-400 shadow-xl relative z-20"
                >
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-44 h-3 bg-purple-200/60 rounded-full"></div>
                </motion.div>
              )}

              {/* Первый ярус (нижний) */}
              {cakeLayers[0] && (
                <motion.div
                  initial={{ y: -80, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15 
                  }}
                  className="w-64 h-24 bg-gradient-to-b from-cyan-300 to-cyan-400 rounded-b-xl shadow-xl relative z-10"
                >
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-52 h-4 bg-cyan-200/40 rounded-full"></div>
                </motion.div>
              )}
            </div>

            {/* Свечи */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-[260px]">
              {Array.from({ length: 20 }).map((_, i) => (
                candles[i] && (
                  <motion.div
                    key={i}
                    initial={{ y: -100, opacity: 0, rotate: Math.random() * 15 - 7.5 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      delay: i * 0.04 
                    }}
                    className="relative"
                  >
                    {/* Свеча */}
                    <div 
                      className={`w-2.5 h-8 rounded-sm ${
                        i % 6 === 0 ? 'bg-gradient-to-b from-red-400 to-red-500' :
                        i % 6 === 1 ? 'bg-gradient-to-b from-yellow-400 to-yellow-500' :
                        i % 6 === 2 ? 'bg-gradient-to-b from-green-400 to-green-500' :
                        i % 6 === 3 ? 'bg-gradient-to-b from-blue-400 to-blue-500' :
                        i % 6 === 4 ? 'bg-gradient-to-b from-purple-400 to-purple-500' :
                        'bg-gradient-to-b from-pink-400 to-pink-500'
                      } shadow-md`}
                    />
                    
                    {/* Огонек */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.02,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                    >
                      <div className="w-3 h-3 rounded-full bg-gradient-to-b from-yellow-300 to-orange-500 blur-[1px]" />
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-yellow-300/30 animate-ping" />
                    </motion.div>
                  </motion.div>
                )
              ))}
            </div>

            {/* Декоративные круги */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-24 left-1/2 transform -translate-x-1/2 -z-10"
            >
              <div className="w-48 h-48 border border-pink-500/20 rounded-full" />
            </motion.div>
          </div>

          {/* Поздравительное сообщение */}
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="mt-16 text-center max-w-2xl mx-auto"
            >
              <div className="relative">
                {/* Фон сообщения */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 blur-xl rounded-full" />
                
                {/* Основной текст */}
                <div className="relative z-10">
                  <motion.h2
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      duration: 0.3,
                      repeat: 2,
                      repeatType: "reverse"
                    }}
                    className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    С 20-летием, Дарья! 🎂
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-white/80 mb-8 leading-relaxed"
                  >
                    Пусть этот год будет полон ярких красок, удивительных открытий
                    и незабываемых моментов! Ты заслуживаешь самого лучшего!
                  </motion.p>
                  
                  {/* Иконки */}
                  <div className="flex justify-center gap-6 mb-8">
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 90]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    >
                      <Sparkles className="w-8 h-8 text-yellow-400" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ 
                        y: [0, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.2
                      }}
                    >
                      <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                    </motion.div>
                    
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, -90]
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 0.4
                      }}
                    >
                      <Star className="w-8 h-8 text-cyan-400" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Интерактивные элементы */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 bg-gradient-to-r from-pink-500/20 to-pink-700/20 rounded-2xl border border-pink-500/30 flex flex-col items-center gap-3 hover:border-pink-500/50 transition-colors"
          >
            <PartyPopper className="w-8 h-8 text-pink-400" />
            <span className="text-white font-semibold">Ура!</span>
            <span className="text-white/60 text-sm text-center">Ты сделала это!</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-6 bg-gradient-to-r from-purple-500/20 to-purple-700/20 rounded-2xl border border-purple-500/30 flex flex-col items-center gap-3 hover:border-purple-500/50 transition-colors"
          >
            <Gift className="w-8 h-8 text-purple-400" />
            <span className="text-white font-semibold">Сюрприз</span>
            <span className="text-white/60 text-sm text-center">Виртуальный подарок!</span>
          </motion.button>
          
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-6 bg-gradient-to-r from-cyan-500/20 to-cyan-700/20 rounded-2xl border border-cyan-500/30 flex flex-col items-center gap-3 hover:border-cyan-500/50 transition-colors cursor-pointer"
            >
              <Cake className="w-8 h-8 text-cyan-400" />
              <span className="text-white font-semibold">На главную</span>
              <span className="text-white/60 text-sm text-center">Вернуться на сайт</span>
            </motion.div>
          </Link>
        </div>

        {/* Финализирующее сообщение */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 text-white/50">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30"></div>
            Этот торт будет с тобой вечно в цифровом виде!
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30"></div>
          </div>
          <p className="text-white/30 text-sm mt-4">
            С любовью создано для самого особенного 20-летия ✨
          </p>
        </motion.div>
      </div>

      {/* Фоновые эффекты */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-500/10 to-transparent pointer-events-none"></div>
    </div>
  );
}