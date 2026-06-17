'use client';

import React, { useState, useEffect } from 'react';

interface StatEntry {
  level: string; // e.g., "Lv.1", "Lv.20", "Lv.40"
  ascend: number;
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  specialStatName: string; // e.g., "CRIT DMG"
  specialStatValue: string; // e.g., "38.4%"
}

interface CharacterStatsSectionProps {
  stats?: StatEntry[] | null;
  baseHp?: number;
  baseAtk?: number;
  baseDef?: number;
}

import { useRouter } from 'next/navigation';
import CharacterStatsFormModal from '../admin/CharacterStatsFormModal';

export default function CharacterStatsSection({ stats, baseHp, baseAtk, baseDef, characterId }: CharacterStatsSectionProps & { characterId: string }) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_key'));
  }, []);

  // Extract unique levels for the tabs
  const levels = stats ? Array.from(new Set(stats.map(s => s.level))) : ['Lv.1', 'Lv.20', 'Lv.40', 'Lv.50', 'Lv.60', 'Lv.70', 'Lv.80', 'Lv.90'];
  const [activeLevel, setActiveLevel] = useState(levels[levels.length - 1]);

  // If no stats provided, generate mock data based on base stats just to show the UI
  const mockStats: StatEntry[] = levels.flatMap((lv, idx) => {
    const ascendBase = Math.floor(idx * 0.8);
    const hp = (baseHp || 1000) * (1 + idx * 0.5);
    const atk = (baseAtk || 100) * (1 + idx * 0.5);
    const def = (baseDef || 50) * (1 + idx * 0.5);
    
    const before: StatEntry = {
      level: lv,
      ascend: ascendBase,
      baseHp: Math.round(hp),
      baseAtk: Math.round(atk),
      baseDef: Math.round(def),
      specialStatName: 'CRIT DMG',
      specialStatValue: `${(50 + idx * 4.8).toFixed(1)}%`
    };
    
    // For levels that can ascend, add an "after ascension" stat
    if (lv !== 'Lv.1' && lv !== 'Lv.90') {
      const after: StatEntry = {
        ...before,
        ascend: ascendBase + 1,
        baseHp: Math.round(hp * 1.1),
        baseAtk: Math.round(atk * 1.1),
        baseDef: Math.round(def * 1.1),
        specialStatValue: `${(50 + (idx + 0.5) * 4.8).toFixed(1)}%`
      };
      return [before, after];
    }
    return [before];
  });

  const displayStats = stats && stats.length > 0 ? stats : mockStats;
  const currentStats = displayStats.filter(s => s.level === activeLevel);
  const before = currentStats[0];
  const after = currentStats.length > 1 ? currentStats[1] : currentStats[0];

  const specialName = before?.specialStatName || 'Special Stat';

  return (
    <div className="bg-transparent border border-white/5 rounded-2xl p-5 mb-8 relative group/section">
      {isAdmin && (
        <button
          onClick={() => setIsEditing(true)}
          className="absolute top-5 right-5 z-10 opacity-0 group-hover/section:opacity-100 px-3 py-1 bg-cyan-500/20 text-cyan-300 text-xs font-bold rounded hover:bg-cyan-500/30 transition-all border border-cyan-500/30"
        >
          ✏️ Edit Stats
        </button>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {levels.map(lv => (
          <button
            key={lv}
            onClick={() => setActiveLevel(lv)}
            className={`px-4 py-2 rounded-lg font-semibold text-[13px] transition-all ${
              activeLevel === lv 
                ? 'bg-[#e6cc98] text-[#1a1a24] shadow-md' 
                : 'bg-[#2a2a35]/60 text-white/60 hover:bg-[#2a2a35] hover:text-white'
            }`}
          >
            {lv}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[#2a2a35]/40 text-white font-bold text-[13px] border-b border-white/5">
              <th className="p-4 w-1/3"></th>
              <th className="p-4 w-1/3">Before Ascension</th>
              <th className="p-4 w-1/3">After Ascension</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 font-bold text-white/70">Ascend</td>
              <td className="p-4 font-bold text-white">{before?.ascend ?? '-'}</td>
              <td className="p-4 font-bold text-white">{after?.ascend ?? '-'}</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 font-bold text-white/70">Base HP</td>
              <td className="p-4 font-bold text-white">{before?.baseHp ?? '-'}</td>
              <td className="p-4 font-bold text-white">{after?.baseHp ?? '-'}</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 font-bold text-white/70">Base ATK</td>
              <td className="p-4 font-bold text-white">{before?.baseAtk ?? '-'}</td>
              <td className="p-4 font-bold text-white">{after?.baseAtk ?? '-'}</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 font-bold text-white/70">Base DEF</td>
              <td className="p-4 font-bold text-white">{before?.baseDef ?? '-'}</td>
              <td className="p-4 font-bold text-white">{after?.baseDef ?? '-'}</td>
            </tr>
            <tr className="hover:bg-white/[0.02] transition-colors">
              <td className="p-4 font-bold text-white/70">{specialName}</td>
              <td className="p-4 font-bold text-white">{before?.specialStatValue ?? '-'}</td>
              <td className="p-4 font-bold text-white">{after?.specialStatValue ?? '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {isEditing && (
        <CharacterStatsFormModal
          characterId={characterId}
          initialStats={stats || mockStats}
          onClose={() => setIsEditing(false)}
          onSaved={() => router.refresh()}
        />
      )}
    </div>
  );
}
