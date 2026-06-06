'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Weapon {
  id: string;
  name: string;
  rarity: number;
  type: string;
  baseAtk: number;
  subStat: string | null;
  subStatValue: number | null;
  passiveName: string | null;
  passiveDesc: string | null;
  iconUrl: string | null;
}

const WEAPON_TYPES = ['All', 'Sword', 'Claymore', 'Polearm', 'Bow', 'Catalyst'];
// DB may store types in Vietnamese or English - map both
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
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon | null>(null);

  const toggleRarity = (r: number) => {
    setSelectedRarities(prev =>
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    );
  };

  const filtered = useMemo(() => {
    let result = weapons.filter(w => {
      const matchSearch = w.name.toLowerCase().includes(search.toLowerCase());
      const matchType = selectedType === 'All' || (WEAPON_TYPE_DB[selectedType]?.includes(w.type) ?? w.type === selectedType);
      const matchRarity = selectedRarities.includes(w.rarity);
      return matchSearch && matchType && matchRarity;
    });
    result.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'rarity') cmp = b.rarity - a.rarity;
      else if (sortBy === 'atk') cmp = b.baseAtk - a.baseAtk;
      else if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      return sortAsc ? -cmp : cmp;
    });
    return result;
  }, [weapons, search, selectedType, selectedRarities, sortBy, sortAsc]);

  const rarityColor = (rarity: number) => {
    if (rarity === 5) return 'from-[#a57c00]/60 to-[#5c3d00]/40 border-yellow-500/40';
    if (rarity === 4) return 'from-[#4a2a6e]/60 to-[#1e0a3a]/40 border-purple-500/40';
    if (rarity === 3) return 'from-[#1a3a5c]/60 to-[#0a1f38]/40 border-blue-500/40';
    if (rarity === 2) return 'from-[#1a3a2a]/60 to-[#0a1f12]/40 border-green-500/40';
    return 'from-[#3a3a3a]/60 to-[#1a1a1a]/40 border-gray-500/40';
  };

  const starColor = (rarity: number) => {
    if (rarity === 5) return 'text-yellow-400';
    if (rarity === 4) return 'text-purple-400';
    if (rarity === 3) return 'text-blue-400';
    return 'text-gray-400';
  };

  const rarityBg = (rarity: number) => {
    if (rarity === 5) return 'from-[#FFE082] via-[#FFB300] to-[#E65100]';
    if (rarity === 4) return 'from-[#CE93D8] via-[#9C27B0] to-[#6A1B9A]';
    if (rarity === 3) return 'from-[#90CAF9] via-[#1976D2] to-[#0D47A1]';
    return 'from-gray-400 via-gray-600 to-gray-800';
  };

  return (
    <main className="min-h-screen bg-[#0b0b0e] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium w-fit mb-6" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Home
        </Link>
        <h1 className="text-4xl font-black text-white mb-1">⚔️ Weapons</h1>
        <p className="text-gray-400 text-sm">Explore all {weapons.length} weapons in Genshin Impact</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-5 sticky top-6 flex flex-col gap-5">
            {/* Search */}
            <div>
              <label className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 block">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                  type="text"
                  placeholder="Weapon name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-[#0b0b0e] border border-gray-700/60 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-colors"
                />
              </div>
            </div>

            {/* Weapon Type Filter */}
            <div>
              <label className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 block">Weapon Type</label>
              <div className="flex flex-col gap-1.5">
                {WEAPON_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedType === type
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                    }`}
                  >
                    {type !== 'All' && <span className="mr-2">{WEAPON_TYPE_ICONS[type]}</span>}
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Rarity Filter */}
            <div>
              <label className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 block">Rarity</label>
              <div className="flex flex-col gap-1.5">
                {RARITIES.map(r => (
                  <button
                    key={r}
                    onClick={() => toggleRarity(r)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedRarities.includes(r)
                        ? r === 5 ? 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/30'
                          : r === 4 ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                          : r === 3 ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          : 'bg-gray-500/15 text-gray-300 border border-gray-500/30'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/50'
                    }`}
                  >
                    <span className={r === 5 ? 'text-yellow-400' : r === 4 ? 'text-purple-400' : r === 3 ? 'text-blue-400' : 'text-gray-400'}>
                      {'★'.repeat(r)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-2 block">Sort By</label>
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
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      sortBy === opt.key
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                    }`}
                  >
                    {opt.label}
                    {sortBy === opt.key && <span>{sortAsc ? '↑' : '↓'}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="pt-3 border-t border-gray-800/50">
              <p className="text-gray-500 text-xs">Showing <span className="text-gray-300 font-bold">{filtered.length}</span> / {weapons.length} weapons</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No weapons found
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-7 gap-3">
              {filtered.map(weapon => (
                <button
                  key={weapon.id}
                  onClick={() => setSelectedWeapon(weapon)}
                  className={`group relative bg-gradient-to-b ${rarityColor(weapon.rarity)} border rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-black/50 hover:border-white/30 text-left`}
                >
                  {/* Image */}
                  <div className={`relative w-full aspect-square bg-gradient-to-br ${rarityBg(weapon.rarity)} p-[2px]`}>
                    <div className="w-full h-full bg-[#1a1a2e]/80 flex items-center justify-center overflow-hidden">
                      {weapon.iconUrl ? (
                        <Image
                          src={weapon.iconUrl}
                          alt={weapon.name}
                          fill
                          className="object-contain p-1"
                        />
                      ) : (
                        <div className="text-3xl">{WEAPON_TYPE_ICONS[weapon.type] || '⚔️'}</div>
                      )}
                    </div>
                  </div>

                  {/* Stars */}
                  <div className={`flex justify-center text-[9px] py-0.5 ${starColor(weapon.rarity)}`}>
                    {'★'.repeat(weapon.rarity)}
                  </div>

                  {/* Name */}
                  <div className="px-1.5 pb-2">
                    <p className="text-[10px] text-gray-200 font-semibold text-center leading-tight line-clamp-2 group-hover:text-white transition-colors">
                      {weapon.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Weapon Detail Modal */}
      {selectedWeapon && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedWeapon(null)}
        >
          <div
            className={`bg-[#15151a] border rounded-2xl p-6 max-w-md w-full shadow-2xl bg-gradient-to-br ${rarityColor(selectedWeapon.rarity)}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex gap-4 mb-4">
              {/* Weapon Image */}
              <div className={`relative w-24 h-24 flex-shrink-0 rounded-xl bg-gradient-to-br ${rarityBg(selectedWeapon.rarity)} p-[2px] shadow-lg`}>
                <div className="w-full h-full bg-[#0b0b0e]/80 rounded-xl flex items-center justify-center overflow-hidden">
                  {selectedWeapon.iconUrl ? (
                    <Image
                      src={selectedWeapon.iconUrl}
                      alt={selectedWeapon.name}
                      fill
                      className="object-contain p-1"
                    />
                  ) : (
                    <div className="text-4xl">{WEAPON_TYPE_ICONS[selectedWeapon.type] || '⚔️'}</div>
                  )}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-black text-white leading-tight mb-1">{selectedWeapon.name}</h2>
                <p className={`text-xs font-bold mb-1 ${starColor(selectedWeapon.rarity)}`}>{'★'.repeat(selectedWeapon.rarity)}</p>
                <p className="text-gray-400 text-xs">{selectedWeapon.type}</p>
              </div>

              <button
                onClick={() => setSelectedWeapon(null)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#0b0b0e]/60 border border-gray-800/40 rounded-xl p-3">
                <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Base ATK</p>
                <p className="text-red-400 font-black text-xl">{selectedWeapon.baseAtk}</p>
              </div>
              {selectedWeapon.subStat && (
                <div className="bg-[#0b0b0e]/60 border border-gray-800/40 rounded-xl p-3">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">{selectedWeapon.subStat}</p>
                  <p className="text-blue-400 font-black text-xl">
                    {selectedWeapon.subStatValue !== null
                      ? `${selectedWeapon.subStatValue}${
                          selectedWeapon.subStat?.includes('%') ||
                          selectedWeapon.subStat?.includes('Mastery') ||
                          selectedWeapon.subStat?.includes('Recharge') ||
                          selectedWeapon.subStat?.includes('Bonus') ||
                          selectedWeapon.subStat?.includes('Rate') ||
                          selectedWeapon.subStat?.includes('DMG')
                          ? '%' : ''}`
                      : '—'}
                  </p>
                </div>
              )}
            </div>

            {/* Passive */}
            {selectedWeapon.passiveName && (
              <div className="bg-[#0b0b0e]/60 border border-gray-800/40 rounded-xl p-4">
                <p className="text-yellow-400 font-bold text-sm mb-2">⚡ {selectedWeapon.passiveName}</p>
                {selectedWeapon.passiveDesc && (
                  <p
                    className="text-gray-300 text-xs leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: selectedWeapon.passiveDesc
                        .replace(/<color=#99FFFFFF>/g, '<span style="color:#80DEEA">')
                        .replace(/<\/color>/g, '</span>')
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
