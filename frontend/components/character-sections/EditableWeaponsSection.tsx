'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import InlineWeaponEditor from '@/components/admin/InlineWeaponEditor';
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/utils/confirm';

interface Props {
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
    <div className="flex items-center gap-2.5 mb-5">
      <span className={`w-[3px] h-5 rounded-full ${accent}`} />
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 font-display">{label}</span>
    </div>
  );
}

export default function EditableWeaponsSection({ characterId, weaponType, bestWeapons, tWeapons }: Props) {
  const locale = useLocale();
  const t = useTranslations('Character');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_key'));
  }, []);

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
      await fetchGraphQL(`mutation ReorderWeapons($weaponIds: [String!]!) { reorderCharacterWeapons(weaponIds: $weaponIds) }`, { weaponIds });
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
      await fetchGraphQL(`mutation { removeCharacterWeapon(id: "${id}") }`);
      toast.success('Weapon removed');
    } catch (err: any) {
      setLocalWeapons(prev); // rollback
      toast.error("Error: " + err.message);
    }
  };

  return (
    <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative group/section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <SectionHeader label={tWeapons} accent="bg-amber-400" />
        
        <div className="flex items-center gap-4">
          {/* Constellation Switcher */}
          {(availableConstellations.length > 1 || isAdmin) && (
            <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-1">
              {['C0', 'C1', 'C2', 'C4', 'C6'].map(c => {
                if (!isAdmin && !availableConstellations.includes(c)) return null;
                const isActive = activeConstellation === c;
                return (
                  <button
                    key={c}
                    onClick={() => setActiveConstellation(c)}
                    className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md transition-colors ${
                      isActive ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30 shadow-[0_0_10px_rgba(251,191,36,0.2)]' : 'text-white/40 hover:text-white/80 hover:bg-white/5 border border-transparent'
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
              className="opacity-0 group-hover/section:opacity-100 px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded hover:bg-amber-500/30 transition-all border border-amber-500/30"
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
              dragOverItemIdx === idx ? 'scale-[1.01] shadow-[0_0_15px_rgba(251,191,36,0.15)] z-10' : ''
            } ${draggedItemIdx === idx ? 'opacity-40' : 'opacity-100'}`}
          >
            <div className={`bg-[#06060a]/50 border hover:border-amber-500/15 rounded-xl p-3 sm:p-4 flex gap-4 items-center transition-colors duration-200 ${
              dragOverItemIdx === idx ? 'border-amber-500/50' : 'border-white/[0.04]'
            }`}>
              <span className="w-6 h-6 shrink-0 rounded-full bg-amber-500/10 text-amber-400/80 flex items-center justify-center text-xs font-black border border-amber-500/15">
                {idx + 1}
              </span>
              <div className={`relative w-16 h-16 shrink-0 rounded-lg border border-white/[0.05] flex items-center justify-center overflow-hidden ${
                weapon.rarity === 5 ? 'bg-gradient-to-b from-[#b18361] to-[#8c6b55]' :
                weapon.rarity === 4 ? 'bg-gradient-to-b from-[#7e6b9c] to-[#5b4d75]' :
                weapon.rarity === 3 ? 'bg-gradient-to-b from-[#4d86b6] to-[#3a6388]' :
                'bg-white/[0.02]'
              }`}>
                <img src={weapon.iconUrl} alt={weapon.nameEn} className="w-14 h-14 object-contain drop-shadow-md" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="text-white/80 font-bold text-sm truncate">{locale === 'en' ? weapon.nameEn : weapon.nameVi}</h4>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                    idx === 0 
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' 
                      : weapon.isF2P 
                        ? 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/20'
                        : 'bg-white/5 text-white/40 border border-white/10'
                  }`}>
                    {idx === 0 ? t('bestInSlot') : weapon.isF2P ? t('f2pAlternative') : t('alternative')}
                  </span>
                </div>
                {weapon.subStat && (
                  <p className="text-xs text-white/40 font-medium">{t('secondary')}: <span className="text-white/70">{translateStat(weapon.subStat, locale)}</span></p>
                )}
              </div>
              {isAdmin && (
                <div className="opacity-0 group-hover/wcard:opacity-100 transition-opacity flex items-center gap-1.5 shrink-0 ml-2">
                  <button
                    onClick={(e) => handleMoveUp(e, idx)}
                    disabled={idx === 0}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    ↑
                  </button>
                  <button
                    onClick={(e) => handleMoveDown(e, idx)}
                    disabled={idx === localWeapons.length - 1}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    ↓
                  </button>
                  <div className="w-[1px] h-4 bg-white/10 self-center mx-1" />
                  <button
                    onClick={() => handleRemove(weapon.id)}
                    className="w-7 h-7 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                    title="Remove Weapon"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {bestWeapons.length === 0 && (
          <p className="text-sm text-white/40 italic">No recommended weapons yet.</p>
        )}
      </div>

      {isEditing && (
        <InlineWeaponEditor 
          characterId={characterId} 
          weaponType={weaponType}
          defaultConstellation={activeConstellation}
          onClose={() => setIsEditing(false)} 
          onSaved={(newWeapon: any) => {
            setLocalWeapons(prev => [...prev, newWeapon]);
            toast.success('Weapon added');
          }} 
        />
      )}
    </section>
  );
}
