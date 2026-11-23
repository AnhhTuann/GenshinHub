import 'dotenv/config';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { print } from 'graphql';
import { createCharacterTierRankingService } from './characterTierRanking.service';
import { characterTierRankingTypeDefs } from './characterTierRanking.schema';
import { typeDefs } from '../../index';

const adminContext: any = { user: { isAdmin: true }, userId: 'admin-7' };
const publicContext: any = { user: { isAdmin: false } };

function makePrisma(state: any = {}) {
  const calls: any[] = [];
  const ranking = {
    findMany: async (args: any) => {
      calls.push({ op: 'findMany', args });
      return state.findMany ?? [];
    },
    findFirst: async (args: any) => {
      calls.push({ op: 'findFirst', args });
      return state.findFirst ?? null;
    },
    create: async (args: any) => {
      calls.push({ op: 'create', args });
      if (state.createError) throw state.createError;
      return { id: 'new-id', ...args.data };
    },
    updateMany: async (args: any) => {
      calls.push({ op: 'updateMany', args });
      state.findFirst = { ...state.findFirst, ...args.data };
      return { count: 1 };
    },
  };
  const character = {
    findFirst: async (args: any) => {
      calls.push({ op: 'character.findFirst', args });
      return state.character === undefined ? { id: args.where.id } : state.character;
    },
  };
  return { prisma: { characterTierRanking: ranking, character }, calls };
}

function baseInput(overrides: any = {}) {
  return {
    characterId: 'mitya',
    role: 'SUPPORT',
    tier: 'S',
    constellation: 'C6',
    gameVersion: '7.2',
    explanationVi: 'Đánh giá độc lập từ rubric và bằng chứng nội bộ.',
    sourceUrl: 'https://genshinhub.local/rubric/7.2',
    sourceName: 'GenshinHub independent rubric',
    derivation: 'SOURCE_DERIVED',
    ...overrides,
  };
}

const independentEvidence = {
  rubric: 'GenshinHub v7.2 rubric v1',
  primaryEvidence: ['genshin-db://characters/mitya', 'patch-notes://7.2'],
  reviewer: 'admin-7',
  verifiedAt: '2026-11-20',
};

test('Prisma schema contains the approved additive model, enums and unique key', () => {
  const schema = readFileSync(path.resolve(__dirname, '../../../../prisma/schema.prisma'), 'utf8').replace(/\s+/g, ' ');
  for (const fragment of [
    'enum TierListRole',
    'enum TierListTier',
    'enum TierListConstellation',
    'enum TierListApprovalStatus',
    'enum TierListDerivation',
    'model CharacterTierRanking',
    'tierRankings CharacterTierRanking[]',
    '@@unique([characterId, role, constellation, gameVersion])',
  ]) {
    assert.ok(schema.includes(fragment), `missing schema fragment: ${fragment}`);
  }
});

test('GraphQL surface is wired and public query does not accept review filters', () => {
  assert.ok(characterTierRankingTypeDefs.includes('type CharacterTierRanking'));
  const sdl = print(typeDefs);
  assert.ok(sdl.includes('characterTierRankings('));
  assert.ok(sdl.includes('adminCharacterTierRankings('));
  assert.ok(sdl.includes('approveCharacterTierRanking('));
  assert.ok(sdl.includes('enum TierListDerivation'));
});

test('public query hard-filters to approved independent rankings only', async () => {
  const { prisma, calls } = makePrisma();
  const service = createCharacterTierRankingService(prisma);
  await service.listPublic({
    characterId: 'mitya',
    role: 'SUPPORT',
    tier: 'S',
    constellation: 'C6',
    gameVersion: '7.2',
    limit: 999,
  });
  const call = calls.find(c => c.op === 'findMany');
  assert.ok(call);
  assert.deepEqual(call.args.where, {
    approvalStatus: 'APPROVED',
    derivation: 'INDEPENDENT',
    characterId: 'mitya',
    role: 'SUPPORT',
    tier: 'S',
    constellation: 'C6',
    gameVersion: '7.2',
  });
  assert.equal(call.args.take, 500);
  assert.equal(calls.some(c => c.op.startsWith('character.')), false);
});

test('public query never fabricates rows for unranked characters', async () => {
  const { prisma, calls } = makePrisma({ findMany: [] });
  const service = createCharacterTierRankingService(prisma);
  assert.deepEqual(await service.listPublic({ characterId: 'not-ranked' }), []);
  assert.equal(calls.filter(c => c.op === 'create').length, 0);
});

test('admin listings and all writes require admin context', async () => {
  const { prisma, calls } = makePrisma();
  const service = createCharacterTierRankingService(prisma);
  await assert.rejects(() => service.listAdmin({}, publicContext), /Unauthorized/);
  await assert.rejects(() => service.upsert(baseInput(), publicContext), /Unauthorized/);
  await assert.rejects(() => service.approve('rank-1', publicContext), /Unauthorized/);
  await assert.rejects(() => service.reject('rank-1', 'bad', publicContext), /Unauthorized/);
  assert.equal(calls.length, 0);
});

test('upsert creates a non-approved SOURCE_DERIVED draft', async () => {
  const { prisma, calls } = makePrisma();
  const service = createCharacterTierRankingService(prisma);
  const result = await service.upsert(baseInput(), adminContext);
  assert.equal(result.approvalStatus, 'PENDING_REVIEW');
  assert.equal(result.derivation, 'SOURCE_DERIVED');
  assert.equal(result.approvedBy, null);
  assert.equal(result.reviewedAt, null);
  const create = calls.find(c => c.op === 'create');
  assert.equal(create.args.data.approvalStatus, 'PENDING_REVIEW');
  assert.equal(create.args.data.approvedBy, null);
});

test('upsert rejects unsupported constellation for version 7.2', async () => {
  const { prisma } = makePrisma();
  const service = createCharacterTierRankingService(prisma);
  await assert.rejects(
    () => service.upsert(baseInput({ constellation: 'C3' }), adminContext),
    /UNSUPPORTED_CONSTELLATION/,
  );
});

test('upsert requires structured evidence for INDEPENDENT derivation', async () => {
  const { prisma } = makePrisma();
  const service = createCharacterTierRankingService(prisma);
  await assert.rejects(
    () => service.upsert(baseInput({ derivation: 'INDEPENDENT', evidence: undefined }), adminContext),
    /INDEPENDENT_EVIDENCE_REQUIRED/,
  );
  const result = await service.upsert(
    baseInput({ derivation: 'INDEPENDENT', evidence: independentEvidence }),
    adminContext,
  );
  assert.equal(result.derivation, 'INDEPENDENT');
  assert.equal(result.approvalStatus, 'PENDING_REVIEW');
});

test('upsert cannot relabel a SOURCE_DERIVED row as INDEPENDENT', async () => {
  const { prisma } = makePrisma({
    findFirst: {
      id: 'rank-1',
      approvalStatus: 'NEEDS_REVIEW',
      derivation: 'SOURCE_DERIVED',
    },
  });
  const service = createCharacterTierRankingService(prisma);
  await assert.rejects(
    () => service.upsert(
      baseInput({ derivation: 'INDEPENDENT', evidence: independentEvidence }),
      adminContext,
    ),
    /SOURCE_DERIVED_DERIVATION_IMMUTABLE/,
  );
});

test('research draft cannot overwrite an approved ranking', async () => {
  const { prisma } = makePrisma({
    findFirst: {
      id: 'rank-1',
      approvalStatus: 'APPROVED',
      derivation: 'INDEPENDENT',
    },
  });
  const service = createCharacterTierRankingService(prisma);
  await assert.rejects(
    () => service.upsert(baseInput(), adminContext),
    /APPROVED_RANKING_IMMUTABLE/,
  );
});

test('approval requires independent pending content and explicit concurrency and checksum inputs', async () => {
  const source = makePrisma({ findFirst: { id: 'rank-1', derivation: 'SOURCE_DERIVED' } });
  await assert.rejects(
    () => createCharacterTierRankingService(source.prisma).approve('rank-1', adminContext),
    /SOURCE_DERIVED_CANNOT_BE_APPROVED/,
  );

  const updatedAt = new Date('2026-11-20T01:00:00Z');
  const independent = makePrisma({ findFirst: {
    id: 'rank-2', derivation: 'INDEPENDENT', approvalStatus: 'PENDING_REVIEW', updatedAt,
  } });
  const service = createCharacterTierRankingService(independent.prisma);
  await assert.rejects(() => service.approve('rank-2', adminContext), /CONCURRENCY_TOKEN_REQUIRED/);
  await assert.rejects(() => service.approve('rank-2', adminContext, updatedAt.toISOString()), /APPROVAL_CHECKSUM_REQUIRED/);
  assert.equal(independent.calls.some(call => call.op === 'updateMany'), false);
});

test('reject stores reason and acting admin, not a request-supplied actor', async () => {
  const { prisma, calls } = makePrisma({ findFirst: { id: 'rank-3', derivation: 'INDEPENDENT', approvalStatus: 'PENDING_REVIEW', updatedAt: new Date('2026-11-20T01:00:00Z') } });
  const service = createCharacterTierRankingService(prisma);
  const result = await service.reject('rank-3', 'Evidence insufficient', adminContext);
  assert.equal(result.approvalStatus, 'REJECTED');
  assert.equal(result.rejectionReason, 'Evidence insufficient');
  assert.equal(result.approvedBy, 'admin-7');
  const update = calls.find(c => c.op === 'updateMany');
  assert.equal(update.args.data.approvedBy, 'admin-7');
});

test('unique-key race is reported as a clear duplicate error', async () => {
  const { prisma } = makePrisma({ createError: { code: 'P2002', meta: { target: ['key'] } } });
  const service = createCharacterTierRankingService(prisma);
  await assert.rejects(() => service.upsert(baseInput(), adminContext), /DUPLICATE_RANKING_KEY/);
});
