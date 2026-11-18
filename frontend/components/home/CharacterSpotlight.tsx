"use client";

import { useState, useMemo } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeftRight, Pause, Play, Sparkles, Star } from 'lucide-react';

interface SpotlightChar {
  id: string;
  nameEn: string;
  nameVi: string;
  element: string;
  rarity: number;
  avatarUrl: string;
  weapon?: string;
  region?: string;
}

interface ElementTheme {
  bg: string;
  border: string;
  color: string;
  gradient: string;
}

const ELEM_THEME: Record<string, ElementTheme> = {
  all: {
    bg: '#251b45',
    border: '#9B7AFF',
    color: '#7C5AE0',
    gradient: 'linear-gradient(135deg, #7C5AE0 0%, #9B7AFF 100%)',
  },
  pyro: {
    bg: '#2b0d0d',
    border: '#ff5a45',
    color: '#ff5a45',
    gradient: 'linear-gradient(135deg, #d32f2f 0%, #ff5a45 100%)',
  },
  hydro: {
    bg: '#081e36',
    border: '#3aa8ff',
    color: '#3aa8ff',
    gradient: 'linear-gradient(135deg, #1565c0 0%, #3aa8ff 100%)',
  },
  cryo: {
    bg: '#092330',
    border: '#4ecfe0',
    color: '#4ecfe0',
    gradient: 'linear-gradient(135deg, #00838f 0%, #4ecfe0 100%)',
  },
  electro: {
    bg: '#1c0f30',
    border: '#bf7bff',
    color: '#bf7bff',
    gradient: 'linear-gradient(135deg, #6a1b9a 0%, #bf7bff 100%)',
  },
  anemo: {
    bg: '#072522',
    border: '#32d4c2',
    color: '#32d4c2',
    gradient: 'linear-gradient(135deg, #00695c 0%, #32d4c2 100%)',
  },
  geo: {
    bg: '#281c07',
    border: '#f0bb3b',
    color: '#f0bb3b',
    gradient: 'linear-gradient(135deg, #b78103 0%, #f0bb3b 100%)',
  },
  dendro: {
    bg: '#0e260c',
    border: '#78ce32',
    color: '#78ce32',
    gradient: 'linear-gradient(135deg, #33691e 0%, #78ce32 100%)',
  },
};

function getElemTheme(key?: string): ElementTheme {
  if (!key) return ELEM_THEME.all;
  const k = key.toLowerCase();
  return ELEM_THEME[k] || ELEM_THEME.all;
}

const ELEMENTS = [
  { id: 'all', nameEn: 'All', nameVi: 'Tất cả' },
  { id: 'pyro', nameEn: 'Pyro', nameVi: 'Hỏa', icon: 'pyro' },
  { id: 'hydro', nameEn: 'Hydro', nameVi: 'Thủy', icon: 'hydro' },
  { id: 'anemo', nameEn: 'Anemo', nameVi: 'Phong', icon: 'anemo' },
  { id: 'electro', nameEn: 'Electro', nameVi: 'Lôi', icon: 'electro' },
  { id: 'dendro', nameEn: 'Dendro', nameVi: 'Thảo', icon: 'dendro' },
  { id: 'cryo', nameEn: 'Cryo', nameVi: 'Băng', icon: 'cryo' },
  { id: 'geo', nameEn: 'Geo', nameVi: 'Nham', icon: 'geo' },
];

function getPrimaryRegion(region?: string) {
  if (!region) return '';
  return region.split(/[\/\(]/)[0].trim();
}

export default function CharacterSpotlight({ characters }: { characters: SpotlightChar[] }) {
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');

  const filteredCharacters = useMemo(() => {
    if (selectedElement === 'all') return characters;
    return characters.filter(
      (c) => c.element.toLowerCase() === selectedElement.toLowerCase()
    );
  }, [characters, selectedElement]);

  // Duplicate items enough times so the marquee is seamless and never has empty gaps
  const marqueeItems = useMemo(() => {
    if (!filteredCharacters.length) return [];
    const minItems = 24;
    const repeatCount = Math.max(2, Math.ceil(minItems / filteredCharacters.length) * 2);
    const repeated: SpotlightChar[] = [];
    for (let i = 0; i < repeatCount; i++) {
      repeated.push(...filteredCharacters);
    }
    return repeated;
  }, [filteredCharacters]);

  return (
    <div className="char-spotlight-wrapper">
      {/* ── Top Bar: Filter Pills + Marquee Controls ── */}
      <div className="char-filter-bar">
        <div className="char-filter-scroll scrollbar-none">
          {ELEMENTS.map((elem) => {
            const isActive = selectedElement === elem.id;
            const label = locale === 'vi' ? elem.nameVi : elem.nameEn;
            const count =
              elem.id === 'all'
                ? characters.length
                : characters.filter((c) => c.element.toLowerCase() === elem.id).length;
            const theme = getElemTheme(elem.id);

            return (
              <button
                key={elem.id}
                onClick={() => setSelectedElement(elem.id)}
                className={`char-filter-pill ${isActive ? 'is-active' : ''}`}
                style={
                  !isActive
                    ? ({
                        '--pill-hover-border': `${theme.border}70`,
                        '--pill-hover-glow': `${theme.border}22`,
                        '--pill-hover-color': theme.color,
                      } as React.CSSProperties)
                    : undefined
                }
                type="button"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="char-filter-pill-bg"
                    style={{
                      background: theme.gradient,
                      boxShadow: `0 4px 16px ${theme.color}45`,
                    }}
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {elem.icon ? (
                    <span
                      className="w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0 p-0.5 transition-transform duration-200"
                      style={{
                        background: theme.bg,
                        border: `1px solid ${theme.border}`,
                        boxShadow: `0 1px 4px ${theme.border}35`,
                      }}
                    >
                      <FallbackImage
                        src={`/assets/elements/${elem.icon}.webp`}
                        alt={label}
                        width={16}
                        height={16}
                        className="w-[15px] h-[15px] object-contain drop-shadow-[0_0_1px_rgba(255,255,255,0.4)]"
                      />
                    </span>
                  ) : (
                    <span className="w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0 bg-[#251b45] border border-[#9B7AFF]/60">
                      <Sparkles size={11} className="text-[#E8B84C]" />
                    </span>
                  )}
                  <span className="font-bold tracking-tight">{label}</span>
                  <span className="char-filter-count">{count}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Marquee Play/Pause & Direction Controls */}
        <div className="char-nav-controls">
          <button
            onClick={() => setDirection((d) => (d === 'ltr' ? 'rtl' : 'ltr'))}
            className="char-nav-btn"
            title={direction === 'ltr' ? 'Scroll: Left to Right' : 'Scroll: Right to Left'}
            aria-label="Toggle marquee direction"
            type="button"
          >
            <ArrowLeftRight size={15} />
          </button>
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="char-nav-btn"
            title={isPaused ? 'Resume scroll' : 'Pause scroll'}
            aria-label={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
            type="button"
          >
            {isPaused ? <Play size={15} /> : <Pause size={15} />}
          </button>
        </div>
      </div>

      {/* ── Infinite Marquee Stream (Left to Right) ── */}
      <div className="char-marquee-container">
        <div
          className={`char-marquee-track direction-${direction} ${isPaused ? 'is-paused' : ''}`}
        >
          {marqueeItems.map((char, index) => (
            <motion.div
              key={`${char.id}-${index}`}
              whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="shrink-0"
            >
              <CharacterCard char={char} locale={locale} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CharacterCard({ char, locale }: { char: SpotlightChar; locale: string }) {
  const name = locale === 'vi' ? char.nameVi || char.nameEn : char.nameEn;
  const theme = getElemTheme(char.element);
  const region = getPrimaryRegion(char.region);

  return (
    <Link
      href={`/characters/${char.id}`}
      className="char-card group"
      style={{ '--char-color': theme.color } as React.CSSProperties}
    >
      {/* ── Top Art Frame with Element-Themed Background ── */}
      <div
        className="char-card-art-box relative overflow-hidden"
        style={{
          background: `linear-gradient(155deg, ${theme.color}32 0%, ${theme.color}16 50%, ${theme.color}06 100%)`,
        }}
      >
        {/* Element Ambient Radial Halo */}
        <div
          className="char-card-ambient"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${theme.color}55 0%, ${theme.color}22 65%, transparent 100%)`,
          }}
        />

        {/* Floating Element Crest Watermark in background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <div className="relative w-24 h-24 -mt-2 opacity-25 filter blur-[0.3px]">
            <FallbackImage
              src={`/assets/elements/${char.element.toLowerCase()}.webp`}
              alt=""
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        {/* Character Avatar */}
        <FallbackImage
          src={char.avatarUrl || '/assets/characters/PlayerGirl/avatar.webp'}
          alt={name}
          fill
          sizes="160px"
          className="char-card-img relative z-10 object-cover object-center group-hover:scale-110 transition-transform duration-500"
        />

        {/* Bottom Fade Mask */}
        <div className="char-card-mask relative z-10" />
      </div>

      {/* ── Bottom Info Panel (3 rows) ── */}
      <div className="char-card-info">
        {/* Hàng 1: Gemstone Vision icon to rõ nét + Tên nhân vật */}
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-[24px] h-[24px] rounded-[7px] flex items-center justify-center shrink-0 p-0.5 shadow-xs transition-transform duration-300 group-hover:scale-110"
            style={{
              background: theme.bg,
              border: `1.5px solid ${theme.border}`,
              boxShadow: `0 2px 8px ${theme.border}45`,
            }}
          >
            <FallbackImage
              src={`/assets/elements/${char.element.toLowerCase()}.webp`}
              alt={char.element}
              width={20}
              height={20}
              className="w-[19px] h-[19px] object-contain drop-shadow-[0_0_2px_rgba(255,255,255,0.4)]"
            />
          </div>
          <h4 className="char-card-name flex-1 min-w-0" title={name}>
            {name}
          </h4>
        </div>

        {/* Hàng 2: Cụm sao */}
        <div className="flex items-center gap-0.5">
          {Array.from({ length: char.rarity }).map((_, i) => (
            <Star
              key={i}
              size={9.5}
              fill={char.rarity === 5 ? '#E8B84C' : '#a855f7'}
              stroke="none"
              className="drop-shadow-xs"
            />
          ))}
        </div>

        {/* Hàng 3: Vũ khí & Xuất thân */}
        <div className="char-card-sub">
          {char.weapon && <span className="shrink-0">{char.weapon}</span>}
          {char.weapon && region && <span className="opacity-40 shrink-0">•</span>}
          {region && <span className="truncate">{region}</span>}
          {!char.weapon && !region && <span>{char.element}</span>}
        </div>
      </div>

      {/* ── Interactive Shine Sweep on Hover ── */}
      <div className="char-card-shine" />

      {/* ── Glowing Border on Hover ── */}
      <div
        className="char-card-glow-border"
        style={{
          boxShadow: `inset 0 0 0 1.5px ${theme.color}75, 0 8px 24px ${theme.color}25`,
        }}
      />
    </Link>
  );
}
