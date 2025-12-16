'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Heart, Sparkles } from 'lucide-react';

const photoCollections = [
  {
    title: 'Воспоминания детства',
    description: '2005-2016 • Первые шаги в большом мире',
    photos: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      src: `/images/daria/childhood/${i}.jpg`,
      caption: `Детство • ${i + 1}`,
      hue: i * 36, 
    })),
    color: 'from-blue-500/20 to-purple-500/20',
    icon: '👧',
  },
  {
    title: 'Время открытий',
    description: '2016-2022 • Формирование личности',
    photos: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      src: `/images/daria/teenage/${i}.jpg`,
      caption: `Отрочество • ${i + 1}`,
      hue: 120 + i * 36,
    })),
    color: 'from-purple-500/20 to-rose-500/20',
    icon: '🎨',
  },
  {
    title: 'Современный портрет',
    description: '2023-2025 • Творческий расцвет',
    photos: Array.from({ length: 7 }, (_, i) => ({
      id: i,
      src: `/images/daria/adult/${i}.jpg`,
      caption: `Современность • ${i + 1}`,
      hue: 240 + i * 51,
    })),
    color: 'from-rose-500/20 to-phoenix-red/20',
    icon: '🌟',
  },
];

export default function ArtisticPhotoGrid() {
  const [expandedCollection, setExpandedCollection] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<{ collection: number; photo: number } | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());

  const toggleLike = (collection: number, photo: number) => {
    const key = `${collection}-${photo}`;
    const newSet = new Set(likedPhotos);
    if (newSet.has(key)) {
      newSet.delete(key);
    } else {
      newSet.add(key);
    }
    setLikedPhotos(newSet);
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-phoenix-red via-lily-gold to-cyan-400 bg-clip-text text-transparent">
              Визуальная биография
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Фотографии не просто запечатлели моменты — они рассказали историю становления личности
          </p>
        </div>

        {/* Коллекции */}
        <div className="space-y-24">
          {photoCollections.map((collection, collectionIndex) => (
            <motion.div
              key={collection.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Заголовок коллекции */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${collection.color} flex items-center justify-center text-3xl`}>
                  {collection.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{collection.title}</h3>
                  <p className="text-white/60">{collection.description}</p>
                </div>
              </div>

              {/* Грид фотографий */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {collection.photos.slice(0, expandedCollection === collectionIndex ? collection.photos.length : 4).map((photo, photoIndex) => (
                  <motion.div
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: photoIndex * 0.1 }}
                    className="relative group cursor-pointer"
                    onClick={() => setSelectedPhoto({ collection: collectionIndex, photo: photo.id })}
                  >
                    {/* Фото с эффектами */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden">
                      {/* Цветная подложка */}
                      <div 
                        className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                        style={{
                          background: `linear-gradient(45deg, 
                            hsl(${photo.hue}, 70%, 50%),
                            hsl(${photo.hue + 60}, 70%, 50%)
                          )`,
                        }}
                      />
                      
                      {/* Само фото */}
                      <Image
                        src={photo.src}
                        alt={photo.caption}
                        fill
                        className="object-cover relative z-10 transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      
                      {/* Эффект наведения */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                      
                      {/* Кнопки */}
                      <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPhoto({ collection: collectionIndex, photo: photo.id });
                          }}
                          className="p-2 bg-black/50 rounded-lg hover:bg-black/80 transition-colors"
                        >
                          <Maximize2 className="w-4 h-4 text-white" />
                        </button>
                      </div>
                      
                      {/* Лайк */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(collectionIndex, photo.id);
                        }}
                        className="absolute bottom-3 right-3 z-30 p-2 bg-black/50 rounded-lg hover:bg-black/80 transition-colors"
                      >
                        <Heart 
                          className={`w-4 h-4 transition-all ${
                            likedPhotos.has(`${collectionIndex}-${photo.id}`) 
                              ? 'fill-phoenix-red text-phoenix-red' 
                              : 'text-white'
                          }`}
                        />
                      </button>
                      
                      {/* Подпись */}
                      <div className="absolute bottom-3 left-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs text-white/90 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                          {photo.caption}
                        </span>
                      </div>
                    </div>
                    
                    {/* Аура вокруг фото */}
                    <div 
                      className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 z-0"
                      style={{
                        background: `linear-gradient(45deg, 
                          hsl(${photo.hue}, 100%, 50%),
                          hsl(${photo.hue + 60}, 100%, 50%)
                        )`,
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Кнопка "Показать все" */}
              {collection.photos.length > 4 && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => setExpandedCollection(expandedCollection === collectionIndex ? null : collectionIndex)}
                    className="px-6 py-3 rounded-full border-2 border-white/20 hover:border-white/40 bg-black/30 hover:bg-black/50 transition-all duration-300"
                  >
                    {expandedCollection === collectionIndex ? 'Свернуть' : `Показать все ${collection.photos.length} фото`}
                  </button>
                </div>
              )}

              {/* Декоративная линия */}
              <div className="absolute -bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Статистика */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-8 rounded-3xl bg-gradient-to-br from-black/40 to-black/20 backdrop-blur-sm border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400">10</div>
              <div className="text-white/70">Детских воспоминаний</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400">10</div>
              <div className="text-white/70">Моментов взросления</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-400">7</div>
              <div className="text-white/70">Современных портретов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-phoenix-red">27</div>
              <div className="text-white/70">Всего моментов жизни</div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-white/50 text-sm">
            <Sparkles className="w-4 h-4 inline-block mr-2" />
            Каждая фотография — это частица истории, кадр из фильма длиною в 20 лет
          </div>
        </motion.div>
      </div>

      {/* Модальное окно просмотра фото */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-3 bg-black/50 rounded-full hover:bg-black/80 transition-colors z-50"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl h-3/4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photoCollections[selectedPhoto.collection].photos[selectedPhoto.photo].src}
                alt={photoCollections[selectedPhoto.collection].photos[selectedPhoto.photo].caption}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
              
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <div className="px-6 py-3 bg-black/50 rounded-full backdrop-blur-sm">
                  <span className="text-white">
                    {photoCollections[selectedPhoto.collection].photos[selectedPhoto.photo].caption}
                  </span>
                </div>
                
                <button
                  onClick={() => toggleLike(selectedPhoto.collection, selectedPhoto.photo)}
                  className="p-3 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
                >
                  <Heart 
                    className={`w-5 h-5 ${
                      likedPhotos.has(`${selectedPhoto.collection}-${selectedPhoto.photo}`) 
                        ? 'fill-phoenix-red text-phoenix-red' 
                        : 'text-white'
                    }`}
                  />
                </button>
              </div>
            </motion.div>

            {/* Навигация */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const prevPhoto = (selectedPhoto.photo - 1 + photoCollections[selectedPhoto.collection].photos.length) % 
                                  photoCollections[selectedPhoto.collection].photos.length;
                setSelectedPhoto({ ...selectedPhoto, photo: prevPhoto });
              }}
              className="absolute left-6 p-4 bg-black/50 rounded-full hover:bg-black/80 transition-colors z-50"
            >
              <div className="w-6 h-6 border-l-2 border-t-2 border-white rotate-45 translate-x-1" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                const nextPhoto = (selectedPhoto.photo + 1) % photoCollections[selectedPhoto.collection].photos.length;
                setSelectedPhoto({ ...selectedPhoto, photo: nextPhoto });
              }}
              className="absolute right-6 p-4 bg-black/50 rounded-full hover:bg-black/80 transition-colors z-50"
            >
              <div className="w-6 h-6 border-r-2 border-t-2 border-white -rotate-45 -translate-x-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}