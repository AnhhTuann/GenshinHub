import { notFound } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Metadata } from 'next';
import { fetchGraphQL, GET_CHARACTER_BY_ID, GET_CHARACTERS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import WeaponCard from '@/components/WeaponCard';
import ArtifactCard from '@/components/ArtifactCard';
import CharacterSidebar from '@/components/CharacterSidebar';
import { detailedTeamsData } from '@/data/teams';

const EL_COLOR: Record<string, string> = {
  Pyro:    '#ff6b4a',
  Hydro:   '#4fc3f7',
  Cryo:    '#80deea',
  Electro: '#ce93d8',
  Anemo:   '#4db6ac',
  Geo:     '#ffd54f',
  Dendro:  '#aed581',
};

const EL_TEXT: Record<string, string> = {
  Pyro:    'text-[#ff6b4a]',
  Hydro:   'text-[#4fc3f7]',
  Cryo:    'text-[#80deea]',
  Electro: 'text-[#ce93d8]',
  Anemo:   'text-[#4db6ac]',
  Geo:     'text-[#ffd54f]',
  Dendro:  'text-[#aed581]',
};

const EL_GLOW: Record<string, string> = {
  Pyro:    'rgba(255,107,74,0.18)',
  Hydro:   'rgba(79,195,247,0.18)',
  Cryo:    'rgba(128,222,234,0.18)',
  Electro: 'rgba(206,147,216,0.18)',
  Anemo:   'rgba(77,182,172,0.18)',
  Geo:     'rgba(255,213,79,0.18)',
  Dendro:  'rgba(174,213,129,0.18)',
};

export async function generateStaticParams() {
  const data = await fetchGraphQL(GET_CHARACTERS);
  return data.characters.map((c: any) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const p = await params;
  const data = await fetchGraphQL(GET_CHARACTER_BY_ID, { id: p.id });
  const ch = data.character;
  if (!ch) return { title: 'Character Not Found' };
  return {
    title: `${p.locale === 'en' ? ch.nameEn : ch.nameVi} — GenshinHub`,
    description: p.locale === 'en' ? ch.titleEn : ch.titleVi,
    openGraph: { images: [ch.avatarUrl] },
  };
}

// ── Sub-components ──────────────────────────────────────────

function SectionHeader({ label, accent }: { label: string; accent: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className={`w-[3px] h-5 rounded-full ${accent}`} />
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 font-display">{label}</span>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-[#06060a]/60 border border-white/[0.05] rounded-xl p-3 sm:p-4 flex flex-col items-center gap-1">
      <span className={`text-xl sm:text-2xl font-black font-display ${color}`}>{value.toLocaleString()}</span>
      <span className="text-white/25 text-[9px] font-black uppercase tracking-wider">{label}</span>
    </div>
  );
}

function TalentRow({ talent, index }: { talent: string; index: number }) {
  const lower = talent.toLowerCase();
  let abbr = 'AA';
  let style = 'bg-white/[0.05] text-white/40 border-white/[0.06]';
  if (lower.includes('skill') || lower === 'e') {
    abbr = 'E'; style = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  } else if (lower.includes('burst') || lower === 'q') {
    abbr = 'Q'; style = 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  }
  return (
    <div className="flex items-center gap-3 bg-[#06060a]/50 border border-white/[0.04] hover:border-white/[0.09] rounded-xl p-3 transition-colors duration-200">
      <span className="w-5 h-5 rounded-full bg-[#0d0d14] border border-white/[0.07] flex items-center justify-center text-white/30 text-[10px] font-extrabold shrink-0">
        {index + 1}
      </span>
      <span className={`text-[9px] font-black w-7 h-6 flex items-center justify-center rounded-md border ${style}`}>
        {abbr}
      </span>
      <span className="text-white/70 text-sm font-semibold">{talent.replace('Elemental ', '')}</span>
      {index === 0 && (
        <span className="ml-auto text-[8px] text-yellow-400/70 font-black uppercase tracking-widest bg-yellow-400/5 px-2 py-0.5 rounded border border-yellow-400/10">
          Priority
        </span>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────

export default async function CharacterDetail({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const p = await params;
  const [charData, allData] = await Promise.all([
    fetchGraphQL(GET_CHARACTER_BY_ID, { id: p.id }),
    fetchGraphQL(GET_CHARACTERS),
  ]);

  const character: CharacterData = charData.character;
  const characters: CharacterData[] = allData.characters;
  if (!character) notFound();

  const t       = await getTranslations('Character');
  const tCommon = await getTranslations('Common');
  const locale  = p.locale;
  const name    = locale === 'en' ? character.nameEn : character.nameVi;
  const title   = locale === 'en' ? character.titleEn : character.titleVi;
  const desc    = locale === 'en' ? character.descriptionEn : character.descriptionVi;

  const detailedTeams  = detailedTeamsData[character.id] || [];
  const hasDetailedTeams = detailedTeams.length > 0;
  const is5Star        = character.rarity === 5;
  const elColor        = EL_COLOR[character.element] ?? '#ffffff';
  const elText         = EL_TEXT[character.element] ?? 'text-white';
  const elGlow         = EL_GLOW[character.element] ?? 'rgba(255,255,255,0.1)';
  const accentCls      = is5Star ? 'bg-yellow-400' : 'bg-purple-400';
  const rarityBadge    = is5Star ? '★★★★★' : '★★★★';
  const rarityStyle    = is5Star
    ? 'bg-amber-400/10 text-amber-300 border-amber-400/20'
    : 'bg-purple-400/10 text-purple-300 border-purple-400/20';

  const firstArtifact = character.bestArtifacts?.find(
    a => a.setNameVi && !a.setNameVi.includes('Thánh Di Vật') && !a.setNameVi.toLowerCase().includes('mix')
  ) ?? character.bestArtifacts?.[0];

  return (
    <main className="min-h-screen bg-[#06060a] text-white font-sans selection:bg-yellow-400/25 overflow-x-hidden">
      {/* ── Ambient element glow ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-[-10%] left-[5%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-20"
          style={{ background: elColor }}
        />
        <div
          className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-10"
          style={{ background: elColor }}
        />
      </div>

      {/* ── HERO BANNER ── */}
      <div className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(320px, 55vw, 520px)' }}>
        {/* Splash art background */}
        {character.splashArtUrl && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
            style={{ backgroundImage: `url(${character.splashArtUrl})`, filter: 'brightness(0.5) saturate(1.1)' }}
          />
        )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-[#06060a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06060a]/70 via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${elGlow} 0%, transparent 60%)` }}
        />

        {/* Back button */}
        <div className="absolute top-4 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-xs font-black uppercase tracking-wider group bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/[0.06] hover:border-white/[0.12]"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            {tCommon('back')}
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8">
          <div className="flex flex-col gap-2">
            {/* Element + rarity badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/[0.08]">
                <div className="relative w-4 h-4">
                  <Image src={`/elements/${character.element.toLowerCase()}.png`} alt={character.element} fill className="object-contain" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: elColor }}>
                  {character.element}
                </span>
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border backdrop-blur-sm ${rarityStyle}`}>
                {rarityBadge}
              </span>
              {character.weapon && (
                <span className="text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/[0.08] bg-black/30 backdrop-blur-sm text-white/60">
                  {character.weapon}
                </span>
              )}
            </div>

            {/* Name */}
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black leading-none font-display uppercase tracking-tight drop-shadow-2xl ${elText}`}>
                {name}
              </h1>
              {title && (
                <p className="text-white/45 text-sm sm:text-base italic mt-1 font-medium">{title}</p>
              )}
            </div>

            {/* Quick stats row */}
            <div className="flex items-center gap-4 flex-wrap mt-1">
              {[
                { label: 'HP', value: character.baseHp, color: 'text-emerald-400' },
                { label: 'ATK', value: character.baseAtk, color: 'text-red-400' },
                { label: 'DEF', value: character.baseDef, color: 'text-blue-400' },
              ].filter(s => s.value).map(({ label, value, color }) => (
                <div key={label} className="flex items-baseline gap-1.5">
                  <span className={`text-base font-black font-display ${color}`}>{value?.toLocaleString()}</span>
                  <span className="text-[10px] text-white/30 uppercase font-bold">{label}</span>
                </div>
              ))}
              {character.region && (
                <>
                  <div className="w-px h-4 bg-white/10" />
                  <span className="text-xs text-white/35 font-medium">{character.region}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Decorative bottom element line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${elColor}60, transparent)` }}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 pb-16 sm:pb-24">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 items-start">

          {/* ─── LEFT SIDEBAR ─── */}
          <div className="w-full xl:w-[300px] xl:sticky xl:top-20 xl:self-start shrink-0">
            <CharacterSidebar character={character} />
          </div>

          {/* ─── RIGHT CONTENT ─── */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">

            {/* ── 1. OVERVIEW ── */}
            <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${elColor}60, transparent)` }} />
              <div className="p-5 sm:p-6">
                <SectionHeader label="Overview" accent={accentCls} />
                {desc && (
                  <p className="text-white/40 text-sm leading-relaxed mb-5 border-l-2 border-white/[0.07] pl-4 italic">{desc}</p>
                )}
                <p className="text-white/20 text-[9px] font-black uppercase tracking-widest mb-3">{t('baseStats')} (Lv. 90)</p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <StatCard label={t('hp')}  value={character.baseHp  || 0} color="text-emerald-400" />
                  <StatCard label={t('atk')} value={character.baseAtk || 0} color="text-red-400" />
                  <StatCard label={t('def')} value={character.baseDef || 0} color="text-blue-400" />
                </div>
              </div>
            </section>

            {/* ── 2. BEST WEAPONS ── */}
            {character.bestWeapons?.length > 0 && (
              <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                <SectionHeader label={t('weapons')} accent="bg-amber-400" />
                <div className="flex flex-col gap-3">
                  {character.bestWeapons.map((weapon, idx) => (
                    <WeaponCard key={idx} weapon={weapon} index={idx} />
                  ))}
                </div>
              </section>
            )}

            {/* ── 3. ARTIFACTS + MAIN STATS ── */}
            {character.bestArtifacts?.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Artifacts list */}
                <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                  <SectionHeader label={t('artifacts')} accent="bg-purple-400" />
                  <div className="flex flex-col gap-3">
                    {character.bestArtifacts.map((artifact, idx) => (
                      <ArtifactCard key={idx} artifact={artifact} />
                    ))}
                  </div>
                </section>

                {/* Main stats + substats + talents */}
                <div className="flex flex-col gap-5">
                  {/* Main Stats */}
                  {firstArtifact && (
                    <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                      <SectionHeader label="Main Stats" accent="bg-cyan-400" />
                      <div className="flex flex-col gap-2">
                        {[
                          { slot: 'Sands', emoji: '⏳', values: firstArtifact.sands },
                          { slot: 'Goblet', emoji: '🏆', values: firstArtifact.goblet },
                          { slot: 'Circlet', emoji: '👑', values: firstArtifact.circlet },
                        ].map(({ slot, emoji, values }) => (
                          <div key={slot} className="flex items-center gap-3 bg-[#06060a]/60 border border-white/[0.04] rounded-xl px-4 py-2.5">
                            <span className="text-base shrink-0">{emoji}</span>
                            <span className="text-white/25 text-[9px] font-black uppercase tracking-wider w-14 shrink-0">{slot}</span>
                            <span className="text-white/70 text-sm font-semibold">{values.join(' / ')}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Sub-stat priority */}
                  {firstArtifact?.subStatsPriority?.length > 0 && (
                    <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                      <SectionHeader label="Sub-Stats Priority" accent="bg-orange-400" />
                      <div className="flex flex-wrap items-center gap-1.5">
                        {firstArtifact.subStatsPriority.map((stat, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border ${
                              idx === 0
                                ? 'bg-yellow-400/10 border-yellow-400/20 text-yellow-300'
                                : 'bg-[#06060a] border-white/[0.05] text-white/35'
                            }`}>{stat}</span>
                            {idx < firstArtifact.subStatsPriority.length - 1 && (
                              <span className="text-white/20 text-xs">›</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Talent priority */}
                  {character.talentPriority?.length > 0 && (
                    <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                      <SectionHeader label="Talent Priority" accent="bg-red-400" />
                      <div className="flex flex-col gap-2">
                        {character.talentPriority.map((talent, idx) => (
                          <TalentRow key={idx} talent={talent} index={idx} />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            )}

            {/* ── 4. FALLBACK when no artifacts ── */}
            {(!character.bestArtifacts || character.bestArtifacts.length === 0) && character.talentPriority?.length > 0 && (
              <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                <SectionHeader label="Talent Priority" accent="bg-red-400" />
                <div className="flex flex-col gap-2">
                  {character.talentPriority.map((talent, idx) => (
                    <TalentRow key={idx} talent={talent} index={idx} />
                  ))}
                </div>
              </section>
            )}

            {/* ── 5. DETAILED TEAM COMPS ── */}
            {hasDetailedTeams && (
              <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                <SectionHeader label="Meta Team Comps" accent="bg-blue-400" />
                <div className="flex flex-col gap-4">
                  {detailedTeams.map((team, tIdx) => (
                    <div key={tIdx} className="bg-[#06060a]/50 border border-white/[0.04] hover:border-blue-500/15 rounded-xl p-4 transition-colors duration-200">
                      {/* Team header */}
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/[0.04]">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400/80 flex items-center justify-center text-xs font-black border border-blue-500/15">
                            {tIdx + 1}
                          </span>
                          <h4 className="font-extrabold text-white/85 text-sm font-display">{team.name}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider border ${
                          team.rank === 'SS' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                          : team.rank === 'S' ? 'bg-red-400/10 text-red-400 border-red-400/20'
                          : 'bg-blue-400/10 text-blue-400 border-blue-400/20'
                        }`}>
                          {team.rank} Tier
                        </span>
                      </div>

                      <p className="text-white/30 text-xs mb-4 leading-relaxed italic">{team.description}</p>

                      {/* Character avatars */}
                      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mb-4 bg-[#06060a]/50 p-2.5 rounded-xl border border-white/[0.03]">
                        {team.members.map((m, mIdx) => {
                          const mapping: Record<string, string> = {
                            kazuha: 'kaedehara-kazuha', ayaka: 'kamisato-ayaka',
                            traveler: 'traveler-dendro', kokomi: 'sangonomiya-kokomi',
                            yunjin: 'yun-jin', ayato: 'kamisato-ayato', shinobu: 'kuki-shinobu',
                          };
                          const dbId    = mapping[m.characterId] || m.characterId;
                          const teammate = characters.find(c => c.id === dbId);
                          const tmText   = EL_TEXT[teammate?.element ?? ''] ?? 'text-white/60';
                          return (
                            <Link href={`/characters/${dbId}`} key={mIdx} className="group/tm flex flex-col items-center gap-1">
                              <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/[0.06] group-hover/tm:border-white/15 transition-all duration-250 bg-[#0d0d14] p-0.5">
                                {teammate ? (
                                  <Image src={teammate.avatarUrl} alt={teammate.nameEn} fill className="object-cover object-top rounded-lg" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[8px] text-white/25 font-bold uppercase break-all px-1">{m.characterId}</div>
                                )}
                              </div>
                              <span className="text-[8px] text-white/30 font-black group-hover/tm:text-white/55 text-center uppercase tracking-widest truncate w-full">{m.role}</span>
                              <span className={`text-[10px] font-bold text-center truncate w-full ${tmText}`}>
                                {teammate ? (locale === 'en' ? teammate.nameEn : teammate.nameVi) : m.characterId}
                              </span>
                            </Link>
                          );
                        })}
                      </div>

                      {/* Member details */}
                      <div className="flex flex-col gap-2.5">
                        {team.members.map((m, mIdx) => {
                          const mapping: Record<string, string> = {
                            kazuha: 'kaedehara-kazuha', ayaka: 'kamisato-ayaka',
                            traveler: 'traveler-dendro', kokomi: 'sangonomiya-kokomi',
                            yunjin: 'yun-jin', ayato: 'kamisato-ayato', shinobu: 'kuki-shinobu',
                          };
                          const dbId     = mapping[m.characterId] || m.characterId;
                          const teammate = characters.find(c => c.id === dbId);
                          const tmText   = EL_TEXT[teammate?.element ?? ''] ?? 'text-white/80';
                          return (
                            <div key={mIdx} className="bg-[#0d0d14]/50 border border-white/[0.04] rounded-xl p-3.5">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={`font-extrabold text-xs font-display ${tmText}`}>
                                  {teammate ? (locale === 'en' ? teammate.nameEn : teammate.nameVi) : m.characterId}
                                </span>
                                <span className="text-white/20">·</span>
                                <span className="text-white/30 text-[9px] font-black uppercase tracking-wider">{m.role}</span>
                              </div>
                              <p className="text-white/35 text-xs leading-relaxed mb-3">{m.roleDesc}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                {[
                                  { label: 'Weapons',   val: m.weapons.join(', ') },
                                  { label: 'Artifacts', val: m.artifacts.join(', ') },
                                  { label: 'Sub-Stats', val: m.substats.join(' › ') },
                                ].map(({ label, val }) => (
                                  <div key={label} className="bg-[#06060a]/60 border border-white/[0.04] rounded-lg p-2">
                                    <span className="text-white/25 font-black uppercase text-[8px] tracking-wide block mb-0.5">{label}</span>
                                    <span className="text-white/55 font-semibold text-[10px]">{val}</span>
                                  </div>
                                ))}
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

            {/* ── 6. SIMPLE TEAMS (no detailed data) ── */}
            {!hasDetailedTeams && character.bestTeams?.length > 0 && (
              <section className="bg-[#0d0d14]/70 border border-white/[0.06] rounded-2xl p-5 sm:p-6">
                <SectionHeader label="Recommended Teammates" accent="bg-blue-400" />
                <div className="flex flex-wrap gap-3">
                  {character.bestTeams.map((tid) => {
                    const tm = characters.find(c => c.id === tid);
                    return (
                      <Link href={`/characters/${tid}`} key={tid} className="group/tm relative">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/[0.06] group-hover/tm:border-white/15 transition-colors bg-[#0d0d14] p-0.5">
                          {tm ? (
                            <div className="w-full h-full bg-cover bg-top rounded-lg" style={{ backgroundImage: `url(${tm.avatarUrl})` }} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[8px] text-white/25 font-black uppercase text-center">{tid}</div>
                          )}
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/tm:opacity-100 transition-opacity bg-black/95 text-white text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap z-10 border border-white/10">
                          {tm ? (locale === 'en' ? tm.nameEn : tm.nameVi) : tid}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
