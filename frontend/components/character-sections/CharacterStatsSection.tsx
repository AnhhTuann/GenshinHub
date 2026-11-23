'use client';

import { useAdmin } from '@/hooks/useAdmin';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CharacterStatsFormModal from '../admin/CharacterStatsFormModal';

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

export default function CharacterStatsSection({ stats, baseHp, baseAtk, baseDef, characterId }: CharacterStatsSectionProps & { characterId: string }) {
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  

  // Extract unique levels for the tabs
  const levels = Array.isArray(stats) && stats.length > 0 ? Array.from(new Set(stats.map(s => s.level))) : ['Lv.1', 'Lv.20', 'Lv.40', 'Lv.50', 'Lv.60', 'Lv.70', 'Lv.80', 'Lv.90'];
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

  const displayStats = Array.isArray(stats) && stats.length > 0 ? stats : mockStats;
  const currentStats = displayStats.filter(s => s.level === activeLevel);
  const before = currentStats[0];
  const after = currentStats.length > 1 ? currentStats[1] : currentStats[0];

  const specialName = before?.specialStatName || 'Special Stat';

  return (
    <div className="character-stats-guide group/section">
      {isAdmin && (
        <button
          onClick={() => setIsEditing(true)}
          className="atlas-add-action mb-3"
        >
          ✏️ Edit Stats
        </button>
      )}

      {/* Tabs */}
      <div className="character-level-selector">
        {levels.map(lv => (
          <button
            key={lv}
            onClick={() => setActiveLevel(lv)}
            type="button"
            aria-pressed={activeLevel === lv}
            className="character-level-button"
          >
            {lv}
          </button>
        ))}
      </div>

      <div className="character-stats-table">
        <table>
          <thead>
            <tr>
              <th scope="col">Stat</th>
              <th scope="col">Before Ascension</th>
              <th scope="col">After Ascension</th>
            </tr>
          </thead>
          <tbody>
            {([
              ['Ascend', 'ascend'],
              ['Base HP', 'baseHp'],
              ['Base ATK', 'baseAtk'],
              ['Base DEF', 'baseDef'],
              [specialName, 'specialStatValue'],
            ] as const).map(([label, key]) => (
              <tr key={key}>
                <th scope="row">{label}</th>
                <td>{before?.[key] ?? '-'}</td>
                <td data-changed={before?.[key] !== after?.[key]}>{after?.[key] ?? '-'}</td>
              </tr>
            ))}
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
