"use client";

import SpotlightPanel from '@/components/characters/SpotlightPanel';
import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import RarityStars from '@/components/ui/RarityStars';
import ElementIcon from '@/components/ui/ElementIcon';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { Check, Compass, Sparkles } from 'lucide-react';

interface SpotlightChar {
  id: string;
  nameEn: string;
  nameVi: string;
  element: string;
  rarity: number;
  avatarUrl: string;
  splashArtUrl?: string;
  titleEn?: string;
  titleVi?: string;
  weapon?: string;
  region?: string;
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

const MIN_RAIL_ITEMS = 12;

function getRailElement(value: unknown) {
  if (value == null) return { key: 'neutral', state: 'missing' };
  if (typeof value !== 'string') return { key: 'neutral', state: 'invalid' };

  const key = value.trim().toLowerCase();
  if (!key) return { key: 'neutral', state: 'invalid' };
  if (key === 'none') return { key: 'neutral', state: 'none' };

  const match = ELEMENTS.find(({ icon }) => icon === key);
  return match
    ? { key, state: 'element', label: match.nameEn }
    : { key: 'neutral', state: 'unknown' };
}

function getPrimaryRegion(region?: string) {
  if (!region) return '';
  return region.split(/[\/\(]/)[0].trim();
}

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange: () => void) {
  const preference = window.matchMedia(REDUCED_MOTION);
  preference.addEventListener('change', onChange);
  return () => preference.removeEventListener('change', onChange);
}

function prefersReducedMotion() {
  return window.matchMedia(REDUCED_MOTION).matches;
}

export default function CharacterSpotlight({ characters }: { characters: SpotlightChar[] }) {
  const locale = useLocale();
  const shouldReduceMotion = useSyncExternalStore(subscribeToMotionPreference, prefersReducedMotion, () => false);
  const [selectedElement, setSelectedElement] = useState<string>('all');
  const [selectedId, setSelectedId] = useState('citlali');
  const [isPaused, setIsPaused] = useState(false);

  const filteredCharacters = useMemo(() => {
    if (selectedElement === 'all') return characters;
    return characters.filter(
      (c) => getRailElement(c.element).key === selectedElement
    );
  }, [characters, selectedElement]);

  // Keep selectedId valid within the filtered set
  useEffect(() => {
    if (!filteredCharacters.length) return;
    const exists = filteredCharacters.some((c) => c.id === selectedId);
    if (!exists) {
      setSelectedId(filteredCharacters[0].id);
    }
  }, [filteredCharacters, selectedId]);

  const activeIndex = Math.max(0, filteredCharacters.findIndex((character) => character.id === selectedId));
  const active = filteredCharacters[activeIndex];

  const handleNext = useCallback(() => {
    if (!filteredCharacters.length) return;
    const idx = filteredCharacters.findIndex((c) => c.id === selectedId);
    const nextIdx = (Math.max(0, idx) + 1) % filteredCharacters.length;
    setSelectedId(filteredCharacters[nextIdx].id);
  }, [filteredCharacters, selectedId]);

  // Automatic transition every 8 seconds with smooth animation
  useEffect(() => {
    if (shouldReduceMotion || isPaused || filteredCharacters.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [shouldReduceMotion, isPaused, filteredCharacters.length, handleNext]);

  // Two identical groups make the -50% → 0 loop seamless. Repeating inside the
  // group keeps even narrow element filters filling wide viewports.
  const railUnit = useMemo(() => {
    if (!filteredCharacters.length) return [];
    const repeat = Math.max(1, Math.ceil(MIN_RAIL_ITEMS / filteredCharacters.length));
    return Array.from({ length: repeat }, () => filteredCharacters).flat();
  }, [filteredCharacters]);

  const railGroups = shouldReduceMotion ? [filteredCharacters] : [railUnit, railUnit];

  // Steady, calm speed of ~40-45px per second across all filters
  const marqueeDuration = useMemo(() => {
    const itemsCount = railUnit.length || filteredCharacters.length || 1;
    return `${Math.max(60, itemsCount * 5)}s`;
  }, [railUnit.length, filteredCharacters.length]);

  return (
    <div className="char-spotlight-wrapper">
      {/* ── Filter pills only ── */}
      <div className="char-filter-bar">
        <div className="char-filter-scroll" role="group" aria-label={locale === 'vi' ? 'Lọc theo nguyên tố' : 'Filter by element'}>
          {ELEMENTS.map((elem) => {
            const isActive = selectedElement === elem.id;
            const label = locale === 'vi' ? elem.nameVi : elem.nameEn;
            const count =
              elem.id === 'all'
                ? characters.length
                : characters.filter((c) => getRailElement(c.element).key === elem.id).length;
            return (
              <button key={elem.id} type="button" className="char-filter-pill"
                aria-pressed={isActive} onClick={() => setSelectedElement(elem.id)}>
                {elem.icon ? <ElementIcon element={elem.icon} /> : <Sparkles size={22} aria-hidden="true" />}
                <span>{label}</span>
                <span className="char-filter-count">{count}</span>
                {isActive && <Check className="filter-selected" size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          className="home-spotlight-feature relative group/spotlight overflow-hidden rounded-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <SpotlightPanel
            compact
            character={typeof active.element === 'string' ? active : { ...active, element: 'None' }}
            name={locale === 'vi' ? active.nameVi || active.nameEn : active.nameEn}
            title={locale === 'vi' ? active.titleVi : active.titleEn}
            locale={locale}
            actions={
              <div className="char-spotlight-action-row flex flex-wrap items-center gap-3">
                <Link
                  href={`/characters/${active.id}`}
                  className="fantasy-action fantasy-action-primary"
                >
                  {locale === 'vi' ? 'Xem nhân vật' : 'View character'}
                </Link>
                <button
                  type="button"
                  onClick={handleNext}
                  className="fantasy-action fantasy-action-secondary char-spotlight-switch-btn group"
                  aria-label="Next character"
                  title={locale === 'vi' ? 'Đổi qua nhân vật khác' : 'Next character'}
                >
                  <Sparkles size={16} className="text-amber-400 transition-transform group-hover:rotate-45" aria-hidden="true" />
                  <span>{locale === 'vi' ? 'Đổi nhân vật' : 'Next character'}</span>
                </button>
              </div>
            }
          />

          {/* Animated timer progress indicator */}
          {!shouldReduceMotion && filteredCharacters.length > 1 && (
            <div className="char-spotlight-timer-track" aria-hidden="true">
              <div
                key={`${active.id}-${isPaused ? 'paused' : 'running'}`}
                className={`char-spotlight-timer-bar ${isPaused ? 'is-paused' : ''}`}
              />
            </div>
          )}
        </div>
      )}

      {/* ── Continuous left-to-right rail (static + snap with reduced motion) ── */}
      {railGroups.length > 0 && (
        <div className={`char-marquee-container${shouldReduceMotion ? ' is-static' : ''}`}>
          <div
            className="char-marquee-track"
            style={{ '--marquee-duration': marqueeDuration } as React.CSSProperties}
          >
            {railGroups.map((group, groupIndex) => (
              <div className="char-rail-group" key={groupIndex} aria-hidden={groupIndex > 0 || undefined}>
                {group.map((char, index) => {
                  const duplicate = groupIndex > 0 || index >= filteredCharacters.length;
                  return (
                    <div className="char-rail-item" key={`${char.id}-${groupIndex}-${index}`}
                      aria-hidden={duplicate || undefined}>
                      <CharacterCard char={char} locale={locale} duplicate={duplicate} />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CharacterCard({ char, locale, duplicate }: { char: SpotlightChar; locale: string; duplicate: boolean }) {
  const name = locale === 'vi' ? char.nameVi || char.nameEn : char.nameEn;
  const region = getPrimaryRegion(char.region);
  const element = getRailElement(char.element);
  const neutralLabel = element.state === 'none'
    ? (locale === 'vi' ? 'Không có nguyên tố' : 'No element')
    : (locale === 'vi' ? 'Chưa rõ nguyên tố' : 'Element unavailable');

  return (
    <Link href={`/characters/${char.id}`} tabIndex={duplicate ? -1 : undefined}
      prefetch={false} className="char-card" data-element={element.key} data-element-state={element.state}>
      <div className="char-card-art-box">
        <div className="char-card-art-inner">
          <FallbackImage
            src={char.avatarUrl || '/assets/characters/PlayerGirl/avatar.webp'}
            alt="" fill sizes="200px" className="object-contain object-top"
          />
        </div>
        <span className="char-card-art-glow" aria-hidden="true" />
        <div className="char-card-mask" />
      </div>
      <div className="char-card-info">
        <div className="char-card-heading">
          {element.key === 'neutral' ? (
            <span className="atlas-element-icon char-card-neutral-icon" role="img" aria-label={neutralLabel}>
              <Compass size={21} aria-hidden="true" />
            </span>
          ) : (
            <ElementIcon element={element.key} label={element.label} />
          )}
          <h4 className="char-card-name">{name}</h4>
        </div>
        <RarityStars rarity={char.rarity} locale={locale} />
        <div className="char-card-sub">
          {char.weapon && <span className="character-card-weapon">{char.weapon}</span>}
          {region && <span>{region}</span>}
          {!char.weapon && !region && element.label && <span>{element.label}</span>}
        </div>
      </div>
    </Link>
  );
}
