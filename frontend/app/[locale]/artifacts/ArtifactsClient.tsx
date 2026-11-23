'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import RarityStars from '@/components/ui/RarityStars';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useAdmin } from '@/hooks/useAdmin';
import dynamic from 'next/dynamic';
import { useDebounce } from '@/hooks/useDebounce';
import { ArrowUpRight, Check, Gem, Search } from 'lucide-react';

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

function ArtifactCard({ artifact, locale }: { artifact: ArtifactSet; locale: string }) {
  const maxRarity = Math.max(0, ...artifact.rarityList);
  const name = (locale === 'vi' && artifact.nameVi) || artifact.nameEn;

  return (
    <Link href={`/artifacts/${artifact.id}`} className="fantasy-collection-card fantasy-relic-card atlas-artifact-card atlas-surface">
      <div className="atlas-relic-art" data-rarity={maxRarity}>
        {artifact.iconUrl
          ? <FallbackImage src={artifact.iconUrl} alt="" fill sizes="(max-width: 511px) 75vw, (max-width: 900px) 40vw, 300px" />
          : <Gem size={52} aria-hidden="true" />}
      </div>
      <div className="atlas-relic-caption">
        <div className="atlas-catalog-copy">
          <h2>{name}</h2>
          <RarityStars rarity={maxRarity} locale={locale} />
        </div>
        <ArrowUpRight size={19} aria-hidden="true" />
      </div>
    </Link>
  );
}

export default function ArtifactsClient({ artifacts }: { artifacts: ArtifactSet[] }) {
  const [search, setSearch] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const locale = useLocale();
  const { isAdmin } = useAdmin();

  const debouncedSearch = useDebounce(search, 200);
  const [visibleCount, setVisibleCount] = useState(24);
  const loaderRef = useRef<HTMLDivElement>(null);

  const vi = locale === 'vi';
  const searchLabel = vi ? 'Tìm bộ thánh di vật' : 'Search artifact sets';

  const filtered = useMemo(() => {
    return artifacts.filter(a => {
      const name = (locale === 'vi' && a.nameVi) || a.nameEn;
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
            className="atlas-add-action"
          >
            Add Artifact Set
          </button>
        </div>
      )}

      <div className="atlas-filter-panel atlas-filter-row">
        <div className="atlas-search">
          <Search size={19} aria-hidden="true" />
          <input type="search" aria-label={searchLabel} placeholder={`${searchLabel}…`}
            value={search} onChange={event => setSearch(event.target.value)} />
        </div>
        <div className="atlas-filter-options" role="group" aria-label={vi ? 'Độ hiếm' : 'Rarity'}>
          {[null, 5, 4, 3].map(rarity => (
            <button key={rarity ?? 'all'} className="atlas-filter-chip" type="button"
              aria-pressed={selectedRarity === rarity}
              onClick={() => setSelectedRarity(selectedRarity === rarity ? null : rarity)}>
              <Check size={15} aria-hidden="true" />
              {rarity ? '★'.repeat(rarity) : (vi ? 'Tất cả' : 'All')}
            </button>
          ))}
        </div>
      </div>
      <p className="atlas-result-count my-4" role="status">
        <strong>{filtered.length}</strong> / {artifacts.length} {vi ? 'bộ' : 'sets'}
      </p>
      <div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-52 atlas-surface p-6 text-center">
            <Gem size={28} className="mb-3 text-[var(--accent-primary-light)]" aria-hidden="true" />
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              {vi ? 'Không tìm thấy bộ thánh di vật phù hợp.' : 'No artifact sets matched your criteria.'}
            </p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {vi ? 'Thử đổi bộ lọc hoặc từ khóa tìm kiếm.' : 'Try a different rarity or search term.'}
            </p>
          </div>
        ) : (
          <div className="atlas-artifact-grid">
            {filtered.slice(0, visibleCount).map((a) => (
              <ArtifactCard key={a.id} artifact={a} locale={locale} />
            ))}
          </div>
        )}
        
        {/* Infinite Scroll Loader */}
        {visibleCount < filtered.length && (
          <div ref={loaderRef} className="w-full h-20 flex items-center justify-center mt-8" role="status" aria-label={vi ? 'Đang tải thêm' : 'Loading more artifact sets'}>
            <div className="atlas-loader animate-spin" />
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
