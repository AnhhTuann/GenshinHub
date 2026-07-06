'use client';

import React, { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { CharacterSelect } from './team-form/CharacterSelect';
import { MultiImageSelect } from './team-form/MultiImageSelect';
import { SubstatPicker } from './team-form/SubstatPicker';

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

  const handleMoveMemberUp = (idx: number) => {
    if (idx === 0) return;
    const newMembers = [...members];
    [newMembers[idx - 1], newMembers[idx]] = [newMembers[idx], newMembers[idx - 1]];
    setMembers(newMembers);
  };

  const handleMoveMemberDown = (idx: number) => {
    if (idx === members.length - 1) return;
    const newMembers = [...members];
    [newMembers[idx + 1], newMembers[idx]] = [newMembers[idx], newMembers[idx + 1]];
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
        
        toast.success("Team updated!");
        onSave({ id: initialData.id, ...input });
      } else {
        const data = await fetchGraphQL(`mutation AddTeam($characterId: String!, $name: String!, $rank: String!, $description: String!, $members: [TeamMemberInput!]!) {
          addCharacterTeam(characterId: $characterId, name: $name, rank: $rank, description: $description, members: $members) {
            id
          }
        }`, { characterId, ...input });
        
        toast.success("Team added!");
        onSave({ id: data.addCharacterTeam.id, ...input });
      }
      onClose();
    } catch (e: any) {
      toast.error("Error: " + e.message);
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
              <select value={rank} onChange={e => setRank(e.target.value)} className="w-full bg-[#0d0d14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500/50 outline-none">
                <option className="bg-[#0d0d14] text-white" value="SS">SS Tier</option>
                <option className="bg-[#0d0d14] text-white" value="S">S Tier</option>
                <option className="bg-[#0d0d14] text-white" value="A">A Tier</option>
                <option className="bg-[#0d0d14] text-white" value="B">B Tier</option>
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
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Member {idx + 1}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleMoveMemberUp(idx)}
                      disabled={idx === 0}
                      className="w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveMemberDown(idx)}
                      disabled={idx === members.length - 1}
                      className="w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move Down"
                    >
                      ↓
                    </button>
                  </div>
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
