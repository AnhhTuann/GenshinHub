"use client";
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import CharacterCard from './CharacterCard';
import { CharacterData, Element } from '@/types/character';

const ELEMENTS: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
const WEAPON_TYPES = ['Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
const ELEMENT_COLOR: Record<string, string> = {
  Pyro: '#ff5a45', Hydro: '#3aa8ff', Cryo: '#8fe8f5',
  Electro: '#cf8fff', Anemo: '#35d6c5', Geo: '#ffd34d', Dendro: '#9ede5f',
};

export default function CharacterGallery({ initialCharacters }: { initialCharacters: CharacterData[] }) {
  const [search,          setSearch]          = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedRarity,  setSelectedRarity]  = useState<5 | 4 | null>(null);
  const [selectedWeapon,  setSelectedWeapon]  = useState<string | null>(null);
  const locale = useLocale();

  const [visibleCount, setVisibleCount] = useState(30);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Debounce search input 200ms
  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 200);
    return () => clearTimeout(id);
  }, [search]);

  // Listen for logo-click reset event
  useEffect(() => {
    const reset = () => {
      setSearch(''); setSelectedElement(null);
      setSelectedRarity(null); setSelectedWeapon(null);
    };
    window.addEventListener('reset-search', reset);
    return () => window.removeEventListener('reset-search', reset);
  }, []);

  const clearAll = useCallback(() => {
    setSearch(''); setSelectedElement(null);
    setSelectedRarity(null); setSelectedWeapon(null);
  }, []);

  const filtered = useMemo(() => {
    return initialCharacters.filter((c) => {
      const name = locale === 'vi' ? (c.nameVi || c.nameEn) : c.nameEn;
      return (
        name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (!selectedElement || c.element === selectedElement) &&
        (!selectedRarity  || c.rarity  === selectedRarity) &&
        (!selectedWeapon  || c.weapon  === selectedWeapon)
      );
    });
  }, [initialCharacters, debouncedSearch, selectedElement, selectedRarity, selectedWeapon, locale]);

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(30);
  }, [filtered]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 30, filtered.length));
      }
    }, { rootMargin: '400px' });
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [filtered.length]);

  const hasFilters = !!(search || selectedElement || selectedRarity || selectedWeapon);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  return (
    <div className="flex flex-col gap-5">

      {/* ────────────────────────────────────────
          FILTER BAR
      ──────────────────────────────────────── */}
      <div
        className="flex flex-col gap-4 rounded-xl p-4 sm:p-5"
        style={{
          background: '#171518',
          border: '1px solid rgba(226,216,198,0.12)',
          boxShadow: '0 10px 28px rgba(0,0,0,0.14)',
        }}
      >
        {/* Row 1 — Search + Rarity */}
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-0">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'rgba(231,222,210,0.42)' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={locale === 'en' ? 'Search characters...' : 'Tìm nhân vật...'}
              aria-label={locale === 'en' ? 'Search characters' : 'Tìm nhân vật'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-h-11 pl-10 pr-12 py-2.5 rounded-lg text-sm font-medium outline-none"
              style={{
                background: '#100f10',
                border: '1px solid rgba(226,216,198,0.14)',
                color: '#f0ead9',
                transition: 'border-color 0.2s ease, background 0.2s ease',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(201,147,166,0.65)';
                e.target.style.boxShadow = '0 0 0 3px rgba(201,147,166,0.10)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(226,216,198,0.14)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label={locale === 'en' ? 'Clear search' : 'Xóa tìm kiếm'}
                className="absolute right-1 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a86a]"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Rarity */}
          {([5, 4] as const).map((r) => {
            const active = selectedRarity === r;
            const c = r === 5 ? '#ffd34d' : '#cf8fff';
            return (
              <button
                key={r}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedRarity(active ? null : r)}
                className="min-h-11 min-w-11 px-3 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a86a]"
                style={{
                  background: active ? `${c}18` : '#100f10',
                  border: `1px solid ${active ? `${c}50` : 'rgba(226,216,198,0.14)'}`,
                  color: active ? c : 'rgba(231,222,210,0.52)',
                  transition: 'all 0.2s ease',
                }}
              >
                {r}★
              </button>
            );
          })}
        </div>

        {/* Row 2 — Element filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] font-bold uppercase tracking-widest shrink-0 hidden sm:block w-14" style={{ color: 'rgba(231,222,210,0.48)' }}>Element</span>
          <div className="hidden sm:block w-px h-3.5" style={{ background: 'rgba(226,216,198,0.14)' }} />

          <PillBtn active={!selectedElement} onClick={() => setSelectedElement(null)} label="All" color="#f5f1e6" />

          {ELEMENTS.map((el) => {
            const active = selectedElement === el;
            const ec = ELEMENT_COLOR[el];
            return (
              <button
                key={el}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedElement(active ? null : el)}
                title={el}
                aria-label={el}
                className="flex min-h-11 min-w-11 items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a86a]"
                style={{
                  background: active ? `${ec}18` : 'transparent',
                  border: `1px solid ${active ? `${ec}50` : 'transparent'}`,
                  transition: 'all 0.2s ease',
                }}
              >
                <div className="relative w-4 h-4 shrink-0">
                  <FallbackImage
                    src={`/assets/elements/${el.toLowerCase()}.webp`}
                    alt={el}
                    fill
                    className="object-contain"
                    style={{
                      opacity: active ? 1 : 0.45,
                      transform: active ? 'scale(1.15)' : 'scale(1)',
                      transition: 'opacity 0.2s, transform 0.2s',
                    }}
                  />
                </div>
                {active && (
                  <span className="text-[10px] font-bold hidden sm:block" style={{ color: ec }}>
                    {el}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Row 3 — Weapon filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[9px] font-bold uppercase tracking-widest shrink-0 hidden sm:block w-14" style={{ color: 'rgba(231,222,210,0.48)' }}>Weapon</span>
          <div className="hidden sm:block w-px h-3.5" style={{ background: 'rgba(226,216,198,0.14)' }} />

          <PillBtn active={!selectedWeapon} onClick={() => setSelectedWeapon(null)} label="All" color="#f5f1e6" />

          {WEAPON_TYPES.map((w) => {
            const active = selectedWeapon === w;
            return (
              <button
                key={w}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedWeapon(active ? null : w)}
                className="min-h-11 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a86a]"
                style={{
                  background: active ? 'rgba(201,147,166,0.12)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(201,147,166,0.38)' : 'transparent'}`,
                  color: active ? '#c9a86a' : 'rgba(231,222,210,0.52)',
                  transition: 'all 0.2s ease',
                }}
              >
                {w}
              </button>
            );
          })}

          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto flex min-h-11 items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a86a]"
              style={{ color: 'rgba(231,222,210,0.55)', transition: 'color 0.2s' }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              {locale === 'en' ? 'Clear filters' : 'Xóa bộ lọc'}
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-medium" style={{ color: 'rgba(231,222,210,0.58)' }}>
          <span style={{ color: '#c9a86a', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700 }}>
            {filtered.length}
          </span>
          {' '}{locale === 'en' ? 'characters' : 'nhân vật'}
          {hasFilters ? (locale === 'en' ? ' found' : ' tìm thấy') : ''}
        </span>
        {hasFilters && (
          <span className="text-xs" style={{ color: 'rgba(231,222,210,0.42)' }}>
            {locale === 'en' ? 'of' : 'trong'} {initialCharacters.length}
          </span>
        )}
      </div>

      {/* ── Character Grid ── */}
      {filtered.length > 0 ? (
        <div className="pb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5"
          >
            {filtered.slice(0, visibleCount).map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </motion.div>
          {visibleCount < filtered.length && (
            <div ref={loaderRef} className="w-full h-20 flex items-center justify-center mt-8">
              <div className="w-6 h-6 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(201,147,166,0.24)', borderTopColor: '#c9a86a' }}></div>
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-xl"
          style={{ background: '#171518', border: '1px solid rgba(226,216,198,0.1)' }}
        >
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-full" style={{ border: '1px solid rgba(226,216,198,0.16)', color: 'rgba(231,222,210,0.48)' }}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
              <path d="m16 16 4 4" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: 'rgba(231,222,210,0.65)' }}>
            {locale === 'en' ? 'No characters match your filters.' : 'Không tìm thấy nhân vật phù hợp.'}
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 min-h-11 rounded-md px-3 text-xs font-bold underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a86a]"
            style={{ color: '#c9a86a' }}
          >
            {locale === 'en' ? 'Clear filters' : 'Xóa bộ lọc'}
          </button>
        </div>
      )}
    </div>
  );
}

// Reusable pill button
function PillBtn({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color: string }) {
  return (
    <button
      onClick={onClick}
      type="button"
      aria-pressed={active}
      className="min-h-11 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a86a]"
      style={{
        background: active ? 'rgba(231,222,210,0.09)' : 'transparent',
        border: `1px solid ${active ? 'rgba(231,222,210,0.22)' : 'transparent'}`,
        color: active ? '#f0ead9' : 'rgba(231,222,210,0.5)',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </button>
  );
}
