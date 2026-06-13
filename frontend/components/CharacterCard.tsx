"use client";
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  // Card base style based on rarity
  const baseBorder = is5Star ? 'border-amber-500/30' : 'border-purple-500/30';
  const bgGradient = is5Star ? 'from-[#ffb300]/10 to-transparent' : 'from-[#ab47bc]/10 to-transparent';

  return (
    <Link
      className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 rounded-2xl"
      href={`/characters/${character.id}`}
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`relative flex flex-col justify-end h-44 sm:h-52 md:h-56 rounded-2xl border ${baseBorder} ${glow} transition-all duration-300 overflow-hidden cursor-pointer bg-gradient-to-t ${bgGradient} bg-[#0d0d14]`}
      >
        {/* ── Avatar image ── */}
        <div className="absolute inset-0 group-hover:scale-[1.1] transition-transform duration-500 ease-out">
          <Image
            src={character.avatarUrl || '/images/avatars/UI_AvatarIcon_PlayerGirl.png'}
            alt={name}
            fill
            sizes="(max-width: 640px) 33vw, (max-width: 1024px) 16vw, 160px"
            className="object-cover object-top"
            priority={false}
          />
        </div>

        {/* ── Gradient overlay for readability ── */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* ── Element badge top-left (BIGGER & CLEANER) ── */}
        <div className="absolute top-2 left-2 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <Image
            src={`/elements/${el.toLowerCase()}.png`}
            alt={el}
            width={32}
            height={32}
            className="w-7 h-7 sm:w-8 sm:h-8 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>

        {/* ── Info Container (Name + Stars) ── */}
        <div className="relative z-10 flex flex-col items-center pb-3 pt-4">
          <span className={`text-[12px] sm:text-[14px] font-extrabold tracking-wide truncate px-2 w-full text-center font-display drop-shadow-md ${textCol}`}>
            {name}
          </span>
          <div className="flex gap-[1px] mt-1 drop-shadow-md">
            {Array.from({ length: character.rarity }).map((_, i) => (
              <svg key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
