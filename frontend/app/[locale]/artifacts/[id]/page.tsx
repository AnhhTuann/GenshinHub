import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchGraphQL, GET_ARTIFACT_SET, GET_ARTIFACTS } from '@/lib/graphql';

const RARITY_BG: Record<number, string> = {
  5: 'from-[#FFE082] via-[#FFB300] to-[#E65100]',
  4: 'from-[#CE93D8] via-[#9C27B0] to-[#6A1B9A]',
  3: 'from-[#90CAF9] via-[#1976D2] to-[#0D47A1]',
  2: 'from-gray-400 via-gray-650 to-gray-800',
  1: 'from-gray-500 via-gray-700 to-gray-900',
};

const RARITY_BORDER: Record<number, string> = {
  5: 'border-amber-500/40 shadow-[0_0_30px_rgba(245,158,11,0.08)]',
  4: 'border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.08)]',
  3: 'border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.08)]',
  2: 'border-gray-500/40',
  1: 'border-gray-600/40',
};

const STAR_COLOR: Record<number, string> = {
  5: 'text-yellow-400',
  4: 'text-purple-400',
  3: 'text-blue-400',
  2: 'text-gray-400',
  1: 'text-gray-500',
};

interface ArtifactSet {
  id: string;
  name: string;
  rarityList: number[];
  piece2Desc: string | null;
  piece4Desc: string | null;
  iconUrl: string | null;
}

interface CharBasic {
  id: string;
  name: string;
  element: string;
  rarity: number;
  avatarUrl: string;
  bestArtifacts?: {
    setName: string;
    artifactSetId: string | null;
  }[];
}

export async function generateStaticParams() {
  const data = await fetchGraphQL(GET_ARTIFACTS);
  return (data.artifacts || []).map((art: any) => ({ id: art.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchGraphQL(GET_ARTIFACT_SET, { id });
  const set = data.artifactSet as ArtifactSet | null;
  if (!set) return { title: 'Artifact Set Not Found' };
  return {
    title: `${set.name} - GenshinHub`,
    description: `Artifact Set: ${set.name}. 2-Piece: ${set.piece2Desc || 'None'}. 4-Piece: ${set.piece4Desc || 'None'}`,
  };
}

export default async function ArtifactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const data = await fetchGraphQL(GET_ARTIFACT_SET, { id });
  const artifactSet = data.artifactSet as ArtifactSet | null;
  if (!artifactSet) notFound();

  // Fetch all characters with their artifacts to filter
  const charsData = await fetchGraphQL(`
    query GetCharactersWithArtifacts {
      characters {
        id
        name
        element
        rarity
        avatarUrl
        bestArtifacts {
          setName
          artifactSetId
        }
      }
    }
  `);

  const allCharacters: CharBasic[] = charsData.characters || [];
  
  // Filter characters using this artifact set
  const characters = allCharacters.filter((char) =>
    char.bestArtifacts?.some(
      (art) => art.artifactSetId === id || art.setName.toLowerCase() === artifactSet.name.toLowerCase()
    )
  );

  const rarity = artifactSet.rarityList && artifactSet.rarityList.length > 0 ? Math.max(...artifactSet.rarityList) : 5;
  const stars = '★'.repeat(rarity);

  return (
    <main className="min-h-screen bg-[#07070a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-black uppercase tracking-wider w-fit mb-6" href="/artifacts">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          All Artifact Sets
        </Link>

        {/* Hero Section */}
        <div className={`relative rounded-3xl border ${RARITY_BORDER[rarity]} overflow-hidden bg-[#0d0d12]/50 shadow-2xl mb-8 backdrop-blur-md`}>
          {/* Background glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${RARITY_BG[rarity]} opacity-[0.03]`} />

          <div className="relative flex flex-col md:flex-row gap-8 p-8">
            {/* Artifact Image Wrapper */}
            <div className={`w-40 h-40 flex-shrink-0 rounded-2xl bg-gradient-to-br ${RARITY_BG[rarity]} p-[1px] shadow-xl self-center`}>
              <div className="relative w-full h-full rounded-2xl bg-[#07070a]/90 flex items-center justify-center overflow-hidden p-2">
                {artifactSet.iconUrl ? (
                  <Image src={artifactSet.iconUrl} alt={artifactSet.name} fill className="object-contain p-2" />
                ) : (
                  <span className="text-5xl select-none">💎</span>
                )}
              </div>
            </div>

            {/* Artifact Info */}
            <div className="flex-1 flex flex-col justify-center">
              <p className="text-gray-550 text-[10px] font-black uppercase tracking-widest mb-1 font-display">Artifact Set</p>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight font-display uppercase tracking-tight">{artifactSet.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <p className={`text-xl font-bold ${STAR_COLOR[rarity]}`}>{stars}</p>
                <span className="text-gray-800">|</span>
                <span className="text-xs text-gray-400 font-semibold">
                  Rarities: {artifactSet.rarityList.map(r => `${r}★`).join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Set Effects */}
          <div className="relative mx-8 mb-8 bg-[#050508]/65 border border-gray-955 rounded-2xl p-5 shadow-inner flex flex-col gap-4">
            {artifactSet.piece2Desc && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-550 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-550/10 border border-yellow-550/20 font-display">
                    2-Piece Set
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{artifactSet.piece2Desc}</p>
              </div>
            )}
            
            {artifactSet.piece4Desc && (
              <div className="border-t border-gray-950 pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-550 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-yellow-550/10 border border-yellow-550/20 font-display">
                    4-Piece Set
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{artifactSet.piece4Desc}</p>
              </div>
            )}
          </div>
        </div>

        {/* Characters that can use this set */}
        <section>
          <h2 className="text-xl font-black text-white mb-5 flex items-center gap-3 font-display uppercase tracking-wider">
            <span className="w-1 h-5 rounded-full bg-yellow-500 inline-block"></span>
            Recommended For
            <span className="text-gray-500 text-xs font-bold uppercase tracking-widest ml-1 font-sans">({characters.length} characters)</span>
          </h2>

          {characters.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {characters.map((char) => (
                <Link
                  key={char.id}
                  href={`/characters/${char.id}`}
                  className="group flex flex-col items-center gap-1.5 hover:scale-105 transition-transform"
                >
                  <div className={`relative w-full aspect-square rounded-xl overflow-hidden border ${char.rarity === 5 ? 'border-yellow-500/50' : 'border-purple-500/40'} bg-gradient-to-br ${char.rarity === 5 ? 'from-yellow-900/40 to-amber-950/60' : 'from-purple-900/40 to-violet-950/60'} p-0.5`}>
                    {char.avatarUrl ? (
                      <Image
                        src={char.avatarUrl}
                        alt={char.name}
                        fill
                        className="object-cover object-top rounded-lg group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                    )}
                    {/* Element icon */}
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/5">
                      <Image
                        src={`/elements/${char.element.toLowerCase()}.png`}
                        alt={char.element}
                        width={12}
                        height={12}
                        className="drop-shadow-md"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center leading-tight group-hover:text-white transition-colors line-clamp-2">
                    {char.name}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-[#0d0d12]/30 border border-gray-900/60 rounded-2xl p-8 text-center text-gray-500 text-sm">
              No recommended builds currently list this artifact set.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
