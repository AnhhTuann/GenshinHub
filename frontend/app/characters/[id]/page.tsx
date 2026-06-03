import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { fetchGraphQL, GET_CHARACTER_BY_ID, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import WeaponCard from '@/components/WeaponCard';
import ArtifactCard from '@/components/ArtifactCard';
import StatCard from '@/components/StatCard';
import CharacterSidebar from '@/components/CharacterSidebar';
import Image from 'next/image';

export async function generateStaticParams() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  return data.characters.map((char: any) => ({
    id: char.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await fetchGraphQL(GET_CHARACTER_BY_ID, { id: resolvedParams.id });
  const character = data.character;
  if (!character) return { title: 'Character Not Found' };
  
  return {
    title: `${character.name} - TeyvatDB`,
    description: character.title,
    openGraph: {
      images: [character.avatarUrl],
    }
  };
}

export default async function CharacterDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const [characterData, allCharactersData] = await Promise.all([
    fetchGraphQL(GET_CHARACTER_BY_ID, { id: resolvedParams.id }),
    fetchGraphQL(GET_CHARACTERS)
  ]);

  const character: CharacterData = characterData.character;
  const characters: CharacterData[] = allCharactersData.characters;

  if (!character) notFound();

  return (
    <main className="min-h-screen bg-[#0b0b0e] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium w-fit" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Characters
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8 items-start mt-4">
        <CharacterSidebar character={character} />

        {/* Right Column (Scrollable) */}
        <div className="w-full lg:w-[65%] flex flex-col gap-8">
          
          {/* Encyclopedia & Stats */}
          <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6 md:p-8">
            <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Encyclopedia
            </h3>
            
            <div className="mb-6 pb-6 border-b border-gray-800/50">
              <h4 className="text-white font-bold mb-3">Cốt Truyện</h4>
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                {character.description || "Dữ liệu cốt truyện đang được cập nhật..."}
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Chỉ Số Cơ Bản (Lv. 90)</h4>
              <div className="grid grid-cols-3 gap-4">
                <StatCard label="Base HP" value={character.baseHp || 0} colorClass="text-green-400" />
                <StatCard label="Base ATK" value={character.baseAtk || 0} colorClass="text-red-400" />
                <StatCard label="Base DEF" value={character.baseDef || 0} colorClass="text-blue-400" />
              </div>
            </div>
          </section>

          <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6 md:p-8">
            <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Cấu hình DPS
            </h3>
            
            <div className="mb-4">
              <div className="w-1 h-5 bg-blue-500 rounded-full inline-block align-middle mr-2"></div>
              <span className="text-xl font-bold text-gray-200 align-middle">Vũ khí</span>
            </div>

            <div className="flex flex-col gap-6 mt-6">
              {character.bestWeapons.map((weapon, idx) => (
                <WeaponCard key={idx} weapon={weapon} index={idx} />
              ))}
            </div>
          </section>

          <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6 md:p-8">
            <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Recommended Artifacts
            </h3>
            {character.bestArtifacts.map((artifact, idx) => (
              <ArtifactCard key={idx} artifact={artifact} />
            ))}
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6">
              <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Talent Priority
              </h3>
              <div className="flex flex-col gap-3">
                {character.talentPriority.map((talent, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-white text-black text-xs font-bold px-3 py-2 rounded-md whitespace-nowrap">
                      {talent}
                    </div>
                    {idx < character.talentPriority.length - 1 && (
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6">
              <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Meta Team Comps
              </h3>
              <span className="text-gray-500 text-[10px] font-bold uppercase mb-3 block">Recommended Teammates</span>
              <div className="flex flex-wrap gap-3">
                {character.bestTeams.map((teammateId) => {
                  const teammate = characters.find(c => c.id === teammateId);
                  return (
                    <Link className="group relative" href={`/characters/${teammateId}`} key={teammateId}>
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-700 group-hover:border-white transition-colors bg-[#0b0b0e]">
                         {teammate ? (
                           <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${teammate.avatarUrl})` }} />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600 font-bold uppercase text-center break-all">{teammateId}</div>
                         )}
                      </div>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
                        {teammate ? teammate.name : teammateId}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </div>

        </div>
      </div>
    </main>
  );
}
