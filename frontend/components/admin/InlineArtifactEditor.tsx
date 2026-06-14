'use client';

import { useState, useEffect, useMemo } from 'react';
import { fetchGraphQL, GET_ARTIFACTS } from '@/lib/graphql';
import Image from 'next/image';

interface ArtifactData {
  id: string;
  nameEn: string;
  nameVi: string;
  iconUrl: string;
}

interface Props {
  characterId: string;
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

export default function InlineArtifactEditor({ characterId, onClose, onSaved }: Props) {
  const [artifacts, setArtifacts] = useState<ArtifactData[]>([]);
  const [search, setSearch] = useState('');
  
  const [isMixMode, setIsMixMode] = useState(false);
  const [selectedArtifacts, setSelectedArtifacts] = useState<ArtifactData[]>([]);
  
  const [pieces, setPieces] = useState(4);
  const [sands, setSands] = useState<string[]>([]);
  const [goblet, setGoblet] = useState<string[]>([]);
  const [circlet, setCirclet] = useState<string[]>([]);
  const [subStats, setSubStats] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGraphQL(GET_ARTIFACTS).then(data => {
      setArtifacts(data.artifacts || []);
    });
    
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const filteredArtifacts = useMemo(() => {
    if (!search.trim()) return artifacts;
    return artifacts.filter(a => a.nameEn.toLowerCase().includes(search.toLowerCase()) || (a.nameVi && a.nameVi.toLowerCase().includes(search.toLowerCase())));
  }, [artifacts, search]);

  const handleSave = async () => {
    if (selectedArtifacts.length === 0) return;
    if (isMixMode && selectedArtifacts.length !== 2) {
      alert("Vui lòng chọn đúng 2 bộ Thánh Di Vật để Mix!");
      return;
    }

    setLoading(true);
    try {
      const setNameEn = isMixMode 
        ? `Mix 2-Piece ${selectedArtifacts[0].nameEn} & 2-Piece ${selectedArtifacts[1].nameEn}`
        : selectedArtifacts[0].nameEn;
        
      const nameVi1 = selectedArtifacts[0].nameVi || selectedArtifacts[0].nameEn;
      const nameVi2 = selectedArtifacts[1] ? (selectedArtifacts[1].nameVi || selectedArtifacts[1].nameEn) : "";
        
      const setNameVi = isMixMode
        ? `Mix 2 bộ ${nameVi1} & 2 bộ ${nameVi2}`
        : nameVi1;

      await fetchGraphQL(`
        mutation AddCharacterArtifact($characterId: String!, $setNameEn: String!, $setNameVi: String!, $pieces: Int!, $sands: [String!]!, $goblet: [String!]!, $circlet: [String!]!, $subStatsPriority: [String!]!) {
          addCharacterArtifact(characterId: $characterId, setNameEn: $setNameEn, setNameVi: $setNameVi, pieces: $pieces, sands: $sands, goblet: $goblet, circlet: $circlet, subStatsPriority: $subStatsPriority)
        }
      `, {
        characterId,
        setNameEn,
        setNameVi,
        pieces,
        sands,
        goblet,
        circlet,
        subStatsPriority: subStats
      });
      onSaved();
      onClose();
    } catch (err: any) {
      alert("Error: " + err.message);
      setLoading(false);
    }
  };

  const toggleStat = (list: string[], setList: (l: string[]) => void, stat: string) => {
    if (list.includes(stat)) setList(list.filter(s => s !== stat));
    else setList([...list, stat]);
  };

  const renderStatPicker = (label: string, list: string[], setList: (l: string[]) => void) => (
    <div className="mb-4">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">{label}</label>
      <div className="flex flex-wrap gap-2">
        {COMMON_STATS.map(stat => {
          const active = list.includes(stat);
          return (
            <button
              key={stat}
              onClick={() => toggleStat(list, setList, stat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                active 
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' 
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

  const handleSelectArtifact = (a: ArtifactData) => {
    if (!isMixMode) {
      setSelectedArtifacts([a]);
      setPieces(4);
    } else {
      const isSelected = selectedArtifacts.find(sa => sa.id === a.id);
      if (isSelected) {
        setSelectedArtifacts(selectedArtifacts.filter(sa => sa.id !== a.id));
      } else if (selectedArtifacts.length < 2) {
        const newSelection = [...selectedArtifacts, a];
        setSelectedArtifacts(newSelection);
        if (newSelection.length === 2) {
          setPieces(2);
        }
      }
    }
  };

  const isSelectionComplete = isMixMode ? selectedArtifacts.length === 2 : selectedArtifacts.length === 1;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black text-white">💎 Add Best Artifact</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
          {!isSelectionComplete ? (
            <>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => { setIsMixMode(false); setSelectedArtifacts([]); }}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
                    !isMixMode ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-white/[0.02] text-gray-500 border-white/5 hover:bg-white/10'
                  }`}
                >
                  Single Set (4-Piece)
                </button>
                <button
                  onClick={() => { setIsMixMode(true); setSelectedArtifacts([]); }}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
                    isMixMode ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-white/[0.02] text-gray-500 border-white/5 hover:bg-white/10'
                  }`}
                >
                  Mix Set (2-Piece + 2-Piece)
                </button>
              </div>

              {isMixMode && (
                <div className="mb-4 text-center p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-bold">
                  {selectedArtifacts.length === 0 ? "Select 1st Artifact Set" : "Select 2nd Artifact Set"}
                </div>
              )}

              {isMixMode && selectedArtifacts.length > 0 && (
                <div className="flex gap-4 mb-4 justify-center">
                  {selectedArtifacts.map(sa => (
                    <div key={sa.id} className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-xl border border-purple-500/50">
                      <Image src={sa.iconUrl} alt={sa.nameEn} width={32} height={32} className="object-contain" unoptimized />
                      <span className="text-xs font-bold text-gray-300">{sa.nameEn}</span>
                      <button onClick={() => setSelectedArtifacts(selectedArtifacts.filter(s => s.id !== sa.id))} className="text-gray-500 hover:text-red-400">✕</button>
                    </div>
                  ))}
                </div>
              )}

              <input
                type="text"
                placeholder="Search artifact sets..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 mb-4"
                autoFocus
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredArtifacts.map(a => {
                  const isSelected = selectedArtifacts.some(sa => sa.id === a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => handleSelectArtifact(a)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center ${
                        isSelected 
                          ? 'border-purple-500/50 bg-purple-500/20' 
                          : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="relative w-12 h-12">
                        <Image src={a.iconUrl} alt={a.nameEn} fill className="object-contain" unoptimized />
                      </div>
                      <span className="text-[10px] font-bold text-gray-300">{a.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                {selectedArtifacts.map((sa, idx) => (
                  <div key={sa.id} className="flex items-center gap-4">
                    <div className="relative w-12 h-12 shrink-0">
                      <Image src={sa.iconUrl} alt={sa.nameEn} fill className="object-contain" unoptimized />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-purple-400">{sa.nameEn}</h3>
                      <span className="text-[10px] text-gray-500">{isMixMode ? "2-Piece Set Component" : "4-Piece Set"}</span>
                    </div>
                  </div>
                ))}
                <button onClick={() => setSelectedArtifacts([])} className="text-xs text-gray-500 hover:text-white mt-2 underline self-start">
                  Change Artifact{isMixMode ? 's' : ''}
                </button>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Set Pieces</label>
                <div className="flex gap-2">
                  <button
                    className="flex-1 py-2 rounded-xl text-sm font-bold border transition-all bg-purple-500/20 text-purple-300 border-purple-500/30 cursor-default"
                  >
                    {pieces}-Piece Set
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                {renderStatPicker("Sands Options", sands, setSands)}
                {renderStatPicker("Goblet Options", goblet, setGoblet)}
                {renderStatPicker("Circlet Options", circlet, setCirclet)}
                {renderStatPicker("Sub-Stats Priority", subStats, setSubStats)}
              </div>
            </div>
          )}
        </div>

        {isSelectionComplete && (
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
              className="px-6 py-2.5 rounded-xl text-sm font-black bg-purple-500 hover:bg-purple-400 text-white transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Add Artifact Set'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
