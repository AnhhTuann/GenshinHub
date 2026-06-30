'use client';

import { useState } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';

const ArtifactFormModal = dynamic(() => import('@/components/admin/ArtifactFormModal'), { ssr: false });
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

interface ArtifactSet {
  id: string;
  nameEn: string;
  nameVi: string;
  rarityList: number[];
  piece2DescEn: string | null;
  piece2DescVi: string | null;
  piece4DescEn: string | null;
  piece4DescVi: string | null;
  iconUrl: string | null;
}

interface CharBasic {
  id: string;
  nameEn: string;
  nameVi: string;
  element: string;
  rarity: number;
  avatarUrl: string;
}

interface Props {
  artifactSet: ArtifactSet;
  characters: CharBasic[];
}

export default function ArtifactDetailClient({ artifactSet: initialSet, characters }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const [artifactSet, setArtifactSet] = useState(initialSet);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const rarity = artifactSet.rarityList && artifactSet.rarityList.length > 0 ? Math.max(...artifactSet.rarityList) : 5;
  const stars = '★'.repeat(rarity);
  const name = locale === 'en' ? artifactSet.nameEn : artifactSet.nameVi;
  const piece2Desc = locale === 'en' ? artifactSet.piece2DescEn : artifactSet.piece2DescVi;
  const piece4Desc = locale === 'en' ? artifactSet.piece4DescEn : artifactSet.piece4DescVi;

  const handleDelete = async () => {
    if (!await confirmDialog('Are you sure you want to delete this artifact set?')) return;
    setDeleting(true);
    try {
      await fetchGraphQL(`mutation { deleteArtifactSet(id: "${artifactSet.id}") }`);
      router.push(`/${locale}/artifacts`);
    } catch (err: any) {
      toast.error('Error deleting: ' + err.message);
      setDeleting(false);
    }
  };

  const handleSaved = async () => {
    try {
      const data = await fetchGraphQL(`query { artifactSet(id: "${artifactSet.id}") { id nameEn nameVi rarityList piece2DescEn piece2DescVi piece4DescEn piece4DescVi iconUrl } }`);
      if (data.artifactSet) setArtifactSet(data.artifactSet);
    } catch {}
  };

  return (
    <main className="min-h-screen bg-[#07070a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-wider w-fit mb-6" href="/artifacts">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Artifact Sets
        </Link>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-all"
            >
              ✏️ Edit Artifact Set
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
            {/* Artifact Image Wrapper */}
            <div className={`w-40 h-40 flex-shrink-0 rounded-2xl bg-gradient-to-br ${RARITY_BG[rarity]} p-[1px] shadow-xl self-center`}>
              <div className="relative w-full h-full rounded-2xl bg-[#07070a]/90 flex items-center justify-center overflow-hidden p-2">
                {artifactSet.iconUrl ? (
                  <FallbackImage src={artifactSet.iconUrl} alt={name} fill className="object-contain p-2" />
                ) : (
                  <span className="text-5xl select-none">💎</span>
                )}
              </div>
            </div>

            {/* Artifact Info */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-gray-550 text-[10px] font-black uppercase tracking-widest mb-1 font-display">Artifact Set</p>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight font-display uppercase tracking-tight">{name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <p className={`text-xl font-bold ${STAR_COLOR[rarity]}`}>{stars}</p>
                <span className="text-gray-800">|</span>
                <span className="text-xs text-gray-400 font-semibold">
                  Rarities: {artifactSet.rarityList.map(r => `${r}★`).join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Set Effects */}
          <div className="relative mx-8 mb-8 bg-[#050508]/65 border border-gray-955 rounded-2xl p-5 shadow-inner flex flex-col gap-4">
            {piece2Desc && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-550 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-550/10 border border-yellow-550/20 font-display">
                    2-Piece Set
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{piece2Desc}</p>
              </div>
            )}
            
            {piece4Desc && (
              <div className="border-t border-gray-950 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-550 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-550/10 border border-yellow-550/20 font-display">
                    4-Piece Set
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{piece4Desc}</p>
              </div>
            )}
          </div>
        </div>

        {/* Characters that can use this set */}
        <section>
          <h2 className="text-xl font-black text-white mb-5 flex items-center gap-3 font-display uppercase tracking-wider">
            <span className="w-1 h-5 rounded-full bg-yellow-500 inline-block"></span>
            Recommended For
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
                      <FallbackImage
                        src={char.avatarUrl}
                        alt={locale === 'en' ? char.nameEn : char.nameVi}
                        fill
                        className="object-cover object-top rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                    )}
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/5">
                      <FallbackImage
                        src={`/assets/elements/${char.element.toLowerCase()}.webp`}
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
              No recommended builds currently list this artifact set.
            </div>
          )}
        </section>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <ArtifactFormModal
          artifact={{
            id: artifactSet.id,
            nameEn: artifactSet.nameEn,
            nameVi: artifactSet.nameVi,
            rarityList: artifactSet.rarityList,
            piece2DescEn: artifactSet.piece2DescEn || '',
            piece2DescVi: artifactSet.piece2DescVi || '',
            piece4DescEn: artifactSet.piece4DescEn || '',
            piece4DescVi: artifactSet.piece4DescVi || '',
            iconUrl: artifactSet.iconUrl || '',
          }}
          onClose={() => setShowEditModal(false)}
          onSaved={handleSaved}
        />
      )}
    </main>
  );
}
