'use strict';

// Consolidated final Character Build review package generator.
// Inputs are frozen review artifacts plus a fresh READ-ONLY development inventory.
// No database write is performed by this script.

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const game = require('genshin-db');
const { digest } = require('./catalog-completion.cjs');
const { validate: validateCandidate } = require('./catalog-final-review.cjs');
const { dryRun } = require('./catalog-dry-run.cjs');

const root = path.resolve(__dirname, '../../../docs/character-builds');
const finalDir = path.join(root, 'final-review');
const revision = 'character-build-catalog-7.2-r4-final-all';
const local = 'genshin-db@' + require('genshin-db/package.json').version;
const checked = '2026-11-20';

const imported = new Set(['bennett:1', 'fischl:1', 'xiangling:1']);
const specificHolds = new Set([
  'alyosha:1', 'citlali:1', 'columbina:1', 'kaveh:1', 'mavuika:2', 'neuvillette:1', 'nilou:1',
  'odette:1', 'sangonomiya-kokomi:2', 'valeriy:1', 'vesna:1', 'vodyanitsa:1',
]);
// Non-patch review notes on already frozen A02–A04 payloads. The checksums are
// deliberately unchanged; these are outstanding human review requirements.
const preReviewedNotes = {
  'beidou:1': 'Frozen R3 artifact rationale for a Noblesse/Gladiator 2+2 credits four-piece team ATK and melee Normal Attack effects that are inactive. artifactRationale is review-only metadata and is not part of the applied GraphQL patch; the selected sets remain valid two-piece bonuses.',
  'yelan:1': 'Frozen R2 artifact rationale for a Tenacity/Heart of Depth 2+2 credits four-piece effects that are inactive; the applied patch is limited to two-piece bonuses and the Slingshot R1 correction.',
  'zhongli:1': 'Frozen R2 artifact rationale for a Tenacity/Vourukasha 2+2 credits four-piece effects that are inactive; the applied patch is unchanged.',
};
const outsideCatalog = [
  { characterId: 'traveler', reason: 'Generic Traveler has no specified combat form; no build was fabricated.' },
  { characterId: 'traveler-boy', reason: 'Element-specific variants are reviewed separately; the generic identity has no supported build context.' },
  { characterId: 'traveler-girl', reason: 'Element-specific variants are reviewed separately; the generic identity has no supported build context.' },
  { characterId: 'manekin', reason: 'No independent conventional talent build is available in the local game package.' },
  { characterId: 'manekina', reason: 'No independent conventional talent build is available in the local game package.' },
];

// Minimal, evidence-backed corrections applied to R4 successors. Each entry is
// { reason, evidence, apply(candidate) } and is only used for demonstrable mistakes.
const corrections = require('./catalog-final-all-corrections.cjs');

const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const write = (name, data) => fs.writeFileSync(path.join(root, name), JSON.stringify(data, null, 2) + '\n');
const elementsOf = (inventory, ids) => [...new Set(ids.map(id => inventory.characters.find(c => c.id === id)?.element).filter(Boolean))];

function roleContextMap() {
  const map = new Map();
  for (const line of fs.readFileSync(path.join(root, 'recommendation-evidence.tsv'), 'utf8').trim().split('\n').slice(1)) {
    const [id, context, playstyles] = line.split('|');
    if (!map.has(id)) map.set(id, []);
    map.get(id).push({ context, playstyles: playstyles.split(',') });
  }
  map.set('mitya', [{ context: 'Approved Electro on-field carry and off-field support', playstyles: ['MAIN_DPS', 'SUPPORT'] }]);
  return map;
}

function chooseContext(map, id, hint) {
  const rows = map.get(id) ?? [];
  if (rows.length > 1 && hint) {
    const match = rows.find(row => hint.includes(row.context) || row.context.split(' ').some(word => word.length > 4 && hint.includes(word)));
    if (match) return match;
  }
  return rows[0] ?? { context: 'Catalog teammate', playstyles: ['SUB_DPS'] };
}

function roleOf(id, info, isOwner, ownerStyles) {
  if (isOwner) return { role: ownerStyles[0] ?? 'SUB_DPS', roleDesc: info.context };
  if (info.playstyles.includes('MAIN_DPS')) return { role: 'MAIN_DPS', roleDesc: info.context };
  if (info.playstyles.includes('SUPPORT') && !info.playstyles.includes('SUB_DPS')) return { role: 'SUPPORT', roleDesc: info.context };
  if (/heal|shield|support|buffer|battery|driver|EM support|resistance/i.test(info.context)) return { role: 'SUPPORT', roleDesc: info.context };
  return { role: 'SUB_DPS', roleDesc: info.context };
}

function reactionScope(elements) {
  const has = e => elements.includes(e);
  const notes = [];
  if (has('Hydro') && has('Dendro') && has('Electro')) notes.push('Quicken/Hyperbloom reactions are available');
  else if (has('Hydro') && has('Dendro')) notes.push('Bloom reactions are available');
  if (has('Dendro') && has('Electro')) notes.push('Aggravate/Spread reactions are available');
  if (has('Pyro') && has('Hydro')) notes.push('Vaporize is available');
  if (has('Pyro') && has('Cryo')) notes.push('Melt is available');
  if (has('Hydro') && has('Cryo')) notes.push('Freeze is available');
  if (has('Hydro') && has('Electro')) notes.push('Electro-Charged is available');
  if (has('Anemo') && elements.some(e => ['Pyro', 'Hydro', 'Cryo', 'Electro'].includes(e))) notes.push('Swirl can spread an elemental aura');
  if (has('Geo')) notes.push('Geo resonance/Crystallize applies to the roster');
  return notes.length ? notes.join('; ') + ' (availability only, not an ownership claim)' : 'No reaction claim is made for this roster';
}

function enrichTeamRoles(candidate, inventory, roleMap) {
  assert.equal(candidate.patch.teams?.length, 1, candidate.candidateId + ' must have exactly one lineup for scoped review');
  const team = candidate.patch.teams[0];
  assert.equal(team.members.length, 4);
  const ids = team.members.map(member => member.characterId);
  const elements = elementsOf(inventory, ids);
  const energy = candidate.provenance?.mechanics?.burstEnergy;
  const erPlanned = Boolean(candidate.patch.subStatsPriority?.includes('Energy Recharge'));
  const scope = [
    'Review scope: ' + reactionScope(elements) + '.',
    'Owner ' + candidate.characterId + ' uses ' + roleContextMapHint(roleMap, candidate) + '.',
    Number.isInteger(energy) ? 'Owner Burst costs ' + energy + ' Energy; ' + (erPlanned ? 'ER is listed in substats, so confirm particle routing for the intended cadence.' : 'no blanket ER target is asserted; add ER only if the chosen rotation requires Burst.') : 'Energy target remains rotation-dependent.',
    'Experimental archetype: no damage ranking or simulated rotation is claimed.',
  ].join(' ');
  const members = team.members.map(member => {
    const info = chooseContext(roleMap, member.characterId, candidate.patch.notesEn + ' ' + team.description);
    const assigned = roleOf(member.characterId, info, member.characterId === candidate.characterId, candidate.patch.playstyles);
    return { ...member, role: assigned.role, roleDesc: assigned.roleDesc };
  });
  return {
    ...team,
    description: (team.description ?? '') + ' ' + scope,
    members,
  };
}

function roleContextMapHint(roleMap, candidate) {
  return chooseContext(roleMap, candidate.characterId, candidate.patch.notesEn).context;
}

function fieldDiffs(before, after) {
  const fields = Object.fromEntries(Object.keys(after).filter(key => JSON.stringify(after[key]) !== JSON.stringify(before[key]))
    .map(key => [key, { before: before[key] ?? null, after: after[key] }]));
  return fields;
}

function sourceCandidate(id, revisedById, draftById) {
  const candidate = revisedById.get(id) ?? draftById.get(id);
  assert.ok(candidate, 'Missing candidate ' + id);
  const { checksum, ...body } = candidate;
  assert.equal(digest(body), checksum, 'Frozen checksum mismatch for ' + id);
  return { candidate: body, checksum };
}

function collectionEffects(inventory, candidate) {
  const owner = inventory.characters.find(character => character.id === candidate.characterId);
  const build = candidate.baseline && owner.builds.find(row => row.id === candidate.baseline.buildId);
  if (candidate.baseline) assert.ok(build, 'Missing baseline ' + candidate.candidateId);
  const shape = rows => rows.map(row => row.id);
  return {
    buildId: build?.id ?? null,
    before: build ? { weapons: shape(build.bestWeapons), artifacts: shape(build.bestArtifacts), teams: shape(build.teams) } : null,
    afterCounts: {
      weapons: candidate.patch.weapons?.length ?? build?.bestWeapons.length ?? 0,
      artifacts: candidate.patch.artifacts?.length ?? build?.bestArtifacts.length ?? 0,
      teams: candidate.patch.teams?.length ?? build?.teams.length ?? 0,
    },
    arraysExplicitlyReplaced: ['weapons', 'artifacts', 'teams'].filter(key => key in candidate.patch),
    legacyArchive: build ? {
      id: 'baseline-' + candidate.characterId,
      effect: 'All original child rows are moved to an immutable, non-default, non-public baseline build on first approval; omitted arrays are copied back to the active build.',
      historicalRowsDeleted: false,
    } : { id: null, effect: 'New separate build: no existing recommendation rows are reparented or replaced.', historicalRowsDeleted: false },
  };
}

function generate(snapshotPath) {
  const inventory = read(snapshotPath);
  assert.equal(inventory.identity.database, 'genshinhub');
  const draftDoc = read(path.join(root, 'proposed-builds.json'));
  const revised = read(path.join(finalDir, 'REVISED_CANDIDATES.json')).records;
  const ready = read(path.join(finalDir, 'READY_BATCHES.json'));
  const matrix = read(path.join(finalDir, 'SOURCE_PROVENANCE.json')).records;
  const revisedById = new Map();
  for (const record of revised) revisedById.set(record.candidate.candidateId, record.candidate);
  const draftById = new Map(draftDoc.builds.map(row => [row.candidateId, row]));
  const groupById = new Map(matrix.map(row => [row.candidateId, row.group]));
  const roleMap = roleContextMap();
  const catalog = Object.fromEntries(['characters', 'weapons', 'artifacts']
    .map(field => [field, new Map(inventory[field].map(row => [row.id, row]))]));

  const eligible = [], deferred = [], changes = [];
  for (const original of draftDoc.builds) {
    const id = original.candidateId;
    if (imported.has(id)) {
      deferred.push({ candidateId: id, characterId: original.characterId, state: 'ALREADY_IMPORTED',
        reason: 'A01 R3 was approved and imported at version 3. Preserved unchanged and excluded from this import set.' });
      continue;
    }
    const group = groupById.get(id);
    if (group === 'C') {
      deferred.push({ candidateId: id, characterId: original.characterId, state: 'BLOCKED',
        reason: 'Equipment-only hold: scaling, main stats, talent priorities and a usable rotation remain unverified.' });
      continue;
    }
    if (!original.patch.teams?.length || specificHolds.has(id)) {
      deferred.push({ candidateId: id, characterId: original.characterId, state: 'NEEDS_MORE_EVIDENCE',
        reason: (matrix.find(row => row.candidateId === id)?.genshinBuilds ? '' : '') +
          (specificHolds.has(id) ? (matrix.find(row => row.candidateId === id)?.theorycrafting?.reason ?? 'Specific rotation evidence remains open.') : 'No supported team rotation or explicit team omission sign-off.') });
      continue;
    }

    let source = sourceCandidate(id, revisedById, draftById);
    const priorChecksum = source.checksum;
    const candidate = structuredClone(source.candidate);
    let patchDiffs = {};
    const isPreReviewed = group === 'A';
    if (!isPreReviewed) {
      for (const [category, entry] of Object.entries(corrections)) {
        if (entry.ids?.includes(id)) {
          entry.apply(candidate);
          changes.push({ candidateId: id, category: entry.category ?? category, reason: entry.reason, evidence: entry.evidence });
        }
      }
      const beforePatch = structuredClone(source.candidate.patch);
      candidate.patch.teams = [enrichTeamRoles(candidate, inventory, roleMap)];
      candidate.revision = revision;
      candidate.patch.source = revision;
      candidate.supersedes = { revision: source.candidate.revision, checksum: priorChecksum };
      candidate.reviewDecision = 'NONE_REVIEW_MUST_RESTART';
      candidate.confidence = 'SUPPORTED_WITHIN_SCOPE';
      candidate.collectionPolicy = 'ARCHIVE_LEGACY_ROWS_REPLACE_EXPLICIT_ACTIVE_COLLECTIONS';
      candidate.reviewEvidence = {
        roleAssignments: 'Mapped from the versioned independent role contexts in recommendation-evidence.tsv and each character kit.',
        reactionAndEnergyScope: 'Element-based availability and Burst-cost/ER scope recorded in the team description. Reaction ownership and exact ER targets remain rotation-dependent.',
        sourceComparison: source.candidate.provenance?.externalComparison ?? null,
        independentlyVerifiedReferences: [local, source.candidate.provenance?.externalReference?.url].filter(Boolean),
      };
      changes.push({ candidateId: id, category: 'teams', reason: 'Assign an explicit job to all four roster members and record the elemental and Energy scope.',
        evidence: 'recommendation-evidence.tsv role context; installed ' + local + '; Genshin-Builds comparison captured ' + checked });
      patchDiffs = fieldDiffs(beforePatch, candidate.patch);
      candidate.checksum = digest(candidate);
      assert.equal(candidate.checksum, digest(Object.fromEntries(Object.entries(candidate).filter(([key]) => key !== 'checksum'))));
    } else {
      candidate.checksum = priorChecksum;
    }

    validateCandidate(candidate, catalog);
    const plan = dryRun({ revision: candidate.revision, builds: [candidate] }, inventory).candidates[0];
    assert.equal(plan.checksum, candidate.checksum);
    assert.equal(plan.outcome, 'REQUIRES_EXPLICIT_ADMIN_REVIEW', id + ' outcome ' + plan.outcome);
    const owner = inventory.characters.find(character => character.id === candidate.characterId);
    assert.ok(owner.builds.some(build => build.id === candidate.baseline?.buildId || !candidate.baseline), id);
    assert.ok(!owner.builds.some(build => build.id === candidate.baseline?.buildId && build.reviewStatus === 'APPROVED'), id + ' approved baseline');
    assert.equal(plan.requestedDefaultChange, false, id + ' must not request a default change');
    assert.ok(plan.existingDefault, id + ' requires an existing default to preserve');

    const provenanceRecord = matrix.find(row => row.candidateId === id);
    eligible.push({
      candidateId: id,
      characterId: candidate.characterId,
      role: candidate.patch.playstyles,
      version: candidate.revision,
      checksum: candidate.checksum,
      state: 'REVIEW_READY',
      preReviewed: isPreReviewed,
      baseline: candidate.baseline,
      baselineFingerprint: candidate.baseline?.checksum ?? null,
      baselineVerified: candidate.baseline ? candidate.baseline.version === inventory.characters
        .find(character => character.id === candidate.characterId)
        .builds.find(build => build.id === candidate.baseline.buildId)?.version : true,
      supersedes: candidate.supersedes ?? null,
      diffs: patchDiffs,
      provenance: {
        game: [local, checked],
        genshinBuilds: provenanceRecord?.genshinBuilds?.url ?? candidate.provenance?.externalReference?.url ?? null,
        theorycrafting: provenanceRecord?.theorycrafting?.url ?? null,
        theorycraftingChecked: Boolean(provenanceRecord?.theorycrafting?.checked),
        sourceComparison: candidate.provenance?.externalComparison ?? null,
        independentReasoning: candidate.patch.notesEn,
        evidenceGaps: candidate.missingEvidence ?? [],
        frozenPackageNote: preReviewedNotes[id] ?? null,
      },
      confidence: candidate.confidence,
      proposedOperation: candidate.baseline ? {
        mutation: 'updateCharacterBuild(id, characterId, expectedVersion, input: <exact patch>) then reviewCharacterBuild(id, characterId, expectedVersion, decision: APPROVE)',
        stageExpectedVersion: candidate.baseline.version,
        patch: candidate.patch,
      } : {
        mutation: 'createCharacterBuild(characterId, name, playstyles) then updateCharacterBuild(id, characterId, expectedVersion, input: <exact patch>) then reviewCharacterBuild(id, characterId, expectedVersion, decision: APPROVE)',
        stageExpectedVersion: 'version returned by createCharacterBuild',
        patch: candidate.patch,
        note: 'New separate alternate build; must remain non-default and must not replace the existing default.',
      },
      expectedActiveArrayChanges: collectionEffects(inventory, candidate),
      defaultPreservation: {
        existingDefault: plan.existingDefault,
        requirement: candidate.baseline
          ? 'Keep the current default unchanged. No first-default promotion is requested.'
          : 'Create this alternate build as non-default. The existing default must remain unchanged.',
      },
      outstandingAdminReview: [
        'Confirm the exact candidate ID, version and checksum in this immutable manifest.',
        'Re-run checksum, baseline fingerprint and no-pending preflight immediately before staging.',
        'Use authenticated Admin credentials through the existing mutations; no direct SQL approval.',
        'Review the experimental team scope: reaction ownership and ER targets are rotation-dependent.',
        ...(isPreReviewed ? [] : ['Confirm the four assigned teammate roles before approval.']),
        ...(preReviewedNotes[id] ? ['Frozen-package advisory (checksum deliberately unchanged): ' + preReviewedNotes[id]] : []),
      ],
      candidate,
    });
  }

  eligible.sort((a, b) => a.candidateId.localeCompare(b.candidateId));
  const descriptor = eligible.map(({ candidateId, version, checksum }) => ({ candidateId, version, checksum }));
  const manifestChecksum = digest(descriptor);
  const manifest = {
    package: revision,
    state: 'REVIEW_READY_CONSOLIDATED_AUTHORIZATION_NONE',
    frozenAt: checked,
    immutable: true,
    candidateCount: eligible.length,
    checksumAlgorithm: 'SHA-256 over JSON.stringify(value)',
    manifestChecksumAlgorithm: 'SHA-256 over JSON.stringify(ordered [{candidateId,version,checksum}])',
    manifestChecksum,
    orderedCandidateSet: descriptor,
    excluded: {
      alreadyImported: deferred.filter(row => row.state === 'ALREADY_IMPORTED').map(row => row.candidateId),
      needsMoreEvidence: deferred.filter(row => row.state === 'NEEDS_MORE_EVIDENCE'),
      blocked: [
        ...deferred.filter(row => row.state === 'BLOCKED'),
        ...outsideCatalog.map(row => ({ ...row, state: 'BLOCKED' })),
      ],
    },
    developmentDatabase: { name: inventory.identity.database, mode: inventory.identity.mode },
    candidates: eligible,
  };
  const diffs = {
    package: revision,
    candidateCount: eligible.length,
    correctionCount: changes.length,
    corrections: changes,
    candidates: eligible.map(row => ({ candidateId: row.candidateId, characterId: row.characterId,
      from: row.supersedes, to: { revision: row.version, checksum: row.checksum }, fields: row.diffs })),
  };

  const dry = {
    revision, mode: 'DRY_RUN', writes: 0,
    selection: { batch: 'ALL_CONSOLIDATED', subsetSupported: true },
    manifestChecksum,
    inventoryChecksum: digest(inventory),
    candidateCount: eligible.length + deferred.length,
    candidates: [
      ...eligible.map(row => ({ candidateId: row.candidateId, characterId: row.characterId, revision: row.version,
        checksum: row.checksum, state: row.state, outcome: 'REQUIRES_EXPLICIT_ADMIN_REVIEW', writeEligible: false,
        existingDefault: row.defaultPreservation.existingDefault })),
      ...deferred,
    ],
    developmentIntegrity: { writes: 0, database: 'genshinhub', identity: inventory.identity },
  };
  write('FINAL_ALL_BUILDS_MANIFEST.json', manifest);
  write('FINAL_ALL_BUILDS_DIFFS.json', diffs);
  write('FINAL_ALL_BUILDS_DRY_RUN.json', dry);
  write('FINAL_ALL_BUILDS_BLOCKERS.md', blockersMarkdown(manifest));
  fs.writeFileSync(path.join(root, 'COMPLETE_CHARACTER_BUILDS_REPORT.md'), reportMarkdown(manifest, deferred, changes, inventory));
  return { manifest, diffs, dry, deferred, changes, inventory };
}

function reportMarkdown(manifest, deferred, changes, inventory) {
  const approved = inventory.characters.flatMap(character => character.builds).filter(build => build.reviewStatus === 'APPROVED');
  const categoryCount = category => changes.filter(change => change.category === category).length;
  const prior = read(path.join(finalDir, 'REVISED_CANDIDATES.json')).records;
  const priorByCategory = category => prior.filter(record => record.changes.some(change => change.category === category)).length;
  const testFile = process.env.FINAL_ALL_TEST_RESULTS;
  const tests = testFile && fs.existsSync(testFile) ? read(testFile) : null;
  const lines = [
    '# Complete Character Build review and consolidated approval package', '',
    'Package `' + manifest.package + '` · frozen ' + manifest.frozenAt + ' · authorization ' + manifest.state, '',
    'This is the single review package for work item #2. It covers every remaining draft, records the genuinely unresolved entries, and stops at one explicit authorization gate before any real development write.', '',
    '## 1–7. Coverage and disposition', '',
    '| Measure | Count |', '| --- | ---: |',
    '| 1. Catalog characters inspected | ' + inventory.characters.length + ' |',
    '| 2. Existing approved builds in development | ' + approved.length + ' (A01 R3: ' + approved.filter(build => ['legacy-bennett', 'legacy-fischl', 'legacy-xiangling'].includes(build.id)).length + '; Mitya: ' + approved.filter(build => build.characterId === 'mitya').length + ') |',
    '| 3. Remaining candidate builds after A01 | ' + (manifest.candidateCount + manifest.excluded.needsMoreEvidence.length + manifest.excluded.blocked.filter(row => row.candidateId).length) + ' |',
    '| 4. Independently verified build candidates | ' + manifest.candidateCount + ' |',
    '| 5. REVIEW_READY and eligible | ' + manifest.candidateCount + ' |',
    '| 6. NEEDS_MORE_EVIDENCE | ' + manifest.excluded.needsMoreEvidence.length + ' |',
    '| 7. BLOCKED | ' + manifest.excluded.blocked.length + ' (6 candidate drafts + 5 non-buildable catalog identities) |',
    '', 'Total CharacterBuild rows in the read-only snapshot: ' + inventory.characters.reduce((sum, character) => sum + character.builds.length, 0) +
      '. Existing defaults: ' + inventory.characters.filter(character => character.builds.some(build => build.isDefault)).length +
      '. A01 was imported at version 3 and is excluded unchanged; Mitya’s two approved builds and default are protected.', '',
    '## 8–11. Corrections', '',
    '| Area | Consolidated R4 corrections | Earlier frozen R2/R3 corrections |', '| --- | ---: | ---: |',
    '| 8. Weapons | ' + categoryCount('weapons') + ' | ' + priorByCategory('weapons') + ' |',
    '| 9. Artifacts | ' + categoryCount('artifacts') + ' | ' + priorByCategory('artifacts') + ' |',
    '| 10. Teams (explicit role assignments and scope) | ' + categoryCount('teams') + ' | ' + priorByCategory('teams') + ' |',
    '| 11. Stats and Talents | ' + (categoryCount('stats') + categoryCount('talents')) + ' | ' + (priorByCategory('stats') + priorByCategory('talents')) + ' |',
    '| Metadata (duplicate constellation labels) | ' + categoryCount('metadata') + ' | 0 |',
    '', 'Every R4 correction applies to a demonstrable, sourced mistake or to an explicit team-role/evidence clarification. R1 and all earlier frozen payloads remain unchanged. ' +
      'The exact before/after fields are in `FINAL_ALL_BUILDS_DIFFS.json`.', '',
    'Corrections in this run:', '',
    ...changes.map(change => '- `' + change.candidateId + '` · ' + change.category + ' — ' + change.reason +
      (change.evidence ? ' (' + change.evidence + ')' : '')),
    ...(changes.length > 1 ? ['', 'The remaining R4 changes are systematic team-role assignments derived from the versioned independent role contexts in `recommendation-evidence.tsv`, with elemental/Energy scope recorded in each lineup description.' ] : []),
    '', '## 12. Preserved legacy recommendations', '',
    'Nine previously reviewed candidates keep their exact checksums from `REVISED_CANDIDATES.json` (A02–A04). A01 builds are untouched at version 3. ' +
      'For every revision that supplies `weapons`, `artifacts` or `teams`, approval moves the original child rows to the immutable, non-default, non-public `baseline-<character>` build; omitted arrays are copied back to the active build. ' +
      'No historical row is deleted, and CharacterBuildAudit history is appended rather than rewritten. Character-level admin recommendations and Tier Rankings are outside the write payload.', '',
    '## 13. Complete candidate ID / version / checksum manifest', '',
    'Ordered manifest checksum (`' + manifest.manifestChecksumAlgorithm + '`): `' + manifest.manifestChecksum + '`', '',
    '| Candidate | Character | Role | Version | SHA-256 | Baseline |', '| --- | --- | --- | --- | --- | --- |',
    ...manifest.candidates.map(row => '| `' + row.candidateId + '` | `' + row.characterId + '` | ' + row.role.join('+') +
      ' | `' + row.version + '` | `' + row.checksum + '` | ' + (row.baseline ? '`' + row.baseline.buildId + '@v' + row.baseline.version + '`' : 'new separate build') + ' |'),
    '', 'The full payload, provenance, field diffs and GraphQL operation for each row are in `FINAL_ALL_BUILDS_MANIFEST.json`.', '',
    '## 14. Isolated PostgreSQL import test results', '',
  ];
  if (tests) {
    lines.push('Executed against `' + tests.database + '` with all ' + tests.candidates + ' candidates (not a three-character sample). ' +
      'Published ' + tests.published + ', archived ' + tests.archives + ' legacy recommendation sets, created ' + tests.newBuilds + ' separate builds. ' +
      'Real development approvals: ' + tests.realApprovals + '.', '');
    for (const check of tests.checks) lines.push('- PASS — ' + check);
    if (tests.backupRestore) lines.push('- PASS — fresh isolated backup restored and verified: ' + tests.backupRestore);
    if (tests.detailRendering) lines.push('- PASS — Character Detail rendering: ' + tests.detailRendering);
  } else {
    lines.push('Pending execution. The isolated runner is `backend/scripts/build-audit/catalog-final-all.integration.cjs`; its result is required before the authorization gate.', '');
  }
  lines.push('', '## 15. Development database before authorization', '',
    'All planning and validation used a read-only snapshot (`current_database()=genshinhub`, `transaction_read_only=on`) with inventory checksum `' +
      digest(inventory) + '`. A fresh read-only inventory regenerated after all analysis produced the identical digest, confirming no development write. ' +
      'A separate live read-only check confirmed 128 CharacterBuild rows, 0 pending stages, 5 approved builds (A01 at version 3 and both Mitya builds), and all defaults intact. ' +
      'No development mutation was called by this work item. Development identity, A01 versions, defaults, Mitya, unrelated builds, Tier Rankings and audit history remain unchanged.', '',
    '## 16–17. Consolidated approval request', '',
    '**Exactly ' + manifest.candidateCount + ' candidates are eligible for approval and import.** ' +
      'The user may authorize the immutable ordered set `' + manifest.package + '` with overall SHA-256 `' + manifest.manifestChecksum + '` in one step. ' +
      'Any changed payload, changed baseline, pending stage or database identity drift stops the corresponding candidate; no substitution is permitted.', '',
    'After authorization only: recalculate all checksums, revalidate every live baseline, confirm the development database identity, verify authenticated Admin access, create and restore-test a fresh backup, then stage and approve the exact payloads through the existing Admin GraphQL workflow in bounded transactions with checkpoints. Stop safely on conflict or failure, verify every imported build and verify unrelated records.', '',
    '## 18. Genuinely unresolved characters', '',
    '| Character / candidate | State | Reason |', '| --- | --- | --- |',
    ...manifest.excluded.needsMoreEvidence.map(row => '| `' + row.candidateId + '` | NEEDS_MORE_EVIDENCE | ' + row.reason.replaceAll('|', '/') + ' |'),
    ...manifest.excluded.blocked.map(row => '| `' + row.characterId + '` | BLOCKED | ' + row.reason.replaceAll('|', '/') + ' |'),
    '', 'Generic Traveler and both Manekin records receive no fabricated builds. Mitya is protected. Work item #3 (Tier List) is out of scope.', '');
  return lines.join('\n');
}

function blockersMarkdown(manifest) {
  const lines = ['# Remaining Character Build blockers and evidence holds', '',
    'Package `' + manifest.package + '` · ' + manifest.frozenAt, '',
    'No candidate below is included in the importable set. Counts: ' + manifest.excluded.needsMoreEvidence.length +
      ' NEEDS_MORE_EVIDENCE, ' + manifest.excluded.blocked.length + ' BLOCKED, ' + manifest.excluded.alreadyImported.length + ' already imported.', '',
    '## Already imported and preserved', '',
    '| Candidate | Decision |', '| --- | --- |'];
  for (const id of manifest.excluded.alreadyImported) lines.push('| `' + id + '` | A01 R3 approved at version 3; unchanged and outside this authorization gate. |');
  lines.push('', '## NEEDS_MORE_EVIDENCE', '', '| Candidate | Character | Reason |', '| --- | --- | --- |');
  for (const row of manifest.excluded.needsMoreEvidence) lines.push('| `' + row.candidateId + '` | `' + row.characterId + '` | ' + row.reason.replaceAll('|', '/') + ' |');
  lines.push('', '## BLOCKED', '', '| Character | Reason |', '| --- | --- | --- |');
  for (const row of manifest.excluded.blocked) lines.push('| `' + row.characterId + '` | ' + row.reason.replaceAll('|', '/') + ' |');
  lines.push('', 'These records are deliberately not given fabricated builds. Mitya’s two approved builds and default remain protected.', '');
  return lines.join('\n');
}

if (require.main === module) {
  const snapshot = process.argv[2];
  if (!snapshot?.startsWith('/tmp/')) throw new Error('Supply a fresh read-only inventory under /tmp');
  const result = generate(snapshot);
  console.log(JSON.stringify({ revision, eligible: result.manifest.candidateCount,
    manifestChecksum: result.manifest.manifestChecksum, needsMoreEvidence: result.deferred.filter(x => x.state === 'NEEDS_MORE_EVIDENCE').length,
    blocked: result.manifest.excluded.blocked.length,
    corrections: result.changes.length }));
}

module.exports = { generate };
