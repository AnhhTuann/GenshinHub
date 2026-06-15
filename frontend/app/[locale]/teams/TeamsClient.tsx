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
  'Healer': 'bg-green-500/10 text-green-450 border-green-500/20',
  'Shielder': 'bg-slate-700/25 text-slate-400 border-slate-700/35',
  'Buffer': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
};

const RANK_CONFIG = {
  SS: { label: 'SS', bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.15)]' },
  S: { label: 'S', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.15)]' },
  A: { label: 'A', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)]' },
  B: { label: 'B', bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
};

const ELEMENT_DETAILS: Record<string, { color: string; border: string; glow: string; hoverBorder: string; bg: string }> = {
  Pyro: { color: 'text-red-500', border: 'border-red-500/30', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.15)] bg-red-950/20 text-red-400', hoverBorder: 'hover:border-red-500/40', bg: 'from-red-950/20' },
  Hydro: { color: 'text-blue-500', border: 'border-blue-500/30', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-blue-950/20 text-blue-400', hoverBorder: 'hover:border-blue-500/40', bg: 'from-blue-950/20' },
  Cryo: { color: 'text-cyan-400', border: 'border-cyan-500/30', glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)] bg-cyan-950/20 text-cyan-300', hoverBorder: 'hover:border-cyan-500/40', bg: 'from-cyan-950/20' },
  Electro: { color: 'text-purple-500', border: 'border-purple-500/30', glow: 'shadow-[0_0_15px_rgba(168,85,247,0.15)] bg-purple-950/20 text-purple-400', hoverBorder: 'hover:border-purple-500/40', bg: 'from-purple-950/20' },
  Anemo: { color: 'text-emerald-500', border: 'border-emerald-500/30', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)] bg-emerald-950/20 text-emerald-400', hoverBorder: 'hover:border-emerald-500/40', bg: 'from-emerald-950/20' },
  Geo: { color: 'text-yellow-500', border: 'border-yellow-500/30', glow: 'shadow-[0_0_15px_rgba(234,179,8,0.15)] bg-yellow-950/20 text-yellow-400', hoverBorder: 'hover:border-yellow-500/40', bg: 'from-yellow-950/20' },
  Dendro: { color: 'text-green-500', border: 'border-green-500/30', glow: 'shadow-[0_0_15px_rgba(34,197,94,0.15)] bg-green-950/20 text-green-450', hoverBorder: 'hover:border-green-500/40', bg: 'from-green-950/20' },
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
    <main className="min-h-screen bg-[#07070a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-wider w-fit mb-6" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Home
        </Link>
        <h1 className="text-4xl font-black text-white mb-1 font-display uppercase tracking-tight">👥 Meta Teams</h1>
        <p className="text-gray-455 text-sm font-medium">{allTeams.length} optimal teams for {characters.length} characters</p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="bg-[#0d0d12]/75 border border-gray-900 rounded-2xl p-4 flex flex-wrap gap-4 items-center shadow-xl backdrop-blur-md">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-550" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search characters or team names..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#050508] border border-gray-950 rounded-xl pl-10 pr-3 py-2 text-xs text-gray-200 placeholder-gray-655 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all font-medium"
            />
          </div>

          {/* Element filter */}
          <div className="flex flex-wrap gap-1.5 bg-[#050508] p-1 rounded-xl border border-gray-950">
            {ELEMENTS.map(el => {
              const isSelected = filterElement === el;
              const details = ELEMENT_DETAILS[el];
              return (
                <button
                  key={el}
                  onClick={() => setFilterElement(filterElement === el ? null : el)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border transition-all duration-300 ${details.hoverBorder} ${
                    isSelected
                      ? `${details.glow} ${details.border}`
                      : 'border-transparent text-gray-500 hover:bg-white/5'
                  }`}
                >
                  <div className="relative w-4 h-4">
                    <Image src={`/elements/${el.toLowerCase()}.png`} alt={el} fill className="object-contain" />
                  </div>
                  {el}
                </button>
              );
            })}
          </div>

          {/* Rank filter */}
          <div className="flex gap-1.5 bg-[#050508] p-1 rounded-xl border border-gray-950">
            {(['SS', 'S', 'A', 'B'] as const).map(rank => {
              const cfg = RANK_CONFIG[rank];
              const isSelected = filterRank === rank;
              return (
                <button
                  key={rank}
                  onClick={() => setFilterRank(filterRank === rank ? null : rank)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all duration-300 ${
                    isSelected
                      ? `${cfg.bg} ${cfg.text} ${cfg.border} scale-102`
                      : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {rank}
                </button>
              );
            })}
          </div>

          <p className="text-gray-550 text-[10px] font-black uppercase tracking-wider ml-auto whitespace-nowrap leading-none select-none">
            <span className="text-white font-extrabold">{filtered.length}</span> teams found
          </p>
        </div>
      </div>

      {/* Teams List */}
      <div className="max-w-7xl mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-56 text-gray-500 bg-[#0d0d12]/30 rounded-2xl border border-gray-900/60 shadow-inner">
            <span className="text-4xl mb-3">👻</span>
            <p className="text-sm font-semibold">No meta team comps matched your filters.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4.5">
            {filtered.map((team, idx) => {
              const teamKey = `${team.focusCharId}-${idx}`;
              const isExpanded = expandedTeam === teamKey;
              const rankCfg = RANK_CONFIG[team.rank as keyof typeof RANK_CONFIG] || RANK_CONFIG.A;
              const elemDetails = ELEMENT_DETAILS[team.focusElement] || { bg: 'from-gray-900/10', color: 'text-gray-400' };

              return (
                <div
                  key={teamKey}
                  className={`bg-[#0d0d12]/50 border border-gray-900 rounded-2xl overflow-hidden hover:border-gray-800 transition-all duration-300 shadow-md ${
                    isExpanded ? 'ring-1 ring-white/5 border-gray-800' : ''
                  }`}
                >
                  {/* Card Header (Clickable Accordion Trigger) */}
                  <button
                    className="w-full text-left"
                    onClick={() => setExpandedTeam(isExpanded ? null : teamKey)}
                  >
                    <div className={`relative flex items-center gap-4 p-4 bg-gradient-to-r ${elemDetails.bg} to-transparent`}>
                      {/* Focus character avatar */}
                      <Link
                        href={`/characters/${team.focusCharId}`}
                        onClick={e => e.stopPropagation()}
                        className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-colors shadow-md p-0.5 bg-[#050508]"
                      >
                        {team.focusAvatarUrl && (
                          <Image
                            src={team.focusAvatarUrl}
                            alt={team.focusCharName}
                            fill
                            className="object-cover object-top rounded-lg"
                          />
                        )}
                      </Link>

                      {/* Title & description */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider ${rankCfg.bg} ${rankCfg.text} ${rankCfg.border}`}>
                            {rankCfg.label}
                          </span>
                          <h3 className="text-white font-extrabold text-base leading-tight font-display uppercase tracking-tight">{team.name}</h3>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 max-w-3xl">{team.description}</p>
                      </div>

                      {/* Member avatars preview */}
                      <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0 bg-black/30 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/5">
                        {team.members.map((m, mi) => {
                          const char = charMap[m.characterId];
                          if (!char) return null;
                          return (
                            <div
                              key={mi}
                              className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-800/80 shadow-md"
                              title={locale === 'en' ? char.nameEn : char.nameVi}
                            >
                              <Image src={char.avatarUrl} alt={locale === 'en' ? char.nameEn : char.nameVi} fill className="object-cover object-top" />
                            </div>
                          );
                        })}
                      </div>

                      {/* Expand arrow */}
                      <div className="w-8 h-8 rounded-lg bg-[#07070a] border border-gray-900 flex items-center justify-center text-gray-500 shrink-0">
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-white' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Members */}
                  {isExpanded && (
                    <div className="border-t border-gray-950 p-4.5 bg-[#07070a]/30">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                        {team.members.map((member, mi) => {
                          const char = charMap[member.characterId];
                          if (!char) return (
                            <div key={mi} className="bg-[#050508] rounded-xl p-3 border border-gray-950">
                              <p className="text-gray-500 text-xs">{member.characterId}</p>
                            </div>
                          );

                          const roleStyle = Object.entries(ROLE_COLORS).find(([key]) =>
                            member.role.toLowerCase().includes(key.toLowerCase())
                          )?.[1] || 'bg-gray-850/45 text-gray-400 border-gray-800/50';

                          return (
                            <Link
                              key={mi}
                              href={`/characters/${member.characterId}`}
                              className="group bg-[#050508]/70 border border-gray-955 hover:border-gray-800 rounded-2xl p-4.5 transition-all duration-300 hover:scale-[1.02] hover:bg-[#101015]/60 hover:shadow-lg flex flex-col justify-between"
                            >
                              <div>
                                {/* Char header */}
                                <div className="flex items-center gap-3 mb-3 border-b border-gray-950 pb-2.5">
                                  <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-gray-900 flex-shrink-0 p-0.5 bg-[#07070a]">
                                    <Image src={char.avatarUrl} alt={locale === 'en' ? char.nameEn : char.nameVi} fill className="object-cover object-top rounded-lg" />
                                    <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-black/45 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/5">
                                      <Image src={`/elements/${char.element.toLowerCase()}.png`} alt={char.element} width={10} height={10} className="object-contain" />
                                    </div>
                                  </div>
                                  <div className="min-w-0">
                                    <p className={`font-extrabold text-sm leading-tight truncate font-display ${ELEMENT_DETAILS[char.element]?.color || 'text-white'}`}>
                                      {locale === 'en' ? char.nameEn : char.nameVi}
                                    </p>
                                    <span className={`inline-block text-[8px] font-black px-1.5 py-0.5 rounded border mt-1 uppercase tracking-widest leading-none ${roleStyle}`}>
                                      {member.role}
                                    </span>
                                  </div>
                                </div>

                                {/* Role description */}
                                <p className="text-gray-405 text-xs leading-relaxed mb-4 italic opacity-95">{member.roleDesc}</p>
                              </div>

                              <div className="space-y-2 border-t border-gray-950 pt-3">
                                {/* Weapons */}
                                {member.weapons.length > 0 && (
                                  <div>
                                    <p className="text-gray-600 text-[8px] font-black uppercase tracking-widest mb-0.5 font-display">Weapons</p>
                                    <p className="text-gray-300 text-[10px] font-semibold leading-relaxed">{member.weapons.join(', ')}</p>
                                  </div>
                                )}

                                {/* Artifacts */}
                                {member.artifacts.length > 0 && (
                                  <div>
                                    <p className="text-gray-600 text-[8px] font-black uppercase tracking-widest mb-0.5 font-display">Artifacts</p>
                                    <p className="text-gray-300 text-[10px] font-semibold leading-relaxed">{member.artifacts.join(', ')}</p>
                                  </div>
                                )}

                                {/* Substats */}
                                {member.substats.length > 0 && (
                                  <div>
                                    <p className="text-gray-600 text-[8px] font-black uppercase tracking-widest mb-0.5 font-display">Sub-Stats</p>
                                    <p className="text-gray-405 text-[10px] font-semibold leading-relaxed">{member.substats.join(' › ')}</p>
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
