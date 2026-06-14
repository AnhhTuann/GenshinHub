'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useAdmin } from '@/hooks/useAdmin';
import TeamFormModal from '../admin/TeamFormModal';
import { fetchGraphQL } from '@/lib/graphql';
import { toast } from 'react-hot-toast';

const EL_TEXT: Record<string, string> = {
  Pyro:    'text-[#ff6b4a]',
  Hydro:   'text-[#4fc3f7]',
  Cryo:    'text-[#80deea]',
  Electro: 'text-[#ce93d8]',
  Anemo:   'text-[#4db6ac]',
  Geo:     'text-[#ffd54f]',
  Dendro:  'text-[#aed581]',
};

interface EditableMetaTeamsSectionProps {
  characterId: string;
  teams: any[];
  allCharacters: any[];
}

export default function EditableMetaTeamsSection({ characterId, teams, allCharacters }: EditableMetaTeamsSectionProps) {
  const { isAdmin } = useAdmin();
  const locale = useLocale();
  const [localTeams, setLocalTeams] = useState(teams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<any | null>(null);

  const handleAddClick = () => {
    setEditingTeam(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (team: any) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  const handleDelete = async (teamId: string) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;
    try {
      await fetchGraphQL(`mutation RemoveTeam($id: String!) { removeCharacterTeam(teamId: $id) }`, { id: teamId });
      toast.success("Team removed");
      setLocalTeams(prev => prev.filter(t => t.id !== teamId));
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleSave = (savedTeam: any) => {
    if (editingTeam) {
      setLocalTeams(prev => prev.map(t => t.id === savedTeam.id ? savedTeam : t));
    } else {
      setLocalTeams(prev => [...prev, savedTeam]);
    }
  };

  if (!isAdmin && localTeams.length === 0) return null;

  return (
    <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative group/section">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="w-[3px] h-5 rounded-full bg-blue-400" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 font-display">Meta Team Comps</span>
        </div>
        {isAdmin && (
          <button
            onClick={handleAddClick}
            className="opacity-0 group-hover/section:opacity-100 transition-opacity bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 text-xs px-3 py-1.5 rounded-lg border border-blue-500/30 flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Add Team
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {localTeams.map((team, tIdx) => (
          <div key={team.id || tIdx} className="bg-[#06060a]/50 border border-white/[0.04] hover:border-blue-500/15 rounded-xl p-4 transition-colors duration-200 relative group/team">
            
            {isAdmin && (
              <div className="absolute top-3 right-3 opacity-0 group-hover/team:opacity-100 transition-opacity flex gap-2 z-10">
                <button
                  onClick={() => handleEditClick(team)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white"
                  title="Edit Team"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDelete(team.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300"
                  title="Remove Team"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Team header */}
            <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.04]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400/80 flex items-center justify-center text-xs font-black border border-blue-500/15">
                  {tIdx + 1}
                </span>
                <h4 className="font-extrabold text-white/85 text-sm font-display">{team.name}</h4>
              </div>
              <span className={`mr-16 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${
                team.rank === 'SS' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                : team.rank === 'S' ? 'bg-red-400/10 text-red-400 border-red-400/20'
                : 'bg-blue-400/10 text-blue-400 border-blue-400/20'
              }`}>
                {team.rank} Tier
              </span>
            </div>

            <p className="text-white/30 text-xs mb-4 leading-relaxed italic">{team.description}</p>

            {/* Character avatars */}
            <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mb-4 bg-[#06060a]/50 p-2.5 rounded-xl border border-white/[0.03]">
              {team.members.map((m: any, mIdx: number) => {
                const teammate = allCharacters.find(c => c.id === m.characterId);
                const tmText   = EL_TEXT[teammate?.element ?? ''] ?? 'text-white/60';
                return (
                  <Link href={`/characters/${m.characterId}`} key={mIdx} className="group/tm flex flex-col items-center gap-1">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/[0.06] group-hover/tm:border-white/15 transition-all duration-250 bg-[#0d0d14] p-0.5">
                      {teammate ? (
                        <Image src={teammate.avatarUrl} alt={teammate.nameEn} fill className="object-cover object-top rounded-lg" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[8px] text-white/25 font-bold uppercase break-all px-1">{m.characterId}</div>
                      )}
                    </div>
                    <span className="text-[8px] text-white/30 font-black group-hover/tm:text-white/55 text-center uppercase tracking-widest truncate w-full">{m.role}</span>
                    <span className={`text-[10px] font-bold text-center truncate w-full ${tmText}`}>
                      {teammate ? (locale === 'en' ? teammate.nameEn : teammate.nameVi) : m.characterId}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Member details */}
            <div className="flex flex-col gap-2.5">
              {team.members.map((m: any, mIdx: number) => {
                const teammate = allCharacters.find(c => c.id === m.characterId);
                const tmText   = EL_TEXT[teammate?.element ?? ''] ?? 'text-white/80';
                return (
                  <div key={mIdx} className="bg-[#0d0d14]/50 border border-white/[0.04] rounded-xl p-3.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`font-extrabold text-xs font-display ${tmText}`}>
                        {teammate ? (locale === 'en' ? teammate.nameEn : teammate.nameVi) : m.characterId}
                      </span>
                      <span className="text-white/20">·</span>
                      <span className="text-white/30 text-[9px] font-black uppercase tracking-wider">{m.role}</span>
                    </div>
                    <p className="text-white/35 text-xs leading-relaxed mb-3">{m.roleDesc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { label: 'Weapons',   val: m.weapons?.join(', ') || '' },
                        { label: 'Artifacts', val: m.artifacts?.join(', ') || '' },
                        { label: 'Sub-Stats', val: m.substats?.join(' › ') || '' },
                      ].map(({ label, val }) => (
                        <div key={label} className="bg-[#06060a]/60 border border-white/[0.04] rounded-lg p-2">
                          <span className="text-white/25 font-black uppercase text-[8px] tracking-wide block mb-0.5">{label}</span>
                          <span className="text-white/55 font-semibold text-[10px]">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <TeamFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        characterId={characterId}
        allCharacters={allCharacters}
        initialData={editingTeam}
      />
    </section>
  );
}
