'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useAdmin } from '@/hooks/useAdmin';
import ArtifactFormModal from '@/components/admin/ArtifactFormModal';

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

function RarityStars({ rarityList }: { rarityList: number[] }) {
  const max = Math.max(...rarityList);
  const color = max === 5 ? 'text-yellow-400' : max === 4 ? 'text-purple-400' : 'text-blue-400';
  return <span className={`${color} text-[10px] font-bold`}>{'★'.repeat(max)}</span>;
}

function rarityBorder(rarityList: number[]) {
  const max = Math.max(...rarityList);
  if (max === 5) return 'border-amber-500/20 hover:border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.03)]';
  if (max === 4) return 'border-purple-500/20 hover:border-purple-500/50';
  return 'border-blue-500/20 hover:border-blue-500/50';
}

export default function ArtifactsClient({ artifacts }: { artifacts: ArtifactSet[] }) {
  const [search, setSearch] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const locale = useLocale();
  const { isAdmin } = useAdmin();

  const filtered = useMemo(() => {
    return artifacts.filter(a => {
      const name = locale === 'en' ? a.nameEn : a.nameVi;
      const matchSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchRarity = selectedRarity === null || a.rarityList.includes(selectedRarity);
      return matchSearch && matchRarity;
    });
  }, [artifacts, search, selectedRarity, locale]);

  return (
    <main className="min-h-screen bg-[#07070a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <Link className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-wider w-fit mb-6" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Home
        </Link>
        <h1 className="text-4xl font-black text-white mb-1 font-display uppercase tracking-tight">💎 Artifact Sets</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-455 text-sm font-medium">All {artifacts.length} artifact sets in Genshin Impact</p>
          {isAdmin && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-all"
            >
              💎 Add New Artifact Set
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 flex-shrink-0">
          <div className="bg-[#0d0d12]/75 border border-gray-900 rounded-2xl p-5 sticky top-20 flex flex-col gap-6 shadow-xl backdrop-blur-md">
            {/* Search */}
            <div>
              <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 block font-display">Search</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-550" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Artifact set name..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-[#050508] border border-gray-950 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-200 placeholder-gray-655 focus:outline-none focus:border-yellow-500/40 focus:ring-1 focus:ring-yellow-500/20 transition-all font-medium"
                />
              </div>
            </div>

            {/* Rarity Filter */}
            <div>
              <label className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-2 block font-display">Rarity</label>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedRarity(null)}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                    selectedRarity === null 
                      ? 'bg-yellow-500/10 text-yellow-450 border-yellow-500/20' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border-transparent'
                  }`}
                >
                  All
                </button>
                {[5, 4, 3].map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRarity(selectedRarity === r ? null : r)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-all border ${
                      selectedRarity === r
                        ? r === 5 ? 'bg-amber-500/10 text-amber-450 border-amber-500/20'
                          : r === 4 ? 'bg-purple-500/10 text-purple-450 border-purple-500/20'
                          : 'bg-blue-500/10 text-blue-450 border-blue-500/20'
                        : 'text-gray-500 hover:text-white hover:bg-white/5 border-transparent'
                    }`}
                  >
                    <span className={r === 5 ? 'text-yellow-400' : r === 4 ? 'text-purple-400' : 'text-blue-400'}>
                      {'★'.repeat(r)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-950">
              <p className="text-gray-550 text-[10px] font-bold">
                Showing <span className="text-white font-extrabold">{filtered.length}</span> / {artifacts.length} sets
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 bg-[#0d0d12]/30 rounded-2xl border border-gray-900/60 shadow-inner">
              <span className="text-4xl mb-3">👻</span>
              <p className="text-sm font-semibold">No artifact sets matched your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.map(artifact => (
                <Link
                  key={artifact.id}
                  href={`/artifacts/${artifact.id}`}
                  className={`group text-left bg-[#0d0d12]/50 border ${rarityBorder(artifact.rarityList)} rounded-2xl overflow-hidden transition-all duration-300 hover:scale-101 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between`}
                >
                  {/* Top gradient stripe */}
                  <div className={`h-0.5 w-full bg-gradient-to-r ${
                    Math.max(...artifact.rarityList) === 5 ? 'from-amber-600 to-yellow-400'
                    : Math.max(...artifact.rarityList) === 4 ? 'from-purple-600 to-violet-400'
                    : 'from-blue-600 to-sky-400'
                  }`} />

                  <div className="p-4 flex gap-4 items-start">
                    {/* Icon */}
                    <div className={`relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br ${
                      Math.max(...artifact.rarityList) === 5 ? 'from-[#FFE082]/10 to-[#E65100]/20'
                      : Math.max(...artifact.rarityList) === 4 ? 'from-[#CE93D8]/10 to-[#6A1B9A]/20'
                      : 'from-[#90CAF9]/10 to-[#0D47A1]/20'
                    } border border-white/5 p-0.5`}>
                      <div className="w-full h-full bg-[#07070a]/90 rounded-lg overflow-hidden flex items-center justify-center">
                        {artifact.iconUrl ? (
                          <Image
                            src={artifact.iconUrl}
                            alt={locale === 'en' ? artifact.nameEn : artifact.nameVi}
                            width={56}
                            height={56}
                            className="object-contain p-1 group-hover:scale-105 transition-transform duration-350"
                          />
                        ) : (
                          <span className="text-2xl select-none">💎</span>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-extrabold text-sm leading-snug mb-1 group-hover:text-yellow-100 transition-colors font-display">
                        {locale === 'en' ? artifact.nameEn : artifact.nameVi}
                      </p>
                      <RarityStars rarityList={artifact.rarityList} />

                      <div className="mt-2.5 space-y-1.5 border-t border-gray-950 pt-2.5">
                        {(locale === 'en' ? artifact.piece2DescEn : artifact.piece2DescVi) && (
                          <div className="flex gap-1.5">
                            <span className="text-gray-500 text-[8px] font-black mt-1 shrink-0 uppercase tracking-wider bg-white/5 border border-white/5 px-1 py-0.5 rounded leading-none">2PC</span>
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{locale === 'en' ? artifact.piece2DescEn : artifact.piece2DescVi}</p>
                          </div>
                        )}
                        {(locale === 'en' ? artifact.piece4DescEn : artifact.piece4DescVi) && (
                          <div className="flex gap-1.5">
                            <span className="text-gray-500 text-[8px] font-black mt-1 shrink-0 uppercase tracking-wider bg-white/5 border border-white/5 px-1 py-0.5 rounded leading-none">4PC</span>
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{locale === 'en' ? artifact.piece4DescEn : artifact.piece4DescVi}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Admin Add Modal */}
      {showAddModal && (
        <ArtifactFormModal
          onClose={() => setShowAddModal(false)}
          onSaved={() => window.location.reload()}
        />
      )}
    </main>
  );
}
