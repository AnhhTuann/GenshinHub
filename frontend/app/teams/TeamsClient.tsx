'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { detailedTeamsData, DetailedTeam } from '@/data/teams';

// Flatten all teams with their "focus character" info
interface FlatTeam extends DetailedTeam {
  focusCharId: string;
  focusCharName: string;
  focusElement: string;
  focusAvatarUrl: string;
}

interface CharInfo {
  id: string;
  name: string;
  element: string;
  rarity: number;
  avatarUrl: string;
}

const ROLE_COLORS: Record<string, string> = {
  'Main DPS': 'bg-red-900/40 text-red-300 border-red-700/40',
  'Sub DPS': 'bg-orange-900/40 text-orange-300 border-orange-700/40',
  'Support': 'bg-blue-900/40 text-blue-300 border-blue-700/40',
  'Healer': 'bg-green-900/40 text-green-300 border-green-700/40',
  'Shielder': 'bg-slate-700/40 text-slate-300 border-slate-600/40',
  'Buffer': 'bg-purple-900/40 text-purple-300 border-purple-700/40',
};

const RANK_CONFIG = {
  SS: { label: 'SS', bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-500/40' },
  S: { label: 'S', bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/40' },
  A: { label: 'A', bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/40' },
  B: { label: 'B', bg: 'bg-gray-500/20', text: 'text-gray-300', border: 'border-gray-500/40' },
};

const ELEMENT_COLORS: Record<string, string> = {
  Pyro: 'from-red-900/50', Hydro: 'from-blue-900/50', Cryo: 'from-cyan-900/50',
  Electro: 'from-purple-900/50', Anemo: 'from-emerald-900/50', Geo: 'from-yellow-900/50',
  Dendro: 'from-green-900/50', Physical: 'from-gray-900/50',
};

const ELEMENTS = ['Pyro', 'Hydro', 'Cryo', 'Electro', 'Anemo', 'Geo', 'Dendro'];

export default function TeamsClient({ characters }: { characters: CharInfo[] }) {
  const [search, setSearch] = useState('');
  const [filterElement, setFilterElement] = useState<string | null>(null);
  const [filterRank, setFilterRank] = useState<string | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  const charMap = useMemo(() => {
    const map: Record<string, CharInfo> = {};
    for (const c of characters) map[c.id] = c;
    return map;
  }, [characters]);

  // Build flat list of all teams
  const allTeams: FlatTeam[] = useMemo(() => {
    const result: FlatTeam[] = [];
    for (const [charId, teams] of Object.entries(detailedTeamsData)) {
      const focusChar = charMap[charId];
      if (!focusChar) continue;
      for (const team of teams) {
        result.push({
          ...team,
          focusCharId: charId,
          focusCharName: focusChar.name,
          focusElement: focusChar.element,
          focusAvatarUrl: focusChar.avatarUrl,
        });
      }
    }
    return result;
  }, [charMap]);

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
    <main className="min-h-screen bg-[#0b0b0e] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium w-fit mb-6" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Trang chủ
        </Link>
        <h1 className="text-4xl font-black text-white mb-1">👥 Đội Hình Meta</h1>
        <p className="text-gray-400 text-sm">{allTeams.length} đội hình tối ưu cho {Object.keys(detailedTeamsData).length} nhân vật</p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-4 flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm nhân vật hoặc tên đội..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#0b0b0e] border border-gray-700/60 rounded-xl pl-9 pr-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500/60 transition-colors"
            />
          </div>

          {/* Element filter */}
          <div className="flex flex-wrap gap-1.5">
            {ELEMENTS.map(el => (
              <button
                key={el}
                onClick={() => setFilterElement(filterElement === el ? null : el)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  filterElement === el
                    ? 'bg-white/15 border-white/30 text-white scale-105'
                    : 'border-gray-700/50 text-gray-400 hover:border-gray-500'
                }`}
              >
                <Image src={`/elements/${el.toLowerCase()}.png`} alt={el} width={16} height={16} className="w-4 h-4" />
                {el}
              </button>
            ))}
          </div>

          {/* Rank filter */}
          <div className="flex gap-1.5">
            {(['SS', 'S', 'A', 'B'] as const).map(rank => {
              const cfg = RANK_CONFIG[rank];
              return (
                <button
                  key={rank}
                  onClick={() => setFilterRank(filterRank === rank ? null : rank)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black border transition-all ${
                    filterRank === rank
                      ? `${cfg.bg} ${cfg.text} ${cfg.border} scale-105`
                      : 'border-gray-700/50 text-gray-500 hover:border-gray-500'
                  }`}
                >
                  {rank}
                </button>
              );
            })}
          </div>

          <p className="text-gray-500 text-xs ml-auto whitespace-nowrap">
            <span className="text-gray-300 font-bold">{filtered.length}</span> đội hình
          </p>
        </div>
      </div>

      {/* Teams List */}
      <div className="max-w-7xl mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-500">Không tìm thấy đội hình phù hợp</div>
        ) : (
          <div className="flex flex-col gap-4">
            {filtered.map((team, idx) => {
              const teamKey = `${team.focusCharId}-${idx}`;
              const isExpanded = expandedTeam === teamKey;
              const rankCfg = RANK_CONFIG[team.rank];
              const elemGrad = ELEMENT_COLORS[team.focusElement] || 'from-gray-900/50';

              return (
                <div
                  key={teamKey}
                  className={`bg-[#15151a] border border-gray-800/60 rounded-2xl overflow-hidden hover:border-gray-700/80 transition-all duration-200`}
                >
                  {/* Card Header */}
                  <button
                    className="w-full text-left"
                    onClick={() => setExpandedTeam(isExpanded ? null : teamKey)}
                  >
                    <div className={`relative flex items-center gap-4 p-4 bg-gradient-to-r ${elemGrad} to-transparent`}>
                      {/* Focus character avatar */}
                      <Link
                        href={`/characters/${team.focusCharId}`}
                        onClick={e => e.stopPropagation()}
                        className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-colors"
                      >
                        {team.focusAvatarUrl && (
                          <Image
                            src={team.focusAvatarUrl}
                            alt={team.focusCharName}
                            fill
                            className="object-cover object-top"
                          />
                        )}
                      </Link>

                      {/* Title & desc */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${rankCfg.bg} ${rankCfg.text} ${rankCfg.border}`}>
                            {rankCfg.label}
                          </span>
                          <h3 className="text-white font-bold text-base leading-tight">{team.name}</h3>
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{team.description}</p>
                      </div>

                      {/* Member avatars preview */}
                      <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                        {team.members.map((m, mi) => {
                          const char = charMap[m.characterId];
                          if (!char) return null;
                          return (
                            <div
                              key={mi}
                              className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700/60"
                              title={char.name}
                            >
                              <Image src={char.avatarUrl} alt={char.name} fill className="object-cover object-top" />
                            </div>
                          );
                        })}
                      </div>

                      {/* Expand arrow */}
                      <svg
                        className={`w-4 h-4 text-gray-500 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Members */}
                  {isExpanded && (
                    <div className="border-t border-gray-800/60 p-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {team.members.map((member, mi) => {
                          const char = charMap[member.characterId];
                          if (!char) return (
                            <div key={mi} className="bg-[#0b0b0e]/50 rounded-xl p-3 border border-gray-800/50">
                              <p className="text-gray-500 text-xs">{member.characterId}</p>
                            </div>
                          );

                          const roleStyle = Object.entries(ROLE_COLORS).find(([key]) =>
                            member.role.toLowerCase().includes(key.toLowerCase())
                          )?.[1] || 'bg-gray-800/40 text-gray-400 border-gray-700/40';

                          return (
                            <Link
                              key={mi}
                              href={`/characters/${member.characterId}`}
                              className="group bg-[#0b0b0e]/60 border border-gray-800/50 hover:border-gray-600/70 rounded-xl p-3 transition-all hover:scale-[1.02]"
                            >
                              {/* Char header */}
                              <div className="flex items-center gap-2.5 mb-2.5">
                                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-gray-700/50 flex-shrink-0">
                                  <Image src={char.avatarUrl} alt={char.name} fill className="object-cover object-top" />
                                  <div className="absolute bottom-0 right-0 w-3 h-3">
                                    <Image src={`/elements/${char.element.toLowerCase()}.png`} alt={char.element} fill className="object-contain" />
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <p className="text-white font-bold text-sm leading-tight truncate group-hover:text-blue-300 transition-colors">
                                    {char.name}
                                  </p>
                                  <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded border mt-0.5 ${roleStyle}`}>
                                    {member.role}
                                  </span>
                                </div>
                              </div>

                              {/* Role description */}
                              <p className="text-gray-400 text-[10px] leading-relaxed mb-2">{member.roleDesc}</p>

                              {/* Weapons */}
                              {member.weapons.length > 0 && (
                                <div className="mb-1.5">
                                  <p className="text-gray-600 text-[9px] font-bold uppercase tracking-wider mb-0.5">Vũ khí</p>
                                  <p className="text-gray-300 text-[10px]">{member.weapons.join(', ')}</p>
                                </div>
                              )}

                              {/* Artifacts */}
                              {member.artifacts.length > 0 && (
                                <div className="mb-1.5">
                                  <p className="text-gray-600 text-[9px] font-bold uppercase tracking-wider mb-0.5">Thánh di vật</p>
                                  <p className="text-gray-300 text-[10px]">{member.artifacts.join(', ')}</p>
                                </div>
                              )}

                              {/* Substats */}
                              {member.substats.length > 0 && (
                                <div>
                                  <p className="text-gray-600 text-[9px] font-bold uppercase tracking-wider mb-0.5">Substats</p>
                                  <p className="text-gray-400 text-[10px]">{member.substats.join(' > ')}</p>
                                </div>
                              )}
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
