"use client";
import { useState, useRef, useEffect, useCallback } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { CharacterData } from '@/types/character';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

// Lazy load the overlay — only loads JS when first triggered
const SplashArtOverlay = dynamic(() => import('./ui/SplashArtOverlay'), { ssr: false });

/* ─── Element color maps ─────────────────────────────── */
const ELEMENT_COLOR: Record<string, string> = {
  Pyro:    '#ff6b4a',
  Hydro:   '#4fc3f7',
  Cryo:    '#80deea',
  Electro: '#ce93d8',
  Anemo:   '#4db6ac',
  Geo:     '#ffd54f',
  Dendro:  '#aed581',
};

const ELEMENT_RARITY_BG: Record<string, { border5: string; border4: string; bg5: string; bg4: string }> = {
  Pyro:    { border5: 'rgba(255,107,74,0.4)',  border4: 'rgba(255,107,74,0.25)',  bg5: 'rgba(255,107,74,0.08)',  bg4: 'rgba(255,107,74,0.05)'  },
  Hydro:   { border5: 'rgba(79,195,247,0.4)',  border4: 'rgba(79,195,247,0.25)',  bg5: 'rgba(79,195,247,0.08)',  bg4: 'rgba(79,195,247,0.05)'  },
  Cryo:    { border5: 'rgba(128,222,234,0.4)', border4: 'rgba(128,222,234,0.25)', bg5: 'rgba(128,222,234,0.08)', bg4: 'rgba(128,222,234,0.05)' },
  Electro: { border5: 'rgba(206,147,216,0.4)', border4: 'rgba(206,147,216,0.25)', bg5: 'rgba(206,147,216,0.08)', bg4: 'rgba(206,147,216,0.05)' },
  Anemo:   { border5: 'rgba(77,182,172,0.4)',  border4: 'rgba(77,182,172,0.25)',  bg5: 'rgba(77,182,172,0.08)',  bg4: 'rgba(77,182,172,0.05)'  },
  Geo:     { border5: 'rgba(255,213,79,0.4)',  border4: 'rgba(255,213,79,0.25)',  bg5: 'rgba(255,213,79,0.08)',  bg4: 'rgba(255,213,79,0.05)'  },
  Dendro:  { border5: 'rgba(174,213,129,0.4)', border4: 'rgba(174,213,129,0.25)', bg5: 'rgba(174,213,129,0.08)', bg4: 'rgba(174,213,129,0.05)' },
};

export default function CharacterCard({ character }: { character: CharacterData }) {
  const locale = useLocale();
  const router = useRouter();
  const is5Star = character.rarity === 5;
  const name = locale === 'en' ? character.nameEn : (character.nameVi || character.nameEn);
  const el = character.element;
  const elColor = ELEMENT_COLOR[el] ?? '#ffffff';
  const elStyle = ELEMENT_RARITY_BG[el];

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [splashLoaded, setSplashLoaded] = useState(false);
  const [overlayReady, setOverlayReady] = useState(false); // has JS chunk loaded
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  /* ── Pre-fetch splash art image when card enters viewport ──
     This ensures the image is in browser cache before user hovers */
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !character.splashArtUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Prefetch splash art silently via link preload
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'image';
          link.href = character.splashArtUrl;
          document.head.appendChild(link);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start pre-fetching 200px before visible
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [character.splashArtUrl]);

  /* ── Hover intent timer — 400ms hold to open overlay ── */
  const handleMouseEnter = useCallback(() => {
    hoverTimerRef.current = setTimeout(() => {
      setOverlayReady(true);
      setOverlayOpen(true);
    }, 400);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const href = `/${locale}/characters/${character.id}`;

  const borderColor = is5Star
    ? (elStyle?.border5 ?? 'rgba(255,179,0,0.35)')
    : (elStyle?.border4 ?? 'rgba(167,85,247,0.25)');

  const bgColor = is5Star
    ? (elStyle?.bg5 ?? 'rgba(255,140,0,0.06)')
    : (elStyle?.bg4 ?? 'rgba(167,85,247,0.04)');

  return (
    <>
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="block group relative"
      >
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.03 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 380, damping: 22 }}
          onClick={() => router.push(href)}
          className="relative flex flex-col justify-end h-44 sm:h-52 md:h-56 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
          style={{
            border: `1px solid ${borderColor}`,
            background: `linear-gradient(to top, ${bgColor} 0%, rgba(8,8,16,0.95) 100%)`,
            boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
          }}
          onHoverStart={() => {
            (document.querySelector(`[data-card="${character.id}"]`) as HTMLElement)?.style.setProperty(
              'box-shadow', `0 8px 40px -4px ${elColor}55, 0 4px 20px rgba(0,0,0,0.5)`
            );
          }}
          onHoverEnd={() => {
            (document.querySelector(`[data-card="${character.id}"]`) as HTMLElement)?.style.setProperty(
              'box-shadow', '0 4px 20px rgba(0,0,0,0.4)'
            );
          }}
          data-card={character.id}
        >
          {/* ── Avatar image ── */}
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08]">
            <FallbackImage
              src={character.avatarUrl || '/assets/characters/UI_AvatarIcon_PlayerGirl.webp'}
              alt={name}
              fill
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 16vw, 160px"
              className="object-cover object-top"
              priority={false}
            />
          </div>

          {/* ── Gradient overlay ── */}
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

          {/* ── Element badge (top-left) ── */}
          <div
            className="absolute top-2 left-2 z-10 p-1 rounded-lg drop-shadow-lg transition-all duration-300 group-hover:scale-110"
            style={{
              background: `${elColor}22`,
              border: `1px solid ${elColor}40`,
              backdropFilter: 'blur(4px)',
            }}
          >
            <FallbackImage
              src={`/images/elements/${el.toLowerCase()}.png`}
              alt={el}
              width={28}
              height={28}
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
            />
          </div>

          {/* ── Rarity top-right ── */}
          <div
            className="absolute top-2 right-2 z-10 px-1.5 py-0.5 rounded-md text-[9px] font-black"
            style={{
              background: is5Star ? 'rgba(255,179,0,0.25)' : 'rgba(167,85,247,0.25)',
              border: is5Star ? '1px solid rgba(255,179,0,0.4)' : '1px solid rgba(167,85,247,0.4)',
              color: is5Star ? '#ffd54f' : '#ce93d8',
            }}
          >
            {character.rarity}★
          </div>

          {/* ── "Hold to preview" hint ── */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          >
            <div
              className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
              style={{
                background: `${elColor}30`,
                border: `1px solid ${elColor}50`,
                color: elColor,
                backdropFilter: 'blur(4px)',
              }}
            >
              Hold to preview
            </div>
          </div>

          {/* ── Name + Stars ── */}
          <div className="relative z-10 flex flex-col items-center pb-3 pt-4">
            <span
              className="text-[11px] sm:text-[13px] font-extrabold tracking-wide truncate px-2 w-full text-center drop-shadow-lg transition-all duration-300"
              style={{
                color: elColor,
                textShadow: `0 0 12px ${elColor}60`,
              }}
            >
              {name}
            </span>
            <div className="flex gap-[1px] mt-1">
              {Array.from({ length: character.rarity }).map((_, i) => (
                <svg
                  key={i}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                  style={{ color: is5Star ? '#ffd54f' : '#ce93d8' }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Cinematic Overlay (portalled to body, outside grid flow) ── */}
      {overlayReady && (
        <SplashArtOverlay
          open={overlayOpen}
          onClose={() => setOverlayOpen(false)}
          character={{
            id: character.id,
            nameEn: character.nameEn,
            nameVi: character.nameVi,
            element: character.element,
            rarity: character.rarity,
            splashArtUrl: character.splashArtUrl || character.avatarUrl || '',
            avatarUrl: character.avatarUrl,
            weapon: character.weapon,
            role: character.role,
            tier: character.tier,
          }}
          href={href}
          locale={locale}
        />
      )}
    </>
  );
}
