import { fetchGraphQL, GET_WEAPONS } from '@/lib/graphql';
import type { Metadata } from 'next';
import WeaponsClient from './WeaponsClient';
import { Suspense } from 'react';
import { getTranslations, getLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Weapons — GenshinHub',
  description: 'Explore all weapons in Genshin Impact — ATK, substats, passives, and more.',
};


function WeaponsSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-8 animate-pulse">
        <div className="h-10 w-48 bg-white/[0.05] rounded-md mb-2" />
        <div className="h-5 w-64 bg-white/[0.03] rounded-md pl-6" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-white/[0.03] animate-pulse rounded-2xl border border-white/5" />
        ))}
      </div>
    </div>
  );
}

async function WeaponsContent() {
  const data = await fetchGraphQL(GET_WEAPONS);
  const weapons = data.weapons || [];
  const locale = await getLocale();
  const t = await getTranslations('Common');

  return (
    <>
      <div className="mb-8">
        <header className="page-header">
          <span className="page-rule" />
          <h1 className="page-title">{t('weapons')}</h1>
          <p className="page-desc">{locale === 'vi' ? `${weapons.length} vũ khí — kiếm đơn, trọng kiếm, giáo, cung & pháp khí` : `${weapons.length} weapons — swords, claymores, polearms, bows & catalysts`}</p>
        </header>
      </div>
      <WeaponsClient weapons={weapons} />
    </>
  );
}

export default async function WeaponsPage() {
  return (
    <main className="min-h-screen text-white" style={{ background: 'var(--bg-void, #0d0c0a)' }}>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-24">
        <Suspense fallback={<WeaponsSkeleton />}>
          <WeaponsContent />
        </Suspense>
      </div>
    </main>
  );
}
