'use client';

import { useState, type ReactNode } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import ElementIcon from '@/components/ui/ElementIcon';
import { ArrowLeft, Gem } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';

const ArtifactFormModal = dynamic(() => import('@/components/admin/ArtifactFormModal'), { ssr: false });
import { fetchGraphQL } from '@/lib/graphql';
import toast from 'react-hot-toast';
import { confirmDialog } from '@/utils/confirm';

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
  children?: ReactNode;
}

export default function ArtifactDetailClient({ artifactSet: initialSet, characters, children }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const { isAdmin } = useAdmin();
  const [artifactSet, setArtifactSet] = useState(initialSet);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const rarity = artifactSet.rarityList && artifactSet.rarityList.length > 0 ? Math.max(...artifactSet.rarityList) : 5;
  const vi = locale === 'vi';
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
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] pb-24">
      <div className="atlas-container pt-8 pb-4">
        <Link href="/artifacts" className="fantasy-action mb-5">
          <ArrowLeft size={18} aria-hidden="true" />{vi ? 'Tất cả bộ thánh di vật' : 'All artifact sets'}
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

        <div className="atlas-surface overflow-hidden mb-10">
          <div className="atlas-relic-detail-hero">
            <div className="atlas-relic-art rounded-2xl" data-rarity={rarity}>
              {artifactSet.iconUrl
                ? <FallbackImage src={artifactSet.iconUrl} alt="" fill sizes="(max-width: 639px) 80vw, 360px" />
                : <Gem size={64} aria-hidden="true" />}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[var(--accent-primary-light)]">{vi ? 'Bộ thánh di vật' : 'Artifact set'}</p>
              <h1 className="atlas-detail-title">{name}</h1>
              <p className="atlas-result-count">{vi ? 'Độ hiếm' : 'Rarity'} · {artifactSet.rarityList.map(r => `${r} ★`).join(', ')}</p>
            </div>
          </div>
          <div className="fantasy-detail-secondary atlas-relic-effects">
            {[{ pieces: 2, description: piece2Desc }, { pieces: 4, description: piece4Desc }].map(({ pieces, description }) => (
              description && <section key={pieces}>
                <h2>{vi ? `Bộ ${pieces} món` : `${pieces}-Piece Set`}</h2>
                <p>{description}</p>
              </section>
            ))}
          </div>
        </div>

        {children}

        <section>
          <h2 className="atlas-section-title mb-5">
            {vi ? 'Nhân vật đề xuất' : 'Recommended characters'} <span className="atlas-result-count">({characters.length})</span>
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
                    <ElementIcon element={char.element} label={char.element} className="absolute bottom-1 right-1" />
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] text-center font-semibold leading-tight group-hover:text-[var(--text-primary)] transition-colors">
                    {locale === 'en' ? char.nameEn : char.nameVi}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="atlas-surface p-8 text-center text-sm">
              {vi ? 'Chưa có build đề xuất cho bộ thánh di vật này.' : 'No recommended builds currently list this artifact set.'}
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
