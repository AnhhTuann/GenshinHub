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
import { detailedTeamsData } from '@/data/teams';

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

  const detailedTeams = detailedTeamsData[character.id] || [];
  const hasDetailedTeams = detailedTeams.length > 0;

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

          {hasDetailedTeams ? (
            /* Full-width layout for Substats & Talents Priority when detailed teams exist (Recommended Teammates is hidden/redundant) */
            <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 justify-between">
              <div className="flex-1">
                <div className="mb-4">
                  <div className="w-1 h-5 bg-orange-500 rounded-full inline-block align-middle mr-2"></div>
                  <span className="text-xl font-bold text-gray-200 align-middle">Substats Priority</span>
                </div>
                
                {character.bestArtifacts && character.bestArtifacts[0]?.subStatsPriority && character.bestArtifacts[0].subStatsPriority.length > 0 ? (
                  <div className="flex flex-wrap gap-x-4 gap-y-3">
                    {character.bestArtifacts[0].subStatsPriority.map((stat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-6 h-6 rounded bg-[#1d2942]/60 border border-[#2d3f64]/40 flex items-center justify-center text-[#60a5fa] text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="bg-[#1e293b]/30 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-md font-semibold">
                          {stat}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">No substats recommended</span>
                )}
              </div>

              <div className="flex-1 md:border-l md:border-gray-800/60 md:pl-8">
                <div className="mb-4">
                  <div className="w-1 h-5 bg-red-500 rounded-full inline-block align-middle mr-2"></div>
                  <span className="text-xl font-bold text-gray-200 align-middle">Talents Priority</span>
                </div>
                
                <div className="flex flex-col gap-3.5">
                  {character.talentPriority.map((talent, idx) => {
                    let abbreviation = "NA";
                    if (talent.toLowerCase().includes("skill") || talent.toLowerCase() === "e") {
                      abbreviation = "E";
                    } else if (talent.toLowerCase().includes("burst") || talent.toLowerCase() === "q") {
                      abbreviation = "Q";
                    }
                    
                    let displayName = talent;
                    if (talent === "Normal Attack") displayName = "Normal Attack";
                    else if (talent === "Skill") displayName = "Skill";
                    else if (talent === "Burst") displayName = "Burst";
                    else if (talent === "Elemental Skill") displayName = "Skill";
                    else if (talent === "Elemental Burst") displayName = "Burst";

                    return (
                      <div key={idx} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1d2942]/60 border border-[#2d3f64]/40 flex items-center justify-center text-[#60a5fa] text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span className="bg-[#ebd9ab]/10 border border-[#ebd9ab]/20 text-[#d9c491] text-[10px] font-extrabold w-8 h-6 flex items-center justify-center rounded-full">
                          {abbreviation}
                        </span>
                        <span className="text-gray-200 text-sm font-semibold">
                          {displayName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          ) : (
            /* Fallback 2-column layout for characters without detailed team comps */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Substats & Talents Priority */}
              <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6 flex flex-col gap-8">
                <div>
                  <div className="mb-4">
                    <div className="w-1 h-5 bg-orange-500 rounded-full inline-block align-middle mr-2"></div>
                    <span className="text-xl font-bold text-gray-200 align-middle">Substats Priority</span>
                  </div>
                  
                  {character.bestArtifacts && character.bestArtifacts[0]?.subStatsPriority && character.bestArtifacts[0].subStatsPriority.length > 0 ? (
                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                      {character.bestArtifacts[0].subStatsPriority.map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className="w-6 h-6 rounded bg-[#1d2942]/60 border border-[#2d3f64]/40 flex items-center justify-center text-[#60a5fa] text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="bg-[#1e293b]/30 border border-slate-800 text-slate-200 text-xs px-3 py-1.5 rounded-md font-semibold">
                            {stat}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">No substats recommended</span>
                  )}
                </div>

                <div>
                  <div className="mb-4">
                    <div className="w-1 h-5 bg-red-500 rounded-full inline-block align-middle mr-2"></div>
                    <span className="text-xl font-bold text-gray-200 align-middle">Talents Priority</span>
                  </div>
                  
                  <div className="flex flex-col gap-3.5">
                    {character.talentPriority.map((talent, idx) => {
                      let abbreviation = "NA";
                      if (talent.toLowerCase().includes("skill") || talent.toLowerCase() === "e") {
                        abbreviation = "E";
                      } else if (talent.toLowerCase().includes("burst") || talent.toLowerCase() === "q") {
                        abbreviation = "Q";
                      }
                      
                      let displayName = talent;
                      if (talent === "Normal Attack") displayName = "Normal Attack";
                      else if (talent === "Skill") displayName = "Skill";
                      else if (talent === "Burst") displayName = "Burst";
                      else if (talent === "Elemental Skill") displayName = "Skill";
                      else if (talent === "Elemental Burst") displayName = "Burst";

                      return (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-[#1d2942]/60 border border-[#2d3f64]/40 flex items-center justify-center text-[#60a5fa] text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="bg-[#ebd9ab]/10 border border-[#ebd9ab]/20 text-[#d9c491] text-[10px] font-extrabold w-8 h-6 flex items-center justify-center rounded-full">
                            {abbreviation}
                          </span>
                          <span className="text-gray-200 text-sm font-semibold">
                            {displayName}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* Recommended Teammates */}
              <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6">
                <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Recommended Teammates
                </h3>
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
          )}

          {/* Conditional Detailed Meta Teams Section */}
          {detailedTeams && detailedTeams.length > 0 && (
            <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6 md:p-8 mt-8">
              <div className="mb-6">
                <div className="w-1 h-5 bg-[#3b82f6] rounded-full inline-block align-middle mr-2"></div>
                <span className="text-xl font-bold text-gray-200 align-middle">Meta Team Comps</span>
              </div>
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {detailedTeams.map((team, teamIdx) => (
                  <div key={teamIdx} className="bg-[#0b0b0e]/80 border border-gray-850 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-300">
                    <div>
                      {/* Team Header */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-800/50">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-950 text-blue-300 flex items-center justify-center text-xs font-bold border border-blue-800/30">
                            {teamIdx + 1}
                          </span>
                          <h4 className="text-lg font-bold text-gray-100">{team.name}</h4>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-xs font-black uppercase tracking-wider ${
                          team.rank === 'SS' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                          team.rank === 'S' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {team.rank}
                        </span>
                      </div>
                      
                      {/* Description with color tags support */}
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {team.description}
                      </p>
                      
                      {/* Character Avatars Row */}
                      <div className="grid grid-cols-4 gap-2 mb-6 bg-[#15151a]/60 p-3 rounded-xl border border-gray-900/60">
                        {team.members.map((m, mIdx) => {
                          const teammate = characters.find(c => c.id === m.characterId);
                          return (
                            <Link href={`/characters/${m.characterId}`} key={mIdx} className="group flex flex-col items-center gap-1">
                              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gray-800 group-hover:border-white transition-all duration-300 bg-[#0b0b0e]">
                                {teammate ? (
                                  <Image src={teammate.avatarUrl} alt={teammate.name} fill className="object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 font-bold uppercase text-center break-all">{m.characterId}</div>
                                )}
                              </div>
                              <span className="text-[10px] text-gray-400 font-bold group-hover:text-gray-300 text-center uppercase tracking-wider truncate w-full">
                                {m.role}
                              </span>
                              <span className="text-xs text-gray-200 font-semibold text-center truncate w-full">
                                {teammate ? teammate.name : m.characterId}
                              </span>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Detailed members list */}
                      <div className="flex flex-col gap-4">
                        {team.members.map((m, mIdx) => {
                          const teammate = characters.find(c => c.id === m.characterId);
                          return (
                            <div key={mIdx} className="bg-[#15151a]/30 border border-gray-800/40 rounded-xl p-4 flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-100 font-bold text-sm">{teammate ? teammate.name : m.characterId}</span>
                                <span className="text-gray-600 text-xs">•</span>
                                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{m.role}</span>
                              </div>
                              <p className="text-gray-300 text-sm leading-relaxed">{m.roleDesc}</p>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2 pt-2.5 border-t border-gray-800/30 text-xs text-gray-400">
                                <div>
                                  <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wide block mb-0.5">Weapons:</span>
                                  <span className="text-gray-250 font-semibold">{m.weapons.join(', ')}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wide block mb-0.5">Artifacts:</span>
                                  <span className="text-gray-250 font-semibold">{m.artifacts.join(', ')}</span>
                                </div>
                                <div>
                                  <span className="text-gray-500 font-bold uppercase text-[9px] tracking-wide block mb-0.5">Substats:</span>
                                  <span className="text-gray-250 font-semibold">{m.substats.join(' > ')}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
