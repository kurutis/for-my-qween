'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, Lock, Unlock, X, ArrowLeft, Camera, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const reasons = [
  'Ты из тех кто всегда возьмёт своё',
  'Вайбы свежих сплетен, моя крысиная душа',
  'Никогда не оставишь, если что-то пойдет не так',
  'Умеешь искренне радоваться за других',
  'Мы дополняем мозг друг друга',
  'Шаришь за библию',
  'Никогда не опустишь руки, даже если если ничего не выходит',
  'Твой смех заразителен',
  'Верная подруга',
  'У тебя отменный вкус',
  'Мои враги - твои враги и наоборот',
  'С тобой всегда уютно',
  'Вдохновляешь на творчество',
  'Добрая, если не бесить',
  'Всегда находишь нестандартные решения',
  'Ты Богиня',
  'Даришь тепло и заботу',
  'Просто ты — это ты, и это самое лучшее',
  'Превращаешь обычное в прекрасное',
  'А ВООБЩЕ ТЫ МОЯ ЖЕНА ЭТОГО ДОСТАТОЧНО',
];

// Функция для перемешивания массива
const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Создаем массив с 30 совместными фото
const createPhotosArray = () => {
  const photos = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    image: `/we/${i + 1}.jpg`,
    title: `Совместный момент #${i + 1}`
  }));
  return shuffleArray(photos);
};

// Детективные записки
const secretNotes = [
  "Ты нашла все 20 кликов... Настоящий детектив! 🕵️‍♀️",
  "Этот сайт был создан с одной целью - показать, как ты особенная",
  "Каждый пиксель здесь дышит восхищением твоей личностью",
  "Феникс и Лилия - это не просто символы, это отражение твоей сущности",
  "20 лет - это только начало великого пути",
  "Твой творческий огонь освещает путь всем вокруг",
  "В этом цифровом портрете - лишь малая часть того восхищения, которое ты вызываешь",
];

export default function SecretPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentNote, setCurrentNote] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [isGalleryAutoPlaying, setIsGalleryAutoPlaying] = useState(false);
  const [jointPhotos, setJointPhotos] = useState<any[]>([]);

  // Инициализация и перемешивание фото при первой загрузке
  useEffect(() => {
    setIsClient(true);
    setShowConfetti(true);
    setJointPhotos(createPhotosArray());
    
    setTimeout(() => setShowConfetti(false), 5000);
    
    const noteInterval = setInterval(() => {
      setCurrentNote((prev) => (prev + 1) % secretNotes.length);
    }, 10000);
    
    return () => clearInterval(noteInterval);
  }, []);

  // Автоматическая смена фото в галерее
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (showGallery && isGalleryAutoPlaying) {
      intervalId = setInterval(() => {
        setGalleryIndex((prev) => (prev + 1) % jointPhotos.length);
        setImageLoading(true);
      }, 10000); // 10 секунд
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [showGallery, isGalleryAutoPlaying, jointPhotos.length]);

  const handleUnlock = () => {
    setUnlocked(!unlocked);
    if (!unlocked) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const openGallery = useCallback((index: number) => {
    setGalleryIndex(index);
    setShowGallery(true);
    setImageLoading(true);
    setIsGalleryAutoPlaying(true); // Автоматически включаем слайдшоу
  }, []);

  const closeGallery = () => {
    setShowGallery(false);
    setIsGalleryAutoPlaying(false);
  };

  const nextPhoto = useCallback(() => {
    setGalleryIndex((prev) => (prev + 1) % jointPhotos.length);
    setImageLoading(true);
  }, [jointPhotos.length]);

  const prevPhoto = useCallback(() => {
    setGalleryIndex((prev) => (prev - 1 + jointPhotos.length) % jointPhotos.length);
    setImageLoading(true);
  }, [jointPhotos.length]);

  const toggleAutoPlay = () => {
    setIsGalleryAutoPlaying(!isGalleryAutoPlaying);
  };

  const shufflePhotos = () => {
    setJointPhotos(createPhotosArray());
    setGalleryIndex(0);
    setImageLoading(true);
  };

  if (!isClient || jointPhotos.length === 0) {
    return (
      <div className="min-h-screen py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-rose-900/20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-6 py-3 mb-6">
              <Lock className="w-5 h-5 text-yellow-400" />
              <span className="text-white/80">Загрузка секретной страницы...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 relative overflow-hidden">
      {/* Фон с градиентом */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-rose-900/10"></div>
      
      {/* Летающие звезды */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${(Math.sin(i) * 100)}%`,
            top: `${(Math.cos(i) * 100)}%`,
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, 50, -50, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Конфетти эффект */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                left: `${(i * 7) % 100}%`,
                backgroundColor: ['#ff6b9d', '#7ee2ff', '#ffde59', '#a8ff78', '#ff9d6b'][i % 5],
              }}
              initial={{ 
                y: -100,
                x: 0,
                rotate: 0,
                opacity: 1,
              }}
              animate={{ 
                y: '100vh',
                x: (Math.sin(i) * 100) + 'px',
                rotate: 360,
                opacity: 0,
              }}
              transition={{
                duration: 2 + (i % 3),
                ease: "easeOut",
                delay: i * 0.01,
              }}
            />
          ))}
        </div>
      )}

      {/* Кнопка возврата */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/40 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Вернуться</span>
      </Link>

      {/* Модальное окно галереи */}
      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Загрузка */}
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin"></div>
                </div>
              )}
              
              {/* Основное фото */}
              <div className="relative">
                <img
                  src={jointPhotos[galleryIndex].image}
                  alt={jointPhotos[galleryIndex].title}
                  className={`w-full h-[70vh] object-contain rounded-lg transition-opacity duration-300 ${
                    imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                  onLoad={() => setImageLoading(false)}
                />
                
                {/* Навигационные кнопки */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevPhoto();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextPhoto();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
                
                {/* Закрыть */}
                <button
                  onClick={closeGallery}
                  className="absolute top-4 right-4 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-colors z-10"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
                
                {/* Номер фото и управление автопрокруткой */}
                <div className="absolute top-4 left-4 flex items-center gap-4">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                    <span className="text-sm text-white">
                      {galleryIndex + 1} / {jointPhotos.length}
                    </span>
                  </div>
                  
                  {/* Кнопка автопрокрутки */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAutoPlay();
                    }}
                    className={`px-3 py-1 rounded-full flex items-center gap-2 ${
                      isGalleryAutoPlaying 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {isGalleryAutoPlaying ? 'Автопрокрутка: ВКЛ' : 'Автопрокрутка: ВЫКЛ'}
                    </span>
                  </button>

                  {/* Кнопка перемешивания */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shufflePhotos();
                    }}
                    className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full flex items-center gap-2 hover:bg-purple-500/30"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">Перемешать</span>
                  </button>
                </div>

                {/* Таймер следующей смены */}
                {isGalleryAutoPlaying && (
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 10, ease: "linear" }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-b-lg"
                  />
                )}
              </div>
              
              {/* Заголовок */}
              <div className="mt-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg">
                <h3 className="text-xl font-bold text-white mb-2">
                  {jointPhotos[galleryIndex].title}
                </h3>
                <div className="flex items-center gap-4 text-white/70">
                  <span>Фото #{jointPhotos[galleryIndex].id}</span>
                  {isGalleryAutoPlaying && (
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Следующее фото через: {isGalleryAutoPlaying ? "10с" : "—"}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Миниатюры */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {jointPhotos.slice(
                  Math.max(0, galleryIndex - 3), 
                  Math.min(jointPhotos.length, galleryIndex + 4)
                ).map((photo, index) => {
                  const actualIndex = Math.max(0, galleryIndex - 3) + index;
                  return (
                    <button
                      key={photo.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryIndex(actualIndex);
                        setImageLoading(true);
                      }}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        galleryIndex === actualIndex
                          ? 'border-pink-500 scale-105'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img
                        src={photo.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full px-6 py-3 mb-6 border border-purple-500/30"
          >
            {unlocked ? (
              <Unlock className="w-5 h-5 text-green-400" />
            ) : (
              <Lock className="w-5 h-5 text-yellow-400" />
            )}
            <span className="text-white/80">Секретная страница обнаружена</span>
          </motion.div>
          
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Поздравляю, детектив! 🎉
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/70 mb-8 max-w-2xl mx-auto"
          >
            Ты нашла пасхалку и прошла испытание 20 кликов!
            Это доказывает твоё внимание к деталям и упорство.
          </motion.p>
          
          {/* Меняющиеся записки */}
          <motion.div
            key={currentNote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-lg">💫</span>
                </div>
                <p className="text-lg text-white/80 italic">{secretNotes[currentNote]}</p>
              </div>
              <div className="flex justify-center gap-1 mt-4">
                {secretNotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentNote(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentNote === index 
                        ? 'bg-purple-400 w-4' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Раздел с галереей фото */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Camera className="w-8 h-8 text-pink-400" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Хроники нашей дружбы
            </h2>
            <Camera className="w-8 h-8 text-purple-400" />
          </div>
          
          <p className="text-center text-white/70 mb-8 max-w-2xl mx-auto">
            30 совместных моментов, которые показывают, как прекрасна наша дружба. 
            Каждая фотография — это история, эмоция, воспоминание.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {jointPhotos.slice(0, 15).map((photo, index) => (
              <motion.button
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openGallery(index)}
                className="relative aspect-square rounded-xl overflow-hidden border-2 border-white/10 hover:border-pink-500/50 transition-all group"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Затемнение при наведении */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Номер фото */}
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center">
                  <span className="text-xs text-white font-semibold">
                    #{photo.id}
                  </span>
                </div>
                
                {/* Эффект при наведении */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-pink-500/30 transition-all duration-300 rounded-xl"></div>
              </motion.button>
            ))}
          </div>
          
          <div className="text-center space-y-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openGallery(0)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 rounded-full border border-white/10 hover:border-pink-500/50 transition-all"
            >
              <Camera className="w-5 h-5" />
              <span>Открыть полную галерею (30 фото)</span>
            </motion.button>
            
            <button
              onClick={shufflePhotos}
              className="block mx-auto text-sm text-white/60 hover:text-white/80 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Перемешать фото (случайный порядок)</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20 mb-12 relative overflow-hidden"
        >
          {/* Фоновые элементы внутри карточки */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center mb-8 relative"
              >
                <div className="absolute inset-4 rounded-full bg-black/30 backdrop-blur-sm"></div>
                <Sparkles className="w-20 h-20 text-white relative z-10" />
              </motion.div>
              
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                20 причин гордиться дружбой
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-lg">
                почему круто, что у меня есть такая подруга как ты
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUnlock}
                className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold flex items-center gap-3 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 mb-10 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                {unlocked ? (
                  <>
                    <X className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Скрыть причины</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 relative z-10 group-hover:fill-white group-hover:scale-125 transition-all" />
                    <span className="relative z-10">Открыть сокровищницу</span>
                  </>
                )}
                <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-xs">!</span>
                </div>
              </motion.button>
            </div>

            {unlocked && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reasons.map((reason, index) => (
                    <motion.div
                      key={reason}
                      initial={{ opacity: 0, x: -20, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ 
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{ 
                        scale: 1.03, 
                        translateY: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/[0.05] border border-white/10 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center flex-shrink-0 group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all"
                      >
                        <Star className="w-5 h-5 text-yellow-300 group-hover:scale-110 transition-transform" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-lg font-bold text-pink-300">
                            {index + 1}.
                          </span>
                          <h3 className="text-lg font-semibold text-white/95 group-hover:text-white transition-colors">
                            {reason}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Специальное сообщение */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 text-center"
                >
                  <div className="text-4xl mb-4">🎁</div>
                  <p className="text-lg text-white/90 mb-3">
                    И это лишь малая часть причин, почему ты — потрясающий человек!
                  </p>
                  <p className="text-white/70">
                    Каждый день рядом с тобой — это подарок. Спасибо, что ты есть.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-6"
        >
          {/* Цитата */}
          <div className="relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <p className="text-lg text-white/60 italic max-w-2xl mx-auto leading-relaxed">
              «Настоящая дружба — это когда можно молчать вместе и это не неловко, 
              когда можно делиться самым сокровенным, и когда просто знаешь — 
              этот человек всегда будет рядом, несмотря ни на что.»
            </p>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
          </div>
          
          {/* Подпись */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-4 text-white/40">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/30"></div>
              С любовью и бесконечной благодарностью за тебя
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/30"></div>
            </div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="flex items-center gap-2 text-purple-300"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span>Твоя навечно - Кристина)</span>
              <Heart className="w-5 h-5 fill-current" />
            </motion.div>
            
            {/* Секретное послание */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-8 text-sm text-white/30"
            >
              <p>P.S. Этот сайт останется с тобой навсегда. Сохрани ссылку!</p>
              <p className="mt-1 text-xs">Тайный код: PHOENIX-LILY-20-∞</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-xs text-white/50">Секрет активен</span>
      </div>
      
      <div className="fixed bottom-4 right-4 z-50">
        <div className="text-xs text-white/30 rotate-90">
          ★ ∞ ★
        </div>
      </div>
    </div>
  );
}