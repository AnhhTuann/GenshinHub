import Link from 'next/link';
import Image from 'next/image';
import { CharacterItem as CharacterData } from '@/types/character';

interface Props {
  character: CharacterData;
}

export default function CharacterCard({ character }: Props) {
  // Xác định màu sắc dựa trên độ hiếm (5 sao = Vàng, 4 sao = Tím)
  const is5Star = character.rarity === 5;
  const bgGradient = is5Star
    ? 'from-yellow-600/40 to-yellow-900/60 border-yellow-500/50'
    : 'from-purple-500/40 to-purple-900/60 border-purple-500/50';

  return (
    <Link href={`/characters/${character.id}`}>
      <div 
        className={`relative flex flex-col justify-end h-40 rounded-lg border-2 bg-gradient-to-t ${bgGradient} hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-200 overflow-hidden cursor-pointer`}
      >
        {/* Avatar nhân vật (Tối ưu bằng next/image) */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <Image 
            src={character.avatarUrl || 'https://placehold.co/150x150/333/FFF?text=?'} 
            alt={character.name} 
            fill
            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 15vw"
            className="object-cover w-full h-full opacity-90"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Các Icon Nguyên tố & Vũ khí ở góc trái */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <span className="w-6 h-6 bg-black/70 rounded-full border border-gray-500 flex items-center justify-center text-xs font-bold text-white uppercase">
            {character.element.charAt(0)}
          </span>
        </div>

        {/* Dải tên nhân vật ở dưới cùng */}
        <div className="w-full bg-[#1c1c22]/90 backdrop-blur-sm text-gray-100 text-center py-1.5 text-sm font-semibold truncate px-2 border-t border-white/10">
          {character.name}
        </div>
      </div>
    </Link>
  );
}
