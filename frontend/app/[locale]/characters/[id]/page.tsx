import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { fetchGraphQL, GET_CHARACTER_BY_ID, GET_CHARACTERS, GET_WEAPONS, GET_ARTIFACTS, GET_MATERIALS } from '@/lib/graphql';
import CharacterSidebar from '@/components/CharacterSidebar';
import ScrollEntrance from '@/components/ScrollEntrance';
import EditableWeaponsSection from '@/components/character-sections/EditableWeaponsSection';
import EditableArtifactsSection from '@/components/character-sections/EditableArtifactsSection';
import EditableStatsSection from '@/components/character-sections/EditableStatsSection';
import EditableMetaTeamsSection from '@/components/characters/client/EditableMetaTeamsSection';
import CharacterStatsSection from '@/components/character-sections/CharacterStatsSection';
import CharacterAscensionMatsSection from '@/components/character-sections/CharacterAscensionMatsSection';
import CharacterTalentMatsSection from '@/components/character-sections/CharacterTalentMatsSection';
import CharacterHero from '@/components/characters/server/CharacterHero';
import CharacterOverview from '@/components/characters/server/CharacterOverview';
import WishIntro from '@/components/WishIntro';
import ThemeSetter from '@/context/ThemeSetter';

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

export default async function CharacterDetail({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const p = await params;
  setRequestLocale(p.locale);
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

  const is5Star        = character.rarity === 5;
  const elColor        = EL_COLOR[character.element] ?? '#ffffff';
  const elText         = EL_TEXT[character.element] ?? 'text-white';
  const elGlow         = EL_GLOW[character.element] ?? 'rgba(255,255,255,0.1)';
  const accentCls      = is5Star ? 'bg-yellow-400' : 'bg-purple-400';
  const rarityBadge    = is5Star ? '★★★★★' : '★★★★';
  const rarityStyle    = is5Star
    ? 'bg-amber-400/10 text-amber-300 border-amber-400/20'
    : 'bg-purple-400/10 text-purple-300 border-purple-400/20';

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
      <ThemeSetter element={character.element} />
      {/* ── JSON-LD Schema ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      {/* ── CINEMATIC BANNER PULL INTRO ── */}
      {character.splashArtUrl && <WishIntro imageUrl={character.splashArtUrl} element={character.element} />}

      {/* ── Ambient element glow ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[5%] w-[700px] h-[700px] rounded-full blur-[160px] opacity-20" style={{ background: elColor }} />
        <div className="absolute bottom-[-5%] right-[10%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-10" style={{ background: elColor }} />
      </div>

      {/* ── HERO BANNER ── */}
      <CharacterHero 
        character={character} 
        name={name} 
        title={title} 
        elColor={elColor} 
        elText={elText} 
        elGlow={elGlow} 
        rarityBadge={rarityBadge} 
        rarityStyle={rarityStyle} 
        tCommon={tCommon} 
      />

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-8 pb-16 sm:pb-24">
        
        {/* CHARACTER INFO STRIP */}
        <div className="w-full mb-8">
          <CharacterSidebar character={character} allWeapons={allWeapons} />
        </div>

        <div className="w-full flex flex-col gap-5">

            {/* ── 1. OVERVIEW ── */}
            <ScrollEntrance>
              <CharacterOverview 
                character={character} 
                desc={desc} 
                elColor={elColor} 
                accentCls={accentCls} 
                t={t} 
              />
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
                  <EditableStatsSection 
                    characterId={character.id} 
                    sands={character.sands}
                    goblet={character.goblet}
                    circlet={character.circlet}
                    subStatsPriority={character.subStatsPriority}
                    talentPriority={character.talentPriority || []} 
                  />
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
