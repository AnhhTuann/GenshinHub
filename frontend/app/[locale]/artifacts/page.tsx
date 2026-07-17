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
        <div className="h-10 w-48 bg-white/[0.05] rounded-md mb-2" />
        <div className="h-5 w-64 bg-white/[0.03] rounded-md pl-6" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-white/[0.03] animate-pulse rounded-2xl border border-white/5" />
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-[3px] h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #ce93d8, #a855f7)' }} />
          <h1
            className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
            style={{
              fontFamily: 'var(--font-cinzel, Cinzel, serif)',
              background: 'linear-gradient(135deg, #f3e8ff 0%, #ce93d8 60%, #9333ea 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('artifacts')}
          </h1>
        </div>
        <p className="text-white/35 text-sm font-medium pl-6">
          {locale === 'vi' ? `${artifacts.length} bộ thánh di vật — hiệu ứng bộ 2 và 4 món` : `${artifacts.length} artifact sets — 2-piece and 4-piece bonuses`}
        </p>
      </div>
      <ArtifactsClient artifacts={artifacts} />
    </>
  );
}

export default async function ArtifactsPage() {
  return (
    <main className="min-h-screen text-white" style={{ background: 'var(--bg-void, #04040a)' }}>
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[15%] -right-[10%] w-[750px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(206,147,216,0.06) 0%, transparent 70%)', filter: 'blur(130px)' }}
        />
        <div
          className="absolute bottom-[-15%] left-[15%] w-[600px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(79,195,247,0.04) 0%, transparent 70%)', filter: 'blur(110px)' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-24">
        <Suspense fallback={<ArtifactsSkeleton />}>
          <ArtifactsContent />
        </Suspense>
      </div>
    </main>
  );
}
