'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { fetchGraphQL } from '@/lib/graphql';

const COMMON_STATS = [
  'HP%', 'ATK%', 'DEF%', 'Energy Recharge', 'Elemental Mastery',
  'CRIT Rate', 'CRIT DMG', 'Healing Bonus',
  'Elemental DMG Bonus', 'Pyro DMG Bonus', 'Hydro DMG Bonus', 'Cryo DMG Bonus',
  'Electro DMG Bonus', 'Anemo DMG Bonus', 'Geo DMG Bonus',
  'Dendro DMG Bonus', 'Physical DMG Bonus'
];

const CharacterSelect = ({ value, onChange, allCharacters }: any) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = allCharacters.find((c: any) => c.id === value);
  const filtered = allCharacters.filter((c: any) => c.nameEn.toLowerCase().includes(search.toLowerCase()) || c.id.includes(search.toLowerCase()));

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 outline-none cursor-pointer flex items-center justify-between">
        {selected ? (
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 rounded-full overflow-hidden bg-white/10"><Image src={selected.avatarUrl} alt="" fill className="object-cover" /></div>
            <span>{selected.nameEn}</span>
          </div>
        ) : <span className="text-white/40">Select Character...</span>}
        <span className="text-white/40 text-xs">▼</span>
      </div>
      
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-[#1a1a24] border border-white/10 rounded-xl shadow-2xl max-h-60 flex flex-col">
          <div className="p-2 border-b border-white/10 shrink-0">
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder="Search character..." className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none" />
          </div>
          <div className="overflow-y-auto custom-scrollbar p-1">
            {filtered.map((c: any) => (
              <div key={c.id} onClick={() => { onChange(c.id); setOpen(false); setSearch(''); }} className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-white/10 ${value === c.id ? 'bg-blue-500/20' : ''}`}>
                <div className="relative w-6 h-6 rounded bg-white/5"><Image src={c.avatarUrl} alt="" fill className="object-cover" /></div>
                <div className="flex flex-col"><span className="text-sm text-white leading-tight">{c.nameEn}</span><span className="text-[9px] text-white/40">{c.id}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MultiImageSelect = ({ values, onChange, options, type }: any) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = options.filter((o: any) => o.nameEn.toLowerCase().includes(search.toLowerCase()));

  const toggle = (name: string) => {
    if (values.includes(name)) onChange(values.filter((v: string) => v !== name));
    else onChange([...values, name]);
  };

  const remove = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(values.filter((v: string) => v !== name));
  };

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)} className="w-full bg-black/40 border border-white/10 rounded-lg p-1.5 min-h-[38px] cursor-pointer flex flex-wrap gap-1.5 items-center">
        {values.length === 0 && <span className="text-white/40 text-sm px-1.5 py-0.5">Select {type}...</span>}
        {values.map((val: string) => {
          const opt = options.find((o: any) => o.nameEn === val);
          const src = opt?.iconUrl || null;
          return (
            <div key={val} className="flex items-center gap-1.5 bg-white/10 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 rounded pl-1.5 pr-1 py-1 group transition-colors" onClick={(e) => remove(val, e)}>
              {src && <div className="relative w-3.5 h-3.5"><Image src={src} alt="" fill className="object-contain" /></div>}
              <span className="text-white/80 font-semibold text-[10px] truncate max-w-[100px]">{val}</span>
              <span className="text-white/30 group-hover:text-red-400 text-[10px] ml-1">✕</span>
            </div>
          );
        })}
      </div>
      
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-[#1a1a24] border border-white/10 rounded-xl shadow-2xl max-h-60 flex flex-col">
          <div className="p-2 border-b border-white/10 shrink-0">
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search ${type}...`} className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none" />
          </div>
          <div className="overflow-y-auto custom-scrollbar p-1">
            {filtered.map((o: any) => {
              const isSelected = values.includes(o.nameEn);
              const src = o.iconUrl;
              return (
                <div key={o.id || o.nameEn} onClick={() => toggle(o.nameEn)} className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-white/10 ${isSelected ? 'bg-blue-500/20 border border-blue-500/30' : 'border border-transparent'}`}>
                  {src && <div className="relative w-6 h-6 rounded bg-white/5"><Image src={src} alt="" fill className="object-contain" /></div>}
                  <span className="text-sm text-white">{o.nameEn}</span>
                  {isSelected && <span className="ml-auto text-blue-400 text-xs">✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const SubstatPicker = ({ values, onChange }: any) => {
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
};

interface TeamFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (team: any) => void;
  characterId: string;
  allCharacters: any[];
  allWeapons?: any[];
  allArtifacts?: any[];
  initialData?: any;
}

export default function TeamFormModal({ isOpen, onClose, onSave, characterId, allCharacters, allWeapons = [], allArtifacts = [], initialData }: TeamFormModalProps) {
  const [name, setName] = useState('');
  const [rank, setRank] = useState('SS');
  const [description, setDescription] = useState('');
  const [members, setMembers] = useState<any[]>([
    { characterId: '', role: 'Main DPS', roleDesc: '', weapons: [], artifacts: [], substats: [] },
    { characterId: '', role: 'Sub DPS', roleDesc: '', weapons: [], artifacts: [], substats: [] },
    { characterId: '', role: 'Support', roleDesc: '', weapons: [], artifacts: [], substats: [] },
    { characterId: '', role: 'Healer', roleDesc: '', weapons: [], artifacts: [], substats: [] },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setRank(initialData.rank);
      setDescription(initialData.description);
      const newMembers = [...initialData.members];
      while (newMembers.length < 4) {
        newMembers.push({ characterId: '', role: '', roleDesc: '', weapons: [], artifacts: [], substats: [] });
      }
      setMembers(newMembers.map(m => ({
        ...m,
        weapons: m.weapons || [],
        artifacts: m.artifacts?.map((a: string) => a.replace(/^\d+pc\s+/, '')) || [],
        substats: m.substats || [],
      })));
    } else {
      setName('');
      setRank('SS');
      setDescription('');
      setMembers([
        { characterId: characterId, role: 'Main DPS', roleDesc: '', weapons: [], artifacts: [], substats: [] },
        { characterId: '', role: 'Sub DPS', roleDesc: '', weapons: [], artifacts: [], substats: [] },
        { characterId: '', role: 'Support', roleDesc: '', weapons: [], artifacts: [], substats: [] },
        { characterId: '', role: 'Healer', roleDesc: '', weapons: [], artifacts: [], substats: [] },
      ]);
    }
  }, [initialData, characterId, isOpen]);

  if (!isOpen) return null;

  const updateMember = (index: number, field: string, value: any) => {
    const newMembers = [...members];
    newMembers[index][field] = value;
    setMembers(newMembers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedMembers = members
        .filter(m => m.characterId) // Only save members that have a character selected
        .map(m => ({
          characterId: m.characterId,
          role: m.role,
          roleDesc: m.roleDesc,
          weapons: m.weapons.filter(Boolean),
          artifacts: m.artifacts.filter(Boolean),
          substats: m.substats.filter(Boolean),
        }));

      if (formattedMembers.length === 0) {
        throw new Error("You must add at least one character to the team");
      }

      const input = {
        name,
        rank,
        description,
        members: formattedMembers
      };

      if (initialData) {
        await fetchGraphQL(`mutation UpdateTeam($teamId: String!, $name: String!, $rank: String!, $description: String!, $members: [TeamMemberInput!]!) {
          updateCharacterTeam(teamId: $teamId, name: $name, rank: $rank, description: $description, members: $members)
        }`, { teamId: initialData.id, ...input });
        
        alert("Team updated!");
        onSave({ id: initialData.id, ...input });
      } else {
        await fetchGraphQL(`mutation AddTeam($characterId: String!, $name: String!, $rank: String!, $description: String!, $members: [TeamMemberInput!]!) {
          addCharacterTeam(characterId: $characterId, name: $name, rank: $rank, description: $description, members: $members)
        }`, { characterId, ...input });
        
        alert("Team added!");
        // Generate a fake ID for local state until page reload
        onSave({ id: Math.random().toString(), ...input });
      }
      onClose();
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0d0d14] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        <div className="p-5 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0d0d14] z-10">
          <h2 className="text-lg font-bold text-white">{initialData ? 'Edit Team Comp' : 'Add Team Comp'}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-white/50 mb-1.5 uppercase tracking-wider">Team Name</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 outline-none" placeholder="e.g. Double Hydro Hu Tao" />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/50 mb-1.5 uppercase tracking-wider">Rank</label>
              <select value={rank} onChange={e => setRank(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 outline-none">
                <option value="SS">SS Tier</option>
                <option value="S">S Tier</option>
                <option value="A">A Tier</option>
                <option value="B">B Tier</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-bold text-white/50 mb-1.5 uppercase tracking-wider">Description</label>
              <textarea required rows={2} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 outline-none resize-y" placeholder="Briefly explain how this team works..." />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-white/10 pb-2">Team Members (Up to 4)</h3>
            
            {members.map((member, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                  <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Member {idx + 1}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-1 uppercase tracking-wider">Character</label>
                    <CharacterSelect value={member.characterId} onChange={(val: string) => updateMember(idx, 'characterId', val)} allCharacters={allCharacters} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-1 uppercase tracking-wider">Role</label>
                    <input value={member.role} onChange={e => updateMember(idx, 'role', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 outline-none" placeholder="e.g. Main DPS" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-1 uppercase tracking-wider">Role Description</label>
                    <input value={member.roleDesc} onChange={e => updateMember(idx, 'roleDesc', e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 outline-none" placeholder="What they do in this team" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 mb-1 uppercase tracking-wider">Weapons</label>
                      <MultiImageSelect values={member.weapons} onChange={(val: string[]) => updateMember(idx, 'weapons', val)} options={allWeapons} type="weapons" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/40 mb-1 uppercase tracking-wider">Artifacts</label>
                      <MultiImageSelect values={member.artifacts} onChange={(val: string[]) => updateMember(idx, 'artifacts', val)} options={allArtifacts} type="artifacts" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 mb-1 uppercase tracking-wider flex items-center justify-between">
                      Sub-Stats Priority
                      <span className="text-[8px] text-white/20 normal-case">Click to select in order</span>
                    </label>
                    <SubstatPicker values={member.substats} onChange={(val: string[]) => updateMember(idx, 'substats', val)} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/10 sticky bottom-0 bg-[#0d0d14]">
            <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg text-sm font-bold text-white/50 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-5 py-2 rounded-lg text-sm font-bold bg-blue-500 hover:bg-blue-400 text-white transition-colors disabled:opacity-50">
              {isLoading ? 'Saving...' : 'Save Team'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
