import assert from 'node:assert/strict';
import { test } from 'node:test';
import { randomBytes } from 'node:crypto';
import { buildVersionedReviewPreview } from '../phaseD3/versionedReview';
import { PrismaClient } from '@prisma/client';
import { graphql } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs, resolvers } from '../../index';
import { buildD2Store } from './weaponTierReview.sources';

test('isolated PostgreSQL only publishes the exact revised decision with atomic audits', async () => {
  const url = new URL(process.env.WEAPON_PUBLICATION_TEST_DATABASE_URL ?? '');
  assert.match(url.hostname, /^(127\.0\.0\.1|localhost)$/);
  assert.match(url.pathname, /^\/genshinhub_test_weapon_publication_[a-z0-9]+$/);
  const prisma = new PrismaClient({ datasourceUrl: url.href });
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const ctx = { prisma, isAdmin: true, adminActor: 'publication-fixture-operator' };
  const store = buildD2Store();
  const call = (source: string, variableValues: Record<string, unknown> = {}, contextValue: any = ctx) =>
    graphql({ schema, source, variableValues, contextValue });
  const binding = '$candidateId:String!, $batchSha256:String!, $recordSha256:String!, $expectedVersion:Int!';
  const args = 'candidateId:$candidateId,batchSha256:$batchSha256,recordSha256:$recordSha256,expectedVersion:$expectedVersion';
  const mutation = (field: string, extra: string, selection: string) =>
    `mutation(${binding}) { ${field}(${args},sourceVersion:D2_REVISED${extra}) { ${selection} } }`;
  const publish = mutation('adminPublishWeaponTierReview', '', 'id tier sourceChecksum reviewStatus publishRightsVerified gameVersion');
  const rights = mutation('adminVerifyWeaponTierReviewRights',
    ',independentRanking:true,originalExplanation:true,noGenshinBuildsEditorialCopy:true,gameFactsAttributionCorrect:true,evidenceValid:true,note:"Isolated fixture rights"', 'version');
  const decide = (decision: 'APPROVE' | 'REJECT') => mutation('adminDecideWeaponTierReview',
    `,decision:${decision},reason:"Isolated fixture decision",evidenceAcknowledged:true`, 'version');
  const confirm = mutation('adminConfirmWeaponTierChange', ',confirmed:true', 'version');
  const bindingFor = (weaponId: string) => {
    const candidate = [...store.candidates.values()].find(item => item.weaponId === weaponId)!;
    return { candidateId: candidate.candidateId, batchSha256: store.batchSha256, recordSha256: candidate.recordSha256, expectedVersion: 0 };
  };
  const reject = (result: Awaited<ReturnType<typeof call>>, pattern: RegExp) =>
    assert.match(result.errors?.[0]?.message ?? '', pattern);
  const ok = (result: Awaited<ReturnType<typeof call>>) => {
    assert.equal(result.errors, undefined, JSON.stringify(result.errors));
    return Object.values(result.data!)[0] as any;
  };
  const apply = async (source: string, vars: ReturnType<typeof bindingFor>) => {
    vars.expectedVersion = ok(await call(source, vars)).version;
  };
  try {
    const [identity] = await prisma.$queryRaw<{ name: string }[]>`SELECT current_database() AS name`;
    assert.equal(identity.name, url.pathname.slice(1));
    for (const candidate of store.candidates.values()) {
      await prisma.weapon.create({ data: { id: candidate.weaponId, nameEn: candidate.weaponName,
        nameVi: candidate.weaponName, type: candidate.dbWeaponType, rarity: 4,
        baseAtk: 100, iconUrl: '' } });
    }
    const row = bindingFor('14302');
    reject(await call(publish, row, { prisma, isAdmin: false }), /Unauthorized/);
    reject(await call('mutation { approveWeaponTierRank(id:"legacy") { id } }'), /USE_AUTHORITATIVE/);
    reject(await call('mutation { verifyWeaponTierRights(id:"legacy",verified:true) { id } }'), /USE_AUTHORITATIVE/);
    reject(await call(publish.replace('D2_REVISED', 'FROZEN'), row), /FROZEN_REVIEW_READ_ONLY/);
    reject(await call(rights, { ...row, recordSha256: '0'.repeat(64) }), /RECORD_CHECKSUM_MISMATCH/);
    reject(await call(publish, row), /CONCURRENT_MODIFICATION/);
    reject(await call(decide('APPROVE'), row), /RIGHTS_NOT_VERIFIED/);
    assert.equal(await prisma.weaponTierReview.count(), 0);
    await apply(rights, row);
    reject(await call(decide('APPROVE'), row), /TIER_CHANGE_NOT_CONFIRMED/);
    await apply(confirm, row);
    await apply(decide('APPROVE'), row);
    reject(await call(publish, { ...row, expectedVersion: row.expectedVersion - 1 }), /CONCURRENT_MODIFICATION/);

    const failingTransaction = (work: (tx: unknown) => Promise<unknown>) =>
      prisma.$transaction(tx => work({
        weaponTierReview: tx.weaponTierReview, weapon: tx.weapon, weaponTierRank: tx.weaponTierRank,
        weaponTierReviewAudit: tx.weaponTierReviewAudit,
        weaponTierAudit: { create: async () => { throw new Error('FIXTURE_AUDIT_FAILURE'); } },
      }));
    reject(await call(publish, row, { ...ctx, prisma: { $transaction: failingTransaction } }), /FIXTURE_AUDIT_FAILURE/);
    assert.equal(await prisma.weaponTierRank.count(), 0);
    assert.equal(await prisma.weaponTierAudit.count(), 0);
    assert.equal(await prisma.weaponTierReviewAudit.count({ where: { action: 'PUBLISHED' } }), 0);
    assert.equal((await prisma.weaponTierReview.findUniqueOrThrow({ where: { candidateId: row.candidateId } })).version, row.expectedVersion);

    const raced = await Promise.all([call(publish, row), call(publish, row)]);
    const [success] = raced.filter(result => !result.errors);
    assert.equal(raced.filter(result => !result.errors).length, 1);
    assert.equal(ok(success).tier, 'S');
    reject(raced.find(result => result.errors)!, /CONCURRENT_MODIFICATION|CANDIDATE_ALREADY_PUBLISHED/);
    assert.equal(await prisma.weaponTierRank.count(), 1);
    assert.equal(await prisma.weaponTierAudit.count({ where: { action: 'PUBLISHED' } }), 1);
    assert.equal(await prisma.weaponTierReviewAudit.count({ where: { action: 'PUBLISHED' } }), 1);
    const publicCtx = { prisma, isAdmin: false };
    assert.equal(ok(await call('{weaponTierRanks(versionKey:"7.2"){tier gameVersion publishRightsVerified}}', {}, publicCtx))[0].tier, 'S');
    assert.deepEqual(ok(await call('{weaponTierRanks(versionKey:"7.1"){id}}', {}, publicCtx)), []);

    for (const weaponId of ['12401', '13501', '14402']) {
      const blocked = bindingFor(weaponId);
      await apply(rights, blocked);
      reject(await call(decide('APPROVE'), blocked), /REVISION_EVIDENCE_INCOMPLETE|TIER_CHANGE_NOT_CONFIRMED/);
      reject(await call(publish, blocked), /CANDIDATE_NOT_IMPORT_ELIGIBLE/);
    }
    const rejected = bindingFor('15508');
    await apply(decide('REJECT'), rejected);
    reject(await call(publish, rejected), /CANDIDATE_NOT_IMPORT_ELIGIBLE/);
  } finally {
    await prisma.$disconnect();
  }
});

test('isolated Character review accepts the current D2 dossier and blocks Raiden C0', async () => {
  const url = new URL(process.env.WEAPON_PUBLICATION_TEST_DATABASE_URL ?? '');
  assert.match(url.hostname, /^(127\.0\.0\.1|localhost)$/);
  assert.match(url.pathname, /^\/genshinhub_test_weapon_publication_[a-z0-9]+$/);
  const prisma = new PrismaClient({ datasourceUrl: url.href });
  const previous = process.env.ADMIN_JWT_SECRET;
  process.env.ADMIN_JWT_SECRET = randomBytes(32).toString('hex');
  try {
    const [identity] = await prisma.$queryRaw<{ name: string }[]>`SELECT current_database() AS name`;
    assert.equal(identity.name, url.pathname.slice(1));
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const contextValue = { prisma, isAdmin: true, adminActor: 'character-fixture-operator' };
    const run = (source: string, variableValues: Record<string, unknown>) => graphql({ schema, source, variableValues, contextValue });
    const fixtures = buildVersionedReviewPreview(true).records.filter(row =>
      row.kind === 'CHARACTER' && (row.targetId === 'xiangling' && row.conditionValue === 'C6' ||
        row.targetId.includes('raiden') && row.conditionValue === 'C0'));
    assert.equal(fixtures.length, 2);
    for (const item of fixtures) {
      await prisma.character.create({ data: {
        id: item.targetId, nameEn: item.targetName, nameVi: item.targetName,
        titleEn: '', titleVi: '', rarity: 4, element: 'Pyro', weapon: 'Polearm', region: '',
        avatarUrl: '', splashArtUrl: '', descriptionEn: '', descriptionVi: '', baseHp: 1, baseAtk: 1, baseDef: 1,
      } });
      const input = {
        characterId: item.targetId, role: item.role, constellation: item.conditionValue,
        tier: item.proposedTier, gameVersion: '7.2', derivation: 'INDEPENDENT',
        explanationVi: item.explanation, sourceName: 'D2 fixture', sourceUrl: 'https://example.invalid/d2',
        evidence: { ...item.evidence as object, recordSha256: item.currentChecksum },
      };
      const write = 'mutation($input:CharacterTierRankingInput!){upsertCharacterTierRanking(input:$input){id updatedAt}}';
      const verify = 'mutation($id:String!,$at:String!){verifyCharacterTierRights(id:$id,expectedUpdatedAt:$at,verified:true,note:"Fixture rights"){updatedAt}}';
      const expectVerified = item.targetId === 'xiangling';
      if (expectVerified) {
        const frozen = await run(write, { input: { ...input, evidence: { ...input.evidence, recordSha256: item.sourceChecksum } } });
        assert.equal(frozen.errors, undefined, JSON.stringify(frozen.errors));
        const stale = frozen.data!.upsertCharacterTierRanking as any;
        const denied = await run(verify, { id: stale.id, at: stale.updatedAt });
        assert.match(denied.errors?.[0].message ?? '', /CHARACTER_DOSSIER_SUPERSEDED/);
      }
      const prepared = await run(write, { input });
      assert.equal(prepared.errors, undefined, JSON.stringify(prepared.errors));
      const draft = prepared.data!.upsertCharacterTierRanking as any;
      const verified = await run(verify, { id: draft.id, at: draft.updatedAt });
      if (!expectVerified) {
        assert.match(verified.errors?.[0].message ?? '', /CHARACTER_DOSSIER_BLOCKED/);
        continue;
      }
      assert.equal(verified.errors, undefined, JSON.stringify(verified.errors));
      const date = (verified.data!.verifyCharacterTierRights as any).updatedAt;
      const approved = await run('mutation($id:String!,$at:String!,$hash:String!){approveCharacterTierRanking(id:$id,expectedUpdatedAt:$at,expectedChecksum:$hash){approvalStatus}}',
        { id: draft.id, at: date, hash: item.currentChecksum });
      assert.equal(approved.errors, undefined, JSON.stringify(approved.errors));
      assert.equal((approved.data!.approveCharacterTierRanking as any).approvalStatus, 'APPROVED');
    }
  } finally {
    if (previous === undefined) delete process.env.ADMIN_JWT_SECRET;
    else process.env.ADMIN_JWT_SECRET = previous;
    await prisma.$disconnect();
  }
});
