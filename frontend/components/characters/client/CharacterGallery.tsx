"use client";
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import ElementIcon from '@/components/ui/ElementIcon';
import { Check, Search, X } from 'lucide-react';
import { useLocale } from 'next-intl';
import CharacterCard from './CharacterCard';
import { CharacterData, Element } from '@/types/character';

const ELEMENTS: Element[] = ['Pyro', 'Hydro', 'Anemo', 'Electro', 'Dendro', 'Cryo', 'Geo'];
const WEAPON_TYPES = ['Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
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

  return (
    <div className="fantasy-character-gallery flex flex-col gap-5">

      <div className="atlas-filter-panel" aria-label={locale === 'vi' ? 'Bộ lọc nhân vật' : 'Character filters'} role="group">
        <div className="atlas-filter-row">
          <div className="atlas-search">
            <Search size={19} aria-hidden="true" />
            <input
              type="text"
              aria-label={locale === 'en' ? 'Search characters' : 'Tìm nhân vật'}
              placeholder={locale === 'en' ? 'Search characters…' : 'Tìm nhân vật…'}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button type="button" className="atlas-search-clear" onClick={() => setSearch('')}
                aria-label={locale === 'en' ? 'Clear search' : 'Xóa tìm kiếm'}>
                <X size={17} aria-hidden="true" />
              </button>
            )}
          </div>
          <div className="atlas-filter-options" role="group" aria-label={locale === 'en' ? 'Rarity' : 'Độ hiếm'}>
            {([5, 4] as const).map((rarity) => (
              <button key={rarity} type="button" className="atlas-filter-chip"
                aria-pressed={selectedRarity === rarity}
                onClick={() => setSelectedRarity(selectedRarity === rarity ? null : rarity)}>
                <Check size={15} aria-hidden="true" />{rarity} ★
              </button>
            ))}
          </div>
        </div>
        <div className="atlas-filter-row">
          <span id="character-filter-element" className="atlas-filter-label">{locale === 'en' ? 'Element' : 'Nguyên tố'}</span>
          <div className="atlas-filter-options" role="group" aria-labelledby="character-filter-element">
            <FilterChip active={!selectedElement} onClick={() => setSelectedElement(null)} label={locale === 'en' ? 'All' : 'Tất cả'} />
            {ELEMENTS.map((element) => (
              <button key={element} type="button" title={element} aria-label={element}
                className="atlas-filter-chip atlas-element-chip" aria-pressed={selectedElement === element}
                onClick={() => setSelectedElement(selectedElement === element ? null : element)}>
                <ElementIcon element={element} />
                <span>{element}</span>
                <Check className="atlas-chip-check" size={14} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="atlas-filter-row">
          <span id="character-filter-weapon" className="atlas-filter-label">{locale === 'en' ? 'Weapon' : 'Vũ khí'}</span>
          <div className="atlas-filter-options" role="group" aria-labelledby="character-filter-weapon">
            <FilterChip active={!selectedWeapon} onClick={() => setSelectedWeapon(null)} label={locale === 'en' ? 'All' : 'Tất cả'} />
            {WEAPON_TYPES.map((weapon) => (
              <FilterChip key={weapon} active={weapon === selectedWeapon} label={weapon}
                onClick={() => setSelectedWeapon(weapon === selectedWeapon ? null : weapon)} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <p className="atlas-result-count" role="status">
          <strong>{filtered.length}</strong>
          {hasFilters && <> / {initialCharacters.length}</>}
          {' '}{locale === 'en' ? 'characters' : 'nhân vật'}
        </p>
        {hasFilters && (
          <button type="button" onClick={clearAll} className="atlas-filter-chip">
            <X size={15} aria-hidden="true" />{locale === 'en' ? 'Clear filters' : 'Xóa bộ lọc'}
          </button>
        )}
      </div>

      {/* ── Character Grid ── */}
      {filtered.length > 0 ? (
        <div className="pb-20">
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5"
          >
            {filtered.slice(0, visibleCount).map((char) => (
              <CharacterCard key={char.id} character={char} variant="collection" />
            ))}
          </div>
          {visibleCount < filtered.length && (
            <div ref={loaderRef} className="w-full h-20 flex items-center justify-center mt-8">
              <div className="atlas-loader animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-24 rounded-xl"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}
        >
          <div className="mb-4 grid h-12 w-12 place-items-center rounded-full" style={{ border: '1px solid var(--border-default)', color: 'var(--text-tertiary)' }}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
              <path d="m16 16 4 4" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {locale === 'en' ? 'No characters match your filters.' : 'Không tìm thấy nhân vật phù hợp.'}
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 min-h-11 rounded-md px-3 text-xs font-bold underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--atlas-focus)]"
            style={{ color: 'var(--accent-primary-light)' }}
          >
            {locale === 'en' ? 'Clear filters' : 'Xóa bộ lọc'}
          </button>
        </div>
      )}
    </div>
  );
}

function FilterChip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className="atlas-filter-chip">
      <Check size={15} aria-hidden="true" />{label}
    </button>
  );
}
