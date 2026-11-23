import { fetchGraphQL, GET_ARTIFACTS } from '@/lib/graphql';
import type { Metadata } from 'next';
import ArtifactsClient from './ArtifactsClient';
import { Suspense } from 'react';
import { getTranslations, getLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Artifacts — GenshinHub',
  description: 'Browse all artifact sets in Genshin Impact — 2-piece and 4-piece effects, and rarities.',
};

function ArtifactsSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-8 animate-pulse">
        <div className="h-10 w-48 bg-[var(--bg-overlay)] rounded-md mb-2" />
        <div className="h-5 w-64 bg-[var(--bg-overlay)] rounded-md pl-6" />
      </div>
      <div className="atlas-artifact-grid">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-square bg-[var(--bg-overlay)] motion-safe:animate-pulse rounded-2xl border border-[var(--border-default)]" />
        ))}
      </div>
    </div>
  );
}

async function ArtifactsContent() {
  const data = await fetchGraphQL(GET_ARTIFACTS);
  const artifacts = data.artifacts || [];
  const locale = await getLocale();
  const t = await getTranslations('Common');

  return (
    <>
      <div className="mb-8">
        <header className="page-header">
          <span className="page-rule" />
          <h1 className="page-title">{t('artifacts')}</h1>
          <p className="page-desc">{locale === 'vi' ? `${artifacts.length} bộ thánh di vật — hiệu ứng bộ 2 và 4 món` : `${artifacts.length} artifact sets — 2-piece and 4-piece bonuses`}</p>
        </header>
      </div>
      <ArtifactsClient artifacts={artifacts} />
    </>
  );
}

export default async function ArtifactsPage() {
  return (
    <main className="min-h-screen text-[var(--text-primary)]" style={{ background: 'var(--bg-base)' }}>
      {/* Ambient */}

      <div className="atlas-container pt-10 pb-24">
        <Suspense fallback={<ArtifactsSkeleton />}>
          <ArtifactsContent />
        </Suspense>
      </div>
    </main>
  );
}
