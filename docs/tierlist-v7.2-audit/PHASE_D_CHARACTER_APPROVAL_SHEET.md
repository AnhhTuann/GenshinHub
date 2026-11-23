# Phase D — Character Tier Approval Sheet (9 READY records)

**STATUS: READY FOR ADMIN REVIEW ONLY — NO APPROVAL, NO INSERT, NO PUBLIC DISPLAY.**

Source: `docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json`
Batch: `phase-b2-independent-001`
Source SHA-256: `7b102da59c3fe3c75f084363de5a989e2561c1816cb68737e228f967cc0afc2c`
Rubric: `GenshinHub Tier Rubric v1.0 (kit 30% / team flexibility 25% / verified evidence 20% / constellation independence 15% / accessibility 10%)`

Only 9 of 15 independent drafts are included. All 15 keep `approvalStatus = PENDING_REVIEW`.
The other 6 are excluded: 2 NEEDS_MORE_EVIDENCE, 3 RUBRIC_RECALIBRATION, 1 GAMEPLAY_ASSUMPTION_UNVERIFIED.
The machine-readable companion is `PHASE_D_CHARACTER_APPROVAL_SHEET.json`; every row carries a per-record SHA-256 binding.

## Ready for Admin decision

| # | Record ID | Character | Role | Const. | Tier | Score | Admin notes / risk | Decision | Actor | Decided at | Rights |
|---:|---|---|---|---|---:|---:|---|---|---|---|---|
| 1 | `CHAR-TIER-B2-01` | Xiangling (`xiangling`) | SUB_DPS | C0 | **S** | 83.8 | Nhu cau ER 80 energy va battery van la gia dinh rotation; khong co risk ve evidence hoac rubric. | PENDING | — | — | not verified |
| 2 | `CHAR-TIER-B2-02` | Xiangling (`xiangling`) | SUB_DPS | C6 | **S** | 81.5 | Buff 15% Pyro DMG chi co gia tri voi Pyro damage; C1 Pyro RES shred khong duoc cong, da ghi ro. | PENDING | — | — | not verified |
| 3 | `CHAR-TIER-B2-03` | Furina (`furina`) | SUB_DPS | C0 | **SS** | 87.9 | Gia dinh co healer va dao dong HP de tich Fanfare; energy da dua ve 60 (khong phai "cao"). | PENDING | — | — | not verified |
| 4 | `CHAR-TIER-B2-04` | Furina (`furina`) | SUPPORT | C0 | **SS** | 88.8 | Trung lap mot phan voi record SUB_DPS (cung kit, khac goc nhan); can Admin xac nhan cho phep hai role cho cung mot character. | PENDING | — | — | not verified |
| 5 | `CHAR-TIER-B2-05` | Neuvillette (`neuvillette`) | MAIN_DPS | C0 | **SS** | 86.3 | Da sua gia dinh: can 3 loai reaction KHAC NHAU do party member trigger de lay du 3 stack (moi loai stack rieng, toi da 3). Interruption resistance van la gia dinh thao tac. | PENDING | — | — | not verified |
| 6 | `CHAR-TIER-B2-06` | Raiden Shogun (`raiden-shogun`) | MAIN_DPS | C0 | **S** | 81.5 | Gia dinh party co nhieu unit hay dung Burst de tich Resolve; C2/C6 khong duoc cong. | PENDING | — | — | not verified |
| 7 | `CHAR-TIER-B2-07` | Nahida (`nahida`) | SUPPORT | C0 | **SS** | 91 | Da sua energy tu 80 thanh 50 theo genshin-db. Con phu thuoc reaction partner va duy tri mark. | PENDING | — | — | not verified |
| 8 | `CHAR-TIER-B2-08` | Zhongli (`zhongli`) | SUPPORT | C0 | **S** | 84.1 | Da sua energy tu 80 thanh 40 theo genshin-db. It damage buff truc tiep la diem yeu da ghi nhan. | PENDING | — | — | not verified |
| 9 | `CHAR-TIER-B2-09` | Yelan (`yelan`) | SUB_DPS | C0 | **S** | 83.9 | Da sua energy tu 80 thanh 70 theo genshin-db. Buff ramp mat neu recast Burst la gia dinh da ghi ro. | PENDING | — | — | not verified |

Special attention:

- `CHAR-TIER-B2-04` and `CHAR-TIER-B2-03` are two separate role records for Furina. The Admin must approve or reject each explicitly; approval of one does not approve the other.
- `xiangling|C0` and `xiangling|C6` are separate constellation records.
- No tier may be displayed publicly while its decision is `PENDING`.

## Excluded from this sheet

| Character | Role / const. | Category | Reason |
|---|---|---|---|
| Bennett | SUPPORT / C0 | RUBRIC_RECALIBRATION | Evidence quality (20%) dang duoc tinh vao performance. Bo evidence va chuan hoa lai: 86.4 -> SS, trong khi rubric v1.0 cho S. Buff van bi tran boi Base ATK va field-bound. |
| Bennett | SUPPORT / C6 | RUBRIC_RECALIBRATION | SS chỉ hơn nguong 0.1 diem; +15% Pyro DMG va infusion chi ap dung cho sword/claymore/polearm, khong universal. Trung lap giua constellation score va access score khi danh gia chi phi C6. |
| Fischl | SUB_DPS / C0 | RUBRIC_RECALIBRATION | Bo evidence va chuan hoa lai: 76.4 -> S, lech mot tier so voi A hien tai. Local DB co 0 CharacterTeam row nen confidence MEDIUM; Oz van duoc duy tri la gia dinh. |
| Xingqiu | SUB_DPS / C0 | NEEDS_MORE_EVIDENCE | Co 3 trich dan genshin-db xac thuc nhung local DB chi 2 weapon / 1 artifact / 0 team row; confidence MEDIUM. Gia dinh DPS dung Normal Attack chua duoc corroborate bang team row. |
| Kaedehara Kazuha | SUPPORT / C0 | NEEDS_MORE_EVIDENCE | VV 40% RES shred la gia dinh artifact set (da bo sung trich dan genshin-db/artifacts). Local DB co 0 CharacterTeam row nen khong the corroborate rotation Swirl-truoc-DPS. |
| Mitya | SUPPORT / C0 | GAMEPLAY_ASSUMPTION_UNVERIFIED | Da bo sung dieu kien: 30 EM / Beacon chi o Steady State; Overloaded cho Beacon sau Stellar-Conduct; base Stellar-Conduct DMG cap 14%. Kit chi huu ich trong comp Electro+Cryo va can quan ly trang thai Core; release v7.2 nen local evidence con mong (3 team row). |

## Decision workflow (blocked until a real Admin acts)

1. Verify the source SHA-256 and the per-record `recordSha256` in the JSON companion.
2. In an authenticated Admin session, record one of `APPROVE`, `REQUEST_CHANGES`, `REJECT` per row, with a real actor, timestamp and reason. JSON fields are evidence only, never authorization.
3. Only `APPROVE` makes a record import-eligible. Do not auto-approve, do not import all 15, do not import 292/296 `SOURCE_DERIVED` records.
4. Insert through the backend Admin GraphQL mutation with audit logging, then verify PostgreSQL, public GraphQL and the existing Tier List. Stop here until approval exists.

**Current import eligibility: 0 / 9.**
