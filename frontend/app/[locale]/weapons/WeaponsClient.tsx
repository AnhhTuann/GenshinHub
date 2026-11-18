'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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

export default function WeaponsClient({ weapons }: { weapons: Weapon[] }) {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedRarities, setSelectedRarities] = useState<number[]>([5, 4, 3]);
  const [sortBy, setSortBy] = useState<'rarity' | 'name' | 'atk'>('rarity');
  const [sortAsc, setSortAsc] = useState(false);
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

  const rarityCfg = (r: number) => {
    if (r === 5) return { ring: 'from-[#ffd34d] via-[#f0b64a] to-[#d99a2b]', glow: 'rgba(245,158,11,', text: '#ffd34d', border: 'rgba(245,158,11,0.25)', bg: 'rgba(245,158,11,0.12)', stars: '#ffd34d' };
    if (r === 4) return { ring: 'from-[#e2c88f] via-[#a77cf6] to-[#8e97a8]', glow: 'rgba(168,85,247,', text: '#e2c88f', border: 'rgba(168,85,247,0.25)', bg: 'rgba(168,85,247,0.12)', stars: '#e2c88f' };
    if (r === 3) return { ring: 'from-[#8e97a8] via-[#c9a86a] to-[#8e97a8]', glow: 'rgba(201,168,106,', text: '#e2c88f', border: 'rgba(201,168,106,0.25)', bg: 'rgba(201,168,106,0.12)', stars: '#e2c88f' };
    if (r === 2) return { ring: 'from-[#86a98f] via-[#86a98f] to-[#6f8f6a]', glow: 'rgba(34,197,94,',  text: '#86a98f', border: 'rgba(34,197,94,0.25)',  bg: 'rgba(34,197,94,0.12)',  stars: '#86a98f' };
    return       { ring: 'from-gray-400 via-gray-500 to-gray-600',       glow: 'rgba(156,163,175,', text: '#8e97a8', border: 'rgba(156,163,175,0.25)', bg: 'rgba(156,163,175,0.12)', stars: '#8e97a8' };
  };

  return (
    <section className="weapon-catalog pb-12">
      {isAdmin && (
        <div className="max-w-7xl mx-auto px-6 pb-3 flex justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            Add New Weapon
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="catalog-filter-panel bg-white border border-slate-200 rounded-2xl p-5 sticky top-24 flex flex-col gap-6 shadow-sm">
            {/* Search */}
            <div>
              <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 block font-display">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-550" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                  type="text"
                  placeholder="Weapon name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-9 pr-3 py-2.5 rounded-xl outline-none text-xs font-medium transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Weapon Type Filter */}
            <div>
              <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 block font-display">Weapon Type</label>
              <div className="flex flex-col gap-1.5">
                {WEAPON_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      selectedType === type
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Rarity Filter */}
            <div>
              <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 block font-display">Rarity</label>
              <div className="flex flex-col gap-1.5">
                {RARITIES.map(r => (
                  <button
                    key={r}
                    onClick={() => toggleRarity(r)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-all border ${
                      selectedRarities.includes(r)
                        ? r === 5 ? 'bg-amber-500/10 text-amber-450 border-amber-500/20'
                          : r === 4 ? 'bg-purple-500/10 text-purple-450 border-purple-500/20'
                          : r === 3 ? 'bg-blue-500/10 text-blue-450 border-blue-500/20'
                          : 'bg-gray-500/10 text-gray-300 border-gray-500/20'
                        : 'text-gray-500 hover:text-white hover:bg-white/5 border-transparent'
                    }`}
                  >
                    <span className={r === 5 ? 'text-yellow-400' : r === 4 ? 'text-purple-400' : r === 3 ? 'text-blue-400' : 'text-gray-405'}>
                      {'★'.repeat(r)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 block font-display">Sort By</label>
              <div className="flex flex-col gap-1.5">
                {[
                  { key: 'rarity', label: 'Rarity' },
                  { key: 'atk', label: 'Base ATK' },
                  { key: 'name', label: 'Name A-Z' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => {
                      if (sortBy === opt.key) setSortAsc(!sortAsc);
                      else { setSortBy(opt.key as typeof sortBy); setSortAsc(false); }
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                      sortBy === opt.key
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border-transparent'
                    }`}
                  >
                    {opt.label}
                    {sortBy === opt.key && <span className="text-emerald-700 font-extrabold">{sortAsc ? '↑' : '↓'}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="pt-4 border-t border-slate-200">
              <p className="text-slate-600 text-[10px] font-semibold">Showing <span className="text-slate-900 font-extrabold">{filtered.length}</span> / {weapons.length} weapons</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-600 bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold">No weapons matched your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
              {filtered.slice(0, visibleCount).map(weapon => {
                const cfg = rarityCfg(weapon.rarity);
                const name = locale === 'en' ? weapon.nameEn : weapon.nameVi;
                return (
                  <Link
                    key={weapon.id}
                    href={`/weapons/${weapon.id}`}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1"
                    style={{
                      background: 'linear-gradient(155deg, #ffffff 0%, #f3f8f9 100%)',
                      border: `1px solid ${cfg.border}`,
                      boxShadow: '0 8px 24px rgba(23,43,58,0.07)',
                    }}
                  >
                    {/* Hover border glow */}
                    <div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ boxShadow: `inset 0 0 0 1.5px ${cfg.glow}0.5)` }}
                    />
                    
                    {/* Top sheen */}
                    <div
                      className="absolute inset-x-0 top-0 h-px pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(90deg, transparent, ${cfg.glow}0.8), transparent)` }}
                    />

                    {/* Image wrapper */}
                    <div className="relative w-full aspect-[4/5] p-[1.5px]">
                      <div
                        className="w-full h-full rounded-[22px] overflow-hidden flex items-center justify-center relative"
                        style={{ background: `linear-gradient(to top, ${cfg.bg} 0%, #eaf1f3 100%)` }}
                      >
                        {/* Glow dot behind weapon */}
                        <div
                          className="absolute w-2/3 h-2/3 rounded-full pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity"
                          style={{ background: `radial-gradient(circle, ${cfg.glow}0.2), transparent 60%)`, filter: 'blur(20px)' }}
                        />
                        
                        {weapon.iconUrl ? (
                          <FallbackImage
                            src={weapon.iconUrl}
                            alt={name}
                            fill
                            className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                          />
                        ) : (
                          <div className="text-sm font-bold uppercase tracking-wider text-slate-400">{weapon.type}</div>
                        )}
                        
                        {/* Weapon type pill */}
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-md backdrop-blur-md bg-[#172b3a]/80 border border-white/10 flex items-center">
                          <span className="text-[9px] font-bold uppercase text-white/90 tracking-wide">{weapon.type}</span>
                        </div>
                        
                        {/* Base ATK badge */}
                        <div                         className="absolute top-2 right-2 px-1.5 py-1 rounded-md backdrop-blur-md bg-[#172b3a]/80 border border-white/10 text-[9px] font-bold text-white/90 tracking-wide">
                          ATK {weapon.baseAtk}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="relative z-10 p-4 flex flex-col items-center border-t border-slate-200">
                      {/* Name */}
                      <p
                        className="text-[13px] sm:text-[15px] font-extrabold text-center leading-snug truncate transition-colors w-full tracking-wide px-2"
                        style={{
                          color: '#172b3a',
                        }}
                      >
                        {name}
                      </p>

                      {/* Stars */}
                      <div className="flex justify-center gap-[2px] mt-2">
                        {Array.from({ length: weapon.rarity }).map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5" style={{ color: cfg.stars, filter: `drop-shadow(0 0 4px ${cfg.glow}0.8))` }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      
                      {/* Substat hint */}
                      {weapon.subStat && (
                        <div className="mt-2 text-[9px] font-bold text-slate-600 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                          {weapon.subStat}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          
          {/* Infinite Scroll Loader */}
          {visibleCount < filtered.length && (
            <div ref={loaderRef} className="w-full h-20 flex items-center justify-center mt-8">
              <div className="w-6 h-6 border-2 border-emerald-700/25 border-t-emerald-700 rounded-full animate-spin"></div>
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
