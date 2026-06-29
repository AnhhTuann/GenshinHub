"use client";
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterCard from './CharacterCard';
import { CharacterData, Element } from '@/types/character';

const ELEMENTS: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
const WEAPON_TYPES = ['Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];

const ELEMENT_COLOR: Record<string, string> = {
  Pyro:    '#ff6b4a', Hydro:   '#4fc3f7', Cryo:    '#80deea',
  Electro: '#ce93d8', Anemo:   '#4db6ac', Geo:     '#ffd54f', Dendro:  '#aed581',
};

export default function CharacterGallery({ initialCharacters }: { initialCharacters: CharacterData[] }) {
  const [searchQuery,     setSearchQuery]     = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [selectedRarity,  setSelectedRarity]  = useState<5 | 4 | null>(null);
  const [selectedWeapon,  setSelectedWeapon]  = useState<string | null>(null);
  const locale = useLocale();

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 200);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    const handleReset = () => {
      setSearchQuery(''); setSelectedElement(null);
      setSelectedRarity(null); setSelectedWeapon(null);
    };
    window.addEventListener('reset-search', handleReset);
    return () => window.removeEventListener('reset-search', handleReset);
  }, []);

  const filtered = useMemo(() => {
    return initialCharacters.filter((c) => {
      const name = locale === 'en' ? c.nameEn : c.nameVi;
      return (
        name.toLowerCase().includes(debouncedSearch.toLowerCase()) &&
        (!selectedElement || c.element === selectedElement) &&
        (!selectedRarity  || c.rarity  === selectedRarity) &&
        (!selectedWeapon  || c.weapon  === selectedWeapon)
      );
    });
  }, [initialCharacters, debouncedSearch, selectedElement, selectedRarity, selectedWeapon, locale]);

  const clearFilters = useCallback(() => {
    setSearchQuery(''); setSelectedElement(null);
    setSelectedRarity(null); setSelectedWeapon(null);
  }, []);

  const hasFilters = searchQuery || selectedElement || selectedRarity || selectedWeapon;

  return (
    <div className="flex flex-col gap-5">

      {/* ── Filter Bar ── */}
      <div
        className="rounded-2xl p-4 flex flex-col gap-3.5"
        style={{
          background: 'rgba(8,8,18,0.80)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {/* Row 1: Search + Rarity */}
        <div className="flex gap-2.5">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: 'rgba(255,255,255,0.25)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={locale === 'en' ? 'Search characters...' : 'Tìm nhân vật...'}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl text-sm font-medium outline-none transition-all"
              style={{
                background: 'rgba(4,4,10,0.8)',
                border: '1px solid rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.9)',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'rgba(200,168,75,0.35)';
                e.target.style.boxShadow = '0 0 0 3px rgba(200,168,75,0.08)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                e.target.style.boxShadow = 'none';
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)' }}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Rarity filter */}
          <div className="flex gap-1.5 shrink-0">
            {([5, 4] as const).map((r) => {
              const isRarActive = selectedRarity === r;
              const col = r === 5 ? '#ffd54f' : '#ce93d8';
              return (
                <button
                  key={r}
                  onClick={() => setSelectedRarity(isRarActive ? null : r)}
                  className="px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-200 shrink-0"
                  style={{
                    background: isRarActive ? `${col}18` : 'transparent',
                    border: `1px solid ${isRarActive ? col + '50' : 'rgba(255,255,255,0.06)'}`,
                    color: isRarActive ? col : 'rgba(255,255,255,0.35)',
                    boxShadow: isRarActive ? `0 0 12px ${col}30` : 'none',
                  }}
                >
                  {r}★
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Element filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-white/20 text-[9px] font-black uppercase tracking-widest shrink-0 hidden sm:block">Element</span>
          <div className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />

          {/* All button */}
          <button
            onClick={() => setSelectedElement(null)}
            className="px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200"
            style={{
              background: !selectedElement ? 'rgba(255,255,255,0.10)' : 'transparent',
              border: `1px solid ${!selectedElement ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
              color: !selectedElement ? '#fff' : 'rgba(255,255,255,0.30)',
            }}
          >
            All
          </button>

          {ELEMENTS.map((el) => {
            const isActive = selectedElement === el;
            const ec = ELEMENT_COLOR[el];
            return (
              <button
                key={el}
                onClick={() => setSelectedElement(isActive ? null : el)}
                title={el}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: isActive ? `${ec}18` : 'transparent',
                  border: `1px solid ${isActive ? ec + '50' : 'transparent'}`,
                  boxShadow: isActive ? `0 0 10px ${ec}30` : 'none',
                }}
              >
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src={`/elements/${el.toLowerCase()}.png`}
                    alt={el}
                    fill
                    className="object-contain transition-all duration-200"
                    style={{ opacity: isActive ? 1 : 0.5, transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
                  />
                </div>
                {isActive && <span className="text-[10px] font-bold hidden sm:block" style={{ color: ec }}>{el}</span>}
              </button>
            );
          })}
        </div>

        {/* Row 3: Weapon filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-white/20 text-[9px] font-black uppercase tracking-widest shrink-0 hidden sm:block">Weapon</span>
          <div className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />

          <button
            onClick={() => setSelectedWeapon(null)}
            className="px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200"
            style={{
              background: !selectedWeapon ? 'rgba(255,255,255,0.10)' : 'transparent',
              border: `1px solid ${!selectedWeapon ? 'rgba(255,255,255,0.15)' : 'transparent'}`,
              color: !selectedWeapon ? '#fff' : 'rgba(255,255,255,0.30)',
            }}
          >
            All
          </button>

          {WEAPON_TYPES.map((w) => {
            const isActive = selectedWeapon === w;
            return (
              <button
                key={w}
                onClick={() => setSelectedWeapon(isActive ? null : w)}
                className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-200"
                style={{
                  background: isActive ? 'rgba(200,168,75,0.15)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(200,168,75,0.40)' : 'transparent'}`,
                  color: isActive ? '#f0d080' : 'rgba(255,255,255,0.35)',
                }}
              >
                {w}
              </button>
            );
          })}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors"
              style={{ color: 'rgba(255,255,255,0.30)' }}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Results count ── */}
      <div className="flex items-center justify-between px-1">
        <span className="text-white/25 text-xs font-medium">
          <span style={{ color: 'rgba(200,168,75,0.7)', fontFamily: 'var(--font-mono, monospace)' }}>{filtered.length}</span>
          {' '}{locale === 'en' ? 'characters' : 'nhân vật'}
          {hasFilters ? (locale === 'en' ? ' found' : ' tìm thấy') : ''}
        </span>
        {hasFilters && (
          <span className="text-white/20 text-xs">
            {locale === 'en' ? 'of' : 'trong'} {initialCharacters.length}
          </span>
        )}
      </div>

      {/* ── Grid ── */}
      {filtered.length > 0 ? (
        <motion.div layout className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 sm:gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((char, i) => (
              <motion.div
                key={char.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
                transition={{ duration: 0.4, type: 'spring', bounce: 0.25, delay: Math.min(i * 0.02, 0.2) }}
              >
                <CharacterCard character={char} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-2xl"
          style={{
            background: 'rgba(8,8,18,0.5)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}
        >
          <div className="text-5xl mb-4 opacity-30">🔍</div>
          <p className="text-sm font-semibold text-white/25">
            {locale === 'en' ? 'No characters match your filters.' : 'Không tìm thấy nhân vật phù hợp.'}
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-xs font-bold underline underline-offset-2 transition-colors"
            style={{ color: 'rgba(200,168,75,0.6)' }}
          >
            {locale === 'en' ? 'Clear filters' : 'Xóa bộ lọc'}
          </button>
        </div>
      )}
    </div>
  );
}
