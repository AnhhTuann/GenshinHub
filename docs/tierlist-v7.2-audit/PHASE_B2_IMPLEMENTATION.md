# Character Tier List Phase B2 — Independent Ranking Data Preparation

**Trạng thái: DRAFT FILE. CHƯA GHI DATABASE. CHƯA APPROVE. CHƯA PUBLIC.**

Batch nguồn: `docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json` (`batchId = phase-b2-independent-001`, `gameVersion = 7.2`).

Không làm lại audit Phase B1. Không import 292 `SOURCE_DERIVED`. Không sửa `Character.tier`, Weapon Tier, Multi-Build, UI/CSS. Không commit/push/deploy.

---

## 1. Số ranking candidates được tạo

**15** candidates, ghi trong file draft, **0** row trong PostgreSQL.

Phân bổ tier: `SS = 6`, `S = 7`, `A = 2`, `B/C/D = 0`.

## 2. Số role được bao phủ

**3 / 3** role:

| Role | Số ranking |
|---|---:|
| SUPPORT | 7 |
| SUB_DPS | 6 |
| MAIN_DPS | 2 |

## 3. Số C0 / C6

| Constellation | Số ranking |
|---|---:|
| C0 | 13 |
| C6 | 2 |

Hai cặp C0/C6 được tách riêng để thể hiện rõ khác nhau theo constellation: Bennett SUPPORT C0/C6 và Xiangling SUB_DPS C0/C6. C1–C5 không được đánh giá trong phase này.

## 4. Số explanation hoàn chỉnh

**15 / 15** explanation tiếng Việt, mỗi record trả lời đủ 5 câu hỏi bắt buộc:

1. `Đóng góp:` — đóng góp trong role cụ thể.
2. `Đề xuất` — lý do chọn tier.
3. `Điều kiện:` — yếu tố làm hiệu quả tăng/giảm.
4. `Constellation:` — mức độ phụ thuộc constellation.
5. `Hạn chế:` — điểm yếu cần nêu rõ.

Mỗi record còn có `strengths`, `limitations`, `teamAssumptions`, `energyRequirements`, `reactionCompatibility`, `damageContribution`, `teamUtility`, `constellationEffects`, `gameplayAssumptions` và `confidence`.

## 5. Số NEEDS_REVIEW

**0**. Tất cả 15 records có đủ bằng chứng để đề xuất tier, nên để `PENDING_REVIEW`.

Confidence: `HIGH = 11`, `MEDIUM = 4` (Fischl, Xingqiu, Kazuha, Mitya — local DB có ít hoặc không có `CharacterTeam` row). Không có record nào `LOW`.

## 6–7. Bảng Admin review: evidence, Proposed Tier và lý do

| Character | Role | Constellation | Proposed Tier (score) | Evidence | Confidence | Status |
|---|---|---|---|---|---|---|
| Bennett (`bennett`) | SUPPORT | C0 | S (84.3) | genshin-db 3 refs + local 12/4/8 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Buff ATK theo Base ATK + heal đã đủ mạnh ở C0, nhưng bị trần bởi Base ATK và phải đứng trong field nên chưa đạt SS. | | | |
| Bennett (`bennett`) | SUPPORT | C6 | SS (86.1) | genshin-db 2 refs + local 12/4/8 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | +15% Pyro DMG và Pyro infusion cho sword/claymore/polearm; vượt S trong đội Pyro melee nhưng không universal. | | | |
| Fischl (`fischl`) | SUB_DPS | C0 | A (74.3) | genshin-db 3 refs + local 2/1/0 | MEDIUM | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Oz cho Electro damage nền ổn định, nhưng corroboration local mỏng (0 team row) và ít buff đội. | | | |
| Xingqiu (`xingqiu`) | SUB_DPS | C0 | S (83.7) | genshin-db 3 refs + local 2/1/0 | MEDIUM | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Sword rain dày + Hydro application + damage reduction ngay ở C0; thiếu buff quy mô lớn nên chưa SS. | | | |
| Xiangling (`xiangling`) | SUB_DPS | C0 | S (83.8) | genshin-db 3 refs + local 19/5/8 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Pyronado gây Pyro damage rất nặng nhưng phụ thuộc ER/battery nên giữ ở S. | | | |
| Xiangling (`xiangling`) | SUB_DPS | C6 | S (81.5) | genshin-db 2 refs + local 19/5/8 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | C6 cho +15% Pyro DMG cả đội nhưng chỉ có giá trị với Pyro damage và vẫn cần ER như C0. | | | |
| Kaedehara Kazuha (`kaedehara-kazuha`) | SUPPORT | C0 | SS (89.7) | genshin-db 3 refs + local 9/2/0 | MEDIUM | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Gom địch + EM → Elemental DMG Bonus + VV shred cùng lúc, hoạt động ngay ở C0. | | | |
| Furina (`furina`) | SUB_DPS | C0 | SS (87.9) | genshin-db 3 refs + local 14/3/9 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Salon Members gây Hydro damage theo Max HP và Fanfare buff damage cả đội; đầy đủ ở C0. | | | |
| Furina (`furina`) | SUPPORT | C0 | SS (88.8) | genshin-db 3 refs + local 14/3/9 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Fanfare tăng DMG dealt + Incoming Healing Bonus cho hầu hết rotation, không giới hạn bởi weapon/element. | | | |
| Neuvillette (`neuvillette`) | MAIN_DPS | C0 | SS (86.3) | genshin-db 3 refs + local 11/6/5 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Tự đủ damage, tự Hydro DMG Bonus theo HP; vẫn cần reaction partner và chống interruption. | | | |
| Raiden Shogun (`raiden-shogun`) | MAIN_DPS | C0 | S (81.5) | genshin-db 3 refs + local 14/4/7 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Burst nuke + hồi năng lượng + coordinated attack mạnh, nhưng gắn với đồng đội hay dùng Burst. | | | |
| Nahida (`nahida`) | SUPPORT | C0 | SS (91) | genshin-db 3 refs + local 18/6/9 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Dendro application lâu, Tri-Karma tự kích hoạt và Shrine chia EM; nền tảng của hệ Dendro reaction. | | | |
| Zhongli (`zhongli`) | SUPPORT | C0 | S (84.1) | genshin-db 3 refs + local 13/6/7 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Shield dày + RES shred + petrify rất ổn định ở C0 nhưng ít damage buff trực tiếp. | | | |
| Yelan (`yelan`) | SUB_DPS | C0 | S (83.9) | genshin-db 3 refs + local 4/3/8 | HIGH | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | Coordinated Hydro damage + Adapt With Ease buff tới 50%, nhưng buff reset nếu recast Burst. | | | |
| Mitya (`mitya`) | SUPPORT | C0 | A (74) | genshin-db 3 refs + local 6/3/3 | MEDIUM | PENDING_REVIEW |
| &nbsp; | ↳ lý do | | +30 EM mỗi Beacon và đổi Superconduct thành Stellar-Conduct, nhưng chỉ dùng được trong comp Electro-Cryo. | | | |

**Giải thích evidence:** `genshin-db N refs` là số trích dẫn trực tiếp từ `genshin-db/talents` hoặc `genshin-db/constellations` trong `evidence.primaryEvidence`. `local W/A/T` là số `CharacterWeapon` / `CharacterArtifact` / `CharacterTeam` row trong snapshot 7.2, dùng để corroborate — **không dùng để lấy tier cũ làm đáp án**. Trích dẫn đầy đủ nằm trong từng record của JSON.

**Rubric:** `0.30*kit + 0.25*flex + 0.20*evidence + 0.15*constellation + 0.10*access`; ngưỡng `SS ≥ 86`, `S ≥ 76`, `A ≥ 66`, `B ≥ 56`, `C ≥ 46`, `D`. Score và tier được test khớp số học (`phaseB2Draft.test.ts`).

**Độc lập:** không đọc/copy tier từ `Character.tier` hay snapshot Genshin-Builds để làm ground truth; không dùng rarity làm tier (Bennett 4★ vẫn có thể đạt SS ở C6, trong khi một số 5★ chỉ A). Các trích dẫn snapshot local chỉ là "số liệu có sẵn để kiểm chứng", không phải nguồn xếp hạng.

## 8. Migration integrity status — CÓ VẤN ĐỀ NGHIÊM TRỌNG (đã báo cáo trước khi làm draft)

| Kiểm tra | Kết quả |
|---|---|
| `prisma migrate status` trên dev `127.0.0.1:5434/genshinhub` | `Database schema is up to date!`, 2 migrations: `20261120151000_add_character_tier_rankings` (Phase B1) và `20261120153500_add_weapon_tier_rankings` (công việc concurrent). Cả hai `finished_at != null`, `rolled_back_at = null`. |
| Baseline P3005 (Phase B1) | Vẫn đúng: DB đã có schema trước khi có migration history nên B1 dùng `migrate resolve --applied`. Không sửa/xóa migration đã apply. |
| **Fresh bootstrap từ migration history** | **THẤT BẠI** (kiểm tra lại sau khi có migration thứ 2): tạo DB tạm, chạy `prisma migrate deploy` → `P3018` ở migration đầu tiên, `ERROR: relation "Character" does not exist` (42P01). Migration history chỉ có các migration additive, thiếu baseline schema gốc. DB tạm đã DROP. |
| Migration Multi-Build / Weapon Tier trong working tree | `backend/prisma/development-migrations/20261120_character_builds.sql` (untracked, đã apply vào dev DB bằng streamline riêng) và `backend/prisma/migrations/20261120153500_add_weapon_tier_rankings/` (xuất hiện concurrent, đã apply). Phase B2 không tạo/xóa/sửa bất kỳ file nào trong số này. |
| Schema drift | `migrate diff --from-url dev --to-schema-datamodel prisma/schema.prisma` hiện trả `-- This is an empty migration.` — không còn drift giữa dev DB và schema working tree. Drift so với baseline `HEAD` vẫn tồn tại do các migration concurrent, nằm ngoài phạm vi B2. |
| CI | `.github/workflows/ci.yml` dùng `prisma db push --force-reset --accept-data-loss` trên `genshinhub_test` riêng, nên hiện không phụ thuộc migration history. |
| Hành động của Phase B2 | **Không tạo migration mới, không sửa migration đã apply, không chạy migrate deploy/dev/push.** |

**Kết luận:** migration integrity của dev DB ổn ở mức "status up to date", nhưng **không bootstrap được database mới chỉ từ migration history**. Đây là blocker kỹ thuật cần xử lý ở phase riêng (baseline migration hoặc chiến lược CI khác), không nằm trong phạm vi Phase B2 và không được tự ý sửa ở đây.

## 9. Files changed

Tạo mới:

- `docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json` — 15 ranking candidates.
- `docs/tierlist-v7.2-audit/PHASE_B2_IMPLEMENTATION.md` — báo cáo này.
- `backend/src/graphql/modules/characterTierRanking/phaseB2Draft.test.ts` — validation tests.

Chỉnh nhỏ trong quá trình verification: `backend/src/graphql/modules/characterTierRanking/characterTierRanking.test.ts` — fragment check của `tierRankings` đổi sang dạng không phụ thuộc khoảng trắng do schema được format lại bởi công việc concurrent. Không đổi logic service hay migration.

Không thay đổi: schema.prisma, migrations, GraphQL runtime, dữ liệu PostgreSQL, frontend, Multi-Build, Weapon Tier. Tất cả uncommitted work khác trong working tree được giữ nguyên.

## 10. Tests passed

Từ `backend/` với `TS_NODE_COMPILER_OPTIONS='{"rootDir":"./src"}'`:

| Lệnh | Kết quả |
|---|---|
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/phaseB2Draft.test.ts` | 9/9 pass |
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.test.ts` | 13/13 pass |
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.graphql.test.ts` | 3/3 pass |
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/migration.test.ts` | 2/2 pass |
| `npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.integration.test.ts` | 1/1 pass |
| `npx ts-node --transpile-only src/graphql/dataloaders/index.test.ts` | 1/1 pass |
| `npx tsc --noEmit` | pass |

Các test Phase B2 kiểm tra: ID character có thật (read-only DB), role/tier/constellation/version hợp lệ, explanation đủ 5 câu hỏi và tiếng Việt, evidence đầy đủ, không duplicate key, không contamination `SOURCE_DERIVED`, score khớp tier, draft đi qua service thật vẫn `PENDING_REVIEW`, non-admin bị từ chối, public SDL không nhận `approvalStatus`/`derivation`, và `CharacterTierRanking.count() === 0`.

Không chạy browser test (không đổi UI/CSS). Không chạy ESLint (backend vẫn chưa có config — tooling gap đã ghi ở Phase B1).

## 11. Approval package

Admin cần duyệt **từng record một** trong bảng mục 6–7 và trong file JSON. Quy trình sau khi duyệt:

1. Admin xác nhận tier và evidence của từng record; có thể yêu cầu chỉnh explanation hoặc hạ xuống `NEEDS_REVIEW`.
2. Chỉ sau khi có approval rõ ràng mới insert draft qua `upsertCharacterTierRanking` — vẫn `PENDING_REVIEW`.
3. Dùng `adminCharacterTierRankings` để review, sau đó `approveCharacterTierRanking` với context Admin thật.
4. Public query chỉ trả `APPROVED + INDEPENDENT`; `SOURCE_DERIVED` không thể approve.

**Phase B2 hiện tại: 0 row được insert, 0 row được approve, 0 approval actor được tạo, 0 ghi production.** Batch này chỉ là để Admin kiểm duyệt nội dung trước khi đưa vào database.
