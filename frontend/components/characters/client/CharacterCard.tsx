\"use client\";
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { CharacterData } from '@/types/character';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { UserContext } from '@/context/UserContext';
import { getCharacterAvatar, getCharacterSplash } from '@/utils/assetMap';
import { Heart, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const SplashArtOverlay = dynamic(() => import('@/components/ui/SplashArtOverlay'), { ssr: false });

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

const ELEMENT_GLOW: Record<string, string> = {
  Pyro:    'rgba(255,107,74,',
  Hydro:   'rgba(79,195,247,',
  Cryo:    'rgba(128,222,234,',
  Electro: 'rgba(206,147,216,',
  Anemo:   'rgba(77,182,172,',
  Geo:     'rgba(255,213,79,',
  Dendro:  'rgba(174,213,129,',
};

const RARITY_CONFIG = {
  5: { stars: '#ffd54f', starsBg: 'rgba(255,179,0,0.15)', border: 'rgba(255,179,0,0.35)', badgeBg: 'rgba(255,179,0,0.18)', badgeText: '#ffd54f' },
  4: { stars: '#ce93d8', starsBg: 'rgba(167,85,247,0.15)', border: 'rgba(167,85,247,0.35)', badgeBg: 'rgba(167,85,247,0.18)', badgeText: '#ce93d8' },
};

export default function CharacterCard({ character }: { character: CharacterData }) {
  const locale = useLocale();
  const router = useRouter();
  const userContext = useContext(UserContext);
  const user = userContext?.user;

  const is5Star = character.rarity === 5;
  const name = locale === 'en' ? character.nameEn : (character.nameVi || character.nameEn);
  const el = character.element;
  const elColor = ELEMENT_COLOR[el] ?? '#a855f7';
  const elGlow = ELEMENT_GLOW[el] ?? 'rgba(168,85,247,';
  const rCfg = is5Star ? RARITY_CONFIG[5] : RARITY_CONFIG[4];

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayReady, setOverlayReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isTraveler = character.id.startsWith('traveler');
  const displayAvatarUrl = isTraveler ? getCharacterAvatar(character.id, user?.gender) : character.avatarUrl;
  const displaySplashUrl = isTraveler ? getCharacterSplash(character.id, user?.gender) : character.splashArtUrl;

  const isFavInitially = user?.favoriteIds?.includes(character.id) ?? false;
  const [isFavorite, setIsFavorite] = useState(isFavInitially);

  useEffect(() => {
    setIsFavorite(user?.favoriteIds?.includes(character.id) ?? false);
  }, [user?.favoriteIds, character.id]);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { toast.error('Please log in to favorite characters!'); return; }
    setIsFavorite(prev => !prev);
    try {
      const res = await fetch('/api/auth/favorite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ characterId: character.id }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setIsFavorite(prev => !prev);
      toast.error('An error occurred, please try again.');
    }
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !displaySplashUrl) return;
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const link = document.createElement('link');
        link.rel = 'prefetch'; link.as = 'image'; link.href = displaySplashUrl;
        document.head.appendChild(link);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [displaySplashUrl]);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    hoverTimerRef.current = setTimeout(() => {
      setOverlayReady(true);
      setOverlayOpen(true);
    }, 450);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
  }, []);

  useEffect(() => () => { if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current); }, []);

  const href = `/${locale}/characters/${character.id}`;

  return (
    <>
      <div ref={cardRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="block group relative">
        <motion.div
          whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.025 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 24 }}
          onClick={() => router.push(href)}
          className="relative flex flex-col justify-end overflow-hidden cursor-pointer rounded-3xl"
          style={{
            height: 'clamp(180px, 22vw, 240px)',
            border: `1px solid ${hovered ? elColor + '55' : elColor + '28'}`,
            background: `linear-gradient(175deg, ${elGlow}0.04) 0%, rgba(7,7,16,0.97) 70%)`,
            boxShadow: hovered
              ? `0 12px 48px -8px ${elGlow}0.45), 0 0 0 1px ${elGlow}0.15)`
              : `0 4px 20px rgba(0,0,0,0.45)`,
            transition: 'box-shadow 0.35s ease, border-color 0.35s ease',
          }}
        >
          {/* ── Sheen line top ── */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${elColor}50, transparent)` }}
          />

          {/* ── Avatar image ── */}
          <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.07]">
            <FallbackImage
              src={displayAvatarUrl || '/assets/characters/PlayerGirl/avatar.webp'}
              alt={name} fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 20vw, 180px"
              className="object-cover object-top"
              priority={false}
            />
          </div>

          {/* ── Multi-stop gradient overlay ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                to top,
                rgba(5,5,12,0.98) 0%,
                rgba(5,5,12,0.85) 25%,
                rgba(5,5,12,0.30) 50%,
                transparent 70%
              )`,
            }}
          />
          {/* Element color wash at bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${elGlow}0.18) 0%, transparent 100%)` }}
          />

          {/* ── Top badges row ── */}
          <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-2.5 z-10">
            {/* Element badge */}
            <div
              className="p-1.5 rounded-xl backdrop-blur-md transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `${elGlow}0.20)`,
                border: `1px solid ${elGlow}0.40)`,
              }}
            >
              <FallbackImage
                src={`/assets/elements/${el.toLowerCase()}.webp`}
                alt={el} width={20} height={20}
                className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
              />
            </div>

            {/* Right: rarity + fav */}
            <div className="flex items-center gap-1.5">
              {/* Favorite */}
              <button
                onClick={handleToggleFavorite}
                className="p-1.5 rounded-xl backdrop-blur-md transition-all duration-300 hover:scale-115"
                style={{
                  background: isFavorite ? 'rgba(239,68,68,0.22)' : 'rgba(0,0,0,0.45)',
                  border: `1px solid ${isFavorite ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.15)'}`,
                }}
              >
                <Heart
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors"
                  style={{ fill: isFavorite ? '#ef4444' : 'transparent', color: isFavorite ? '#ef4444' : 'rgba(255,255,255,0.7)' }}
                />
              </button>

              {/* Rarity badge */}
              <div
                className="px-2 py-0.5 rounded-lg backdrop-blur-md text-[9px] font-black tracking-widest"
                style={{ background: rCfg.badgeBg, border: `1px solid ${rCfg.border}`, color: rCfg.badgeText }}
              >
                {character.rarity}★
              </div>
            </div>
          </div>

          {/* ── Preview hint on hover ── */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none z-10 transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0 }}
          >
            <div
              className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md"
              style={{
                background: `${elGlow}0.22)`,
                border: `1px solid ${elGlow}0.45)`,
                color: elColor,
              }}
            >
              <Eye className="w-3 h-3" />
              Hold to Preview
            </div>
          </div>

          {/* ── Bottom info ── */}
          <div className="relative z-10 flex flex-col items-center px-2 pb-3 pt-2">
            {/* Tier badge (if available) */}
            {character.tier && character.tier !== 'Unranked' && (
              <div
                className="mb-1.5 px-2 py-0.5 rounded-md text-[7px] font-black uppercase tracking-widest"
                style={{
                  background: character.tier === 'SS' ? 'rgba(255,77,109,0.22)' : character.tier === 'S' ? 'rgba(245,158,11,0.22)' : 'rgba(168,85,247,0.20)',
                  border: character.tier === 'SS' ? '1px solid rgba(255,77,109,0.45)' : character.tier === 'S' ? '1px solid rgba(245,158,11,0.40)' : '1px solid rgba(168,85,247,0.35)',
                  color: character.tier === 'SS' ? '#ff4d6d' : character.tier === 'S' ? '#f59e0b' : '#a855f7',
                }}
              >
                {character.tier} Tier
              </div>
            )}

            {/* Name */}
            <span
              className="text-[11px] sm:text-[13px] font-extrabold tracking-wide truncate w-full text-center"
              style={{
                color: elColor,
                textShadow: `0 0 16px ${elGlow}0.65)`,
                filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))',
              }}
            >
              {name}
            </span>

            {/* Stars */}
            <div className="flex gap-[1px] mt-1">
              {Array.from({ length: character.rarity }).map((_, i) => (
                <svg key={i} className="w-2.5 h-2.5" style={{ color: rCfg.stars }} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

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
            splashArtUrl: displaySplashUrl || displayAvatarUrl || '',
            avatarUrl: displayAvatarUrl,
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
