'use client';

import { useState, useEffect, useMemo } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface CharacterData {
  id: string;
  nameEn: string;
  nameVi: string;
  avatarUrl: string;
}

interface Props {
  characterId: string;
  initialTeams: string[];
  onClose: () => void;
  onSaved: () => void;
}

export default function InlineTeammatesEditor({ characterId, initialTeams, onClose, onSaved }: Props) {
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [search, setSearch] = useState('');
  const [teams, setTeams] = useState<string[]>(initialTeams || []);
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGraphQL(GET_CHARACTERS).then(data => {
      setCharacters(data.characters || []);
    }).catch(err => console.error(err));
    
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const filteredCharacters = useMemo(() => {
    if (!search.trim()) return characters;
    return characters.filter(c => 
      c.nameEn.toLowerCase().includes(search.toLowerCase()) || 
      c.nameVi.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [characters, search]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await fetchGraphQL(`
        mutation UpdateCharacterTeams($id: String!, $teams: [String!]!) {
          updateCharacterTeams(id: $id, teams: $teams) { id }
        }
      `, {
        id: characterId,
        teams
      });
      onSaved();
      onClose();
    } catch (err: any) {
      toast.error("Error: " + err.message);
      setLoading(false);
    }
  };

  const toggleTeammate = (id: string) => {
    if (teams.includes(id)) {
      setTeams(teams.filter(t => t !== id));
    } else {
      setTeams([...teams, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-black text-white">✏️ Edit Recommended Teammates</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">✕</button>
        </div>

        <div className="p-5 flex flex-col gap-4 border-b border-white/10 shrink-0 bg-white/[0.01]">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Current Teammates ({teams.length})</h3>
          <div className="flex flex-wrap gap-2">
            {teams.length === 0 ? (
              <span className="text-sm text-gray-600">No teammates selected.</span>
            ) : (
              teams.map(tid => {
                const char = characters.find(c => c.id === tid);
                return (
                  <div key={tid} className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl p-1.5 pr-3">
                    <div className="relative w-6 h-6 rounded overflow-hidden">
                      {char ? (
                        <FallbackImage src={char.avatarUrl} alt={char.nameEn} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full bg-white/10" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-blue-300">{char ? char.nameEn : tid}</span>
                    <button onClick={() => toggleTeammate(tid)} className="ml-1 text-blue-400 hover:text-white">✕</button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
          <input
            type="text"
            placeholder="Search characters to add..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#050508] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-blue-500/50 mb-4"
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {filteredCharacters.map(c => {
              const isSelected = teams.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => toggleTeammate(c.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all text-center ${
                    isSelected 
                      ? 'border-blue-500/50 bg-blue-500/10' 
                      : 'border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                    <FallbackImage src={c.avatarUrl} alt={c.nameEn} fill className="object-cover" unoptimized />
                    {isSelected && (
                      <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                        <span className="text-white text-lg font-black drop-shadow-md">✓</span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-gray-300 line-clamp-1 w-full">{c.nameEn}</span>
                </button>
              );
            })}
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
            className="px-6 py-2.5 rounded-xl text-sm font-black bg-blue-500 hover:bg-blue-400 text-white transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Teammates'}
          </button>
        </div>
      </div>
    </div>
  );
}
