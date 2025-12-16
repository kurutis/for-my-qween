'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, History, Gamepad2, Palette, MessageSquare, Lock, Menu, X, Camera, Sparkles, Trophy, Puzzle, Clock } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Главная', icon: Home, alwaysAccessible: true },
  { href: '/evolution', label: 'Эволюция', icon: History, alwaysAccessible: false },
  { href: '/memories', label: 'Визуальная биография', icon: Camera, alwaysAccessible: false },
  { href: '/hobbies', label: 'Миры увлечений', icon: Gamepad2, alwaysAccessible: false },
  { href: '/puzzle', label: 'Секретный пазл', icon: Puzzle, alwaysAccessible: false },
  { href: '/design-studio', label: 'Кабинет дизайна', icon: Palette, alwaysAccessible: false },
  { href: '/greetings', label: 'Поздравления', icon: MessageSquare, alwaysAccessible: true }, // Доступна всегда
];

// Целевая дата разблокировки: 19 декабря 2025, 00:00 по Москве
const UNLOCK_DATE = new Date('2025-12-19T00:00:00+03:00');

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(true); // По умолчанию true для тестирования
  const pathname = usePathname();
  const router = useRouter();
  
  const isHomePage = pathname === '/';

  // Проверяем время и устанавливаем статус блокировки
  useEffect(() => {
    const checkUnlockStatus = () => {
      const now = new Date();
      const unlocked = now >= UNLOCK_DATE;
      setIsUnlocked(unlocked);
      
      // Если страница заблокирована и пользователь пытается получить к ней доступ
      if (!unlocked && pathname !== '/' && pathname !== '/greetings') {
        const currentItem = navItems.find(item => item.href === pathname);
        if (currentItem && !currentItem.alwaysAccessible) {
          // Перенаправляем на главную, если пытается получить доступ к заблокированной странице
          router.push('/');
        }
      }
    };

    checkUnlockStatus();
    const timer = setInterval(checkUnlockStatus, 1000);
    return () => clearInterval(timer);
  }, [pathname, router]);

  // Таймер обратного отсчета
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = UNLOCK_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('Доступ открыт! 🎉');
        setIsUnlocked(true);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${days}д ${hours}ч ${minutes}м ${seconds}с`);
    };

    updateCountdown();
    const countdownTimer = setInterval(updateCountdown, 1000);
    return () => clearInterval(countdownTimer);
  }, []);

  // Функция для проверки доступности страницы
  const isPageAccessible = (href: string) => {
    const item = navItems.find(item => item.href === href);
    if (!item) return false;
    
    // Главная и поздравления всегда доступны
    if (item.alwaysAccessible) return true;
    
    // Остальные страницы только после 19 декабря
    return isUnlocked;
  };

  // Обработчик клика по навигации
  const handleNavigation = (e: React.MouseEvent, href: string, label: string) => {
    if (!isPageAccessible(href)) {
      e.preventDefault();
      
      // Показываем модальное окно с обратным отсчетом
      const now = new Date();
      const diff = UNLOCK_DATE.getTime() - now.getTime();
      
      if (diff > 0) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm';
        modal.innerHTML = `
          <div class="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 max-w-sm border border-white/20">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-phoenix-red to-lily-gold flex items-center justify-center">
                <Lock class="w-8 h-8 text-white" />
              </div>
              <h3 class="text-xl font-bold mb-2">Доступ откроется 19.12.25</h3>
              <p class="text-white/70 mb-4">Страница "${label}" будет доступна в день рождения Дарьи!</p>
              <div class="bg-black/50 rounded-lg p-4 mb-4">
                <div class="flex items-center justify-center gap-2 text-sm text-white/60 mb-2">
                  <Clock class="w-4 h-4" />
                  <span>Осталось времени:</span>
                </div>
                <div class="text-2xl font-bold text-lily-gold">${timeLeft}</div>
              </div>
              <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                class="px-6 py-2 bg-phoenix-red rounded-lg hover:bg-phoenix-red/80 transition-colors">
                Понятно
              </button>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        
        // Удаляем модалку при клике на фон
        modal.addEventListener('click', (e) => {
          if (e.target === modal) {
            modal.remove();
          }
        });
      }
    }
  };

  return (
    <>
      {/* Десктопная навигация */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 hidden md:block z-40 ${isHomePage ? 'opacity-90 hover:opacity-100' : ''}`}>
        <div className={`flex items-center gap-2 backdrop-blur-md rounded-full px-5 py-2.5 border transition-all duration-300 ${
          isHomePage 
            ? 'bg-black/40 border-white/20 hover:bg-black/60' 
            : 'bg-black/60 border-white/25'
        }`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const accessible = isPageAccessible(item.href);
            
            return (
              <div key={item.href} className="relative">
                <Link
                  href={accessible ? item.href : '#'}
                  onClick={(e) => !accessible && handleNavigation(e, item.href, item.label)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-phoenix-red/25'
                      : accessible
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-white/30 cursor-not-allowed'
                  }`}
                  title={!accessible ? `Откроется 19.12.25\nОсталось: ${timeLeft}` : ''}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-sm font-medium">{item.label}</span>
                  {!accessible && (
                    <Lock className="w-3 h-3 ml-1" />
                  )}
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-phoenix-red rounded-full"></div>
                  )}
                </Link>
                
                {/* Подсказка для заблокированных страниц */}
                {!accessible && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 backdrop-blur-sm rounded-lg border border-white/20 text-xs whitespace-nowrap opacity-0 hover:opacity-100 pointer-events-none transition-opacity">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>Откроется 19.12.25</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Мобильная навигация */}
      <nav className={`fixed top-3 right-3 z-40 md:hidden ${isHomePage ? 'opacity-90 hover:opacity-100' : ''}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center border transition-all ${
            isHomePage 
              ? 'bg-black/40 border-white/20 hover:bg-black/60' 
              : 'bg-black/60 border-white/25'
          }`}
        >
          {isOpen ? (
            <X className="w-4 h-4 text-white" />
          ) : (
            <Menu className="w-4 h-4 text-white" />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-12 right-0 w-56 bg-black/90 backdrop-blur-md rounded-xl border border-white/20 p-3">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const accessible = isPageAccessible(item.href);
                
                return (
                  <div key={item.href} className="relative">
                    <Link
                      href={accessible ? item.href : '#'}
                      onClick={(e) => {
                        if (!accessible) {
                          e.preventDefault();
                          handleNavigation(e, item.href, item.label);
                          setIsOpen(false);
                        } else {
                          setIsOpen(false);
                        }
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? 'text-white bg-phoenix-red/30'
                          : accessible
                            ? 'text-white/80 hover:text-white hover:bg-white/10'
                            : 'text-white/30 cursor-not-allowed'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="font-medium text-sm">{item.label}</span>
                      {!accessible && (
                        <Lock className="w-3 h-3 ml-auto" />
                      )}
                      {isActive && accessible && (
                        <div className="ml-auto w-1.5 h-1.5 bg-phoenix-red rounded-full"></div>
                      )}
                    </Link>
                  </div>
                );
              })}
              
              <div className="pt-3 border-t border-white/10">
                {/* Секция с таймером разблокировки */}
                <div className="px-3 py-2 bg-black/50 rounded-lg mb-2">
                  <div className="flex items-center gap-2 text-xs text-white/60 mb-1">
                    <Clock className="w-3 h-3" />
                    <span>Полная разблокировка:</span>
                  </div>
                  <div className="text-sm font-bold text-lily-gold">{timeLeft}</div>
                  <div className="text-xs text-white/40 mt-1">19 декабря 00:00 (МСК)</div>
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-2 text-white/50 text-xs">
                  <Lock className="w-2.5 h-2.5" />
                  <span>Нажми 20 раз на логотип</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Индикатор прогресса */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 text-xs text-white/50">
        <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-phoenix-red to-lily-gold transition-all duration-300"
            style={{
              width: pathname === '/' ? '14%' :
                     pathname === '/evolution' ? '28%' :
                     pathname === '/memories' ? '42%' :
                     pathname === '/hobbies' ? '56%' :
                     pathname === '/puzzle' ? '70%' :
                     pathname === '/design-studio' ? '84%' :
                     pathname === '/greetings' ? '98%' : '14%'
            }}
          />
        </div>
        <span className="text-xs">Путешествие</span>
      </div>

      {/* Баннер разблокировки (если все еще заблокировано) */}
      {!isUnlocked && pathname !== '/' && pathname !== '/greetings' && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 max-w-md border border-white/20 mx-4">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-phoenix-red to-lily-gold flex items-center justify-center animate-pulse">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Доступ откроется 19 декабря!</h3>
              <p className="text-white/70 mb-6">
                Эта часть сайта станет доступна в день рождения Дарьи. 
                Следите за обратным отсчетом!
              </p>
              <div className="bg-black/50 rounded-xl p-5 mb-6">
                <div className="flex items-center justify-center gap-3 text-lg text-white/60 mb-3">
                  <Clock className="w-5 h-5" />
                  <span>До разблокировки осталось:</span>
                </div>
                <div className="text-3xl font-bold text-lily-gold animate-pulse">{timeLeft}</div>
                <div className="text-sm text-white/40 mt-3">19 декабря 2025, 00:00 по Москве</div>
              </div>
              <Link
                href="/"
                className="inline-block px-8 py-3 bg-gradient-to-r from-phoenix-red to-lily-gold rounded-lg font-semibold hover:shadow-xl transition-all"
              >
                Вернуться на главную
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}