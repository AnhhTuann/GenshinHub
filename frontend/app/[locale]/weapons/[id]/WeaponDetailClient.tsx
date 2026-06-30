'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';

const WeaponFormModal = dynamic(() => import('@/components/admin/WeaponFormModal'), { ssr: false });
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/utils/confirm';

const RARITY_BG: Record<number, string> = {
  5: 'from-[#FFE082] via-[#FFB300] to-[#E65100]',
  4: 'from-[#CE93D8] via-[#9C27B0] to-[#6A1B9A]',
  3: 'from-[#90CAF9] via-[#1976D2] to-[#0D47A1]',
  2: 'from-gray-400 via-gray-650 to-gray-800',
  1: 'from-gray-500 via-gray-700 to-gray-900',
};

const RARITY_BORDER: Record<number, string> = {
  5: 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.08)]',
  4: 'border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.08)]',
  3: 'border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.08)]',
  2: 'border-gray-500/40',
  1: 'border-gray-600/40',
};

const STAR_COLOR: Record<number, string> = {
  5: 'text-yellow-400',
  4: 'text-purple-400',
  3: 'text-blue-400',
  2: 'text-gray-400',
  1: 'text-gray-500',
};

interface Weapon {
  id: string;
  nameEn: string;
  nameVi: string;
  rarity: number;
  type: string;
  baseAtk: number;
  subStat: string | null;
  subStatValue: number | null;
  passiveNameEn: string | null;
  passiveNameVi: string | null;
  passiveDescEn: string | null;
  passiveDescVi: string | null;
  iconUrl: string | null;
  tier?: string | null;
}

interface CharBasic {
  id: string;
  nameEn: string;
  nameVi: string;
  element: string;
  rarity: number;
  avatarUrl: string;
  weapon: string;
}

interface Props {
  weapon: Weapon;
  characters: CharBasic[];
}

export default function WeaponDetailClient({ weapon: initialWeapon, characters }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const [weapon, setWeapon] = useState(initialWeapon);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const rarity = weapon.rarity ?? 5;
  const stars = '★'.repeat(rarity);
  const name = locale === 'en' ? weapon.nameEn : weapon.nameVi;
  const passiveName = locale === 'en' ? weapon.passiveNameEn : weapon.passiveNameVi;
  const passiveDesc = locale === 'en' ? weapon.passiveDescEn : weapon.passiveDescVi;

  const translateSubStat = (stat: string | null) => {
    if (!stat) return null;
    if (locale === 'vi') return stat;
    const map: Record<string, string> = {
      'Tỷ Lệ Bạo Kích': 'CRIT Rate',
      'Sát Thương Bạo Kích': 'CRIT DMG',
      'Tấn Công%': 'ATK%',
      'Phòng Ngự%': 'DEF%',
      'HP%': 'HP%',
      'Hiệu Quả Nạp': 'Energy Recharge',
      'Tinh Thông Nguyên Tố': 'Elemental Mastery',
      'Sát Thương Vật Lý%': 'Physical DMG Bonus'
    };
    return map[stat] || stat;
  };
  const subStat = translateSubStat(weapon.subStat);

  const handleDelete = async () => {
    if (!await confirmDialog('Are you sure you want to delete this weapon?')) return;
    setDeleting(true);
    try {
      await fetchGraphQL(`mutation { deleteWeapon(id: "${weapon.id}") }`);
      router.push(`/${locale}/weapons`);
    } catch (err: any) {
      toast.error('Error deleting: ' + err.message);
      setDeleting(false);
    }
  };

  const handleSaved = async () => {
    try {
      const data = await fetchGraphQL(`query { weapon(id: "${weapon.id}") { id nameEn nameVi rarity type baseAtk subStat subStatValue passiveNameEn passiveNameVi passiveDescEn passiveDescVi iconUrl tier } }`);
      if (data.weapon) setWeapon(data.weapon);
    } catch {}
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-wider w-fit mb-6" href="/weapons">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Weapons
        </Link>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
            >
              ✏️ Edit Weapon
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all disabled:opacity-50"
            >
              🗑️ {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className={`relative rounded-3xl border ${RARITY_BORDER[rarity]} overflow-hidden bg-[#0d0d12]/50 shadow-2xl mb-8 backdrop-blur-md`}>
          {/* Background glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_BG[rarity]} opacity-[0.03]`} />

          <div className="relative flex flex-col md:flex-row gap-8 p-8">
            {/* Weapon Image Wrapper */}
            <div className={`w-40 h-40 flex-shrink-0 rounded-2xl bg-gradient-to-br ${RARITY_BG[rarity]} p-[1px] shadow-xl self-center`}>
              <div className="relative w-full h-full rounded-2xl bg-[#07070a]/90 flex items-center justify-center overflow-hidden p-2">
                {weapon.iconUrl ? (
                  <Image src={weapon.iconUrl} alt={name} fill className="object-contain p-2" />
                ) : (
                  <span className="text-5xl select-none">⚔️</span>
                )}
              </div>
            </div>

            {/* Weapon Info */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-gray-550 text-[10px] font-black uppercase tracking-widest mb-1 font-display">{weapon.type}</p>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight font-display uppercase tracking-tight">{name}</h1>
              <p className={`text-xl font-bold mb-5 ${STAR_COLOR[rarity]}`}>{stars}</p>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-[#050508]/65 border border-gray-955 rounded-xl px-5 py-3 shadow-inner">
                  <p className="text-gray-550 text-[9px] font-black uppercase tracking-widest mb-1">Base ATK</p>
                  <p className="text-red-405 font-black text-2xl font-display">{weapon.baseAtk}</p>
                </div>
                {subStat && (
                  <div className="bg-[#050508]/65 border border-gray-955 rounded-xl px-5 py-3 shadow-inner">
                    <p className="text-gray-550 text-[9px] font-black uppercase tracking-widest mb-1">{subStat}</p>
                    <p className="text-blue-400 font-black text-2xl font-display">
                      {weapon.subStatValue ?? '—'}
                      {weapon.subStatValue && (
                        subStat.includes('%') || subStat.includes('Rate') ||
                        subStat.includes('DMG') || subStat.includes('Recharge') ||
                        subStat.includes('Mastery') || subStat.includes('Bonus') ? '%' : ''
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Passive Description */}
          {passiveName && (
            <div className="relative mx-8 mb-8 bg-[#050508]/65 border border-gray-955 rounded-2xl p-5 shadow-inner">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-500 text-sm">⚡</span>
                <p className="text-yellow-500 font-extrabold text-sm uppercase tracking-wider font-display">{passiveName}</p>
              </div>
              {passiveDesc && (
                <p
                  className="text-gray-300 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: passiveDesc
                      .replace(/<color=#99FFFFFF>/g, '<span style="color:#f59e0b; font-weight:bold">')
                      .replace(/<\/color>/g, '</span>')
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Characters that can use this weapon */}
        <section>
          <h2 className="text-xl font-black text-white mb-5 flex items-center gap-3 font-display uppercase tracking-wider">
            <span className="w-1 h-5 rounded-full bg-yellow-500 inline-block"></span>
            Recommended Users
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1 font-sans">({characters.length} characters)</span>
          </h2>

          {characters.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {characters.map((char) => (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}` as any}
                  className="group flex flex-col items-center gap-1.5 hover:scale-105 transition-transform"
                >
                  <div className={`relative w-full aspect-square rounded-xl overflow-hidden border ${char.rarity === 5 ? 'border-yellow-500/50' : 'border-purple-500/40'} bg-gradient-to-br ${char.rarity === 5 ? 'from-yellow-900/40 to-amber-950/60' : 'from-purple-900/40 to-violet-950/60'} p-0.5`}>
                    {char.avatarUrl ? (
                      <Image
                        src={char.avatarUrl}
                        alt={locale === 'en' ? char.nameEn : char.nameVi}
                        fill
                        className="object-cover object-top rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                    )}
                    {/* Element icon */}
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/5">
                      <Image
                        src={`/elements/${char.element.toLowerCase()}.png`}
                        alt={char.element}
                        width={12}
                        height={12}
                        className="drop-shadow-md"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center leading-tight group-hover:text-white transition-colors line-clamp-2">
                    {locale === 'en' ? char.nameEn : char.nameVi}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#0d0d12]/30 border border-gray-900/60 rounded-2xl p-8 text-center text-gray-500 text-sm">
              No recommended builds currently list this weapon.
            </div>
          )}
        </section>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <WeaponFormModal
          weapon={{
            id: weapon.id,
            nameEn: weapon.nameEn,
            nameVi: weapon.nameVi,
            rarity: weapon.rarity,
            type: weapon.type,
            baseAtk: weapon.baseAtk,
            subStat: weapon.subStat || '',
            subStatValue: weapon.subStatValue,
            passiveNameEn: weapon.passiveNameEn || '',
            passiveNameVi: weapon.passiveNameVi || '',
            passiveDescEn: weapon.passiveDescEn || '',
            passiveDescVi: weapon.passiveDescVi || '',
            iconUrl: weapon.iconUrl || '',
            tier: weapon.tier || '',
          }}
          onClose={() => setShowEditModal(false)}
          onSaved={handleSaved}
        />
      )}
    </main>
  );
}
