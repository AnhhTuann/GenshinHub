/**
 * Phase D1 — PostgreSQL write/integration checks.
 *
 * IMPORTANT: this script hard-pins the isolated test database and refuses to run
 * against development/production. Every row it creates is removed in `finally`.
 * Run with: DATABASE_URL is OVERRIDDEN here; do not pass a dev URL.
 */
import assert from 'node:assert/strict';
import { PrismaClient } from '@prisma/client';
import { createCharacterTierRankingService } from '../../src/graphql/modules/characterTierRanking/characterTierRanking.service';
import { createWeaponTierRankingService } from '../../src/graphql/modules/weaponTierRanking/weaponTierRanking.service';

const TEST_DB = 'genshinhub_d1_tier_test';
const TEST_URL = `postgresql://postgres:${process.env.DEV_DB_PASSWORD ?? '<redacted>'}@127.0.0.1:5434/genshinhub_d1_tier_test`;
process.env.DATABASE_URL = TEST_URL;

const prisma = new PrismaClient({ datasources: { db: { url: TEST_URL } } });
const charService = createCharacterTierRankingService(prisma);
const weaponService = createWeaponTierRankingService(prisma);
const admin: any = { user: { isAdmin: true }, adminActor: 'real-admin-d1-integration', isAdmin: true };
const publicCtx: any = { user: { isAdmin: false }, isAdmin: false };
const marker = `D1-${Date.now()}`;
const createdCharacterIds: string[] = [];
const createdWeaponIds: string[] = [];

const evidence = (extra: Record<string, any> = {}) => ({
  rubric: 'GenshinHub Tier Rubric v1.0',
  primaryEvidence: ['genshin-db/talents: verified ability text', 'local DB corroboration only'],
  reviewer: 'GenshinHub Tier Editorial (test)',
  verifiedAt: '2026-11-20',
  confidence: 'HIGH',
  ...extra,
});

async function expectReject(fn: () => Promise<unknown>, message: string) {
  try {
    await fn();
    assert.fail(`expected rejection: ${message}`);
  } catch (error) {
    assert.match((error as Error).message, new RegExp(message));
  }
}

async function run() {
  const currentDb = await prisma.$queryRaw<{ current_database: string }[]>`select current_database()`;
  assert.equal(currentDb[0].current_database, TEST_DB, 'refusing to write outside the isolated test database');
  const beforeChars = await (prisma as any).characterTierRanking.count();
  const beforeWeapons = await (prisma as any).weaponTierRank.count();

  // --- 1. Authorization: public users cannot list admin queue or write ---
  await expectReject(() => charService.listAdmin({}, publicCtx), 'Unauthorized');
  await expectReject(() => weaponService.listAdmin({}, publicCtx), 'Unauthorized');
  await expectReject(() => charService.upsert({}, publicCtx), 'ADMIN_ACTOR_REQUIRED|Unauthorized');
  await expectReject(() => weaponService.upsert({}, publicCtx), 'ADMIN_ACTOR_REQUIRED|Unauthorized');

  // --- 2. Character: prepare an INDEPENDENT draft (rights NOT verified) ---
  const charSha = 'a'.repeat(64);
  const charInput = {
    characterId: 'xiangling',
    role: 'SUB_DPS',
    tier: 'S',
    constellation: 'C0',
    gameVersion: marker,
    explanationVi: 'Bằng chứng gameplay tiếng Việt cho bản ghi kiểm thử D1.',
    sourceUrl: 'urn:genshinhub:tierlist:d1test',
    sourceName: 'GenshinHub D1 integration test',
    sourceLocale: 'vi',
    derivation: 'INDEPENDENT',
    evidence: evidence({ recordSha256: charSha, gameplayAssumptions: ['rotation hợp lệ'] }),
  };
  const charDraft = await charService.upsert(charInput, admin);
  createdCharacterIds.push(charDraft.id);
  assert.equal(charDraft.approvalStatus, 'PENDING_REVIEW');
  assert.equal(charDraft.derivation, 'INDEPENDENT');
  assert.equal(charDraft.approvedBy, null);
  assert.ok(charDraft.evidence.checksum, 'server must store a content checksum');

  // --- 3. Public query is approved-only; no row leaks before approval ---
  const publicBefore = await charService.listPublic({ gameVersion: marker });
  assert.equal(publicBefore.length, 0, 'pending character row must not appear publicly');

  // --- 4. Publish-rights guard blocks approval before explicit verification ---
  await expectReject(
    () => charService.approve(charDraft.id, admin, charDraft.updatedAt.toISOString(), charSha),
    'RIGHTS_NOT_VERIFIED',
  );

  // --- 5. Checksum mismatch blocks approval even after rights are verified ---
  await charService.verifyRights(charDraft.id, true, 'Admin xác minh nội dung tự viết, không copy editorial.', admin, charDraft.updatedAt.toISOString());
  const afterRights = await prisma.characterTierRanking.findFirst({ where: { id: charDraft.id } });
  await expectReject(
    () => charService.approve(charDraft.id, admin, afterRights!.updatedAt.toISOString(), 'b'.repeat(64)),
    'CHECKSUM_MISMATCH',
  );

  // --- 6. Concurrent modification (stale CAS) is blocked ---
  await expectReject(
    () => charService.approve(charDraft.id, admin, new Date(0).toISOString(), charSha),
    'CONCURRENT_MODIFICATION',
  );

  // --- 7. Happy path: approve with fresh CAS + checksum ---
  const approved = await charService.approve(charDraft.id, admin, afterRights!.updatedAt.toISOString(), charSha);
  assert.equal(approved.approvalStatus, 'APPROVED');
  assert.equal(approved.approvedBy, 'real-admin-d1-integration');
  const publicAfter = await charService.listPublic({ gameVersion: marker });
  assert.equal(publicAfter.length, 1, 'approved character row must be public');
  // role + constellation filters
  assert.equal((await charService.listPublic({ gameVersion: marker, role: 'MAIN_DPS' })).length, 0);
  assert.equal((await charService.listPublic({ gameVersion: marker, role: 'SUB_DPS' })).length, 1);
  assert.equal((await charService.listPublic({ gameVersion: marker, constellation: 'C6' })).length, 0);
  assert.equal((await charService.listPublic({ gameVersion: marker, constellation: 'C0' })).length, 1);
  // approved rows are immutable
  await expectReject(() => charService.upsert({ ...charInput, expectedUpdatedAt: approved.updatedAt.toISOString() }, admin), 'APPROVED_RANKING_IMMUTABLE');
  const audit = await charService.listAuditLog(charDraft.id, admin);
  assert.ok(audit.some((e: any) => e.action === 'APPROVED'), 'character approval must be audited');

  // --- 8. SOURCE_DERIVED exclusion ---
  const derived = await charService.upsert({
    ...charInput, characterId: 'furina', role: 'SUPPORT', gameVersion: `${marker}-DERIVED`,
    derivation: 'SOURCE_DERIVED', sourceUrl: 'https://source.example', evidence: undefined, explanationVi: undefined,
  }, admin);
  createdCharacterIds.push(derived.id);
  await expectReject(
    () => charService.approve(derived.id, admin, derived.updatedAt.toISOString()),
    'SOURCE_DERIVED_CANNOT_BE_APPROVED',
  );
  assert.equal((await charService.listPublic({ gameVersion: `${marker}-DERIVED` })).length, 0);

  // --- 9. REQUEST_CHANGES and REJECT with reasons ---
  const rcDraft = await charService.upsert({ ...charInput, characterId: 'yelan', gameVersion: `${marker}-RC` }, admin);
  createdCharacterIds.push(rcDraft.id);
  await charService.verifyRights(rcDraft.id, true, 'Admin xác minh quyền.', admin, rcDraft.updatedAt.toISOString());
  let rc = await prisma.characterTierRanking.findFirst({ where: { id: rcDraft.id } });
  const rcChanged = await charService.requestChanges(rcDraft.id, 'Cần bổ sungERGY assumption', admin, rc!.updatedAt.toISOString(), charSha);
  assert.equal(rcChanged.approvalStatus, 'NEEDS_REVIEW');
  assert.match(rcChanged.rejectionReason, /ERGY/);
  rc = await prisma.characterTierRanking.findFirst({ where: { id: rcDraft.id } });
  const rejected = await charService.reject(rcDraft.id, 'Bằng chứng không đủ', admin, rc!.updatedAt.toISOString(), charSha);
  assert.equal(rejected.approvalStatus, 'REJECTED');

  // --- 10. Weapon: client cannot flip publishRightsVerified on upsert ---
  const weaponSha = 'c'.repeat(64);
  const weaponInput = {
    weaponId: '11401',
    weaponType: 'Kiếm Đơn',
    role: 'SUPPORT',
    tier: 'SS',
    refinementContext: 'R1',
    refinementLevel: 1,
    versionKey: '7.2',
    gameVersion: '7.2',
    gameVersionStatus: 'VERIFIED',
    explanationVi: 'Đánh giá độc lập bằng tiếng Việt cho vũ khí kiểm thử D1.',
    sourceName: 'GenshinHub D1 integration test',
    sourceUrl: 'urn:genshinhub:weapon:d1test',
    sourceChecksum: weaponSha,
    derivation: 'INDEPENDENT',
    publishRightsVerified: true, // malicious client value — must be ignored
    evidence: evidence(),
  };
  const weaponDraft = await weaponService.upsert(weaponInput, admin);
  createdWeaponIds.push(weaponDraft.id);
  assert.equal(weaponDraft.publishRightsVerified, false, 'client cannot set publish rights');
  assert.equal(weaponDraft.reviewStatus, 'PENDING_REVIEW');
  assert.equal((await weaponService.listPublic({ weaponId: '11401', versionKey: '7.2' })).filter((w) => w.id === weaponDraft.id).length, 0);

  // rights guard + checksum mismatch + CAS
  await expectReject(
    () => weaponService.approve(weaponDraft.id, admin, weaponDraft.updatedAt.toISOString(), weaponSha),
    'PUBLISH_RIGHTS_NOT_VERIFIED',
  );
  await weaponService.verifyRights(weaponDraft.id, true, 'Admin xác minh bản quyền nội dung.', admin, weaponDraft.updatedAt.toISOString());
  let wRow = await prisma.weaponTierRank.findFirst({ where: { id: weaponDraft.id } });
  await expectReject(
    () => weaponService.approve(weaponDraft.id, admin, wRow!.updatedAt.toISOString(), 'd'.repeat(64)),
    'CHECKSUM_MISMATCH',
  );
  await expectReject(
    () => weaponService.approve(weaponDraft.id, admin, new Date(0).toISOString(), weaponSha),
    'CONCURRENT_MODIFICATION',
  );
  const wApproved = await weaponService.approve(weaponDraft.id, admin, wRow!.updatedAt.toISOString(), weaponSha);
  assert.equal(wApproved.reviewStatus, 'APPROVED');
  assert.equal(wApproved.publishRightsVerified, true);
  const publicWeapons = await weaponService.listPublic({ weaponId: '11401', versionKey: '7.2' });
  assert.ok(publicWeapons.some((w) => w.id === weaponDraft.id));
  // weapon type + refinement filters
  assert.equal((await weaponService.listPublic({ weaponType: 'Cung', versionKey: '7.2' })).filter((w) => w.id === weaponDraft.id).length, 0);
  assert.equal((await weaponService.listPublic({ refinementContext: 'R5' })).filter((w) => w.id === weaponDraft.id).length, 0);
  assert.equal((await weaponService.listPublic({ refinementContext: 'R1', versionKey: '7.2' })).filter((w) => w.id === weaponDraft.id).length, 1);

  // --- 11. Empty state: an untouched version returns no fabricated rows ---
  assert.deepEqual(await charService.listPublic({ gameVersion: `${marker}-EMPTY` }), []);
  assert.deepEqual(await weaponService.listPublic({ versionKey: `${marker}-EMPTY` }), []);

  console.log('D1_DB_INTEGRATION_PASS characterRows=%d weaponRows=%d', createdCharacterIds.length, createdWeaponIds.length);
}

async function cleanup() {
  for (const id of createdCharacterIds) {
    await prisma.characterTierRanking.deleteMany({ where: { id } });
  }
  for (const id of createdWeaponIds) {
    await prisma.weaponTierAudit.deleteMany({ where: { rankingId: id } });
    await prisma.weaponTierRank.deleteMany({ where: { id } });
  }
  const afterChars = await (prisma as any).characterTierRanking.count();
  const afterWeapons = await (prisma as any).weaponTierRank.count();
  console.log('D1_DB_CLEANUP characterRows=%d weaponRows=%d', afterChars, afterWeapons);
}

run()
  .catch((error) => { console.error('D1_DB_INTEGRATION_FAIL', error); process.exitCode = 1; })
  .finally(async () => {
    try { await cleanup(); } finally { await prisma.$disconnect(); }
  });
