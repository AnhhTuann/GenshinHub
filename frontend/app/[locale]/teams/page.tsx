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
    <main className="min-h-screen text-white" style={{ background: 'var(--bg-void, #0d0c0a)' }}>
      {/* Ambient */}

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="mb-8">
          <header className="page-header">
          <span className="page-rule" />
          <h1 className="page-title">Meta Teams</h1>
          <p className="page-desc">Best team compositions — {characters.length} characters analyzed</p>
        </header>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pb-24">
        <TeamsClient characters={characters} />
      </div>
    </main>
  );
}
