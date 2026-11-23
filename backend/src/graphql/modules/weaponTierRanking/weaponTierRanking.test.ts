import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createWeaponTierRankingService } from './weaponTierRanking.service';

const adminContext: any = { user: { isAdmin: true, id: 'admin-7' } };
const publicContext: any = { user: { isAdmin: false } };

function makePrisma(state: any = {}) {
  const calls: any[] = [];
  const ranks = {
    findMany: async (args: any) => { calls.push({ op: 'ranks.findMany', args }); return state.findMany ?? []; },
    findFirst: async (args: any) => { calls.push({ op: 'ranks.findFirst', args }); return state.findFirst ?? null; },
    create: async (args: any) => {
      calls.push({ op: 'ranks.create', args });
      if (state.createError) throw state.createError;
      return { id: 'rank-new', ...args.data };
    },
    updateMany: async (args: any) => {
      calls.push({ op: 'ranks.updateMany', args });
      if (state.findFirst && state.updateCount === undefined) {
        state.findFirst = { ...state.findFirst, ...args.data };
      }
      return { count: state.updateCount === undefined ? 1 : state.updateCount };
    },
  };
  const weapon = {
    findFirst: async (args: any) => {
      calls.push({ op: 'weapon.findFirst', args });
      return state.weapon === undefined ? { id: args.where.id, type: 'Sword' } : state.weapon;
    },
  };
  const audit = {
    create: async (args: any) => { calls.push({ op: 'audit.create', args }); return { id: 'audit-new', ...args.data }; },
    findMany: async (args: any) => { calls.push({ op: 'audit.findMany', args }); return state.audit ?? []; },
  };
  return { prisma: { weaponTierRank: ranks, weapon, weaponTierAudit: audit }, calls };
}

const evidence = {
  rubric: 'GenshinHub weapon rubric v1',
  primaryEvidence: ['genshin-db://weapons/11401', 'patch-notes://7.2'],
  reviewer: 'admin-7',
  verifiedAt: '2026-11-20',
};

function baseInput(overrides: any = {}) {
  return {
    weaponId: '11401',
    weaponType: 'Sword',
    role: 'SUPPORT',
    tier: 'SS',
    refinementContext: 'UNSPECIFIED',
    versionKey: '7.2',
    gameVersion: '7.2',
    gameVersionStatus: 'VERIFIED',
    explanationVi: 'Đánh giá độc lập theo rubric của GenshinHub, có bằng chứng và giả định rõ ràng.',
    evidence,
    rubricVersion: 'v1',
    confidence: 'HIGH',
    sourceName: 'GenshinHub independent rubric',
    derivation: 'INDEPENDENT',
    publishRightsVerified: true,
    ...overrides,
  };
}

test('public query hard-filters to approved independent publishable rows only', async () => {
  const { prisma, calls } = makePrisma();
  await createWeaponTierRankingService(prisma).listPublic({
    role: 'SUPPORT', tier: 'SS', gameVersion: '7.2', limit: 999, derivation: 'SOURCE_DERIVED',
    reviewStatus: 'APPROVED',
  });
  const call = calls.find(c => c.op === 'ranks.findMany');
  assert.deepEqual(call.args.where, {
    reviewStatus: 'APPROVED',
    derivation: 'INDEPENDENT',
    publishRightsVerified: true,
    role: 'SUPPORT',
    tier: 'SS',
    gameVersion: '7.2',
  });
  assert.equal(call.args.take, 500);
});

test('public query never fabricates rows for an unranked weapon', async () => {
  const { prisma, calls } = makePrisma({ findMany: [] });
  const service = createWeaponTierRankingService(prisma);
  assert.deepEqual(await service.listForWeapon('99999'), []);
  assert.equal(calls.some(c => c.op === 'ranks.create'), false);
});

test('admin listing, audit log and all writes require admin', async () => {
  const { prisma, calls } = makePrisma();
  const service = createWeaponTierRankingService(prisma);
  await assert.rejects(() => service.listAdmin({}, publicContext), /Unauthorized/);
  await assert.rejects(() => service.listAuditLog('r1', publicContext), /Unauthorized/);
  await assert.rejects(() => service.upsert(baseInput(), publicContext), /Unauthorized/);
  await assert.rejects(() => service.approve('r1', publicContext), /Unauthorized/);
  await assert.rejects(() => service.reject('r1', 'bad', publicContext), /Unauthorized/);
  assert.equal(calls.length, 0);
});

test('validation rejects invalid role, tier, refinement and version claims', async () => {
  const { prisma } = makePrisma();
  const service = createWeaponTierRankingService(prisma);
  await assert.rejects(() => service.upsert(baseInput({ role: 'TANK' }), adminContext), /INVALID_ROLE/);
  await assert.rejects(() => service.upsert(baseInput({ tier: 'Z' }), adminContext), /INVALID_TIER/);
  await assert.rejects(() => service.upsert(baseInput({ refinementContext: 'R9' }), adminContext), /INVALID_REFINEMENT_CONTEXT/);
  await assert.rejects(() => service.upsert(baseInput({ refinementContext: 'R5', refinementLevel: 4 }), adminContext), /REFINEMENT_LEVEL_MISMATCH/);
  await assert.rejects(() => service.upsert(baseInput({ refinementLevel: 5 }), adminContext), /REFINEMENT_LEVEL_NOT_ALLOWED/);
  await assert.rejects(() => service.upsert(baseInput({ gameVersionStatus: 'SOURCE_MISSING', gameVersion: '7.2' }), adminContext), /SOURCE_MISSING_VERSION_CONFLICT/);
  await assert.rejects(() => service.upsert(baseInput({ gameVersionStatus: 'SOURCE_MISSING', versionKey: '7.2', gameVersion: null }), adminContext), /SOURCE_MISSING_VERSION_KEY_CONFLICT/);
  await assert.rejects(() => service.upsert(baseInput({ gameVersion: null }), adminContext), /VERIFIED_VERSION_REQUIRED/);
  await assert.rejects(() => service.upsert(baseInput({ confidence: 'EXTREME' }), adminContext), /INVALID_CONFIDENCE/);
});

test('SOURCE_MISSING rows can be stored without being promoted to verified', async () => {
  const { prisma, calls } = makePrisma();
  const service = createWeaponTierRankingService(prisma);
  const sourceRow = baseInput({
    derivation: 'SOURCE_DERIVED', gameVersionStatus: 'SOURCE_MISSING', versionKey: 'UNSPECIFIED',
    gameVersion: null, explanationVi: null, evidence: null, publishRightsVerified: false,
    sourceUrl: 'https://example.invalid/research', tier: 'C',
  });
  const result = await service.upsert(sourceRow, adminContext);
  const create = calls.find(c => c.op === 'ranks.create');
  assert.equal(create.args.data.gameVersionStatus, 'SOURCE_MISSING');
  assert.equal(create.args.data.gameVersion, null);
  assert.equal(create.args.data.versionKey, 'UNSPECIFIED');
  assert.equal(create.args.data.reviewStatus, 'NEEDS_REVIEW');
  assert.equal(result.approvalStatus === undefined, true);
});

test('independent derivation requires explanation and structured evidence', async () => {
  const { prisma } = makePrisma();
  const service = createWeaponTierRankingService(prisma);
  await assert.rejects(() => service.upsert(baseInput({ explanationVi: null }), adminContext), /EXPLANATION_REQUIRED/);
  await assert.rejects(() => service.upsert(baseInput({ evidence: null }), adminContext), /INDEPENDENT_EVIDENCE_REQUIRED/);
  await assert.rejects(() => service.upsert(baseInput({ evidence: { rubric: 'v1' } }), adminContext), /INDEPENDENT_EVIDENCE_REQUIRED/);
});

test('source-derived derivation requires a source URL', async () => {
  const { prisma } = makePrisma();
  await assert.rejects(
    () => createWeaponTierRankingService(prisma).upsert(baseInput({ derivation: 'SOURCE_DERIVED', sourceUrl: null }), adminContext),
    /SOURCE_URL_REQUIRED/,
  );
});

test('upsert creates a non-approved independent draft with an audit entry', async () => {
  const { prisma, calls } = makePrisma();
  const result = await createWeaponTierRankingService(prisma).upsert(baseInput(), adminContext);
  assert.equal(result.reviewStatus, 'PENDING_REVIEW');
  assert.equal(result.derivation, 'INDEPENDENT');
  assert.equal(result.approvedBy, null);
  assert.equal(result.reviewedAt, null);
  const create = calls.find(c => c.op === 'ranks.create');
  assert.equal(create.args.data.reviewStatus, 'PENDING_REVIEW');
  assert.equal(create.args.data.approvedBy, null);
  const audit = calls.find(c => c.op === 'audit.create');
  assert.equal(audit.args.data.action, 'CREATED');
  assert.equal(audit.args.data.actor, 'admin-7');
});

test('weapon must exist and its DB type must match the input type', async () => {
  const missing = makePrisma({ weapon: null });
  await assert.rejects(
    () => createWeaponTierRankingService(missing.prisma).upsert(baseInput(), adminContext),
    /WEAPON_NOT_FOUND/,
  );
  const wrong = makePrisma({ weapon: { id: '11401', type: 'Bow' } });
  await assert.rejects(
    () => createWeaponTierRankingService(wrong.prisma).upsert(baseInput(), adminContext),
    /WEAPON_TYPE_MISMATCH/,
  );
});

test('research row cannot be relabelled as independent or overwrite an approved ranking', async () => {
  const derived = makePrisma({ findFirst: { id: 'r1', derivation: 'SOURCE_DERIVED', reviewStatus: 'NEEDS_REVIEW' } });
  await assert.rejects(
    () => createWeaponTierRankingService(derived.prisma).upsert(baseInput(), adminContext),
    /SOURCE_DERIVED_DERIVATION_IMMUTABLE/,
  );
  const approved = makePrisma({ findFirst: { id: 'r1', derivation: 'INDEPENDENT', reviewStatus: 'APPROVED' } });
  await assert.rejects(
    () => createWeaponTierRankingService(approved.prisma).upsert(baseInput(), adminContext),
    /APPROVED_RANKING_IMMUTABLE/,
  );
});

test('stale concurrency token blocks an update', async () => {
  const state = makePrisma({
    findFirst: { id: 'r1', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', updatedAt: '2026-11-20T01:00:00.000Z' },
  });
  await assert.rejects(
    () => createWeaponTierRankingService(state.prisma).upsert(baseInput({ expectedUpdatedAt: '2026-11-19T01:00:00.000Z' }), adminContext),
    /CONCURRENT_MODIFICATION/,
  );
});

test('duplicate unique key race is reported clearly', async () => {
  const { prisma } = makePrisma({ createError: { code: 'P2002', meta: { target: ['key'] } } });
  await assert.rejects(
    () => createWeaponTierRankingService(prisma).upsert(baseInput(), adminContext),
    /DUPLICATE_RANKING_KEY/,
  );
});

test('approval is restricted to independent, explained, rights-verified rows and logs the admin', async () => {
  const derived = makePrisma({ findFirst: { id: 'r1', derivation: 'SOURCE_DERIVED', reviewStatus: 'NEEDS_REVIEW', updatedAt: '2026-11-20T01:00:00.000Z' } });
  await assert.rejects(
    () => createWeaponTierRankingService(derived.prisma).approve('r1', adminContext),
    /NON_INDEPENDENT_CANNOT_BE_APPROVED/,
  );
  const noRights = makePrisma({ findFirst: { id: 'r2', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', explanationVi: 'x', publishRightsVerified: false, updatedAt: '2026-11-20T01:00:00.000Z' } });
  await assert.rejects(
    () => createWeaponTierRankingService(noRights.prisma).approve('r2', adminContext),
    /PUBLISH_RIGHTS_NOT_VERIFIED/,
  );

  const ok = makePrisma({ findFirst: { id: 'r3', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', explanationVi: 'x', publishRightsVerified: true, updatedAt: '2026-11-20T01:00:00.000Z' } });
  const result = await createWeaponTierRankingService(ok.prisma).approve('r3', adminContext);
  assert.equal(result.reviewStatus, 'APPROVED');
  assert.equal(result.approvedBy, 'admin-7');
  const update = ok.calls.find(c => c.op === 'ranks.updateMany');
  assert.equal(update.args.data.reviewStatus, 'APPROVED');
  assert.equal(update.args.where.reviewStatus, 'PENDING_REVIEW');
  assert.equal(update.args.data.approvedBy, 'admin-7');
  const audit = ok.calls.find(c => c.op === 'audit.create');
  assert.equal(audit.args.data.action, 'APPROVED');
  assert.equal(audit.args.data.actor, 'admin-7');
});

test('approval also refuses unexplained rows and already approved rows', async () => {
  const unexplained = makePrisma({ findFirst: { id: 'r1', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', explanationVi: null, publishRightsVerified: true, updatedAt: '2026-11-20T01:00:00.000Z' } });
  await assert.rejects(
    () => createWeaponTierRankingService(unexplained.prisma).approve('r1', adminContext),
    /EXPLANATION_REQUIRED_FOR_APPROVAL/,
  );
  const already = makePrisma({ findFirst: { id: 'r2', reviewStatus: 'APPROVED', updatedAt: '2026-11-20T01:00:00.000Z' } });
  await assert.rejects(
    () => createWeaponTierRankingService(already.prisma).approve('r2', adminContext),
    /ALREADY_APPROVED/,
  );
});

test('CAS failure during approval is surfaced as concurrent modification', async () => {
  const state = makePrisma({
    findFirst: { id: 'r1', derivation: 'INDEPENDENT', reviewStatus: 'PENDING_REVIEW', explanationVi: 'x', publishRightsVerified: true, updatedAt: '2026-11-20T01:00:00.000Z' },
    updateCount: 0,
  });
  await assert.rejects(
    () => createWeaponTierRankingService(state.prisma).approve('r1', adminContext),
    /CONCURRENT_MODIFICATION/,
  );
  assert.equal(state.calls.some(c => c.op === 'audit.create'), false);
});

test('reject records reason and acting admin, and cannot rewrite an approved ranking', async () => {
  const state = makePrisma({ findFirst: { id: 'r1', reviewStatus: 'PENDING_REVIEW', updatedAt: '2026-11-20T01:00:00.000Z' } });
  await assert.rejects(
    () => createWeaponTierRankingService(state.prisma).reject('r1', '', adminContext),
    /REJECTION_REASON_REQUIRED/,
  );
  const result = await createWeaponTierRankingService(state.prisma).reject('r1', 'Evidence insufficient', adminContext);
  assert.equal(result.reviewStatus, 'REJECTED');
  assert.equal(result.rejectionReason, 'Evidence insufficient');
  const update = state.calls.find(c => c.op === 'ranks.updateMany');
  assert.equal(update.args.data.approvedBy, 'admin-7');

  const approved = makePrisma({ findFirst: { id: 'r2', reviewStatus: 'APPROVED', updatedAt: '2026-11-20T01:00:00.000Z' } });
  await assert.rejects(
    () => createWeaponTierRankingService(approved.prisma).reject('r2', 'late', adminContext),
    /APPROVED_RANKING_IMMUTABLE/,
  );
});

test('audit log is admin-only and passes the ranking id through', async () => {
  const { prisma, calls } = makePrisma();
  const service = createWeaponTierRankingService(prisma);
  await service.listAuditLog('r1', adminContext, 999);
  const call = calls.find(c => c.op === 'audit.findMany');
  assert.deepEqual(call.args.where, { rankingId: 'r1' });
  assert.equal(call.args.take, 200);
});
