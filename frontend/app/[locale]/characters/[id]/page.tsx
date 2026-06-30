import { notFound } from 'next/navigation';
import FallbackImage from '@/components/ui/FallbackImage';
import { Link } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import { Metadata } from 'next';
import { fetchGraphQL, GET_CHARACTER_BY_ID, GET_CHARACTERS, GET_WEAPONS, GET_ARTIFACTS, GET_MATERIALS } from '@/lib/graphql';
import { CharacterData } from '@/types/character';
import WeaponCard from '@/components/WeaponCard';
import ArtifactCard from '@/components/ArtifactCard';
import CharacterSidebar from '@/components/CharacterSidebar';
import ScrollEntrance from '@/components/ScrollEntrance';
import ParallaxSplash from '@/components/ParallaxSplash';
import AdminEditableSplash from '@/components/AdminEditableSplash';
import AdminEditableBuild from '@/components/AdminEditableBuild';
import WishIntro from '@/components/WishIntro';
import EditableWeaponsSection from '@/components/character-sections/EditableWeaponsSection';
import EditableArtifactsSection from '@/components/character-sections/EditableArtifactsSection';
import EditableStatsSection from '@/components/character-sections/EditableStatsSection';
import EditableMetaTeamsSection from '@/components/character-sections/EditableMetaTeamsSection';
import CharacterStatsSection from '@/components/character-sections/CharacterStatsSection';
import CharacterAscensionMatsSection from '@/components/character-sections/CharacterAscensionMatsSection';
import CharacterTalentMatsSection from '@/components/character-sections/CharacterTalentMatsSection';
import ShareButton from '@/components/ShareButton';

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
  setRequestLocale(p.locale);
  const data = await fetchGraphQL(GET_CHARACTER_BY_ID, { id: p.id });
  const ch = data.character;
  if (!ch) return { title: 'Character Not Found' };
  
  const name = p.locale === 'en' ? ch.nameEn : ch.nameVi;
  const title = p.locale === 'en' ? ch.titleEn : ch.titleVi;
  const desc = p.locale === 'en' 
    ? `Genshin Impact ${name} Build Guide: Best weapons, artifacts, teams, and stats for ${title}. Discover the optimal way to play ${name} in the current meta.`
    : `Hướng dẫn Build ${name} Genshin Impact: Vũ khí, thánh di vật, đội hình và chỉ số tốt nhất cho ${title}. Khám phá cách chơi ${name} tối ưu nhất trong meta hiện tại.`;

  return {
    title: `${name} Build & Guide — GenshinHub`,
    description: desc,
    keywords: `Genshin Impact, ${name}, ${title}, Build, Guide, Weapons, Artifacts, Teams`,
    openGraph: { 
      title: `${name} Build & Guide`,
      description: desc,
      images: [ch.avatarUrl] 
    },
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
  setRequestLocale(p.locale);
  // Admin-only data (all characters/weapons/artifacts for team editor) is fetched client-side
  // We also need allCharacters, allWeapons, and allArtifacts for team rendering
  const [characterData, materialsData, charactersData, weaponsData, artifactsData] = await Promise.all([
    fetchGraphQL(GET_CHARACTER_BY_ID, { id: p.id }),
    fetchGraphQL(GET_MATERIALS),
    fetchGraphQL(GET_CHARACTERS),
    fetchGraphQL(GET_WEAPONS),
    fetchGraphQL(GET_ARTIFACTS),
  ]);
  const character = characterData.character;
  const materials = materialsData.materials;
  const allCharacters = charactersData.characters || [];
  const allWeapons = weaponsData.weapons || [];
  const allArtifacts = artifactsData.artifacts || [];
  
  if (!character) {
    return <div className="p-8 text-center text-white/50 flex flex-col items-center justify-center min-h-screen"><h2 className="text-2xl font-bold mb-4">Character Not Found</h2><p>This character does not exist or has not been added yet.</p></div>;
  }

  const t = await getTranslations({ locale: p.locale, namespace: 'Character' });
  const tCommon = await getTranslations({ locale: p.locale, namespace: 'Common' });
  const locale  = p.locale;
  const name    = locale === 'en' ? character.nameEn : character.nameVi;
  const title   = locale === 'en' ? character.titleEn : character.titleVi;
  const desc    = locale === 'en' ? character.descriptionEn : character.descriptionVi;

  const detailedTeams  = character.teams || [];
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
    (a: any) => a.setNameVi && !a.setNameVi.includes('Thánh Di Vật') && !a.setNameVi.toLowerCase().includes('mix')
  ) ?? character.bestArtifacts?.[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: name,
      alternateName: title,
      description: desc,
      image: character.splashArtUrl || character.avatarUrl,
    }
  };

  return (
    <main className="min-h-screen text-white font-sans selection:bg-yellow-400/25 overflow-x-hidden" style={{ background: 'var(--bg-void, #04040a)' }}>
      {/* ── JSON-LD Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── CINEMATIC BANNER PULL INTRO ── */}
      {character.splashArtUrl && <WishIntro imageUrl={character.splashArtUrl} element={character.element} />}

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
      <AdminEditableSplash characterId={character.id}>
        <div className="relative w-full overflow-hidden" style={{ minHeight: 'clamp(400px, 50vw, 650px)' }}>
          {/* Splash art background */}
          {character.splashArtUrl && (
            <ParallaxSplash imageUrl={character.splashArtUrl} />
          )}
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06060a] via-[#06060a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06060a]/70 via-transparent to-transparent" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${elGlow} 0%, transparent 60%)` }}
        />

        {/* Top actions (Back & Share) */}
        <div className="absolute top-4 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-xs font-black uppercase tracking-wider group bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/[0.06] hover:border-white/[0.12]"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            {tCommon('back')}
          </Link>
          <ShareButton title={`${name} Build - GenshinHub`} />
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-6 sm:pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex flex-col gap-2">
            {/* Element + rarity badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/[0.08]">
                <div className="relative w-4 h-4">
                  <FallbackImage src={`/images/elements/${character.element.toLowerCase()}.png`} alt={character.element} fill className="object-contain" />
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
              <h1 className={`text-4xl sm:text-5xl md:text-[80px] font-black leading-none uppercase tracking-tight drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] ${elText}`} style={{ fontFamily: 'var(--font-cinzel, Cinzel, serif)' }}>
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
      </AdminEditableSplash>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 pb-16 sm:pb-24">
        
        {/* CHARACTER INFO STRIP */}
        <div className="w-full mb-8">
          <CharacterSidebar character={character} allWeapons={allWeapons} />
        </div>

        <div className="w-full flex flex-col gap-5">

            {/* ── 1. OVERVIEW ── */}
            <ScrollEntrance>
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
            </ScrollEntrance>

            {/* ── 2. BEST WEAPONS & ARTIFACTS (2 COLUMNS) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-start">
              {/* ── BEST WEAPONS ── */}
              <ScrollEntrance delay={0.1}>
                <EditableWeaponsSection characterId={character.id} weaponType={character.weapon} bestWeapons={character.bestWeapons || []} tWeapons={t('weapons')} />
              </ScrollEntrance>

              {/* ── ARTIFACTS & STATS ── */}
              <ScrollEntrance delay={0.2}>
                <div className="flex flex-col gap-5">
                  <EditableArtifactsSection characterId={character.id} bestArtifacts={character.bestArtifacts || []} tArtifacts={t('artifacts')} />
                  
                  {/* ── STATS & TALENTS ── */}
                  <EditableStatsSection characterId={character.id} firstArtifact={firstArtifact} talentPriority={character.talentPriority || []} />
                </div>
              </ScrollEntrance>
            </div>

            {/* ── 5. META TEAM COMPS ── */}
            <ScrollEntrance delay={0.3}>
              <div className="mb-24">
                <h2 className="text-3xl font-black text-white font-display mb-8 tracking-wide drop-shadow-md">
                  {t('metaTeams')}
                </h2>
                <EditableMetaTeamsSection 
                  characterId={character.id}
                  teams={character.teams || []} 
                  allCharacters={allCharacters}
                  allWeapons={allWeapons}
                  allArtifacts={allArtifacts}
                />
              </div>
            </ScrollEntrance>

            {/* Stats Section */}
            <ScrollEntrance delay={0.4}>
              <div className="mb-24">
                <h2 className="text-3xl font-black text-white font-display mb-8 tracking-wide drop-shadow-md">
                  {t('stats')}
                </h2>
                <CharacterStatsSection characterId={character.id} stats={character.stats} baseHp={character.baseHp} baseAtk={character.baseAtk} baseDef={character.baseDef} />
              </div>
            </ScrollEntrance>

            {/* Ascension Materials Section */}
            <ScrollEntrance delay={0.5}>
              <div className="mb-24">
                <h2 className="text-3xl font-black text-white font-display mb-8 tracking-wide drop-shadow-md">
                  {t('ascensionMaterials')}
                </h2>
                <CharacterAscensionMatsSection characterId={character.id} ascensionMats={character.ascensionMats} allMaterials={materials} />
              </div>
            </ScrollEntrance>

            {/* Talent Materials Section */}
            <ScrollEntrance delay={0.6}>
              <div className="mb-24">
                <h2 className="text-3xl font-black text-white font-display mb-8 tracking-wide drop-shadow-md">
                  {t('talentMaterials') || 'Talent Materials'}
                </h2>
                <CharacterTalentMatsSection characterId={character.id} talentMats={character.talentMats} allMaterials={materials} />
              </div>
            </ScrollEntrance>



          </div>
      </div>
    </main>
  );
}
