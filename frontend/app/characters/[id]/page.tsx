/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchGraphQL, GET_CHARACTER_BY_ID, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData, Element, WeaponType } from '@/types/character';
import { ChevronLeft, Flame, Droplets, Wind, Zap, Leaf, Snowflake, Mountain, Sword, Target, Crosshair, Book, MoreHorizontal } from 'lucide-react';

function ElementIcon({ element, className = "w-4 h-4" }: { element: Element, className?: string }) {
  switch (element) {
    case 'Pyro': return <Flame className={`${className} text-red-500`} />;
    case 'Hydro': return <Droplets className={`${className} text-blue-500`} />;
    case 'Anemo': return <Wind className={`${className} text-teal-400`} />;
    case 'Electro': return <Zap className={`${className} text-purple-500`} />;
    case 'Dendro': return <Leaf className={`${className} text-green-500`} />;
    case 'Cryo': return <Snowflake className={`${className} text-cyan-300`} />;
    case 'Geo': return <Mountain className={`${className} text-yellow-600`} />;
    default: return <div className={`${className} bg-zinc-500 rounded-full`} />;
  }
}

function WeaponIcon({ weapon, className = "w-4 h-4" }: { weapon: WeaponType, className?: string }) {
  switch (weapon) {
    case 'Sword': return <Sword className={className} />;
    case 'Claymore': return <MoreHorizontal className={className} />;
    case 'Polearm': return <Target className={className} />;
    case 'Bow': return <Crosshair className={className} />;
    case 'Catalyst': return <Book className={className} />;
    default: return <div className={`${className} bg-zinc-500 rounded-sm`} />;
  }
}

export default async function CharacterDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const [characterData, allCharactersData] = await Promise.all([
    fetchGraphQL(GET_CHARACTER_BY_ID, { id: resolvedParams.id }),
    fetchGraphQL(GET_CHARACTERS)
  ]);

  const character = characterData.character;
  const characters = allCharactersData.characters;

  if (!character) notFound();

  const borderColorSolid = character.rarity === 5 ? 'border-amber-500' : 'border-purple-500';
  const borderColor = character.rarity === 5 ? 'border-amber-500/30' : 'border-purple-500/30';
  const glowColor = character.rarity === 5 ? 'bg-amber-500/10' : 'bg-purple-500/10';
  const textColor = character.rarity === 5 ? 'text-amber-500' : 'text-purple-400';
  const gradientColor = character.rarity === 5 ? 'from-amber-500/20' : 'from-purple-500/20';

  return (
    <div className="flex-1 flex overflow-hidden flex-col md:flex-row min-h-[calc(100vh-64px)] bg-[#0b0b0e] text-zinc-100 font-sans">
      {/* Sidebar Info */}
      <aside className="w-full md:w-80 border-r border-[#1c1c22] p-6 flex flex-col gap-6 bg-[#111115] shrink-0 overflow-y-auto md:overflow-visible relative z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors w-fit">
          <ChevronLeft className="w-4 h-4" />
          Back to Characters
        </Link>
        
        <div className={`relative aspect-[3/4] rounded-2xl bg-[#0b0b0e] border border-[#1c1c22] overflow-hidden group mt-2 shrink-0 md:shrink`}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/20 to-transparent z-10 w-full h-full pointer-events-none"></div>
          
          <div className={`absolute inset-0 ${glowColor} flex items-center justify-center`}>
            {character.splashArtUrl ? (
              <img 
                src={character.splashArtUrl} 
                alt={`${character.name} Splash`} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
            ) : (
              <div className={`w-32 h-32 rounded-full border-4 ${borderColor} animate-pulse`}></div>
            )}
          </div>
          <div className="absolute bottom-4 left-4 z-20">
            <span className={`text-[10px] uppercase tracking-widest ${textColor} font-bold mb-1 block flex items-center gap-1.5`}>
              <ElementIcon element={character.element} className="w-3 h-3" />
              {character.name}
            </span>
            <h2 className="text-2xl font-bold leading-tight text-white mb-2">{character.title}</h2>
            <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-black/80 border ${borderColorSolid}`}>
              {"★".repeat(character.rarity)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 z-20 relative">
          <div className="bg-[#1c1c22]/50 p-3 rounded-xl border border-[#1c1c22]">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Region</div>
            <div className="flex items-center gap-2 font-semibold text-zinc-300 text-sm">
              {character.region}
            </div>
          </div>
          <div className="bg-[#1c1c22]/50 p-3 rounded-xl border border-[#1c1c22]">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Weapon</div>
            <div className="flex items-center gap-2 font-semibold text-zinc-300 text-sm">
              <WeaponIcon weapon={character.weapon} className="w-4 h-4 text-zinc-400" />
              {character.weapon}
            </div>
          </div>
        </div>
      </aside>

      {/* Build Guide & Encyclopedia */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-[#0b0b0e]">
        <div className="max-w-5xl mx-auto h-full">
          
          {/* Lore & Base Stats Section */}
          {(character.lore || character.baseStats) && (
            <section className="mb-10 bg-[#15151a] p-6 rounded-2xl border border-[#1c1c22]">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                Encyclopedia
              </h3>
              
              {character.lore && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Cốt truyện</h4>
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">{character.lore}</p>
                </div>
              )}
              
              {character.baseStats && (
                <div>
                  <h4 className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wider">Chỉ số cơ bản</h4>
                  <div className="bg-[#111115] p-3 rounded-xl border border-[#1c1c22] font-mono text-sm text-zinc-300">
                    {character.baseStats}
                  </div>
                </div>
              )}
              
              {character.fandomUrl && (
                <div className="mt-4 pt-4 border-t border-[#1c1c22]">
                  <a href={character.fandomUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">
                    Xem chi tiết trên Fandom Wiki ↗
                  </a>
                </div>
              )}
            </section>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full pb-10">
            
            {/* Column 1: Weapons & Artifacts */}
            <div className="space-y-12">
              {/* Weapons */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                  Best Weapons
                </h3>
                <div className="space-y-3">
                  {character.bestWeapons.map((wp, index) => {
                    const isTop = wp.rank === 1;
                    return (
                      <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${isTop ? `bg-[#15151a] border-l-4 ${borderColorSolid} border-y border-r border-[#1c1c22]` : 'bg-[#15151a]/50 border border-[#1c1c22] opacity-80'}`}>
                        <div className="flex gap-4 items-center">
                          <div className={`w-12 h-12 flex-shrink-0 rounded flex items-center justify-center font-bold ${isTop ? glowColor + ' ' + textColor : 'bg-[#1c1c22] text-zinc-400'}`}>
                            {isTop ? 'S+' : `R${wp.rank}`}
                          </div>
                          <div>
                            <div className="font-bold flex items-center gap-2 text-zinc-100">
                              {wp.name}
                            </div>
                          </div>
                        </div>
                        {wp.isF2P && (
                           <span className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-mono uppercase font-bold">F2P</span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* Artifacts */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                  Recommended Artifacts
                </h3>
                <div className="space-y-4">
                  {character.bestArtifacts.map((art, index) => (
                    <div key={index} className="px-5 py-6 rounded-2xl bg-[#15151a] border border-[#1c1c22] relative overflow-hidden">
                      {index === 0 && <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${gradientColor} to-transparent opacity-50`}></div>}
                      <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className={`w-14 h-14 shrink-0 rounded-xl border flex items-center justify-center ${glowColor} ${borderColor}`}>
                           <Leaf className={`w-7 h-7 ${textColor}`} />
                        </div>
                        <div>
                          <div className={`text-lg font-bold ${textColor === 'text-amber-500' ? 'text-amber-100' : 'text-purple-100'}`}>
                            {art.setName}
                          </div>
                          <div className={`text-xs font-semibold mt-1 px-2 py-0.5 bg-black/50 w-fit rounded text-zinc-400 uppercase tracking-widest`}>{art.pieces}-Piece Set</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 relative z-10 mb-4">
                        <div className="bg-[#111115] p-3 rounded-lg border border-[#1c1c22] text-center flex flex-col justify-center">
                          <div className="text-[10px] uppercase text-zinc-500 mb-1 tracking-widest">Sands</div>
                          <div className="text-xs font-bold leading-tight text-zinc-200">{art.sands.join(' / ')}</div>
                        </div>
                        <div className="bg-[#111115] p-3 rounded-lg border border-[#1c1c22] text-center flex flex-col justify-center">
                          <div className="text-[10px] uppercase text-zinc-500 mb-1 tracking-widest">Goblet</div>
                          <div className="text-xs font-bold leading-tight text-zinc-200">{art.goblet.join(' / ')}</div>
                        </div>
                        <div className="bg-[#111115] p-3 rounded-lg border border-[#1c1c22] text-center flex flex-col justify-center">
                          <div className="text-[10px] uppercase text-zinc-500 mb-1 tracking-widest">Circlet</div>
                          <div className="text-xs font-bold leading-tight text-zinc-200">{art.circlet.join(' / ')}</div>
                        </div>
                      </div>

                      {/* Substats inside Artifact Block */}
                      <div className="mt-4 pt-4 border-t border-[#1c1c22]">
                        <div className="text-[10px] uppercase text-zinc-500 mb-3 tracking-widest font-bold">Sub-stats Priority</div>
                        <div className="flex flex-wrap items-center gap-1.5 gap-y-2">
                          {art.subStatsPriority.map((stat, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                              <span className={`text-xs font-medium px-2 py-1 rounded-md border ${idx === 0 ? `bg-[#1c1c22] text-zinc-100 ${borderColor}` : 'bg-transparent border-[#1c1c22] text-zinc-400'}`}>
                                {stat}
                              </span>
                              {idx < art.subStatsPriority.length - 1 && <span className="text-zinc-700 text-[10px]">➔</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Column 2: Stats & Teams */}
            <div className="space-y-12">

              {/* Talents */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                  Talent Priority
                </h3>
                <div className="flex items-center gap-2 flex-wrap bg-[#15151a] p-5 rounded-2xl border border-[#1c1c22]">
                  {character.talentPriority.map((talent, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                       <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-800 ${idx === 0 ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-zinc-900 text-zinc-300'}`}>
                          {talent}
                       </span>
                       {idx < character.talentPriority.length - 1 && <span className="text-zinc-600 text-xs">➔</span>}
                    </div>
                  ))}
                </div>
              </section>

              {/* Team Synergies */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                  Meta Team Comps
                </h3>
                <div className="space-y-4">
                  <div className={`bg-[#15151a] p-5 rounded-2xl border border-[#1c1c22]`}>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4 font-bold">Recommended Teammates</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {character.bestTeams.map((teamCharId, charIdx) => {
                        const teamChar = characters.find(c => c.id === teamCharId);
                        return (
                          <Link href={`/characters/${teamCharId}`} key={charIdx} className={`rounded-xl bg-[#1c1c22] border border-gray-700/50 overflow-hidden group relative aspect-square transition-all hover:scale-[1.02] hover:border-gray-500`}>
                              <div className="w-full h-full relative">
                                {teamChar ? (
                                  <img 
                                    src={teamChar.avatarUrl} 
                                    alt={teamChar.name}
                                    referrerPolicy="no-referrer"
                                    className="w-full h-full object-cover transition-opacity"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-zinc-600 font-mono text-xs uppercase text-center p-2 break-all shadow-inner">
                                    {teamCharId}
                                  </div>
                                )}
                              </div>
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2 pt-6">
                                <span className="text-[10px] font-bold text-white uppercase tracking-wider block text-center truncate">
                                  {teamChar ? teamChar.name : teamCharId}
                                </span>
                              </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </section>
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
