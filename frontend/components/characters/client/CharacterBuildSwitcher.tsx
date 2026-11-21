'use client';

import { useState, type ComponentProps } from 'react';
import { useLocale } from 'next-intl';
import ScrollEntrance from '@/components/ScrollEntrance';
import EditableWeaponsSection from '@/components/character-sections/EditableWeaponsSection';
import EditableArtifactsSection from '@/components/character-sections/EditableArtifactsSection';
import EditableStatsSection from '@/components/character-sections/EditableStatsSection';
import EditableMetaTeamsSection from './EditableMetaTeamsSection';
import CharacterBuildManager from './CharacterBuildManager';

type TeamProps = ComponentProps<typeof EditableMetaTeamsSection>;
type Stats = Omit<ComponentProps<typeof EditableStatsSection>, 'characterId' | 'readOnly'>;
type Payload = Stats & {
  bestWeapons: ComponentProps<typeof EditableWeaponsSection>['bestWeapons'];
  bestArtifacts: ComponentProps<typeof EditableArtifactsSection>['bestArtifacts'];
  teams: TeamProps['teams'];
};
type Build = Payload & {
  id: string;
  name: string;
  playstyles: string[];
  constellationAssumptions: string[];
  isDefault: boolean;
  reviewStatus: string;
  notesEn?: string;
  notesVi?: string;
};
type Props = Pick<TeamProps, 'characterId' | 'allCharacters' | 'allWeapons'> & {
  allArtifacts: ComponentProps<typeof EditableArtifactsSection>['catalog'];
  builds: Build[];
  legacy: Payload;
  weaponType: string;
  weaponsLabel: string;
  artifactsLabel: string;
};

export default function CharacterBuildSwitcher({ builds, legacy, characterId, weaponType, weaponsLabel,
  artifactsLabel, allCharacters, allWeapons, allArtifacts }: Props) {
  const locale = useLocale();
  const vi = locale === 'vi';
  const [selection, setSelection] = useState<string>();
  const build = builds.find(item => item.id === selection) ?? builds.find(item => item.isDefault) ?? builds[0];
  const data = build ?? legacy;
  const notes = vi ? build?.notesVi || build?.notesEn : build?.notesEn;

  return (
    <>
      {builds.length > 1 && (
        <div role="group" aria-label={vi ? 'Chọn build' : 'Select build'} className="flex flex-wrap gap-2">
          {builds.map(item => (
            <button key={item.id} type="button" className="atlas-filter-chip min-h-11"
              aria-pressed={build?.id === item.id} onClick={() => setSelection(item.id)}>
              {item.name}
            </button>
          ))}
        </div>
      )}
      {build && (notes || build.constellationAssumptions.length > 0) && (
        <section className="atlas-surface p-4 sm:p-5" aria-label={vi ? 'Điều kiện build' : 'Build conditions'}>
          <h2 className="atlas-section-title">{build.name}</h2>
          {build.constellationAssumptions.length > 0 && <p className="mt-2 text-sm text-[var(--text-secondary)]">{vi ? 'Cung mệnh' : 'Constellation'} {build.constellationAssumptions.join(', ')}</p>}
          {notes && <p className="mt-1 text-[var(--text-secondary)]">{notes}</p>}
        </section>
      )}
      <CharacterBuildManager characterId={characterId} />
      <div key={build?.id ?? characterId} className="atlas-build-flow" data-build-id={build?.id}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          <ScrollEntrance delay={0.1} className="h-full">
            <EditableWeaponsSection characterId={characterId} weaponType={weaponType} bestWeapons={data.bestWeapons}
              tWeapons={weaponsLabel} readOnly={!!build} showBestInSlot={!build || build.reviewStatus === 'LEGACY_IMPORT'} />
          </ScrollEntrance>
          <ScrollEntrance delay={0.2} className="h-full">
            <EditableArtifactsSection characterId={characterId} bestArtifacts={data.bestArtifacts}
              tArtifacts={artifactsLabel} catalog={allArtifacts} readOnly={!!build} showBestInSlot={!build || build.reviewStatus === 'LEGACY_IMPORT'} />
          </ScrollEntrance>
        </div>
        <ScrollEntrance>
          <EditableStatsSection characterId={characterId} sands={data.sands} goblet={data.goblet}
            circlet={data.circlet} subStatsPriority={data.subStatsPriority} talentPriority={data.talentPriority}
            readOnly={!!build} />
        </ScrollEntrance>
        <EditableMetaTeamsSection characterId={characterId} teams={data.teams} allCharacters={allCharacters}
          allWeapons={allWeapons} allArtifacts={allArtifacts} readOnly={!!build} />
      </div>
    </>
  );
}
