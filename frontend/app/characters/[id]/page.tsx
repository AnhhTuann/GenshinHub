import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { fetchGraphQL, GET_CHARACTER_BY_ID, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import WeaponCard from '@/components/WeaponCard';
import ArtifactCard from '@/components/ArtifactCard';
import CharacterSidebar from '@/components/CharacterSidebar';
import { detailedTeamsData } from '@/data/teams';

export async function generateStaticParams() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  return data.characters.map((char: any) => ({ id: char.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = await fetchGraphQL(GET_CHARACTER_BY_ID, { id: resolvedParams.id });
  const character = data.character;
  if (!character) return { title: 'Character Not Found' };
  return {
    title: `${character.name} - TeyvatDB`,
    description: character.title,
    openGraph: { images: [character.avatarUrl] }
  };
}

// Section Header Component
function SectionHeader({ label, color = 'bg-yellow-500' }: { label: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`w-1 h-5 rounded-full ${color}`} />
      <span className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 font-display">{label}</span>
    </div>
  );
}

// Stat Badge
function StatBadge({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-[#050508]/60 border border-gray-900 rounded-xl p-4 flex flex-col items-center gap-1 shadow-sm">
      <span className={`text-2xl font-black font-display ${color}`}>{value.toLocaleString()}</span>
      <span className="text-gray-600 text-[9px] font-black uppercase tracking-wider">{label}</span>
    </div>
  );
}

// Talent Row
function TalentRow({ talent, index }: { talent: string; index: number }) {
  let abbr = 'NA';
  let bgColor = 'bg-gray-950 text-gray-400 border-gray-900';
  const lower = talent.toLowerCase();
  if (lower.includes('skill') || lower === 'e' || lower.includes('elemental skill')) {
    abbr = 'E'; bgColor = 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20';
  } else if (lower.includes('burst') || lower === 'q' || lower.includes('elemental burst')) {
    abbr = 'Q'; bgColor = 'bg-purple-500/10 text-purple-450 border-purple-500/20';
  }
  const displayName = talent.replace('Elemental ', '');
  return (
    <div className="flex items-center gap-3 bg-[#0d0d12]/50 border border-gray-900 rounded-xl p-3.5 hover:border-gray-800 transition-all duration-300">
      <span className="w-5 h-5 rounded-full bg-[#101015] border border-gray-850 flex items-center justify-center text-gray-500 text-[10px] font-extrabold shrink-0">
        {index + 1}
      </span>
      <span className={`text-[10px] font-black w-7 h-6 flex items-center justify-center rounded border ${bgColor}`}>
        {abbr}
      </span>
      <span className="text-gray-200 text-sm font-semibold">{displayName}</span>
      {index === 0 && <span className="ml-auto text-[9px] text-yellow-500 font-extrabold uppercase tracking-widest bg-yellow-500/5 px-2 py-0.5 rounded border border-yellow-500/10">Priority</span>}
    </div>
  );
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
  const is5Star = character.rarity === 5;
  const accentColor = is5Star ? 'from-yellow-500/20' : 'from-purple-500/20';
  const headerAccentColor = is5Star ? 'bg-yellow-500' : 'bg-purple-500';

  const firstArtifact = character.bestArtifacts?.find(
    art => art.setName && !art.setName.includes('Thánh Di Vật') && !art.setName.includes('mix')
  ) || character.bestArtifacts?.[0];

  return (
    <main className="min-h-screen bg-[#07070a] text-gray-200 pb-24 font-sans selection:bg-yellow-500/30">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-200 transition-colors text-xs font-black uppercase tracking-wider group"
          href="/"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Characters
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-6 flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT COLUMN — Sticky sidebar */}
        <div className="w-full lg:w-[340px] lg:sticky lg:top-20 lg:self-start flex-shrink-0">
          <CharacterSidebar character={character} />
        </div>

        {/* RIGHT COLUMN — Main content */}
        <div className="flex-1 min-w-0 flex flex-col gap-6">

          {/* 1. OVERVIEW CARD */}
          <section className="bg-[#0d0d12]/50 border border-gray-900 rounded-3xl overflow-hidden relative shadow-xl">
            {/* Accent top bar */}
            <div className={`h-[3px] w-full bg-gradient-to-r ${accentColor} ${is5Star ? 'to-yellow-500/0 via-yellow-500' : 'to-purple-500/0 via-purple-500'}`} />
            <div className="p-6">
              <SectionHeader label="Overview" color={headerAccentColor} />

              {/* Lore */}
              {character.description && (
                <p className="text-gray-400 text-sm leading-relaxed mb-6 border-l-2 border-gray-800 pl-4 italic">
                  {character.description}
                </p>
              )}

              {/* Base Stats */}
              <div>
                <p className="text-gray-550 text-[10px] font-black uppercase tracking-widest mb-3">Base Stats (Lv. 90)</p>
                <div className="grid grid-cols-3 gap-3">
                  <StatBadge label="Base HP" value={character.baseHp || 0} color="text-emerald-450" />
                  <StatBadge label="Base ATK" value={character.baseAtk || 0} color="text-red-450" />
                  <StatBadge label="Base DEF" value={character.baseDef || 0} color="text-blue-450" />
                </div>
              </div>
            </div>
          </section>

          {/* 2. BEST WEAPONS */}
          {character.bestWeapons?.length > 0 && (
            <section className="bg-[#0d0d12]/50 border border-gray-900 rounded-3xl p-6 shadow-xl">
              <SectionHeader label="Best Weapons" color="bg-amber-500" />
              <div className="flex flex-col gap-3.5">
                {character.bestWeapons.map((weapon, idx) => (
                  <WeaponCard key={idx} weapon={weapon} index={idx} />
                ))}
              </div>
            </section>
          )}

          {/* 3. ARTIFACTS + MAIN STATS */}
          {character.bestArtifacts?.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recommended Artifacts */}
              <section className="bg-[#0d0d12]/50 border border-gray-900 rounded-3xl p-6 shadow-xl">
                <SectionHeader label="Best Artifacts" color="bg-purple-500" />
                <div className="flex flex-col gap-3.5">
                  {character.bestArtifacts.map((artifact, idx) => (
                    <ArtifactCard key={idx} artifact={artifact} />
                  ))}
                </div>
              </section>

              {/* Main Stats + Substats + Talents */}
              <div className="flex flex-col gap-6">
                {/* Recommended Main Stats */}
                {firstArtifact && (
                  <section className="bg-[#0d0d12]/50 border border-gray-900 rounded-3xl p-6 shadow-xl">
                    <SectionHeader label="Main Stats" color="bg-cyan-500" />
                    <div className="flex flex-col gap-3">
                      {[
                        { slot: 'Sands', icon: '⏳', values: firstArtifact.sands },
                        { slot: 'Goblet', icon: '🏆', values: firstArtifact.goblet },
                        { slot: 'Circlet', icon: '👑', values: firstArtifact.circlet },
                      ].map(({ slot, icon, values }) => (
                        <div key={slot} className="flex items-center gap-4 bg-[#050508]/60 border border-gray-950 rounded-xl px-4 py-3">
                          <span className="text-lg shrink-0 select-none">{icon}</span>
                          <span className="text-gray-500 text-[10px] font-black uppercase tracking-wider w-16 shrink-0 font-display">{slot}</span>
                          <span className="text-gray-200 text-sm font-semibold">{values.join(' / ')}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Sub-Stats Priority */}
                {firstArtifact?.subStatsPriority?.length > 0 && (
                  <section className="bg-[#0d0d12]/50 border border-gray-900 rounded-3xl p-6 shadow-xl">
                    <SectionHeader label="Sub-Stats Priority" color="bg-orange-500" />
                    <div className="flex flex-wrap items-center gap-1.5">
                      {firstArtifact.subStatsPriority.map((stat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-extrabold px-3 py-2 rounded-lg border tracking-wide ${
                            idx === 0
                              ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                              : 'bg-[#050508] border-gray-950 text-gray-400'
                          }`}>
                            {stat}
                          </span>
                          {idx < firstArtifact.subStatsPriority.length - 1 && (
                            <span className="text-gray-700 text-xs">›</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Talent Priority */}
                {character.talentPriority?.length > 0 && (
                  <section className="bg-[#0d0d12]/50 border border-gray-900 rounded-3xl p-6 shadow-xl">
                    <SectionHeader label="Talent Priority" color="bg-red-500" />
                    <div className="flex flex-col gap-3">
                      {character.talentPriority.map((talent, idx) => (
                        <TalentRow key={idx} talent={talent} index={idx} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}

          {/* 4. FALLBACK: Stats + Talents when no artifacts */}
          {(!character.bestArtifacts || character.bestArtifacts.length === 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {character.talentPriority?.length > 0 && (
                <section className="bg-[#0d0d12]/50 border border-gray-900 rounded-3xl p-6 shadow-xl">
                  <SectionHeader label="Talent Priority" color="bg-red-500" />
                  <div className="flex flex-col gap-3">
                    {character.talentPriority.map((talent, idx) => (
                      <TalentRow key={idx} talent={talent} index={idx} />
                    ))}
                  </div>
                </section>
              )}
              {character.bestTeams?.length > 0 && !hasDetailedTeams && (
                <section className="bg-[#0d0d12]/50 border border-gray-900 rounded-3xl p-6 shadow-xl">
                  <SectionHeader label="Recommended Teammates" color="bg-blue-500" />
                  <div className="flex flex-wrap gap-3 mt-1">
                    {character.bestTeams.map((teammateId) => {
                      const teammate = characters.find(c => c.id === teammateId);
                      return (
                        <Link className="group relative" href={`/characters/${teammateId}`} key={teammateId}>
                          <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-950 group-hover:border-white/20 transition-colors bg-[#050508] p-0.5">
                            {teammate ? (
                              <div className="w-full h-full bg-cover bg-center bg-top rounded-lg" style={{ backgroundImage: `url(${teammate.avatarUrl})` }} />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-650 font-black uppercase text-center">{teammateId}</div>
                            )}
                          </div>
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/95 text-white text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap z-10 border border-gray-800 shadow-xl">
                            {teammate ? teammate.name : teammateId}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* 5. META TEAM COMPS */}
          {hasDetailedTeams && (
            <section className="bg-[#0d0d12]/50 border border-gray-900 rounded-3xl p-6 shadow-xl">
              <SectionHeader label="Meta Team Comps" color="bg-blue-500" />

              <div className="flex flex-col gap-6">
                {detailedTeams.map((team, teamIdx) => (
                  <div key={teamIdx} className="bg-[#050508]/60 border border-gray-950 rounded-2xl p-5 hover:border-blue-500/20 transition-all duration-350">
                    {/* Team Header */}
                    <div className="flex items-center justify-between mb-4 border-b border-gray-950 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-black border border-blue-500/20 font-display">
                          {teamIdx + 1}
                        </span>
                        <h4 className="font-extrabold text-white text-base font-display">{team.name}</h4>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                        team.rank === 'SS' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        team.rank === 'S' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }`}>
                        {team.rank} Tier
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm mb-5 leading-relaxed italic">{team.description}</p>

                    {/* Character Avatars Row */}
                    <div className="grid grid-cols-4 gap-3 mb-5 bg-[#07070a]/80 p-3 rounded-xl border border-gray-950">
                      {team.members.map((m, mIdx) => {
                        const mapping: Record<string, string> = {
                          'kazuha': 'kaedehara-kazuha', 'ayaka': 'kamisato-ayaka',
                          'traveler': 'traveler-dendro', 'kokomi': 'sangonomiya-kokomi',
                          'yunjin': 'yun-jin', 'ayato': 'kamisato-ayato', 'shinobu': 'kuki-shinobu'
                        };
                        const dbId = mapping[m.characterId] || m.characterId;
                        const teammate = characters.find(c => c.id === dbId);
                        return (
                          <Link href={`/characters/${dbId}`} key={mIdx} className="group flex flex-col items-center gap-1">
                            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-900 group-hover:border-white/20 transition-all duration-300 bg-[#050508] p-0.5">
                              {teammate ? (
                                <Image src={teammate.avatarUrl} alt={teammate.name} fill className="object-cover object-top rounded-lg" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[9px] text-gray-500 font-bold uppercase text-center break-all px-1">{m.characterId}</div>
                              )}
                            </div>
                            <span className="text-[8px] text-gray-500 font-black group-hover:text-gray-300 text-center uppercase tracking-widest truncate w-full mt-1">{m.role}</span>
                            <span className="text-[11px] text-gray-300 font-bold text-center truncate w-full">
                              {teammate ? teammate.name : m.characterId}
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Member Details */}
                    <div className="flex flex-col gap-3">
                      {team.members.map((m, mIdx) => {
                        const mapping: Record<string, string> = {
                          'kazuha': 'kaedehara-kazuha', 'ayaka': 'kamisato-ayaka',
                          'traveler': 'traveler-dendro', 'kokomi': 'sangonomiya-kokomi',
                          'yunjin': 'yun-jin', 'ayato': 'kamisato-ayato', 'shinobu': 'kuki-shinobu'
                        };
                        const dbId = mapping[m.characterId] || m.characterId;
                        const teammate = characters.find(c => c.id === dbId);
                        return (
                          <div key={mIdx} className="bg-[#0d0d12]/40 border border-gray-950 rounded-xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-white font-extrabold text-xs font-display">{teammate ? teammate.name : m.characterId}</span>
                              <span className="text-gray-800">·</span>
                              <span className="text-gray-500 text-[9px] font-black uppercase tracking-wider">{m.role}</span>
                            </div>
                            <p className="text-gray-400 text-xs leading-relaxed mb-3.5">{m.roleDesc}</p>
                            <div className="grid grid-cols-3 gap-2.5 text-[10px]">
                              <div className="bg-[#050508]/60 border border-gray-950 rounded-lg p-2.5">
                                <span className="text-gray-600 font-black uppercase text-[8px] tracking-wide block mb-1">Weapons</span>
                                <span className="text-gray-300 font-bold">{m.weapons.join(', ')}</span>
                              </div>
                              <div className="bg-[#050508]/60 border border-gray-950 rounded-lg p-2.5">
                                <span className="text-gray-600 font-black uppercase text-[8px] tracking-wide block mb-1">Artifacts</span>
                                <span className="text-gray-300 font-bold">{m.artifacts.join(', ')}</span>
                              </div>
                              <div className="bg-[#050508]/60 border border-gray-950 rounded-lg p-2.5">
                                <span className="text-gray-600 font-black uppercase text-[8px] tracking-wide block mb-1">Sub-Stats</span>
                                <span className="text-gray-300 font-bold">{m.substats.join(' › ')}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
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
