'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';
import { fetchGraphQLAdmin } from '@/lib/graphql/client';

const buildFields = `
  id name playstyles version reviewStatus isDefault constellationAssumptions notesEn notesVi source approvalChecksum
  sands goblet circlet subStatsPriority talentPriority
  bestWeapons { weaponId catalogWeaponId isF2P refinement constellation }
  bestArtifacts { artifactSetId constellation mixSets { artifactSetId } }
  teams { name rank description reviewStatus members { characterId role roleDesc weapons artifacts substats } }
`;
const sections = ['Profile', 'Weapons', 'Artifacts', 'Stats and talents', 'Teams'] as const;
const playstyleOptions = ['MAIN_DPS', 'SUB_DPS', 'SUPPORT'];
type Section = (typeof sections)[number];
type Values = Record<string, unknown>;
type Build = {
  id: string; name: string; playstyles: string[]; version: number; reviewStatus: string;
  isDefault: boolean; approvalChecksum: string | null; constellationAssumptions: string[];
  notesEn?: string; notesVi?: string; source?: string;
  sands: string[]; goblet: string[]; circlet: string[]; subStatsPriority: string[]; talentPriority: string[];
  bestWeapons: (Values & { catalogWeaponId: string | null })[];
  bestArtifacts: { artifactSetId: string | null; constellation?: string; mixSets: { artifactSetId: string }[] }[];
  teams: Values[];
};
type History = { id: string; action: string; actor: string; version: number; createdAt: string; changes: unknown };
const keys: Record<Section, string[]> = {
  Profile: ['name', 'playstyles', 'constellationAssumptions', 'notesEn', 'notesVi', 'source'],
  Weapons: ['weapons'],
  Artifacts: ['artifacts'],
  'Stats and talents': ['sands', 'goblet', 'circlet', 'subStatsPriority', 'talentPriority'],
  Teams: ['teams'],
};

function values(build: Build, section: Section, pending: Values | null) {
  const source = {
    ...build, weapons: build.bestWeapons.map(({ catalogWeaponId, ...weapon }) => ({
      ...weapon, weaponId: catalogWeaponId ?? weapon.weaponId,
    })),
    artifacts: build.bestArtifacts.map(artifact => ({
      setIds: artifact.mixSets.length ? artifact.mixSets.map(set => set.artifactSetId) : [artifact.artifactSetId],
      constellation: artifact.constellation,
    })),
    ...pending,
  } as Values;
  return Object.fromEntries(keys[section].map(key => [key, source[key] ?? (['notesEn','notesVi','source'].includes(key) ? '' : [])]));
}

export default function CharacterBuildManager({ characterId }: { characterId: string }) {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<Build[]>([]);
  const [selected, setSelected] = useState<Build>();
  const [pending, setPending] = useState<Values | null>(null);
  const [history, setHistory] = useState<History[]>([]);
  const [section, setSection] = useState<Section>('Profile');
  const [json, setJson] = useState('');
  const [name, setName] = useState('');
  const [styles, setStyles] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');

  async function load(buildId?: string, targetSection = section) {
    const response = await fetchGraphQLAdmin(`query ($characterId: String!) {
      adminCharacterBuilds(characterId: $characterId) { ${buildFields} }
    }`, { characterId });
    const builds: Build[] = response.adminCharacterBuilds;
    setList(builds);
    const build = builds.find(row => row.id === buildId) ?? builds.find(row => row.isDefault) ?? builds[0];
    setSelected(build);
    if (!build) return;
    const data = await fetchGraphQLAdmin(`query ($id: ID!) {
      characterBuildPending(buildId: $id)
      characterBuildAudits(buildId: $id) { id action actor version createdAt changes }
    }`, { id: build.id });
    setPending(data.characterBuildPending);
    setHistory(data.characterBuildAudits);
    setJson(JSON.stringify(values(build, targetSection, data.characterBuildPending), null, 2));
  }

  async function run(action: () => Promise<void>) {
    setBusy(true);
    setStatus('');
    try { await action(); }
    catch (error) { setStatus(error instanceof Error ? error.message : String(error)); }
    finally { setBusy(false); }
  }

  const mutate = (operation: 'updateCharacterBuild' | 'reviewCharacterBuild' | 'setDefaultCharacterBuild' | 'archiveCharacterBuild',
    extra?: { input: Values } | { decision: 'APPROVE' | 'REJECT' }) => run(async () => {
    if (!selected) return;
    const input = operation === 'updateCharacterBuild';
    const review = operation === 'reviewCharacterBuild';
    await fetchGraphQLAdmin(`mutation ($id: ID!, $characterId: String!, $expectedVersion: Int!${input ? ', $input: CharacterBuildInput!' : review ? ', $decision: CharacterBuildReviewDecision!' : ''}) {
      ${operation}(id: $id, characterId: $characterId, expectedVersion: $expectedVersion${input ? ', input: $input' : review ? ', decision: $decision' : ''}) { id version }
    }`, { id: selected.id, characterId, expectedVersion: selected.version, ...extra });
    await load(selected.id);
    setStatus('Saved');
    router.refresh();
  });

  const archived = history.some(event => event.action === 'ARCHIVED');
  if (!isAdmin) return null;
  return (
    <section className="atlas-surface p-4">
      <button type="button" className="atlas-add-action" aria-expanded={open} disabled={busy} onClick={() => {
        setOpen(!open);
        if (!open) void run(() => load());
      }}>Manage character builds</button>
      {open && (
        <div className="mt-4 grid gap-4">
          <form className="grid gap-2" onSubmit={event => {
            event.preventDefault();
            void run(async () => {
              const data = await fetchGraphQLAdmin(`mutation ($id: String!, $name: String!, $styles: [CharacterBuildPlaystyle!]!) {
                createCharacterBuild(characterId: $id, name: $name, playstyles: $styles) { id }
              }`, { id: characterId, name, styles });
              setName('');
              setStyles([]);
              await load(data.createCharacterBuild.id);
            });
          }}>
            <label>New build name <input required value={name} onChange={event => setName(event.target.value)} className="border rounded px-2" /></label>
            <fieldset className="flex flex-wrap gap-3">
              <legend>Playstyles</legend>
              {playstyleOptions.map(style => (
                <label key={style} className="flex gap-1">
                  <input type="checkbox" checked={styles.includes(style)} onChange={event =>
                    setStyles(event.target.checked ? [...styles, style] : styles.filter(value => value !== style))} /> {style}
                </label>
              ))}
            </fieldset>
            <button className="atlas-add-action w-fit" disabled={busy || !styles.length}>Create draft</button>
          </form>
          {selected && (
            <>
              <label>Build <select aria-label="Build" className="border rounded px-2 max-w-full" value={selected.id} disabled={busy}
                onChange={event => { const id = event.target.value; void run(() => load(id)); }}>
                {list.map(build => <option value={build.id} key={build.id}>{build.name} ({build.reviewStatus})</option>)}
              </select></label>
              <p>{selected.reviewStatus} · Version {selected.version}{selected.isDefault ? ' · Default' : ''}{pending ? ' · Pending revision' : ''}{archived ? ' · Archived' : ''}</p>
              {selected.approvalChecksum && <p className="break-all text-sm">Original approval {selected.approvalChecksum}</p>}
              <label>Edit section <select className="border rounded px-2" value={section} onChange={event => {
                const next = event.target.value as Section;
                setSection(next);
                setJson(JSON.stringify(values(selected, next, pending), null, 2));
              }}>{sections.map(item => <option key={item}>{item}</option>)}</select></label>
              <textarea aria-label="Build section JSON" spellCheck={false} rows={10} value={json} readOnly={archived}
                className="w-full min-w-0 border rounded p-2 font-mono text-sm" onChange={event => setJson(event.target.value)} />
              <div className="flex flex-wrap gap-2">
                <button className="atlas-add-action" disabled={busy || archived} onClick={() => {
                  try {
                    const input = JSON.parse(json);
                    if (!input || typeof input !== 'object' || Array.isArray(input) ||
                        Object.keys(input).some(key => !keys[section].includes(key))) {
                      throw new Error('Use only fields belonging to the selected section.');
                    }
                    void mutate('updateCharacterBuild', { input });
                  } catch (error) { setStatus(error instanceof Error ? error.message : String(error)); }
                }}>Save for review</button>
                {pending && <>
                  <button className="atlas-add-action" disabled={busy} onClick={() => void mutate('reviewCharacterBuild', { decision: 'APPROVE' })}>Approve revision</button>
                  <button className="atlas-add-action" disabled={busy} onClick={() => void mutate('reviewCharacterBuild', { decision: 'REJECT' })}>Reject revision</button>
                </>}
                {!selected.isDefault && ['APPROVED', 'LEGACY_IMPORT'].includes(selected.reviewStatus) &&
                  <button className="atlas-add-action" disabled={busy} onClick={() => void mutate('setDefaultCharacterBuild')}>Set default</button>}
                {!archived && !selected.isDefault && !selected.id.startsWith('legacy-') &&
                  <button className="atlas-add-action" disabled={busy} onClick={() => {
                    if (window.confirm('Remove this build from the public guide and retain its history?')) void mutate('archiveCharacterBuild');
                  }}>Archive build</button>}
                <button className="atlas-add-action" disabled={busy} onClick={() => void run(() => load(selected.id))}>Reload build</button>
              </div>
              <details>
                <summary>Change history</summary>
                <ul className="grid gap-2 mt-2">{history.map(event => (
                  <li key={event.id}>
                    <div>{event.action} · v{event.version} · {event.actor} · {new Date(event.createdAt).toLocaleString()}</div>
                    {event.changes != null && <pre className="overflow-x-auto text-sm">{JSON.stringify(event.changes, null, 2)}</pre>}
                  </li>
                ))}</ul>
              </details>
            </>
          )}
        </div>
      )}
      <p role="status">{status}</p>
    </section>
  );
}
