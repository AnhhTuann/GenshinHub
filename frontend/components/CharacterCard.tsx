import Link from 'next/link';
import Image from 'next/image';
import { CharacterData } from '@/types/character';

export default function CharacterCard({ character }: { character: CharacterData }) {
  const is5Star = character.rarity === 5;
  
  const themeStyle = is5Star 
    ? 'border-yellow-600/30 from-yellow-900/10 to-yellow-800/40 group-hover:border-yellow-400/80 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.25)]' 
    : 'border-purple-600/30 from-purple-900/10 to-purple-800/40 group-hover:border-purple-400/80 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]';

  return (
    <Link className="block group" href={`/characters/${character.id}`}>
      <div className={`relative flex flex-col justify-end h-44 rounded-xl border bg-gradient-to-b ${themeStyle} transition-all duration-300 overflow-hidden`}>
        
        <div className="absolute inset-0 flex items-center justify-center -z-10 group-hover:scale-105 transition-transform duration-500">
          <Image 
            src={character.avatarUrl || 'https://placehold.co/150x150/222/FFF?text=?'} 
            alt={character.name} 
            width={150}
            height={176}
            className="object-cover w-full h-full opacity-95 mask-image-bottom"
          />
        </div>
        
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/90 to-transparent -z-10"></div>

        <div className="absolute top-2 left-2 flex flex-col gap-1">
           <Image 
              src={`/elements/${character.element.toLowerCase()}.png`} 
              alt={character.element} 
              width={28}
              height={28}
              className="w-7 h-7 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            />
        </div>

        <div className="w-full text-center py-2 text-sm font-bold tracking-wide text-gray-100 truncate px-2 border-t border-white/5 bg-black/40 backdrop-blur-[2px]">
          {character.name}
        </div>
      </div>
    </Link>
  );
}
