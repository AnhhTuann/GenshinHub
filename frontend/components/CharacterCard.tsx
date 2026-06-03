import Link from 'next/link';
import { CharacterData } from '@/types/character';

export default function CharacterCard({ character }: { character: CharacterData }) {
  const is5Star = character.rarity === 5;
  
  // Style viền và gradient tinh tế hơn, thêm shadow glow khi hover
  const themeStyle = is5Star 
    ? 'border-yellow-600/30 from-yellow-900/10 to-yellow-800/40 group-hover:border-yellow-400/80 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.25)]' 
    : 'border-purple-600/30 from-purple-900/10 to-purple-800/40 group-hover:border-purple-400/80 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]';

  return (
    <Link className="block group" href={`/characters/${character.id}`}>
      <div className={`relative flex flex-col justify-end h-44 rounded-xl border bg-gradient-to-b ${themeStyle} transition-all duration-300 overflow-hidden`}>
        
        {/* Top-left Element icon */}
        <div className="absolute top-2 left-2 z-10 w-7 h-7 drop-shadow-md">
           <img src={`/elements/${character.element.toLowerCase()}.png`} alt={character.element} className="w-full h-full object-contain" onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/24x24/333/FFF?text='+character.element.charAt(0); }} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div 
            className="w-full h-full opacity-90 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105" 
            style={{ backgroundImage: `url(${character.avatarUrl})` }}
          />
        </div>
        
        <div className="w-full bg-[#1c1c22]/90 backdrop-blur-sm text-gray-100 text-center py-1.5 text-sm font-semibold truncate px-2 border-t border-white/10 group-hover:text-white transition-colors">
          {character.name}
        </div>
      </div>
    </Link>
  );
}
