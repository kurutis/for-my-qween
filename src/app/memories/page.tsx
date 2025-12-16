import ArtisticPhotoGrid from '@/components/ArtisticPhotoGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Визуальная биография | Дарья 20 лет',
  description: 'Фотографии, запечатлевшие путь от детства к творческой зрелости',
};

export default function MemoriesPage() {
  return (
    <div className="min-h-screen">
      <ArtisticPhotoGrid />
      
      {/* Дополнительный контент */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-phoenix-red to-lily-gold bg-clip-text text-transparent">
              О фотографиях
            </span>
          </h3>
          <div className="space-y-6 text-white/70 text-lg leading-relaxed">
            <p>
              Эти фотографии — не просто снимки. Это кадры из фильма длиною в 20 лет, 
              где главная героиня проходит путь от мечтательного ребёнка до талантливого дизайнера.
            </p>
            <p>
              Каждый снимок — это остановленное мгновение, в котором можно увидеть 
              формирование личности, развитие творческого взгляда и становление характера.
            </p>
            <p>
              От детской непосредственности через подростковые поиски себя 
              к уверенному профессионализму — вот маршрут, который проделала Дарья.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}