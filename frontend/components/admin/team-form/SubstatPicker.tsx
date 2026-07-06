import React from 'react';

const COMMON_STATS = [
  'HP%', 'ATK%', 'DEF%', 'Energy Recharge', 'Elemental Mastery',
  'CRIT Rate', 'CRIT DMG', 'Healing Bonus',
  'Elemental DMG Bonus', 'Pyro DMG Bonus', 'Hydro DMG Bonus', 'Cryo DMG Bonus',
  'Electro DMG Bonus', 'Anemo DMG Bonus', 'Geo DMG Bonus',
  'Dendro DMG Bonus', 'Physical DMG Bonus'
];

export function SubstatPicker({ values, onChange }: any) {
  const toggleStat = (stat: string) => {
    if (values.includes(stat)) onChange(values.filter((s: string) => s !== stat));
    else onChange([...values, stat]); // Appends to preserve order
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {COMMON_STATS.map(stat => {
        const active = values.includes(stat);
        const index = values.indexOf(stat);
        return (
          <button
            type="button"
            key={stat}
            onClick={() => toggleStat(stat)}
            className={`px-2 py-1 rounded text-[10px] font-bold transition-all border flex items-center gap-1 ${
              active 
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
                : 'bg-white/[0.02] text-white/40 border-white/5 hover:bg-white/10'
            }`}
          >
            {active && <span className="w-3 h-3 rounded-full bg-cyan-500/30 text-cyan-200 flex items-center justify-center text-[8px]">{index + 1}</span>}
            {stat}
          </button>
        );
      })}
    </div>
  );
}
