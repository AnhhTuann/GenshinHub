import Image from 'next/image';
import { CharacterData } from '@/types/character';

export default function CharacterSidebar({ character }: { character: CharacterData }) {
  const is5Star = character.rarity === 5;
  const borderTheme = is5Star ? 'border-yellow-500/50' : 'border-purple-500/50';
  const gradientTheme = is5Star ? 'from-yellow-900/40' : 'from-purple-900/40';

  return (
    <div className="w-full lg:w-[35%] lg:sticky lg:top-24 flex flex-col gap-4">
      <div className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden border ${borderTheme} shadow-2xl`}>
        
        <div className={`absolute inset-0 bg-gradient-to-tr ${gradientTheme} to-transparent opacity-50`}></div>
        
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: character.splashArtUrl ? `url(${character.splashArtUrl})` : 'none' }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Image src={`/elements/${character.element.toLowerCase()}.png`} alt={character.element} width={20} height={20} className="w-5 h-5 drop-shadow-md" />
            <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest">{character.element}</span>
          </div>
          <h1 className="text-4xl font-black text-white mt-1 drop-shadow-lg">{character.name}</h1>
          <p className="text-gray-300 font-medium text-lg drop-shadow-md">{character.title}</p>
          
          <div className="flex text-yellow-400 text-sm mt-3">
            {Array(character.rarity).fill(0).map((_, i) => <span key={i}>★</span>)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#15151a] border border-gray-800/60 p-4 rounded-xl flex flex-col">
          <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Region</span>
          <span className="text-gray-100 font-medium">{character.region}</span>
        </div>
        <div className="bg-[#15151a] border border-gray-800/60 p-4 rounded-xl flex flex-col">
          <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Weapon</span>
          <span className="text-gray-100 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gray-500"></span> {character.weapon}
          </span>
        </div>
      </div>
    </div>
  );
}
