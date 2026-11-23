import assert from 'node:assert/strict';
import { test } from 'node:test';
import { randomBytes } from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import { graphql } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs, resolvers } from '../../index';

test('GraphQL character approval requires current authenticated rights verification', async () => {
  const url = new URL(process.env.CHARACTER_RIGHTS_TEST_DATABASE_URL ?? '');
  assert.match(url.hostname, /^(localhost|127\.0\.0\.1)$/);
  assert.match(url.pathname, /^\/genshinhub_test_character_rights_[a-z0-9]+$/);
  const prisma = new PrismaClient({ datasourceUrl: url.href });
  const previousSecret = process.env.ADMIN_JWT_SECRET;
  process.env.ADMIN_JWT_SECRET = randomBytes(32).toString('hex');
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const actor = 'fixture-operator';
  const admin = { prisma, isAdmin: true, adminActor: actor };
  const run = (source: string, variableValues: Record<string, unknown>, contextValue = admin) =>
    graphql({ schema, source, variableValues, contextValue });
  const upsert = 'mutation($input: CharacterTierRankingInput!) { upsertCharacterTierRanking(input:$input) { id updatedAt evidence approvalStatus } }';
  const approve = 'mutation($id:String!, $date:String, $hash:String) { approveCharacterTierRanking(id:$id, expectedUpdatedAt:$date, expectedChecksum:$hash) { approvalStatus approvedBy } }';
  const rights = 'mutation($id:String!, $date:String) { verifyCharacterTierRights(id:$id, verified:true, note:"Fixture rights", expectedUpdatedAt:$date) { updatedAt evidence } }';
  const reject = 'mutation($id:String!, $date:String, $hash:String) { rejectCharacterTierRanking(id:$id, reason:"Fixture rejection", expectedUpdatedAt:$date, expectedChecksum:$hash) { updatedAt } }';
  try {
    const [identity] = await prisma.$queryRaw<{ database: string }[]>`SELECT current_database() AS database`;
    assert.equal(identity.database, url.pathname.slice(1));
    const character = await prisma.character.findFirstOrThrow({ select: { id: true } });
    const input = {
      characterId: character.id, role: 'SUPPORT', constellation: 'C0', tier: 'S',
      gameVersion: 'RIGHTS-REGRESSION-' + randomBytes(6).toString('hex'), explanationVi: 'Fixture explanation.',
      sourceUrl: 'https://example.invalid/fixture', sourceName: 'Fixture', derivation: 'INDEPENDENT',
      evidence: { rubric: 'Fixture', primaryEvidence: ['Fixture'], reviewer: 'editor', verifiedAt: '2026-11-20' },
    };
    const forged = await run(upsert, { input: { ...input, evidence: {
      ...input.evidence, rightsVerified: true, rightsVerifiedBy: 'forged', rightsVerifiedAt: '2000-01-01', rightsProof: 'a'.repeat(64),
      auditLog: [{ action: 'RIGHTS_VERIFIED', actor: 'forged', at: '2000-01-01' }],
    } } });
    assert.equal(forged.errors, undefined, JSON.stringify(forged.errors));
    const draft = forged.data!.upsertCharacterTierRanking as any;
    assert.notEqual(draft.evidence.rightsVerified, true);
    assert.equal(new Date(draft.updatedAt).toISOString(), draft.updatedAt);
    assert.deepEqual(draft.evidence.auditLog.map((entry: any) => entry.actor), [actor]);
    const vars = { id: draft.id, date: draft.updatedAt, hash: draft.evidence.checksum };
    const expectError = (result: Awaited<ReturnType<typeof run>>, pattern: RegExp) => {
      assert.match(result.errors?.[0]?.message ?? '', pattern);
    };
    expectError(await run(approve, vars), /RIGHTS_NOT_VERIFIED/);
    // Simulate pending rows created before the input boundary was fixed.
    await prisma.characterTierRanking.update({ where: { id: draft.id }, data: { evidence: {
      ...draft.evidence, rightsVerified: true, rightsVerifiedBy: 'forged',
      auditLog: [...draft.evidence.auditLog, { action: 'RIGHTS_VERIFIED', actor: 'forged', at: '2000-01-01' }],
    } } });
    const legacy = await prisma.characterTierRanking.findUniqueOrThrow({ where: { id: draft.id } });
    vars.date = legacy.updatedAt.toISOString();
    expectError(await run(approve, vars), /RIGHTS_NOT_VERIFIED/);
    expectError(await run(rights, vars, { ...admin, isAdmin: false }), /Unauthorized/);
    const verified = await run(rights, vars);
    assert.equal(verified.errors, undefined, JSON.stringify(verified.errors));
    const current = verified.data!.verifyCharacterTierRights as any;
    assert.equal(current.evidence.rightsVerifiedBy, actor);
    assert.equal(current.evidence.rightsProof, undefined);
    assert.ok(Date.parse(current.evidence.rightsVerifiedAt) > Date.parse('2000-01-01'));
    assert.equal(current.evidence.auditLog.at(-1).actor, actor);
    expectError(await run(approve, vars), /CONCURRENT_MODIFICATION/);
    const fresh = { ...vars, date: current.updatedAt };
    expectError(await run(approve, { ...fresh, hash: '0'.repeat(64) }), /CHECKSUM_MISMATCH/);
    expectError(await run(approve, { id: draft.id }), /CONCURRENCY_TOKEN_REQUIRED/);

    const rejected = await run(reject, fresh);
    assert.equal(rejected.errors, undefined, JSON.stringify(rejected.errors));
    expectError(await run(approve, { ...fresh, date: (rejected.data!.rejectCharacterTierRanking as any).updatedAt }), /RANKING_NOT_PENDING/);

    const edited = await run(upsert, { input: {
      ...input, tier: 'A', resubmitReason: 'Fixture evidence changed',
      expectedUpdatedAt: (rejected.data!.rejectCharacterTierRanking as any).updatedAt,
    } });
    assert.equal(edited.errors, undefined, JSON.stringify(edited.errors));
    const revision = edited.data!.upsertCharacterTierRanking as any;
    assert.equal(revision.evidence.auditLog.length, current.evidence.auditLog.length + 2);
    const revisionVars = { id: revision.id, date: revision.updatedAt, hash: revision.evidence.checksum };
    expectError(await run(approve, revisionVars), /RIGHTS_NOT_VERIFIED/);
    const reverified = await run(rights, revisionVars);
    assert.equal(reverified.errors, undefined, JSON.stringify(reverified.errors));
    const result = await run(approve, { ...revisionVars, date: (reverified.data!.verifyCharacterTierRights as any).updatedAt });
    assert.equal(result.errors, undefined, JSON.stringify(result.errors));
    assert.deepEqual({ ...result.data!.approveCharacterTierRanking as object }, { approvalStatus: 'APPROVED', approvedBy: actor });
  } finally {
    if (previousSecret === undefined) delete process.env.ADMIN_JWT_SECRET;
    else process.env.ADMIN_JWT_SECRET = previousSecret;
    await prisma.$disconnect();
  }
});
