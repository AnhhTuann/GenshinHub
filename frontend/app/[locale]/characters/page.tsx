import CharacterGallery from '@/components/CharacterGallery';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: `${t('characters')} — GenshinHub`,
    description: 'Explore all Genshin Impact characters — builds, teams, weapons, artifacts, and stats.',
  };
}

function CharactersSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-8 animate-pulse">
        <div className="h-10 w-48 bg-white/[0.05] rounded-md mb-2" />
        <div className="h-5 w-64 bg-white/[0.03] rounded-md pl-6" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4 lg:gap-5">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-white/[0.03] animate-pulse rounded-2xl border border-white/5" />
        ))}
      </div>
    </div>
  );
}

async function CharactersContent({ locale }: { locale: string }) {
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters || [];
  
  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-[3px] h-8 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #f0d080, #c8a84b)' }}
          />
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
            {locale === 'en' ? 'Characters' : 'Nhân Vật'}
          </h1>
        </div>
        <p className="text-white/35 text-sm font-medium pl-6">
          {locale === 'en'
            ? `Explore ${characters.length} characters in Teyvat — builds, teams, weapons & stats`
            : `Khám phá ${characters.length} nhân vật trong Teyvat — build, đội hình, vũ khí & chỉ số`}
        </p>
      </div>
      <CharacterGallery initialCharacters={characters} />
    </>
  );
}

export default async function CharactersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main
      className="relative min-h-screen text-white overflow-x-hidden"
      style={{ background: 'var(--bg-void, #04040a)' }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-[15%] left-[10%] w-[700px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(200,168,75,0.06) 0%, transparent 70%)', filter: 'blur(130px)' }}
        />
        <div
          className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(127,90,240,0.04) 0%, transparent 70%)', filter: 'blur(110px)' }}
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-10 pb-24">
        <Suspense fallback={<CharactersSkeleton />}>
          <CharactersContent locale={locale} />
        </Suspense>
      </div>
    </main>
  );
}
