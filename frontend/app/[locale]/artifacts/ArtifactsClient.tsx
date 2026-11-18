'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useAdmin } from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';
import { useDebounce } from '@/hooks/useDebounce';

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
  if (max === 5) return { ring: 'from-[#ffd34d] via-[#f0b64a] to-[#d99a2b]', glow: 'rgba(245,158,11,', text: '#ffd34d', border: 'rgba(245,158,11,0.25)', bg: 'rgba(245,158,11,0.12)', stars: '#ffd34d' };
  if (max === 4) return { ring: 'from-[#e2c88f] via-[#a77cf6] to-[#8e97a8]', glow: 'rgba(168,85,247,', text: '#e2c88f', border: 'rgba(168,85,247,0.25)', bg: 'rgba(168,85,247,0.12)', stars: '#e2c88f' };
  if (max === 3) return { ring: 'from-[#8e97a8] via-[#c9a86a] to-[#8e97a8]', glow: 'rgba(201,168,106,', text: '#e2c88f', border: 'rgba(201,168,106,0.25)', bg: 'rgba(201,168,106,0.12)', stars: '#e2c88f' };
  return { ring: 'from-gray-400 via-gray-500 to-gray-600', glow: 'rgba(156,163,175,', text: '#8e97a8', border: 'rgba(156,163,175,0.25)', bg: 'rgba(156,163,175,0.12)', stars: '#8e97a8' };
}

/* ─── sub-components ──────────────────────────────────────────── */

function BonusBadge({ label, text, glow }: { label: string; text: string; glow: string }) {
  return (
    <div className="flex gap-2.5 items-start bg-slate-50 rounded-lg p-2.5 border border-slate-200">
      <span className="mt-0.5 shrink-0 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md" style={{ background: `${glow}0.15)`, color: '#172b3a', border: `1px solid ${glow}0.3)` }}>
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
        background: 'linear-gradient(155deg, #ffffff 0%, #f3f8f9 100%)',
        border: '1px solid rgba(23,43,58,0.12)',
        boxShadow: '0 8px 24px rgba(23,43,58,0.07)',
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
          style={{ background: `linear-gradient(to top, ${cfg.bg} 0%, #eaf1f3 100%)` }}
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
              className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 drop-shadow-2xl"
            />
          ) : (
            <div className="text-5xl select-none opacity-30">💎</div>
          )}

          {/* Rarity Pill */}
          <div className="absolute top-2 left-2">
            <div className="px-1.5 py-0.5 rounded-md backdrop-blur-md bg-[#172b3a]/80 border border-white/10 text-[9px] font-bold tracking-wide flex items-center gap-0.5" style={{ color: cfg.stars }}>
              {max}★
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col pt-3 pb-4 px-4 gap-3 border-t border-slate-200">
        
        {/* Stars */}
        <div className="flex justify-center gap-[2px]">
          {Array.from({ length: max }).map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5" style={{ color: cfg.stars, filter: `drop-shadow(0 0 4px ${cfg.glow}0.8))` }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Name */}
        <p className="text-slate-900 font-extrabold text-[14px] sm:text-[15px] text-center leading-snug font-display truncate tracking-wide w-full px-2 mt-1">
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

  const debouncedSearch = useDebounce(search, 200);
  const [visibleCount, setVisibleCount] = useState(24);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return artifacts.filter(a => {
      const name = locale === 'en' ? a.nameEn : a.nameVi;
      const matchSearch = name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchRarity = selectedRarity === null || a.rarityList.includes(selectedRarity);
      return matchSearch && matchRarity;
    });
  }, [artifacts, debouncedSearch, selectedRarity, locale]);

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(24);
  }, [filtered]);

  // Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => Math.min(prev + 24, filtered.length));
      }
    }, { rootMargin: '400px' });
    
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    return () => observer.disconnect();
  }, [filtered.length]);

  return (
    <section className="artifact-catalog pb-12">
      {isAdmin && (
        <div className="max-w-7xl mx-auto px-6 pb-3 flex justify-end">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-violet-50 text-violet-800 border border-violet-200 hover:bg-violet-100 transition-colors"
          >
            Add Artifact Set
          </button>
        </div>
      )}

      {/* ── Sticky filter bar ─────────────────────────────────── */}
      <div className="sticky top-[72px] z-20 bg-white/90 backdrop-blur-xl border-y border-slate-200 shadow-sm">
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
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 pl-10 pr-9 py-2.5 rounded-xl outline-none text-sm font-medium transition-all placeholder:text-slate-400"
              onFocus={e => {
                e.target.style.borderColor = 'rgba(49,140,123,0.5)';
                e.target.style.boxShadow = '0 0 0 3px rgba(49,140,123,0.12)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'rgba(23,43,58,0.13)';
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
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-sm'
                  : 'text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              All
            </button>

            <button
              onClick={() => setSelectedRarity(selectedRarity === 5 ? null : 5)}
              className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all duration-200 tracking-widest ${
                selectedRarity === 5
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'text-slate-600 border-slate-200 hover:text-amber-800 hover:border-amber-200 hover:bg-amber-50'
              }`}
            >
              ★★★★★
            </button>

            <button
              onClick={() => setSelectedRarity(selectedRarity === 4 ? null : 4)}
              className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all duration-200 tracking-widest ${
                selectedRarity === 4
                  ? 'bg-violet-50 text-violet-800 border-violet-200'
                  : 'text-slate-600 border-slate-200 hover:text-violet-800 hover:border-violet-200 hover:bg-violet-50'
              }`}
            >
              ★★★★
            </button>

            <button
              onClick={() => setSelectedRarity(selectedRarity === 3 ? null : 3)}
              className={`px-4 py-1.5 rounded-full text-xs font-black border transition-all duration-200 tracking-widest ${
                selectedRarity === 3
                  ? 'bg-sky-50 text-sky-800 border-sky-200'
                  : 'text-slate-600 border-slate-200 hover:text-sky-800 hover:border-sky-200 hover:bg-sky-50'
              }`}
            >
              ★★★
            </button>
          </div>

          {/* Count */}
          <div className="sm:ml-auto flex-shrink-0">
            <p className="text-gray-600 text-[11px] font-bold whitespace-nowrap">
              <span className="text-slate-900 font-extrabold">{filtered.length}</span>
              {' / '}{artifacts.length} sets
            </p>
          </div>
        </div>
      </div>

      {/* ── Card grid ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-6 pb-20">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-600 bg-white rounded-3xl border border-slate-200">
            <p className="text-sm font-semibold">No artifact sets matched your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {filtered.slice(0, visibleCount).map((a) => (
              <ArtifactCard key={a.id} artifact={a} locale={locale} />
            ))}
          </div>
        )}
        
        {/* Infinite Scroll Loader */}
        {visibleCount < filtered.length && (
          <div ref={loaderRef} className="w-full h-20 flex items-center justify-center mt-8">
            <div className="w-6 h-6 border-2 border-emerald-700/25 border-t-emerald-700 rounded-full animate-spin"></div>
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
    </section>
  );
}
