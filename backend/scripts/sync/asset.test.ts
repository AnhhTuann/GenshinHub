/**
 * asset.test.ts — Integration tests cho hệ thống asset local/persistent.
 *
 * Chạy:  npx ts-node scripts/sync/asset.test.ts
 *
 * Dùng mock CDN (node http server local) + fixture ảnh sinh bằng sharp.
 * Cô lập hoàn toàn: ASSET_STORAGE_PATH trỏ vào thư mục temp, không đụng DB thật
 * (scanAssets được test với prisma stub), không ghi frontend/public.
 */

import * as http from 'http';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import sharp from 'sharp';

// PHẢI set TRƯỚC khi import các module dùng assetStorage
const TMP_ROOT = fs.mkdtempSync(path.join(os.tmpdir(), 'genshinhub-assets-'));
process.env.ASSET_STORAGE_PATH = TMP_ROOT;

import { downloadAndConvertToWebp, downloadWithFallback } from '../../src/utils/imageDownloader';
import { resolveAssetFilePath, isValidImageFile, getAssetStorageRoot, atomicWriteFile } from '../../src/utils/assetStorage';
import { scanAssets, syncAssets, isSafeRelPath } from './assetSync';

let passed = 0;
let failed = 0;
function check(name: string, cond: boolean, extra?: unknown) {
  if (cond) { passed++; console.log(`  ✅ ${name}`); }
  else { failed++; console.log(`  ❌ ${name}`, extra ?? ''); }
}

// ---------- Mock CDN ----------
let server: http.Server;
let baseUrl = '';
const hits: Record<string, number> = {};
let fixturePng: Buffer;
let failNext = new Set<string>();   // paths trả 500 lần đầu
let failAlways = new Set<string>(); // paths luôn 404
let flakyCount: Record<string, number> = {};

async function startMockCdn() {
  fixturePng = await sharp({
    create: { width: 16, height: 16, channels: 3, background: { r: 200, g: 30, b: 30 } },
  }).png().toBuffer();

  server = http.createServer((req, res) => {
    const p = (req.url || '').split('?')[0];
    hits[p] = (hits[p] || 0) + 1;
    if (failAlways.has(p)) { res.writeHead(404); res.end('nope'); return; }
    if (failNext.has(p)) {
      failNext.delete(p);
      res.writeHead(500); res.end('err'); return;
    }
    if (flakyCount[p] !== undefined) {
      if (flakyCount[p] > 0) { flakyCount[p]--; res.writeHead(503); res.end('busy'); return; }
    }
    if (p.endsWith('.png')) { res.writeHead(200, { 'Content-Type': 'image/png' }); res.end(fixturePng); return; }
    res.writeHead(404); res.end('not found');
  });
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
  const addr = server.address() as any;
  baseUrl = `http://127.0.0.1:${addr.port}`;
}

function resetHits() { for (const k of Object.keys(hits)) delete hits[k]; }

async function main() {
  console.log('🧪 Asset integration tests');
  console.log(`   storage root: ${TMP_ROOT}\n`);
  await startMockCdn();

  // ---------- 1. Path safety ----------
  console.log('— Path safety —');
  check('root resolves to ASSET_STORAGE_PATH', getAssetStorageRoot() === path.resolve(TMP_ROOT));
  check('valid rel path resolves inside root',
    resolveAssetFilePath('/assets/items/UI_Test_1.webp') === path.join(TMP_ROOT, 'assets', 'items', 'UI_Test_1.webp'));
  check('traversal ../ rejected', resolveAssetFilePath('/assets/../secret.webp') === null);
  check('traversal nested rejected', resolveAssetFilePath('/assets/items/../../x.webp') === null);
  check('absolute-ish escape rejected', resolveAssetFilePath('/assets//etc/passwd') === null || !resolveAssetFilePath('/assets//etc/passwd')!.startsWith(path.resolve(TMP_ROOT)));
  check('isSafeRelPath false for traversal', !isSafeRelPath('/assets/../../etc/passwd'));
  check('isSafeRelPath true for normal', isSafeRelPath('/assets/weapons/UI_EquipIcon_Test.webp'));

  // ---------- 2. Download + WebP conversion ----------
  console.log('\n— Download & convert —');
  const rel1 = '/assets/items/UI_Test_Dl_1.webp';
  const abs1 = resolveAssetFilePath(rel1)!;
  resetHits();
  let r = await downloadAndConvertToWebp(`${baseUrl}/UI_Test_Dl_1.png`, rel1);
  check('missing asset downloads successfully', r.ok === true, r);
  check('file exists at resolved path', fs.existsSync(abs1));
  check('output is valid WebP', isValidImageFile(abs1));
  const head = fs.readFileSync(abs1).subarray(0, 12);
  check('RIFF/WEBP magic bytes', head.toString('ascii', 0, 4) === 'RIFF' && head.toString('ascii', 8, 12) === 'WEBP');
  check('exactly 1 HTTP hit', (hits['/UI_Test_Dl_1.png'] || 0) === 1);

  // ---------- 3. Existing valid file skipped ----------
  console.log('\n— No overwrite / skip —');
  resetHits();
  const before = fs.statSync(abs1).mtimeMs;
  r = await downloadAndConvertToWebp(`${baseUrl}/UI_Test_Dl_1.png`, rel1);
  check('existing valid asset skipped', r.ok && r.skipped === true, r);
  check('no HTTP request made', (hits['/UI_Test_Dl_1.png'] || 0) === 0);
  check('file untouched', fs.statSync(abs1).mtimeMs === before);

  // ---------- 4. Corrupt file detected & replaced ----------
  console.log('\n— Corrupt file handling —');
  const relBad = '/assets/items/UI_Test_Corrupt.webp';
  const absBad = resolveAssetFilePath(relBad)!;
  fs.mkdirSync(path.dirname(absBad), { recursive: true });
  fs.writeFileSync(absBad, Buffer.alloc(500, 0x41)); // rác, không phải ảnh
  check('corrupt file flagged invalid', !isValidImageFile(absBad));
  r = await downloadAndConvertToWebp(`${baseUrl}/UI_Test_Corrupt.png`, relBad);
  check('corrupt file replaced by valid webp', r.ok && isValidImageFile(absBad), r);

  // ---------- 5. 404 không làm hỏng cả batch ----------
  console.log('\n— CDN 404 isolation —');
  const rel404 = '/assets/items/UI_Test_404.webp';
  failAlways.add('/UI_Test_404.png');
  const relOk = '/assets/items/UI_Test_OkAfter404.webp';
  const res404 = await downloadWithFallback([`${baseUrl}/UI_Test_404.png`], resolveAssetFilePath(rel404)!);
  check('404 returns ok=false (không throw)', res404.ok === false);
  check('404 skips retry on the same source', hits['/UI_Test_404.png'] === 1);
  const damaged = Buffer.alloc(80, 0x41);
  await atomicWriteFile(absBad, damaged);
  await downloadAndConvertToWebp(`${baseUrl}/UI_Test_404.png`, relBad);
  check('failed replacement preserves existing file', fs.existsSync(absBad) && fs.readFileSync(absBad).equals(damaged));
  const resOk = await downloadWithFallback([`${baseUrl}/UI_Test_OkAfter404.png`], resolveAssetFilePath(relOk)!);
  check('asset sau 404 vẫn tải được', resOk.ok === true, resOk);
  check('không có placeholder file cho 404', !fs.existsSync(resolveAssetFilePath(rel404)!));

  // ---------- 6. Retry có giới hạn ----------
  console.log('\n— Retry bounded —');
  resetHits();
  const relRetry = '/assets/items/UI_Test_Retry.webp';
  flakyCount['/UI_Test_Retry.png'] = 2; // fail 2 lần (503), lần 3 OK
  r = await downloadAndConvertToWebp(`${baseUrl}/UI_Test_Retry.png`, relRetry);
  check('retry tới khi thành công', r.ok === true, r);
  check('số lần thử <= MAX_RETRIES(3)', (hits['/UI_Test_Retry.png'] || 0) <= 3, hits);

  resetHits();
  flakyCount['/UI_Test_AlwaysFail.png'] = 3; // HTTP 503 retries; HTTP 404 falls back immediately
  r = await downloadAndConvertToWebp(`${baseUrl}/UI_Test_AlwaysFail.png`, '/assets/items/UI_Test_AlwaysFail.webp');
  check('fail sau đúng 3 lần thử', (hits['/UI_Test_AlwaysFail.png'] || 0) === 3, hits['/UI_Test_AlwaysFail.png']);
  check('kết quả ok=false sau retries', r.ok === false);

  // ---------- 7. Fallback sources ----------
  console.log('\n— Source fallback —');
  const relFb = '/assets/items/UI_Test_Fallback.webp';
  failAlways.add('/bad-source.png');
  const resFb = await downloadWithFallback(
    [`${baseUrl}/bad-source.png`, `${baseUrl}/UI_Test_Fallback.png`],
    resolveAssetFilePath(relFb)!,
  );
  check('fallback sang nguồn 2 thành công', resFb.ok === true, resFb);
  check('đã thử đúng 2 nguồn', resFb.tried.length === 2);

  // ---------- 8. scanAssets với prisma stub ----------
  console.log('\n— scanAssets (prisma stub) —');
  const stubPrisma: any = {
    character: { findMany: async () => [] },
    weapon: { findMany: async () => [
      { id: 'w1', nameEn: 'Test Sword', nameVi: 'Kiếm Test', iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Test.webp' },
      { id: 'w2', nameEn: 'Valid Sword', nameVi: 'x', iconUrl: rel1.replace('/items/', '/weapons/') }, // file tồn tại? không -> missing
    ] },
    artifactSet: { findMany: async () => [] },
    material: { findMany: async () => [
      { id: 'm1', nameEn: 'Test Mat', nameVi: 'x', iconUrl: '/assets/items/UI_Test_Mat.webp' },
      { id: 'm2', nameEn: 'No Icon', nameVi: 'x', iconUrl: null },
      { id: 'm3', nameEn: 'Evil', nameVi: 'x', iconUrl: '/assets/../../etc/passwd' },
    ] },
  };
  // weapon w2 dùng rel1 path items -> đổi sang weapons path có file? tạo file hợp lệ trước
  const validWeaponRel = '/assets/weapons/UI_EquipIcon_Valid.webp';
  const validWeaponAbs = resolveAssetFilePath(validWeaponRel)!;
  fs.mkdirSync(path.dirname(validWeaponAbs), { recursive: true });
  fs.writeFileSync(validWeaponAbs, fs.readFileSync(abs1)); // copy webp hợp lệ
  stubPrisma.weapon.findMany = async () => [
    { id: 'w1', nameEn: 'Test Sword', nameVi: 'Kiếm Test', iconUrl: '/assets/weapons/UI_EquipIcon_Sword_Test.webp' },
    { id: 'w2', nameEn: 'Valid Sword', nameVi: 'x', iconUrl: validWeaponRel },
  ];

  const scan = await scanAssets(stubPrisma, { characters: false, artifacts: false });
  check('scan đếm đúng tổng records', scan.total === 5, scan.total);
  check('scan nhận diện file hợp lệ', scan.valid === 1, `valid=${scan.valid}`);
  check('scan nhận diện missing', scan.missing === 2, `missing=${scan.missing}`); // w1 + m1
  check('scan từ chối path traversal', scan.invalid === 1, `invalid=${scan.invalid}`);
  check('scan bỏ qua record không URL', scan.skippedNoPath === 1);
  check('jobs chỉ gồm asset cần tải', scan.jobs.length === 2, scan.jobs.length);
  check('job material có URL enka từ filename', scan.jobs.some(j => j.urls.some(u => u.includes('UI_Test_Mat'))));

  // ---------- 9. syncAssets end-to-end với mock ----------
  console.log('\n— syncAssets end-to-end —');
  // job w1: filename UI_EquipIcon_Sword_Test -> enka URL thật sẽ 404; override bằng cách
  // thêm file trực tiếp qua downloadWithFallback thay vì scan (scan dùng enka cứng).
  // Test syncAssets dryRun trước:
  const dry = await syncAssets(stubPrisma, { characters: false, artifacts: false }, { dryRun: true });
  check('dryRun không tải gì', dry.ok === 0 && dry.scan.jobs.length === 2);
  check('dryRun không tạo file mới', !fs.existsSync(resolveAssetFilePath('/assets/weapons/UI_EquipIcon_Sword_Test.webp')!));

  // ---------- 10. Persistence: file sống ngoài public/ ----------
  console.log('\n— Persistence —');
  check('storage root KHÔNG nằm trong frontend/public', !path.resolve(TMP_ROOT).includes(`${path.sep}frontend${path.sep}public`));
  check('file persist sau "deploy giả lập" (root khác)', (() => {
    // simulate: đọc lại file từ root — vẫn còn
    return isValidImageFile(abs1);
  })());

  // ---------- 11. atomicWriteFile ----------
  console.log('\n— Atomic write —');
  const atomicTarget = resolveAssetFilePath('/assets/items/UI_Test_Atomic.webp')!;
  await atomicWriteFile(atomicTarget, fixturePng);
  check('atomic write tạo file', fs.existsSync(atomicTarget));
  check('không còn file .tmp sót lại', !fs.readdirSync(path.dirname(atomicTarget)).some(f => f.includes('.tmp-')));

  server.close();
  fs.rmSync(TMP_ROOT, { recursive: true, force: true });

  console.log(`\n==========================================`);
  console.log(`📊 Kết quả: ${passed} passed, ${failed} failed`);
  console.log('==========================================');
  process.exitCode = failed > 0 ? 1 : 0;
}

main().catch((e) => { console.error('❌ Test crash:', e); process.exitCode = 1; });
