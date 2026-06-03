import Link from 'next/link';
import { CharacterData } from '@/types/character';

export default function CharacterCard({ character }: { character: CharacterData }) {
  const is5Star = character.rarity === 5;
  const bgGradient = is5Star ? 'from-yellow-600/40 to-yellow-900/60 border-yellow-500/50' : 'from-purple-500/40 to-purple-900/60 border-purple-500/50';

  return (
    <Link href={`/characters/${character.id}`}>
      <div className={`relative flex flex-col justify-end h-40 rounded-lg border-2 bg-gradient-to-t ${bgGradient} hover:scale-105 transition-all duration-200 overflow-hidden cursor-pointer`}>
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div 
            className="w-full h-full opacity-90 bg-cover bg-center bg-no-repeat" 
            style={{ backgroundImage: `url(${character.avatarUrl})` }}
          />
        </div>
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="w-6 h-6 bg-black/70 rounded-full border border-gray-500 flex items-center justify-center text-xs font-bold text-white">
            {character.element.charAt(0)}
          </span>
        </div>
        <div className="w-full bg-[#1c1c22]/90 backdrop-blur-sm text-gray-100 text-center py-1.5 text-sm font-semibold truncate px-2 border-t border-white/10">
          {character.name}
        </div>
      </div>
    </Link>
  );
}
