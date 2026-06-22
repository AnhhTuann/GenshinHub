'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export interface TeamMember {
  characterId: string;
  role: string;
  roleDesc: string;
  weapons: string[];
  artifacts: string[];
  substats: string[];
}

export interface DetailedTeam {
  id: string;
  name: string;
  rank: string;
  description: string;
  members: TeamMember[];
}

// Flatten all teams with their "focus character" info
interface FlatTeam extends DetailedTeam {
  focusCharId: string;
  focusCharName: string;
  focusElement: string;
  focusAvatarUrl: string;
}

interface CharInfo {
  id: string;
  nameEn: string;
  nameVi: string;
  element: string;
  rarity: number;
  avatarUrl: string;
  teams: DetailedTeam[];
}

const ROLE_COLORS: Record<string, string> = {
  'Main DPS': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Sub DPS': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Support': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Healer': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Shielder': 'bg-slate-500/25 text-slate-300 border-slate-500/35',
  'Buffer': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const RANK_CONFIG = {
  SS: { label: 'SS', bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30', glow: 'shadow-[0_0_20px_rgba(234,179,8,0.25)]' },
  S: { label: 'S', bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30', glow: 'shadow-[0_0_20px_rgba(239,68,68,0.25)]' },
  A: { label: 'A', bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.25)]' },
  B: { label: 'B', bg: 'bg-gray-500/15', text: 'text-gray-400', border: 'border-gray-500/30', glow: '' },
};

const ELEMENT_DETAILS: Record<string, { color: string; border: string; glow: string; hoverBorder: string; bg: string; gradient: string }> = {
  Pyro: { color: 'text-red-500', border: 'border-red-500/30', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.15)] bg-red-950/20 text-red-400', hoverBorder: 'hover:border-red-500/40', bg: 'bg-red-950/20', gradient: 'from-red-900/30 to-red-950/5' },
  Hydro: { color: 'text-blue-500', border: 'border-blue-500/30', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-blue-950/20 text-blue-400', hoverBorder: 'hover:border-blue-500/40', bg: 'bg-blue-950/20', gradient: 'from-blue-900/30 to-blue-950/5' },
  Cryo: { color: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-cyan-950/20 text-cyan-300', hoverBorder: 'hover:border-cyan-500/40', bg: 'bg-cyan-950/20', gradient: 'from-cyan-900/30 to-cyan-950/5' },
  Electro: { color: 'text-purple-500', border: 'border-purple-500/30', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)] bg-purple-950/20 text-purple-400', hoverBorder: 'hover:border-purple-500/40', bg: 'bg-purple-950/20', gradient: 'from-purple-900/30 to-purple-950/5' },
  Anemo: { color: 'text-emerald-500', border: 'border-emerald-500/30', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-emerald-950/20 text-emerald-400', hoverBorder: 'hover:border-emerald-500/40', bg: 'bg-emerald-950/20', gradient: 'from-emerald-900/30 to-emerald-950/5' },
  Geo: { color: 'text-yellow-500', border: 'border-yellow-500/30', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.15)] bg-yellow-950/20 text-yellow-400', hoverBorder: 'hover:border-yellow-500/40', bg: 'bg-yellow-950/20', gradient: 'from-yellow-900/30 to-yellow-950/5' },
  Dendro: { color: 'text-green-500', border: 'border-green-500/30', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.15)] bg-green-950/20 text-green-450', hoverBorder: 'hover:border-green-500/40', bg: 'bg-green-950/20', gradient: 'from-green-900/30 to-green-950/5' },
};

const ELEMENTS = ['Pyro', 'Hydro', 'Cryo', 'Electro', 'Anemo', 'Geo', 'Dendro'];

export default function TeamsClient({ characters }: { characters: CharInfo[] }) {
  const [search, setSearch] = useState('');
  const [filterElement, setFilterElement] = useState<string | null>(null);
  const [filterRank, setFilterRank] = useState<string | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const locale = useLocale();

  const charMap = useMemo(() => {
    const map: Record<string, CharInfo> = {};
    for (const c of characters) map[c.id] = c;
    return map;
  }, [characters]);

  // Build flat list of all teams
  const allTeams: FlatTeam[] = useMemo(() => {
    const result: FlatTeam[] = [];
    for (const char of characters) {
      if (!char.teams) continue;
      for (const team of char.teams) {
        result.push({
          ...team,
          focusCharId: char.id,
          focusCharName: locale === 'en' ? char.nameEn : char.nameVi,
          focusElement: char.element,
          focusAvatarUrl: char.avatarUrl,
        });
      }
    }
    return result;
  }, [characters, locale]);

  const filtered = useMemo(() => {
    return allTeams.filter(t => {
      const matchSearch = search === '' ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.focusCharName.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchElement = !filterElement || t.focusElement === filterElement;
      const matchRank = !filterRank || t.rank === filterRank;
      return matchSearch && matchElement && matchRank;
    });
  }, [allTeams, search, filterElement, filterRank]);

  return (
    <main className="min-h-screen bg-[#06060a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      
      {/* ── Hero section ──────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-white/[0.04]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-purple-500/10 blur-[80px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 relative z-10 text-center flex flex-col items-center">
          <Link
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-wider mb-8 group bg-white/5 px-3 py-1.5 rounded-full border border-white/10"
            href="/"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            {allTeams.length} Optimal Compositions
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black font-display uppercase tracking-tight leading-none mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">Meta</span>{' '}
            <span className="text-white">Teams</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base font-medium max-w-2xl leading-relaxed">
            Discover the most powerful team synergies in Genshin Impact. Filter by element, rank, or character to find the perfect squad for Spiral Abyss.
          </p>
        </div>
      </div>

      {/* ── Unified Filter Bar ─────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#06060a]/80 backdrop-blur-xl border-b border-white/[0.05] shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col xl:flex-row gap-4 items-center justify-between">
          
          <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-center">
            {/* Search */}
            <div className="relative w-full sm:w-72 flex-shrink-0">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search teams..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#0d0d14] border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-medium shadow-inner"
              />
            </div>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            {/* Element filters */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {ELEMENTS.map(el => {
                const isSelected = filterElement === el;
                const details = ELEMENT_DETAILS[el];
                return (
                  <button
                    key={el}
                    onClick={() => setFilterElement(filterElement === el ? null : el)}
                    className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${
                      isSelected
                        ? `${details.glow} ${details.border}`
                        : 'border-white/10 text-gray-500 hover:bg-white/5 hover:border-white/20 hover:scale-110 bg-[#0d0d14]'
                    }`}
                    title={el}
                  >
                    <div className="relative w-4 h-4">
                      <Image src={`/elements/${el.toLowerCase()}.png`} alt={el} fill className={`object-contain ${!isSelected && 'opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            {/* Rank filters */}
            <div className="flex gap-1.5 justify-center bg-[#0d0d14] p-1 rounded-full border border-white/10">
              {(['SS', 'S', 'A', 'B'] as const).map(rank => {
                const cfg = RANK_CONFIG[rank];
                const isSelected = filterRank === rank;
                return (
                  <button
                    key={rank}
                    onClick={() => setFilterRank(filterRank === rank ? null : rank)}
                    className={`w-10 h-7 flex items-center justify-center rounded-full text-[10px] font-black transition-all duration-300 ${
                      isSelected
                        ? `${cfg.bg} ${cfg.text} ${cfg.glow} shadow-sm border ${cfg.border}`
                        : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {rank}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-gray-400 text-xs font-bold bg-[#0d0d14] px-4 py-2 rounded-full border border-white/5">
            Showing <span className="text-white font-black">{filtered.length}</span> teams
          </div>
        </div>
      </div>

      {/* ── Teams List ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 mt-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-72 rounded-3xl border border-white/5 bg-[#0d0d14]/40 backdrop-blur-sm text-gray-500 gap-4">
            <span className="text-5xl">👻</span>
            <div className="text-center">
              <p className="text-base font-bold text-gray-300 mb-1">No teams found</p>
              <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
            </div>
            <button
              onClick={() => { setSearch(''); setFilterElement(null); setFilterRank(null); }}
              className="mt-2 px-5 py-2.5 rounded-xl text-xs font-black bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all shadow-md"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filtered.map((team, idx) => {
              const teamKey = `${team.focusCharId}-${idx}`;
              const isExpanded = expandedTeam === teamKey;
              const rankCfg = RANK_CONFIG[team.rank as keyof typeof RANK_CONFIG] || RANK_CONFIG.A;
              const elemDetails = ELEMENT_DETAILS[team.focusElement] || { gradient: 'from-gray-900/30 to-transparent', color: 'text-gray-400', border: 'border-gray-800' };

              return (
                <div
                  key={teamKey}
                  className={`group bg-[#0d0d14] border border-white/[0.05] rounded-[1.5rem] overflow-hidden transition-all duration-500 shadow-xl ${
                    isExpanded ? `ring-1 ring-white/10 shadow-2xl scale-[1.01]` : 'hover:border-white/[0.15] hover:shadow-2xl hover:-translate-y-1'
                  }`}
                >
                  {/* Card Header (Clickable Accordion Trigger) */}
                  <button
                    className="w-full text-left relative"
                    onClick={() => setExpandedTeam(isExpanded ? null : teamKey)}
                  >
                    {/* Background gradient wash based on element */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${elemDetails.gradient} opacity-50 pointer-events-none`} />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 p-6">
                      
                      {/* Left: Rank & Title */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`flex items-center justify-center min-w-[36px] h-[36px] rounded-lg text-sm font-black border ${rankCfg.bg} ${rankCfg.text} ${rankCfg.border} ${rankCfg.glow}`}>
                            {rankCfg.label}
                          </span>
                          <h3 className="text-white font-black text-xl md:text-2xl leading-tight font-display tracking-tight truncate group-hover:text-yellow-100 transition-colors">
                            {team.name}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 md:pr-10">{team.description}</p>
                      </div>

                      {/* Right: Members preview + Expand arrow */}
                      <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                        {/* Member avatars preview */}
                        <div className="flex items-center gap-3">
                          {team.members.map((m, mi) => {
                            const char = charMap[m.characterId];
                            if (!char) return null;
                            const charElem = ELEMENT_DETAILS[char.element] || { color: 'text-white' };
                            return (
                              <div key={mi} className="flex flex-col items-center gap-1.5 w-14">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#0d0d14] ring-1 ring-white/10 shadow-lg group-hover:ring-white/30 transition-all bg-[#050508]">
                                  <Image src={char.avatarUrl} alt={locale === 'en' ? char.nameEn : char.nameVi} fill className="object-cover object-top scale-110" />
                                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-black/80 rounded-full flex items-center justify-center p-[2px] border border-white/20">
                                    <Image src={`/elements/${char.element.toLowerCase()}.png`} alt={char.element} fill className="object-contain" />
                                  </div>
                                </div>
                                <span className={`text-[9px] font-bold text-center truncate w-full ${charElem.color} leading-none`}>
                                  {locale === 'en' ? char.nameEn : char.nameVi}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Expand arrow */}
                        <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 shrink-0 transition-all duration-300 ${isExpanded ? 'bg-white/10 text-white rotate-180 border-white/20' : 'group-hover:bg-white/10 group-hover:text-white'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Members Details */}
                  {isExpanded && (
                    <div className="border-t border-white/[0.05] p-6 bg-[#050508]/80 backdrop-blur-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {team.members.map((member, mi) => {
                          const char = charMap[member.characterId];
                          if (!char) return null;

                          const roleStyle = Object.entries(ROLE_COLORS).find(([key]) =>
                            member.role.toLowerCase().includes(key.toLowerCase())
                          )?.[1] || 'bg-gray-800/40 text-gray-400 border-gray-700/50';

                          return (
                            <Link
                              key={mi}
                              href={`/characters/${member.characterId}`}
                              className="group/card relative bg-[#0d0d14] border border-white/[0.08] rounded-[1.25rem] p-5 flex flex-col transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:bg-[#12121a]"
                            >
                              {/* Character Header */}
                              <div className="flex items-start gap-4 mb-4">
                                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 bg-black/50 shadow-inner group-hover/card:border-white/30 transition-colors">
                                  <Image src={char.avatarUrl} alt={locale === 'en' ? char.nameEn : char.nameVi} fill className="object-cover object-top scale-110" />
                                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                    <Image src={`/elements/${char.element.toLowerCase()}.png`} alt={char.element} width={10} height={10} className="object-contain" />
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0 pt-1">
                                  <p className={`font-black text-sm leading-tight truncate font-display ${ELEMENT_DETAILS[char.element]?.color || 'text-white'}`}>
                                    {locale === 'en' ? char.nameEn : char.nameVi}
                                  </p>
                                  <span className={`inline-block text-[9px] font-black px-2 py-0.5 rounded border mt-1.5 uppercase tracking-widest leading-none ${roleStyle}`}>
                                    {member.role}
                                  </span>
                                </div>
                              </div>

                              <p className="text-gray-400 text-xs leading-relaxed mb-5 italic opacity-90">{member.roleDesc}</p>

                              {/* Build Details */}
                              <div className="mt-auto flex flex-col gap-3 border-t border-white/5 pt-4">
                                {member.weapons.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                      <span className="text-sm">🗡️</span>
                                      <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest font-display">Weapons</span>
                                    </div>
                                    <p className="text-gray-300 text-[11px] font-semibold leading-snug">{member.weapons.join(', ')}</p>
                                  </div>
                                )}

                                {member.artifacts.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                      <span className="text-sm">💎</span>
                                      <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest font-display">Artifacts</span>
                                    </div>
                                    <p className="text-gray-300 text-[11px] font-semibold leading-snug">{member.artifacts.join(', ')}</p>
                                  </div>
                                )}

                                {member.substats.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                      <span className="text-sm">📊</span>
                                      <span className="text-gray-500 text-[9px] font-black uppercase tracking-widest font-display">Sub-Stats</span>
                                    </div>
                                    <p className="text-gray-400 text-[10px] font-semibold leading-relaxed flex flex-wrap gap-x-2 gap-y-1">
                                      {member.substats.map((stat, si) => (
                                        <span key={si} className="bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{stat}</span>
                                      ))}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
