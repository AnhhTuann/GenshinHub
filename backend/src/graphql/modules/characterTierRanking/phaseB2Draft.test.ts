import 'dotenv/config';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { test } from 'node:test';
import { getIntrospectionQuery, graphql, buildSchema } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';
import { typeDefs, resolvers } from '../../index';
import { createCharacterTierRankingService } from './characterTierRanking.service';

const draftPath = path.resolve(
  __dirname,
  '../../../../../docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json'
);
const batch = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
const rankings = batch.rankings as any[];

const admin: any = { user: { isAdmin: true, id: 'phase-b2-validation' }, userId: 'phase-b2-validation' };
const nonAdmin: any = { user: { isAdmin: false } };

function toServiceInput(r: any) {
  return {
    characterId: r.characterId,
    role: r.role,
    tier: r.proposedTier,
    constellation: r.constellation,
    gameVersion: r.gameVersion,
    explanationVi: r.explanationVi,
    sourceUrl: r.sourceUrl,
    sourceName: r.sourceName,
    sourceId: r.sourceId,
    sourceLocale: r.sourceLocale,
    lastReviewedDate: r.lastReviewedDate,
    evidence: r.evidence,
    derivation: r.derivation,
  };
}

test('Phase B2 batch shape, scope and draft status', () => {
  assert.equal(batch.gameVersion, '7.2');
  assert.match(batch.batchId, /^phase-b2-independent-/);
  assert.match(batch.status, /CHUA DUOC ADMIN PHE DUYET/);
  assert.ok(rankings.length >= 10 && rankings.length <= 15);

  const required = [
    'characterId', 'characterName', 'role', 'constellation', 'proposedTier',
    'gameVersion', 'explanationVi', 'strengths', 'limitations', 'teamAssumptions',
    'evidence', 'derivation', 'approvalStatus', 'sourceUrl', 'sourceName',
  ];
  for (const r of rankings) {
    for (const key of required) assert.ok(r[key], `${r.characterId}/${r.role}/${r.constellation} missing ${key}`);
    assert.equal(r.derivation, 'INDEPENDENT');
    assert.equal(r.approvalStatus, 'PENDING_REVIEW');
    assert.equal(r.gameVersion, '7.2');
    assert.equal(typeof r.evidence.confidence, 'string');
    assert.ok(['HIGH', 'MEDIUM', 'LOW'].includes(r.evidence.confidence));
    assert.ok(!/genshin-builds/i.test(r.sourceName + r.sourceUrl), 'source must not be Genshin-Builds');
  }
});

test('Phase B2 enum values and unique ranking keys are valid', () => {
  const roles = new Set(['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
  const tiers = new Set(['SS', 'S', 'A', 'B', 'C', 'D']);
  const constellations = new Set(['C0', 'C1', 'C2', 'C3', 'C4', 'C5', 'C6']);
  const keys = new Set<string>();

  for (const r of rankings) {
    assert.ok(roles.has(r.role), `invalid role ${r.role}`);
    assert.ok(tiers.has(r.proposedTier), `invalid tier ${r.proposedTier}`);
    assert.ok(constellations.has(r.constellation), `invalid constellation ${r.constellation}`);
    const key = [r.characterId, r.role, r.constellation, r.gameVersion].join('|');
    assert.equal(keys.has(key), false, `duplicate key ${key}`);
    keys.add(key);
  }
  assert.equal(keys.size, rankings.length);

  // All three roles are actually covered, and C0/C6 are both represented.
  assert.deepEqual(
    [...new Set(rankings.map((r) => r.role))].sort(),
    ['MAIN_DPS', 'SUB_DPS', 'SUPPORT']
  );
  assert.ok(rankings.some((r) => r.constellation === 'C0'));
  assert.ok(rankings.some((r) => r.constellation === 'C6'));
});

test('Phase B2 explanations answer all five required questions in Vietnamese', () => {
  const markers = ['Đóng góp:', 'Đề xuất', 'Điều kiện:', 'Constellation:', 'Hạn chế:'];
  for (const r of rankings) {
    for (const marker of markers) {
      assert.ok(r.explanationVi.includes(marker), `${r.characterId} missing ${marker}`);
    }
    assert.ok(r.explanationVi.length >= 350, `${r.characterId} explanation too short`);
    assert.ok(/[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i.test(r.explanationVi));
    assert.ok(r.strengths.length >= 2 && r.limitations.length >= 2);
    assert.ok(r.teamAssumptions.length >= 2);
  }
});

test('Phase B2 evidence is complete and independently sourced', () => {
  for (const r of rankings) {
    const e = r.evidence;
    assert.ok(e.rubric.includes('GenshinHub Tier Rubric'));
    assert.ok(Array.isArray(e.primaryEvidence) && e.primaryEvidence.length >= 3);
    assert.ok(e.primaryEvidence.some((p: string) => p.includes('genshin-db')));
    assert.ok(e.reviewer.includes('GenshinHub Tier Editorial'));
    assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(e.verifiedAt));
    for (const key of [
      'rubricScores', 'energyRequirements', 'reactionCompatibility',
      'damageContribution', 'teamUtility', 'constellationEffects',
      'gameplayAssumptions', 'versionNote',
    ]) {
      assert.ok(e[key], `${r.characterId} missing evidence.${key}`);
    }
    assert.deepEqual(Object.keys(e.rubricScores).sort(), ['access', 'constellation', 'evidence', 'flex', 'kit']);
  }
});

test('Phase B2 proposed tiers match the published rubric arithmetic', () => {
  for (const r of rankings) {
    const s = r.evidence.rubricScores;
    const score = +(0.30 * s.kit + 0.25 * s.flex + 0.20 * s.evidence + 0.15 * s.constellation + 0.10 * s.access).toFixed(1);
    assert.equal(r.rubricScore, score);
    const expected = score >= 86 ? 'SS' : score >= 76 ? 'S' : score >= 66 ? 'A' : score >= 56 ? 'B' : score >= 46 ? 'C' : 'D';
    assert.equal(r.proposedTier, expected, `${r.characterId}/${r.role}/${r.constellation}`);
  }
});

test('Phase B2 character IDs exist in the development database (read-only)', async () => {
  const prisma = new PrismaClient();
  try {
    const ids = [...new Set(rankings.map((r) => r.characterId))];
    const rows = await prisma.character.findMany({ where: { id: { in: ids } }, select: { id: true } });
    assert.deepEqual(rows.map((r) => r.id).sort(), ids.sort());
    const count = await (prisma as any).characterTierRanking.count();
    assert.equal(count, 0, 'Phase B2 must not write ranking rows before Admin approval');
  } finally {
    await prisma.$disconnect();
  }
});

test('Phase B2 drafts pass the real service as PENDING_REVIEW and never auto-approve', async () => {
  const created: any[] = [];
  const prisma: any = {
    character: { findFirst: async () => ({ id: 'validated' }) },
    characterTierRanking: {
      findFirst: async () => null,
      create: async ({ data }: any) => {
        created.push(data);
        return { id: 'mock-' + created.length, ...data };
      },
      update: async () => { throw new Error('UNEXPECTED_UPDATE'); },
    },
  };
  const service = createCharacterTierRankingService(prisma);
  for (const r of rankings) {
    const saved = await service.upsert(toServiceInput(r), admin);
    assert.equal(saved.approvalStatus, 'PENDING_REVIEW');
    assert.equal(saved.derivation, 'INDEPENDENT');
    assert.equal(saved.approvedBy, null);
    assert.equal(saved.reviewedAt, null);
    assert.equal(saved.rejectionReason, null);
  }
  assert.equal(created.length, rankings.length);
});

test('Phase B2 draft is rejected for non-admin context', async () => {
  const prisma: any = {
    character: { findFirst: async () => ({ id: 'validated' }) },
    characterTierRanking: { findFirst: async () => null, create: async () => { throw new Error('UNEXPECTED_WRITE'); } },
  };
  const service = createCharacterTierRankingService(prisma);
  await assert.rejects(() => service.upsert(toServiceInput(rankings[0]), nonAdmin), /Unauthorized/);
});

test('Phase B2 GraphQL surface stays public-safe', async () => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const gql = await graphql({ schema, source: getIntrospectionQuery() });
  assert.equal(gql.errors, undefined, JSON.stringify(gql.errors));
  const introspection: any = gql.data;
  const query = introspection.__schema.types.find((t: any) => t.name === 'Query');
  const publicField = query.fields.find((f: any) => f.name === 'characterTierRankings');
  const publicArgs = publicField.args.map((a: any) => a.name);
  assert.deepEqual(publicArgs, ['characterId', 'role', 'tier', 'constellation', 'gameVersion', 'limit']);
  assert.equal(publicArgs.includes('approvalStatus'), false);
  assert.equal(publicArgs.includes('derivation'), false);

  const mutation = introspection.__schema.types.find((t: any) => t.name === 'Mutation');
  const names = mutation.fields.map((f: any) => f.name);
  for (const name of ['upsertCharacterTierRanking', 'approveCharacterTierRanking', 'rejectCharacterTierRanking']) {
    assert.ok(names.includes(name));
  }

  // SDL itself parses standalone for CI schema checks.
  const sdlOnly = buildSchema(`
    enum TierListRole { MAIN_DPS SUB_DPS SUPPORT }
    enum TierListTier { SS S A B C D }
    enum TierListConstellation { C0 C1 C2 C3 C4 C5 C6 }
    enum TierListApprovalStatus { PENDING_REVIEW NEEDS_REVIEW APPROVED REJECTED }
    enum TierListDerivation { INDEPENDENT SOURCE_DERIVED ADMIN_OVERRIDE }
    scalar JSON
    type Query { _ok: Boolean }
  `);
  assert.ok(sdlOnly.getQueryType());
});
