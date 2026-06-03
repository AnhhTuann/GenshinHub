import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchGraphQL, GET_CHARACTER_BY_ID, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';

export default async function CharacterDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const [characterData, allCharactersData] = await Promise.all([
    fetchGraphQL(GET_CHARACTER_BY_ID, { id: resolvedParams.id }),
    fetchGraphQL(GET_CHARACTERS)
  ]);

  const character: CharacterData = characterData.character;
  const characters: CharacterData[] = allCharactersData.characters;

  if (!character) notFound();

  const is5Star = character.rarity === 5;
  const themeColor = is5Star ? 'text-yellow-500' : 'text-purple-400';
  const borderTheme = is5Star ? 'border-yellow-500/50' : 'border-purple-500/50';
  const gradientTheme = is5Star ? 'from-yellow-900/40' : 'from-purple-900/40';
  
  const parsedStats = character.baseStats ? JSON.parse(character.baseStats) : null;

  return (
    <main className="min-h-screen bg-[#0b0b0e] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        <Link className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium w-fit" href="/">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Characters
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-8 items-start mt-4">
        
        {/* Left Column (Sticky) */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-24 flex flex-col gap-4">
          
          <div className={`relative w-full aspect-[3/4] rounded-2xl overflow-hidden border ${borderTheme} shadow-2xl`}>
            
            <div className={`absolute inset-0 bg-gradient-to-tr ${gradientTheme} to-transparent opacity-50`}></div>
            
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: character.splashArtUrl ? `url(${character.splashArtUrl})` : 'none' }}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>

            <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <img src={`/elements/${character.element.toLowerCase()}.png`} alt={character.element} className="w-5 h-5 drop-shadow-md" />
                <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest">{character.element}</span>
              </div>
              <h1 className="text-4xl font-black text-white mt-1 drop-shadow-lg">{character.name}</h1>
              <p className="text-gray-300 font-medium text-lg drop-shadow-md">{character.title}</p>
              
              <div className="flex text-yellow-400 text-sm mt-3">
                {Array(character.rarity).fill(0).map((_, i) => <span key={i}>★</span>)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#15151a] border border-gray-800/60 p-4 rounded-xl flex flex-col">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Region</span>
              <span className="text-gray-100 font-medium">{character.region}</span>
            </div>
            <div className="bg-[#15151a] border border-gray-800/60 p-4 rounded-xl flex flex-col">
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Weapon</span>
              <span className="text-gray-100 font-medium flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-500"></span> {character.weapon}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (Scrollable) */}
        <div className="w-full lg:w-[65%] flex flex-col gap-8">
          
          {/* Encyclopedia & Stats */}
          <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6 md:p-8">
            <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Encyclopedia
            </h3>
            
            {character.lore && (
              <div className="mb-6">
                <h4 className="text-white font-bold mb-2">Cốt Truyện</h4>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                  {character.lore}
                </p>
              </div>
            )}
            
            {parsedStats && (
              <div>
                <h4 className="text-white font-bold mb-3">Chỉ Số Cơ Bản</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#0b0b0e] border border-gray-800 p-3 rounded-lg flex flex-col items-center">
                    <span className="text-green-400 font-bold text-lg">{parsedStats.hp?.toLocaleString() || '-'}</span>
                    <span className="text-gray-500 text-xs mt-1">BASE HP</span>
                  </div>
                  <div className="bg-[#0b0b0e] border border-gray-800 p-3 rounded-lg flex flex-col items-center">
                    <span className="text-red-400 font-bold text-lg">{parsedStats.atk?.toLocaleString() || '-'}</span>
                    <span className="text-gray-500 text-xs mt-1">BASE ATK</span>
                  </div>
                  <div className="bg-[#0b0b0e] border border-gray-800 p-3 rounded-lg flex flex-col items-center">
                    <span className="text-blue-400 font-bold text-lg">{parsedStats.def?.toLocaleString() || '-'}</span>
                    <span className="text-gray-500 text-xs mt-1">BASE DEF</span>
                  </div>
                </div>
              </div>
            )}
            
            {character.fandomUrl && (
              <div className="mt-6 pt-4 border-t border-gray-800/60">
                <a href={character.fandomUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-400 hover:underline">
                  Xem chi tiết trên Fandom Wiki ↗
                </a>
              </div>
            )}
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
              {character.bestWeapons.map((weapon, idx) => {
                return (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center gap-4 p-3 rounded-xl border border-gray-700/50 bg-[#111115]/80">
                      
                      <div className="w-6 h-6 shrink-0 flex items-center justify-center rounded-full bg-[#1c2333] border border-[#26314a] text-[#7192d6] text-xs font-bold ml-1">
                        {idx + 1}
                      </div>
                      
                      {weapon.iconUrl ? (
                        <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-[#d9b28a] to-[#a37955] p-[1px]">
                           <img src={weapon.iconUrl} alt={weapon.name} className="w-full h-full object-cover bg-black/20 rounded-md" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 shrink-0 rounded-lg bg-gray-800 flex items-center justify-center text-xs text-gray-500">Img</div>
                      )}
                      
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-100 text-base">{weapon.name}</span>
                          {weapon.refinement && weapon.refinement > 1 && (
                            <span className="bg-[#1c2333] text-[#7192d6] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#26314a]">
                              R{weapon.refinement}
                            </span>
                          )}
                          {weapon.isF2P && (
                            <span className="bg-green-900/30 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-green-800/50">
                              F2P
                            </span>
                          )}
                        </div>
                        <span className="text-gray-400 text-xs mt-0.5">{weapon.subStat || 'Unknown Stat'}</span>
                      </div>
                    </div>
                    
                    {weapon.passiveDesc && (
                      <p className="text-gray-400 text-sm mt-3 px-1 leading-relaxed">
                        {weapon.passiveDesc.split(/(CRIT Rate|CRIT DMG|ATK%|Độ Tăng Tỷ Lệ Phá Tính|Tỷ Lệ Bạo Kích|ST Bạo Kích|Hiệu Quả Nạp Nguyên Tố|Tấn Công%|DMG chí)/g).map((part, i) => 
                          /CRIT Rate|CRIT DMG|ATK%|Độ Tăng Tỷ Lệ Phá Tính|Tỷ Lệ Bạo Kích|ST Bạo Kích|Hiệu Quả Nạp Nguyên Tố|Tấn Công%|DMG chí/.test(part) ? (
                            <span key={i} className="text-orange-400">{part}</span>
                          ) : part
                        )}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          <section className="bg-[#15151a] border border-gray-800/60 rounded-2xl p-6 md:p-8">
            <h3 className="text-gray-500 text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span> Recommended Artifacts
            </h3>
            {character.bestArtifacts.map((artifact, idx) => (
              <div key={idx} className="bg-[#0b0b0e] border border-gray-800 rounded-xl p-5 mb-4">
                <div className="flex items-center gap-4 border-b border-gray-800 pb-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-900/20 rounded-lg flex items-center justify-center text-yellow-500 text-xl border border-yellow-700/30">✨</div>
                  <div>
                    <h4 className="font-bold text-gray-100 text-lg">{artifact.setName}</h4>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{artifact.pieces}-Piece Set</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center mb-4">
                  <div className="bg-[#15151a] p-3 rounded-lg border border-gray-800/50 flex flex-col justify-center">
                    <span className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Sands</span>
                    <span className="text-gray-200 font-semibold text-sm">{artifact.sands.join(' / ')}</span>
                  </div>
                  <div className="bg-[#15151a] p-3 rounded-lg border border-gray-800/50 flex flex-col justify-center">
                    <span className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Goblet</span>
                    <span className="text-gray-200 font-semibold text-sm">{artifact.goblet.join(' / ')}</span>
                  </div>
                  <div className="bg-[#15151a] p-3 rounded-lg border border-gray-800/50 flex flex-col justify-center">
                    <span className="block text-gray-500 text-[10px] font-bold uppercase mb-1">Circlet</span>
                    <span className="text-gray-200 font-semibold text-sm">{artifact.circlet.join(' / ')}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 pt-4">
                  <span className="text-gray-500 text-[10px] font-bold uppercase mb-2 block">Sub-stats Priority</span>
                  <div className="flex flex-wrap items-center gap-2">
                    {artifact.subStatsPriority.map((stat, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded border ${sIdx === 0 ? 'bg-gray-800 border-gray-600 text-gray-200' : 'border-gray-800 text-gray-400'}`}>
                          {stat}
                        </span>
                        {sIdx < artifact.subStatsPriority.length - 1 && <span className="text-gray-700 text-[10px]">➔</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
