'use client';

import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';

interface Props {
  artifactId: string;
  initialSands: string[];
  initialGoblet: string[];
  initialCirclet: string[];
  initialSubStats: string[];
  onClose: () => void;
  onSaved: () => void;
}

const COMMON_STATS = [
  'HP%', 'ATK%', 'DEF%', 'Energy Recharge', 'Elemental Mastery',
  'CRIT Rate', 'CRIT DMG', 'Healing Bonus',
  'Elemental DMG Bonus', 'Pyro DMG Bonus', 'Hydro DMG Bonus', 'Cryo DMG Bonus',
  'Electro DMG Bonus', 'Anemo DMG Bonus', 'Geo DMG Bonus',
  'Dendro DMG Bonus', 'Physical DMG Bonus'
];

export default function InlineStatsEditor({
  artifactId, initialSands, initialGoblet, initialCirclet, initialSubStats, onClose, onSaved
}: Props) {
  const [sands, setSands] = useState<string[]>(initialSands || []);
  const [goblet, setGoblet] = useState<string[]>(initialGoblet || []);
  const [circlet, setCirclet] = useState<string[]>(initialCirclet || []);
  const [subStats, setSubStats] = useState<string[]>(initialSubStats || []);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetchGraphQL(`
        mutation UpdateCharacterArtifactStats($id: String!, $sands: [String!]!, $goblet: [String!]!, $circlet: [String!]!, $subStatsPriority: [String!]!) {
          updateCharacterArtifactStats(id: $id, sands: $sands, goblet: $goblet, circlet: $circlet, subStatsPriority: $subStatsPriority)
        }
      `, {
        id: artifactId,
        sands,
        goblet,
        circlet,
        subStatsPriority: subStats
      });
      onSaved();
      onClose();
    } catch (err: any) {
      toast.error("Error: " + err.message);
      setLoading(false);
    }
  };

  const toggleStat = (list: string[], setList: (l: string[]) => void, stat: string) => {
    if (list.includes(stat)) setList(list.filter(s => s !== stat));
    else setList([...list, stat]);
  };

  const renderStatPicker = (label: string, list: string[], setList: (l: string[]) => void) => {
    // Include any currently selected stats that might not be in COMMON_STATS (e.g. legacy translated strings)
    const allOptions = Array.from(new Set([...COMMON_STATS, ...list]));
    
    return (
      <div className="mb-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">{label}</label>
        <div className="flex flex-wrap gap-2">
          {allOptions.map(stat => {
            const active = list.includes(stat);
            return (
              <button
                key={stat}
                onClick={() => toggleStat(list, setList, stat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  active 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' 
                    : 'bg-white/[0.02] text-gray-500 border-white/5 hover:bg-white/10'
                }`}
              >
                {stat}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black text-white">✏️ Edit Artifact Stats</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
          {renderStatPicker("Sands Options", sands, setSands)}
          {renderStatPicker("Goblet Options", goblet, setGoblet)}
          {renderStatPicker("Circlet Options", circlet, setCirclet)}
          {renderStatPicker("Sub-Stats Priority", subStats, setSubStats)}
        </div>

        <div className="p-5 border-t border-white/10 flex items-center justify-end gap-3 shrink-0 bg-black/20">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2.5 rounded-xl text-sm font-black bg-cyan-500 hover:bg-cyan-400 text-black transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
