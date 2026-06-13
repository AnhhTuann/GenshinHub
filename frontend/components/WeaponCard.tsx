"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { WeaponBuild } from '@/types/character';

const translateSubStat = (stat: string | null | undefined, locale: string) => {
  if (!stat) return null;
  if (locale === 'vi') return stat;
  const map: Record<string, string> = {
    'Tỷ Lệ Bạo Kích': 'CRIT Rate',
    'Sát Thương Bạo Kích': 'CRIT DMG',
    'Tấn Công%': 'ATK%',
    'Phòng Ngự%': 'DEF%',
    'HP%': 'HP%',
    'Hiệu Quả Nạp': 'Energy Recharge',
    'Tinh Thông Nguyên Tố': 'Elemental Mastery',
    'Sát Thương Vật Lý%': 'Physical DMG Bonus',
  };
  return map[stat] || stat;
};

const RANK_STYLE: Record<number, string> = {
  1: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
  2: 'bg-white/10 text-white/60 border-white/10',
  3: 'bg-white/[0.05] text-white/40 border-white/[0.06]',
};

export default function WeaponCard({ weapon, index }: { weapon: WeaponBuild; index: number }) {
  const locale      = useLocale();
  const name        = locale === 'en' ? weapon.nameEn : weapon.nameVi;
  const passiveDesc = locale === 'en' ? weapon.passiveDescEn : weapon.passiveDescVi;
  const rarity      = weapon.rarity || 4;
  const rankStyle   = RANK_STYLE[index + 1] ?? RANK_STYLE[3];

  const is5  = rarity === 5;
  const is3  = rarity === 3;
  const starColor = is5 ? 'text-amber-400' : is3 ? 'text-blue-400' : 'text-purple-400';
  const stars     = is5 ? '★★★★★' : is3 ? '★★★' : '★★★★';

  const cardBorder = is5
    ? 'border-amber-500/15 hover:border-amber-500/35 hover:shadow-[0_4px_24px_rgba(245,158,11,0.08)]'
    : 'border-white/[0.05] hover:border-white/10';

  const imgBg = is5
    ? 'bg-gradient-to-br from-[#ffe082] via-[#ffb300] to-[#e65100]'
    : is3
    ? 'bg-gradient-to-br from-[#40c4ff] via-[#0288d1] to-[#01579b]'
    : 'bg-gradient-to-br from-[#a256e8] to-[#6f38a6]';

  const cardContent = (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex items-center gap-4 p-4 rounded-2xl border bg-[#0d0d14]/50 ${cardBorder} transition-all duration-300 cursor-pointer group/w`}
    >
      {/* Rank badge */}
      <span className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black border ${rankStyle}`}>
        {index + 1}
      </span>

      {/* Icon */}
      {weapon.iconUrl ? (
        <div className={`w-14 h-14 shrink-0 rounded-xl overflow-hidden ${imgBg} p-[1.5px]`}>
          <div className="w-full h-full bg-[#06060a]/90 rounded-xl overflow-hidden p-1 flex items-center justify-center">
            <Image src={weapon.iconUrl} alt={name} width={52} height={52} className="w-full h-full object-contain" />
          </div>
        </div>
      ) : (
        <div className="w-14 h-14 shrink-0 rounded-xl bg-[#0d0d14] border border-white/[0.05] flex items-center justify-center text-white/20 text-xs">?</div>
      )}

      {/* Info */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="font-extrabold text-white/90 text-[15px] leading-tight font-display">{name}</span>
          <span className={`${starColor} text-[9px] font-bold tracking-widest select-none`}>{stars}</span>
          {weapon.refinement && weapon.refinement > 1 && (
            <span className="bg-blue-500/10 text-blue-400 text-[9px] font-black px-1.5 py-0.5 rounded-md border border-blue-500/20">R{weapon.refinement}</span>
          )}
          {weapon.isF2P && (
            <span className="bg-green-500/10 text-green-400 text-[9px] font-black px-1.5 py-0.5 rounded-md border border-green-500/20">F2P</span>
          )}
        </div>
        <span className="text-white/35 text-xs font-medium">{translateSubStat(weapon.subStat, locale) || '—'}</span>
      </div>

      {/* Arrow */}
      {weapon.id && (
        <div className="w-7 h-7 rounded-lg bg-[#06060a] border border-white/[0.05] flex items-center justify-center text-white/20 group-hover/w:text-white/60 group-hover/w:border-white/15 transition-all shrink-0">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="flex flex-col">
      {weapon.id ? (
        <Link href={`/weapons/${weapon.id}`}>{cardContent}</Link>
      ) : cardContent}

      {passiveDesc && (
        <p className="text-white/30 text-xs mt-2.5 px-2 leading-relaxed border-l-2 border-white/[0.06] pl-3">
          {passiveDesc.split(/(CRIT Rate|CRIT DMG|ATK%|Energy Recharge|Elemental Mastery|HP%|ATK|DEF%|DEF|HP|Sát Thương Bạo Kích|Tỷ Lệ Bạo Kích|Tinh Thông Nguyên Tố|Tấn Công%|Tấn Công|Hiệu Quả Nạp)/g).map((part, i) =>
            /CRIT Rate|CRIT DMG|ATK%|Energy Recharge|Elemental Mastery|HP%|ATK|DEF%|DEF|HP|Sát Thương Bạo Kích|Tỷ Lệ Bạo Kích|Tinh Thông Nguyên Tố|Tấn Công%|Tấn Công|Hiệu Quả Nạp/.test(part)
              ? <span key={i} className="text-yellow-400/80 font-bold">{part}</span>
              : part
          )}
        </p>
      )}
    </div>
  );
}
