import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { fetchGraphQL, GET_CHARACTER_BY_ID, GET_CHARACTERS, GET_WEAPONS, GET_ARTIFACTS, GET_MATERIALS } from '@/lib/graphql';
import CharacterSidebar from '@/components/CharacterSidebar';
import ScrollEntrance from '@/components/ScrollEntrance';
import CharacterBuildSwitcher from '@/components/characters/client/CharacterBuildSwitcher';
import { GET_CHARACTER_BUILDS } from '@/lib/graphql/queries/character';
import CharacterStatsSection from '@/components/character-sections/CharacterStatsSection';
import CharacterAscensionMatsSection from '@/components/character-sections/CharacterAscensionMatsSection';
import CharacterTalentMatsSection from '@/components/character-sections/CharacterTalentMatsSection';
import CharacterHero from '@/components/characters/server/CharacterHero';
import ThemeSetter from '@/context/ThemeSetter';

// For staging, dynamic routes are resolved at request time, not from GraphQL at build time.
export const dynamic = 'force-dynamic';
export async function generateStaticParams() {
  return [];
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
  const [characterData, materialsData, charactersData, weaponsData, artifactsData, buildData] = await Promise.all([
    fetchGraphQL(GET_CHARACTER_BY_ID, { id: p.id }, 0),
    fetchGraphQL(GET_MATERIALS),
    fetchGraphQL(GET_CHARACTERS),
    fetchGraphQL(GET_WEAPONS),
    fetchGraphQL(GET_ARTIFACTS),
    fetchGraphQL(GET_CHARACTER_BUILDS, { id: p.id }, 0),
  ]);
  const character = characterData.character;
  const materials = materialsData.materials || [];
  const allCharacters = charactersData.characters || [];
  const allWeapons = weaponsData.weapons || [];
  const allArtifacts = artifactsData.artifacts || [];
  
  if (!character) {
    return <div className="p-8 text-center text-[var(--text-secondary)] flex flex-col items-center justify-center min-h-screen"><h2 className="text-2xl font-bold mb-4">Character Not Found</h2><p>This character does not exist or has not been added yet.</p></div>;
  }

  const t = await getTranslations({ locale: p.locale, namespace: 'Character' });
  const tCommon = await getTranslations({ locale: p.locale, namespace: 'Common' });
  const locale  = p.locale;
  const name    = locale === 'en' ? character.nameEn : character.nameVi;
  const title   = locale === 'en' ? character.titleEn : character.titleVi;
  const desc    = locale === 'en' ? character.descriptionEn : character.descriptionVi;

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
    <main className="min-h-screen text-[var(--text-primary)] font-sans selection:bg-[var(--gold-glow)] overflow-x-hidden" style={{ background: 'var(--bg-base)' }}>
      <ThemeSetter element={character.element} />
      {/* ── JSON-LD Schema ── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      
      <CharacterHero character={character} name={name || character.nameEn}
        title={title} description={desc} locale={locale} backLabel={tCommon('back')}
        baseStatsLabel={`${t('baseStats')} (Lv. 90)`}
        statLabels={{ hp: t('hp'), atk: t('atk'), def: t('def') }} />

      {/* ── MAIN CONTENT ── */}
      <div id="character-build" className="atlas-container mt-6 sm:mt-8 pb-16 sm:pb-24 scroll-mt-20">
        
        {/* CHARACTER INFO STRIP */}
        <div className="w-full mb-4">
          <CharacterSidebar character={character} allWeapons={allWeapons} />
        </div>

        <div className="atlas-build-flow">

            <CharacterBuildSwitcher characterId={character.id} builds={buildData.characterBuilds}
              weaponType={character.weapon} weaponsLabel={t('weapons')} artifactsLabel={t('artifacts')}
              allCharacters={allCharacters} allWeapons={allWeapons} allArtifacts={allArtifacts}
              legacy={{
                bestWeapons: character.bestWeapons || [], bestArtifacts: character.bestArtifacts || [], teams: character.teams || [],
                sands: character.sands || [], goblet: character.goblet || [], circlet: character.circlet || [],
                subStatsPriority: character.subStatsPriority || [], talentPriority: character.talentPriority || [],
              }} />

            {/* Stats Section */}
            <ScrollEntrance delay={0.4}>
              <div className="atlas-build-section">
                <h2 className="atlas-section-title mb-4">
                  {t('stats')}
                </h2>
                <CharacterStatsSection characterId={character.id} stats={character.stats} />
              </div>
            </ScrollEntrance>

            <div className="grid gap-5 xl:grid-cols-2">
              <ScrollEntrance delay={0.5}>
                <section className="min-w-0">
                  <h2 className="atlas-section-title mb-4">{t('ascensionMaterials')}</h2>
                  <CharacterAscensionMatsSection
                    characterId={character.id}
                    ascensionMats={character.ascensionMats}
                    allMaterials={materials}
                    pending={!character.ascensionMats}
                    noMaterials={Array.isArray(character.ascensionMats) && character.ascensionMats.length === 0}
                  />
                </section>
              </ScrollEntrance>
              <ScrollEntrance delay={0.6}>
                <section className="min-w-0">
                  <h2 className="atlas-section-title mb-4">{t('talentMaterials') || 'Talent Materials'}</h2>
                  <CharacterTalentMatsSection
                    characterId={character.id}
                    talentMats={character.talentMats}
                    allMaterials={materials}
                    pending={!character.talentMats}
                    noMaterials={Array.isArray(character.talentMats) && character.talentMats.length === 0}
                  />
                </section>
              </ScrollEntrance>
            </div>

          </div>
      </div>
    </main>
  );
}
