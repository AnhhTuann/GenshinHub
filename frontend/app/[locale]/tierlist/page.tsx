import { getTranslations, setRequestLocale } from 'next-intl/server';
import { fetchGraphQL, GET_CHARACTERS, GET_WEAPONS, GET_TIER_RANKS } from '@/lib/graphql';
import TierListClient from './TierListClient';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TierList' });
  return {
    title: `${t('title')} — GenshinHub`,
    description: t('description'),
  };
}

export default async function TierListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'TierList' });

  const [charData, weaponData, tierData] = await Promise.all([
    fetchGraphQL(GET_CHARACTERS),
    fetchGraphQL(GET_WEAPONS),
    fetchGraphQL(GET_TIER_RANKS),
  ]);

  const characters = charData.characters    || [];
  const weapons    = weaponData.weapons     || [];
  const tierRanks  = tierData.tierRanks     || [];

  return (
    <main className="min-h-screen text-white" style={{ background: 'var(--bg-void, #04040a)' }}>
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[10%] -left-[5%] w-[700px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.06) 0%, transparent 70%)', filter: 'blur(130px)' }}
        />
        <div
          className="absolute top-[35%] -right-[8%] w-[500px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(127,90,240,0.04) 0%, transparent 70%)', filter: 'blur(110px)' }}
        />
      </div>

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-[3px] h-8 rounded-full" style={{ background: 'linear-gradient(to bottom, #ffd54f, #f59e0b)' }} />
            <h1
              className="text-3xl sm:text-4xl font-black uppercase tracking-tight"
              style={{
                fontFamily: 'var(--font-cinzel, Cinzel, serif)',
                background: 'linear-gradient(135deg, #fef3c7 0%, #ffd54f 50%, #f59e0b 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {t('title')}
            </h1>
          </div>
          <p className="text-white/35 text-sm font-medium pl-6">{t('description')}</p>
        </div>
      </div>

      <TierListClient locale={locale} characters={characters} weapons={weapons} tierRanks={tierRanks} />
    </main>
  );
}
