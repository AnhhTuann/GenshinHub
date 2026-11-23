/**
 * seed-ci.ts
 * -------------------------------------------------------------
 * Script seed test fixtures cho môi trường CI (GitHub Actions).
 *
 * Đặc tính:
 * - Chạy 100% offline, không gọi API mạng (ambr.top, yatta.moe).
 * - Tốc độ thực thi < 1 giây.
 * - Dữ liệu tối thiểu nhưng đầy đủ quan hệ để Next.js SSG
 *   prerender thành công mọi dynamic route:
 *   - /[locale]/characters/[id]
 *   - /[locale]/weapons/[id]
 *   - /[locale]/artifacts/[id]
 *   - /[locale]/tierlist
 *   - /[locale]/weapons
 *   - /[locale]/characters
 *   - /[locale]/artifacts
 *   - sitemap.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[CI-Seed] Bắt đầu kiểm tra database safety guard...');

  const dbUrl = process.env.DATABASE_URL || '';
  const isProductionHost = dbUrl.includes('neon.tech') ||
                           dbUrl.includes('render.com') ||
                           dbUrl.includes('pooler.supabase') ||
                           dbUrl.includes('aws.neon');

  const isTestDb = dbUrl.includes('genshinhub_test') ||
                   dbUrl.includes('_test') ||
                   dbUrl.includes('test_') ||
                   (process.env.CI === 'true' && dbUrl.includes('localhost'));

  if (isProductionHost || !isTestDb) {
    console.error('❌ [CI-Seed Guard] ABORT: seed-ci.ts chỉ được phép chạy trên test database độc lập!');
    console.error(`   DATABASE_URL hiện tại: ${dbUrl ? dbUrl.replace(/:[^:@]+@/, ':****@') : '(empty)'}`);
    console.error('   DATABASE_URL bắt buộc phải chứa tên test DB (ví dụ: genshinhub_test) và tuyệt đối không trỏ tới cloud/production host.');
    process.exit(1);
  }

  console.log('[CI-Seed] ✓ Database safety guard passed. Bắt đầu nạp test fixtures...');

  // 1. Dọn sạch DB test trước khi seed
  await prisma.teamMember.deleteMany({});
  await prisma.characterTeam.deleteMany({});
  await prisma.characterWeapon.deleteMany({});
  await prisma.characterArtifact.deleteMany({});
  await prisma.character.deleteMany({});
  await prisma.weapon.deleteMany({});
  await prisma.artifactSet.deleteMany({});
  await prisma.material.deleteMany({});
  await prisma.tierRank.deleteMany({});

  // 2. Seed Tier Ranks
  await prisma.tierRank.createMany({
    data: [
      { name: 'SS', order: 0, colorBase: 'red' },
      { name: 'S',  order: 1, colorBase: 'orange' },
      { name: 'A',  order: 2, colorBase: 'purple' },
      { name: 'B',  order: 3, colorBase: 'blue' },
      { name: 'C',  order: 4, colorBase: 'emerald' },
      { name: 'D',  order: 5, colorBase: 'gray' },
    ],
  });
  console.log('[CI-Seed] ✓ TierRanks seeded');

  // 3. Seed Weapons (có cả role & tier)
  await prisma.weapon.createMany({
    data: [
      {
        id: 'cinnabar-spindle',
        nameEn: 'Cinnabar Spindle',
        nameVi: 'Thoi Thước Ngọc',
        rarity: 4,
        type: 'Kiếm Đơn',
        baseAtk: 454,
        subStat: 'Phòng Ngự%',
        subStatValue: 69.0,
        passiveNameEn: 'Spotless Coat',
        passiveNameVi: 'Bộ Lông Không Tì Vết',
        passiveDescEn: 'Elemental Skill DMG is increased by 80% of DEF.',
        passiveDescVi: 'Sát thương Kỹ Năng Nguyên Tố tăng 80% Phòng Ngự.',
        iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Opus.webp',
        tier: 'S',
        role: 'Sub DPS',
      },
      {
        id: '11301',
        nameEn: 'Cool Steel',
        nameVi: 'Kiếm Lạnh Sắt Rèn',
        rarity: 3,
        type: 'Kiếm Đơn',
        baseAtk: 354,
        subStat: 'Tấn Công%',
        subStatValue: 35.2,
        passiveNameEn: 'Bane of Water and Ice',
        passiveNameVi: 'Khắc Thủy Băng',
        passiveDescEn: 'Increases DMG against opponents affected by Hydro or Cryo by 24%.',
        passiveDescVi: 'Tăng 24% sát thương cho kẻ địch bị ảnh hưởng bởi Thủy hoặc Băng.',
        iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Steel.webp',
        tier: 'B',
        role: 'Support',
      },
      {
        id: '11509',
        nameEn: 'Staff of Homa',
        nameVi: 'Trượng Hộ Ma',
        rarity: 5,
        type: 'Vũ Khí Cán Dài',
        baseAtk: 608,
        subStat: 'Sát Thương Bạo Kích',
        subStatValue: 66.2,
        passiveNameEn: 'Reckless Cinnabar',
        passiveNameVi: 'Hồ Bướm Liều Lĩnh',
        passiveDescEn: "HP increased by 20%. Additionally, provides an ATK Bonus based on 0.8% of the wielder's Max HP.",
        passiveDescVi: 'HP tăng 20%. Ngoài ra, nhận được buff Tấn Công dựa trên 0.8% giới hạn HP của người trang bị.',
        iconUrl: '/assets/weapons/UI_EquipIcon_Pole_Homa.webp',
        tier: 'SS',
        role: 'Main DPS',
      },
    ],
  });
  console.log('[CI-Seed] ✓ Weapons seeded');

  // 4. Seed Artifact Sets
  await prisma.artifactSet.createMany({
    data: [
      {
        id: '15021',
        nameEn: 'Husk of Opulent Dreams',
        nameVi: 'Giấc Mộng Phù Hoa',
        rarityList: [4, 5],
        piece2DescEn: 'DEF +30%',
        piece2DescVi: 'Phòng Ngự +30%',
        piece4DescEn: 'A character equipped with this Artifact set will obtain the Curiosity effect.',
        piece4DescVi: 'Nhân vật trang bị bộ Thánh Di Vật này sẽ nhận hiệu quả Tò Mò.',
        iconUrl: '/assets/artifacts/UI_RelicIcon_15021_4.webp',
      },
      {
        id: '10001',
        nameEn: 'Resolution of Sojourner',
        nameVi: 'Trái Tim Hành Giả',
        rarityList: [3, 4],
        piece2DescEn: 'ATK +18%.',
        piece2DescVi: 'Tấn công tăng 18%',
        piece4DescEn: 'Increases Charged Attack CRIT Rate by 30%.',
        piece4DescVi: 'Tỷ lệ bạo kích của trọng kích tăng 30%',
        iconUrl: '/assets/artifacts/UI_RelicIcon_10001_4.webp',
      },
    ],
  });
  console.log('[CI-Seed] ✓ ArtifactSets seeded');

  // 5. Seed Materials
  await prisma.material.createMany({
    data: [
      {
        id: '102',
        nameEn: 'Adventure EXP',
        nameVi: 'EXP Mạo Hiểm',
        type: 'systemAccess',
        rarity: 3,
        iconUrl: '/assets/items/UI_ItemIcon_102.webp',
      },
      {
        id: '104161',
        nameEn: 'Prithiva Topaz Sliver',
        nameVi: 'Vụn Hoàng Ngọc Cứng',
        type: 'characterAscension',
        rarity: 2,
        iconUrl: '/assets/items/UI_ItemIcon_104161.webp',
      },
    ],
  });
  console.log('[CI-Seed] ✓ Materials seeded');

  // 6. Seed Character (Albedo) với đầy đủ relations
  const albedo = await prisma.character.create({
    data: {
      id: 'albedo',
      nameEn: 'Albedo',
      nameVi: 'Albedo',
      titleEn: 'Kreideprinz',
      titleVi: 'Bạch Ngân Chi Đế',
      rarity: 5,
      element: 'Geo',
      weapon: 'Kiếm Đơn',
      region: 'Mondstadt',
      avatarUrl: '/assets/characters/albedo/avatar.webp',
      splashArtUrl: '/assets/characters/albedo/splash.webp',
      descriptionEn: 'A genius known as the Kreideprinz, Chief Alchemist of the Knights of Favonius.',
      descriptionVi: 'Hoàng Tử Vôi Trắng, Trưởng Giả Kim Thuật Đội Kỵ Sĩ Tây Phong.',
      baseHp: 13226,
      baseAtk: 251,
      baseDef: 876,
      fandomUrl: 'https://genshin-impact.fandom.com/wiki/Albedo',
      birthday: '09/13',
      tier: 'S',
      role: 'Sub DPS',
      recommendedC: 'C0',
      tierNoteEn: ['High off-field Geo DMG', 'DEF scaling'],
      tierNoteVi: ['Sát thương Nham ngoài sân cao', 'Scale theo Phòng Ngự'],
      talentPriority: ['Elemental Skill', 'Elemental Burst', 'Normal Attack'],
      signatureWeapons: ['Cinnabar Spindle'],
      sands: ['Phòng Ngự%'],
      goblet: ['Sát Thương Nham'],
      circlet: ['Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích'],
      subStatsPriority: ['Phòng Ngự%', 'Tỷ Lệ Bạo Kích', 'Sát Thương Bạo Kích', 'Hiệu Quả Nạp'],
      stats: [
        { level: 'Lv.1', ascend: 0, baseHp: 1030, baseAtk: 20, baseDef: 68, specialStatName: 'Geo DMG Bonus', specialStatValue: '0.0%' },
        { level: 'Lv.90', ascend: 6, baseHp: 13226, baseAtk: 251, baseDef: 876, specialStatName: 'Geo DMG Bonus', specialStatValue: '28.8%' },
      ],
      bestWeapons: {
        create: [
          {
            weaponId: 'cinnabar-spindle',
            nameEn: 'Cinnabar Spindle',
            nameVi: 'Thoi Thước Ngọc',
            rank: 0,
            isF2P: true,
            iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Opus.webp',
            subStat: 'Phòng Ngự%',
            passiveDescEn: 'Elemental Skill DMG is increased by 80% of DEF.',
            passiveDescVi: 'Sát thương Kỹ Năng Nguyên Tố tăng 80% Phòng Ngự.',
            refinement: 5,
            constellation: 'C0',
            order: 0,
          },
        ],
      },
      bestArtifacts: {
        create: [
          {
            setNameEn: 'Husk of Opulent Dreams',
            setNameVi: 'Giấc Mộng Phù Hoa',
            pieces: 4,
            constellation: 'C0',
            order: 0,
          },
        ],
      },
      teams: {
        create: [
          {
            name: 'Mono Geo',
            rank: 'S',
            description: 'Đội hình Mono Geo tiêu chuẩn',
            order: 0,
            members: {
              create: [
                {
                  characterId: 'albedo',
                  role: 'Sub DPS',
                  roleDesc: 'Sát thương Nham ngoài sân',
                  weapons: ['Thoi Thước Ngọc'],
                  artifacts: ['Giấc Mộng Phù Hoa'],
                  substats: ['Phòng Ngự%', 'Tỷ Lệ Bạo Kích'],
                  order: 0,
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log(`[CI-Seed] ✓ Character seeded: ${albedo.nameEn} (${albedo.id})`);

  console.log('[CI-Seed] Hoàn tất nạp test fixtures thành công 100%!');
}

main()
  .catch((e) => {
    console.error('[CI-Seed] LỖI SEED FIXTURES:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
