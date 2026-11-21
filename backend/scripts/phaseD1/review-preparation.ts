/**
 * Phase D1 — review preparation / guarded draft import.
 *
 * DEFAULT = DRY RUN. No write occurs unless `--apply` AND ALLOW_TEST_DB_IMPORT=1
 * are both supplied, and `current_database()` is confirmed to be the isolated
 * test database. This script ONLY prepares PENDING_REVIEW drafts from frozen
 * dossiers. It never approves, never rejects, never verifies publish rights and
 * never writes to development/production. All final decisions happen in the real
 * Admin UI through the guarded GraphQL mutations.
 *
 * Run:
 *   npx ts-node --transpile-only scripts/phaseD1/review-preparation.ts
 *   ALLOW_TEST_DB_IMPORT=1 npx ts-node --transpile-only scripts/phaseD1/review-preparation.ts --apply
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { PrismaClient } from '@prisma/client';
import { createCharacterTierRankingService } from '../../src/graphql/modules/characterTierRanking/characterTierRanking.service';
import { createWeaponTierRankingService } from '../../src/graphql/modules/weaponTierRanking/weaponTierRanking.service';

const ROOT = path.resolve(__dirname, '..', '..', '..');
const TEST_DB = 'genshinhub_d1_tier_test';
const TEST_URL = `postgresql://postgres:${process.env.DEV_DB_PASSWORD ?? '<redacted>'}@127.0.0.1:5434/genshinhub_d1_tier_test`;
const SERVICE_ACTOR = 'd1-review-preparation'; // server-side preparation identity; never a fake actor
const ADMIN_CONTEXT: any = { isAdmin: true, user: { isAdmin: true }, adminActor: SERVICE_ACTOR };

const readJson = (relative: string) => JSON.parse(readFileSync(path.join(ROOT, 'docs', relative), 'utf8'));
const isHexSha = (value: unknown): value is string => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const has = (v: unknown) => typeof v === 'string' && v.trim().length > 0;

type CharacterInput = Record<string, any>;
type WeaponInput = Record<string, any>;
type Plan = {
  recordId: string;
  kind: 'CHARACTER' | 'WEAPON' | 'CHARACTER_EXCLUDED' | 'WEAPON_BLOCKED';
  status: 'PREPARE' | 'SKIP';
  reason: string;
  key: string;
  tier: string;
  role: string;
  context: string;
  sha: string | null;
  input?: CharacterInput | WeaponInput;
};

function buildCharacterPlan(): Plan[] {
  const sheet = readJson('tierlist-v7.2-audit/PHASE_D_CHARACTER_APPROVAL_SHEET.json');
  const drafts = readJson('tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json');
  const byKey = new Map<string, any>(drafts.rankings.map((d: any) => [`${d.characterId}|${d.role}|${d.constellation}`, d]));

  const ready: Plan[] = sheet.records.map((record: any) => {
    const draft = byKey.get(record.recordKey);
    const base = {
      recordId: record.recordId,
      kind: 'CHARACTER' as const,
      key: record.recordKey,
      tier: record.proposedTier,
      role: record.role,
      context: record.constellation,
      sha: record.recordSha256,
    };
    if (record.category !== 'READY_FOR_ADMIN_REVIEW') {
      return { ...base, status: 'SKIP' as const, reason: `CATEGORY_${record.category}` };
    }
    if (!draft) return { ...base, status: 'SKIP' as const, reason: 'DRAFT_NOT_FOUND' };
    if (!isHexSha(record.recordSha256)) return { ...base, status: 'SKIP' as const, reason: 'INVALID_CHECKSUM' };
    if (draft.derivation !== 'INDEPENDENT') return { ...base, status: 'SKIP' as const, reason: 'NOT_INDEPENDENT' };
    if (!has(draft.explanationVi) || !draft.evidence?.rubric || !Array.isArray(draft.evidence?.primaryEvidence) || draft.evidence.primaryEvidence.length === 0) {
      return { ...base, status: 'SKIP' as const, reason: 'EVIDENCE_INCOMPLETE' };
    }
    const decision = record.decision || {};
    if (decision.adminDecision && decision.adminDecision !== 'PENDING') {
      return { ...base, status: 'SKIP' as const, reason: `DECISION_${decision.adminDecision}` };
    }

    const input: CharacterInput = {
      characterId: draft.characterId,
      role: draft.role,
      tier: draft.proposedTier,
      constellation: draft.constellation,
      gameVersion: record.gameVersion,
      explanationVi: draft.explanationVi,
      sourceUrl: draft.sourceUrl,
      sourceName: draft.sourceName,
      sourceId: draft.sourceId,
      sourceLocale: draft.sourceLocale || 'vi',
      derivation: 'INDEPENDENT',
      lastReviewedDate: draft.lastReviewedDate,
      evidence: {
        ...draft.evidence,
        strengths: draft.strengths,
        limitations: draft.limitations,
        gameplayAssumptions: draft.teamAssumptions,
        b25Review: draft.b25Review,
        recordSha256: record.recordSha256,
        rightsVerified: false,
        rightsVerifiedBy: null,
      },
    };
    return { ...base, status: 'PREPARE' as const, reason: 'READY_FOR_ADMIN_REVIEW', input };
  });

  const excluded: Plan[] = sheet.excludedFromSheet.map((row: any) => ({
    recordId: `EXCLUDED-${row.recordKey}`,
    kind: 'CHARACTER_EXCLUDED' as const,
    status: 'SKIP' as const,
    reason: `EXCLUDED_${row.category}`,
    key: row.recordKey,
    tier: '',
    role: row.recordKey.split('|')[1] || '',
    context: row.recordKey.split('|')[2] || '',
    sha: null,
  }));
  return [...ready, ...excluded];
}

function buildWeaponPlan(): Plan[] {
  const sheet = readJson('weapon-tier-independent/PHASE_D_WEAPON_APPROVAL_SHEET.json');
  const candidates = readJson('weapon-tier-independent/independent-candidates.json');
  const byId = new Map<string, any>(candidates.records.map((c: any) => [c.id, c]));
  const blockedIds = new Set<string>(sheet.blocked.map((b: any) => b.candidateId));

  const rows: Plan[] = sheet.records.map((record: any) => {
    const detail = byId.get(record.candidateId);
    const base = {
      recordId: record.candidateId,
      kind: 'WEAPON' as const,
      key: `${record.weaponId}|${record.role}|${detail?.versionKey || '7.2'}|${record.refinement}`,
      tier: record.proposedTier,
      role: record.role,
      context: record.refinement,
      sha: record.recordSha256,
    };
    if (blockedIds.has(record.candidateId) || record.reviewGroup === 'B') {
      return { ...base, status: 'SKIP' as const, reason: 'GROUP_B_BLOCKED_NEEDS_MORE_EVIDENCE' };
    }
    if (record.reviewStatus !== 'READY_FOR_ADMIN_REVIEW') {
      return { ...base, status: 'SKIP' as const, reason: `REVIEW_STATUS_${record.reviewStatus}` };
    }
    if (!detail) return { ...base, status: 'SKIP' as const, reason: 'DRAFT_NOT_FOUND' };
    if (!isHexSha(record.recordSha256)) return { ...base, status: 'SKIP' as const, reason: 'INVALID_CHECKSUM' };
    if (detail.derivation !== 'INDEPENDENT') return { ...base, status: 'SKIP' as const, reason: 'NOT_INDEPENDENT' };
    if (!has(detail.explanationVi) || !detail.evidence?.rubric || !Array.isArray(detail.evidence?.primaryEvidence) || detail.evidence.primaryEvidence.length === 0) {
      return { ...base, status: 'SKIP' as const, reason: 'EVIDENCE_INCOMPLETE' };
    }
    if (record.tierChanged && !has(record.tierJustification)) return { ...base, status: 'SKIP' as const, reason: 'TIER_CHANGE_JUSTIFICATION_MISSING' };
    const decision = record.decision || {};
    if (decision.adminDecision && decision.adminDecision !== 'PENDING') {
      return { ...base, status: 'SKIP' as const, reason: `DECISION_${decision.adminDecision}` };
    }

    const input: WeaponInput = {
      weaponId: detail.weaponId,
      weaponType: detail.dbWeaponType || record.weaponType,
      role: detail.role,
      tier: record.proposedTier,
      refinementContext: detail.refinementContext,
      refinementLevel: detail.refinementLevel,
      versionKey: detail.versionKey,
      gameVersion: detail.gameVersion,
      gameVersionStatus: detail.gameVersionStatus,
      explanationVi: detail.explanationVi,
      evidence: {
        ...detail.evidence,
        gameplayConditions: detail.gameplayConditions,
        sensitivity: detail.sensitivity,
        tierJustification: record.tierJustification,
        exactGameplayAssumptions: record.exactGameplayAssumptions,
        recordSha256: record.recordSha256,
      },
      rubricVersion: detail.rubricVersion,
      confidence: detail.confidence,
      reviewNotes: `D1 review preparation · ${record.candidateId} · not approved`,
      sourceName: detail.sourceName,
      sourceUrl: detail.sourceUrl,
      sourceId: record.candidateId,
      sourceLocale: detail.sourceLocale || 'vi',
      sourceChecksum: record.recordSha256,
      derivation: 'INDEPENDENT',
      // publishRightsVerified is intentionally omitted. The server ignores any
      // client value; only verifyWeaponTierRights may set it.
    };
    return { ...base, status: 'PREPARE' as const, reason: 'READY_FOR_ADMIN_REVIEW', input };
  });

  const blocked = sheet.blocked.map((b: any) => ({
    recordId: `BLOCKED-${b.candidateId}`,
    kind: 'WEAPON_BLOCKED' as const,
    status: 'SKIP' as const,
    reason: `BLOCKED_${b.reason}`,
    key: b.candidateId,
    tier: '',
    role: '',
    context: '',
    sha: null,
  }));
  return [...rows, ...blocked];
}

async function apply(plan: Plan[], prisma: PrismaClient) {
  const current = await prisma.$queryRaw<{ current_database: string }[]>`select current_database()`;
  assert.equal(current[0].current_database, TEST_DB, 'REFUSING TO WRITE OUTSIDE ISOLATED TEST DB');
  const migrations = await prisma.$queryRaw<{ migration_name: string }[]>`select migration_name from "_prisma_migrations" order by migration_name`;
  assert.equal(migrations.length, 4, 'UNEXPECTED_MIGRATION_COUNT');

  const charService = createCharacterTierRankingService(prisma);
  const weaponService = createWeaponTierRankingService(prisma);
  const written: string[] = [];
  for (const item of plan.filter((p) => p.status === 'PREPARE')) {
    if (item.kind === 'CHARACTER') {
      const row = await charService.upsert(item.input, ADMIN_CONTEXT);
      assert.equal(row.approvalStatus, 'PENDING_REVIEW');
      assert.equal(row.approvedBy, null);
      written.push(row.id);
    } else if (item.kind === 'WEAPON') {
      const row = await weaponService.upsert(item.input, ADMIN_CONTEXT);
      assert.equal(row.reviewStatus, 'PENDING_REVIEW');
      assert.equal(row.publishRightsVerified, false);
      written.push(row.id);
    }
  }
  return written;
}

async function main() {
  const applyMode = process.argv.includes('--apply');
  if (applyMode && process.env.ALLOW_TEST_DB_IMPORT !== '1') {
    throw new Error('APPLY_REQUIRES_ALLOW_TEST_DB_IMPORT');
  }
  const plan = [...buildCharacterPlan(), ...buildWeaponPlan()];
  const prepare = plan.filter((p) => p.status === 'PREPARE');
  const skipped = plan.filter((p) => p.status === 'SKIP');
  const summary: Record<string, unknown> = {
    mode: applyMode ? 'APPLY_TEST_DB_ONLY' : 'DRY_RUN',
    targetDatabase: applyMode ? TEST_DB : 'none (dry run)',
    authorization: 'preparation only; no approval, no rights verification, no development writes',
    counts: {
      total: plan.length,
      prepare: prepare.length,
      skipped: skipped.length,
      characterPrepare: prepare.filter((p) => p.kind === 'CHARACTER').length,
      weaponPrepare: prepare.filter((p) => p.kind === 'WEAPON').length,
      characterExcluded: skipped.filter((p) => p.kind === 'CHARACTER_EXCLUDED').length,
      weaponBlocked: skipped.filter((p) => p.kind === 'WEAPON_BLOCKED').length,
    },
    plannedRows: prepare.map((p) => ({ recordId: p.recordId, key: p.key, tier: p.tier, role: p.role, context: p.context, sha: p.sha })),
    skippedRows: skipped.map((p) => ({ recordId: p.recordId, reason: p.reason })),
  };

  if (!applyMode) {
    console.log(JSON.stringify(summary, null, 2));
    return;
  }

  const prisma = new PrismaClient({ datasources: { db: { url: TEST_URL } } });
  try {
    const written = await apply(plan, prisma);
    summary.writtenCount = written.length;
    summary.writtenIds = written;
  } finally {
    await prisma.$disconnect();
  }
  console.log(JSON.stringify(summary, null, 2));
}

main().catch((error) => {
  console.error('D1_REVIEW_PREPARATION_FAILED', error);
  process.exitCode = 1;
});
