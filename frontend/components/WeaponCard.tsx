import Image from 'next/image';
import Link from 'next/link';
import { WeaponBuild } from '@/types/character';

export default function WeaponCard({ weapon, index }: { weapon: WeaponBuild; index: number }) {
  const rarity = weapon.rarity || 4;

  let cardBg = "bg-[#111115]/50 border-gray-800/60";
  let imgBg = "bg-gradient-to-br from-[#a256e8] to-[#6f38a6]";
  let starColor = "text-purple-400";
  let stars = "★★★★";

  if (rarity === 5) {
    cardBg = "bg-[#1c1812]/50 border-amber-600/30 shadow-[0_0_15px_rgba(245,158,11,0.05)]";
    imgBg = "bg-gradient-to-br from-[#FFE082] via-[#FFB300] to-[#E65100]";
    starColor = "text-amber-400";
    stars = "★★★★★";
  } else if (rarity === 3) {
    cardBg = "bg-[#12161c]/50 border-blue-600/30";
    imgBg = "bg-gradient-to-br from-[#40C4FF] via-[#0288D1] to-[#01579B]";
    starColor = "text-blue-400";
    stars = "★★★";
  }

  const cardContent = (
    <div className={`flex items-center gap-4 p-4 rounded-2xl border ${cardBg} transition-all duration-300 hover:border-white/10 hover:bg-[#151520]/50 hover:shadow-lg cursor-pointer group`}>
      <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-[#101015] border border-gray-800 text-gray-400 text-xs font-black">
        {index + 1}
      </div>

      {weapon.iconUrl ? (
        <div className={`w-14 h-14 shrink-0 rounded-xl overflow-hidden ${imgBg} p-[1px]`}>
          <div className="w-full h-full bg-[#07070a]/90 rounded-xl overflow-hidden p-1">
            <Image
              src={weapon.iconUrl}
              alt={weapon.name}
              width={56}
              height={56}
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>
      ) : (
        <div className="w-14 h-14 shrink-0 rounded-xl bg-gray-950 border border-gray-900 flex items-center justify-center text-xs text-gray-600">Img</div>
      )}

      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <span className="font-extrabold text-white text-base leading-tight font-display">{weapon.name}</span>
          <span className={`${starColor} text-[10px] font-bold font-mono tracking-wider align-middle select-none`}>
            {stars}
          </span>
          {weapon.refinement && weapon.refinement > 1 && (
            <span className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-1.5 py-0.5 rounded border border-blue-500/20 leading-none">
              R{weapon.refinement}
            </span>
          )}
          {weapon.isF2P && (
            <span className="bg-green-500/10 text-green-400 text-[10px] font-black px-1.5 py-0.5 rounded border border-green-500/20 leading-none">
              F2P
            </span>
          )}
        </div>
        <span className="text-gray-400 text-xs font-medium">{weapon.subStat || 'Unknown Stat'}</span>
      </div>

      {/* Arrow indicator */}
      {weapon.id && (
        <div className="w-8 h-8 rounded-lg bg-[#07070a] border border-gray-800 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:border-gray-600 transition-all shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
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
        <p className="text-gray-400 text-xs md:text-sm mt-3 px-1 leading-relaxed border-l-2 border-gray-900 pl-3">
          {weapon.passiveDesc.split(/(CRIT Rate|CRIT DMG|ATK%|Energy Recharge|Elemental Mastery|HP%|ATK|HP|DEF%|DEF|Sát Thương Bạo Kích|Tỷ Lệ Bạo Kích|Tinh Thông Nguyên Tố|Tấn Công|Tấn Công%|Hiệu Quả Nạp)/g).map((part, i) =>
            /CRIT Rate|CRIT DMG|ATK%|Energy Recharge|Elemental Mastery|HP%|ATK|HP|DEF%|DEF|Sát Thương Bạo Kích|Tỷ Lệ Bạo Kích|Tinh Thông Nguyên Tố|Tấn Công|Tấn Công%|Hiệu Quả Nạp/.test(part) ? (
              <span key={i} className="text-yellow-500 font-bold">{part}</span>
            ) : part
          )}
        </p>
      )}
    </div>
  );
}
