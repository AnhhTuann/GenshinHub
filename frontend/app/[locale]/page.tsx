import CharacterGallery from '@/components/CharacterGallery';
import { fetchGraphQL, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Common');
  const data = await fetchGraphQL(GET_CHARACTERS);
  const characters: CharacterData[] = data.characters;

  return (
    <main className="relative min-h-screen bg-[#07070a] text-gray-200 p-6 md:p-8 font-sans overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.08)_0,transparent_75%)] pointer-events-none -z-10"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Hero Header Section */}
        <div className="mb-10 border-b border-gray-900 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 mb-2 drop-shadow-sm font-display tracking-tight uppercase">
              GenshinHub Database
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-medium">
              Your ultimate companion for Genshin Impact. Discover character builds, weapons, artifacts, and team comps.
            </p>
          </div>
          
          <Link href="/showcase">
            <button className="flex items-center gap-2.5 px-6 py-3 bg-[#111116]/80 backdrop-blur-md text-yellow-500 font-bold rounded-xl border border-yellow-500/20 hover:bg-yellow-500/10 hover:border-yellow-400/50 hover:shadow-[0_0_25px_rgba(234,179,8,0.15)] transition-all duration-300 text-xs uppercase tracking-wider active:scale-95">
              <span>🔍</span> {t('showcase')}
            </button>
          </Link>
        </div>

        <CharacterGallery initialCharacters={characters}/>
      </div>
    </main>
  );
}
