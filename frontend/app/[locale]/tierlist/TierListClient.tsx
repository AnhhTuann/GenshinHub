"use client";

import { useState, useMemo } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Role } from '@/data/tierlist';
import { motion, AnimatePresence, Variants } from 'framer-motion';

type TierRank = {
  id: string;
  name: string;
  order: number;
  colorBase: string;
};

type TierCharacter = { id: string, nameEn: string, nameVi: string, avatarUrl: string, rarity: number, element: string, tier: string | null, role: string | null, recommendedC: string | null, tierNoteEn: string[], tierNoteVi: string[] };
type TierWeapon    = { id: string, nameEn: string, nameVi: string, iconUrl: string | null, rarity: number, type: string, tier: string | null, role: string | null };

const getImageUrl = (url: string | null) => {
  return url;
};

const ELEMENT_COLORS: Record<string, string> = {
  Pyro: 'bg-[#ff6b4a]', Hydro: 'bg-[#4fc3f7]', Cryo: 'bg-[#80deea]', Electro: 'bg-[#ce93d8]', Anemo: 'bg-[#4db6ac]', Geo: 'bg-[#ffd54f]', Dendro: 'bg-[#aed581]'
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

// ────────────────────────────────────────────────────────────────────────
// Dynamic Tier Styles
// ────────────────────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, { badge: string, rowGlow: string }> = {
  amber: {
    badge: 'bg-gradient-to-br from-amber-500 to-orange-600 text-black border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.4)]',
    rowGlow: 'group-hover:bg-amber-500/[0.03] border-amber-500/20'
  },
  red: {
    badge: 'bg-gradient-to-br from-red-500 to-rose-600 text-white border-red-400 shadow-[0_0_30px_rgba(239,68,68,0.3)]',
    rowGlow: 'group-hover:bg-red-500/[0.02] border-red-500/20'
  },
  blue: {
    badge: 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]',
    rowGlow: 'group-hover:bg-blue-500/[0.02] border-blue-500/20'
  },
  gray: {
    badge: 'bg-gradient-to-br from-gray-500 to-slate-600 text-white border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.2)]',
    rowGlow: 'group-hover:bg-gray-500/[0.02] border-gray-500/20'
  },
  emerald: {
    badge: 'bg-gradient-to-br from-emerald-500 to-green-600 text-white border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
    rowGlow: 'group-hover:bg-emerald-500/[0.02] border-emerald-500/20'
  },
  orange: {
    badge: 'bg-gradient-to-br from-orange-400 to-amber-700 text-white border-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.2)]',
    rowGlow: 'group-hover:bg-orange-500/[0.02] border-orange-500/20'
  },
  purple: {
    badge: 'bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    rowGlow: 'group-hover:bg-purple-500/[0.02] border-purple-500/20'
  },
  cyan: {
    badge: 'bg-gradient-to-br from-cyan-400 to-blue-500 text-black border-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.3)]',
    rowGlow: 'group-hover:bg-cyan-500/[0.02] border-cyan-500/20'
  },
  pink: {
    badge: 'bg-gradient-to-br from-pink-500 to-rose-500 text-white border-pink-400 shadow-[0_0_30px_rgba(236,72,153,0.3)]',
    rowGlow: 'group-hover:bg-pink-500/[0.02] border-pink-500/20'
  },
  default: {
    badge: 'bg-gradient-to-br from-[#1a1a24] to-[#0d0d14] text-gray-500 border-gray-800',
    rowGlow: 'group-hover:bg-white/[0.02] border-white/[0.05]'
  }
};

// ────────────────────────────────────────────────────────────────────────
// Card Component

function TierItemCard({ item, isChar, locale }: { item: any, isChar: boolean, locale: string }) {
  const name = locale === 'en' ? item.nameEn : item.nameVi;
  const is5Star = item.rarity === 5;
  
  return (
    <Link href={isChar ? `/characters/${item.id}` : `/weapons`}>
      <motion.div
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-[90px] sm:w-[104px] h-[110px] sm:h-[126px] flex flex-col rounded-[1rem] overflow-hidden border border-white/10 hover:border-white/40 transition-colors shadow-2xl z-0 hover:z-20 cursor-pointer bg-[#050508]"
      >
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl ${is5Star ? 'bg-amber-500/40' : 'bg-purple-500/40'}`} />
        
        {/* Rarity Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-b ${is5Star ? 'from-amber-500/30 via-amber-700/20 to-[#0d0d14]' : 'from-purple-500/30 via-purple-700/20 to-[#0d0d14]'} z-0`} />
        
        {/* Image Container */}
        <div className="relative z-10 flex-1 w-full flex justify-center items-end bg-transparent pt-2">
          {isChar ? (
            <div className="relative w-[110%] h-[110%]">
              <FallbackImage 
                src={getImageUrl(item.avatarUrl) || '/assets/characters/UI_AvatarIcon_PlayerGirl.webp'} 
                alt={name} 
                fill 
                className="object-cover object-top drop-shadow-2xl translate-y-2 group-hover:-translate-y-1 transition-transform duration-500" 
                sizes="104px" 
              />
            </div>
          ) : (
            <div className="relative w-[80%] h-[80%] mb-2">
              <FallbackImage 
                src={getImageUrl(item.iconUrl) || '/placeholder.png'} 
                alt={name} 
                fill 
                className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
          )}

          {/* Element overlay for characters (Top Left) */}
          {isChar && (
            <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center p-[4px] border border-white/20 shadow-lg">
              <FallbackImage src={`/assets/elements/${item.element.toLowerCase()}.webp`} alt={item.element} fill className="object-contain" />
            </div>
          )}
        </div>
        
        {/* Name Bar */}
        <div className={`relative z-20 w-full bg-[#06060a]/95 py-2 px-1 border-t ${is5Star ? 'border-amber-500/20 group-hover:border-amber-400/50' : 'border-purple-500/20 group-hover:border-purple-400/50'} flex flex-col items-center justify-center backdrop-blur-md transition-colors`}>
          <span className="text-[10px] sm:text-[11px] font-bold text-white/90 group-hover:text-white text-center truncate w-full px-1 drop-shadow-md transition-colors font-display">
            {name}
          </span>
          {/* Subtle star row */}
          <span className={`text-[7px] tracking-widest leading-none mt-0.5 ${is5Star ? 'text-amber-400' : 'text-purple-400'}`}>
            {'★'.repeat(item.rarity)}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────────────────────────────────

export default function TierListClient({ locale, characters, weapons, tierRanks }: { locale: string, characters: TierCharacter[], weapons: TierWeapon[], tierRanks: TierRank[] }) {
  const t = useTranslations('TierList');
  const [tab, setTab] = useState<'character' | 'weapon'>('character');
  const [weaponType, setWeaponType] = useState<string>('Kiếm Đơn');

  const groupedCharacters = useMemo(() => {
    const group: Record<string, TierCharacter[]> = {};
    tierRanks.forEach(tr => group[tr.name] = []);
    group['Unranked'] = [];
    
    characters.forEach(c => {
      const tier = c.tier || 'Unranked';
      if (!group[tier]) group[tier] = [];
      group[tier].push(c);
    });
    return group;
  }, [characters, tierRanks]);

  const groupedWeapons = useMemo(() => {
    const group: Record<string, TierWeapon[]> = {};
    tierRanks.forEach(tr => group[tr.name] = []);
    group['Unranked'] = [];

    weapons.forEach(w => {
      if (w.type !== weaponType) return;
      const tier = w.tier || 'Unranked';
      if (!group[tier]) group[tier] = [];
      group[tier].push(w);
    });
    return group;
  }, [weapons, weaponType, tierRanks]);

  const tabs = [
    { id: 'character', label: t('characterTab') },
    { id: 'weapon', label: t('weaponTab') }
  ];

  const WEAPON_TYPES = [
    { id: 'Kiếm Đơn', label: 'Sword' },
    { id: 'Trọng Kiếm', label: 'Claymore' },
    { id: 'Vũ Khí Cán Dài', label: 'Polearm' },
    { id: 'Cung', label: 'Bow' },
    { id: 'Pháp Khí', label: 'Catalyst' }
  ];

  return (
    <main className="min-h-screen bg-[#06060a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      
      {/* ── Hero Header ──────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-white/[0.04]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 blur-[120px] rounded-[100%]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 relative z-10 text-center flex flex-col items-center">
          <Link
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-wider mb-8 group bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
            href="/"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(234,179,8,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
            Regularly Updated for Spiral Abyss
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-display uppercase tracking-tight leading-none mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 drop-shadow-[0_2px_20px_rgba(245,158,11,0.3)]">
              {t('title')}
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            {t('description')}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-8">
        
        {/* ── Tabs ────────────────────────────────────────────── */}
        <div className="flex justify-center gap-2 mb-12 bg-[#0d0d14]/80 p-2 rounded-full border border-white/10 w-fit mx-auto backdrop-blur-xl shadow-2xl">
          {tabs.map((tItem) => (
            <button
              key={tItem.id}
              onClick={() => setTab(tItem.id as any)}
              className={`relative px-8 py-3 rounded-full font-black text-[13px] transition-colors duration-300 ${tab === tItem.id ? 'text-black' : 'text-gray-400 hover:text-white'}`}
            >
              {tab === tItem.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-[0_0_24px_rgba(245,158,11,0.5)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 tracking-widest uppercase">{tItem.label}</span>
            </button>
          ))}
        </div>

        {tab === 'weapon' && (
          <div className="flex justify-center flex-wrap gap-3 sm:gap-4 mb-10">
            {WEAPON_TYPES.map(wType => (
              <button
                key={wType.id}
                onClick={() => setWeaponType(wType.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl border transition-all duration-300 font-bold text-sm uppercase tracking-wider ${weaponType === wType.id ? 'bg-[#1a1a24] border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]' : 'bg-transparent border-white/5 text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}
              >
                {wType.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Tab Content ─────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-8">
                {[...tierRanks, { id: 'unranked', name: 'Unranked', order: 999, colorBase: 'default' }].map(tier => {
                  const items = tab === 'character' ? (groupedCharacters[tier.name] || []) : (groupedWeapons[tier.name] || []);
                  if (items.length === 0) return null;

                  const colorStyle = COLOR_MAP[tier.colorBase] || COLOR_MAP.default;
                  const enhancedBadgeStyle = colorStyle.badge;
                  const rowGlow = colorStyle.rowGlow;

                  return (
                    <motion.div variants={itemVariants} key={tier.id} className={`relative flex flex-col md:flex-row bg-[#0d0d14] border rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-300 group ${rowGlow}`}>
                      
                      {/* Thicker, more impactful Tier Badge */}
                      <div className={`w-20 sm:w-28 shrink-0 flex flex-col justify-center items-center py-6 border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden ${enhancedBadgeStyle}`}>

                        <span className="text-4xl sm:text-5xl font-black font-display relative z-10 drop-shadow-md">
                          {tier.name !== 'Unranked' ? tier.name : '?'}
                        </span>
                      </div>
                      
                      {/* Grid */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-transparent relative z-10">
                        {(['Main DPS', 'Sub DPS', 'Support'] as Role[]).map(role => {
                          const itemsInRole = items.filter((c: any) => c.role?.includes(role));
                          return (
                            <div key={role} className="flex flex-col bg-transparent">
                              <div className="py-3.5 px-5 flex items-center gap-3 border-b border-white/5 bg-black/20">
                                <div className={`w-2 h-2 rounded-full ${role === 'Main DPS' ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]' : role === 'Sub DPS' ? 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]' : 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]'}`} />
                                <span className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">{role}</span>
                                <span className="ml-auto text-[10px] font-bold text-gray-400 bg-[#06060a] border border-white/10 px-2.5 py-0.5 rounded-full">{itemsInRole.length}</span>
                              </div>
                              <div className="p-5 flex flex-wrap gap-4 sm:gap-5 content-start">
                                {itemsInRole.map((item: any) => (
                                  <TierItemCard key={item.id} item={item} isChar={tab === 'character'} locale={locale} />
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
