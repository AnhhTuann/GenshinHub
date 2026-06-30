"use client";
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';

interface SpotlightChar {
  id: string;
  nameEn: string;
  nameVi: string;
  element: string;
  rarity: number;
  avatarUrl: string;
}

const ELEM_COLOR: Record<string, string> = {
  Pyro: '#ff6b4a', Hydro: '#4fc3f7', Cryo: '#80deea',
  Electro: '#ce93d8', Anemo: '#4db6ac', Geo: '#ffd54f', Dendro: '#aed581',
};

export default function CharacterSpotlight({ characters }: { characters: SpotlightChar[] }) {
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{ minHeight: '160px' }} // CLS protection
      className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none"
    >
      {characters.map((char) => {
        const name = locale === 'vi' ? (char.nameVi || char.nameEn) : char.nameEn;
        const ec = ELEM_COLOR[char.element] ?? '#c8a84b';

        return (
          <Link
            key={char.id}
            href={`/characters/${char.id}`}
            className="group relative shrink-0 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
            style={{
              width: '112px',
              height: '144px',
              border: `1px solid ${ec}30`,
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            {/* Avatar */}
            <Image
              src={char.avatarUrl || '/images/avatars/UI_AvatarIcon_PlayerGirl.png'}
              alt={name}
              fill
              sizes="112px"
              className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
            />

            {/* Bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 to-transparent" />
            {/* Element tint */}
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(to top, ${ec}25, transparent 55%)` }}
            />

            {/* Name */}
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <div className="text-[10px] font-extrabold truncate px-1.5 drop-shadow-md" style={{ color: ec }}>
                {name}
              </div>
            </div>

            {/* Element icon */}
            <div
              className="absolute top-1.5 left-1.5 p-0.5 rounded-md"
              style={{ background: `${ec}22`, border: `1px solid ${ec}40` }}
            >
              <Image
                src={`/images/elements/${char.element.toLowerCase()}.png`}
                alt={char.element}
                width={16}
                height={16}
                className="w-4 h-4 object-contain"
              />
            </div>

            {/* 5★ badge */}
            {char.rarity === 5 && (
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(200,168,75,0.8)]" />
            )}

            {/* Hover glow border */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1.5px ${ec}60` }}
            />
          </Link>
        );
      })}
    </motion.div>
  );
}
