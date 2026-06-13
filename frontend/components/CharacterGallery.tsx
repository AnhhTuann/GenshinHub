"use client";
import { useState, useMemo, useEffect, useCallback } from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterCard from './CharacterCard';
import { CharacterData, Element } from '@/types/character';

const ELEMENTS: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];

const ELEMENT_STYLE: Record<Element, { active: string; ring: string }> = {
  Pyro:    { active: 'bg-[#ff6b4a]/15 border-[#ff6b4a]/40 text-[#ff6b4a]',   ring: 'ring-[#ff6b4a]/30' },
  Hydro:   { active: 'bg-[#4fc3f7]/15 border-[#4fc3f7]/40 text-[#4fc3f7]',   ring: 'ring-[#4fc3f7]/30' },
  Cryo:    { active: 'bg-[#80deea]/15 border-[#80deea]/40 text-[#80deea]',   ring: 'ring-[#80deea]/30' },
  Electro: { active: 'bg-[#ce93d8]/15 border-[#ce93d8]/40 text-[#ce93d8]',   ring: 'ring-[#ce93d8]/30' },
  Anemo:   { active: 'bg-[#4db6ac]/15 border-[#4db6ac]/40 text-[#4db6ac]',   ring: 'ring-[#4db6ac]/30' },
  Geo:     { active: 'bg-[#ffd54f]/15 border-[#ffd54f]/40 text-[#ffd54f]',   ring: 'ring-[#ffd54f]/30' },
  Dendro:  { active: 'bg-[#aed581]/15 border-[#aed581]/40 text-[#aed581]',   ring: 'ring-[#aed581]/30' },
  None:    { active: 'bg-white/10 border-white/20 text-white',                ring: 'ring-white/20' },
};

export default function CharacterGallery({ initialCharacters }: { initialCharacters: CharacterData[] }) {
  const [searchQuery,      setSearchQuery]      = useState('');
  const [debouncedSearch,  setDebouncedSearch]  = useState('');
  const [selectedElement,  setSelectedElement]  = useState<Element | null>(null);
  const [selectedRarity,   setSelectedRarity]   = useState<5 | 4 | null>(null);
  const locale = useLocale();

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchQuery), 200);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Listen for reset event from Navbar logo click
  useEffect(() => {
    const handleReset = () => {
      setSearchQuery('');
      setSelectedElement(null);
      setSelectedRarity(null);
    };
    window.addEventListener('reset-search', handleReset);
    return () => window.removeEventListener('reset-search', handleReset);
  }, []);

  const filtered = useMemo(() => {
    return initialCharacters.filter((c) => {
      const name = locale === 'en' ? c.nameEn : c.nameVi;
      const matchName    = name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchElement = selectedElement ? c.element === selectedElement : true;
      const matchRarity  = selectedRarity  ? c.rarity  === selectedRarity  : true;
      return matchName && matchElement && matchRarity;
    });
  }, [initialCharacters, debouncedSearch, selectedElement, selectedRarity, locale]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedElement(null);
    setSelectedRarity(null);
  }, []);

  const hasFilters = searchQuery || selectedElement || selectedRarity;

  return (
    <div className="flex flex-col gap-5">
      {/* ── Filter Bar ── */}
      <div className="bg-[#0d0d14]/70 backdrop-blur-md border border-white/[0.06] rounded-2xl p-3.5 sm:p-4 shadow-xl flex flex-col gap-3">
        {/* Row 1: Search + Rarity */}
        <div className="flex gap-2.5 sm:gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={locale === 'en' ? 'Search characters...' : 'Tìm nhân vật...'}
              className="w-full bg-[#06060a]/80 text-white/90 pl-9 pr-8 py-2.5 rounded-xl border border-white/[0.06] focus:border-yellow-400/30 focus:ring-1 focus:ring-yellow-400/10 outline-none transition-all placeholder:text-white/20 text-sm font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-0.5">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          {/* Rarity filter */}
          <div className="flex gap-1.5 shrink-0">
            {([5, 4] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRarity(selectedRarity === r ? null : r)}
                className={`px-3 py-2.5 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-all duration-200 shrink-0 ${
                  selectedRarity === r
                    ? r === 5
                      ? 'bg-amber-400/15 border-amber-400/40 text-amber-300'
                      : 'bg-purple-400/15 border-purple-400/40 text-purple-300'
                    : 'bg-transparent border-white/[0.06] text-white/35 hover:text-white/60 hover:bg-white/[0.04]'
                }`}
              >
                {r}★
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Element filter */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-white/20 text-[9px] font-black uppercase tracking-widest shrink-0 hidden sm:block">Element</span>
          <div className="hidden sm:block w-px h-3.5 bg-white/[0.07]" />

          <button
            onClick={() => setSelectedElement(null)}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border transition-all duration-200 ${
              !selectedElement
                ? 'bg-white/10 text-white border-white/15'
                : 'text-white/30 border-transparent hover:text-white/55 hover:bg-white/[0.04]'
            }`}
          >
            All
          </button>

          {ELEMENTS.map((el) => {
            const isActive = selectedElement === el;
            const style    = ELEMENT_STYLE[el];
            return (
              <button
                key={el}
                onClick={() => setSelectedElement(isActive ? null : el)}
                title={el}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border transition-all duration-200 ${
                  isActive
                    ? `${style.active} ring-1 ${style.ring}`
                    : 'bg-transparent border-transparent text-white/40 hover:bg-white/[0.04] hover:text-white/70'
                }`}
              >
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src={`/elements/${el.toLowerCase()}.png`}
                    alt={el}
                    fill
                    className={`object-contain transition-all duration-200 ${isActive ? 'opacity-100 scale-110' : 'opacity-50'}`}
                  />
                </div>
                {isActive && <span className="text-[10px] font-bold hidden sm:block">{el}</span>}
              </button>
            );
          })}

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="ml-auto flex items-center gap-1.5 text-[10px] text-white/30 hover:text-white/60 transition-colors font-bold uppercase tracking-wider"
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
        <span className="text-white/20 text-xs font-medium">
          {filtered.length} {locale === 'en' ? 'characters' : 'nhân vật'}
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
                transition={{
                  duration: 0.4,
                  type: 'spring',
                  bounce: 0.25,
                  delay: Math.min(i * 0.02, 0.2) // cap delay so it doesn't take forever
                }}
              >
                <CharacterCard character={char} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-white/25 bg-[#0d0d14]/30 rounded-2xl border border-white/[0.04]">
          <span className="text-5xl mb-4 opacity-30">🔍</span>
          <p className="text-sm font-semibold">
            {locale === 'en' ? 'No characters match your filters.' : 'Không tìm thấy nhân vật phù hợp.'}
          </p>
          <button onClick={clearFilters} className="mt-4 text-xs text-yellow-400/60 hover:text-yellow-400 transition-colors font-bold underline underline-offset-2">
            {locale === 'en' ? 'Clear filters' : 'Xóa bộ lọc'}
          </button>
        </div>
      )}
    </div>
  );
}
