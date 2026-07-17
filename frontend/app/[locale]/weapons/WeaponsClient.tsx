'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
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
const WEAPON_TYPE_ICONS: Record<string, string> = {
  'Sword': '⚔️',
  'Claymore': '🗡️',
  'Polearm': '🔱',
  'Bow': '🏹',
  'Catalyst': '📖',
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
  const t = useTranslations('Common');
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
    if (r === 5) return { ring: 'from-[#ffd54f] via-[#f59e0b] to-[#d97706]', glow: 'rgba(245,158,11,', text: '#ffd54f', border: 'rgba(245,158,11,0.25)', bg: 'rgba(245,158,11,0.12)', stars: '#ffd54f' };
    if (r === 4) return { ring: 'from-[#c084fc] via-[#a855f7] to-[#7c3aed]', glow: 'rgba(168,85,247,', text: '#c084fc', border: 'rgba(168,85,247,0.25)', bg: 'rgba(168,85,247,0.12)', stars: '#c084fc' };
    if (r === 3) return { ring: 'from-[#60a5fa] via-[#3b82f6] to-[#1d4ed8]', glow: 'rgba(59,130,246,', text: '#93c5fd', border: 'rgba(59,130,246,0.25)', bg: 'rgba(59,130,246,0.12)', stars: '#93c5fd' };
    if (r === 2) return { ring: 'from-[#4ade80] via-[#22c55e] to-[#15803d]', glow: 'rgba(34,197,94,',  text: '#86efac', border: 'rgba(34,197,94,0.25)',  bg: 'rgba(34,197,94,0.12)',  stars: '#86efac' };
    return       { ring: 'from-gray-400 via-gray-500 to-gray-600',       glow: 'rgba(156,163,175,', text: '#9ca3af', border: 'rgba(156,163,175,0.25)', bg: 'rgba(156,163,175,0.12)', stars: '#9ca3af' };
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30 relative overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-[600px] h-[500px] blur-[130px] rounded-full" style={{ background: 'rgba(168,85,247,0.07)' }} />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] blur-[100px] rounded-full" style={{ background: 'rgba(34,211,238,0.05)' }} />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-wider w-fit mb-6" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Home
        </Link>
        <h1 className="text-4xl font-black text-white mb-1 font-display uppercase tracking-tight">⚔️ {t('weapons')}</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-450 text-sm font-medium">{locale === 'vi' ? `Khám phá toàn bộ ${weapons.length} vũ khí` : `Explore all ${weapons.length} weapons in Genshin Impact`}</p>
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
            >
              ➕ Add New Weapon
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-[#0d0d12]/75 border border-gray-900 rounded-2xl p-5 sticky top-20 flex flex-col gap-6 shadow-xl backdrop-blur-md">
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
                  className="w-full bg-[#0d0d14]/80 border border-white/[0.08] text-white/90 pl-9 pr-3 py-2.5 rounded-xl outline-none text-xs font-medium transition-all placeholder:text-white/30 backdrop-blur-md"
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(200,168,75,0.4)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(200,168,75,0.1)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.target.style.boxShadow = 'none';
                  }}
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
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/35 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border-white/5'
                    }`}
                  >
                    {type !== 'All' && <span className="mr-2 select-none">{WEAPON_TYPE_ICONS[type]}</span>}
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
                        ? 'bg-yellow-500/10 text-yellow-455 border-yellow-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'
                    }`}
                  >
                    {opt.label}
                    {sortBy === opt.key && <span className="text-yellow-500 font-extrabold">{sortAsc ? '↑' : '↓'}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="pt-4 border-t border-gray-950">
              <p className="text-gray-550 text-[10px] font-bold">Showing <span className="text-white font-extrabold">{filtered.length}</span> / {weapons.length} weapons</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-[#0d0d12]/30 rounded-2xl border border-gray-900/60 shadow-inner">
              <span className="text-4xl mb-3">👻</span>
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
                      background: `linear-gradient(145deg, rgba(12,12,24,0.95) 0%, rgba(5,5,12,0.98) 100%)`,
                      border: `1px solid ${cfg.border}`,
                      boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
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
                        style={{ background: `linear-gradient(to top, ${cfg.bg} 0%, rgba(5,5,12,0.9) 100%)` }}
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
                          <div className="text-4xl select-none opacity-30">{WEAPON_TYPE_ICONS[weapon.type] || '⚔️'}</div>
                        )}
                        
                        {/* Weapon type pill */}
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-md backdrop-blur-md bg-black/40 border border-white/10 flex items-center gap-1.5">
                          <span className="text-[10px] leading-none">{WEAPON_TYPE_ICONS[weapon.type]}</span>
                          <span className="text-[8px] font-black uppercase text-white/50 tracking-wider hidden xs:block">{weapon.type}</span>
                        </div>
                        
                        {/* Base ATK badge */}
                        <div className="absolute top-2 right-2 px-1.5 py-1 rounded-md backdrop-blur-md bg-black/40 border border-white/10 text-[9px] font-black text-white/70 tracking-widest">
                          ATK {weapon.baseAtk}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="relative z-10 p-4 flex flex-col items-center border-t border-white/5">
                      {/* Name */}
                      <p
                        className="text-[13px] sm:text-[15px] font-extrabold text-center leading-snug truncate transition-colors w-full tracking-wide px-2"
                        style={{
                          color: '#fff',
                          textShadow: `0 0 16px ${cfg.glow}0.6)`,
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
                        <div className="mt-2 text-[9px] font-bold text-white/40 uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
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
              <div className="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
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
    </main>
  );
}
