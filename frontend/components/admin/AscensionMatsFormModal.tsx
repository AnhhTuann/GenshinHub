'use client';

import { useState, useEffect, useMemo } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { fetchGraphQL } from '@/lib/graphql';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { useLocale } from 'next-intl';

interface MatItem {
  materialId: string;
  count: number;
}

interface AscensionLevelCost {
  level: string;
  mora: number;
  items: MatItem[];
}

interface Props {
  characterId: string;
  initialMats: AscensionLevelCost[];
  allMaterials: any[];
  onClose: () => void;
  onSaved: () => void;
}

export default function AscensionMatsFormModal({ characterId, initialMats, allMaterials, onClose, onSaved }: Props) {
  const [mats, setMats] = useState<AscensionLevelCost[]>(initialMats || []);
  const [loading, setLoading] = useState(false);
  const [activeLevelIdx, setActiveLevelIdx] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const locale = useLocale();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetchGraphQL(`
        mutation UpdateCharacterAscensionMats($id: String!, $ascensionMats: JSON!) {
          updateCharacterAscensionMats(id: $id, ascensionMats: $ascensionMats) {
            id
          }
        }
      `, {
        id: characterId,
        ascensionMats: mats
      });
      onSaved();
      onClose();
    } catch (err: any) {
      toast.error("Error: " + err.message);
      setLoading(false);
    }
  };

  const addLevel = () => {
    setMats([...mats, {
      level: 'Lv.',
      mora: 0,
      items: []
    }]);
  };

  const removeLevel = (idx: number) => {
    const newMats = [...mats];
    newMats.splice(idx, 1);
    setMats(newMats);
    if (activeLevelIdx === idx) setActiveLevelIdx(null);
  };

  const updateLevel = (idx: number, field: keyof AscensionLevelCost, value: any) => {
    const newMats = [...mats];
    newMats[idx] = { ...newMats[idx], [field]: value };
    setMats(newMats);
  };

  const addItemToLevel = (levelIdx: number, materialId: string) => {
    const newMats = [...mats];
    const items = [...newMats[levelIdx].items];
    if (!items.find(i => i.materialId === materialId)) {
      items.push({ materialId, count: 1 });
      newMats[levelIdx].items = items;
      setMats(newMats);
    }
  };

  const updateItemCount = (levelIdx: number, itemIdx: number, count: number) => {
    const newMats = [...mats];
    const items = [...newMats[levelIdx].items];
    items[itemIdx].count = count;
    newMats[levelIdx].items = items;
    setMats(newMats);
  };

  const removeItem = (levelIdx: number, itemIdx: number) => {
    const newMats = [...mats];
    const items = [...newMats[levelIdx].items];
    items.splice(itemIdx, 1);
    newMats[levelIdx].items = items;
    setMats(newMats);
  };

  const filteredMaterials = useMemo(() => {
    if (!search.trim()) return allMaterials.slice(0, 20); // show some default
    const lower = search.toLowerCase();
    return allMaterials.filter(m => m.nameEn.toLowerCase().includes(lower) || m.nameVi.toLowerCase().includes(lower) || m.id.toLowerCase().includes(lower)).slice(0, 50);
  }, [allMaterials, search]);

  const getMatIcon = (id: string) => {
    const found = allMaterials.find(m => m.id === id);
    return found?.iconUrl || '';
  };

  const getValidIconUrl = (url: string | undefined): string => {
    if (!url) return '';
    let finalUrl = url;
    if (!finalUrl.startsWith('http') && !finalUrl.startsWith('/')) {
      finalUrl = `https://gi.yatta.moe/assets/UI/${finalUrl}`;
    }
    if (finalUrl.includes('enka.network/ui/')) {
      finalUrl = finalUrl.replace('https://enka.network/ui/', 'https://gi.yatta.moe/assets/UI/');
    }
    if (!finalUrl.match(/\.(png|jpg|jpeg|webp|svg)$/)) {
      finalUrl += '.webp';
    }
    return finalUrl;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black text-white">✏️ Edit Ascension Materials</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left: Levels & Items (60%) */}
          <div className="w-3/5 p-5 overflow-y-auto custom-scrollbar border-r border-white/10 flex flex-col gap-5">
            {mats.map((mat, lvIdx) => (
              <div 
                key={lvIdx} 
                className={`bg-white/[0.02] border p-4 rounded-xl transition-colors ${activeLevelIdx === lvIdx ? 'border-amber-500/50 bg-amber-500/5' : 'border-white/5'}`}
                onClick={() => setActiveLevelIdx(lvIdx)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-24">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Level</label>
                    <input type="text" value={mat.level} onChange={e => updateLevel(lvIdx, 'level', e.target.value)} className="w-full bg-[#050508] border border-white/10 rounded px-3 py-2 text-sm text-gray-200" placeholder="Lv.40" />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1 block">Mora Cost</label>
                    <input type="number" value={mat.mora} onChange={e => updateLevel(lvIdx, 'mora', parseInt(e.target.value) || 0)} className="w-full bg-[#050508] border border-white/10 rounded px-3 py-2 text-sm text-gray-200" />
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); removeLevel(lvIdx); }} className="h-[38px] mt-[18px] px-3 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 font-bold text-sm">
                    🗑️
                  </button>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Materials Needed</label>
                  <div className="flex flex-wrap gap-2">
                    {mat.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-center bg-[#050508] border border-white/10 rounded-lg pr-1 overflow-hidden group">
                        <div className="relative w-8 h-8 bg-white/5 p-1 shrink-0">
                          {getMatIcon(item.materialId) && <FallbackImage src={getValidIconUrl(getMatIcon(item.materialId))} alt="mat" fill className="object-contain" unoptimized />}
                        </div>
                        <input 
                          type="number" 
                          value={item.count} 
                          onChange={e => updateItemCount(lvIdx, itemIdx, parseInt(e.target.value) || 0)} 
                          className="w-16 bg-transparent text-xs text-center text-white focus:outline-none" 
                        />
                        <button onClick={() => removeItem(lvIdx, itemIdx)} className="w-6 h-full text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                      </div>
                    ))}
                    {activeLevelIdx === lvIdx ? (
                      <div className="flex items-center justify-center bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded border border-amber-500/30">
                        👈 Select material from right panel
                      </div>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); setActiveLevelIdx(lvIdx); }} className="text-xs text-gray-500 hover:text-white px-2 py-1 bg-white/5 rounded">
                        + Add Material
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <button onClick={addLevel} className="w-full py-3 border border-dashed border-white/20 rounded-xl text-gray-400 font-bold hover:bg-white/5 hover:text-white transition-colors mt-2">
              ➕ Add Ascension Level
            </button>
          </div>

          {/* Right: Material Picker (40%) */}
          <div className="w-2/5 p-5 bg-[#050508] flex flex-col">
            <h3 className="text-sm font-black text-white mb-4">Select Material</h3>
            <input
              type="text"
              placeholder="Search materials by name or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#0d0d14] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-amber-500/50 mb-4"
            />
            <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2">
              {filteredMaterials.map(mat => {
                const displayName = locale === 'vi' ? mat.nameVi : mat.nameEn;
                return (
                <button
                  key={mat.id}
                  onClick={() => {
                    if (activeLevelIdx !== null) {
                      addItemToLevel(activeLevelIdx, mat.id);
                    } else {
                      toast('Select an Ascension Level on the left first!');
                    }
                  }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors text-left"
                >
                  <div className="relative w-10 h-10 shrink-0 bg-white/[0.02] rounded border border-white/5 p-1">
                    {mat.iconUrl && <FallbackImage src={getValidIconUrl(mat.iconUrl)} alt={displayName} fill className="object-contain" unoptimized />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-200">{displayName}</span>
                    <span className="text-[10px] text-gray-500 font-mono">{mat.id}</span>
                  </div>
                </button>
                );
              })}
            </div>
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
            className="px-6 py-2.5 rounded-xl text-sm font-black bg-amber-500 hover:bg-amber-400 text-black transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Mats'}
          </button>
        </div>
      </div>
    </div>
  );
}
