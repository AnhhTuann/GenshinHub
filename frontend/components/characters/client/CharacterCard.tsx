"use client";
import { useState, useRef, useEffect, useCallback, useContext } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { CharacterData } from '@/types/character';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { UserContext } from '@/context/UserContext';
import { getCharacterAvatar, getCharacterSplash } from '@/utils/assetMap';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const SplashArtOverlay = dynamic(() => import('@/components/ui/SplashArtOverlay'), { ssr: false });

/* ─── Element colors ─────────────────────────── */
const EL_COLOR: Record<string, string> = {
  Pyro: '#ff6b4a', Hydro: '#4fc3f7', Cryo: '#80deea',
  Electro: '#ce93d8', Anemo: '#4db6ac', Geo: '#ffd54f', Dendro: '#aed581',
};
const EL_GLOW: Record<string, string> = {
  Pyro: 'rgba(255,107,74,', Hydro: 'rgba(79,195,247,',
  Cryo: 'rgba(128,222,234,', Electro: 'rgba(206,147,216,',
  Anemo: 'rgba(77,182,172,', Geo: 'rgba(255,213,79,', Dendro: 'rgba(174,213,129,',
};

const TIER_CFG: Record<string, { bg: string; border: string; text: string }> = {
  SS: { bg: 'rgba(255,77,109,0.25)', border: 'rgba(255,77,109,0.55)', text: '#ff4d6d' },
  S:  { bg: 'rgba(245,158,11,0.25)', border: 'rgba(245,158,11,0.50)', text: '#fbbf24' },
  A:  { bg: 'rgba(168,85,247,0.22)', border: 'rgba(168,85,247,0.45)', text: '#c084fc' },
  B:  { bg: 'rgba(34,211,238,0.20)', border: 'rgba(34,211,238,0.40)', text: '#22d3ee' },
  C:  { bg: 'rgba(156,163,175,0.20)', border: 'rgba(156,163,175,0.40)', text: '#cbd5e1' },
  D:  { bg: 'rgba(100,116,139,0.20)', border: 'rgba(100,116,139,0.40)', text: '#94a3b8' },
  TBD:{ bg: 'rgba(156,163,175,0.10)', border: 'rgba(156,163,175,0.25)', text: '#9ca3af' },
};

export default function CharacterCard({ character }: { character: CharacterData }) {
  const locale = useLocale();
  const router = useRouter();
  const userCtx = useContext(UserContext);
  const user = userCtx?.user;

  const is5 = character.rarity === 5;
  const name = locale === 'en' ? character.nameEn : (character.nameVi || character.nameEn);
  const el = character.element;
  const color = EL_COLOR[el] ?? '#a855f7';
  const glow  = EL_GLOW[el]  ?? 'rgba(168,85,247,';
  
  const tierValue = character.tier || 'TBD';
  const tierCfg = TIER_CFG[tierValue] || TIER_CFG['TBD'];

  const [overlayOpen, setOverlayOpen]   = useState(false);
  const [overlayReady, setOverlayReady] = useState(false);
  const [hovered, setHovered]           = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isTraveler       = character.id.startsWith('traveler');
  const avatarUrl        = isTraveler ? getCharacterAvatar(character.id, user?.gender) : character.avatarUrl;
  const splashUrl        = isTraveler ? getCharacterSplash(character.id, user?.gender) : character.splashArtUrl;

  const isFavInit = user?.favoriteIds?.includes(character.id) ?? false;
  const [isFav, setIsFav] = useState(isFavInit);
  useEffect(() => { setIsFav(user?.favoriteIds?.includes(character.id) ?? false); }, [user?.favoriteIds, character.id]);

  const toggleFav = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) { toast.error('Please log in first!'); return; }
    setIsFav(p => !p);
    try {
      const r = await fetch('/api/auth/favorite', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ characterId: character.id }) });
      if (!r.ok) throw new Error();
    } catch { setIsFav(p => !p); toast.error('Error, please try again.'); }
  };

  /* Prefetch splash on IntersectionObserver */
  useEffect(() => {
    const node = cardRef.current; if (!node || !splashUrl) return;
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        const l = document.createElement('link'); l.rel = 'prefetch'; l.as = 'image'; l.href = splashUrl;
        document.head.appendChild(l); obs.disconnect();
      }
    }, { rootMargin: '200px' });
    obs.observe(node);
    return () => obs.disconnect();
  }, [splashUrl]);

  const onEnter = useCallback(() => {
    setHovered(true);
    timerRef.current = setTimeout(() => { setOverlayReady(true); setOverlayOpen(true); }, 450);
  }, []);
  const onLeave = useCallback(() => {
    setHovered(false);
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const href = `/${locale}/characters/${character.id}`;

  return (
    <>
      <div ref={cardRef} onMouseEnter={onEnter} onMouseLeave={onLeave} className="group relative">
        <motion.div
          variants={shouldReduceMotion ? undefined : {
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 350, damping: 25 } }
          }}
          whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.03 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          onClick={() => router.push(href)}
          className="relative cursor-pointer rounded-2xl overflow-hidden"
          style={{
            aspectRatio: '4/5',
            background: `radial-gradient(circle at 50% 30%, ${glow}0.15) 0%, rgba(10,10,15,0.95) 100%)`,
            boxShadow: hovered
              ? `0 20px 60px -10px ${glow}0.55), 0 0 0 1.5px ${glow}0.4)`
              : is5
                ? `0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px ${glow}0.25)`
                : `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${glow}0.2)`,
            transition: 'box-shadow 0.4s ease',
          }}
        >
          {/* ─── Element Watermark ───────────── */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none mix-blend-screen overflow-hidden">
            <FallbackImage
              src={`/assets/elements/${el.toLowerCase()}.webp`}
              alt={el} fill
              className="object-contain scale-125 -rotate-12 blur-[1px]"
            />
          </div>

          {/* ─── Avatar Image (Square fitting top) ─── */}
          <div className="absolute inset-x-0 top-0 bottom-1/4 transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1">
            <FallbackImage
              src={avatarUrl || '/assets/characters/PlayerGirl/avatar.webp'}
              alt={name} fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 260px"
              className="object-contain object-bottom pt-2 drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
              priority={false}
            />
          </div>

          {/* ─── Elemental Nameplate Overlay ───── */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
            style={{
              background: `linear-gradient(to top,
                rgba(8,8,12,1) 0%,
                rgba(12,12,18,0.9) 40%,
                ${glow}0.3) 60%,
                transparent 100%
              )`,
            }}
          />

          {/* ─── 5★ corner sparkle ───────────────── */}
          {is5 && (
            <div
              className="absolute -top-8 -right-8 w-28 h-28 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${glow}0.16) 0%, transparent 70%)`,
                filter: 'blur(10px)',
              }}
            />
          )}

          {/* ─── TOP LEFT: Element & Tier ──────────── */}
          <div className="absolute top-2 left-2 z-20 flex flex-col gap-1.5">
            <div className="relative w-7 h-7">
              <FallbackImage
                src={`/assets/elements/${el.toLowerCase()}.webp`}
                alt={el} fill
                className="object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              />
            </div>
            {tierCfg && (
              <div
                className="px-2 py-[2px] rounded text-[8px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg"
                style={{ background: tierCfg.bg, border: `1px solid ${tierCfg.border}`, color: tierCfg.text }}
              >
                {tierValue === 'TBD' ? 'UNRANKED' : `${character.tier}`}
              </div>
            )}
          </div>

          {/* ─── TOP RIGHT: Fav button ─────────── */}
          <div className="absolute top-2 right-2 z-20">
            <button
              onClick={toggleFav}
              className="p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                background: isFav ? 'rgba(239,68,68,0.28)' : 'rgba(0,0,0,0.50)',
                border: `1px solid ${isFav ? 'rgba(239,68,68,0.55)' : 'rgba(255,255,255,0.15)'}`,
              }}
            >
              <Heart
                className="w-4 h-4 transition-all duration-200"
                style={{ fill: isFav ? '#ef4444' : 'transparent', color: isFav ? '#ef4444' : 'rgba(255,255,255,0.65)' }}
              />
            </button>
          </div>

          {/* ─── BOTTOM nameplate ─────────────────── */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-3 pointer-events-none flex flex-col justify-end">
            {/* Name */}
            <div
              className="text-[13px] sm:text-base font-black tracking-wide leading-tight mb-1 truncate drop-shadow-[0_0_12px_rgba(0,0,0,0.8)]"
              style={{ color: '#fff', textShadow: `0 0 15px ${glow}0.8)` }}
            >
              {name}
            </div>

            {/* Rarity & Weapon */}
            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
              <div className="flex gap-[2px]">
                {Array.from({ length: character.rarity }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 drop-shadow-md"
                    style={{ color: is5 ? '#ffd54f' : '#ce93d8', filter: `drop-shadow(0 0 3px ${is5 ? 'rgba(255,213,79,0.5)' : 'rgba(206,147,216,0.5)'})` }}
                    fill="currentColor" viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {character.weapon && (
                <span className="text-[8px] font-bold px-1.5 py-[2px] rounded uppercase tracking-wider shrink-0 bg-white/5 border border-white/10 text-white/60">
                  {character.weapon}
                </span>
              )}
            </div>
          </div>

          {/* ─── Hover: glowing border overlay ───── */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-400"
            style={{
              boxShadow: `inset 0 0 0 1.5px ${glow}${hovered ? '0.60)' : '0.18)'}`,
              opacity: 1,
            }}
          />
        </motion.div>
      </div>

      {overlayReady && (
        <SplashArtOverlay
          open={overlayOpen}
          onClose={() => setOverlayOpen(false)}
          character={{
            id: character.id, nameEn: character.nameEn, nameVi: character.nameVi,
            element: character.element, rarity: character.rarity,
            splashArtUrl: splashUrl || avatarUrl || '',
            avatarUrl, weapon: character.weapon, role: character.role, tier: character.tier,
          }}
          href={href}
          locale={locale}
        />
      )}
    </>
  );
}
