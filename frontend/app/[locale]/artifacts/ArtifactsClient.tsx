'use client';

import { useState, useMemo } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
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
  if (max === 5) return { ring: 'from-[#ffd54f] via-[#f59e0b] to-[#d97706]', glow: 'rgba(245,158,11,', text: '#ffd54f', border: 'rgba(245,158,11,0.25)', bg: 'rgba(245,158,11,0.06)', stars: '#ffd54f' };
  if (max === 4) return { ring: 'from-[#c084fc] via-[#a855f7] to-[#7c3aed]', glow: 'rgba(168,85,247,', text: '#c084fc', border: 'rgba(168,85,247,0.25)', bg: 'rgba(168,85,247,0.06)', stars: '#c084fc' };
  if (max === 3) return { ring: 'from-[#60a5fa] via-[#3b82f6] to-[#1d4ed8]', glow: 'rgba(59,130,246,', text: '#93c5fd', border: 'rgba(59,130,246,0.25)', bg: 'rgba(59,130,246,0.06)', stars: '#93c5fd' };
  return { ring: 'from-gray-400 via-gray-500 to-gray-600', glow: 'rgba(156,163,175,', text: '#9ca3af', border: 'rgba(156,163,175,0.25)', bg: 'rgba(156,163,175,0.06)', stars: '#9ca3af' };
}

/* ─── sub-components ──────────────────────────────────────────── */

function BonusBadge({ label, text, glow }: { label: string; text: string; glow: string }) {
  return (
    <div className="flex gap-2.5 items-start bg-white/5 rounded-lg p-2.5 border border-white/5">
      <span className="mt-0.5 shrink-0 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md" style={{ background: `${glow}0.15)`, color: '#fff', border: `1px solid ${glow}0.3)` }}>
        {label}
      </span>
      <p className="text-[10px] text-gray-300 leading-snug line-clamp-2 flex-1 font-medium">{text}</p>
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
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1"
      style={{
        background: `linear-gradient(145deg, rgba(12,12,24,0.95) 0%, rgba(5,5,12,0.98) 100%)`,
        border: `1px solid ${cfg.border}`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1.5px ${cfg.glow}0.5)` }}
      />
      
      {/* Top sheen */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${cfg.glow}0.8), transparent)` }}
      />

      {/* Image wrapper */}
      <div className="relative w-full aspect-square p-[1.5px]">
        <div
          className="w-full h-full rounded-[22px] overflow-hidden flex items-center justify-center relative"
          style={{ background: `linear-gradient(to top, ${cfg.bg} 0%, rgba(5,5,12,0.9) 100%)` }}
        >
          {/* Glow dot behind artifact */}
          <div
            className="absolute w-2/3 h-2/3 rounded-full pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity"
            style={{ background: `radial-gradient(circle, ${cfg.glow}0.2), transparent 60%)`, filter: 'blur(20px)' }}
          />
          
          {artifact.iconUrl ? (
            <FallbackImage
              src={artifact.iconUrl}
              alt={name}
              fill
              className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
            />
          ) : (
            <div className="text-5xl select-none opacity-30">💎</div>
          )}

          {/* Rarity List Pills */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
             {artifact.rarityList.sort((a,b) => b-a).map(r => (
               <div key={r} className="px-1.5 py-0.5 rounded-md backdrop-blur-md bg-black/40 border border-white/10 text-[8px] font-black text-white/70 tracking-widest flex items-center gap-0.5">
                  {r}<span style={{ color: r === 5 ? '#ffd54f' : r === 4 ? '#ce93d8' : '#93c5fd' }}>★</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col pt-3 pb-4 px-4 gap-3 border-t border-white/5">
        
        {/* Stars */}
        <div className="flex justify-center gap-[2px]">
          {Array.from({ length: max }).map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5" style={{ color: cfg.stars, filter: `drop-shadow(0 0 4px ${cfg.glow}0.8))` }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Name */}
        <p className="text-white font-extrabold text-[13px] sm:text-sm text-center leading-snug font-display line-clamp-2 tracking-wide" style={{ textShadow: `0 0 16px ${cfg.glow}0.6)` }}>
          {name}
        </p>

        {/* Bonus descriptions */}
        {(desc2 || desc4) && (
          <div className="w-full pt-1 space-y-1.5 mt-auto">
            {desc2 && <BonusBadge label="2PC" text={desc2} glow={cfg.glow} />}
            {desc4 && <BonusBadge label="4PC" text={desc4} glow={cfg.glow} />}
          </div>
        )}
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
          <div className="absolute top-0 left-1/4 w-[600px] h-[500px] blur-[130px] rounded-full" style={{ background: 'rgba(168,85,247,0.08)' }} />
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[400px] blur-[100px] rounded-full" style={{ background: 'rgba(34,211,238,0.06)' }} />
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
              className="w-full bg-[#0d0d14]/80 border border-white/[0.08] text-white/90 pl-10 pr-9 py-2.5 rounded-xl outline-none text-sm font-medium transition-all placeholder:text-white/30 backdrop-blur-md"
              onFocus={e => {
                e.target.style.borderColor = 'rgba(168,85,247,0.50)';
                e.target.style.boxShadow = '0 0 0 3px rgba(168,85,247,0.12)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                e.target.style.boxShadow = 'none';
              }}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-5">
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
