import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import type { Metadata } from 'next';
import TeamsClient from './TeamsClient';
import { Link } from '@/i18n/routing';
import { ArrowLeft } from 'lucide-react';

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
    <main className="min-h-screen pb-24" style={{ background: 'var(--bg-void, #0d0c0a)' }}>
      <header className="atlas-container py-8">
        <Link href="/" className="fantasy-action mb-5"><ArrowLeft size={17} aria-hidden="true" />Back to Home</Link>
        <h1 className="page-title">Meta Teams</h1>
        <p className="page-desc mt-2">Best team compositions across {characters.length} characters.</p>
      </header>
      <TeamsClient characters={characters} />
    </main>
  );
}
