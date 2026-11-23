---
name: genshin-data-sync
description: >
  Đồng bộ dữ liệu game Genshin Impact (nhân vật, vũ khí, artifact set, vật liệu)
  từ thư viện `genshin-db` vào database GenshinHub một cách AN TOÀN:
  non-destructive upsert, bảo vệ tuyệt đối dữ liệu do Admin chỉnh sửa
  (tier list, đội hình meta, build tối ưu), dry-run diff detection,
  snapshot rollback, tải assets WebP, GitHub Actions PR workflow và
  on-demand ISR revalidation cho Next.js.
  Trigger khi user yêu cầu: sync data Genshin, cập nhật nhân vật/vũ khí mới,
  chạy dry-run, kiểm tra chênh lệch genshin-db, rollback dữ liệu,
  revalidate cache frontend, hoặc bảo trì pipeline auto-sync.
---

# genshin-data-sync

Skill vận hành pipeline đồng bộ dữ liệu game cho GenshinHub.

## Nguyên tắc bất biến (KHÔNG ĐƯỢC VI PHẠM)

1. **Non-destructive**: tuyệt đối không `deleteMany`/xóa trên `Character`,
   `Weapon`, `ArtifactSet`, `Material`. Bản ghi trong DB không có trong nguồn
   chỉ được LIỆT KÊ trong báo cáo, không bị xóa (có thể là dữ liệu Admin/manual).
2. **Bảo vệ dữ liệu Admin 100%** — các trường sau KHÔNG BAO GIỜ bị sync ghi đè:
   - `Character`: `tier`, `role`, `recommendedC`, `tierNoteEn`, `tierNoteVi`,
     `talentPriority`, `signatureWeapons`, `sands`, `goblet`, `circlet`,
     `subStatsPriority`, `stats`, `ascensionMats`, `talentMats`,
     `bestWeapons`, `bestArtifacts`, `teams`.
   - `Weapon`: `tier`, `role`.
3. **Không bịa dữ liệu**: chỉ số lấy từ `genshin-db` hàm `stats(90, 6)`
   (Lv.90 / Ascension max). Thiếu dữ liệu → đánh `pending`/warning,
   không tạo số liệu giả, không tạo build giả.
4. **ID ổn định**: Character dùng slug qua `toId()` + `forcedIdMap`
   (`lanyan`, `yumemizu`, `momoka`, `traveler-boy`, `traveler-girl`...).
   Weapon/ArtifactSet/Material dùng ID số `gi.yatta.moe`; bản ghi mới phải
   resolve được ID yatta, nếu không sẽ bỏ qua và báo pending.
5. **Snapshot trước khi ghi**: mọi lần `--sync` tự động lưu
   `backend/backups/snapshot_before_sync_<timestamp>.json` chứa toàn bộ
   trạng thái trước đó của các bản ghi bị ảnh hưởng → rollback được.
6. **Production chỉ thay đổi sau phê duyệt**: GitHub Actions cron chỉ chạy
   `--dry-run` + mở PR. Job `sync-and-revalidate` dùng GitHub Environment
   `production` (cấu hình Required reviewers trong repo settings).
7. **Không commit secrets**: `DATABASE_URL`, `REVALIDATE_SECRET`,
   `FRONTEND_REVALIDATE_URL` chỉ nằm trong GitHub Secrets / `.env`.

## Kiến trúc

```
genshin-db (v5.x, game data EN/VI)
   │  detectChanges()  — so sánh normalized-name + slug-id
   ▼
backend/scripts/sync/detector.ts   → SyncReport (create/update/unchanged + warnings)
   │
   ├─ --dry-run   → logs/sync_report_<ts>.md (không ghi DB, không tải ảnh)
   ├─ --validate  → kiểm tra payload không chứa protected fields, stats hợp lệ
   ├─ --sync      → snapshot → prisma upsert (chỉ game fields)
   └─ --download-assets → tải PNG nguồn → sharp → WebP q80 vào frontend/public
   │
   ▼
frontend/app/api/revalidate/route.ts  (POST, Bearer REVALIDATE_SECRET)
   → revalidatePath cho /characters /weapons /artifacts /materials /tierlist ...
```

## Chạy lệnh

Từ `backend/` (cần `DATABASE_URL` trong `.env`):

```bash
npm run sync:check       # dry-run: diff report, KHÔNG ghi DB
npm run sync:validate    # dry-run + validation report
npm run sync:run         # sync thật + tải assets (ghi DB!)
npm run sync:rollback -- backups/snapshot_before_sync_<ts>.json

# Tùy chọn nâng cao:
npx ts-node scripts/sync/syncEngine.ts --sync --only characters
npx ts-node scripts/sync/syncEngine.ts --dry-run --report /tmp/report.md
```

## Khi có nhân vật/vũ khí/artifact mới

1. `npm run sync:check` → đọc `backend/logs/sync_report_*.md`.
2. Kiểm tra warnings: `pending` nghĩa là thiếu stats/ID — KHÔNG bịa bổ sung.
3. `npm run sync:run` trên **development DB** trước.
4. Verify GraphQL trả dữ liệu mới (query `characters`, `weapons`, `artifactSets`).
5. Admin tự gán `tier`, `bestWeapons`, `teams`... sau — sync không đụng.
6. Production: merge PR report hoặc chạy workflow `sync-and-revalidate`
   (cần approval environment `production`).

## GitHub Actions

- `.github/workflows/genshin-data-sync.yml`
  - Cron `0 3 * * *`: dry-run → PR `chore(data): sync new Genshin Impact data`.
  - `workflow_dispatch` `action=sync-and-revalidate`: sync DB prod + POST
    `${FRONTEND_REVALIDATE_URL}` với `REVALIDATE_SECRET`.
- Frontend env cần: `REVALIDATE_SECRET` (khớp GitHub Secret cùng tên).

## Rollback

```bash
npm run sync:rollback -- backups/snapshot_before_sync_<ts>.json
```

Snapshot chứa `before` của mọi bản ghi update và danh sách create để xóa
(cascade thủ công CharacterWeapon/Artifact/Team trước khi xóa Character).

## Kiểm tra phiên bản nguồn

Engine luôn in `genshin-db version` trong report (`genshinDbVersion`).
Khi nâng cấp `genshin-db`, chạy `npm run sync:check` để phát hiện
diff do thay đổi format dữ liệu trước khi sync.

## Material sync

- Material match theo tên chuẩn hóa -> update `nameEn/nameVi/rarity/iconUrl`
  (không ghi đè `type`).
- Material MỚI: ưu tiên resolve ID + type + icon từ `gi.yatta.moe`; nếu yatta
  chưa có (item region mới), fallback sang **game item ID của genshin-db**
  (cùng namespace ID game, KHÔNG phải ID bịa) + `type` best-effort từ
  `typeText`/`category` + icon `/assets/items/<filename>.webp`.
- Material thiếu `rarity` từ nguồn -> action `pending`, không tạo (không bịa).
- Action `pending` xuất hiện trong report chi tiết nhưng KHÔNG kích hoạt PR
  và KHÔNG bị apply — dùng để theo dõi dữ liệu nguồn chưa đủ.

## Assets & nguồn ảnh fallback

- Storage root: `ASSET_STORAGE_PATH` env (mặc định `frontend/public` ở dev,
  nên trỏ ra persistent dir trên VPS — xem `docs/VPS_DEPLOYMENT.md`).
- `src/utils/assetStorage.ts` resolve public path `/assets/...` -> file trong
  root, chặn path traversal; `src/utils/imageDownloader.ts` download ->
  validate (sharp metadata + magic bytes) -> WebP q80 -> atomic write
  (temp + rename), retry 3 lần, KHÔNG ghi đè file hợp lệ.
- `scripts/sync/assetSync.ts` quét TOÀN BỘ asset URLs trong DB (character
  avatar/splash, weapon/artifact/material icon) — dùng bởi
  `npm run sync:assets:check` (check-only) và `npm run sync:assets`.
- Mỗi asset thử lần lượt: URL trực tiếp mihoyo (nếu genshin-db cung cấp)
  -> Enka CDN (`enka.network/ui/<filename>.png`, suy ra từ filename local
  cho weapon/artifact/material; genshin-db images + Enka characters.json
  cho character avatar/splash).
- Chỉ ghi file khi download + convert WebP thành công và file hợp lệ;
  KHÔNG ghi đè asset đã tồn tại; file hỏng/0-byte bị thay thế an toàn.
- Icon không tải được từ mọi nguồn -> liệt kê trong báo cáo (không ghi
  placeholder giả); CDN 404/timeout không làm hỏng cả batch.
- Test: `npm run test:assets` (mock CDN, 39 checks).

## Dependabot & nâng cấp genshin-db

- `.github/dependabot.yml` kiểm tra `backend/` hằng ngày -> PR nâng cấp
  `genshin-db` (không auto-merge). Phiên bản thực tế luôn đọc động từ
  `genshin-db/package.json` đã cài — không hardcode.
- Sau khi merge PR nâng cấp thư viện, chạy `Genshin Data Sync — Check`
  để phát hiện diff dữ liệu. Hai việc (nâng cấp lib vs sync data) tách biệt.

## GitHub Actions (2 workflow tách biệt)

- `genshin-data-sync.yml` (CHECK): cron 03:00 UTC + dispatch dry-run.
  Report ghi `backend/reports/` (committable) + artifact. Chỉ mở PR khi có
  create/update thật — không tạo PR rỗng, không phụ thuộc `logs/` bị ignore.
- `genshin-data-sync-apply.yml` (APPLY): chỉ `workflow_dispatch`, bắt buộc
  environment `production` (cấu hình Required reviewers). Tự `pg_dump`
  backup -> upload artifact trước khi sync, rồi sync + revalidate.
- Secrets chỉ nằm trong GitHub Secrets; check workflow không ghi DB.

## Rollback

```bash
npm run sync:rollback -- backups/snapshot_before_sync_<ts>.json
```

Snapshot chứa `before` của mọi bản ghi update và danh sách create để xóa
(cascade thủ công CharacterWeapon/Artifact/Team trước khi xóa Character).
Lưu ý: rollback theo đúng snapshot đã chọn — snapshot 'update' chỉ restore,
snapshot 'create' mới xóa bản ghi mới.

## Chạy trên VPS (tương lai, self-host)

Engine là CLI thuần Node — không phụ thuộc Vercel/Render:

```bash
# cron ví dụ (mỗi ngày 03:00 UTC)
0 3 * * * cd /opt/genshinhub/backend && npm run sync:check >> /var/log/genshin-sync.log 2>&1
# sync định kỳ (sau review report thủ công):
0 4 * * 3 cd /opt/genshinhub/backend && npm run sync:run >> /var/log/genshin-sync.log 2>&1
# hoặc systemd timer tương đương
```

Yêu cầu VPS: Node 20+, PostgreSQL reachable, `DATABASE_URL` trong `.env`,
`ASSET_STORAGE_PATH` trỏ persistent dir (khuyến nghị `/srv/genshinhub/assets`,
Nginx `location /assets/` alias tới đó — fallback route
`frontend/app/assets/[...path]` cũng đọc được), `REVALIDATE_SECRET` khớp
frontend env. Revalidate endpoint là Next.js thường — hoạt động self-host,
không cần Vercel. pg_dump định kỳ nên chạy độc lập (cron riêng, mã hóa
trước khi lưu offsite) — snapshot JSON không thay thế database backup.
Chi tiết: `docs/VPS_DEPLOYMENT.md`.

## E2E test

```bash
npm run sync:e2e   # backend/scripts/sync/e2e.test.ts
```

Fixture giả (prefix E2E-, ID 998xxx) chạy trên dev DB: tạo -> verify Prisma +
GraphQL -> bảo vệ admin fields -> idempotent -> detector unmatched ->
rollback -> cleanup. Cần backend GraphQL ở :4000.
