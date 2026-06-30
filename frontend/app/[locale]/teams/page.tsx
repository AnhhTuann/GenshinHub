import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import type { Metadata } from 'next';
import TeamsClient from './TeamsClient';

export const metadata: Metadata = {
  title: 'Meta Teams — GenshinHub',
  description: 'Explore optimal team compositions for Genshin Impact characters — SS/S/A tier teams and synergy builds.',
};

export const revalidate = 3600;

export default async function TeamsPage() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters = (data.characters || []).map((c: any) => ({
    id:        c.id,
    nameEn:    c.nameEn,
    nameVi:    c.nameVi,
    element:   c.element,
    rarity:    c.rarity,
    avatarUrl: c.avatarUrl,
    teams:     c.teams || [],
  }));

  return (
    <main className="min-h-screen text-white" style={{ background: 'var(--bg-void, #04040a)' }}>
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[10%] -right-[5%] w-[700px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(79,195,247,0.05) 0%, transparent 70%)', filter: 'blur(130px)' }}
        />
        <div
          className="absolute top-[40%] -left-[10%] w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 70%)', filter: 'blur(110px)' }}
        />
      </div>

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-[3px] h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #4fc3f7, #0284c7)' }} />
            <h1
              className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
              style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                background: 'linear-gradient(135deg, #e0f2fe 0%, #4fc3f7 50%, #0284c7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Meta Teams
            </h1>
          </div>
          <p className="text-white/35 text-sm font-medium pl-6">
            Best team compositions — {characters.length} characters analyzed
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-24">
        <TeamsClient characters={characters} />
      </div>
    </main>
  );
}
