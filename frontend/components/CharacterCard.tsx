"use client";
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { CharacterData } from '@/types/character';
import { useLocale } from 'next-intl';

const ELEMENT_GLOW: Record<string, string> = {
  Pyro:    'group-hover:shadow-[0_0_28px_-2px_rgba(255,107,74,0.55)] group-hover:border-[#ff6b4a]/40',
  Hydro:   'group-hover:shadow-[0_0_28px_-2px_rgba(79,195,247,0.55)]  group-hover:border-[#4fc3f7]/40',
  Cryo:    'group-hover:shadow-[0_0_28px_-2px_rgba(128,222,234,0.55)] group-hover:border-[#80deea]/40',
  Electro: 'group-hover:shadow-[0_0_28px_-2px_rgba(206,147,216,0.55)] group-hover:border-[#ce93d8]/40',
  Anemo:   'group-hover:shadow-[0_0_28px_-2px_rgba(77,182,172,0.55)]  group-hover:border-[#4db6ac]/40',
  Geo:     'group-hover:shadow-[0_0_28px_-2px_rgba(255,213,79,0.55)]  group-hover:border-[#ffd54f]/40',
  Dendro:  'group-hover:shadow-[0_0_28px_-2px_rgba(174,213,129,0.55)] group-hover:border-[#aed581]/40',
};

const ELEMENT_TEXT: Record<string, string> = {
  Pyro:    'text-[#ff6b4a]',
  Hydro:   'text-[#4fc3f7]',
  Cryo:    'text-[#80deea]',
  Electro: 'text-[#ce93d8]',
  Anemo:   'text-[#4db6ac]',
  Geo:     'text-[#ffd54f]',
  Dendro:  'text-[#aed581]',
};

export default function CharacterCard({ character }: { character: CharacterData }) {
  const locale  = useLocale();
  const is5Star = character.rarity === 5;
  const name    = locale === 'en' ? character.nameEn : character.nameVi;
  const el      = character.element;
  const glow    = ELEMENT_GLOW[el] ?? 'group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] group-hover:border-white/20';
  const textCol = ELEMENT_TEXT[el] ?? 'text-white';
  const baseBorder = is5Star ? 'border-amber-500/20' : 'border-purple-500/15';

  return (
    <Link
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 rounded-2xl"
      href={`/characters/${character.id}`}
    >
      <div
        className={`relative flex flex-col justify-end h-40 sm:h-48 md:h-52 rounded-2xl border ${baseBorder} ${glow} transition-all duration-300 overflow-hidden cursor-pointer bg-[#0d0d14]`}
      >
        {/* ── Avatar image — NO negative z-index ── */}
        <div className="absolute inset-0 group-hover:scale-[1.08] transition-transform duration-500 ease-out">
          <Image
            src={character.avatarUrl || '/images/avatars/UI_AvatarIcon_PlayerGirl.png'}
            alt={name}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 16vw, 160px"
            className="object-cover object-top"
            priority={false}
          />
        </div>

        {/* ── Gradient overlay (DOM order = above image) ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

        {/* ── Rarity badge top-right ── */}
        <div className={`absolute top-0 right-0 z-10 px-1.5 py-0.5 text-[8px] font-black tracking-widest rounded-bl-xl ${
          is5Star
            ? 'bg-amber-500/25 text-amber-300 border-l border-b border-amber-500/25'
            : 'bg-purple-500/20 text-purple-300 border-l border-b border-purple-500/20'
        }`}>
          {is5Star ? '5★' : '4★'}
        </div>

        {/* ── Element badge top-left ── */}
        <div className="absolute top-1.5 left-1.5 z-10 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-md">
          <Image
            src={`/elements/${el.toLowerCase()}.png`}
            alt={el}
            width={14}
            height={14}
            className="w-3.5 h-3.5 object-contain"
          />
        </div>

        {/* ── Name bar ── */}
        <div className="relative z-10 flex flex-col items-center pb-2 pt-1 bg-black/60 backdrop-blur-[3px] border-t border-white/[0.06]">
          <span className={`text-[10px] sm:text-[11px] font-extrabold tracking-wide truncate px-1.5 max-w-full font-display ${textCol}`}>
            {name}
          </span>
        </div>
      </div>
    </Link>
  );
}
