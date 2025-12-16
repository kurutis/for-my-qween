import NailSalon from '@/components/Hobbies/NailSalon';
import ValorantProfile from '@/components/Hobbies/ValorantProfile';
import GenshinWorld from '@/components/Hobbies/GenshinWorld';

export default function HobbiesPage() {
  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Миры увлечений
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Разные вселенные, одна страсть — создавать, исследовать и побеждать
          </p>
        </div>
        
        <div className="space-y-12">
          <ValorantProfile />
          <GenshinWorld />
          <NailSalon />
        </div>
      </div>
    </div>
  );
}