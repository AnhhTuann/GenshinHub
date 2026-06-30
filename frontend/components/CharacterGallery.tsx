"use client";
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import CharacterCard from './CharacterCard';
import { CharacterData, Element } from '@/types/character';

const ELEMENTS: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
const WEAPON_TYPES = ['Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
const ELEMENT_COLOR: Record<string, string> = {
  Pyro: '#ff6b4a', Hydro: '#4fc3f7', Cryo: '#80deea',
  Electro: '#ce93d8', Anemo: '#4db6ac', Geo: '#ffd54f', Dendro: '#aed581',
};

export default function CharacterGallery({ initialCharacters }: { initialCharacters: CharacterData[] }) {
  const [search,          setSearch]          = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedRarity,  setSelectedRarity]  = useState<5 | 4 | null>(null);
  const [selectedWeapon,  setSelectedWeapon]  = useState<string | null>(null);
  const locale = useLocale();

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

  const hasFilters = !!(search || selectedElement || selectedRarity || selectedWeapon);

  return (
    <div className="flex flex-col gap-5">

      {/* ────────────────────────────────────────
          FILTER BAR
      ──────────────────────────────────────── */}
      <div
        className="rounded-2xl p-4 flex flex-col gap-4"
        style={{
          background: 'rgba(8,8,18,0.80)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {/* Row 1 — Search + Rarity */}
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-0">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'rgba(255,255,255,0.22)' }}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={locale === 'en' ? 'Search characters...' : 'Tìm nhân vật...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl text-sm font-medium outline-none"
              style={{
                background: 'rgba(4,4,10,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.88)',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(200,168,75,0.38)';
                e.target.style.boxShadow = '0 0 0 3px rgba(200,168,75,0.08)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.07)';
                e.target.style.boxShadow = 'none';
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5"
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
            const c = r === 5 ? '#ffd54f' : '#ce93d8';
            return (
              <button
                key={r}
                onClick={() => setSelectedRarity(active ? null : r)}
                className="px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider shrink-0"
                style={{
                  background: active ? `${c}18` : 'rgba(4,4,10,0.8)',
                  border: `1px solid ${active ? `${c}50` : 'rgba(255,255,255,0.07)'}`,
                  color: active ? c : 'rgba(255,255,255,0.35)',
                  boxShadow: active ? `0 0 12px ${c}25` : 'none',
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
          <span className="text-white/20 text-[9px] font-black uppercase tracking-widest shrink-0 hidden sm:block w-14">Element</span>
          <div className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />

          <PillBtn active={!selectedElement} onClick={() => setSelectedElement(null)} label="All" color="#ffffff" />

          {ELEMENTS.map((el) => {
            const active = selectedElement === el;
            const ec = ELEMENT_COLOR[el];
            return (
              <button
                key={el}
                onClick={() => setSelectedElement(active ? null : el)}
                title={el}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg"
                style={{
                  background: active ? `${ec}18` : 'transparent',
                  border: `1px solid ${active ? `${ec}50` : 'transparent'}`,
                  boxShadow: active ? `0 0 10px ${ec}25` : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src={`/elements/${el.toLowerCase()}.png`}
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
          <span className="text-white/20 text-[9px] font-black uppercase tracking-widest shrink-0 hidden sm:block w-14">Weapon</span>
          <div className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />

          <PillBtn active={!selectedWeapon} onClick={() => setSelectedWeapon(null)} label="All" color="#ffffff" />

          {WEAPON_TYPES.map((w) => {
            const active = selectedWeapon === w;
            return (
              <button
                key={w}
                onClick={() => setSelectedWeapon(active ? null : w)}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider"
                style={{
                  background: active ? 'rgba(200,168,75,0.15)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(200,168,75,0.40)' : 'transparent'}`,
                  color: active ? '#f0d080' : 'rgba(255,255,255,0.32)',
                  transition: 'all 0.2s ease',
                }}
              >
                {w}
              </button>
            );
          })}

          {hasFilters && (
            <button
              onClick={clearAll}
              className="ml-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider"
              style={{ color: 'rgba(255,255,255,0.28)', transition: 'color 0.2s' }}
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
        <span className="text-white/25 text-xs font-medium">
          <span style={{ color: 'rgba(200,168,75,0.75)', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700 }}>
            {filtered.length}
          </span>
          {' '}{locale === 'en' ? 'characters' : 'nhân vật'}
          {hasFilters ? (locale === 'en' ? ' found' : ' tìm thấy') : ''}
        </span>
        {hasFilters && (
          <span className="text-white/20 text-xs">
            {locale === 'en' ? 'of' : 'trong'} {initialCharacters.length}
          </span>
        )}
      </div>

      {/* ── Character Grid ── */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 sm:gap-3">
          {filtered.map((char) => (
            <CharacterCard key={char.id} character={char} />
          ))}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-2xl"
          style={{ background: 'rgba(8,8,18,0.5)', border: '1px solid rgba(255,255,255,0.04)' }}
        >
          <div className="text-5xl mb-4 opacity-30">🔍</div>
          <p className="text-sm font-semibold text-white/25">
            {locale === 'en' ? 'No characters match your filters.' : 'Không tìm thấy nhân vật phù hợp.'}
          </p>
          <button
            onClick={clearAll}
            className="mt-4 text-xs font-bold underline underline-offset-2"
            style={{ color: 'rgba(200,168,75,0.65)' }}
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
      className="px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider"
      style={{
        background: active ? 'rgba(255,255,255,0.10)' : 'transparent',
        border: `1px solid ${active ? 'rgba(255,255,255,0.16)' : 'transparent'}`,
        color: active ? '#fff' : 'rgba(255,255,255,0.28)',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </button>
  );
}
