import Image from 'next/image';
import Link from 'next/link';
import { WeaponBuild } from '@/types/character';

export default function WeaponCard({ weapon, index }: { weapon: WeaponBuild; index: number }) {
  const rarity = weapon.rarity || 4;

  let cardBg = "bg-[#111115]/80 border-gray-700/50";
  let imgBg = "bg-gradient-to-br from-[#a256e8] to-[#6f38a6]";
  let starColor = "text-purple-400";
  let stars = "★★★★";

  if (rarity === 5) {
    cardBg = "bg-[#1c1812]/80 border-amber-600/30";
    imgBg = "bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#E65100]";
    starColor = "text-amber-400";
    stars = "★★★★★";
  } else if (rarity === 3) {
    cardBg = "bg-[#12161c]/80 border-blue-600/30";
    imgBg = "bg-gradient-to-br from-[#40C4FF] via-[#0288D1] to-[#01579B]";
    starColor = "text-blue-400";
    stars = "★★★";
  }

  const cardContent = (
    <div className={`flex items-center gap-4 p-3 rounded-xl border ${cardBg} transition-all duration-300 hover:border-opacity-80 hover:brightness-110 cursor-pointer`}>
      <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-[#1c2333] border border-[#26314a] text-[#7192d6] text-xs font-bold ml-1">
        {index + 1}
      </div>

      {weapon.iconUrl ? (
        <div className={`w-12 h-12 shrink-0 rounded-lg overflow-hidden ${imgBg} p-[1px]`}>
          <Image
            src={weapon.iconUrl}
            alt={weapon.name}
            width={48}
            height={48}
            className="w-full h-full object-cover bg-black/20 rounded-md"
          />
        </div>
      ) : (
        <div className="w-12 h-12 shrink-0 rounded-lg bg-gray-800 flex items-center justify-center text-xs text-gray-500">Img</div>
      )}

      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-gray-100 text-base leading-none">{weapon.name}</span>
          <span className={`${starColor} text-[10px] font-bold font-mono tracking-wider align-middle select-none`}>
            {stars}
          </span>
          {weapon.refinement && weapon.refinement > 1 && (
            <span className="bg-[#1c2333] text-[#7192d6] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#26314a] leading-none">
              R{weapon.refinement}
            </span>
          )}
          {weapon.isF2P && (
            <span className="bg-green-900/30 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-800/50 leading-none">
              F2P
            </span>
          )}
        </div>
        <span className="text-gray-400 text-xs mt-1.5">{weapon.subStat || 'Unknown Stat'}</span>
      </div>

      {/* Arrow indicator */}
      {weapon.id && (
        <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </div>
  );

  return (
    <div className="flex flex-col">
      {weapon.id ? (
        <Link href={`/weapons/${weapon.id}`}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}

      {weapon.passiveDesc && (
        <p className="text-gray-400 text-sm mt-3 px-1 leading-relaxed">
          {weapon.passiveDesc.split(/(CRIT Rate|CRIT DMG|ATK%|Độ Tăng Tỷ Lệ Phá Tính|Tỷ Lệ Bạo Kích|ST Bạo Kích|Hiệu Quả Nạp Nguyên Tố|Tấn Công%|DMG chí)/g).map((part, i) =>
            /CRIT Rate|CRIT DMG|ATK%|Độ Tăng Tỷ Lệ Phá Tính|Tỷ Lệ Bạo Kích|ST Bạo Kích|Hiệu Quả Nạp Nguyên Tố|Tấn Công%|DMG chí/.test(part) ? (
              <span key={i} className="text-orange-400">{part}</span>
            ) : part
          )}
        </p>
      )}
    </div>
  );
}
