'use client';

import React, { useState } from 'react';
import ScrollEntrance from '@/components/ScrollEntrance';
import CompactTeamCharacterCard from './CompactTeamCharacterCard';
import FallbackImage from '@/components/ui/FallbackImage';
import { useLocale, useTranslations } from 'next-intl';
import { useAdmin } from '@/hooks/useAdmin';
import TeamFormModal from '@/components/admin/TeamFormModal';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/utils/confirm';

const EL_TEXT: Record<string, string> = {
  Pyro:    'text-[var(--pyro)]',
  Hydro:   'text-[var(--hydro)]',
  Cryo:    'text-[var(--cryo)]',
  Electro: 'text-[var(--electro)]',
  Anemo:   'text-[var(--anemo)]',
  Geo:     'text-[var(--geo)]',
  Dendro:  'text-[var(--dendro)]',
};

interface TeamMember {
  id?: string;
  characterId: string;
  role?: string;
  roleDesc?: string;
  weapons?: string[];
  artifacts?: string[];
  substats?: string[];
}

interface MetaTeam {
  reviewStatus?: 'VERIFIED' | 'EXPERIMENTAL';
  id: string;
  name: string;
  rank: string;
  description?: string;
  members: TeamMember[];
}

interface CatalogEntry {
  nameEn: string;
  nameVi?: string;
  iconUrl?: string | null;
}

interface EditableMetaTeamsSectionProps {
  readOnly?: boolean;
  characterId: string;
  teams: MetaTeam[];
  allCharacters: (CatalogEntry & { id: string; element?: string; avatarUrl?: string })[];
  allWeapons: CatalogEntry[];
  allArtifacts: CatalogEntry[];
}

const STAT_VI: Record<string, string> = {
  'Energy Recharge': 'Hiệu Quả Nạp Nguyên Tố',
  'Elemental Mastery': 'Tinh Thông Nguyên Tố',
  'CRIT Rate': 'Tỷ Lệ Bạo Kích',
  'CRIT DMG': 'Sát Thương Bạo Kích',
  'Healing Bonus': 'Tăng Trị Liệu',
  'Physical DMG Bonus': 'Sát Thương Vật Lý',
  'Pyro DMG Bonus': 'Sát Thương Nguyên Tố Hỏa',
  'Hydro DMG Bonus': 'Sát Thương Nguyên Tố Thủy',
  'Cryo DMG Bonus': 'Sát Thương Nguyên Tố Băng',
  'Electro DMG Bonus': 'Sát Thương Nguyên Tố Lôi',
  'Anemo DMG Bonus': 'Sát Thương Nguyên Tố Phong',
  'Geo DMG Bonus': 'Sát Thương Nguyên Tố Nham',
  'Dendro DMG Bonus': 'Sát Thương Nguyên Tố Thảo',
  'ATK%': 'Tấn Công%',
  'HP%': 'HP%',
  'DEF%': 'Phòng Ngự%',
  'ATK': 'Tấn Công',
  'HP': 'HP',
  'DEF': 'Phòng Ngự',
};

const translateStat = (stat: string, locale: string) => {
  if (!stat) return stat;
  let enStat = stat;
  const viToEn = Object.entries(STAT_VI).find(([en, vi]) => vi === stat);
  if (viToEn) enStat = viToEn[0];
  if (locale === 'vi') return STAT_VI[enStat] || enStat;
  return enStat;
};

export default function EditableMetaTeamsSection({ characterId, teams, allCharacters, allWeapons, allArtifacts, readOnly = false }: EditableMetaTeamsSectionProps) {
  const { isAdmin: admin } = useAdmin();
  const isAdmin = admin && !readOnly;
  const locale = useLocale();
  const t = useTranslations('Character');
  const [localTeams, setLocalTeams] = useState(teams);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<MetaTeam | null>(null);
  const [draggedItemIdx, setDraggedItemIdx] = useState<number | null>(null);
  const [dragOverItemIdx, setDragOverItemIdx] = useState<number | null>(null);
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({});

  const toggleTeam = (teamId: string) => {
    setExpandedTeams(prev => ({ ...prev, [teamId]: !prev[teamId] }));
  };

  const handleDragStart = (idx: number) => {
    setDraggedItemIdx(idx);
  };

  const handleDragEnter = (idx: number) => {
    setDragOverItemIdx(idx);
  };

  const saveNewOrder = async (newTeams: MetaTeam[]) => {
    setLocalTeams(newTeams);
    try {
      const teamIds = newTeams.map(t => t.id);
      await fetchGraphQL(`mutation ReorderTeams($teamIds: [String!]!) { reorderCharacterTeams(teamIds: $teamIds) }`, { teamIds });
      toast.success("Team order updated");
    } catch (e) {
      toast.error("Failed to reorder: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  const handleDragEnd = () => {
    if (draggedItemIdx !== null && dragOverItemIdx !== null && draggedItemIdx !== dragOverItemIdx) {
      const newTeams = [...localTeams];
      const [draggedTeam] = newTeams.splice(draggedItemIdx, 1);
      newTeams.splice(dragOverItemIdx, 0, draggedTeam);
      saveNewOrder(newTeams);
    }
    setDraggedItemIdx(null);
    setDragOverItemIdx(null);
  };

  const handleMoveUp = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (idx === 0) return;
    const newTeams = [...localTeams];
    [newTeams[idx - 1], newTeams[idx]] = [newTeams[idx], newTeams[idx - 1]];
    saveNewOrder(newTeams);
  };

  const handleMoveDown = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (idx === localTeams.length - 1) return;
    const newTeams = [...localTeams];
    [newTeams[idx + 1], newTeams[idx]] = [newTeams[idx], newTeams[idx + 1]];
    saveNewOrder(newTeams);
  };

  const handleAddClick = () => {
    setEditingTeam(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (team: MetaTeam) => {
    setEditingTeam(team);
    setIsModalOpen(true);
  };

  const handleDelete = async (teamId: string) => {
    if (!await confirmDialog("Are you sure you want to delete this team?")) return;
    try {
      await fetchGraphQL(`mutation RemoveTeam($id: String!) { removeCharacterTeam(teamId: $id) }`, { id: teamId });
      toast.success("Team removed");
      setLocalTeams(prev => prev.filter(t => t.id !== teamId));
    } catch (e) {
      toast.error("Error: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  const handleSave = (savedTeam: MetaTeam) => {
    if (editingTeam) {
      setLocalTeams(prev => prev.map(t => t.id === savedTeam.id ? savedTeam : t));
    } else {
      setLocalTeams(prev => [...prev, savedTeam]);
    }
  };

  if (!isAdmin && localTeams.length === 0) return null;

  return (
    <ScrollEntrance delay={0.3}>
    <section className="team-guide group/section">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <span className="w-[3px] h-5 rounded-full bg-[var(--accent-primary)]" />
          <h2 className="atlas-section-title">{t('metaTeams')}</h2>
        </div>
        {isAdmin && (
          <button
            onClick={handleAddClick}
            className="atlas-add-action opacity-0 group-hover/section:opacity-100 focus-visible:opacity-100 flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Add Team
          </button>
        )}
      </div>

      <div className="team-lineups">
        {localTeams.map((team, tIdx) => (
          <div 
            key={team.id || tIdx} 
            draggable={isAdmin}
            onDragStart={() => isAdmin && handleDragStart(tIdx)}
            onDragEnter={() => isAdmin && handleDragEnter(tIdx)}
            onDragEnd={isAdmin ? handleDragEnd : undefined}
            onDragOver={(e) => { if(isAdmin) e.preventDefault(); }}
            className={`team-lineup relative group/team ${isAdmin ? 'cursor-move' : ''} ${
              dragOverItemIdx === tIdx ? 'outline outline-[var(--accent-primary)] z-10' : ''
            } ${draggedItemIdx === tIdx ? 'opacity-40' : 'opacity-100'}`}
          >
            
            {isAdmin && (
              <div className="absolute top-3 right-3 opacity-0 group-hover/team:opacity-100 group-focus-within/team:opacity-100 transition-opacity flex gap-1.5 z-10 bg-[var(--bg-elevated)] p-1.5 rounded-xl border border-[var(--border-default)] shadow-lg">
                <button
                  onClick={(e) => handleMoveUp(e, tIdx)}
                  disabled={tIdx === 0}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Up"
                >
                  ↑
                </button>
                <button
                  onClick={(e) => handleMoveDown(e, tIdx)}
                  disabled={tIdx === localTeams.length - 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move Down"
                >
                  ↓
                </button>
                <div className="w-[1px] h-4 bg-[var(--border-default)] self-center mx-0.5" />
                <button
                  onClick={() => handleEditClick(team)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--accent-primary-light)] hover:text-[var(--text-primary)]"
                  title="Edit Team"
                >
                  ✎
                </button>
                <button
                  onClick={() => handleDelete(team.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--danger-ink)_12%,var(--bg-surface))] hover:bg-[var(--danger-ink)] border border-[color-mix(in_srgb,var(--danger-ink)_30%,var(--border-default))] text-[var(--danger-ink)] hover:text-[var(--bg-surface)]"
                  title="Remove Team"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Team header */}
            <div className="team-lineup-heading">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--accent-primary-dim)] text-[var(--accent-primary-light)] flex items-center justify-center text-xs font-black border border-[var(--border-accent)]">
                  {tIdx + 1}
                </span>
                <h4 className="team-lineup-name font-display">{team.name}</h4>
              </div>
              {team.reviewStatus === 'EXPERIMENTAL' && (
                <span className="shrink-0 rounded px-2 py-0.5 text-xs font-semibold bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                  {locale === 'vi' ? 'Thử nghiệm' : 'Experimental'}
                </span>
              )}
              {team.rank && <span className={`shrink-0 px-2 py-0.5 rounded text-xs font-black uppercase tracking-wider border ${
                team.rank === 'SS' ? 'bg-[var(--gold-glow)] text-[var(--gold-ink)] border-[var(--border-gold)]'
                : team.rank === 'S' ? 'bg-[color-mix(in_srgb,var(--pyro)_12%,var(--bg-surface))] text-[var(--pyro)] border-[color-mix(in_srgb,var(--pyro)_30%,var(--border-default))]'
                : 'bg-[var(--accent-primary-dim)] text-[var(--accent-primary-light)] border-[var(--border-accent)]'
              }`}>
                {team.rank} Tier
              </span>}
            </div>

            {team.description && <p className="team-lineup-description">{team.description}</p>}

            <div className="team-roster">
              {team.members.map((member, index) => {
                const teammate = allCharacters.find(character => character.id === member.characterId);
                return (
                  <CompactTeamCharacterCard
                    key={member.id || `${member.characterId}-${index}`}
                    characterId={member.characterId}
                    name={(locale === 'vi' ? teammate?.nameVi : teammate?.nameEn) || teammate?.nameEn || member.characterId}
                    avatar={teammate?.avatarUrl}
                    element={teammate?.element}
                    role={member.role}
                  />
                );
              })}
            </div>

            <div className="team-lineup-actions">
              <button
                type="button"
                onClick={() => toggleTeam(team.id || tIdx.toString())}
                aria-expanded={!!expandedTeams[team.id || tIdx.toString()]}
                aria-controls={`team-details-${tIdx}`}
                className="team-details-toggle"
              >
                {expandedTeams[team.id || tIdx.toString()]
                  ? (locale === 'vi' ? 'Ẩn chi tiết' : 'Hide Details')
                  : (locale === 'vi' ? 'Hiện chi tiết' : 'Show Details')}
                <span aria-hidden="true">{expandedTeams[team.id || tIdx.toString()] ? '▴' : '▾'}</span>
              </button>
            </div>

            {/* Member details */}
            <div id={`team-details-${tIdx}`} hidden={!expandedTeams[team.id || tIdx.toString()]}>
            {expandedTeams[team.id || tIdx.toString()] && <div className="team-member-details">
              {team.members.map((m, mIdx) => {
                const teammate = allCharacters.find(c => c.id === m.characterId);
                const tmText   = EL_TEXT[teammate?.element ?? ''] ?? 'text-[var(--text-secondary)]';
                return (
                  <div key={mIdx} className="team-member-detail">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`font-black text-[15px] font-display ${tmText}`}>
                        {teammate ? (locale === 'en' ? teammate.nameEn : teammate.nameVi) : m.characterId}
                      </span>
                      <span className="text-[var(--text-secondary)]">·</span>
                      <span className="text-[var(--text-secondary)] text-xs font-black uppercase tracking-widest">{m.role}</span>
                    </div>
                    <p className="text-[var(--text-secondary)] text-[13px] leading-relaxed mb-4">{m.roleDesc}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1.2fr] gap-3">
                      <div className="min-w-0">
                        <span className="text-[var(--text-secondary)] text-sm font-bold block mb-3">Weapons</span>
                        <div className="flex flex-col gap-2.5">
                          {m.weapons?.map((wName: string, i: number) => {
                            const weapon = allWeapons.find(w => w.nameEn === wName);
                            const src = weapon?.iconUrl;
                            return (
                              <div key={i} className="flex items-center gap-3 bg-transparent border border-[var(--border-default)] rounded-lg p-1.5 pr-3.5 w-full" title={wName}>
                                {src && <div className="relative w-8 h-8 rounded shrink-0"><FallbackImage src={src} alt={weapon.nameEn} fill className="object-contain drop-shadow-md" /></div>}
                                <span className="text-[var(--text-secondary)] font-semibold text-[13px]">{locale === 'en' ? (weapon?.nameEn || wName) : (weapon?.nameVi || weapon?.nameEn || wName)}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <span className="text-[var(--text-secondary)] text-sm font-bold block mb-3">Artifacts</span>
                        <div className="flex flex-col gap-2.5">
                          {m.artifacts?.map((aName: string, i: number) => {
                            const match = aName.match(/^(\d+pc)\s+(.*)$/);
                            let qty = '', name = aName;
                            if (match) { qty = match[1]; name = match[2]; }
                            const artifact = allArtifacts.find(a => a.nameEn === name);
                            const src = artifact?.iconUrl;
                            return (
                              <div key={i} className="flex items-center gap-3 bg-transparent border border-[var(--border-default)] rounded-lg p-1.5 pr-3.5 w-full" title={aName}>
                                {src && <div className="relative w-8 h-8 rounded shrink-0"><FallbackImage src={src} alt={artifact.nameEn} fill className="object-contain drop-shadow-md" /></div>}
                                <span className="text-[var(--text-secondary)] font-semibold text-[13px]">
                                  {qty && <span className="text-[var(--accent-primary-light)] mr-1.5">{qty}</span>}{locale === 'en' ? (artifact?.nameEn || name) : (artifact?.nameVi || artifact?.nameEn || name)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <span className="text-[var(--text-secondary)] text-sm font-bold block mb-3">Sub-Stats</span>
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {m.substats?.map((stat: string, i: number) => (
                            <div key={i} className="flex items-center gap-1.5">
                              <span className="text-[var(--text-secondary)] font-semibold text-[13px] bg-[var(--bg-surface)] px-2.5 py-1.5 rounded-md border border-[var(--border-default)]">{translateStat(stat, locale)}</span>
                              {i < (m.substats?.length ?? 0) - 1 && <span className="text-[var(--text-secondary)] text-xs mt-0.5">›</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>}
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
        allWeapons={allWeapons}
        allArtifacts={allArtifacts}
        initialData={editingTeam}
      />
    </section>
    </ScrollEntrance>
  );
}
