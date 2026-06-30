"use client";
import { useEffect, useRef, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/* ──────────────────────────────────────────────────────
   Element particle config
   ────────────────────────────────────────────────────── */
const ELEMENT_PARTICLES: Record<string, { color: string; symbol: string; count: number }> = {
  Pyro:    { color: '#ff6b4a', symbol: '✦', count: 18 },
  Hydro:   { color: '#4fc3f7', symbol: '◆', count: 16 },
  Cryo:    { color: '#80deea', symbol: '❄', count: 20 },
  Electro: { color: '#ce93d8', symbol: '⚡', count: 16 },
  Anemo:   { color: '#4db6ac', symbol: '◎', count: 22 },
  Geo:     { color: '#ffd54f', symbol: '◇', count: 14 },
  Dendro:  { color: '#aed581', symbol: '✿', count: 18 },
};

const ELEMENT_GLOW: Record<string, string> = {
  Pyro:    'rgba(255,107,74,0.35)',
  Hydro:   'rgba(79,195,247,0.35)',
  Cryo:    'rgba(128,222,234,0.35)',
  Electro: 'rgba(206,147,216,0.35)',
  Anemo:   'rgba(77,182,172,0.35)',
  Geo:     'rgba(255,213,79,0.35)',
  Dendro:  'rgba(174,213,129,0.35)',
};

const ELEMENT_COLOR: Record<string, string> = {
  Pyro:    '#ff6b4a',
  Hydro:   '#4fc3f7',
  Cryo:    '#80deea',
  Electro: '#ce93d8',
  Anemo:   '#4db6ac',
  Geo:     '#ffd54f',
  Dendro:  '#aed581',
};

interface SplashArtOverlayProps {
  open: boolean;
  onClose: () => void;
  character: {
    id: string;
    nameEn: string;
    nameVi?: string;
    element: string;
    rarity: number;
    splashArtUrl: string;
    avatarUrl?: string;
    weapon?: string;
    role?: string;
    tier?: string;
  };
  href: string;
  locale?: string;
}

export default function SplashArtOverlay({ open, onClose, character, href, locale }: SplashArtOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const el = character.element;
  const particleConfig = ELEMENT_PARTICLES[el] ?? ELEMENT_PARTICLES.Pyro;
  const glowColor = ELEMENT_GLOW[el] ?? 'rgba(255,255,255,0.2)';
  const elementColor = ELEMENT_COLOR[el] ?? '#ffffff';
  const displayName = locale === 'vi' && character.nameVi ? character.nameVi : character.nameEn;

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Click outside
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  const tierColor: Record<string, string> = {
    SS: '#ff5252', S: '#ff9800', A: '#8bc34a', B: '#29b6f6', C: '#90a4ae'
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        /* ── Backdrop ── */
        <motion.div
          ref={overlayRef}
          onClick={handleBackdropClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ zIndex: 9999 }}
          className="fixed inset-0 flex items-center justify-center"
        >
          {/* ── Blurred void background ── */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          {/* ── Element glow orb ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 70% 60% at 60% 45%, ${glowColor} 0%, transparent 65%)`,
            }}
          />

          {/* ── Particle System ── */}
          {!isMobile && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {Array.from({ length: particleConfig.count }).map((_, i) => {
                const pseudoRandom = (seed: number) => {
                  const x = Math.sin(seed) * 10000;
                  return x - Math.floor(x);
                };
                const left = 30 + pseudoRandom(i) * 45;
                const delay = pseudoRandom(i + 100) * 3;
                const dur = 2.5 + pseudoRandom(i + 200) * 3;
                const size = 8 + pseudoRandom(i + 300) * 14;
                const driftX = (pseudoRandom(i + 400) - 0.5) * 60;
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: `${left}%`,
                      bottom: '15%',
                      color: particleConfig.color,
                      fontSize: `${size}px`,
                      filter: `drop-shadow(0 0 ${size / 2}px ${particleConfig.color})`,
                      textShadow: `0 0 ${size}px ${particleConfig.color}`,
                      opacity: 0,
                      '--drift-x': `${driftX}px`,
                      animation: `float-particle ${dur}s ease-out ${delay}s infinite`
                    } as React.CSSProperties}
                  >
                    {particleConfig.symbol}
                  </div>
                );
              })}
            </div>
          )}

          {/* ── Main modal card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl h-[85vh] max-h-[680px] mx-4 rounded-3xl overflow-hidden"
            style={{
              border: `1px solid ${elementColor}30`,
              boxShadow: `0 0 60px -10px ${glowColor}, 0 40px 80px -20px rgba(0,0,0,0.8)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Splash Art with Ken Burns ── */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1, x: '0%', y: '0%' }}
                animate={{ scale: 1.08, x: '-2%', y: '-1.5%' }}
                transition={{ duration: 9, ease: 'linear' }}
              >
                <Image
                  src={character.splashArtUrl || character.avatarUrl || '/images/avatars/UI_AvatarIcon_PlayerGirl.png'}
                  alt={displayName}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-cover object-top"
                />
              </motion.div>

              {/* Gradient overlays — cinematic depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${elementColor}12 0%, transparent 60%)`,
                }}
              />
            </div>

            {/* ── Decorative element line top ── */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${elementColor} 40%, ${elementColor}aa 60%, transparent 100%)`,
              }}
            />

            {/* ── Close button ── */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <svg className="w-5 h-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* ── Content — Left Panel ── */}
            <div className="absolute inset-y-0 left-0 w-[48%] flex flex-col justify-end pb-8 pl-8 pr-4 z-20">
              {/* Element + Tier badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 mb-4"
              >
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: `${elementColor}20`,
                    border: `1px solid ${elementColor}50`,
                    color: elementColor,
                  }}
                >
                  <Image
                    src={`/images/elements/${el.toLowerCase()}.png`}
                    alt={el}
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  {el}
                </div>

                {character.tier && (
                  <div
                    className="px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider"
                    style={{
                      background: tierColor[character.tier] ?? '#555',
                      color: '#fff',
                      boxShadow: `0 0 12px ${tierColor[character.tier] ?? '#555'}60`,
                    }}
                  >
                    {character.tier} Tier
                  </div>
                )}
              </motion.div>

              {/* Character name */}
              <motion.div
                initial={{ opacity: 0, y: 24, letterSpacing: '0.3em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.04em' }}
                transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mb-2"
              >
                <h2
                  className="text-4xl sm:text-5xl font-black leading-none"
                  style={{
                    fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                    background: `linear-gradient(135deg, #fff 0%, ${elementColor} 60%, #fff9e0 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: 'none',
                    filter: `drop-shadow(0 0 24px ${glowColor})`,
                  }}
                >
                  {displayName}
                </h2>
              </motion.div>

              {/* Stars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex gap-0.5 mb-5"
              >
                {Array.from({ length: character.rarity }).map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.42 + i * 0.05, type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-5 h-5"
                    style={{ color: character.rarity === 5 ? '#ffd54f' : '#ba68c8' }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </motion.div>

              {/* Quick info */}
              {(character.weapon || character.role) && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {character.weapon && (
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        color: 'rgba(255,255,255,0.7)',
                      }}
                    >
                      {character.weapon}
                    </span>
                  )}
                  {character.role && (
                    <span
                      className="px-3 py-1 rounded-lg text-xs font-semibold"
                      style={{
                        background: `${elementColor}18`,
                        border: `1px solid ${elementColor}35`,
                        color: elementColor,
                      }}
                    >
                      {character.role}
                    </span>
                  )}
                </motion.div>
              )}

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={href}
                  className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${elementColor}cc, ${elementColor})`,
                    color: '#000',
                    boxShadow: `0 8px 32px -4px ${glowColor}`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 48px -4px ${glowColor}, 0 0 0 1px ${elementColor}`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px -4px ${glowColor}`;
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)' }}>View Full Build</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </motion.div>
            </div>

            {/* ── Decorative element line bottom ── */}
            <div
              className="absolute bottom-0 left-0 right-0 h-[1px]"
              style={{
                background: `linear-gradient(90deg, ${elementColor}80 0%, transparent 100%)`,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
