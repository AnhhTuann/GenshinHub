/**
 * e2e.test.ts — Kiểm thử end-to-end pipeline sync trên DEV database.
 *
 * Mô phỏng một "bản cập nhật game" bằng fixture giả có đánh dấu rõ
 * (prefix E2E-, ID 998xxx) — KHÔNG phải dữ liệu game thật, chỉ dùng
 * để kiểm thử và sẽ được rollback/xóa sau khi chạy.
 *
 * Chạy:  npx ts-node scripts/sync/e2e.test.ts
 * Yêu cầu: backend GraphQL đang chạy ở :4000 (để verify GraphQL).
 */

import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { applyReport, rollback, SyncDeps } from './syncEngine';
import { detectChanges, SyncReport } from './detector';
import { mapYattaMaterials } from './yattaMaterials';

const prisma = new PrismaClient();
const GRAPHQL_URL = process.env.GRAPHQL_URL || 'http://localhost:4000/graphql';

const E2E = {
  charId: 'e2e-test-hero',
  weaponId: '998877',
  artifactId: '998878',
  materialId: '998879',
};

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, extra?: unknown) {
  if (cond) { passed++; console.log(`  ✅ ${name}`); }
  else { failed++; console.log(`  ❌ ${name}`, extra ?? ''); }
}

function gql(query: string) {
  return axios.post(GRAPHQL_URL, { query }, { timeout: 10000 }).then(r => r.data);
}

function buildFixtureReport(): SyncReport {
  return {
    genshinDbVersion: 'e2e-fixture',
    generatedAt: new Date().toISOString(),
    characters: [{
      action: 'create',
      dbId: E2E.charId,
      sourceName: 'E2E Test Hero',
      source: {
        genshinDbName: 'E2E Test Hero',
        nameEn: 'E2E Test Hero',
        nameVi: 'E2E Test Hero',
        titleEn: 'E2E Title',
        titleVi: 'E2E Title',
        rarity: 5,
        element: 'Pyro',
        weapon: 'Polearm',
        region: 'E2E',
        birthday: '01/01',
        descriptionEn: 'E2E fixture description EN',
        descriptionVi: 'E2E fixture description VI',
        baseHp: 12000,
        baseAtk: 100,
        baseDef: 800,
        fandomUrl: 'https://example.com/e2e',
        avatarUrl: '/assets/characters/e2e/avatar.webp',
        splashArtUrl: '',
        pending: false,
      },
      changes: [],
      warnings: ['E2E FIXTURE'],
    }],
    weapons: [{
      action: 'create',
      dbId: null,
      sourceName: 'E2E Test Bow',
      source: {
        genshinDbName: 'E2E Test Bow',
        nameEn: 'E2E Test Bow',
        nameVi: 'E2E Test Bow',
        rarity: 4,
        typeVi: 'Cung',
        typeEn: 'Bow',
        baseAtk: 450,
        subStat: 'Tỷ Lệ Bạo Kích',
        subStatValue: 36.8,
        passiveNameEn: 'E2E Passive',
        passiveNameVi: 'E2E Passive',
        passiveDescEn: 'E2E passive desc',
        passiveDescVi: 'E2E passive desc',
        iconUrl: '/assets/weapons/UI_EquipIcon_E2E.webp',
      },
      changes: [],
      warnings: ['E2E FIXTURE'],
    }],
    artifacts: [{
      action: 'create',
      dbId: null,
      sourceName: 'E2E Test Set',
      source: {
        genshinDbName: 'E2E Test Set',
        nameEn: 'E2E Test Set',
        nameVi: 'E2E Test Set',
        rarityList: [4, 5],
        piece2DescEn: 'E2E 2pc',
        piece2DescVi: 'E2E 2pc',
        piece4DescEn: 'E2E 4pc',
        piece4DescVi: 'E2E 4pc',
        iconUrl: '/assets/artifacts/UI_RelicIcon_E2E.webp',
      },
      changes: [],
      warnings: ['E2E FIXTURE'],
    }],
    materials: [{
      action: 'create',
      dbId: null,
      sourceName: 'E2E Test Mat',
      source: {
        genshinDbName: 'E2E Test Mat',
        nameEn: 'E2E Test Mat',
        nameVi: 'E2E Test Mat',
        rarity: 4,
        iconUrl: '/assets/items/UI_ItemIcon_E2E.webp',
        externalId: E2E.materialId,
        typeText: 'Refinement Material',
        category: 'AVATAR_MATERIAL',
      },
      changes: [],
      warnings: ['E2E FIXTURE'],
    }],
    unmatchedInDb: { characters: [], weapons: [], artifacts: [], materials: [] },
  };
}

// Resolver giả: trả ID fixture theo kind (giả lập yatta resolve thành công)
const fakeDeps: SyncDeps = {
  resolveYattaId: async (kind) =>
    kind === 'weapon' ? E2E.weaponId : kind === 'reliquary' ? E2E.artifactId : E2E.materialId,
};

async function cleanup() {
  await prisma.characterWeapon.deleteMany({ where: { characterId: E2E.charId } });
  await prisma.characterArtifact.deleteMany({ where: { characterId: E2E.charId } });
  await prisma.characterTeam.deleteMany({ where: { characterId: E2E.charId } });
  await prisma.character.deleteMany({ where: { id: E2E.charId } });
  await prisma.weapon.deleteMany({ where: { id: E2E.weaponId } });
  await prisma.artifactSet.deleteMany({ where: { id: E2E.artifactId } });
  await prisma.material.deleteMany({ where: { id: E2E.materialId } });
}

function verifyTestTarget() {
  const db = new URL(process.env.DATABASE_URL || '');
  const api = new URL(GRAPHQL_URL);
  const local = ['localhost', '127.0.0.1', '[::1]'];
  if (process.env.NODE_ENV !== 'test' || !local.includes(db.hostname) ||
      !db.pathname.endsWith('_test') || !local.includes(api.hostname)) {
    throw new Error('E2E requires a loopback database ending in _test and a local GraphQL server');
  }
}

async function main() {
  verifyTestTarget();
  console.log('🧪 E2E TEST — fixture giả, dev DB only\n');
  await cleanup(); // đảm bảo sạch trước test

  const invalidReport = buildFixtureReport();
  invalidReport.artifacts[0].source.piece2DescEn = null as unknown as string;
  await applyReport(invalidReport, false, fakeDeps).then(
    () => check('batch rejects invalid artifact', false),
    () => check('batch rejects invalid artifact', true),
  );
  check('failed batch leaves no character or weapon', (
    await prisma.character.count({ where: { id: E2E.charId } }) +
    await prisma.weapon.count({ where: { id: E2E.weaponId } })
  ) === 0);
  await cleanup();

  const item = { id: 998881, name: 'E2E Catalog Item', type: 'specialCurrency', icon: 'UI_ItemIcon_998881', rank: 4 };
  const pendingItem = { id: 998882, name: 'E2E Unranked Item', type: 'specialCurrency' };
  const source = mapYattaMaterials({ '998881': item, '998882': pendingItem }, {});
  const extended = await detectChanges(prisma, source);
  check('catalog detects a new typed item', extended.materials.some(entry =>
    entry.dbId === '998881' && entry.action === 'create' && entry.source.sourceType === 'specialCurrency'));
  check('catalog leaves an unranked item pending', extended.materials.some(entry =>
    entry.dbId === '998882' && entry.action === 'pending'));
  check('extended dry-run does not add catalog items', await prisma.material.count({
    where: { id: { in: ['998881', '998882'] } },
  }) === 0);

  // ---------- 1. Dry-run: fixture KHÔNG tự chạy qua detector (không có trong genshin-db)
  //    -> mô phỏng bằng applyReport trực tiếp (đã test detector riêng ở sync:check)
  console.log('1️⃣  Apply fixture report (giả lập dữ liệu game mới)...');
  const report = buildFixtureReport();
  const snapFile = await applyReport(report, false, fakeDeps);

  // ---------- 2. Verify Prisma ----------
  console.log('\n2️⃣  Verify Prisma records...');
  const char = await prisma.character.findUnique({ where: { id: E2E.charId } });
  check('character tồn tại', !!char);
  check('character baseHp đúng fixture', char?.baseHp === 12000);
  check('character tier=null (admin trống)', char?.tier === null);
  check('character không có bestWeapons giả', (await prisma.characterWeapon.count({ where: { characterId: E2E.charId } })) === 0);

  const wpn = await prisma.weapon.findUnique({ where: { id: E2E.weaponId } });
  check('weapon tồn tại với ID fixture', wpn?.nameEn === 'E2E Test Bow' && wpn?.baseAtk === 450);

  const art = await prisma.artifactSet.findUnique({ where: { id: E2E.artifactId } });
  check('artifactSet tồn tại', art?.nameEn === 'E2E Test Set' && art?.rarityList?.length === 2);

  const mat = await prisma.material.findUnique({ where: { id: E2E.materialId } });
  check('material tồn tại', mat?.nameEn === 'E2E Test Mat' && mat?.type === 'material');

  // ---------- 3. Admin protection: gán tier rồi update -> phải giữ nguyên ----------
  console.log('\n3️⃣  Test bảo vệ trường Admin...');
  await prisma.character.update({ where: { id: E2E.charId }, data: { tier: 'S', role: 'Main DPS' } });
  const updReport = buildFixtureReport();
  updReport.characters[0].action = 'update';
  updReport.characters[0].dbId = E2E.charId;
  await applyReport(updReport, false, fakeDeps);
  const char2 = await prisma.character.findUnique({ where: { id: E2E.charId } });
  check('tier được bảo vệ sau update', char2?.tier === 'S' && char2?.role === 'Main DPS');

  // ---------- 4. Idempotent: chạy lại create -> không trùng ----------
  console.log('\n4️⃣  Test idempotent (chạy lại cùng report)...');
  await applyReport(buildFixtureReport(), false, fakeDeps);
  check('character không bị trùng', (await prisma.character.count({ where: { id: E2E.charId } })) === 1);
  check('weapon không bị trùng', (await prisma.weapon.count({ where: { id: E2E.weaponId } })) === 1);
  check('material không bị trùng', (await prisma.material.count({ where: { id: E2E.materialId } })) === 1);

  // ---------- 5. GraphQL end-to-end ----------
  console.log('\n5️⃣  Verify GraphQL...');
  try {
    const res = await gql(`{ character(id:"${E2E.charId}"){ id nameEn baseHp tier } weapon(id:"${E2E.weaponId}"){ id nameEn baseAtk } }`);
    check('GraphQL character query', res?.data?.character?.nameEn === 'E2E Test Hero' && res?.data?.character?.tier === 'S', res);
    check('GraphQL weapon query', res?.data?.weapon?.baseAtk === 450, res);
    const artifacts = await gql(`{ artifactSet(id:"${E2E.artifactId}"){ id nameEn } }`);
    check('GraphQL artifact set detail', artifacts?.data?.artifactSet?.nameEn === 'E2E Test Set', artifacts);
    const mats = await gql(`{ materials { id nameEn } }`);
    check('GraphQL materials chứa fixture', mats?.data?.materials?.some((m: any) => m.id === E2E.materialId), 'material not found');
  } catch (e: any) {
    check('GraphQL reachable', false, e.message);
  }

  // ---------- 6. detectChanges: fixture không có trong genshin-db -> unmatched, không xóa ----------
  console.log('\n6️⃣  Detector không xóa bản ghi lạ...');
  const detected = await detectChanges(prisma);
  check('fixture char nằm trong unmatchedInDb', detected.unmatchedInDb.characters.some(x => x.includes(E2E.charId)));
  check('fixture weapon nằm trong unmatchedInDb', detected.unmatchedInDb.weapons.some(x => x.includes(E2E.weaponId)));
  check('fixture vẫn còn trong DB sau detect', !!(await prisma.character.findUnique({ where: { id: E2E.charId } })));

  // ---------- 7. Rollback ----------
  console.log('\n7️⃣  Rollback snapshot...');
  check('tìm thấy snapshot chứa fixture', !!snapFile);
  if (snapFile) {
    await rollback(snapFile);
    check('character bị xóa sau rollback', !(await prisma.character.findUnique({ where: { id: E2E.charId } })));
    check('weapon bị xóa sau rollback', !(await prisma.weapon.findUnique({ where: { id: E2E.weaponId } })));
    check('artifact bị xóa sau rollback', !(await prisma.artifactSet.findUnique({ where: { id: E2E.artifactId } })));
    check('material bị xóa sau rollback', !(await prisma.material.findUnique({ where: { id: E2E.materialId } })));
  }

  await cleanup(); // đảm bảo sạch dù rollback có vấn đề
  console.log(`\n📊 KẾT QUẢ: ${passed} passed, ${failed} failed`);
  await prisma.$disconnect();
  process.exit(failed ? 1 : 0);
}

main().catch(async e => {
  console.error('❌ E2E ERROR:', e);
  try { verifyTestTarget(); await cleanup(); } catch { /* preserve test failure */ }
  await prisma.$disconnect();
  process.exit(1);
});
