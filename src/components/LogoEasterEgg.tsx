'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { Lock, Unlock } from 'lucide-react';

export default function LogoEasterEgg() {
  const [clickCount, setClickCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false); // Новое состояние для активации
  const pathname = usePathname();
  const router = useRouter();
  const logoRef = useRef<HTMLDivElement>(null);
  const unlockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasNavigatedRef = useRef(false);

  // Инициализация
  useEffect(() => {
    console.log('🔧 Инициализация компонента, путь:', pathname);
    setIsMounted(true);
    
    const saved = localStorage.getItem('easterEggClicks');
    console.log('📥 Загружен счетчик из localStorage:', saved);
    
    if (saved) {
      try {
        const count = parseInt(saved, 10);
        if (!isNaN(count) && count > 0) {
          console.log('✅ Счетчик установлен:', count);
          setClickCount(count);
          setIsActive(count > 0); // Активируем если есть клики
        }
      } catch (error) {
        console.error('❌ Ошибка загрузки счетчика:', error);
      }
    }
    
    // Очистка при размонтировании
    return () => {
      if (unlockTimeoutRef.current) {
        clearTimeout(unlockTimeoutRef.current);
      }
    };
  }, []);

  // Сброс состояния при возвращении со страницы /secret
  useEffect(() => {
    console.log('🔄 Обновление пути:', pathname);
    
    // Если мы вернулись с /secret на главную
    if (pathname === '/' && hasNavigatedRef.current) {
      console.log('🔄 Возвращение с /secret, сбрасываю состояние...');
      
      // Сбрасываем все состояния
      setClickCount(0);
      setIsUnlocking(false);
      setShowHint(false);
      setIsHovered(false);
      setIsActive(false);
      
      // Очищаем localStorage
      localStorage.removeItem('easterEggClicks');
      
      // Сбрасываем флаг навигации
      hasNavigatedRef.current = false;
      
      // Очищаем таймер если есть
      if (unlockTimeoutRef.current) {
        clearTimeout(unlockTimeoutRef.current);
        unlockTimeoutRef.current = null;
      }
    }
  }, [pathname]);

  // Сохраняем счетчик
  useEffect(() => {
    if (isMounted && clickCount > 0) {
      console.log('💾 Сохранение счетчика:', clickCount);
      localStorage.setItem('easterEggClicks', clickCount.toString());
      
      // Активируем компонент при первом клике
      if (clickCount === 1) {
        setIsActive(true);
      }
    }
  }, [clickCount, isMounted]);

  // Обработка достижения 20 кликов
  useEffect(() => {
    if (isMounted && clickCount >= 20 && !isUnlocking && !hasNavigatedRef.current) {
      console.log('🎯 Достигнуто 20 кликов! Начинаю разблокировку...');
      setIsUnlocking(true);
      
      // Очищаем предыдущий таймер если есть
      if (unlockTimeoutRef.current) {
        clearTimeout(unlockTimeoutRef.current);
      }
      
      // Запускаем новый таймер
      unlockTimeoutRef.current = setTimeout(() => {
        console.log('🚀 Перехожу на секретную страницу...');
        
        // Устанавливаем флаг что мы перешли
        hasNavigatedRef.current = true;
        
        // Сбрасываем счетчик в localStorage
        localStorage.removeItem('easterEggClicks');
        
        // Переходим на секретную страницу
        router.push('/secret');
      }, 2000);
    }
  }, [clickCount, isUnlocking, router, isMounted]);

  // Показываем подсказку
  useEffect(() => {
    if (isMounted && isActive && clickCount >= 15 && clickCount < 20 && !hasNavigatedRef.current) {
      setShowHint(true);
      const hintTimer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(hintTimer);
    }
  }, [clickCount, isMounted, isActive]);

  // Функция для проверки пути
  const shouldShowComponent = () => {
    if (!isMounted) return false;
    
    const isHomePage = 
      pathname === '/' || 
      pathname === '' || 
      pathname === '/home' || 
      pathname === '/index' ||
      pathname === '/index.html' ||
      pathname.startsWith('/?');
    
    return isHomePage;
  };

  // Не рендерим пока не загрузимся
  if (!isMounted) {
    return null;
  }

  const shouldShow = shouldShowComponent();
  
  if (!shouldShow) {
    return null;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Если уже переходили или разблокировка в процессе, игнорируем клики
    if (hasNavigatedRef.current) {
      console.log('⚠️ Игнорирую клик - уже была навигация');
      return;
    }
    
    if (clickCount < 20 && !isUnlocking) {
      const newCount = clickCount + 1;
      console.log(`🖱️ Клик ${newCount}/20!`);
      setClickCount(newCount);
      
      // Анимация клика
      if (logoRef.current) {
        logoRef.current.style.transform = 'scale(0.95)';
        setTimeout(() => {
          if (logoRef.current) {
            logoRef.current.style.transform = 'scale(1)';
          }
        }, 100);
      }
    }
  };

  // Ручной сброс (для отладки)
  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🔄 Ручной сброс состояния');
    
    // Сбрасываем все состояния
    setClickCount(0);
    setIsUnlocking(false);
    setShowHint(false);
    setIsHovered(false);
    setIsActive(false);
    hasNavigatedRef.current = false;
    
    // Очищаем localStorage
    localStorage.removeItem('easterEggClicks');
    
    // Очищаем таймер если есть
    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
      unlockTimeoutRef.current = null;
    }
    
    console.log('✅ Состояние сброшено');
  };

  // Исправляем стили чтобы избежать ошибки
  const getBackgroundStyle = () => {
    const baseStyle = {
      backgroundSize: '300% 300%',
      pointerEvents: 'auto' as const,
      WebkitTapHighlightColor: 'transparent',
    };

    if (hasNavigatedRef.current) {
      // Если уже переходили, показываем сброшенный стиль
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(45deg, #666666, #888888, #aaaaaa, #666666)',
      };
    }
    
    if (isUnlocking) {
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(45deg, #e63946, #ffd700, #ffffff, #e63946, #ffd700)',
      };
    }
    
    if (isActive) {
      return {
        ...baseStyle,
        backgroundImage: 'linear-gradient(45deg, #e63946, #d4af37, #ffffff, #e63946)',
      };
    }
    
    // Неактивное состояние - едва заметное свечение
    return {
      ...baseStyle,
      backgroundImage: 'linear-gradient(45deg, #333333, #444444, #555555, #333333)',
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, type: "spring" }}
      className="fixed top-6 right-6 md:right-8 z-[9999]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group">
        {/* Основной кликабельный элемент */}
        <div
          ref={logoRef}
          className={`relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 cursor-pointer rounded-full p-1 transition-all duration-300 select-none ${
            isHovered && !hasNavigatedRef.current ? 'animate-gradient-shift' : ''
          } ${isUnlocking && !hasNavigatedRef.current ? 'scale-110 animate-pulse' : ''}
          ${!isActive && !hasNavigatedRef.current ? 'opacity-70 hover:opacity-100' : ''}`}
          style={getBackgroundStyle()}
          onClick={handleClick}
          onContextMenu={(e) => e.preventDefault()}
          title={hasNavigatedRef.current ? 'Сброшено' : isActive ? `Кликов: ${clickCount}/20` : 'Пасхалка...'}
        >
          {/* Внутренний круг */}
          <div className="absolute inset-1 bg-black/95 rounded-full flex items-center justify-center pointer-events-none">
            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
              {hasNavigatedRef.current ? (
                // Если уже переходили, показываем сброшенное состояние
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent pointer-events-none">
                  モッキ
                </div>
              ) : isUnlocking ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent pointer-events-none"
                >
                  モッキ
                </motion.div>
              ) : (
                <>
                  <img
                    src="/icons/logo.svg"
                    alt="Логотип モッキ"
                    className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 object-contain pointer-events-none"
                    draggable="false"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-500 via-white to-yellow-500 bg-clip-text text-transparent';
                      fallback.textContent = 'モッキ';
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
                </>
              )}
            </div>
          </div>

          {/* Счетчик - показываем только если активен */}
          {isActive && !hasNavigatedRef.current && (
            <div
              className={`absolute -top-2 -right-2 w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm z-10 cursor-pointer ${
                isUnlocking
                  ? 'bg-gradient-to-br from-red-500 to-yellow-500 animate-pulse'
                  : 'bg-gradient-to-br from-red-500 to-yellow-500'
              }`}
              onClick={handleClick}
            >
              {clickCount}
            </div>
          )}

          {/* Иконка замка - показываем только если активен */}
          {isActive && !hasNavigatedRef.current && (
            <div 
              className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 z-10 cursor-pointer"
              onClick={handleClick}
            >
              {isUnlocking ? (
                <Unlock className="w-4 h-4 md:w-5 md:h-5 text-green-400 animate-pulse" />
              ) : (
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" />
              )}
            </div>
          )}

          {/* Подсказка при наведении - только если неактивен */}
          {isHovered && !isActive && !hasNavigatedRef.current && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="absolute inset-0 bg-black/40 rounded-full backdrop-blur-sm"></div>
              <span className="relative text-[10px] md:text-xs text-white/90 px-2 py-1 rounded-full">
                🔍
              </span>
            </motion.div>
          )}

          {/* Подсказка при наведении - если активен но не разблокирован */}
          {isHovered && isActive && !isUnlocking && !hasNavigatedRef.current && clickCount < 20 && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] md:text-xs bg-black/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full border border-yellow-500/30 text-yellow-300 pointer-events-none">
              {clickCount}/20
            </div>
          )}

          {/* Подсказка если уже переходили */}
          {isHovered && hasNavigatedRef.current && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] md:text-xs bg-black/80 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full border border-gray-500/30 text-gray-300 pointer-events-none">
              Перезапусти
            </div>
          )}
        </div>

        {/* Подсказка при 15+ кликах */}
        {showHint && !hasNavigatedRef.current && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm bg-black/90 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full border border-yellow-500/30 text-yellow-400 pointer-events-none"
          >
            {20 - clickCount} кликов до секрета
          </motion.div>
        )}

        {/* Сообщение о разблокировке */}
        {isUnlocking && !hasNavigatedRef.current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-14 md:-bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm bg-black/90 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full border border-green-500/30 text-green-400 animate-pulse pointer-events-none"
          >
            Открываю секрет...
          </motion.div>
        )}

        {/* Отладочная информация (можно убрать в продакшене) */}
        {process.env.NODE_ENV === 'development' && (
          <>
            {/* Кнопка сброса (для отладки) */}
            <button
              onClick={handleReset}
              className="absolute -top-24 md:-top-28 left-1/2 -translate-x-1/2 text-[10px] md:text-xs bg-blue-500 hover:bg-blue-600 text-white px-2 md:px-3 py-1 rounded pointer-events-auto z-50"
            >
              Сбросить
            </button>

            {/* Отладочная информация */}
            <div className="absolute -top-36 md:-top-40 left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-white/40 bg-black/50 px-2 py-1 rounded pointer-events-none whitespace-nowrap">
              Кликов: {clickCount}/20<br/>
              Активен: {isActive ? 'Да' : 'Нет'}<br/>
              Разблокировка: {isUnlocking ? 'Да' : 'Нет'}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}