'use client';

import { useAdmin } from '@/hooks/useAdmin';
import { useState } from 'react';
import { useLocale } from 'next-intl';
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

export default function CharacterStatsSection({ stats, characterId }: {
  stats?: StatEntry[] | null;
  characterId: string;
}) {
  const vi = useLocale() === 'vi';
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);

  const displayStats = Array.isArray(stats) ? stats : [];
  const levels = Array.from(new Set(displayStats.map(stat => stat.level)));
  const [selectedLevel, setSelectedLevel] = useState<string>();
  const activeLevel = selectedLevel && levels.includes(selectedLevel) ? selectedLevel : levels.at(-1);
  const currentStats = displayStats.filter(stat => stat.level === activeLevel);
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

      {displayStats.length === 0 ? (
        <p role="status">{vi ? 'Chưa có dữ liệu chỉ số theo cấp.' : 'Level stats are unavailable.'}</p>
      ) : (
        <>
          <div className="character-level-selector" role="group" aria-label={vi ? 'Cấp nhân vật' : 'Character level'}>
            {levels.map(lv => (
              <button
                key={lv}
                onClick={() => setSelectedLevel(lv)}
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
                  <th scope="col">{vi ? 'Chỉ số' : 'Stat'}</th>
                  <th scope="col">{vi ? 'Trước đột phá' : 'Before Ascension'}</th>
                  <th scope="col">{vi ? 'Sau đột phá' : 'After Ascension'}</th>
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
        </>
      )}

      {isEditing && (
        <CharacterStatsFormModal
          characterId={characterId}
          initialStats={displayStats}
          onClose={() => setIsEditing(false)}
          onSaved={() => router.refresh()}
        />
      )}
    </div>
  );
}
