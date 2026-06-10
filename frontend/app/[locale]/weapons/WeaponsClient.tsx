'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

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
  const locale = useLocale();
  const t = useTranslations('Common');

  const toggleRarity = (r: number) => {
    setSelectedRarities(prev =>
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    );
  };

  const filtered = useMemo(() => {
    let result = weapons.filter(w => {
      const name = locale === 'en' ? w.nameEn : w.nameVi;
      const matchSearch = name.toLowerCase().includes(search.toLowerCase());
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
  }, [weapons, search, selectedType, selectedRarities, sortBy, sortAsc, locale]);

  const rarityBgColor = (rarity: number) => {
    if (rarity === 5) return 'from-[#a57c00]/30 to-[#5c3d00]/15 border-yellow-500/25 hover:border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.05)]';
    if (rarity === 4) return 'from-[#4a2a6e]/30 to-[#1e0a3a]/15 border-purple-500/25 hover:border-purple-500/50';
    if (rarity === 3) return 'from-[#1a3a5c]/30 to-[#0a1f38]/15 border-blue-500/25 hover:border-blue-500/50';
    if (rarity === 2) return 'from-[#1a3a2a]/30 to-[#0a1f12]/15 border-green-500/25 hover:border-green-500/50';
    return 'from-[#2a2a2a]/30 to-[#101010]/15 border-gray-700/25 hover:border-gray-500/50';
  };

  const starColor = (rarity: number) => {
    if (rarity === 5) return 'text-yellow-400';
    if (rarity === 4) return 'text-purple-400';
    if (rarity === 3) return 'text-blue-400';
    return 'text-gray-400';
  };

  const rarityGradient = (rarity: number) => {
    if (rarity === 5) return 'from-[#FFE082] via-[#FFB300] to-[#E65100]';
    if (rarity === 4) return 'from-[#CE93D8] via-[#9C27B0] to-[#6A1B9A]';
    if (rarity === 3) return 'from-[#90CAF9] via-[#1976D2] to-[#0D47A1]';
    return 'from-gray-400 via-gray-650 to-gray-800';
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-wider w-fit mb-6" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Home
        </Link>
        <h1 className="text-4xl font-black text-white mb-1 font-display uppercase tracking-tight">⚔️ Weapons</h1>
        <p className="text-gray-450 text-sm font-medium">Explore all {weapons.length} weapons in Genshin Impact</p>
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
                  className="w-full bg-[#050508] border border-gray-950 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-200 placeholder-gray-650 focus:outline-none focus:border-yellow-500/40 focus:ring-1 focus:ring-yellow-500/20 transition-all font-medium"
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
                    className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                      selectedType === type
                        ? 'bg-yellow-500/10 text-yellow-450 border-yellow-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'
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
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filtered.map(weapon => (
                <Link
                  key={weapon.id}
                  href={`/weapons/${weapon.id}`}
                  className={`group relative bg-gradient-to-b ${rarityBgColor(weapon.rarity)} border rounded-2xl overflow-hidden transition-all duration-300 hover:scale-102 hover:shadow-xl hover:shadow-black/40 text-left flex flex-col justify-between`}
                >
                  {/* Image wrapper */}
                  <div className={`relative w-full aspect-square bg-gradient-to-br ${rarityGradient(weapon.rarity)} p-[1px]`}>
                    <div className="w-full h-full bg-[#07070a]/90 flex items-center justify-center overflow-hidden p-1.5">
                      {weapon.iconUrl ? (
                        <Image
                          src={weapon.iconUrl}
                          alt={locale === 'en' ? weapon.nameEn : weapon.nameVi}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-350"
                        />
                      ) : (
                        <div className="text-3xl select-none">{WEAPON_TYPE_ICONS[weapon.type] || '⚔️'}</div>
                      )}
                    </div>
                  </div>

                  {/* Stars rating & info */}
                  <div className="p-2.5 bg-black/45 backdrop-blur-[1px] border-t border-white/5 flex flex-col items-center">
                    <div className={`flex justify-center text-[9px] mb-1 leading-none ${starColor(weapon.rarity)}`}>
                      {'★'.repeat(weapon.rarity)}
                    </div>
                    <p className="text-[10px] text-gray-250 font-bold text-center leading-snug line-clamp-2 group-hover:text-white transition-colors max-w-full font-display">
                      {locale === 'en' ? weapon.nameEn : weapon.nameVi}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
