"use client";
import { useState, useEffect, useContext } from 'react';
import ElementIcon from '@/components/ui/ElementIcon';
import FallbackImage from '@/components/ui/FallbackImage';
import RarityStars from '@/components/ui/RarityStars';
import { CharacterData } from '@/types/character';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { UserContext } from '@/context/UserContext';
import { getCharacterAvatar, getCharacterSplash } from '@/utils/assetMap';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const loadPreview = () => import('@/components/ui/SplashArtOverlay');
const SplashArtOverlay = dynamic(loadPreview, { ssr: false });

function warmPreview() {
  // The dynamic component still handles errors on click if the hint failed.
  void loadPreview().catch(() => {});
}

/* ─── Element colors ─────────────────────────── */
const EL_COLOR: Record<string, string> = {
  Pyro: '#ff5a45', Hydro: '#3aa8ff', Cryo: '#8fe8f5',
  Electro: '#cf8fff', Anemo: '#35d6c5', Geo: '#ffd34d', Dendro: '#9ede5f',
};
const EL_GLOW: Record<string, string> = {
  Pyro: 'rgba(255,90,69,', Hydro: 'rgba(79,195,247,',
  Cryo: 'rgba(128,222,234,', Electro: 'rgba(206,147,216,',
  Anemo: 'rgba(77,182,172,', Geo: 'rgba(255,213,79,', Dendro: 'rgba(174,213,129,',
};

export default function CharacterCard({ character, variant = 'standard' }: {
  character: CharacterData;
  variant?: 'standard' | 'collection';
}) {
  const locale = useLocale();
  const userCtx = useContext(UserContext);
  const user = userCtx?.user;

  const is5 = character.rarity === 5;
  const name = locale === 'en' ? character.nameEn : (character.nameVi || character.nameEn);
  const el = character.element;
  const color = EL_COLOR[el] ?? '#a77cf6';
  const glow  = EL_GLOW[el]  ?? 'rgba(167,124,246,';
  
  const tierValue = character.tier || 'TBD';

  const [overlayOpen, setOverlayOpen]   = useState(false);
  const [overlayReady, setOverlayReady] = useState(false);
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
      const r = await fetch('/api/auth/favorite', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ itemId: character.id, itemType: 'CHARACTER' }) });
      if (!r.ok) throw new Error();
      if (userCtx?.refreshUser) await userCtx.refreshUser();
    } catch { setIsFav(p => !p); toast.error('Error, please try again.'); }
  };

  const href = `/${locale}/characters/${character.id}`;
  const avatarSrc = avatarUrl || '/assets/characters/PlayerGirl/avatar.webp';
  const avatarSizes = '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 260px';
  const favoriteLabel = locale === 'vi' ? 'Yêu thích' : 'Favorite';

  if (variant === 'collection') {
    const rank = tierValue.trim().toUpperCase();
    const rankLabel = !rank || rank === 'TBD' || rank === 'UNRANKED' ? 'Unranked' : rank;

    return (
      <article className="collection-character-card" style={{ '--card-element': color } as React.CSSProperties}>
        <Link href={href} prefetch={false} className="collection-character-link" aria-label={name} />
        <div className="collection-character-controls">
          <div className="collection-character-badges">
            <ElementIcon element={el} label={el} />
            <span className="collection-character-rank" data-rank={rankLabel}>
              {rankLabel}
            </span>
          </div>
          <button
            type="button"
            className="collection-character-favorite"
            onClick={toggleFav}
            aria-label={favoriteLabel}
            aria-pressed={isFav}
          >
            <Heart size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="collection-character-stage">
          <div className="collection-character-portrait">
            <FallbackImage src={avatarSrc} alt="" fill sizes={avatarSizes} />
          </div>
        </div>
        <div className="collection-character-caption">
          <h2 className="collection-character-name">{name}</h2>
          <RarityStars rarity={character.rarity} locale={locale} />
          {character.weapon && <span className="collection-character-weapon">{character.weapon}</span>}
        </div>
      </article>
    );
  }

  return (
    <>
      <div className="group relative">
        <div className="character-art-card fantasy-character-card relative rounded-2xl overflow-hidden"
          style={{ aspectRatio: '0.88', '--card-element': color } as React.CSSProperties}>
          <button type="button" className="character-preview-trigger" aria-haspopup="dialog"
            aria-label={locale === 'vi' ? `Xem trước ${name}` : `Preview ${name}`}
            onFocus={warmPreview}
            onPointerEnter={event => { if (event.pointerType === 'mouse') warmPreview(); }}
            onClick={() => { setOverlayReady(true); setOverlayOpen(true); }} />
          {/* ─── Element Watermark ───────────── */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none mix-blend-multiply overflow-hidden">
            <FallbackImage
              src={`/assets/elements/${el.toLowerCase()}.webp`}
              alt={el} fill
              className="object-contain scale-125 -rotate-12 blur-[1px]"
            />
          </div>

          {/* ─── Avatar Image (Square fitting top) ─── */}
          <div className="absolute inset-x-0 top-0 bottom-1/4 fantasy-character-artwork">
            <FallbackImage
              src={avatarSrc}
              alt={name} fill
              sizes={avatarSizes}
              className="object-contain object-bottom pt-2 drop-shadow-[0_8px_16px_rgba(23,43,58,0.16)]"
              priority={false}
            />
          </div>

          {/* ─── Elemental Nameplate Overlay ───── */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
            style={{
              background: `linear-gradient(to top,
                rgba(23,43,58,0.96) 0%,
                rgba(23,43,58,0.82) 38%,
                ${glow}0.24) 64%,
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
            <ElementIcon element={el} label={el} />
            <span className="character-card-tier px-2 py-0.5 rounded text-[11px] font-bold uppercase">
              {tierValue === 'TBD' ? 'UNRANKED' : tierValue}
            </span>
          </div>

          {/* ─── TOP RIGHT: Fav button ─────────── */}
          <div className="absolute top-2 right-2 z-20">
            <button
              onClick={toggleFav}
              aria-label={favoriteLabel}
              aria-pressed={isFav}
              className="p-2 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                background: isFav ? 'rgba(239,68,68,0.28)' : 'rgba(0,0,0,0.50)',
                border: `1px solid ${isFav ? 'rgba(239,68,68,0.55)' : 'rgba(255,255,255,0.15)'}`,
              }}
            >
              <Heart
                className="w-4 h-4 transition-all duration-200"
                style={{ fill: isFav ? '#ef4444' : 'transparent', color: isFav ? '#ff9da8' : '#fff' }}
              />
            </button>
          </div>

          {/* ─── BOTTOM nameplate ─────────────────── */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-3 pointer-events-none flex flex-col justify-end">
            {/* Name */}
            <div
              className="text-[13px] sm:text-base font-bold tracking-wide leading-tight mb-1 truncate"
              style={{ color: '#fff', textShadow: '0 1px 5px rgba(23,43,58,0.35)' }}
            >
              {name}
            </div>

            {/* Rarity & Weapon */}
            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
              <div className="character-rarity flex gap-[2px]" data-rarity={character.rarity} role="img" aria-label={locale === 'vi' ? `${character.rarity} sao` : `${character.rarity} stars`}>
                {Array.from({ length: character.rarity }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 drop-shadow-md"
                    aria-hidden="true"
                    fill="currentColor" viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {character.weapon && (
                <span className="character-card-weapon">
                  {character.weapon}
                </span>
              )}
            </div>
          </div>

        </div>
      </div>

      {overlayReady && (
        <SplashArtOverlay
          open={overlayOpen}
          onClose={() => setOverlayOpen(false)}
          character={{
            nameEn: character.nameEn, nameVi: character.nameVi,
            element: character.element, rarity: character.rarity,
            splashArtUrl: splashUrl || avatarUrl || '',
            avatarUrl, weapon: character.weapon, region: character.region,
            title: locale === 'vi' ? character.titleVi : character.titleEn, role: character.role, tier: character.tier,
          }}
          href={href}
          locale={locale}
        />
      )}
    </>
  );
}
