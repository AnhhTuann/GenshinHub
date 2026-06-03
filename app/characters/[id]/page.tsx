import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import charactersData from '@/data/characters.json';
import { CharacterItem, Element, WeaponType } from '@/types/character';
import { ChevronLeft, Flame, Droplets, Wind, Zap, Leaf, Snowflake, Mountain, Sword, Target, Crosshair, Book, MoreHorizontal } from 'lucide-react';

const characters: CharacterItem[] = charactersData as CharacterItem[];

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

export default async function CharacterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const character = characters.find(c => c.id === resolvedParams.id);
  
  if (!character) {
    notFound();
  }

  const borderColor = character.rarity === 5 ? 'border-amber-500/30' : 'border-purple-500/30';
  const borderColorSolid = character.rarity === 5 ? 'border-amber-500' : 'border-purple-500';
  const glowColor = character.rarity === 5 ? 'bg-amber-500/10' : 'bg-purple-500/10';
  const textColor = character.rarity === 5 ? 'text-amber-500' : 'text-purple-400';
  const gradientColor = character.rarity === 5 ? 'from-amber-500/20' : 'from-purple-500/20';

  return (
    <div className="flex-1 flex overflow-hidden flex-col md:flex-row">
      {/* Sidebar Info */}
      <aside className="w-full md:w-80 border-r border-zinc-800 p-6 flex flex-col gap-6 bg-zinc-950 shrink-0 overflow-y-auto md:overflow-visible">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors w-fit">
          <ChevronLeft className="w-4 h-4" />
          Back to Characters
        </Link>
        
        <div className={`relative aspect-[3/4] rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden group mt-2 shrink-0 md:shrink`}>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10"></div>
          
          <div className={`absolute inset-0 ${glowColor} flex items-center justify-center`}>
            {character.splashArtUrl ? (
              <Image 
                src={character.splashArtUrl} 
                alt={`${character.name} Splash`} 
                fill
                referrerPolicy="no-referrer"
                className="object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
            ) : (
              <div className={`w-32 h-32 rounded-full border-4 ${borderColor} animate-pulse`}></div>
            )}
          </div>
          <div className="absolute bottom-4 left-4 z-20">
            <span className={`text-[10px] uppercase tracking-widest ${textColor} font-bold mb-1 block`}>{character.name}</span>
            <h2 className="text-2xl font-bold leading-tight">{character.title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Element</div>
            <div className={`flex items-center gap-2 font-semibold ${textColor}`}>
              <ElementIcon element={character.element} />
              {character.element}
            </div>
          </div>
          <div className="bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">Weapon</div>
            <div className="flex items-center gap-2 font-semibold">
              <WeaponIcon weapon={character.weapon} className="w-4 h-4 text-zinc-400" />
              {character.weapon}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Ascension Materials</div>
          <div className="flex flex-wrap gap-2">
            {character.ascensionMaterials.map((mat, i) => (
              <div key={i} className="w-10 h-10 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] text-center p-1 leading-none break-all" title={mat}>
                {mat.substring(0, 3).toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        
        {character.baseStats && (
          <div className="space-y-3 mt-auto">
             <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Base Stats</div>
             <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-3 text-xs space-y-2">
               <div className="flex justify-between"><span className="text-zinc-400">HP</span><span className="font-mono">{character.baseStats.hp}</span></div>
               <div className="flex justify-between"><span className="text-zinc-400">ATK</span><span className="font-mono">{character.baseStats.atk}</span></div>
               <div className="flex justify-between"><span className="text-zinc-400">DEF</span><span className="font-mono">{character.baseStats.def}</span></div>
             </div>
          </div>
        )}
      </aside>

      {/* Build Guide */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto h-full">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 h-full">
            
            {/* Column 1: Weapons & Artifacts */}
            <div className="space-y-12">
              {/* Weapons */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                  Best Weapons
                </h3>
                <div className="space-y-3">
                  {character.best_weapons.map((wp, index) => {
                    const isTop = wp.rank === 1;
                    return (
                      <div key={index} className={`flex items-center gap-4 p-4 rounded-xl ${isTop ? `bg-zinc-900 border-l-4 ${borderColorSolid} border-y border-r border-zinc-800` : 'bg-zinc-900/50 border border-zinc-800 opacity-80'}`}>
                        <div className={`w-12 h-12 flex-shrink-0 rounded flex items-center justify-center font-bold ${isTop ? glowColor + ' ' + textColor : 'bg-zinc-800 text-zinc-400'}`}>
                          {isTop ? 'S+' : 'A'}
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-2">
                            {wp.name}
                            <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-mono">R{wp.refinement}</span>
                          </div>
                          <div className="text-xs text-zinc-500 mt-1">{wp.notes}</div>
                        </div>
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
                  {character.best_artifacts.map((art, index) => (
                    <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 relative overflow-hidden">
                      {art.rank === 1 && <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${gradientColor} to-transparent`}></div>}
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-16 h-16 rounded-xl border flex items-center justify-center ${glowColor} ${borderColor}`}>
                           <Leaf className={`w-8 h-8 ${textColor}`} />
                        </div>
                        <div>
                          <div className={`text-lg font-bold italic ${textColor === 'text-amber-500' ? 'text-amber-100' : 'text-purple-100'}`}>
                            {Array.from(new Set(art.sets)).map(set => art.sets.filter(s => s === set).length === 2 ? `4x ${set}` : `2x ${set}`).join(' + ')}
                          </div>
                          <div className={`text-xs font-medium mt-1 ${textColor}`}>{art.notes}</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-center flex flex-col justify-center">
                          <div className="text-[9px] uppercase text-zinc-500 mb-1 tracking-widest">Sands</div>
                          <div className="text-xs font-bold leading-tight">{character.stat_priorities.sands.join(' / ')}</div>
                        </div>
                        <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-center flex flex-col justify-center">
                          <div className="text-[9px] uppercase text-zinc-500 mb-1 tracking-widest">Goblet</div>
                          <div className="text-xs font-bold leading-tight">{character.stat_priorities.goblet.join(' / ')}</div>
                        </div>
                        <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-center flex flex-col justify-center">
                          <div className="text-[9px] uppercase text-zinc-500 mb-1 tracking-widest">Circlet</div>
                          <div className="text-xs font-bold leading-tight">{character.stat_priorities.circlet.join(' / ')}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Column 2: Stats & Teams */}
            <div className="space-y-12">
              {/* Stat Priorities */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                  Substat Priorities
                </h3>
                <div className="space-y-2">
                  {character.stat_priorities.subStats.map((stat, idx) => {
                    const priorityOpacity = idx === 0 ? 'opacity-100' : idx === 1 ? 'opacity-80' : 'opacity-60';
                    const priorityText = idx === 0 ? textColor : idx === 1 ? 'text-zinc-400' : 'text-zinc-500';
                    return (
                      <div key={idx} className={`flex justify-between items-center bg-zinc-900/30 p-3 px-5 rounded-full border border-zinc-800 ${priorityOpacity}`}>
                        <span className="text-sm font-medium">{stat}</span>
                        <span className={`text-xs font-bold ${priorityText} uppercase tracking-wider`}>Priority {idx + 1}</span>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* Team Synergies */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                  Meta Team Comps
                </h3>
                <div className="space-y-4">
                  {character.team_comps.map((team, idx) => (
                    <div key={idx} className={`bg-zinc-900/${idx === 0 ? '80' : '40'} p-5 rounded-2xl border ${idx === 0 ? 'border-zinc-800' : 'border-zinc-800/50'}`}>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-4 font-bold">{team.name}</div>
                      <div className="flex gap-4 items-center">
                        {team.characters.map((teamChar, charIdx) => {
                          const isMain = teamChar === character.name;
                          return (
                            <div key={charIdx} className={`w-14 h-14 rounded-xl bg-zinc-800 border ${isMain ? borderColor : 'border-zinc-700/50'} relative overflow-hidden group`}>
                               {/* Dummy character team images */}
                               <Image 
                                  src={`https://genshin.jmp.blue/characters/${teamChar.toLowerCase().replace(' ', '-')}/icon-big`} 
                                  alt={teamChar}
                                  fill
                                  referrerPolicy="no-referrer"
                                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                               />
                               {isMain && <div className={`absolute bottom-0 w-full h-1 ${character.rarity === 5 ? 'bg-amber-500' : 'bg-purple-500'}`}></div>}
                            </div>
                          )
                        })}
                      </div>
                      {team.description && (
                        <div className="mt-4 text-xs text-zinc-400 leading-relaxed">
                          {team.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

               {/* Talents */}
               <section>
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-zinc-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                  Talent Priority
                </h3>
                <div className="flex items-center gap-2">
                  {character.talentsPriority.map((talent, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                       <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-800 ${idx === 0 ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-zinc-900 text-zinc-300'}`}>
                          {talent}
                       </span>
                       {idx < character.talentsPriority.length - 1 && <span className="text-zinc-600 text-xs">➔</span>}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
