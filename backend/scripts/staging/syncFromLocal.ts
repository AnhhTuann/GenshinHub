/**
 * Staging data sync from the verified local database to the Neon staging branch.
 *
 * SAFETY CONTRACT
 * - Read-only by default. `--apply` performs idempotent upserts only.
 * - Never touches User, Admin, AuthSession, Otp, PasswordResetToken or auth data.
 * - Never deletes, resets or truncates anything.
 * - Preserves destination editorial/approval fields when a record already exists.
 * - Never changes a pending/needs-review decision into an approval.
 * - Excludes obvious test/junk IDs and records with unresolved foreign keys.
 * - Emits a complete manifest with stable IDs, SHA-256 checksums, FK and
 *   approval state before any write.
 */
import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import { Prisma, PrismaClient } from '@prisma/client';
import { enkaNameMap, toId } from '../sync/idMapper';

type ModelName = keyof Pick<
  PrismaClient,
  | 'character'
  | 'weapon'
  | 'artifactSet'
  | 'material'
  | 'tierRank'
  | 'characterBuild'
  | 'characterWeapon'
  | 'characterArtifact'
  | 'characterTeam'
  | 'teamMember'
  | 'characterTierRanking'
  | 'weaponTierRank'
  | 'weaponTierReview'
  | 'characterBuildAudit'
  | 'weaponTierAudit'
  | 'weaponTierReviewAudit'
>;

type Row = Record<string, any>;

const MODELS: ModelName[] = [
  'character',
  'weapon',
  'artifactSet',
  'material',
  'tierRank',
  'characterBuild',
  'characterWeapon',
  'characterArtifact',
  'characterTeam',
  'teamMember',
  'characterTierRanking',
  'weaponTierRank',
  'weaponTierReview',
  'characterBuildAudit',
  'weaponTierAudit',
  'weaponTierReviewAudit',
];

// Order matters: parents before children, reviews before review audits.
const APPLY_ORDER: ModelName[] = [
  'character',
  'weapon',
  'artifactSet',
  'material',
  'tierRank',
  'characterBuild',
  'characterWeapon',
  'characterArtifact',
  'characterTeam',
  'teamMember',
  'characterTierRanking',
  'weaponTierRank',
  'weaponTierReview',
  'characterBuildAudit',
  'weaponTierAudit',
  'weaponTierReviewAudit',
];

// From backend/scripts/sync/detector.ts plus build/tier editorial fields.
const PRESERVE_FIELDS: Partial<Record<ModelName, string[]>> = {
  character: [
    'tier', 'role', 'recommendedC', 'tierNoteEn', 'tierNoteVi',
    'talentPriority', 'signatureWeapons', 'sands', 'goblet', 'circlet',
    'subStatsPriority', 'stats', 'ascensionMats', 'talentMats',
  ],
  weapon: ['tier', 'role'],
  characterBuild: [
    'reviewStatus', 'isDefault', 'approvalChecksum', 'version', 'notesEn', 'notesVi',
  ],
  characterTeam: ['reviewStatus'],
  characterTierRanking: [
    'approvalStatus', 'rejectionReason', 'reviewedAt', 'approvedBy',
  ],
  weaponTierRank: [
    'reviewStatus', 'rejectionReason', 'reviewedAt', 'approvedBy',
  ],
  weaponTierReview: [
    'decision', 'decisionReason', 'decidedAt', 'decidedBy',
    'rightsVerified', 'rightsBasis', 'rightsVerifiedAt', 'rightsVerifiedBy',
    'tierChangeConfirmed', 'tierChangeConfirmedAt', 'tierChangeConfirmedBy',
    'evidenceAcknowledged', 'evidenceSupplement', 'version',
  ],
};

const FORBIDDEN_MODELS = [
  'admin', 'user', 'authSession', 'otp', 'passwordResetToken', 'authRateLimit',
];

function parseArgs() {
  const argv = process.argv.slice(2);
  return {
    apply: argv.includes('--apply'),
    verify: argv.includes('--verify'),
    manifestPath: argv.includes('--manifest')
      ? argv[argv.indexOf('--manifest') + 1]
      : path.join(__dirname, '../../docs/staging-sync/manifest.json'),
    summaryPath: argv.includes('--summary')
      ? argv[argv.indexOf('--summary') + 1]
      : path.join(__dirname, '../../docs/staging-sync/DRY_RUN.md'),
  };
}

function canonical(value: any): any {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.map(canonical);
  if (typeof value === 'object') {
    const out: Record<string, any> = {};
    for (const key of Object.keys(value).sort()) out[key] = canonical(value[key]);
    return out;
  }
  return value;
}

function checksum(row: Row): string {
  return createHash('sha256').update(JSON.stringify(canonical(row))).digest('hex');
}

function isJunkId(id: unknown): boolean {
  if (typeof id !== 'string') return true;
  return /^(?:test|junk|dummy|fixture|tmp|temp)[-_]|^__|[-_]__/.test(id) || /[-_](?:test|junk|dummy|fixture)$/i.test(id);
}

function naturalKey(model: ModelName, row: Row): string | null {
  switch (model) {
    case 'characterBuild':
      return `${row.characterId}|${row.name}`;
    case 'characterTierRanking':
      return `${row.characterId}|${row.role}|${row.constellation}|${row.gameVersion}`;
    case 'weaponTierRank':
      return `${row.weaponId}|${row.role}|${row.versionKey}|${row.refinementContext}`;
    case 'weaponTierReview':
      return `candidate:${row.candidateId}`;
    case 'tierRank':
      return `name:${row.name}`;
    default:
      return null;
  }
}

function approvalState(model: ModelName, row: Row | undefined): string {
  if (!row) return 'none';
  switch (model) {
    case 'characterBuild':
      return `${row.reviewStatus ?? 'NULL'}${row.isDefault ? '|DEFAULT' : ''}`;
    case 'characterTeam':
      return row.reviewStatus ?? 'NULL';
    case 'characterTierRanking':
      return row.approvalStatus ?? 'NULL';
    case 'weaponTierRank':
      return row.reviewStatus ?? 'NULL';
    case 'weaponTierReview':
      return `${row.decision ?? 'NULL'}${row.rightsVerified ? '|RIGHTS' : ''}${row.tierChangeConfirmed ? '|TIER_CONFIRMED' : ''}`;
    default:
      return 'n/a';
  }
}

function parseUrl(value: string) {
  const url = new URL(value);
  return { host: url.hostname, db: decodeURIComponent(url.pathname.slice(1)) };
}

/** Strip diacritics/case/punctuation so legacy Vietnamese aliases can be matched deterministically. */
function normalizeLoose(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

interface AliasMaps {
  character: Map<string, string>;
  weapon: Map<string, string>;
  ambiguousWeapon: Set<string>;
  remaps: Array<{ model: string; field: string; from: string; to: string }>;
}

/**
 * Build verified alias maps only from authoritative source rows:
 * - characters: exact ID plus the repository's enkaNameMap short names;
 * - weapons: exact ID plus nameVi/nameEn, rejecting ambiguous collisions.
 */
function buildAliasMaps(characters: Row[], weapons: Row[]): AliasMaps {
  const character = new Map<string, string>();
  for (const row of characters) {
    const id = String(row.id);
    character.set(id, id);
    const shortName = enkaNameMap[row.nameEn] ?? row.nameEn;
    for (const alias of [shortName, toId(shortName), normalizeLoose(shortName)]) {
      if (alias && !character.has(alias)) character.set(alias, id);
    }
  }

  const weapon = new Map<string, string>();
  const ambiguousWeapon = new Set<string>();
  for (const row of weapons) {
    const id = String(row.id);
    weapon.set(id, id);
    for (const name of [row.nameVi, row.nameEn]) {
      const key = name ? normalizeLoose(String(name)) : '';
      if (!key) continue;
      if (weapon.has(key) && weapon.get(key) !== id) ambiguousWeapon.add(key);
      else if (!weapon.has(key)) weapon.set(key, id);
    }
  }
  return { character, weapon, ambiguousWeapon, remaps: [] };
}

function resolveAlias(maps: AliasMaps, kind: 'character' | 'weapon', value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const map = maps[kind];
  const key = normalizeLoose(value);
  if (kind === 'weapon' && maps.ambiguousWeapon.has(key)) return null;
  return map.get(value) ?? map.get(key) ?? null;
}

interface ManifestEntry {
  model: ModelName;
  id: string;
  action: 'create' | 'update' | 'unchanged' | 'excluded-junk' | 'excluded-duplicate' | 'excluded-unverified' | 'blocked-conflict';
  sourceChecksum: string | null;
  destinationChecksum: string | null;
  plannedChecksum: string | null;
  approvalState: string;
  fk: 'ok' | 'invalid' | 'n/a';
  reason?: string;
  preservedFields?: string[];
}

interface Manifest {
  generatedAt: string;
  identity: Record<string, unknown>;
  aliasRemaps: Array<{ model: string; field: string; from: string; to: string }>;
  counts: Record<string, Record<string, number>>;
  entries: ManifestEntry[];
}

async function main() {
  const args = parseArgs();
  const sourceUrl = process.env.DATABASE_URL;
  const destUrl = process.env.STAGING_DATABASE_URL;
  if (!sourceUrl || !destUrl) throw new Error('DATABASE_URL (local source) and STAGING_DATABASE_URL are required');
  if (args.apply && args.verify) throw new Error('Choose --apply or --verify, not both');

  const src = parseUrl(sourceUrl);
  const dest = parseUrl(destUrl);
  if (!['127.0.0.1', 'localhost'].includes(src.host) || src.db !== 'genshinhub') {
    throw new Error(`Unexpected source identity: ${src.host}/${src.db}`);
  }
  if (!dest.host.endsWith('.neon.tech')) throw new Error('Destination is not a Neon host');
  if (process.env.EXPECTED_STAGING_HOST && dest.host !== process.env.EXPECTED_STAGING_HOST) {
    throw new Error('Destination host does not match the verified staging branch connection');
  }
  if (FORBIDDEN_MODELS.some((m) => MODELS.includes(m as ModelName))) {
    throw new Error('Auth/admin models must never be synchronized');
  }

  const source = new PrismaClient({ datasourceUrl: sourceUrl });
  const target = new PrismaClient({ datasourceUrl: destUrl });
  const manifest: Manifest = {
    generatedAt: new Date().toISOString(),
    identity: {
      source: src,
      destination: { ...dest, expectedBranchId: process.env.EXPECTED_STAGING_BRANCH_ID ?? null },
      excludedModels: FORBIDDEN_MODELS,
      aliasEvidence: 'enkaNameMap (scripts/sync/idMapper.ts) and Weapon.nameVi/nameEn exact normalized matches; ambiguous matches are rejected',
    },
    aliasRemaps: [],
    counts: {},
    entries: [],
  };

  try {
    const sourceRows: Partial<Record<ModelName, Row[]>> = {};
    const destRows: Partial<Record<ModelName, Row[]>> = {};

    for (const model of MODELS) {
      sourceRows[model] = await (source as any)[model].findMany();
      destRows[model] = await (target as any)[model].findMany();
    }

    if (args.verify) {
      const applied = JSON.parse(fs.readFileSync(args.manifestPath, 'utf8')) as Manifest;
      const mismatches: string[] = [];
      for (const entry of applied.entries.filter((e) => e.action === 'create' || e.action === 'update')) {
        const row = (destRows[entry.model] ?? []).find((r) => r.id === entry.id);
        const actual = row ? checksum(row) : null;
        if (actual !== entry.plannedChecksum) mismatches.push(`${entry.model}:${entry.id}`);
      }
      if (mismatches.length) {
        console.error(`VERIFY FAILED: ${mismatches.length} checksum mismatches. First: ${mismatches.slice(0, 5).join(', ')}`);
        process.exitCode = 1;
      } else {
        console.log(`VERIFY PASS: ${applied.entries.filter((e) => e.action === 'create' || e.action === 'update').length} applied records match the manifest.`);
      }
      return;
    }

    // Exclude junk IDs and duplicate natural keys from the source.
    const planned: Partial<Record<ModelName, Row[]>> = {};
    for (const model of MODELS) {
      const rows = sourceRows[model] ?? [];
      const seen = new Set<string>();
      const kept: Row[] = [];
      for (const row of rows) {
        if (isJunkId(row.id)) {
          manifest.entries.push({
            model, id: String(row.id), action: 'excluded-junk', sourceChecksum: checksum(row),
            destinationChecksum: null, plannedChecksum: null, approvalState: approvalState(model, row),
            fk: 'n/a', reason: 'test/junk identifier pattern',
          });
          continue;
        }
        const key = naturalKey(model, row);
        if (key && seen.has(key)) {
          manifest.entries.push({
            model, id: String(row.id), action: 'excluded-duplicate', sourceChecksum: checksum(row),
            destinationChecksum: null, plannedChecksum: null, approvalState: approvalState(model, row),
            fk: 'n/a', reason: `duplicate natural key ${key}`,
          });
          continue;
        }
        if (key) seen.add(key);
        kept.push(row);
      }
      planned[model] = kept;
    }

    // Normalize verified legacy aliases before FK validation. Both alias maps
    // are derived from authoritative source rows, so this never invents data.
    const aliases = buildAliasMaps(planned.character ?? [], planned.weapon ?? []);
    const remapField = (model: ModelName, row: Row, field: string, kind: 'character' | 'weapon') => {
      const resolved = resolveAlias(aliases, kind, row[field]);
      if (resolved && resolved !== row[field]) {
        manifest.aliasRemaps.push({ model, field, from: String(row[field]), to: resolved });
        row[field] = resolved;
      }
    };
    for (const model of MODELS) {
      for (const row of planned[model] ?? []) {
        if (model !== 'character' && 'characterId' in row) remapField(model, row, 'characterId', 'character');
        if (model !== 'weapon' && 'weaponId' in row) remapField(model, row, 'weaponId', 'weapon');
      }
    }

    // Build valid ID sets after exclusions and alias normalization.
    const ids = (model: ModelName) => new Set((planned[model] ?? []).map((r) => r.id));
    const validCharacters = ids('character');
    const validWeapons = ids('weapon');
    const validBuilds = new Set((planned.characterBuild ?? []).map((r) => `${r.id}|${r.characterId}`));
    const validTeams = ids('characterTeam');
    const validRankings = ids('weaponTierRank');
    const validReviews = ids('weaponTierReview');

    function fkStatus(model: ModelName, row: Row): { ok: boolean; reason?: string } {
      switch (model) {
        case 'characterBuild':
          return validCharacters.has(row.characterId) ? { ok: true } : { ok: false, reason: `missing character ${row.characterId}` };
        case 'characterWeapon':
          if (!validCharacters.has(row.characterId)) return { ok: false, reason: `missing character ${row.characterId}` };
          if (row.buildId && !validBuilds.has(`${row.buildId}|${row.characterId}`)) return { ok: false, reason: `missing build ${row.buildId}` };
          if (!validWeapons.has(row.weaponId)) return { ok: false, reason: `missing weapon ${row.weaponId}` };
          return { ok: true };
        case 'characterArtifact':
          if (!validCharacters.has(row.characterId)) return { ok: false, reason: `missing character ${row.characterId}` };
          if (row.buildId && !validBuilds.has(`${row.buildId}|${row.characterId}`)) return { ok: false, reason: `missing build ${row.buildId}` };
          return { ok: true };
        case 'characterTeam':
          if (!validCharacters.has(row.characterId)) return { ok: false, reason: `missing character ${row.characterId}` };
          if (row.buildId && !validBuilds.has(`${row.buildId}|${row.characterId}`)) return { ok: false, reason: `missing build ${row.buildId}` };
          return { ok: true };
        case 'teamMember':
          if (!validTeams.has(row.teamId)) return { ok: false, reason: `missing team ${row.teamId}` };
          if (!validCharacters.has(row.characterId)) return { ok: false, reason: `missing character ${row.characterId}` };
          return { ok: true };
        case 'characterTierRanking':
          return validCharacters.has(row.characterId) ? { ok: true } : { ok: false, reason: `missing character ${row.characterId}` };
        case 'weaponTierRank':
        case 'weaponTierReview':
          return validWeapons.has(row.weaponId) ? { ok: true } : { ok: false, reason: `missing weapon ${row.weaponId}` };
        case 'characterBuildAudit':
          return validBuilds.has(`${row.buildId}|${row.characterId}`) ? { ok: true } : { ok: false, reason: `missing build ${row.buildId}` };
        case 'weaponTierAudit':
          return validRankings.has(row.rankingId) ? { ok: true } : { ok: false, reason: `missing ranking ${row.rankingId}` };
        case 'weaponTierReviewAudit':
          return validReviews.has(row.reviewId) ? { ok: true } : { ok: false, reason: `missing review ${row.reviewId}` };
        default:
          return { ok: true };
      }
    }

    // Compose final plan, preserving destination editorial state.
    const plan: Partial<Record<ModelName, Row[]>> = {};
    const destById: Partial<Record<ModelName, Map<string, Row>>> = {};
    for (const model of MODELS) {
      destById[model] = new Map((destRows[model] ?? []).map((r) => [String(r.id), r]));
      plan[model] = [];
      for (const row of planned[model] ?? []) {
        const fk = fkStatus(model, row);
        const existing = destById[model]!.get(String(row.id));
        const entry: ManifestEntry = {
          model,
          id: String(row.id),
          action: 'create',
          sourceChecksum: checksum(row),
          destinationChecksum: existing ? checksum(existing) : null,
          plannedChecksum: null,
          approvalState: approvalState(model, existing ?? row),
          fk: fk.ok ? 'ok' : 'invalid',
        };

        if (!fk.ok) {
          // Unverifiable legacy aliases are excluded, never repaired by
          // guessing a canonical parent. The manifest records each one.
          entry.action = 'excluded-unverified';
          entry.reason = fk.reason;
          manifest.entries.push(entry);
          continue;
        }

        const key = naturalKey(model, row);
        if (key) {
          const conflict = (destRows[model] ?? []).find(
            (r) => r.id !== row.id && naturalKey(model, r) === key,
          );
          if (conflict) {
            entry.action = 'blocked-conflict';
            entry.reason = `destination has ${String(conflict.id)} for ${key}`;
            manifest.entries.push(entry);
            continue;
          }
        }

        const merged = { ...row };
        const preserved: string[] = [];
        if (existing) {
          for (const field of PRESERVE_FIELDS[model] ?? []) {
            if (field in existing) {
              merged[field] = existing[field];
              preserved.push(field);
            }
          }
        }
        entry.plannedChecksum = checksum(merged);
        entry.action = !existing ? 'create'
          : entry.plannedChecksum === entry.destinationChecksum ? 'unchanged'
          : 'update';
        if (preserved.length) entry.preservedFields = preserved;
        manifest.entries.push(entry);
        if (entry.action === 'create' || entry.action === 'update') plan[model]!.push(merged);
      }
    }

    for (const model of MODELS) {
      const total = (sourceRows[model] ?? []).length;
      const counts: Record<string, number> = { source: total };
      for (const action of ['create', 'update', 'unchanged', 'excluded-junk', 'excluded-duplicate', 'excluded-unverified', 'blocked-conflict'] as const) {
        counts[action] = manifest.entries.filter((e) => e.model === model && e.action === action).length;
      }
      counts.destinationBefore = (destRows[model] ?? []).length;
      manifest.counts[model] = counts;
    }

    fs.mkdirSync(path.dirname(args.manifestPath), { recursive: true });
    fs.writeFileSync(args.manifestPath, JSON.stringify(manifest, null, 2), { mode: 0o600 });

    const blocked = manifest.entries.filter((e) => e.action === 'blocked-conflict').length;
    const excluded = manifest.entries.filter((e) => e.action.startsWith('excluded')).length;
    const writes = manifest.entries.filter((e) => e.action === 'create' || e.action === 'update').length;
    const lines = [
      '# Neon staging sync — dry run',
      '',
      `Generated: ${manifest.generatedAt}`,
      '',
      `- Source: local ${src.host}/${src.db}`,
      `- Destination: Neon ${dest.host} (branch ${process.env.EXPECTED_STAGING_BRANCH_ID ?? 'unspecified'})`,
      `- Manifest: \`${path.relative(path.join(__dirname, '../../..'), args.manifestPath)}\``,
      `- Planned writes: **${writes}** (idempotent upserts only)`,
      `- Blocked conflicts: **${blocked}**`,
      `- Excluded unverified/junk/duplicate records: **${excluded}**`,
      `- Verified legacy alias remaps: **${manifest.aliasRemaps.length}**`,
      `- Auth/admin tables synchronized: **none**`,
      '',
      '| Model | Source | Create | Update | Unchanged | Blocked | Excluded | Dest before |',
      '| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |',
    ];
    for (const model of MODELS) {
      const c = manifest.counts[model];
      const blockedCount = c['blocked-conflict'] ?? 0;
      const excludedCount = (c['excluded-junk'] ?? 0) + (c['excluded-duplicate'] ?? 0) + (c['excluded-unverified'] ?? 0);
      lines.push(`| ${model} | ${c.source} | ${c.create} | ${c.update} | ${c.unchanged} | ${blockedCount} | ${excludedCount} | ${c.destinationBefore} |`);
    }
    lines.push('', 'Approval states are copied from the verified source only for new records. Existing destination approval fields are preserved and listed per entry in the manifest.', '');
    fs.writeFileSync(args.summaryPath, lines.join('\n'), { mode: 0o600 });

    console.log(`Dry run complete: ${writes} planned writes, ${blocked} blocked, manifest written.`);
    if (blocked > 0) {
      console.error('Blocked natural-key conflicts exist. Apply refused. Inspect the manifest.');
      process.exitCode = 1;
      return;
    }
    if (!args.apply) return;

    for (const model of APPLY_ORDER) {
      const rows = plan[model] ?? [];
      for (const row of rows) {
        await (target as any)[model].upsert({
          where: { id: String(row.id) },
          create: row,
          update: row,
        });
      }
      if (rows.length) console.log(`${model}: upserted ${rows.length}`);
    }
    console.log('APPLY COMPLETE — no deletes, resets, approvals or auth records.');
  } finally {
    await Promise.all([source.$disconnect(), target.$disconnect()]);
  }
}

main().catch((error: Error) => {
  console.error(`Staging sync failed: ${error.message}`);
  process.exitCode = 1;
});
