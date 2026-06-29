import { fetchGraphQL, GET_ARTIFACTS } from '@/lib/graphql';
import { Metadata } from 'next';
import ArtifactsClient from './ArtifactsClient';

export const metadata: Metadata = {
  title: 'Artifacts - GenshinHub',
  description: 'Browse all artifact sets in Genshin Impact - 2-piece and 4-piece effects, and rarities.',
};

export default async function ArtifactsPage() {
  const data = await fetchGraphQL(GET_ARTIFACTS);
  const artifacts = data.artifacts || [];

  return (
    <main className="min-h-screen text-white" style={{ background: 'var(--bg-void, #04040a)' }}>
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[600px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(ellipse, rgba(206,147,216,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(ellipse, rgba(79,195,247,0.04) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-[3px] h-7 rounded-full" style={{ background: 'linear-gradient(to bottom, #f0d080, #c8a84b)' }} />
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
              style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)', background: 'linear-gradient(135deg, #f0d080 0%, #c8a84b 60%, #8a6820 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Artifacts Database
            </h1>
          </div>
          <p className="text-white/35 text-sm font-medium pl-6">Explore artifact sets, 2-piece and 4-piece bonuses</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-24">
        <ArtifactsClient artifacts={artifacts} />
      </div>
    </main>
  );
}
