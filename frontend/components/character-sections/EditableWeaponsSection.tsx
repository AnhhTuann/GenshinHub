'use client';

import { useAdmin } from '@/hooks/useAdmin';

import { useState, useEffect } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import InlineWeaponEditor from '@/components/admin/InlineWeaponEditor';
import { fetchGraphQLAdmin } from '@/lib/graphql/client';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/utils/confirm';

interface Props {
  readOnly?: boolean;
  showBestInSlot?: boolean;
  characterId: string;
  weaponType: string;
  bestWeapons: any[];
  tWeapons: string;
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

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="char-guide-section-head">
      <span className={`char-guide-section-accent ${accent}`} />
      <span className="char-guide-section-title">{label}</span>
    </div>
  );
}

export default function EditableWeaponsSection({ characterId, weaponType, bestWeapons, tWeapons, readOnly = false, showBestInSlot = true }: Props) {
  const locale = useLocale();
  const t = useTranslations('Character');
  const { isAdmin: admin } = useAdmin();
  const isAdmin = admin && !readOnly;
  const [isEditing, setIsEditing] = useState(false);
  const [editingWeapon, setEditingWeapon] = useState<any>(null);
  const [localWeapons, setLocalWeapons] = useState(bestWeapons);
  const [draggedItemIdx, setDraggedItemIdx] = useState<number | null>(null);
  const [dragOverItemIdx, setDragOverItemIdx] = useState<number | null>(null);
  const [activeConstellation, setActiveConstellation] = useState<string>('C0');

  // Derive available constellations from data, always ensuring 'C0' is present
  const availableConstellations = Array.from(new Set(bestWeapons.map(w => w.constellation || 'C0')));
  if (!availableConstellations.includes('C0')) availableConstellations.push('C0');
  availableConstellations.sort();

  useEffect(() => {
    setLocalWeapons(bestWeapons);
  }, [bestWeapons]);

  

  const handleDragStart = (idx: number) => {
    setDraggedItemIdx(idx);
  };

  const handleDragEnter = (idx: number) => {
    setDragOverItemIdx(idx);
  };

  const saveNewOrder = async (newWeapons: any[]) => {
    setLocalWeapons(newWeapons);
    try {
      const weaponIds = newWeapons.map(w => w.id);
      await fetchGraphQLAdmin(`mutation ReorderWeapons($weaponIds: [String!]!) { reorderCharacterWeapons(weaponIds: $weaponIds) }`, { weaponIds });
      toast.success("Weapon order updated");
    } catch (e: any) {
      toast.error("Failed to reorder: " + e.message);
    }
  };

  const handleDragEnd = () => {
    if (draggedItemIdx !== null && dragOverItemIdx !== null && draggedItemIdx !== dragOverItemIdx) {
      const newWeapons = [...localWeapons];
      const [draggedWeapon] = newWeapons.splice(draggedItemIdx, 1);
      newWeapons.splice(dragOverItemIdx, 0, draggedWeapon);
      saveNewOrder(newWeapons);
    }
    setDraggedItemIdx(null);
    setDragOverItemIdx(null);
  };

  const handleMoveUp = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (idx === 0) return;
    const newWeapons = [...localWeapons];
    [newWeapons[idx - 1], newWeapons[idx]] = [newWeapons[idx], newWeapons[idx - 1]];
    saveNewOrder(newWeapons);
  };

  const handleMoveDown = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    if (idx === localWeapons.length - 1) return;
    const newWeapons = [...localWeapons];
    [newWeapons[idx + 1], newWeapons[idx]] = [newWeapons[idx], newWeapons[idx + 1]];
    saveNewOrder(newWeapons);
  };
  const handleRemove = async (id: string) => {
    if (!await confirmDialog('Are you sure you want to remove this weapon?')) return;
    // Optimistic update: remove immediately
    const prev = localWeapons;
    setLocalWeapons(localWeapons.filter(w => w.id !== id));
    try {
      await fetchGraphQLAdmin(`mutation { removeCharacterWeapon(id: "${id}") }`);
      toast.success('Weapon removed');
    } catch (err: any) {
      setLocalWeapons(prev); // rollback
      toast.error("Error: " + err.message);
    }
  };

  return (
    <section className="atlas-surface p-5 sm:p-6 relative group/section h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <SectionHeader label={tWeapons} accent="bg-[var(--fantasy-gold)]" />
        
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
                      isActive ? 'bg-[var(--gold-glow)] text-[var(--gold-ink)] border border-[var(--border-gold)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-transparent'
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
              onClick={() => { setIsEditing(true); setEditingWeapon(null); }}
              className="atlas-add-action"
            >
              ➕ Add Weapon
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {localWeapons.filter(w => (w.constellation || 'C0') === activeConstellation).map((weapon: any, idx: number) => (
          <div 
            key={weapon.id || idx} 
            draggable={isAdmin}
            onDragStart={() => isAdmin && handleDragStart(idx)}
            onDragEnter={() => isAdmin && handleDragEnter(idx)}
            onDragEnd={isAdmin ? handleDragEnd : undefined}
            onDragOver={(e) => { if(isAdmin) e.preventDefault(); }}
            className={`relative group/wcard transition-all duration-200 ${isAdmin ? 'cursor-move' : ''} ${
              dragOverItemIdx === idx ? 'scale-[1.01] shadow-[0_0_15px_-6px_var(--gold-glow-strong)] z-10' : ''
            } ${draggedItemIdx === idx ? 'opacity-40' : 'opacity-100'}`}
          >
            <div
              data-rarity={weapon.rarity ?? 5}
              className="char-guide-item p-3 sm:p-4 flex gap-3 sm:gap-4 items-center"
            >
              <span className="char-guide-rank">{idx + 1}</span>
              <div className="atlas-artifact-thumbnail char-guide-thumb">
                {weapon.iconUrl && <FallbackImage src={weapon.iconUrl} alt={weapon.nameEn || ''} fill sizes="64px" className="object-contain drop-shadow-md p-1" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="char-guide-item-title">{locale === 'en' ? weapon.nameEn : weapon.nameVi}</h4>
                  {/* Approved import IDs encode list order without certifying a best-in-slot choice. */}
                  {(idx !== 0 || (showBestInSlot && !weapon.id?.startsWith('build-'))) && (
                    <span className={`char-guide-badge ${idx === 0 ? 'is-best' : weapon.isF2P ? 'is-f2p' : 'is-alt'}`}>
                      {idx === 0 ? t('bestInSlot') : weapon.isF2P ? t('f2pAlternative') : t('alternative')}
                    </span>
                  )}
                  {weapon.refinement && weapon.refinement > 1 && (
                    <span className="char-guide-badge is-refine">R{weapon.refinement}</span>
                  )}
                  <span className="char-guide-rarity" aria-label={locale === 'vi' ? `${weapon.rarity ?? 5} sao` : `${weapon.rarity ?? 5} stars`}>
                    {weapon.rarity ?? 5}★
                  </span>
                </div>
                {weapon.subStat && (
                  <p className="char-guide-stat">
                    <span className="char-guide-stat-label">{t('secondary')}:</span>
                    <span className="char-guide-stat-value">{translateStat(weapon.subStat, locale)}</span>
                  </p>
                )}
              </div>
              {isAdmin && (
                <div className="opacity-0 group-hover/wcard:opacity-100 transition-opacity flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    onClick={(e) => handleMoveUp(e, idx)}
                    disabled={idx === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={(e) => handleMoveDown(e, idx)}
                    disabled={idx === localWeapons.length - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <div className="w-[1px] h-4 bg-[var(--border-default)] self-center mx-1" />
                  <button
                    onClick={() => { setEditingWeapon(weapon); setIsEditing(true); }}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-[var(--accent-primary-dim)] hover:bg-[var(--accent-primary)] border border-transparent hover:border-[var(--border-accent)] text-[var(--accent-primary-light)] hover:text-[var(--atlas-action-ink)] transition-all"
                    title="Edit Weapon"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleRemove(weapon.id)}
                    className="w-7 h-7 rounded-lg bg-[color-mix(in_srgb,var(--danger-ink)_12%,var(--bg-surface))] text-[var(--danger-ink)] hover:bg-[var(--danger-ink)] hover:text-[var(--bg-surface)] transition-all flex items-center justify-center"
                    title="Remove Weapon"
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {bestWeapons.length === 0 && (
          <p className="text-sm text-[var(--text-secondary)] italic">No recommended weapons yet.</p>
        )}
      </div>

      {isEditing && (
        <InlineWeaponEditor 
          characterId={characterId} 
          weaponType={weaponType}
          defaultConstellation={activeConstellation}
          editingWeapon={editingWeapon}
          onClose={() => setIsEditing(false)} 
          onSaved={(newWeapon: any, isEdit?: boolean) => {
            if (isEdit) {
              setLocalWeapons(prev => prev.map(w => w.id === newWeapon.id ? newWeapon : w));
              toast.success('Weapon updated');
            } else {
              setLocalWeapons(prev => [...prev, newWeapon]);
              toast.success('Weapon added');
            }
          }} 
        />
      )}
    </section>
  );
}
