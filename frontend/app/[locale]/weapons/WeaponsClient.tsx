'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import RarityStars from '@/components/ui/RarityStars';
import { ArrowDown, ArrowUp, ArrowUpRight, Check, ChevronDown, RotateCcw, SlidersHorizontal, Sword } from 'lucide-react';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useAdmin } from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';
import { useDebounce } from '@/hooks/useDebounce';

const WeaponFormModal = dynamic(() => import('@/components/admin/WeaponFormModal'), { ssr: false });

interface Weapon {
  id: string;
  nameEn: string;
  nameVi: string;
  rarity: number;
  type: string;
  baseAtk: number;
  subStat: string | null;
  subStatValue: number | null;
  passiveNameEn: string | null;
  passiveNameVi: string | null;
  passiveDescEn: string | null;
  passiveDescVi: string | null;
  iconUrl: string | null;
}

const WEAPON_TYPES = ['All', 'Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
const WEAPON_TYPE_DB: Record<string, string[]> = {
  'Sword': ['Kiếm Đơn', 'Sword'],
  'Claymore': ['Trọng Kiếm', 'Claymore'],
  'Polearm': ['Vũ Khí Cán Dài', 'Polearm'],
  'Bow': ['Cung', 'Bow'],
  'Catalyst': ['Pháp Khí', 'Catalyst'],
};
const RARITIES = [5, 4, 3, 2, 1];
const DEFAULT_RARITIES = [5, 4, 3];

export default function WeaponsClient({ weapons }: { weapons: Weapon[] }) {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRarities, setSelectedRarities] = useState<number[]>([...DEFAULT_RARITIES]);
  const [sortBy, setSortBy] = useState<'rarity' | 'name' | 'atk'>('rarity');
  const [sortAsc, setSortAsc] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const locale = useLocale();
  const { isAdmin } = useAdmin();

  const debouncedSearch = useDebounce(search, 200);
  const [visibleCount, setVisibleCount] = useState(24);
  const loaderRef = useRef<HTMLDivElement>(null);

  const toggleRarity = (r: number) => {
    setSelectedRarities(prev =>
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    );
  };

  const resetFilters = () => {
    setSearch('');
    setSelectedType('All');
    setSelectedRarities([...DEFAULT_RARITIES]);
    setSortBy('rarity');
    setSortAsc(false);
  };

  const filtered = useMemo(() => {
    let result = weapons.filter(w => {
      const name = locale === 'en' ? w.nameEn : w.nameVi;
      const matchSearch = name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchType = selectedType === 'All' || (WEAPON_TYPE_DB[selectedType]?.includes(w.type) ?? w.type === selectedType);
      const matchRarity = selectedRarities.includes(w.rarity);
      return matchSearch && matchType && matchRarity;
    });
    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'rarity') cmp = b.rarity - a.rarity;
      else if (sortBy === 'atk') cmp = b.baseAtk - a.baseAtk;
      else if (sortBy === 'name') {
        const nameA = locale === 'en' ? a.nameEn : a.nameVi;
        const nameB = locale === 'en' ? b.nameEn : b.nameVi;
        cmp = nameA.localeCompare(nameB);
      }
      return sortAsc ? -cmp : cmp;
    });
    return result;
  }, [weapons, debouncedSearch, selectedType, selectedRarities, sortBy, sortAsc, locale]);

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(24);
  }, [filtered]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 24, filtered.length));
      }
    }, { rootMargin: '400px' });
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [filtered.length]);

  return (
    <section className="weapon-catalog pb-12">
      {isAdmin && (
        <div className="max-w-7xl mx-auto px-6 pb-3 flex justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="atlas-add-action"
          >
            Add New Weapon
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="wf-sidebar">
          <button
            type="button"
            className="wf-mobile-toggle"
            onClick={() => setFiltersOpen(open => !open)}
            aria-expanded={filtersOpen}
            aria-controls="weapon-filters"
          >
            <span className="wf-mobile-toggle-label">
              <SlidersHorizontal size={16} aria-hidden="true" />
              Filters
            </span>
            <span className="wf-mobile-toggle-meta">
              {filtered.length} results
              <ChevronDown size={16} className={filtersOpen ? 'is-open' : ''} aria-hidden="true" />
            </span>
          </button>

          <div id="weapon-filters" className={`wf-panel${filtersOpen ? ' is-open' : ''}`}>
            <div className="wf-panel-head">
              <h2 className="wf-panel-title">Filters</h2>
              <button type="button" className="wf-reset" onClick={resetFilters}>
                <RotateCcw size={12} aria-hidden="true" />
                Reset
              </button>
            </div>

            {/* Search */}
            <div className="wf-section">
              <label className="wf-label" htmlFor="weapon-search">Search</label>
              <div className="wf-search">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                  id="weapon-search"
                  type="text"
                  placeholder="Weapon name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Weapon Type Filter */}
            <div className="wf-section">
              <span className="wf-label" id="wf-type-label">Weapon Type</span>
              <div className="wf-types" role="group" aria-labelledby="wf-type-label">
                {WEAPON_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={selectedType === type}
                    onClick={() => setSelectedType(type)}
                    className="wf-type"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Rarity Filter */}
            <div className="wf-section">
              <span className="wf-label" id="wf-rarity-label">Rarity</span>
              <div className="wf-rarities" role="group" aria-labelledby="wf-rarity-label">
                {RARITIES.map(r => (
                  <button
                    key={r}
                    type="button"
                    aria-pressed={selectedRarities.includes(r)}
                    onClick={() => toggleRarity(r)}
                    className="wf-rarity"
                  >
                    <span className="wf-rarity-box" aria-hidden="true">
                      {selectedRarities.includes(r) && <Check size={11} strokeWidth={3} />}
                    </span>
                    <span className="wf-rarity-text">
                      {r}<span className="wf-rarity-star" aria-hidden="true">★</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="wf-section">
              <label className="wf-label" htmlFor="wf-sort">Sort By</label>
              <div className="wf-sort">
                <div className="wf-select">
                  <select
                    id="wf-sort"
                    value={sortBy}
                    onChange={e => { setSortBy(e.target.value as typeof sortBy); setSortAsc(false); }}
                  >
                    <option value="rarity">Rarity</option>
                    <option value="atk">Base ATK</option>
                    <option value="name">Name A-Z</option>
                  </select>
                  <ChevronDown size={15} className="wf-select-chevron" aria-hidden="true" />
                </div>
                <button
                  type="button"
                  className="wf-sort-dir"
                  onClick={() => setSortAsc(asc => !asc)}
                  aria-pressed={sortAsc}
                  aria-label={sortAsc ? 'Sorting ascending — switch to descending' : 'Sorting descending — switch to ascending'}
                  title={sortAsc ? 'Ascending' : 'Descending'}
                >
                  {sortAsc ? <ArrowUp size={16} aria-hidden="true" /> : <ArrowDown size={16} aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Stats */}
            <p className="wf-count" role="status">
              Showing <strong>{filtered.length}</strong> of <strong>{weapons.length}</strong> weapons
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-64 atlas-surface p-6 text-center">
              <Sword size={28} className="mb-3 text-[var(--accent-primary-light)]" aria-hidden="true" />
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {locale === 'vi' ? 'Không tìm thấy vũ khí phù hợp.' : 'No weapons matched your filters.'}
              </p>
              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                {locale === 'vi' ? 'Thử đổi loại, độ hiếm hoặc từ khóa.' : 'Try a different type, rarity, or search term.'}
              </p>
            </div>
          ) : (
            <div className="atlas-weapon-grid">
              {filtered.slice(0, visibleCount).map(weapon => {
                const name = locale === 'en' ? weapon.nameEn : weapon.nameVi || weapon.nameEn;
                const type = Object.entries(WEAPON_TYPE_DB).find(([, labels]) => labels.includes(weapon.type));
                const typeLabel = type ? (locale === 'en' ? type[0] : type[1][0]) : weapon.type;
                return (
                  <Link key={weapon.id} href={`/weapons/${weapon.id}`}
                    className="fantasy-collection-card fantasy-weapon-card atlas-artifact-card atlas-surface"
                    data-rarity={weapon.rarity}>
                    <div className="atlas-relic-art atlas-weapon-art" data-rarity={weapon.rarity}>
                      {weapon.iconUrl
                        ? <FallbackImage src={weapon.iconUrl} alt="" fill sizes="(max-width: 639px) 45vw, 280px" />
                        : <Sword size={44} aria-hidden="true" />}
                    </div>
                    <div className="atlas-relic-caption">
                      <div className="atlas-weapon-copy">
                        <div className="atlas-weapon-heading">
                          <h2 className="atlas-weapon-name">{name}</h2>
                          <ArrowUpRight className="atlas-weapon-arrow" size={15} aria-hidden="true" />
                        </div>
                        <RarityStars rarity={weapon.rarity} locale={locale} />
                        <dl className="atlas-weapon-facts">
                          <div><dt>{locale === 'vi' ? 'Loại' : 'Type'}</dt><dd>{typeLabel}</dd></div>
                          <div><dt>{locale === 'vi' ? 'ATK gốc' : 'Base ATK'}</dt><dd>{weapon.baseAtk}</dd></div>
                        </dl>
                        {weapon.subStat && (
                          <div className="atlas-weapon-substat">
                            <span className="atlas-weapon-substat-label">{locale === 'vi' ? 'Chỉ số phụ' : 'Sub Stat'}</span>
                            <span className="atlas-weapon-substat-value">{weapon.subStat}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
          {/* Infinite Scroll Loader */}
          {visibleCount < filtered.length && (
            <div ref={loaderRef} className="w-full h-20 flex items-center justify-center mt-8" role="status" aria-label={locale === 'vi' ? 'Đang tải thêm' : 'Loading more weapons'}>
              <div className="atlas-loader animate-spin" />
            </div>
          )}
        </div>
      </div>
      {/* Admin Add Modal */}
      {showAddModal && (
        <WeaponFormModal
          onClose={() => setShowAddModal(false)}
          onSaved={() => window.location.reload()}
        />
      )}
    </section>
  );
}
