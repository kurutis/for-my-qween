'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Heart, Send, X, Download, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Greeting {
  id: string;
  name: string;
  message: string;
  color: string;
  created_at: string;
  likes?: number;
}

const defaultGreetings: Greeting[] = [
  {
    id: '1',
    name: 'Создатель сайта',
    message: 'С 20-летием, Дарья! Пусть этот год станет годом твоего триумфа во всём, за что ты берёшься!',
    color: '#e63946',
    created_at: new Date().toISOString(),
    likes: 0,
  },
  {
    id: '2',
    name: 'Феникс',
    message: 'Возрождайся снова и снова, становясь каждый раз сильнее и прекраснее!',
    color: '#d4af37',
    created_at: new Date().toISOString(),
    likes: 0,
  },
  {
    id: '3',
    name: 'Лилия',
    message: 'Продолжай цвести и радовать мир своей утончённой красотой!',
    color: '#ffffff',
    created_at: new Date().toISOString(),
    likes: 0,
  },
];

export default function GreetingsBoard() {
  const [greetings, setGreetings] = useState<Greeting[]>(defaultGreetings);
  const [newMessage, setNewMessage] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#e63946');
  const [showForm, setShowForm] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedGreetings, setLikedGreetings] = useState<Set<string>>(new Set());

  const colors = [
    '#e63946', // phoenix red
    '#d4af37', // lily gold
    '#ffffff', // white
    '#00ff88', // neon green
    '#0088ff', // blue
    '#ff0080', // pink
    '#aa00ff', // purple
  ];

  // Загрузка поздравлений из базы данных
  const fetchGreetings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('greetings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching greetings:', error);
        // Если ошибка, используем локальные данные
        const stored = JSON.parse(localStorage.getItem('daria-greetings') || '[]');
        if (stored.length > 0) {
          setGreetings(stored);
        }
      } else if (data && data.length > 0) {
        const greetingsWithLikes = data.map(g => ({ ...g, likes: 0 }));
        setGreetings(greetingsWithLikes);
        
        // Сохраняем в localStorage как резервную копию
        localStorage.setItem('daria-greetings', JSON.stringify(greetingsWithLikes));
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Отправка нового поздравления
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !newName.trim()) return;

    setIsSubmitting(true);

    const newGreeting: Omit<Greeting, 'id' | 'created_at'> = {
      name: newName,
      message: newMessage,
      color: selectedColor,
    };

    try {
      // Пытаемся отправить в базу данных
      const { data, error } = await supabase
        .from('greetings')
        .insert([newGreeting])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        // Добавляем в локальное состояние
        const greetingWithLikes = { ...data, likes: 0 };
        setGreetings(prev => [greetingWithLikes, ...prev]);
        
        // Сохраняем в localStorage
        const stored = JSON.parse(localStorage.getItem('daria-greetings') || '[]');
        localStorage.setItem('daria-greetings', JSON.stringify([greetingWithLikes, ...stored]));
      }
    } catch (error) {
      console.error('Error saving to database:', error);
      
      // Если ошибка, сохраняем локально
      const localGreeting: Greeting = {
        id: Date.now().toString(),
        name: newName,
        message: newMessage,
        color: selectedColor,
        created_at: new Date().toISOString(),
        likes: 0,
      };
      
      setGreetings(prev => [localGreeting, ...prev]);
      
      const stored = JSON.parse(localStorage.getItem('daria-greetings') || '[]');
      localStorage.setItem('daria-greetings', JSON.stringify([localGreeting, ...stored]));
      
      alert('Сообщение сохранено локально. База данных временно недоступна.');
    } finally {
      setNewMessage('');
      setNewName('');
      setShowForm(false);
      setIsSubmitting(false);
    }
  };

  // Обработка лайков
  const handleLike = async (greetingId: string) => {
    if (likedGreetings.has(greetingId)) {
      return; // Уже лайкнули
    }

    try {
      // Обновляем локальное состояние
      setGreetings(prev =>
        prev.map(g =>
          g.id === greetingId
            ? { ...g, likes: (g.likes || 0) + 1 }
            : g
        )
      );

      // Добавляем в множество лайкнутых
      setLikedGreetings(prev => new Set(prev).add(greetingId));

      // Сохраняем лайк в localStorage
      const liked = JSON.parse(localStorage.getItem('daria-liked-greetings') || '[]');
      localStorage.setItem('daria-liked-greetings', JSON.stringify([...liked, greetingId]));

      // Можно добавить логику для сохранения лайков в базу данных
      // await supabase.rpc('increment_likes', { greeting_id: greetingId });

    } catch (error) {
      console.error('Error liking greeting:', error);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      const htmlContent = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Поздравления для Дарьи</title>
            <style>
                body {
                    background: #000;
                    color: #fff;
                    font-family: sans-serif;
                    padding: 40px;
                    max-width: 800px;
                    margin: 0 auto;
                }
                .header {
                    text-align: center;
                    margin-bottom: 40px;
                }
                .greeting {
                    background: rgba(255,255,255,0.1);
                    border-left: 4px solid;
                    padding: 20px;
                    margin-bottom: 20px;
                    border-radius: 8px;
                    backdrop-filter: blur(10px);
                }
                .name {
                    font-weight: bold;
                    margin-bottom: 10px;
                    font-size: 1.2em;
                }
                .message {
                    margin-bottom: 10px;
                    line-height: 1.5;
                }
                .timestamp {
                    font-size: 0.8em;
                    color: #888;
                    text-align: right;
                }
                .likes {
                    font-size: 0.8em;
                    color: #ff4757;
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Поздравления для Дарьи</h1>
                <p>Собрано ${greetings.length} поздравлений</p>
            </div>
            ${greetings.map(g => `
                <div class="greeting" style="border-left-color: ${g.color}">
                    <div class="name" style="color: ${g.color}">${g.name}</div>
                    <div class="message">${g.message}</div>
                    <div class="likes">❤️ ${g.likes || 0} лайков</div>
                    <div class="timestamp">${new Date(g.created_at).toLocaleDateString('ru-RU')}</div>
                </div>
            `).join('')}
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'daria-greetings.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading:', error);
      alert('Ошибка при скачивании');
    } finally {
      setIsDownloading(false);
    }
  };

  // Загружаем данные при монтировании
  useEffect(() => {
    fetchGreetings();
    
    // Загружаем лайки из localStorage
    const liked = JSON.parse(localStorage.getItem('daria-liked-greetings') || '[]');
    setLikedGreetings(new Set(liked));
  }, []);

  // Подписка на реальные обновления (опционально)
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return;

    const channel = supabase
      .channel('greetings-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'greetings',
        },
        (payload) => {
          // Добавляем новое сообщение в реальном времени
          const newGreeting = payload.new as Greeting;
          setGreetings(prev => [{ ...newGreeting, likes: 0 }, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gray-900/50 rounded-full px-6 py-3 border border-white/10 mb-6">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span className="text-white/80">Доска пожеланий с базой данных</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Стена поздравлений
            </span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Все поздравления сохраняются на этой странице навмегда.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={fetchGreetings}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-800 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Загрузка...' : 'Обновить'}
          </button>
          <div className="text-sm text-white/60 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            Онлайн: {greetings.length} сообщений
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Форма для нового сообщения */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Добавить поздравление</h3>
                    <p className="text-sm text-white/60">Сохраняется в облачной базе</p>
                  </div>
                </div>

                {!showForm ? (
                  <button
                    onClick={() => setShowForm(true)}
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-pink-600 rounded-xl font-semibold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Написать поздравление
                  </button>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm text-white/70 mb-2">
                        Твоё имя
                      </label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-4 py-3 bg-black/50 rounded-lg border border-white/20 focus:border-cyan-500 outline-none transition-colors"
                        placeholder="Подпишись так, чтобы Дарья поняла от кого это"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-white/70 mb-2">
                        Выбери цвет стикера
                      </label>
                      <div className="flex gap-2 mb-4 flex-wrap">
                        {colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            disabled={isSubmitting}
                            className={`w-8 h-8 rounded-full border-2 transition-transform ${
                              selectedColor === color
                                ? 'border-white scale-110'
                                : 'border-transparent'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-white/70 mb-2">
                        Твоё сообщение
                      </label>
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full h-32 px-4 py-3 bg-black/50 rounded-lg border border-white/20 focus:border-cyan-500 outline-none transition-colors resize-none"
                        placeholder="Напиши своё пожелание для Дарьи..."
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-pink-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-xl transition-all disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Отправка...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Отправить
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        disabled={isSubmitting}
                        className="px-4 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.form>
                )}

                <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                  <button
                    onClick={handleDownload}
                    disabled={isDownloading || greetings.length === 0}
                    className="w-full py-3 bg-gradient-to-r from-lily-gold/20 to-lily-gold/40 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-lily-gold/30 transition-all disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    {isDownloading ? 'Скачивание...' : 'Скачать все поздравления'}
                  </button>
                  
                  <div className="text-center">
                    <p className="text-sm text-white/60">
                      Всего поздравлений: <span className="text-white font-bold">{greetings.length}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Доска с поздравлениями */}
          <div className="lg:col-span-2">
            <div className="min-h-[600px] bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-white/10 paper-texture relative">
              {isLoading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
                    <p className="text-white/60">Загружаю поздравления из базы данных...</p>
                  </div>
                </div>
              ) : (
                <AnimatePresence>
                  {greetings.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center p-8"
                    >
                      <MessageSquare className="w-16 h-16 text-white/20 mb-4" />
                      <h3 className="text-xl font-bold mb-2">База данных пуста</h3>
                      <p className="text-white/60 mb-4">
                        Будь первым, кто оставит пожелание!
                      </p>
                      <button
                        onClick={() => setShowForm(true)}
                        className="px-6 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition-colors"
                      >
                        Написать первым
                      </button>
                    </motion.div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-min">
                      <AnimatePresence>
                        {greetings.map((greeting) => (
                          <motion.div
                            key={greeting.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="relative group"
                            style={{
                              transform: `rotate(${Math.random() * 4 - 2}deg)`,
                            }}
                          >
                            {/* Стикер */}
                            <div
                              className="relative p-4 rounded-lg shadow-xl"
                              style={{ backgroundColor: greeting.color + '20' }}
                            >
                              {/* Уголок стикера */}
                              <div
                                className="absolute top-0 right-0 w-8 h-8"
                                style={{
                                  borderTop: `16px solid ${greeting.color}`,
                                  borderLeft: `16px solid transparent`,
                                }}
                              />
                              
                              {/* Содержимое */}
                              <div className="relative z-10">
                                <div 
                                  className="text-lg font-bold mb-2"
                                  style={{ color: greeting.color }}
                                >
                                  {greeting.name}
                                </div>
                                <p className="text-white/90 mb-3 leading-relaxed text-sm">
                                  {greeting.message}
                                </p>
                                
                                <div className="flex justify-between items-center mt-4">
                                  <div className="flex items-center gap-1 text-xs text-white/60">
                                    <Heart className={`w-3 h-3 ${likedGreetings.has(greeting.id) ? 'fill-red-500 text-red-500' : ''}`} />
                                    <span>{greeting.likes || 0}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Эффект при наведении */}
                              <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-white/30 transition-all duration-300"></div>
                            </div>

                            {/* Кнопка сердечка */}
                            <button
                              className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all z-20 ${
                                likedGreetings.has(greeting.id)
                                  ? 'bg-red-500/80 opacity-100'
                                  : 'bg-black/80 opacity-0 group-hover:opacity-100'
                              }`}
                              onClick={() => handleLike(greeting.id)}
                              title="Поставить лайк"
                            >
                              <Heart className={`w-4 h-4 ${
                                likedGreetings.has(greeting.id) ? 'fill-white text-white' : 'text-white'
                              }`} />
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

