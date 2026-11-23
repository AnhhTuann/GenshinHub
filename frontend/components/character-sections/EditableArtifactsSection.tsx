'use client';

import { useAdmin } from '@/hooks/useAdmin';

import { useState, useEffect } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { useLocale } from 'next-intl';
import { Gem } from 'lucide-react';
import InlineArtifactEditor from '@/components/admin/InlineArtifactEditor';
import { fetchGraphQLAdmin } from '@/lib/graphql/client';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/utils/confirm';
import { artifactDisplayName, isUnverifiedArtifact } from '@/lib/artifact-display';

interface CatalogArtifact {
  id: string;
  nameEn: string;
  nameVi?: string;
  iconUrl?: string | null;
}

interface Props {
  readOnly?: boolean;
  showBestInSlot?: boolean;
  characterId: string;
  bestArtifacts: any[];
  tArtifacts: string;
  catalog: CatalogArtifact[];
}

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="char-guide-section-head">
      <span className={`char-guide-section-accent ${accent}`} />
      <span className="char-guide-section-title">{label}</span>
    </div>
  );
}

function ArtifactThumbnail({ image, catalogImage }: { image?: string | null; catalogImage?: string | null }) {
  const source = image?.trim() || catalogImage;
  return (
    <span className="atlas-artifact-thumbnail char-guide-thumb">
      {source
        ? <FallbackImage src={source} externalSrc={catalogImage !== source ? catalogImage ?? undefined : undefined}
            alt="" fill sizes="64px" className="object-contain p-1" />
        : <Gem size={24} aria-hidden="true" />}
    </span>
  );
}

export default function EditableArtifactsSection({ characterId, bestArtifacts, tArtifacts, catalog, readOnly = false, showBestInSlot = true }: Props) {
  function findIcon(id: string | undefined, nameEn: string | undefined, nameVi: string | undefined) {
    const match = catalog.find(set => set.id === id) ?? catalog.find(set =>
      (nameEn && set.nameEn.trim().toLowerCase() === nameEn.trim().toLowerCase()) ||
      (nameVi && set.nameVi?.trim().toLowerCase() === nameVi.trim().toLowerCase())
    );
    return match?.iconUrl;
  }

  const locale = useLocale();
  const { isAdmin: admin } = useAdmin();
  const isAdmin = admin && !readOnly;
  const [isEditing, setIsEditing] = useState(false);
  const [localArtifacts, setLocalArtifacts] = useState(bestArtifacts);
  const [draggedItemIdx, setDraggedItemIdx] = useState<number | null>(null);
  const [dragOverItemIdx, setDragOverItemIdx] = useState<number | null>(null);
  const [activeConstellation, setActiveConstellation] = useState<string>('C0');

  // Derive available constellations from data, always ensuring 'C0' is present
  const availableConstellations = Array.from(new Set(bestArtifacts.map(a => a.constellation || 'C0')));
  if (!availableConstellations.includes('C0')) availableConstellations.push('C0');
  availableConstellations.sort();

  useEffect(() => {
    setLocalArtifacts(bestArtifacts);
  }, [bestArtifacts]);

  

  const handleDragStart = (idx: number) => {
    setDraggedItemIdx(idx);
  };

  const handleDragEnter = (idx: number) => {
    setDragOverItemIdx(idx);
  };

  const saveNewOrder = async (newArtifacts: any[]) => {
    setLocalArtifacts(newArtifacts);
    try {
      const artifactIds = newArtifacts.map(a => a.id);
      await fetchGraphQLAdmin(`mutation ReorderArtifacts($artifactIds: [String!]!) { reorderCharacterArtifacts(artifactIds: $artifactIds) }`, { artifactIds });
      toast.success("Artifact order updated");
    } catch (e: any) {
      toast.error("Failed to reorder: " + e.message);
    }
  };

  const handleDragEnd = () => {
    if (draggedItemIdx !== null && dragOverItemIdx !== null && draggedItemIdx !== dragOverItemIdx) {
      const newArtifacts = [...localArtifacts];
      const [draggedArtifact] = newArtifacts.splice(draggedItemIdx, 1);
      newArtifacts.splice(dragOverItemIdx, 0, draggedArtifact);
      saveNewOrder(newArtifacts);
    }
    setDraggedItemIdx(null);
    setDragOverItemIdx(null);
  };

  const handleMoveUp = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (idx === 0) return;
    const newArtifacts = [...localArtifacts];
    [newArtifacts[idx - 1], newArtifacts[idx]] = [newArtifacts[idx], newArtifacts[idx - 1]];
    saveNewOrder(newArtifacts);
  };

  const handleMoveDown = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (idx === localArtifacts.length - 1) return;
    const newArtifacts = [...localArtifacts];
    [newArtifacts[idx + 1], newArtifacts[idx]] = [newArtifacts[idx], newArtifacts[idx + 1]];
    saveNewOrder(newArtifacts);
  };

  const handleRemove = async (id: string) => {
    if (!await confirmDialog('Are you sure you want to remove this artifact set?')) return;
    // Optimistic update: remove immediately
    const prev = localArtifacts;
    setLocalArtifacts(localArtifacts.filter(a => a.id !== id));
    try {
      await fetchGraphQLAdmin(`mutation { removeCharacterArtifact(id: "${id}") }`);
      toast.success('Artifact removed');
    } catch (err: any) {
      setLocalArtifacts(prev); // rollback
      toast.error("Error: " + err.message);
    }
  };

  return (
    <section className="atlas-surface p-5 sm:p-6 relative group/section h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <SectionHeader label={tArtifacts} accent="bg-[var(--accent-primary)]" />
        
        <div className="flex items-center gap-4">
          {/* Constellation Switcher */}
          {(availableConstellations.length > 1 || isAdmin) && (
            <div className="flex items-center bg-[var(--bg-elevated)] border border-[var(--border-default)] rounded-lg p-1">
              {['C0', 'C1', 'C2', 'C4', 'C6'].map(c => {
                if (!isAdmin && !availableConstellations.includes(c)) return null;
                const isActive = activeConstellation === c;
                return (
                  <button
                    key={c}
                    onClick={() => setActiveConstellation(c)}
                    className={`px-3 py-1 text-xs font-black uppercase tracking-wider rounded-md transition-colors ${
                      isActive ? 'bg-[var(--accent-primary-dim)] text-[var(--accent-primary-light)] border border-[var(--border-accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-transparent'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          )}

          {isAdmin && (
            <button 
              onClick={() => setIsEditing(true)}
              className="atlas-add-action"
            >
              ➕ Add Artifact
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {localArtifacts.filter(a => (a.constellation || 'C0') === activeConstellation).map((artifact: any, idx: number) => (
          <div 
            key={artifact.id || idx} 
            draggable={isAdmin}
            onDragStart={() => isAdmin && handleDragStart(idx)}
            onDragEnter={() => isAdmin && handleDragEnter(idx)}
            onDragEnd={isAdmin ? handleDragEnd : undefined}
            onDragOver={(e) => { if(isAdmin) e.preventDefault(); }}
            data-rarity={artifact.rarity ?? 5}
            className={`char-guide-item relative group/acard p-3 sm:p-4 flex flex-col gap-3 ${isAdmin ? 'cursor-move' : ''} ${
              dragOverItemIdx === idx ? 'scale-[1.01] z-10' : ''
            } ${draggedItemIdx === idx ? 'opacity-40' : 'opacity-100'}`}
          >
            <div className="flex items-center gap-3">
              <span className="char-guide-rank">{idx + 1}</span>
              {(idx !== 0 || (showBestInSlot && !artifact.id?.startsWith('build-'))) && (
                <span className={`char-guide-badge shrink-0 ${idx === 0 ? 'is-best' : 'is-alt'}`}>
                  {idx === 0 ? 'Best-in-Slot' : 'Alternative'}
                </span>
              )}
              <span className="char-guide-rarity" aria-label={locale === 'vi' ? `${artifact.rarity ?? 5} sao` : `${artifact.rarity ?? 5} stars`}>
                {artifact.rarity ?? 5}★
              </span>
              <div className="char-guide-divider" />
              {isAdmin && (
                <div className="opacity-0 group-hover/acard:opacity-100 transition-opacity flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    onClick={(e) => handleMoveUp(e, idx)}
                    disabled={idx === 0}
                    className="w-6 h-6 flex items-center justify-center rounded bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={(e) => handleMoveDown(e, idx)}
                    disabled={idx === localArtifacts.length - 1}
                    className="w-6 h-6 flex items-center justify-center rounded bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <div className="w-[1px] h-4 bg-[var(--border-default)] self-center mx-0.5" />
                  <button
                    onClick={() => handleRemove(artifact.id)}
                    className="w-6 h-6 rounded bg-[color-mix(in_srgb,var(--danger-ink)_12%,var(--bg-surface))] text-[var(--danger-ink)] hover:bg-[var(--danger-ink)] hover:text-[var(--bg-surface)] transition-all flex items-center justify-center"
                    title="Remove Artifact"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            {artifact.mixSets && artifact.mixSets.length > 0 ? (
              <div className="char-guide-set-panel">
                {artifact.mixSets.map((mix: any, mIdx: number) => (
                  <div key={mIdx} className="char-guide-set-row">
                    <ArtifactThumbnail image={mix.iconUrl} catalogImage={findIcon(mix.artifactSetId, mix.nameEn, mix.nameVi)} />
                    <div className="flex-1 min-w-0">
                      <h4 className="char-guide-set-name">{locale === 'en' ? mix.nameEn : (mix.nameVi || mix.nameEn)}</h4>
                      <p className="char-guide-pieces">{locale === 'en' ? '2-Piece Set' : 'Bộ 2 món'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="char-guide-set-row">
                {!isUnverifiedArtifact(artifact.setNameEn) && (
                  <ArtifactThumbnail image={artifact.iconUrl} catalogImage={findIcon(artifact.artifactSetId, artifact.setNameEn, artifact.setNameVi)} />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="char-guide-set-name">{artifactDisplayName(artifact.setNameEn, artifact.setNameVi, locale)}</h4>
                  <p className="char-guide-pieces">
                    {isUnverifiedArtifact(artifact.setNameEn)
                      ? (locale === 'en' ? 'No verified recommendation available' : 'Chưa có khuyến nghị đã xác minh')
                      : `${artifact.pieces}${locale === 'en' ? '-Piece Set' : ' Món'}`}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
        {bestArtifacts.length === 0 && (
          <p className="text-sm text-[var(--text-secondary)] italic">No recommended artifacts yet.</p>
        )}
      </div>

      {isEditing && (
        <InlineArtifactEditor 
          characterId={characterId} 
          defaultConstellation={activeConstellation}
          onClose={() => setIsEditing(false)} 
          onSaved={(newArtifact: any) => {
            setLocalArtifacts(prev => [...prev, newArtifact]);
            toast.success('Artifact added');
          }} 
        />
      )}
    </section>
  );
}
