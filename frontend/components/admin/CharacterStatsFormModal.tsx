'use client';

import { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';

interface StatEntry {
  level: string;
  ascend: number;
  baseHp: number;
  baseAtk: number;
  baseDef: number;
  specialStatName: string;
  specialStatValue: string;
}

interface Props {
  characterId: string;
  initialStats: StatEntry[];
  onClose: () => void;
  onSaved: () => void;
}

export default function CharacterStatsFormModal({ characterId, initialStats, onClose, onSaved }: Props) {
  const [stats, setStats] = useState<StatEntry[]>(initialStats || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // stats is a JSON object. We just pass it as string to GraphQL JSON type?
      // Wait, graphql-type-json allows passing raw JSON object.
      await fetchGraphQL(`
        mutation UpdateCharacterStats($id: String!, $stats: JSON!) {
          updateCharacterStats(id: $id, stats: $stats) {
            id
          }
        }
      `, {
        id: characterId,
        stats: stats
      });
      onSaved();
      onClose();
    } catch (err: any) {
      toast.error("Error: " + err.message);
      setLoading(false);
    }
  };

  const addRow = () => {
    setStats([...stats, {
      level: 'Lv.90',
      ascend: 6,
      baseHp: 10000,
      baseAtk: 300,
      baseDef: 700,
      specialStatName: 'CRIT DMG',
      specialStatValue: '0.0%'
    }]);
  };

  const removeRow = (idx: number) => {
    const newStats = [...stats];
    newStats.splice(idx, 1);
    setStats(newStats);
  };

  const updateRow = (idx: number, field: keyof StatEntry, value: string | number) => {
    const newStats = [...stats];
    newStats[idx] = { ...newStats[idx], [field]: value };
    setStats(newStats);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black text-white">✏️ Edit Character Stats</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
          <div className="flex flex-col gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-wrap gap-3 items-end bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <div className="flex-1 min-w-[80px]">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Level</label>
                  <input type="text" value={stat.level} onChange={e => updateRow(idx, 'level', e.target.value)} className="w-full bg-[#050508] border border-white/10 rounded px-3 py-2 text-sm text-gray-200" />
                </div>
                <div className="w-[80px]">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Ascend</label>
                  <input type="number" value={stat.ascend} onChange={e => updateRow(idx, 'ascend', parseInt(e.target.value) || 0)} className="w-full bg-[#050508] border border-white/10 rounded px-3 py-2 text-sm text-gray-200" />
                </div>
                <div className="flex-1 min-w-[80px]">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Base HP</label>
                  <input type="number" value={stat.baseHp} onChange={e => updateRow(idx, 'baseHp', parseInt(e.target.value) || 0)} className="w-full bg-[#050508] border border-white/10 rounded px-3 py-2 text-sm text-gray-200" />
                </div>
                <div className="flex-1 min-w-[80px]">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Base ATK</label>
                  <input type="number" value={stat.baseAtk} onChange={e => updateRow(idx, 'baseAtk', parseInt(e.target.value) || 0)} className="w-full bg-[#050508] border border-white/10 rounded px-3 py-2 text-sm text-gray-200" />
                </div>
                <div className="flex-1 min-w-[80px]">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Base DEF</label>
                  <input type="number" value={stat.baseDef} onChange={e => updateRow(idx, 'baseDef', parseInt(e.target.value) || 0)} className="w-full bg-[#050508] border border-white/10 rounded px-3 py-2 text-sm text-gray-200" />
                </div>
                <div className="flex-[2] min-w-[120px]">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Special Stat</label>
                  <input type="text" value={stat.specialStatName} onChange={e => updateRow(idx, 'specialStatName', e.target.value)} className="w-full bg-[#050508] border border-white/10 rounded px-3 py-2 text-sm text-gray-200" placeholder="CRIT DMG" />
                </div>
                <div className="flex-1 min-w-[100px]">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Value</label>
                  <input type="text" value={stat.specialStatValue} onChange={e => updateRow(idx, 'specialStatValue', e.target.value)} className="w-full bg-[#050508] border border-white/10 rounded px-3 py-2 text-sm text-gray-200" placeholder="38.4%" />
                </div>
                <button onClick={() => removeRow(idx)} className="h-[38px] px-3 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 font-bold text-sm">
                  🗑️
                </button>
              </div>
            ))}
            
            <button onClick={addRow} className="w-full py-3 border border-dashed border-white/20 rounded-xl text-gray-400 font-bold hover:bg-white/5 hover:text-white transition-colors">
              ➕ Add Stat Level
            </button>
          </div>
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
            {loading ? 'Saving...' : 'Save Stats'}
          </button>
        </div>
      </div>
    </div>
  );
}
