import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { CharacterData } from '@/types/character';
import { useLocale } from 'next-intl';

export default function CharacterCard({ character }: { character: CharacterData }) {
  const locale = useLocale();
  const is5Star = character.rarity === 5;
  const name = locale === 'en' ? character.nameEn : character.nameVi;
  
  const cardBg = is5Star 
    ? 'border-amber-500/20 from-amber-950/10 via-amber-900/10 to-amber-800/30 group-hover:border-amber-400/60 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]' 
    : 'border-purple-500/20 from-purple-950/10 via-purple-900/10 to-purple-800/30 group-hover:border-purple-400/60 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]';

  const rarityTag = is5Star
    ? 'from-amber-400 to-yellow-600'
    : 'from-purple-400 to-fuchsia-600';

  return (
    <Link className="block group" href={`/characters/${character.id}`}>
      <div className={`relative flex flex-col justify-end h-48 rounded-2xl border bg-gradient-to-b ${cardBg} transition-all duration-300 overflow-hidden`}>
        
        {/* Character Image */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 group-hover:scale-105 transition-transform duration-500">
          <Image 
            src={character.avatarUrl || 'https://placehold.co/150x150/222/FFF?text=?'} 
            alt={name} 
            fill
            className="object-cover w-full h-full opacity-90 mask-image-bottom"
          />
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-black/95 via-black/40 to-transparent -z-10"></div>

        {/* Element Icon Badge (Top Left) */}
        <div className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-md border border-white/5 w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
           <Image 
              src={`/elements/${character.element.toLowerCase()}.png`} 
              alt={character.element} 
              width={20}
              height={20}
              className="w-5 h-5 object-contain drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]"
            />
        </div>

        {/* Info Area */}
        <div className="w-full text-center pb-2.5 pt-1 flex flex-col items-center bg-black/45 backdrop-blur-[1px] border-t border-white/5 z-10">
          {/* Star Rating */}
          <div className="flex gap-0.5 mb-1">
            {Array(character.rarity).fill(0).map((_, i) => (
              <span key={i} className="text-[10px] text-yellow-400">★</span>
            ))}
          </div>
          
          {/* Name */}
          <span className="text-xs md:text-sm font-bold tracking-wide text-gray-100 truncate px-2 max-w-full">
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
}
