# Kiểm kê và đồng bộ dữ liệu GenshinHub

Kết quả ngày 19/11/2026 trên nhánh `feat/genshin-db-upgrade`. Dữ liệu development đến từ PostgreSQL Docker trên loopback. E2E ghi vào một PostgreSQL test riêng.

## Tiến độ kế thừa

- `e44918a` đưa vào detector, ghi dữ liệu game, báo cáo diff, snapshot và endpoint ISR. `cb515d7` thêm kho asset persistent, WebP và kiểm thử asset. `250e3ff` cấu hình CircleCI cho build, lint, asset integration và E2E. Cả bốn job CircleCI có trạng thái success trên commit `250e3ff`. Vercel báo failure trên commit đó. Các thay đổi hiện tại ở working tree chưa có kết quả CI.
- Khi bắt đầu, working tree có thay đổi `frontend/tsconfig.tsbuildinfo` và file `CODEX_TASK.md` chưa được track. Cả hai được giữ nguyên. Index trống ở thời điểm bắt đầu.
- Đợt này nâng package, kiểm tra semver từ npm, bổ sung adapter Item Yatta theo catalog seed, lưu snapshot trước khi transaction commit, khóa ghi đồng thời, rollback trong transaction, bảo toàn URL asset đã cấu hình và ngăn download 404 xóa file cũ. Cấu hình Prisma ưu tiên giá trị môi trường truyền tường minh.

## Database Sync Coverage

PostgreSQL development đã được backup và phục hồi sang PostgreSQL test trước khi ghi. Số lượng dưới đây được đếm trực tiếp ở bản phục hồi và development sau sync. Các bản ghi và trường bảo vệ cũ được so sánh theo ID giữa hai database.

| Model | Nhóm | Trước → Sau | Nguồn và coverage | Trường sync được phép | Trường bảo vệ |
| --- | --- | ---: | --- | --- | --- |
| Character | Game | 125 → 131 | genshin-db. 124 khớp nguồn, 7 Traveler legacy | Tên, danh hiệu, mô tả EN/VI, rarity, element, weapon, region, birthday, fandomUrl, baseHp/baseAtk/baseDef. Điền URL asset còn trống khi có dữ liệu thích hợp | ID legacy, URL đã cấu hình, tier, role, recommendedC, tierNoteEn/Vi, signatureWeapons, talentPriority, sands/goblet/circlet, subStatsPriority, stats, ascensionMats, talentMats và quan hệ build/team |
| Weapon | Game | 279 → 279 | genshin-db. 253 khớp nguồn, 26 bản ghi legacy được giữ | Tên, rarity, type, baseAtk, subStat, subStatValue, tên/mô tả passive. Điền iconUrl trống | ID cũ, tier, role, iconUrl đã cấu hình |
| ArtifactSet | Game | 63 → 63 | genshin-db. 63 khớp nguồn | Tên, rarityList, mô tả hiệu ứng 2/4 món EN/VI. Điền iconUrl trống | ID cũ và iconUrl đã cấu hình |
| Material | Game / Item | 861 → 862 | genshin-db + Yatta EN/VI. 860 khớp nguồn, 2 legacy, 5 ứng viên pending | Tên, rarity có nguồn, điền iconUrl trống. `type` chỉ khi tạo | ID, type và iconUrl đã cấu hình của bản ghi cũ |
| CharacterWeapon | Admin | 604 → 604 | Seed và Admin. Quan hệ với Character, weaponId tham chiếu logic | — | Toàn bộ |
| CharacterArtifact | Admin | 276 → 276 | Seed và Admin. Quan hệ với Character, bộ gợi ý theo tên | — | Toàn bộ |
| CharacterTeam | Admin | 251 → 251 | Seed và Admin. Quan hệ với Character | — | Toàn bộ |
| TeamMember | Admin | 1004 → 1004 | Seed và Admin. Quan hệ với CharacterTeam | — | Toàn bộ |
| TierRank | Admin | 0 → 0 | Cấu hình Admin | — | Toàn bộ |
| User | Người dùng | 0 → 0 | Đăng ký, OAuth, hồ sơ và `gachaStats` JSON | — | Toàn bộ |
| UserFavorite | Người dùng | 0 → 0 | Thao tác người dùng, FK User, itemId theo loại | — | Toàn bộ |
| UserWishlist | Người dùng | 0 → 0 | Thao tác người dùng, FK User, itemId theo loại | — | Toàn bộ |
| UserTeam | Người dùng | 0 → 0 | Thao tác người dùng, FK User và mảng slug nhân vật | — | Toàn bộ |
| Otp | Hệ thống | 0 → 0 | Luồng xác thực | — | Toàn bộ |

Schema có bốn model game. Item dùng chung bảng Material. Artifact Pieces, Skills, Talents, Constellations, Enemy/Boss/Drop, Domains, Food/Recipes và Achievements cần model, mapping và giao diện được review nếu đưa vào database. GraphQL có các trường JSON build của Character, nhưng nguồn game không ghi đè các trường này. Element và region hiện là thuộc tính của Character. TCG có luồng frontend riêng, ngoài bốn bảng trên. Materials có trang danh sách và tìm kiếm, không có trang chi tiết riêng.

## Vì sao danh sách có 125 nhân vật

Trước khi ghi, Prisma và Apollo đều trả 125. Resolver dùng `findMany` không có `take`. Next.js lấy mảng GraphQL để tính tổng và gallery tải thêm 30 thẻ mỗi lần. Báo cáo của Devin trên `5.2.11` ghi 117 nhân vật khớp nguồn, 7 Traveler legacy và một Sandrone đã seed. Hai bản ghi nguồn Aether/Lumine có ID game riêng, nhưng dự án dùng các hồ sơ Traveler hiện có và giữ hai slug legacy của Manekin/Manekina. Các ID legacy được giữ để bảo toàn liên kết.

| Danh mục | Raw 5.2.11 | Raw 5.2.15 | Detector sau sync | Prisma và Apollo sau sync | Next.js |
| --- | ---: | ---: | --- | ---: | --- |
| Character | 119 | 126 | 124, giữ 7 Traveler legacy | 131 | Header 131, gallery tải tới 131 |
| Weapon | 236 (234 tên riêng) | 256 (254 tên riêng) | 253, giữ 26 legacy | 279 | 269 với bộ lọc mặc định, tải đủ 279 khi bật 1–2 sao, có detail |
| ArtifactSet | 61 | 63 | 63 | 63 | Danh sách 63 và detail |
| Material / Item | 849 (836 tên riêng) | 921 (906 tên riêng) | 860 khớp, 5 pending, giữ 2 legacy | 862 | 862 thẻ và tìm theo tên |

Nguồn raw gồm tên lặp và danh mục ngoài scope của adapter. Weapon bỏ các bản trùng/không thể obtain. Adapter genshin-db xét vật liệu nâng cấp và đột phá, còn Yatta phủ thêm catalog Item đã được seed. Hai danh mục EN/VI của Yatta có 832 ID. Tất cả 832 đã tồn tại trong development, 373 IDs bổ sung vào coverage detector. Dry-run cuối có 0 create và 0 update cho cả bốn model.

### Bản ghi mới được ghi vào development

| Tên | ID GenshinHub | ID game |
| --- | --- | ---: |
| Alyosha | `alyosha` | 10000148 |
| Mitya | `mitya` | 10000136 |
| Odette | `odette` | 10000150 |
| Valeriy | `valeriy` | 10000137 |
| Vesna | `vesna` | 10000143 |
| Vodyanitsa | `vodyanitsa` | 10000140 |
| Tea-Scented Tassel | `200129` | 200129 |

Sandrone được cập nhật theo bản ghi sẵn có. Lần apply chính cập nhật ba Character, 27 Weapon và ba ArtifactSet. Lần apply bổ sung gắn splash đã tải cho Mitya và Valeriy. Mitya và Valeriy được xác nhận trong thông báo chính thức về Genshin 7.2. Phiên bản cũ `5.2.11` và bản mới `5.2.15` đều được đọc trực tiếp từ package. Không có lỗi tương thích khi chạy adapter, build TypeScript và integration đã thực hiện. [Thông báo Genshin 7.2](https://genshin.hoyoverse.com/en/news/detail/167187) · [Lịch banner giai đoạn I](https://genshin.hoyoverse.com/m/en/news/detail/167139) · [npm genshin-db](https://www.npmjs.com/package/genshin-db?activeTab=versions)

## Assets và pending

- Kiểm kê trước sync tái hiện đúng 198 material icons thiếu. Sau khi có Tea-Scented Tassel, cần xử lý 199 icon. Tải thành công 193, còn sáu lỗi HTTP 404. Mười hai ảnh avatar/splash của sáu nhân vật đã được lưu. Kiểm kê cuối quét 1.335 bản ghi và thấy 1.460 ảnh hợp lệ, sáu ảnh thiếu, không có ảnh hỏng.
- Sáu icon thiếu là `200116` Martens’ Omni-Fix, `200117` Dandelion Bookmark, `200118` Surging Sacred Chalice, `200119` Super-Duper Invincible Shining Sparkly Magic Crystal, `200120` Exalted Earth và `200121` Cam and Cables of Law. Hai CDN trả 404 và catalog Item Yatta không chứa các ID này.
- Năm Material pending do chưa xác thực rarity là Crimson Agate (Display) `107011`, Lumenspar `107016`, Moonchase Charm `107015`, Spirit Carp `107026` và Cryoculus `107035`. Hai dòng chỉ có trong DB tiếp tục nằm trong báo cáo diff.

## Character ascension/talent materials

`ascensionMats` và `talentMats` vẫn là protected fields của sync engine thông thường. Một pipeline riêng, chỉ chạy thủ công trên dev/test, đọc `characters().costs` và `talents().costs` từ `genshin-db` đã pin version để điền **duy nhất các field đang trống**:

```bash
npm run test:mats                 # unit test chuyển đổi costs -> rows
node --env-file=.env node_modules/ts-node/dist/bin.js scripts/sync/materialBackfill.ts --validate --dry-run --report ../docs/CHARACTER_MATERIALS_AUDIT.md
node --env-file=.env node_modules/ts-node/dist/bin.js scripts/sync/materialBackfill.ts --sync --validate --report ../docs/CHARACTER_MATERIALS_AUDIT.md
node --env-file=.env node_modules/ts-node/dist/bin.js scripts/sync/materialBackfill.ts --verify --report ../docs/CHARACTER_MATERIALS_AUDIT.md
```

Pipeline kiểm tra: đúng 6 mốc đột phá / 9 cấp thiên phú, Mora tách riêng, materialId phải có trong `Material` catalog và icon WebP local, không trùng ID, count dương, không ghi đè field có sẵn. Mỗi lần `--sync` tạo snapshot riêng trong `backend/backups/material_backfill_*.json`; rollback bằng lệnh trong `package.json`. Lệnh ghi bị từ chối nếu `DATABASE_URL` không trỏ tới localhost/loopback. Không có cron/workflow nào gọi pipeline này trên production.

Mapping đặc biệt: `traveler` dùng `characters(Aether).costs` + `talents(Traveler (Anemo)).costs`; các `traveler-<element>` dùng `characters(Aether).costs` + `talents(Traveler (<Element>)).costs`. `traveler-boy`/`traveler-girl` là slug legacy của Manekin/Manekina — mannequin của Miliastra Wonderland (v6.1) lên cấp qua Wonderland Level và **không cần nguyên liệu** ([Fandom](https://genshin-impact.fandom.com/wiki/Wonderland_Manekin)); pipeline lưu `[]` đã kiểm chứng cho cả hai field thay vì `null`, nên frontend phân biệt được "không cần nguyên liệu" với "chưa công bố". Không có nhân vật nào còn pending.

## Chạy lại trên development

Xác minh `.env` trỏ đến PostgreSQL development trước khi chạy. Từ `backend/`:

```bash
npm run sync:version
node --env-file=.env node_modules/ts-node/dist/bin.js scripts/sync/syncEngine.ts --validate --dry-run
node --env-file=.env node_modules/ts-node/dist/bin.js scripts/sync-assets.ts
```

Sau khi review diff, backup và phục hồi thử trên PostgreSQL test, chạy:

```bash
node --env-file=.env node_modules/ts-node/dist/bin.js scripts/sync/syncEngine.ts --sync --download-assets
node --env-file=.env node_modules/ts-node/dist/bin.js scripts/sync-assets.ts --sync
```

Lần chạy development này lưu dump quyền `0600` ở `/tmp/genshinhub-development-before.dump` và snapshot riêng ở `/tmp/genshinhub-development-snapshots/`. Để test rollback, dùng đúng file của lần chạy cần phục hồi, thử trên bản sao database trước. Rollback lần có nhiều snapshot theo thứ tự ngược. Giữ backup khỏi thư mục public và Git.

## Kết quả kiểm thử

- Backend Prisma generate, Prisma validate và build TypeScript ra thư mục tạm đạt. Frontend TypeScript và lint đạt, lint còn cảnh báo hiện có.
- Asset Integration 41/41, Data Sync E2E 28/28 và version checker 2/2. E2E bao gồm lỗi giữa batch, dry-run adapter Item, GraphQL, idempotence và rollback bốn model game. npm registry xác nhận `5.2.15` đang là latest.
- Playwright trên Next.js development xác nhận gallery tải từ 30 đến 131, tìm Valeriy và mở trang chi tiết, tải đủ 279 Weapon và 63 ArtifactSet, tìm kiếm và mở detail của cả hai danh mục, hiển thị 862 Material và tìm Tea-Scented Tassel, WebP local và phản hồi HTTP 200 của ISR revalidate.
- Các file chính đã thay đổi nằm trong `backend/scripts/sync/`, CLI asset, Prisma client bootstrap, downloader/storage, route `frontend/app/assets/[...path]/route.ts`, các Dockerfile và template `deploy/vps/`. Bổ sung 205 file WebP dưới `frontend/public/assets/`.

## Triển khai và CI

- [VPS_DEPLOYMENT.md](VPS_DEPLOYMENT.md) mô tả các template trong [deploy/vps](../deploy/vps). Timer tự chạy check; apply yêu cầu phiên bản nguồn đã phê duyệt và chạy thủ công. Phiên bản dependency lên VPS phải đến từ build đã được kiểm thử.
- Chạy lại trên CircleCI các job `backend-build`, `frontend-lint`, `asset-integration-tests` và `e2e-tests` khi nhánh được push theo quy trình review. Thêm `npm run test:sync:version` vào lần kiểm thử review. Schema GraphQL và Prisma không đổi nên không chạy codegen hay migration.
- Đã chạy nhánh check của script trên development, xác thực systemd units/timer, merge Compose config và chạy `nginx -t` cục bộ. Image backend build thành công và Prisma trong image đếm được 124 Character trên PostgreSQL test. Chưa build image frontend, chạy toàn stack Compose hoặc apply qua service systemd thực tế.
- `npm ci` báo 17 cảnh báo audit trong cây backend, gồm 14 ở dependency runtime. Chưa phân loại hoặc nâng các dependency khác trong lần sync này.
- Trước khi deploy thật, dựng staging để kiểm tra quyền DB, direct endpoint, restore, TLS, quyền volume, build images, ISR và quy trình apply/rollback qua service. Các unit và Nginx mới được kiểm tra cục bộ. Chưa có lần chạy trên Oracle VPS.

## Xác minh cuối trước khi cập nhật PR #2

- HoYoverse công bố cả sáu bản ghi mới là nhân vật chơi được. Alyosha và Odette thuộc 7.0, Vesna và Vodyanitsa thuộc 7.1, Mitya và Valeriy thuộc 7.2. Bảy hồ sơ Traveler trong bảng là biến thể legacy. Tổng số 131 đếm hồ sơ hiển thị, vì vậy có cả biến thể Traveler. Dry-run trên nguồn đã pin không có ứng viên Character mới hoặc pending. Schema hiện chưa có trường phân loại NPC hoặc trạng thái phát hành. [7.0](https://genshin.hoyoverse.com/en/news/detail/165610) · [7.1](https://genshin.hoyoverse.com/tr/news/detail/166383) · [7.2](https://genshin.hoyoverse.com/en/news/detail/167187)
- Chạy lại Prisma validation/build, frontend TypeScript/lint, E2E 28/28, asset integration 41/41 và version checker 2/2. Playwright xác nhận 131 thẻ Character, tìm kiếm, detail, các trang Weapon/Artifact/Material và revalidation. Route asset đọc WebP từ root persistent tạm và trả 404 cho file thiếu. Sharp giải mã đủ 205 WebP mới.
- CircleCI bổ sung bước Prisma validation và version checker. E2E dùng PostgreSQL sidecar `genshinhub_test` và Apollo cục bộ. Các bước Playwright và kiểm tra route persistent được chạy cục bộ. Kết quả CircleCI của commit cũ không áp dụng cho commit mới.
- PR #2 đang mở và trỏ tới `cb515d7`. Nhánh này chứa commit đó và `250e3ff`, vì vậy có thể cập nhật PR #2 bằng fast-forward sau khi được phép push. [PR #2](https://github.com/AnhhTuann/GenshinHub/pull/2)
