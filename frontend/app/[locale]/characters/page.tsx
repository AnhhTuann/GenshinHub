import CharacterGallery from '@/components/CharacterGallery';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export const revalidate = 300;

export default async function CharactersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Common' });
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters;

  return (
    <main className="relative min-h-screen bg-[#06060a] text-white font-sans overflow-x-hidden pt-[100px] pb-24 px-4 sm:px-6">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-yellow-500/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2 font-display uppercase tracking-tight text-gradient-gold">
            {t('characters')}
          </h1>
          <p className="text-white/50 text-sm font-medium">
            Explore {characters.length} characters in Teyvat.
          </p>
        </div>

        <CharacterGallery initialCharacters={characters} />
      </div>
    </main>
  );
}
