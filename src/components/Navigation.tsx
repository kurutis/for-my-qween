'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, History, Gamepad2, Palette, MessageSquare, Lock, Menu, X, Camera, Sparkles, Trophy, Puzzle } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Главная', icon: Home },
  { href: '/evolution', label: 'Эволюция', icon: History },
  { href: '/memories', label: 'Визуальная биография', icon: Camera },
  { href: '/hobbies', label: 'Миры увлечений', icon: Gamepad2 },
  { href: '/puzzle', label: 'Секретный пазл', icon: Puzzle }, // ← ЗАМЕНИЛИ ИГРУ НА ПАЗЛ
  { href: '/design-studio', label: 'Кабинет дизайна', icon: Palette },
  { href: '/greetings', label: 'Поздравления', icon: MessageSquare },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  const isHomePage = pathname === '/';

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
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'text-white bg-phoenix-red/25'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-phoenix-red rounded-full"></div>
                )}
              </Link>
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
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'text-white bg-phoenix-red/30'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="font-medium text-sm">{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-phoenix-red rounded-full"></div>
                    )}
                  </Link>
                );
              })}
              
              <div className="pt-3 border-t border-white/10">
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
    </>
  );
}