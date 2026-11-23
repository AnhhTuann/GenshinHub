/**
 * sync-assets.ts — CLI quét & tải toàn bộ asset còn thiếu trong DB.
 *
 * Usage:
 *   npm run sync-assets            # check-only: báo cáo missing/invalid, KHÔNG tải
 *   npm run sync-assets -- --sync  # tải các asset thiếu/hỏng về local (WebP)
 *   npm run sync-assets -- --sync --only materials
 *
 * Mọi logic nằm trong scripts/sync/assetSync.ts — module này chỉ là CLI wrapper.
 */
import { PrismaClient } from '@prisma/client';
import { scanAssets, syncAssets } from './sync/assetSync';
import { getAssetStorageRoot } from '../src/utils/assetStorage';

const prisma = new PrismaClient();

async function main() {
  if (!process.env.DATABASE_URL) throw new Error('Cần truyền DATABASE_URL rõ ràng qua môi trường');
  const args = process.argv.slice(2);
  const doSync = args.includes('--sync');
  const onlyIdx = args.indexOf('--only');
  let kinds: { characters?: boolean; weapons?: boolean; artifacts?: boolean; materials?: boolean } | undefined;
  if (onlyIdx >= 0) {
    const k = args[onlyIdx + 1];
    if (['characters', 'weapons', 'artifacts', 'materials'].includes(k)) {
      kinds = { characters: false, weapons: false, artifacts: false, materials: false, [k]: true };
    }
  }

  console.log('==========================================');
  console.log('🖼️  GenshinHub Asset Sync');
  console.log(`📁 Storage root: ${getAssetStorageRoot()}`);
  console.log(`⚙️  Mode: ${doSync ? 'SYNC (download missing)' : 'CHECK-ONLY (không tải)'}`);
  console.log('==========================================\n');

  const result = doSync ? await syncAssets(prisma, kinds) : await syncAssets(prisma, kinds, { dryRun: true });
  const { scan } = result;

  console.log(`\n📊 Quét ${scan.total} bản ghi DB:`);
  console.log(`   ✅ Hợp lệ: ${scan.valid} | ❌ Thiếu: ${scan.missing} | ⚠️ Hỏng: ${scan.invalid} | (không URL: ${scan.skippedNoPath})`);
  console.log(`   🔧 Cần xử lý: ${scan.jobs.length}`);

  if (scan.unresolved.length) {
    console.log(`   Thiếu URL hoặc nguồn tải: ${scan.unresolved.length}`);
    for (const item of scan.unresolved) console.log(`   - ${item.label} -> ${item.relPath || '(chưa cấu hình URL)'}`);
  }

  if (!doSync) {
    console.log('\nℹ️  Check-only — chạy với --sync để tải asset thiếu.');
    const preview = scan.jobs.slice(0, 40);
    for (const j of preview) console.log(`   - ${j.label} -> ${j.relPath}`);
    if (scan.jobs.length > 40) console.log(`   ... và ${scan.jobs.length - 40} mục khác`);
  } else {
    console.log(`\n✅ Tải mới: ${result.ok} | ❌ Lỗi: ${result.fail} | ⏭️ Đã có: ${result.skippedValid}`);
    if (result.failures.length) {
      console.log('\n⚠️  Asset không tải được (giữ trạng thái missing, không tạo placeholder):');
      for (const f of result.failures.slice(0, 60)) {
        console.log(`   - ${f.label} (${f.relPath}): ${f.error}`);
      }
      if (result.failures.length > 60) console.log(`   ... và ${result.failures.length - 60} mục khác`);
    }
  }
}

main()
  .catch((e) => { console.error('❌ Lỗi asset sync:', e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
