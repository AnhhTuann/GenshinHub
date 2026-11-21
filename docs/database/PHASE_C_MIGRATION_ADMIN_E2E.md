# Phase C — Migration history, fresh bootstrap và Admin Multi-Build E2E

Báo cáo triển khai thực tế, không phải implementation plan. Phạm vi: PostgreSQL development local `127.0.0.1:5434/genshinhub`, các database test tạm trên cùng Docker `genshinhub-postgres`, mã nguồn backend/frontend liên quan đến Multi-Build, và tài liệu này. Không đụng production. Không reset, stash, clean, commit, push hay deploy. Toàn bộ thay đổi uncommitted từ các vòng trước được giữ nguyên.

Phase C1 ([báo cáo đối chiếu](./PHASE_C1_MIGRATION_RECONCILIATION.md)) đã hoàn tất việc ghi hai dòng history còn thiếu trên development. Trong đợt này **không ghi thêm bất kỳ dòng `_prisma_migrations` nào trên development**; mọi truy vấn development đều ở chế độ đọc hoặc `SET TRANSACTION READ ONLY`.

## 1. Tổng kết

| Hạng mục | Kết quả |
|---|---|
| Fresh `prisma migrate deploy` trên DB trống | PASS — 4/4 migration, thứ tự đúng dependency |
| `prisma validate` / `prisma generate` / `migrate status` / `migrate diff` | PASS; diff trống trên cả fresh lẫn development |
| So sánh schema fresh ↔ development | MATCH sau khi loại `_prisma_migrations` và nonce của `pg_dump` |
| Prisma Client probe (19 model) | PASS — 19/19 truy vấn được, toàn bộ bản ghi = 0 trên DB mới |
| GraphQL probe | PASS — catalog rỗng, public build rỗng, admin bị từ chối |
| Admin Multi-Build E2E | PASS — đăng nhập, CRUD, default, reject/archive, audit, concurrency, phân quyền |
| Public Character Detail regression | PASS — 1440/390 px × Dark/Light, switcher, default, team order, WebP, hydration, overflow |
| Data integrity | PASS — 126 legacy profiles, checksum/duplicated/orphan/default checks = 0 vi phạm |
| Regression suite | PASS — 21 command, 0 exit code khác 0; 129 test assertions |
| Backend ESLint | `TOOLING GAP` — chưa cấu hình (không có script/package) |
| Admin credentials | Hợp lệ, sinh ngẫu nhiên lúc chạy; **không** `E2E BLOCKED` |

## 2. Audit migration history trong repo

`backend/prisma/migrations/` có đúng 4 migration hoạt động + `migration_lock.toml` (`provider = "postgresql"`). Không có migration nào khác trong thư mục này.

| Migration | Đối tượng tạo/đổi | Phụ thuộc |
|---|---|---|
| `20261120000000_legacy_baseline` | 14 bảng legacy, 26 index, 7 FK; 322 dòng SQL | Không |
| `20261120145000_add_character_builds` | 3 enum, `CharacterBuild`, `CharacterBuildAudit`, 10 index (gồm partial unique), 5 FK; 105 dòng | `Character`, `CharacterWeapon`, `CharacterArtifact`, `CharacterTeam` |
| `20261120151000_add_character_tier_rankings` | 5 enum, `CharacterTierRanking`, 5 index, 1 FK | `Character` |
| `20261120153500_add_weapon_tier_rankings` | 7 enum, `WeaponTierRank`, `WeaponTierAudit`, 8 index, 2 FK | `Weapon` |

`prisma/development-migrations/20261120_character_builds.sql` là bản **byte-identical** với `20261120145000_add_character_builds/migration.sql` (SHA-256 `e0a4ff5f…90fc9`). Nó chỉ là artifact SQL từng chạy thủ công ở Phase B, không phải migration thứ năm; nếu đưa vào thư mục migrations sẽ tạo DDL trùng lặp. Hai bản sao trong `docs/tierlist-v7.2-audit/migration-bootstrap-proposal/` cũng byte-identical với baseline và builds migration nhưng tên thư mục cũ — không được copy vào `prisma/migrations/`.

Các file `rollback.sql` của hai migration Tier là tài liệu thủ công; Prisma không bao giờ chạy chúng. Không dùng chúng để sửa metadata.

## 3. Nguyên nhân P3005 và P3018 / 42P01

- **P3005**: schema legacy đã tồn tại vật lý trước khi Prisma quản lý history. Bảng có thật nhưng thiếu dòng baseline, nên Prisma từ chối coi DB là đã khởi tạo.
- **P3018 / 42P01**: chuỗi migration cũ bắt đầu bằng hai migration Tier. `add_character_tier_rankings` khóa ngoại tới `Character`, `add_weapon_tier_rankings` khóa ngoại tới `Weapon`, nhưng chưa có migration nào tạo hai bảng đó. Trên DB trống, lỗi `42P01` xuất hiện và Prisma báo P3018.
- Baseline được trích từ phần schema **trước** Multi-Build / Character Tier / Weapon Tier, nên nó tạo đúng 14 bảng legacy mà không có ba nhóm đối tượng mới.

## 4. Dependency graph và thứ tự deploy

```text
20261120000000_legacy_baseline
├── 20261120145000_add_character_builds        (ALTER 3 bảng legacy + FK tới CharacterBuild)
├── 20261120151000_add_character_tier_rankings (FK tới Character)
└── 20261120153500_add_weapon_tier_rankings    (FK tới Weapon)
```

Prisma áp dụng theo tên thư mục, vì thứ tự trên vừa đúng dependency vừa ổn định checksum. Ba nhánh sau baseline có thể hoán đổi vật lý nhưng không nên đổi tên vì sẽ làm sai history đã resolve.

## 5. Baseline và checksum

| Migration | SHA-256 | `applied_steps_count` trên development |
|---|---|---|
| `20261120000000_legacy_baseline` | `ce3dc583c8fe2bd19a8a2889606546dbb5407223b4e95a29fa3a60227692ff49` | 0 (resolve --applied ở C1) |
| `20261120145000_add_character_builds` | `e0a4ff5f5008ae0b292fe6cefd7613778b435681f16b13c5e110081c20190fc9` | 0 (resolve --applied ở C1) |
| `20261120151000_add_character_tier_rankings` | `01e70c7b6d98984628d433f4312544ca3448cc3e398c017ba3de7c0ed578f498` | 0 (từ Phase B1) |
| `20261120153500_add_weapon_tier_rankings` | `b37adcc94579b874088d2fee644c8b78ea4b7dd0c1b9e8477505f6962759febc` | 1 (từ Phase B2) |

Bốn dòng đều `finished = true`, `rolled_back_at = null`. Không sửa SQL hay checksum của migration đã apply. Không đánh dấu migration là applied chỉ vì bảng trùng tên — baseline phản ánh đúng hình dạng schema trước các migration bổ sung, đã được đối chiếu bằng dump schema ở mục 8.

## 6. Repo file / applied / marked applied / manual SQL / db push / schema thực tế

| Nguồn | Kết quả audit |
|---|---|
| File trong `backend/prisma/migrations/` | 4 thư mục, đúng tên/checksum như bảng mục 5 |
| `_prisma_migrations` development | 4 dòng, thứ tự `finished_at` không trùng thứ tự deploy (hai dòng Tier cũ xong trước, hai dòng baseline/builds được resolve sau) — không ảnh hưởng Prisma |
| Manual SQL | `development-migrations/20261120_character_builds.sql` = builds migration; đã chạy tay ở Phase B, sau đó được resolve ở C1. SQL Tier cũng từng chạy tay rồi resolve |
| `db push` | Không dùng trong Phase C. `.github/workflows/ci.yml` dùng `migrate deploy`; `.circleci/config.yml`, `docs/CI_PIPELINE.md`, `README.md`, `GUIDE.md` vẫn mô tả `db push` — tài liệu cũ nằm ngoài phạm vi sửa của đợt này |
| Schema PostgreSQL thực tế | 19 bảng (không tính `_prisma_migrations`), 15 FK, 68 index, 62 enum label, partial unique index `CharacterBuild_one_default_per_character` |
| Drift | `prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-url <dev>` → `-- This is an empty migration.` |

Partial unique index `CharacterBuild_one_default_per_character ON "CharacterBuild"("characterId") WHERE "isDefault"` chỉ tồn tại trong SQL, không biểu diễn được trong `schema.prisma`. Vì vậy phải so sánh cả catalog dump, không chỉ tin `migrate diff`.

## 7. Fresh bootstrap — thiết lập và lệnh chạy

Database tạm cô lập trên cùng Docker local, tên `genshinhub_phasec_fresh_20261120`, host/port `127.0.0.1:5434`, tạo bằng `CREATE DATABASE` sau khi xác nhận chưa tồn tại. Toàn bộ lệnh chạy từ `backend/` với `DATABASE_URL` trỏ DB tạm:

```sh
./node_modules/.bin/prisma validate --schema prisma/schema.prisma
./node_modules/.bin/prisma generate --schema prisma/schema.prisma
./node_modules/.bin/prisma migrate deploy --schema prisma/schema.prisma
./node_modules/.bin/prisma migrate deploy --schema prisma/schema.prisma   # lần 2
./node_modules/.bin/prisma migrate status --schema prisma/schema.prisma
./node_modules/.bin/prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-url "$TESTURL" --script
```

Kết quả deploy:

```text
Applying migration `20261120000000_legacy_baseline`
Applying migration `20261120145000_add_character_builds`
Applying migration `20261120151000_add_character_tier_rankings`
Applying migration `20261120153500_add_weapon_tier_rankings`
All migrations have been successfully applied.
```

Lần deploy thứ hai: `No pending migrations to apply.` Status: `Database schema is up to date!` — không có failed/rolled-back migration.

## 8. Kết quả fresh bootstrap và so sánh schema

| Kiểm tra | Kết quả |
|---|---|
| `prisma validate` | `The schema … is valid 🚀` |
| `prisma generate` | PASS |
| `migrate deploy` (lần 1) | 4/4 migration |
| `migrate deploy` (lần 2) | 0 pending, không lỗi trùng object |
| `migrate status` | up to date |
| `migrate diff` (schema ↔ fresh) | empty |
| `migrate diff` (schema ↔ development) | empty |
| `pg_dump --schema-only` fresh vs development | MATCH sau khi bỏ `_prisma_migrations` và 2 dòng `\restrict/\unrestrict` nonce; 1210 dòng sau normalize, `diff` trống |

`pg_dump`raw và bản normalize nằm tại `/tmp/genshinhub-phase-c/{dev,fresh}-schema.sql` và `{dev,fresh}-normalized.sql`. Đây là bằng chứng bao phủ enum, FK, unique constraint và partial index mà Prisma diff không biểu diễn hết.

## 9. Kiểm tra schema vật lý

Trên development và fresh đều có cùng số liệu:

```text
tables=19  fks=15  indexes=68  enum_labels=62  partial_default_idx=1
```

FK bao gồm 7 legacy + 5 Multi-Build + 1 Character Tier + 2 Weapon Tier. Các quan hệ Prisma composite `CharacterWeapon/CharacterArtifact/CharacterTeam → CharacterBuild(id, characterId)` và `CharacterBuildAudit → CharacterBuild(id, characterId)` đều tồn tại với `ON UPDATE CASCADE ON DELETE RESTRICT`. Unique quan trọng: `CharacterBuild(characterId,name)`, `CharacterBuild(id,characterId)`, `CharacterBuild.approvalChecksum`, `CharacterTierRanking(characterId,role,constellation,gameVersion)`, `WeaponTierRank(weaponId,role,versionKey,refinementContext)`.

Enum đủ 15 type / 62 label, gồm 3 build enum, 5 character-tier enum, 7 weapon-tier enum. `WeaponRefinementContext` không-null và có `SOURCE_MISSING`, đúng schema đích.

## 10. Prisma Client và GraphQL probe

Prisma Client probe trên fresh DB gọi `count()` cho 19 model: `character, weapon, characterBuild, characterBuildAudit, characterTierRanking, weaponTierRank, weaponTierAudit, characterWeapon, characterArtifact, characterTeam, teamMember, artifactSet, material, tierRank, user, userFavorite, userWishlist, userTeam, otp` — tất cả trả về `0`, không lỗi model/cache.

GraphQL probe với server chạy thật trên fresh DB (`PORT=55452`):

```graphql
{ weapons { id } characters { id } characterTierRankings { id } weaponTierRanks { id } }
# → {"data":{"weapons":[],"characters":[],"characterTierRankings":[],"weaponTierRanks":[]}}

{ characterBuilds(characterId: "mitya") { id } }
# → {"data":{"characterBuilds":[]}}

{ characterBuildAudits(buildId: "x") { id } }
# → errors[0].extensions.code = "FORBIDDEN", message "Admin access required"
```

Như vậy client generated, resolver và admin guard đều hoạt động trên schema vừa bootstrap, trước khi có fixture.

## 11. An toàn rerun, dọn DB tạm, bảo vệ development/production

- Sau khi probe, tiến trình backend tạm bị dừng, `ss` xác nhận port `55452` rảnh.
- Trước khi drop, xác nhận danh tính `current_database() = genshinhub_phasec_fresh_20261120` và `20` bảng public (19 + `_prisma_migrations`); chỉ sau đó `DROP DATABASE`. Truy vấn xác nhận số DB còn lạiByName = 0.
- Development `genshinhub`: không `DROP`, không `reset`, không `db push`, không `migrate deploy`, không sửa `_prisma_migrations`. Chỉ đọc qua `psql`, `prisma migrate status/diff` và transaction read-only của `phase-c-integrity.cjs`.
- DB test `genshinhub_phasec_admin_test_97c1`: được restore từ snapshot sạch của development (`pg_dump | psql`) trước lần chạy E2E cuối và sau khi chạy, nhờ đó script có thể lặp lại. Đây là test DB, không phải development hay production.
- Production: không kết nối, không thay đổi. Bất kỳ reconcile history production nào cần phê duyệt riêng, backup, checksum và schema audit của chính target đó.

## 12. Admin E2E — chiến lược xác thực an toàn

Dùng `frontend/scripts/run-phase-c-admin-e2e.py`: kiểm tra `DATABASE_URL` trỏ đúng `127.0.0.1:5434/genshinhub`, sau đó sinh `ADMIN_PASSWORD`, `ADMIN_JWT_SECRET`, `USER_JWT_SECRET` bằng `secrets.token_urlsafe` cho cả backend lẫn frontend tạm. Frontend được copy vào `tempfile.TemporaryDirectory`, bỏ `.env*`, symlink `node_modules`/`public`; server chạy trên `127.0.0.1:3014` và `127.0.0.1:4014`.

- Không có credential hardcode trong repo, không dùng secret production, không log password/token/cookie. Đoạn diagnostics khi login thất bại chỉ in URL, title, heading và **tên** cookie.
- Không backdoor, không bypass auth, không chỉnh sửa `authAdmin`/resolver để test. Cookie `admin_token` HttpOnly thật được tạo qua form login; backend xác thực `x-admin-key` thật qua proxy `/api/admin/graphql`.
- Vì có thể sinh credential hợp lệ an toàn, trạng thái là **PASS**, không phải `E2E BLOCKED`.

Hai lỗi phát hiện và sửa trong đợt này (đều nằm trong phạm vi Multi-Build E2E):

1. `frontend/components/characters/client/CharacterBuildManager.tsx`: `<select>` build nằm trong `<label>` chứa cả text của `<option>`, nên accessible name không phải `"Build"`; Playwright `get_by_label("Build", exact=True)` tìm thấy 0 phần tử. Thêm `aria-label="Build"` — vừa ổn định selector, vừa cải thiện accessibility.
2. `frontend/scripts/test-admin-multi-build.py`: SSR render sẵn `aria-pressed`, nên test click trước khi React gắn handler và click bị mất. Thêm `wait_for_function` kiểm tra `__reactProps$` trên các nút switcher trước khi tương tác.

Một lần chạy trung gian gặp `ECONNRESET` từ Next dev server khi test đang chạy; DB test được restore sạch và chạy lại thành công. Không sửa resolver hay dữ liệu để che lỗi.

## 13. Admin Build Manager E2E — kết quả

Script `frontend/scripts/test-admin-multi-build.py` (Playwright, Chrome headless) chạy đ full luồng:

1. Fresh DB check: catalog rỗng qua generated client + Apollo.
2. Anonymous gọi `createCharacterBuild` và `updateCharacterBuild` → `Admin access required`.
3. Đăng ký user thường, dùng bearer token gọi `reviewCharacterBuild` → `Admin access required`.
4. Admin login qua `/en/admin/login`, cookie `admin_token` HttpOnly, dashboard → Characters → Builds → `/en/characters/mitya#character-build`.
5. Mở `Manage character builds`, select `Build` có đúng 2 option; với từng build, các section `Weapons`, `Artifacts`, `Stats and talents`, `Teams` trả đúng dữ liệu đã approve (đối chiếu trực tiếp với file draft), không lẫn build khác.
6. Tạo draft `Phase C browser test`, verify `DRAFT`, review ngay → `No pending revision`, update với `characterId='albedo'` → `does not belong`.
7. Stage nội dung mới, public query vẫn bằng `before`, approve → `Set default` → reload → build test được chọn.
8. Reject revision, đổi default về build support gốc, archive build test → `REJECTED · Version 8 · Archived`, nút `Save for review` bị disable, stage tiếp bị chặn `Archived builds are read-only`.
9. Mở `Change history`, đủ `CREATED`, `STAGED`, `PUBLISHED`, `REJECTED`, `DEFAULT_SET`, `ARCHIVED` (thực tế DB test còn ghi cả `DEFAULT_REMOVED`). Public query cuối cùng bằng exactly `before`.

Dữ liệu audit quan sát được trên DB test sau lần chạy cuối (trước khi restore lại):

```text
CREATED v1, STAGED v2, PUBLISHED v3, DEFAULT_SET v4,
STAGED v5, REJECTED v6, DEFAULT_REMOVED v7, ARCHIVED v8
actor = authenticated-admin
```

Log bằng chứng: `/tmp/genshinhub-phase-c/e2e-run-4.log`.

## 14. Authorization, concurrency và audit integrity

- Anonymous: mọi mutation build bị chặn `Admin access required`.
- User thường đã đăng nhập: vẫn không approve được.
- Sai chủ sở hữu: `updateCharacterBuild` với `characterId` của character khác bị từ chối.
- Không bypass approval: draft chưa stage thì review trả `No pending revision`; draft chưa publish không lộ ra public query.
- Optimistic concurrency: hai `updateCharacterBuild` cùng `expectedVersion` được bắn đồng thời qua `/api/admin/graphql` → kết quả `['CONFLICT','OK']` (đúng 1 thắng).
- Archived build: read-only, mọi stage bị từ chối.
- Baseline/legacy build: `baseline-*` không thể archive; `legacy-mitya` vẫn là default duy nhất sau test.
- Audit log ghi actor/version/action, `CharacterBuildAudit` khóa ngoại composite tới build; `phase-c-integrity.cjs` kiểm tra `invalid_audits = 0` (không audit nào có version lớn hơn build, actor/action rỗng hoặc build orphan).
- DataLoader cache isolation: `src/graphql/dataloaders/index.test.ts` PASS; E2E chuyển build liên tục trên cùng trang nhưng khác `data-build-id` cũng xác nhận không lộ cache.

## 15. Data integrity — số liệu thực tế

Chạy read-only:

```sh
node scripts/build-audit/phase-c-integrity.cjs genshinhub \
  backups/multi-build/phase-b.R15Bly/development-main.snapshot.json
```

Kết quả (không hardcode, truy vấn thực tế):

| Nhóm | Legacy-scoped (build `legacy-%`) | Toàn bộ DB |
|---|---:|---:|
| Character profile | 131 | 131 |
| CharacterWeapon recommendations | 610 | 613 |
| CharacterArtifact recommendations | 279 | 282 |
| CharacterTeam | 254 | 256 |
| TeamMember | 1.016 | 1.024 |

Con số 126/610/279/254/1.016 do người dùng nêu khớp đúng phạm vi **legacy profile**: `legacy_profiles = 126`, và snapshot so sánh `added = 0, missing = 0, changed = 0` cho cả 5 nhóm dữ liệu. Tổng toàn DB cao hơn 3 weapon, 3 artifact, 2 team và 8 member do các build approved bổ sung.

Kiểm tra khác:

```text
builds=127  audits=127  approved=2  checksums=2
chars_with_builds=126  defaults=126  duplicate_defaults=0
duplicate_approvals=0  duplicate_profiles=0
orphan_profiles=0  orphan_weapons=0  orphan_artifacts=0
orphan_teams=0  orphan_members=0  invalid_audits=0
invalid_team_order=0
CharacterTierRanking=0  WeaponTierRank=0  WeaponTierAudit=0
```

Hai build Mitya được đối chiếu theo `approvalChecksum`:

- `approved-567e…` — `C0 On-Field Main DPS`, không default, checksum `567e51a3…` (nội dung khớp draft `mitya-main-dps.json`).
- `legacy-mitya` — `C0 Off-Field Support / Sub DPS`, default, checksum `263fd822…` (khớp draft `mitya-support-revised.json`).

Một quan sát không phải lỗi do Phase C gây ra: `unresolved_member_catalog_ids = 49` — 49 TeamMember trỏ tới characterId chưa có trong catalog `Character`. Script integrity không assert giá trị này về 0; FK hiện tại cho phép và dữ liệu này có từ trước. Không tự sửa trong đợt này.

## 16. Public Character Detail regression

Trong cùng lần E2E, `verify_public` mở trang thật `/en/characters/mitya` ở 4 tổ hợp: 1440×1000 Dark, 1440×1000 Light, 390×844 Dark, 390×844 Light (mobile có `is_mobile`/`has_touch`, `reduced_motion='reduce'`).

Với mỗi tổ hợp:

- Build switcher có đúng 2 nút, build default `legacy-mitya` được `aria-pressed=true` sau reload.
- Chuyển `main → default → main`, mỗi lần `[data-build-id]` đổi đúng; weapons, artifacts, main stats, sub-stats, talent priority, tên team và thứ tự 4 member khớp payload GraphQL của build tương ứng.
- Không hiển thị `Best-in-Slot` trên build approved.
- Ảnh trong guide và team member đều `/assets/*.webp`, decode thành công, `naturalWidth > 0`.
- `document.documentElement.scrollWidth <= innerWidth + 1` và `content.scrollWidth <= content.clientWidth + 1` — không overflow ngang.
- Không có lỗi hydration/React #418/#423/#425 trong `pageerror`.

Ngoài ra: `albedo` (1 build) và `alyosha` (0 build) không render switcher; UI404 rỗng đúng thông báo. Log: `/tmp/genshinhub-phase-c/e2e-run-4.log`.

## 17. CI tuần tự, tooling, files changed và kết luận

Thứ tự chạy tuần tự (không chạy browser/test nặng đồng thời). Log đầy đủ: `/tmp/genshinhub-phase-c/regression.log`.

| Bước | Lệnh | Kết quả |
|---|---|---|
| 1 | `prisma validate` | PASS |
| 2 | Fresh `migrate deploy` | PASS (xem mục 7) |
| 3 | `backend: npx tsc --noEmit` | PASS |
| 4 | `frontend: npx tsc --noEmit` | PASS |
| 5 | `backend: npm run build` | PASS |
| 6 | `frontend: npm run lint` | PASS, 17 warning cũ, exit 0 |
| 7 | 3 file build-audit unit + 2 file weapon-tier-audit + 6 file weapon-tier-independent | PASS (13 + 9 + 37 assertions) |
| 8 | 13 file test TypeScript (dataloader, character tier, weapon tier, phaseC1Smoke, migration tests, db integration) | PASS; tổng cộng 129 assertions, 0 fail |
| 9 | `multi-build-integration.cjs` trên `genshinhub_multibuild_test_b49` | PASS — restore DB, FK/unique, legacy mode, admin stage/approve/reject/default/archive, stale-version guard |
| 10 | Admin E2E + Public Playwright | PASS (xem mục 13–16) |
| 11 | `git diff --check` | PASS |

**TOOLING GAP**: backend không có script `lint` và không có dependency ESLint/jest/vitest config; các test dùng `node --test` và `ts-node --transpile-only`. Không tự cài đặt hay tạo cấu hình mới trong Phase C. `approval.test.cjs` từng fail 1/8 ở C1 do artifact đang được chỉnh sửa; ở lần chạy này toàn bộ 37 assertions của nhóm independent PASS.

Files source thay đổi trong đợt Phase C này (ngoài báo cáo này):

- `frontend/components/characters/client/CharacterBuildManager.tsx` — thêm `aria-label="Build"`.
- `frontend/scripts/test-admin-multi-build.py` — chờ hydration trước khi click public switcher.

Lệnh `npm run build` backend cũng regenerate các file `backend/dist/**` (build output, không phải source) — đây là hệ quả của bước xác minh build, không phải chỉnh sửa thiết kế hay logic.

Database: development `_prisma_migrations`, schema và dữ liệu không đổi; test DB được restore sạch; DB tạm fresh đã drop sau khi xác nhận danh tính.

**Kết luận**: fresh PostgreSQL bootstrap bằng `prisma migrate deploy` đã chạy thật và tạo đúng toàn bộ schema Prisma, kể cả legacy tables và mọi bảng/quan hệ Multi-Build, Tier List, Weapon Detail. Admin Multi-Build E2E và regression công khai đều PASS với credential sinh ngẫu nhiên, không có `E2E BLOCKED`. Không có blocker kỹ thuật cho Phase C; chỉ còn `TOOLING GAP` (backend ESLint) và các tài liệu/CircleCI cũ vẫn nhắc `db push` nằm ngoài phạm vi sửa của đợt này. Không tự approve ranking hay chỉnh dữ liệu Tier.
