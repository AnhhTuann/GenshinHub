import { fetchGraphQL, GET_WEAPONS } from '@/lib/graphql';
import type { Metadata } from 'next';
import WeaponsClient from './WeaponsClient';

export const metadata: Metadata = {
  title: 'Weapons — GenshinHub',
  description: 'Explore all weapons in Genshin Impact — ATK, substats, passives, and more.',
};

function PageAmbient({ color1, color2 }: { color1: string; color2: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-[15%] -right-[10%] w-[750px] h-[600px] rounded-full"
        style={{ background: `radial-gradient(ellipse, ${color1} 0%, transparent 70%)`, filter: 'blur(130px)' }}
      />
      <div
        className="absolute bottom-[-15%] -left-[10%] w-[600px] h-[500px] rounded-full"
        style={{ background: `radial-gradient(ellipse, ${color2} 0%, transparent 70%)`, filter: 'blur(110px)' }}
      />
    </div>
  );
}

export default async function WeaponsPage() {
  const data = await fetchGraphQL(GET_WEAPONS);
  const weapons = data.weapons || [];

  return (
    <main className="min-h-screen text-white" style={{ background: 'var(--bg-void, #04040a)' }}>
      <PageAmbient color1="rgba(200,168,75,0.06)" color2="rgba(239,68,68,0.03)" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-24">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-[3px] h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #f0d080, #c8a84b)' }} />
            <h1
              className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
              style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                background: 'linear-gradient(135deg, #f0d080 0%, #c8a84b 60%, #8a6820 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Weapons
            </h1>
          </div>
          <p className="text-white/35 text-sm font-medium pl-6">
            {weapons.length} weapons — swords, claymores, polearms, bows & catalysts
          </p>
        </div>
        <WeaponsClient weapons={weapons} />
      </div>
    </main>
  );
}
