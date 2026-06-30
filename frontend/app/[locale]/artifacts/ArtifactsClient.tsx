'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useAdmin } from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';

const ArtifactFormModal = dynamic(() => import('@/components/admin/ArtifactFormModal'), { ssr: false });

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

/* ─── helpers ─────────────────────────────────────────────────── */

function rarityConfig(max: number) {
  if (max === 5)
    return {
      stars: '★★★★★',
      starColor: 'text-amber-400',
      gradient: 'from-amber-950/80 via-[#0d0d14] to-[#0d0d14]',
      topBar: 'from-amber-500 via-yellow-400 to-amber-300',
      border: 'border-amber-500/25',
      hoverBorder: 'hover:border-amber-400/60',
      glow: 'hover:shadow-[0_0_32px_rgba(245,158,11,0.18)]',
      iconBg: 'from-amber-900/40 to-amber-950/60',
      iconRing: 'ring-amber-500/30',
    };
  if (max === 4)
    return {
      stars: '★★★★',
      starColor: 'text-purple-400',
      gradient: 'from-purple-950/60 via-[#0d0d14] to-[#0d0d14]',
      topBar: 'from-purple-600 via-violet-500 to-purple-400',
      border: 'border-purple-500/25',
      hoverBorder: 'hover:border-purple-400/60',
      glow: 'hover:shadow-[0_0_32px_rgba(168,85,247,0.16)]',
      iconBg: 'from-purple-900/40 to-purple-950/60',
      iconRing: 'ring-purple-500/30',
    };
  return {
    stars: '★★★',
    starColor: 'text-sky-400',
    gradient: 'from-sky-950/50 via-[#0d0d14] to-[#0d0d14]',
    topBar: 'from-sky-600 via-blue-500 to-sky-400',
    border: 'border-sky-500/25',
    hoverBorder: 'hover:border-sky-400/60',
    glow: 'hover:shadow-[0_0_32px_rgba(56,189,248,0.14)]',
    iconBg: 'from-sky-900/40 to-sky-950/60',
    iconRing: 'ring-sky-500/30',
  };
}

/* ─── sub-components ──────────────────────────────────────────── */

function BonusBadge({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex gap-2 items-start">
      <span className="mt-0.5 shrink-0 text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/8 text-gray-400 leading-none">
        {label}
      </span>
      <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2 flex-1">{text}</p>
    </div>
  );
}

function ArtifactCard({ artifact, locale }: { artifact: ArtifactSet; locale: string }) {
  const max = Math.max(...artifact.rarityList);
  const cfg = rarityConfig(max);
  const name = locale === 'en' ? artifact.nameEn : artifact.nameVi;
  const desc2 = locale === 'en' ? artifact.piece2DescEn : artifact.piece2DescVi;
  const desc4 = locale === 'en' ? artifact.piece4DescEn : artifact.piece4DescVi;

  return (
    <Link
      href={`/artifacts/${artifact.id}`}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl
        bg-[#0d0d14] border ${cfg.border} ${cfg.hoverBorder}
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-[1.02] ${cfg.glow}
        shadow-[0_2px_12px_rgba(0,0,0,0.5)]
      `}
    >
      {/* Rarity top accent bar */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${cfg.topBar} flex-shrink-0`} />

      {/* Background gradient wash */}
      <div className={`absolute inset-0 bg-gradient-to-b ${cfg.gradient} pointer-events-none`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-6 pb-5 px-4 gap-3">

        {/* Large artifact image — w-24 h-24 */}
        <div
          className={`
            relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0
            bg-gradient-to-br ${cfg.iconBg}
            ring-1 ${cfg.iconRing}
            shadow-[0_4px_20px_rgba(0,0,0,0.6)]
          `}
        >
          <div className="absolute inset-0 rounded-2xl bg-white/[0.02]" />
          {artifact.iconUrl ? (
            <Image
              src={artifact.iconUrl}
              alt={name}
              width={96}
              height={96}
              className="w-full h-full object-contain p-1.5 group-hover:scale-110 transition-transform duration-300 ease-out drop-shadow-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl select-none opacity-60">💎</span>
            </div>
          )}
        </div>

        {/* Stars */}
        <span className={`${cfg.starColor} text-[11px] font-black tracking-[0.15em] drop-shadow-sm`}>
          {cfg.stars}
        </span>

        {/* Name */}
        <p className="text-white font-extrabold text-sm text-center leading-snug group-hover:text-yellow-100 transition-colors duration-200 font-display line-clamp-2 px-1">
          {name}
        </p>

        {/* Bonus descriptions */}
        {(desc2 || desc4) && (
          <div className="w-full border-t border-white/5 pt-3 space-y-2 mt-1">
            {desc2 && <BonusBadge label="2PC" text={desc2} />}
            {desc4 && <BonusBadge label="4PC" text={desc4} />}
          </div>
        )}
      </div>

      {/* View arrow hint */}
      <div className="relative z-10 flex items-center justify-end px-4 pb-3 mt-auto">
        <span
          className={`
            text-[10px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100
            transition-all duration-200 translate-x-1 group-hover:translate-x-0
            ${cfg.starColor}
          `}
        >
          View →
        </span>
      </div>
    </Link>
  );
}

/* ─── main export ─────────────────────────────────────────────── */

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
    <main className="min-h-screen bg-[#06060a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">

      {/* ── Hero header ──────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-48 bg-amber-500/6 blur-[80px] rounded-full" />
          <div className="absolute top-0 right-1/4 w-80 h-40 bg-purple-500/5 blur-[70px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-8 relative z-10">
          {/* Back link */}
          <Link
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-wider mb-6 group"
            href="/"
          >
            <svg
              className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">💎</span>
                <h1 className="text-4xl sm:text-5xl font-black text-white font-display uppercase tracking-tight leading-none">
                  Artifact Sets
                </h1>
              </div>
              <p className="text-gray-500 text-sm font-medium pl-1">
                Browse all{' '}
                <span className="text-amber-400 font-extrabold">{artifacts.length}</span>{' '}
                artifact sets from Genshin Impact
              </p>
            </div>

            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black bg-violet-500/10 text-violet-300 border border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-400/40 transition-all duration-200 shadow-lg shadow-violet-900/10"
              >
                <span className="text-base">✦</span>
                Add New Artifact Set
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Sticky filter bar ─────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-[#06060a]/85 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_1px_0_rgba(255,255,255,0.03)]">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search artifact sets…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#0d0d14] border border-white/7 rounded-xl pl-10 pr-9 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/15 transition-all duration-200 font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Rarity pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-gray-600 text-[9px] font-black uppercase tracking-widest mr-1 hidden sm:block">Rarity</span>

            <button
              onClick={() => setSelectedRarity(null)}
              className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all duration-200 ${
                selectedRarity === null
                  ? 'bg-white/10 text-white border-white/20 shadow-sm'
                  : 'text-gray-500 border-white/6 hover:text-gray-300 hover:border-white/12 hover:bg-white/5'
              }`}
            >
              All
            </button>

            <button
              onClick={() => setSelectedRarity(selectedRarity === 5 ? null : 5)}
              className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all duration-200 tracking-widest ${
                selectedRarity === 5
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/35 shadow-[0_0_12px_rgba(245,158,11,0.15)]'
                  : 'text-gray-500 border-white/6 hover:text-amber-400 hover:border-amber-500/20 hover:bg-amber-500/8'
              }`}
            >
              ★★★★★
            </button>

            <button
              onClick={() => setSelectedRarity(selectedRarity === 4 ? null : 4)}
              className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all duration-200 tracking-widest ${
                selectedRarity === 4
                  ? 'bg-purple-500/15 text-purple-300 border-purple-500/35 shadow-[0_0_12px_rgba(168,85,247,0.15)]'
                  : 'text-gray-500 border-white/6 hover:text-purple-400 hover:border-purple-500/20 hover:bg-purple-500/8'
              }`}
            >
              ★★★★
            </button>

            <button
              onClick={() => setSelectedRarity(selectedRarity === 3 ? null : 3)}
              className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all duration-200 tracking-widest ${
                selectedRarity === 3
                  ? 'bg-sky-500/15 text-sky-300 border-sky-500/35 shadow-[0_0_12px_rgba(56,189,248,0.15)]'
                  : 'text-gray-500 border-white/6 hover:text-sky-400 hover:border-sky-500/20 hover:bg-sky-500/8'
              }`}
            >
              ★★★
            </button>
          </div>

          {/* Count */}
          <div className="sm:ml-auto flex-shrink-0">
            <p className="text-gray-600 text-[11px] font-bold whitespace-nowrap">
              <span className="text-white font-extrabold">{filtered.length}</span>
              {' / '}{artifacts.length} sets
            </p>
          </div>
        </div>
      </div>

      {/* ── Card grid ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-72 rounded-2xl border border-white/5 bg-[#0d0d14]/40 backdrop-blur-sm text-gray-500 gap-4">
            <span className="text-5xl">👻</span>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-400 mb-1">No artifact sets found</p>
              <p className="text-xs text-gray-600">Try adjusting your search or filters</p>
            </div>
            <button
              onClick={() => { setSearch(''); setSelectedRarity(null); }}
              className="mt-1 px-4 py-2 rounded-xl text-xs font-black bg-white/5 border border-white/8 text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/8 transition-all"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map(artifact => (
              <ArtifactCard key={artifact.id} artifact={artifact} locale={locale} />
            ))}
          </div>
        )}
      </div>

      {/* ── Admin modal ───────────────────────────────────────── */}
      {showAddModal && (
        <ArtifactFormModal
          onClose={() => setShowAddModal(false)}
          onSaved={() => window.location.reload()}
        />
      )}
    </main>
  );
}
