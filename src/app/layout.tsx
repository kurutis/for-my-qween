import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import BackgroundEffects from '@/components/BackgroundEffects';
import LogoEasterEgg from '@/components/LogoEasterEgg';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });
const playfair = Playfair_Display({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair'
});

export const metadata = {
  title: 'С Днем Рождения, Дарья!',
  description: 'Персональный сайт-подарок с интерактивными элементами',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.className} ${playfair.variable}`}>
      <body className="bg-black text-white min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50 pointer-events-none"></div>
        
        {/* Логотип с пасхалкой */}
        <LogoEasterEgg />
        
        {/* Навигация */}
        <Navigation />
        
        {/* Основной контент - ДОБАВЛЯЕМ PADDING */}
        <main className="relative z-10 pt-24 md:pt-28"> {/* Добавлен padding-top */}
          {children}
        </main>
        
        {/* Фоновые эффекты */}
        <BackgroundEffects />
      </body>
    </html>
  );
}
