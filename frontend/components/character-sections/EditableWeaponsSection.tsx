'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('Character');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('admin_key'));
  }, []);

  const handleRemove = async (id: string) => {
    if (!await confirmDialog('Are you sure you want to remove this weapon?')) return;
    try {
      await fetchGraphQL(`mutation { removeCharacterWeapon(id: "${id}") }`);
      router.refresh();
    } catch (err: any) {
      toast.error("Error: " + err.message);
    }
  };

  return (
    <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6 relative group/section">
      <div className="flex items-center justify-between">
        <SectionHeader label={tWeapons} accent="bg-amber-400" />
        {isAdmin && (
          <button 
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover/section:opacity-100 px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-bold rounded hover:bg-amber-500/30 transition-all border border-amber-500/30"
          >
            ➕ Add Weapon
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {bestWeapons.map((weapon: any, idx: number) => (
          <div key={weapon.id} className="relative group/wcard">
            <div className="bg-[#06060a]/50 border border-white/[0.04] hover:border-amber-500/15 rounded-xl p-3 sm:p-4 flex gap-4 items-center transition-colors duration-200">
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
                <button
                  onClick={() => handleRemove(weapon.id)}
                  className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shrink-0 opacity-0 group-hover/wcard:opacity-100"
                  title="Remove Weapon"
                >
                  ✕
                </button>
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
          onClose={() => setIsEditing(false)} 
          onSaved={() => router.refresh()} 
        />
      )}
    </section>
  );
}
