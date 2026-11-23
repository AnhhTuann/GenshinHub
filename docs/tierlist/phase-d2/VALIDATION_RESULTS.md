# Phase D2 — Validation Results

**STATUS: PASS — REVIEW-ONLY ARTIFACTS VALIDATED**

- Generated: 2026-11-20T10:12:15.550Z
- Runtime: 2026-11-20T10:10:36.103Z → 2026-11-20T10:12:15.551Z
- Execution mode: **sequential** (each command completed before the next started; Node test files used `--test-concurrency=1`).
- No UI/Playwright rerun: Phase D2 changed no frontend or CSS file.

## Summary

All sequential checks passed: **30/30** custom Phase D2 checks (pre + post), freeze verification read-only, Prisma validate/migrate status, backend + frontend TypeScript, **15/15** unit/regression test files with 0 failures, and identical read-only DB counts before/after. TypeScript 6.0.3 + ts-node 10.9.2 now require an explicit rootDir for single-file execution; each TS test was run with `TS_NODE_COMPILER_OPTIONS={"rootDir":"."}`. No tsconfig or dependency file was edited. Three database-mutating integration scripts were intentionally not rerun; they were already green in the prior Phase D preparation baseline. Playwright/E2E was not rerun because Phase D2 changed no UI.

| # | Check | Exit | Result | Duration |
|---:|---|---|---|---:|
| 1 | Phase D2 custom validation (pre-check) | `0` | PASS | 2752ms |
| 2 | Weapon B3 freeze verification | `0` | PASS | 199ms |
| 3 | Read-only development database count (before) | `0` | PASS | 203ms |
| 4 | Prisma schema validation | `0` | PASS | 1711ms |
| 5 | Prisma migration status | `0` | PASS | 1984ms |
| 6 | Backend TypeScript typecheck | `0` | PASS | 8694ms |
| 7 | Frontend TypeScript typecheck | `0` | PASS | 25729ms |
| 8 | CJS unit/regression suite (14 files, sequential) | `0` | PASS | 5895ms |
| 9 | TS test scripts/sync/asset.test.ts | `0` | PASS | 10572ms |
| 10 | TS test scripts/sync/materialBackfill.test.ts | `0` | PASS | 4632ms |
| 11 | TS test src/graphql/dataloaders/index.test.ts | `0` | PASS | 1308ms |
| 12 | TS test src/graphql/modules/characterTierRanking/characterTierRanking.graphql.test.ts | `0` | PASS | 5408ms |
| 13 | TS test src/graphql/modules/characterTierRanking/characterTierRanking.test.ts | `0` | PASS | 5243ms |
| 14 | TS test src/graphql/modules/characterTierRanking/migration.test.ts | `0` | PASS | 634ms |
| 15 | TS test src/graphql/modules/characterTierRanking/phaseB25Review.test.ts | `0` | PASS | 786ms |
| 16 | TS test src/graphql/modules/characterTierRanking/phaseB2Draft.test.ts | `0` | PASS | 4676ms |
| 17 | TS test src/graphql/modules/characterTierRanking/phaseC1Smoke.test.ts | `0` | PASS | 4639ms |
| 18 | TS test src/graphql/modules/weaponTierRanking/db.integration.test.ts | `0` | PASS | 1509ms |
| 19 | TS test src/graphql/modules/weaponTierRanking/migration.test.ts | `0` | PASS | 1142ms |
| 20 | TS test src/graphql/modules/weaponTierRanking/weaponTierDataloader.test.ts | `0` | PASS | 1232ms |
| 21 | TS test src/graphql/modules/weaponTierRanking/weaponTierRanking.graphql.test.ts | `0` | PASS | 5497ms |
| 22 | TS test src/graphql/modules/weaponTierRanking/weaponTierRanking.test.ts | `0` | PASS | 1320ms |
| 23 | Read-only development database count (after) | `0` | PASS | 249ms |
| 24 | Phase D2 custom validation (post-check) | `0` | PASS | 3421ms |

## Skipped database-mutating scripts

- `backend/src/graphql/modules/characterTierRanking/characterTierRanking.integration.test.ts` — Uses a write/rollback probe on CharacterTierRanking; Phase D2 forbids ranking writes. Already verified in prior Phase D preparation.
- `backend/src/graphql/modules/weaponTierReview/weaponTierReview.integration.test.ts` — Deletes and recreates WeaponTierReview rows; Phase D2 forbids review/decision database writes. Already verified in prior Phase D preparation.
- `backend/scripts/sync/e2e.test.ts` — Requires a live GraphQL server and performs fixture writes to the development database; unrelated to D2 data-only artifacts.

## Detailed logs

### 1. Phase D2 custom validation (pre-check)

- Command: `node /tmp/opencode/d2/validate-d2.cjs`
- CWD: `/home/tuan/Documents/GenshinHub`
- Exit code: `0`
- Duration: 2752ms

````text
PASS  watched source checksums unchanged (no CONCURRENT_EDIT) :: 15/15 hashes match
PASS  all 6 Phase D2 artifacts exist :: 6/6 files
PASS  draft JSON parses and has 9 Character / 14 Weapon records :: 9 + 14
PASS  artifact checksums match canonical record arrays :: 2/2 recomputed
PASS  all per-record newChecksum values recompute correctly :: 23/23 recomputed
PASS  old checksums match frozen source records and differ from new checksums :: 23/23 linked
PASS  required schema fields present on all 23 revised records :: 23/23 complete
PASS  ID / role / tier mapping matches source records :: 9 + 14 mapped
PASS  tier values are within approved tier set :: SS/S/A/B/C/D only
PASS  constellation and refinement checks :: 9 constellations + 14 refinements
PASS  duplicate detection: no repeated stable keys :: 4 uniqueness groups
PASS  evidence is non-empty and gameplay assumptions explicit :: 23/23 records have evidence + assumptions
PASS  approval guards: nothing approved, importable or actor-populated :: 23/23 pending and non-importable
PASS  no SOURCE_DERIVED promotion and rights remain unverified :: rightsVerifiedTrue=0
PASS  no rarity / recommendation-count / external-editorial tier copying :: no forbidden tier-justification basis
PASS  Character: no tier changed; Raiden paused; 6 excluded drafts untouched :: 9 tiers kept, 1 paused, 6 excluded
PASS  Character game facts: Xiangling C0 and C6 handled correctly :: C0 conditional + C6 tested exception
PASS  Character game facts: Furina roles are distinct :: distinct role explanations
PASS  Character game facts: Neuvillette A1 vs playability and C0 interruption :: 3 reaction types != hard prerequisite
PASS  Character game facts: Zhongli RES shred and Yelan burst facts :: Zhongli + Yelan + Nahida verified
PASS  genshin-db local ground truth for key Character facts :: genshin-db@5.2.15 key facts intact
PASS  Weapon: exactly 2 tier changes remain unconfirmed :: 14302 + 14402 pending
PASS  Weapon: blocked / comparative records have correct status and confidence :: 12401 LOW/blocked, 13501 paused
PASS  Weapon game facts: Favonius R1 reliability uses R1, not R5 :: 11401 + 13407 R1-only
PASS  Weapon game facts: 11403 / 11418 / 11512 / 12502 conditions :: 4 conditional passives verified
PASS  Weapon game facts: tier-rereview dossiers are complete :: SS→S and S→A dossiers present
PASS  Weapon game facts: 14406 / 14509 / 15402 / 15508 corrected :: 4 corrected fact explanations
PASS  Weapon game-facts.json exact passive values still present :: 14/14 passive values intact
PASS  Freeze manifest is still internally consistent :: batch + manifest + decision sheet verified
PASS  FINAL_ADMIN_REVIEW.md has exactly 12 numbered answer items :: 1..12 present

D2_CUSTOM_VALIDATION=PASS checks=30 passed=30 failed=0
````

### 2. Weapon B3 freeze verification

- Command: `node scripts/weapon-tier-independent/freeze.cjs --verify`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 199ms

````text
{
  "ok": true,
  "issues": [],
  "manifest": {
    "phase": "B3",
    "frozenAt": "2026-11-20T09:17:50.995Z",
    "description": "Frozen B3 draft checksums. Per-record hash covers the candidate, its evidence and its review decision. No approval or rights flag is part of this freeze.",
    "files": {
      "docs/weapon-tier-audit/PHASE_B2_6_FINAL_REVIEW.md": {
        "sha256": "1489092b927c1ef1b3882f0ca37ddcf2db415c45d31b74f3ed02d5b1df559530",
        "size": 48117,
        "mtimeMs": 1795166265795.1965
      },
      "docs/weapon-tier-independent/approval-package.json": {
        "sha256": "3ad72e120b4b28405ac1df9c7aace93b3ce3c0c85d5d5f640c676eddb7a1bc00",
        "size": 43391,
        "mtimeMs": 1795165799755.9253
      },
      "backend/scripts/weapon-tier-independent/candidates.input.json": {
        "sha256": "554704cc623535f38a2cda3ea8cb02a8facb29b265a3c394429782b392296704",
        "size": 32497,
        "mtimeMs": 1795165737965.1387
      },
      "backend/scripts/weapon-tier-independent/review.input.json": {
        "sha256": "f6595a22ceb306d90f899f5306c300152291d6472e31694eeedf910a217efa31",
        "size": 13661,
        "mtimeMs": 1795165772078.9062
      },
      "docs/weapon-tier-independent/RUBRIC.md": {
        "sha256": "05ef89acfbc90982dc2132ea3df776975055a6904fd544fc2bf84974dfdb7f74",
        "size": 5417,
        "mtimeMs": 1795164966432.02
      },
      "docs/weapon-tier-independent/independent-candidates.json": {
        "sha256": "26931cdfb1eccc47a1a010bfe78ca68f5ee754d25d0147ef9d2802b1d92aca28",
        "size": 47290,
        "mtimeMs": 1795165799589.2566
      },
      "docs/weapon-tier-independent/game-facts.json": {
        "sha256": "7d8312b98b973ba91ea0a40caebf165ea48e6d327ac176f0970d81144a1ea79c",
        "size": 11183,
        "mtimeMs": 1795164834420.3582
      }
    },
    "records": [
      {
        "candidateId": "independent-11401-SUPPORT-R1",
        "weaponId": "11401",
        "sha256": "99bcedcc30f03b29008f31285c00fdcac1a19dd0337c30764060c99bcfa9dce9"
      },
      {
        "candidateId": "independent-11403-SUB_DPS-R5",
        "weaponId": "11403",
        "sha256": "79833088e0284741a1401b572af8f51788c55f627225a0df02f2260bf90cd257"
      },
      {
        "candidateId": "independent-11418-SUPPORT-R1",
        "weaponId": "11418",
        "sha256": "3e268bac16e789d3ddc732a562f5d8db4678f94784f663e5828da8683e36bda7"
      },
      {
        "candidateId": "independent-11512-MAIN_DPS-R1",
        "weaponId": "11512",
        "sha256": "ff161813968954a2eaf2387b04eed7da6232e9846328160079f571c99e047929"
      },
      {
        "candidateId": "independent-12401-SUB_DPS-R1",
        "weaponId": "12401",
        "sha256": "4c6d8185295e9e7abb9f1fdab6d682b85569c5d8b12ca1cbab8e67d20dff051a"
      },
      {
        "candidateId": "independent-12502-SUPPORT-R1",
        "weaponId": "12502",
        "sha256": "4831c47ef50dd9ec4481101b0c0e408a29b7215e0c78bd3e433503ebbecf6724"
      },
      {
        "candidateId": "independent-13407-SUPPORT-R1",
        "weaponId": "13407",
        "sha256": "9c05a3f28683a33234e1ad912882ad281822e53c0db41dcb3944d06212b83e0e"
      },
      {
        "candidateId": "independent-13501-MAIN_DPS-R1",
        "weaponId": "13501",
        "sha256": "af208d96f8a5d859d1ed54bcc35d7c95122decec2c7897705aba62282cb17e86"
      },
      {
        "candidateId": "independent-14302-SUPPORT-R5",
        "weaponId": "14302",
        "sha256": "14e2cd13fc59cf36709fcf2189ad9f9ea825f4c76adfd669b1d4fcc9667f7c57"
      },
      {
        "candidateId": "independent-14402-SUB_DPS-R1",
        "weaponId": "14402",
        "sha256": "7976f8d5c0119eba5c393b495e4445f60d22486f2e4b33e6bcb799cbbc620df9"
      },
      {
        "candidateId": "independent-14406-SUPPORT-R5",
        "weaponId": "14406",
        "sha256": "25d579067f2654c8eb4f591a6eeee33ce0ef78965cb8414621fc69ddc6711e0d"
      },
      {
        "candidateId": "independent-14509-SUB_DPS-R1",
        "weaponId": "14509",
        "sha256": "50bf4af224937eaf825459f7c2dab84aea3cd36c634493631a606862acb9b381"
      },
      {
        "candidateId": "independent-15402-SUB_DPS-R1",
        "weaponId": "15402",
        "sha256": "c4ded204a2e3c98b210583071984ca6607cb109d47de5e861fbb671e29bdc448"
      },
      {
        "candidateId": "independent-15508-MAIN_DPS-R1",
        "weaponId": "15508",
        "sha256": "07431e870377f01815f9d071b363040a5f7124c5b3420308382a71620e0874e8"
      }
    ],
    "batchSha256": "e61f9f4cca59697b3812c17019c211555c51b8a2b81fd4af200e3857177a810e",
    "dbStateAtFreeze": {
      "ranks": 0,
      "audits": 0,
      "weapons": 279
    },
    "writeCount": 0,
    "decisionSheetSha256": "a100002cc2e5f1815bf20836bda1b111c68d97bd22aa924161541c61df40caf9",
    "sha256": "30372bf5de13d50856d479789f64598b53fde474c6043f4787094d5fd628777a"
  },
  "db": {
    "ranks": 0,
    "audits": 0,
    "matchesFreeze": true
  }
}
````

### 3. Read-only development database count (before)

- Command: `node /tmp/opencode/d2/db-count.cjs`
- CWD: `/home/tuan/Documents/GenshinHub`
- Exit code: `0`
- Duration: 203ms

````text
{
  "database": "genshinhub",
  "Character": 131,
  "Weapon": 279,
  "CharacterBuild": 127,
  "CharacterBuildAudit": 127,
  "CharacterTierRanking": 0,
  "WeaponTierRank": 0,
  "WeaponTierAudit": 0
}
````

### 4. Prisma schema validation

- Command: `npx prisma validate`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 1711ms

````text
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
The schema at /home/tuan/Documents/GenshinHub/backend/prisma/schema.prisma is valid 🚀
````

### 5. Prisma migration status

- Command: `npx prisma migrate status`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 1984ms

````text
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": PostgreSQL database "genshinhub", schema "public" at "127.0.0.1:5434"

5 migrations found in prisma/migrations


Database schema is up to date!
````

### 6. Backend TypeScript typecheck

- Command: `npx tsc --noEmit --pretty false`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 8694ms

````text
(no output)
````

### 7. Frontend TypeScript typecheck

- Command: `npx tsc --noEmit --pretty false`
- CWD: `/home/tuan/Documents/GenshinHub/frontend`
- Exit code: `0`
- Duration: 25729ms

````text
(no output)
````

### 8. CJS unit/regression suite (14 files, sequential)

- Command: `node --test --test-concurrency=1 scripts/build-audit/apply.test.cjs scripts/build-audit/audit.test.cjs scripts/build-audit/playstyle.test.cjs scripts/sync/check-version.test.cjs scripts/weapon-tier-audit/pipeline.test.cjs scripts/weapon-tier-audit/tier-map.test.cjs scripts/weapon-tier-independent/admin-review.test.cjs scripts/weapon-tier-independent/approval.test.cjs scripts/weapon-tier-independent/freeze.test.cjs scripts/weapon-tier-independent/game-facts.test.cjs scripts/weapon-tier-independent/import-b32.test.cjs scripts/weapon-tier-independent/import-guard.test.cjs scripts/weapon-tier-independent/independent.test.cjs scripts/weapon-tier-independent/migration-integrity.test.cjs`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 5895ms

````text
TAP version 13
# Subtest: explicit approval binds the reviewed payload and rights reference
ok 1 - explicit approval binds the reviewed payload and rights reference
  ---
  duration_ms: 4.150044
  ...
# Subtest: maps all fields, preserves 2+2 format and leaves unsourced tier blank
ok 2 - maps all fields, preserves 2+2 format and leaves unsourced tier blank
  ---
  duration_ms: 5.592983
  ...
# Subtest: apply is idempotent, conflicts with protected content and rollback preserves later edits
ok 3 - apply is idempotent, conflicts with protected content and rollback preserves later edits
  ---
  duration_ms: 1.779525
  ...
# Subtest: write target rejects remote, unsafe options, production and mismatched DB names
ok 4 - write target rejects remote, unsafe options, production and mismatched DB names
  ---
  duration_ms: 2.551694
  ...
# Subtest: preserves editorial order and independent artifact alternatives
ok 5 - preserves editorial order and independent artifact alternatives
  ---
  duration_ms: 2.770185
  ...
# Subtest: counts matched catalog entries and previews while preserving admin fields
ok 6 - counts matched catalog entries and previews while preserving admin fields
  ---
  duration_ms: 1.378664
  ...
# Subtest: fails closed on wrong ID, duplicate options, malformed teams and impossible popularity
ok 7 - fails closed on wrong ID, duplicate options, malformed teams and impossible popularity
  ---
  duration_ms: 0.785802
  ...
# Subtest: unmatched or ambiguous entries require review
ok 8 - unmatched or ambiguous entries require review
  ---
  duration_ms: 0.48681
  ...
# Subtest: the public adapter keeps provenance, validates the response and observes long retry limits
ok 9 - the public adapter keeps provenance, validates the response and observes long retry limits
  ---
  duration_ms: 42.628392
  ...
# Subtest: maps approved Main DPS label without inventing other roles
ok 10 - maps approved Main DPS label without inventing other roles
  ---
  duration_ms: 2.496058
  ...
# Subtest: maps combined Support / Sub DPS label to both tokens
ok 11 - maps combined Support / Sub DPS label to both tokens
  ---
  duration_ms: 0.366922
  ...
# Subtest: is generic across characters and labels
ok 12 - is generic across characters and labels
  ---
  duration_ms: 0.233675
  ...
# Subtest: returns canonical order and no tokens for unknown labels
ok 13 - returns canonical order and no tokens for unknown labels
  ---
  duration_ms: 0.204357
  ...
# Subtest: registry checker reports a newer compatible version without applying it
ok 14 - registry checker reports a newer compatible version without applying it
  ---
  duration_ms: 69.217193
  ...
# Subtest: registry checker distinguishes major upgrades and registry errors
ok 15 - registry checker distinguishes major upgrades and registry errors
  ---
  duration_ms: 1.740883
  ...
# Subtest: all nine required test cases map to verified local weapon IDs
ok 16 - all nine required test cases map to verified local weapon IDs
  ---
  duration_ms: 1.804557
  ...
# Subtest: draft has no invented tier D, no invented refinement, no claimed version
ok 17 - draft has no invented tier D, no invented refinement, no claimed version
  ---
  duration_ms: 0.366644
  ...
# Subtest: validation detects invalid data and admin conflicts without touching the DB
ok 18 - validation detects invalid data and admin conflicts without touching the DB
  ---
  duration_ms: 0.753977
  ...
# Subtest: diff uses required columns and flags source conflicts and missing explanations
ok 19 - diff uses required columns and flags source conflicts and missing explanations
  ---
  duration_ms: 2.114293
  ...
# Subtest: curated explanations are role-specific and never copied wholesale
ok 20 - curated explanations are role-specific and never copied wholesale
  ---
  duration_ms: 0.370883
  ...
# Subtest: source grid has 296 ranked cells and 30 unlabelled cells excluded
ok 21 - source grid has 296 ranked cells and 30 unlabelled cells excluded
  ---
  duration_ms: 5.643483
  ...
# Subtest: source publishes five labelled tiers, never D, and three roles
ok 22 - source publishes five labelled tiers, never D, and three roles
  ---
  duration_ms: 2.844379
  ...
# Subtest: weapons page has no published game version and is not assigned 7.2
ok 23 - weapons page has no published game version and is not assigned 7.2
  ---
  duration_ms: 2.35124
  ...
# Subtest: ranking key uses weapon, type, role, refinement and version but not tier
ok 24 - ranking key uses weapon, type, role, refinement and version but not tier
  ---
  duration_ms: 0.396314
  ...
# Subtest: sheet is derived from a verified freeze and binds every checksum
ok 25 - sheet is derived from a verified freeze and binds every checksum
  ---
  duration_ms: 6.704338
  ...
# Subtest: Group A has exactly 13 complete review records
ok 26 - Group A has exactly 13 complete review records
  ---
  duration_ms: 1.656811
  ...
# Subtest: Favonius Greatsword is retained in Group B with all six evidence gaps
ok 27 - Favonius Greatsword is retained in Group B with all six evidence gaps
  ---
  duration_ms: 0.328744
  ...
# Subtest: both tier changes require a separate, currently unconfirmed Admin review
ok 28 - both tier changes require a separate, currently unconfirmed Admin review
  ---
  duration_ms: 0.428743
  ...
# Subtest: rights dossier keeps every flag false and rejects source-derived data
ok 29 - rights dossier keeps every flag false and rejects source-derived data
  ---
  duration_ms: 0.253055
  ...
# Subtest: all 14 decisions are still missing and authentication is server-side
ok 30 - all 14 decisions are still missing and authentication is server-side
  ---
  duration_ms: 0.247537
  ...
# Subtest: generated report and dry-run artifacts exist and show all five counts
ok 31 - generated report and dry-run artifacts exist and show all five counts
  ---
  duration_ms: 1.305803
  ...
# Subtest: buildReport is deterministic for the same sheet
ok 32 - buildReport is deterministic for the same sheet
  ---
  duration_ms: 1.478204
  ...
# Subtest: final approval package has exactly 14 reviewed candidates with valid statuses
ok 33 - final approval package has exactly 14 reviewed candidates with valid statuses
  ---
  duration_ms: 2.314087
  ...
# Subtest: approval package does not mutate the candidate artifact
ok 34 - approval package does not mutate the candidate artifact
  ---
  duration_ms: 1.438442
  ...
# Subtest: refinement is never silently changed and R1/R5 rationale is preserved
ok 35 - refinement is never silently changed and R1/R5 rationale is preserved
  ---
  duration_ms: 0.596807
  ...
# Subtest: tier changes keep OLD_TIER, PROPOSED_TIER, reason, evidence and admin re-review flag
ok 36 - tier changes keep OLD_TIER, PROPOSED_TIER, reason, evidence and admin re-review flag
  ---
  duration_ms: 11.963613
  ...
# Subtest: Phase B3 re-reviews are reflected in the final package
ok 37 - Phase B3 re-reviews are reflected in the final package
  ---
  duration_ms: 0.750433
  ...
# Subtest: corrected Prototype Amber and Aqua Simulacra facts are final, not merely flagged
ok 38 - corrected Prototype Amber and Aqua Simulacra facts are final, not merely flagged
  ---
  duration_ms: 0.414184
  ...
# Subtest: every final row carries explanation, facts, conditions, sensitivity and limitations
ok 39 - every final row carries explanation, facts, conditions, sensitivity and limitations
  ---
  duration_ms: 0.416931
  ...
# Subtest: no source-derived or relabelled research record appears in the package
ok 40 - no source-derived or relabelled research record appears in the package
  ---
  duration_ms: 4.008243
  ...
# Subtest: rights are never auto-verified and every candidate needs an admin decision
ok 41 - rights are never auto-verified and every candidate needs an admin decision
  ---
  duration_ms: 0.513359
  ...
# Subtest: freeze verify passes with stable inputs and zero ranking rows
ok 42 - freeze verify passes with stable inputs and zero ranking rows
  ---
  duration_ms: 21.053574
  ...
# Subtest: every frozen file has a sha256, size and mtime
ok 43 - every frozen file has a sha256, size and mtime
  ---
  duration_ms: 4.923271
  ...
# Subtest: per-record hashes are unique, sorted and reproduce the batch hash
ok 44 - per-record hashes are unique, sorted and reproduce the batch hash
  ---
  duration_ms: 7.935862
  ...
# Subtest: canonical hashing is key-order independent
ok 45 - canonical hashing is key-order independent
  ---
  duration_ms: 0.400914
  ...
# Subtest: two-pass guard detects concurrent modification of any frozen file
ok 46 - two-pass guard detects concurrent modification of any frozen file
  ---
  duration_ms: 0.87204
  ...
# Subtest: decision sheet contains every required B3 field and no real approval
ok 47 - decision sheet contains every required B3 field and no real approval
  ---
  duration_ms: 0.926113
  ...
# Subtest: decision input template has one PENDING row per frozen record
ok 48 - decision input template has one PENDING row per frozen record
  ---
  duration_ms: 4.63528
  ...
# Subtest: game-facts artifact matches the installed genshin-db exactly
ok 49 - game-facts artifact matches the installed genshin-db exactly
  ---
  duration_ms: 9.740371
  ...
# Subtest: REGRESSION — Prototype Amber R5 does NOT restore Energy for the whole party
ok 50 - REGRESSION — Prototype Amber R5 does NOT restore Energy for the whole party
  ---
  duration_ms: 1.198904
  ...
# Subtest: REGRESSION — Aqua Simulacra R1 requires nearby opponents (inverted-condition guard)
ok 51 - REGRESSION — Aqua Simulacra R1 requires nearby opponents (inverted-condition guard)
  ---
  duration_ms: 0.892736
  ...
# Subtest: every draft cites resolvable evidence and at least one value from its own refinement
ok 52 - every draft cites resolvable evidence and at least one value from its own refinement
  ---
  duration_ms: 0.611348
  ...
# Subtest: passive trigger conditions are explicit for every conditional weapon
ok 53 - passive trigger conditions are explicit for every conditional weapon
  ---
  duration_ms: 1.165061
  ...
# Subtest: setup: read-only dev state with 5 migrations and zero ranking rows
ok 54 - setup: read-only dev state with 5 migrations and zero ranking rows
  ---
  duration_ms: 127.096084
  ...
# Subtest: toDecisionRecord maps only server-persisted fields and ignores injected client actors
ok 55 - toDecisionRecord maps only server-persisted fields and ignores injected client actors
  ---
  duration_ms: 10.654024
  ...
# Subtest: authoritative DB queue cannot be read without a real Admin key
ok 56 - authoritative DB queue cannot be read without a real Admin key
  ---
  duration_ms: 1.194932
  ...
# Subtest: all-PENDING DB decisions: 14 blocked, 0 eligible, writeCount 0
ok 57 - all-PENDING DB decisions: 14 blocked, 0 eligible, writeCount 0
  ---
  duration_ms: 19.877631
  ...
# Subtest: fully decided DB review queue yields 14 eligible DB-sourced operations
ok 58 - fully decided DB review queue yields 14 eligible DB-sourced operations
  ---
  duration_ms: 16.65907
  ...
# Subtest: subset DB import: only the selected candidate is eligible, writeCount stays 1
ok 59 - subset DB import: only the selected candidate is eligible, writeCount stays 1
  ---
  duration_ms: 17.150417
  ...
# Subtest: incomplete or checksum-mismatched rights grounds block the DB decision
ok 60 - incomplete or checksum-mismatched rights grounds block the DB decision
  ---
  duration_ms: 29.025295
  ...
# Subtest: Group B stays blocked without the six supplemented evidence fields
ok 61 - Group B stays blocked without the six supplemented evidence fields
  ---
  duration_ms: 16.462458
  ...
# Subtest: REQUEST_CHANGES and REJECT DB decisions are skipped, never written
ok 62 - REQUEST_CHANGES and REJECT DB decisions are skipped, never written
  ---
  duration_ms: 15.511735
  ...
# Subtest: fake and generic actors are rejected
ok 63 - fake and generic actors are rejected
  ---
  duration_ms: 142.870953
  ...
# Subtest: parseSelection supports all, candidate ids and weapon ids
ok 64 - parseSelection supports all, candidate ids and weapon ids
  ---
  duration_ms: 2.338365
  ...
# Subtest: all-PENDING decisions: 14 blocked, 0 eligible, writeCount 0
ok 65 - all-PENDING decisions: 14 blocked, 0 eligible, writeCount 0
  ---
  duration_ms: 40.208353
  ...
# Subtest: a fully decided batch yields 14 eligible operations with no fatal issues
ok 66 - a fully decided batch yields 14 eligible operations with no fatal issues
  ---
  duration_ms: 22.536648
  ...
# Subtest: partial import: selecting one candidate writes one row and blocks the rest
ok 67 - partial import: selecting one candidate writes one row and blocks the rest
  ---
  duration_ms: 19.093419
  ...
# Subtest: partial import by weapon id can include a tier-changed row only with both confirmations
ok 68 - partial import by weapon id can include a tier-changed row only with both confirmations
  ---
  duration_ms: 22.648668
  ...
# Subtest: REQUEST_CHANGES and REJECT are skipped, never written
ok 69 - REQUEST_CHANGES and REJECT are skipped, never written
  ---
  duration_ms: 11.918349
  ...
# Subtest: checksum mismatch is reported as changed and excluded from writes
ok 70 - checksum mismatch is reported as changed and excluded from writes
  ---
  duration_ms: 19.157194
  ...
# Subtest: false publishRightsVerified blocks the record; automation cannot flip it
ok 71 - false publishRightsVerified blocks the record; automation cannot flip it
  ---
  duration_ms: 13.585708
  ...
# Subtest: auth-bypass fields are fatal; JSON actors are never proof of authorization
ok 72 - auth-bypass fields are fatal; JSON actors are never proof of authorization
  ---
  duration_ms: 26.311353
  ...
# Subtest: source-derived records and unknown candidate ids are excluded fatally
ok 73 - source-derived records and unknown candidate ids are excluded fatally
  ---
  duration_ms: 27.10671
  ...
# Subtest: Group B stays blocked until all six evidence fields are supplied
ok 74 - Group B stays blocked until all six evidence fields are supplied
  ---
  duration_ms: 13.683499
  ...
# Subtest: tampered decision sheet, non-empty DB and bad migrations are fatal
ok 75 - tampered decision sheet, non-empty DB and bad migrations are fatal
  ---
  duration_ms: 13.772573
  ...
# Subtest: all applied migrations (including B3.2 review schema) match local checksums
ok 76 - all applied migrations (including B3.2 review schema) match local checksums
  ---
  duration_ms: 0.677024
  ...
# Subtest: built operations bind the frozen checksum and never carry an actor field
ok 77 - built operations bind the frozen checksum and never carry an actor field
  ---
  duration_ms: 12.142192
  ...
# Subtest: validation covers all nineteen required rules
ok 78 - validation covers all nineteen required rules
  ---
  duration_ms: 5.387915
  ...
# Subtest: duplicate logical key and admin override are detected
ok 79 - duplicate logical key and admin override are detected
  ---
  duration_ms: 0.505383
  ...
# Subtest: sentence counter reads Vietnamese punctuation
ok 80 - sentence counter reads Vietnamese punctuation
  ---
  duration_ms: 0.442702
  ...
# Subtest: artifact is a small independent, unapproved, non-public batch
ok 81 - artifact is a small independent, unapproved, non-public batch
  ---
  duration_ms: 0.501062
  ...
# Subtest: every candidate stores oldTier, a reason, gameplay conditions and sensitivity
ok 82 - every candidate stores oldTier, a reason, gameplay conditions and sensitivity
  ---
  duration_ms: 0.720604
  ...
# Subtest: no candidate is a relabelled research record
ok 83 - no candidate is a relabelled research record
  ---
  duration_ms: 6.395219
  ...
# Subtest: managed migration checksums match the applied records exactly
ok 84 - managed migration checksums match the applied records exactly
  ---
  duration_ms: 114.246261
  ...
# Subtest: weapon migration is additive and no ranking row was written
ok 85 - weapon migration is additive and no ranking row was written
  ---
  duration_ms: 45.975181
  ...
# Subtest: character tier migration objects physically exist despite steps count 0
ok 86 - character tier migration objects physically exist despite steps count 0
  ---
  duration_ms: 44.519273
  ...
# Subtest: CharacterBuild drift is documented from audit evidence, not guessed
ok 87 - CharacterBuild drift is documented from audit evidence, not guessed
  ---
  duration_ms: 40.277035
  ...
1..87
# tests 87
# suites 0
# pass 87
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 5827.476386
````

### 9. TS test scripts/sync/asset.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only scripts/sync/asset.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 10572ms

````text
🧪 Asset integration tests
   storage root: /tmp/genshinhub-assets-YZdoZl

— Path safety —
  ✅ root resolves to ASSET_STORAGE_PATH
  ✅ valid rel path resolves inside root
  ✅ traversal ../ rejected
  ✅ traversal nested rejected
  ✅ absolute-ish escape rejected
  ✅ isSafeRelPath false for traversal
  ✅ isSafeRelPath true for normal

— Download & convert —
  ✅ missing asset downloads successfully
  ✅ file exists at resolved path
  ✅ output is valid WebP
  ✅ RIFF/WEBP magic bytes
  ✅ exactly 1 HTTP hit

— No overwrite / skip —
  ✅ existing valid asset skipped
  ✅ no HTTP request made
  ✅ file untouched

— Corrupt file handling —
  ✅ corrupt file flagged invalid
  ✅ corrupt file replaced by valid webp

— CDN 404 isolation —
  ✅ 404 returns ok=false (không throw)
  ✅ 404 skips retry on the same source
  ✅ failed replacement preserves existing file
  ✅ asset sau 404 vẫn tải được
  ✅ không có placeholder file cho 404

— Retry bounded —
  ✅ retry tới khi thành công
  ✅ số lần thử <= MAX_RETRIES(3)
  ✅ fail sau đúng 3 lần thử
  ✅ kết quả ok=false sau retries

— Source fallback —
  ✅ fallback sang nguồn 2 thành công
  ✅ đã thử đúng 2 nguồn

— scanAssets (prisma stub) —
  ✅ scan đếm đúng tổng records
  ✅ scan nhận diện file hợp lệ
  ✅ scan nhận diện missing
  ✅ scan từ chối path traversal
  ✅ scan bỏ qua record không URL
  ✅ jobs chỉ gồm asset cần tải
  ✅ job material có URL enka từ filename

— syncAssets end-to-end —
  ✅ dryRun không tải gì
  ✅ dryRun không tạo file mới

— Persistence —
  ✅ storage root KHÔNG nằm trong frontend/public
  ✅ file persist sau "deploy giả lập" (root khác)

— Atomic write —
  ✅ atomic write tạo file
  ✅ không còn file .tmp sót lại

==========================================
📊 Kết quả: 41 passed, 0 failed
==========================================
````

### 10. TS test scripts/sync/materialBackfill.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only scripts/sync/materialBackfill.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 4632ms

````text
✅ materialBackfill tests passed
````

### 11. TS test src/graphql/dataloaders/index.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/dataloaders/index.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 1308ms

````text
TAP version 13
# Subtest: teamMembersLoader preserves stored member order
ok 1 - teamMembersLoader preserves stored member order
  ---
  duration_ms: 96.834029
  ...
1..1
# tests 1
# suites 0
# pass 1
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 108.328473
````

### 12. TS test src/graphql/modules/characterTierRanking/characterTierRanking.graphql.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.graphql.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 5408ms

````text
◇ injected env (0) from .env // tip: ◈ secrets for agents [www.dotenvx.com]
TAP version 13
# Subtest: GraphQL public query is safe without admin context
ok 1 - GraphQL public query is safe without admin context
  ---
  duration_ms: 18.016354
  ...
# Subtest: GraphQL admin review query rejects non-admin context
ok 2 - GraphQL admin review query rejects non-admin context
  ---
  duration_ms: 7.401436
  ...
# Subtest: GraphQL admin review query exposes all statuses to admins
ok 3 - GraphQL admin review query exposes all statuses to admins
  ---
  duration_ms: 2.174836
  ...
1..3
# tests 3
# suites 0
# pass 3
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 80.522467
````

### 13. TS test src/graphql/modules/characterTierRanking/characterTierRanking.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/characterTierRanking/characterTierRanking.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 5243ms

````text
◇ injected env (0) from .env // tip: ⌘ enable debugging { debug: true }
TAP version 13
# Subtest: Prisma schema contains the approved additive model, enums and unique key
ok 1 - Prisma schema contains the approved additive model, enums and unique key
  ---
  duration_ms: 1.960791
  ...
# Subtest: GraphQL surface is wired and public query does not accept review filters
ok 2 - GraphQL surface is wired and public query does not accept review filters
  ---
  duration_ms: 13.936587
  ...
# Subtest: public query hard-filters to approved independent rankings only
ok 3 - public query hard-filters to approved independent rankings only
  ---
  duration_ms: 1.255894
  ...
# Subtest: public query never fabricates rows for unranked characters
ok 4 - public query never fabricates rows for unranked characters
  ---
  duration_ms: 0.253746
  ...
# Subtest: admin listings and all writes require admin context
ok 5 - admin listings and all writes require admin context
  ---
  duration_ms: 1.495047
  ...
# Subtest: upsert creates a non-approved SOURCE_DERIVED draft
ok 6 - upsert creates a non-approved SOURCE_DERIVED draft
  ---
  duration_ms: 2.038818
  ...
# Subtest: upsert rejects unsupported constellation for version 7.2
ok 7 - upsert rejects unsupported constellation for version 7.2
  ---
  duration_ms: 0.67291
  ...
# Subtest: upsert requires structured evidence for INDEPENDENT derivation
ok 8 - upsert requires structured evidence for INDEPENDENT derivation
  ---
  duration_ms: 0.97201
  ...
# Subtest: upsert cannot relabel a SOURCE_DERIVED row as INDEPENDENT
ok 9 - upsert cannot relabel a SOURCE_DERIVED row as INDEPENDENT
  ---
  duration_ms: 0.666674
  ...
# Subtest: research draft cannot overwrite an approved ranking
ok 10 - research draft cannot overwrite an approved ranking
  ---
  duration_ms: 0.717692
  ...
# Subtest: approval is restricted to independent rankings and logs the acting admin
ok 11 - approval is restricted to independent rankings and logs the acting admin
  ---
  duration_ms: 1.576479
  ...
# Subtest: reject stores reason and acting admin, not a request-supplied actor
ok 12 - reject stores reason and acting admin, not a request-supplied actor
  ---
  duration_ms: 0.795965
  ...
# Subtest: unique-key race is reported as a clear duplicate error
ok 13 - unique-key race is reported as a clear duplicate error
  ---
  duration_ms: 0.770964
  ...
1..13
# tests 13
# suites 0
# pass 13
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 66.22984
````

### 14. TS test src/graphql/modules/characterTierRanking/migration.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/characterTierRanking/migration.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 634ms

````text
TAP version 13
# Subtest: migration is additive and stays inside the approved scope
ok 1 - migration is additive and stays inside the approved scope
  ---
  duration_ms: 3.445408
  ...
# Subtest: migration creates exactly the approved ranking objects
ok 2 - migration creates exactly the approved ranking objects
  ---
  duration_ms: 0.281862
  ...
1..2
# tests 2
# suites 0
# pass 2
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 13.110141
````

### 15. TS test src/graphql/modules/characterTierRanking/phaseB25Review.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/characterTierRanking/phaseB25Review.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 786ms

````text
TAP version 13
# Subtest: Phase B2.5 every ranking has a complete audit record
ok 1 - Phase B2.5 every ranking has a complete audit record
  ---
  duration_ms: 1.805797
  ...
# Subtest: Phase B2.5 performance-only sensitivity is arithmetically correct
ok 2 - Phase B2.5 performance-only sensitivity is arithmetically correct
  ---
  duration_ms: 1.1979
  ...
# Subtest: Phase B2.5 energy costs match genshin-db talents attributes
ok 3 - Phase B2.5 energy costs match genshin-db talents attributes
  ---
  duration_ms: 0.62519
  ...
# Subtest: Phase B2.5 corrected gameplay assumptions are explicit
ok 4 - Phase B2.5 corrected gameplay assumptions are explicit
  ---
  duration_ms: 0.473642
  ...
# Subtest: Phase B2.5 audit content is free of stray CJK characters
ok 5 - Phase B2.5 audit content is free of stray CJK characters
  ---
  duration_ms: 0.675988
  ...
# Subtest: Phase B2.5 still writes nothing to development database
ok 6 - Phase B2.5 still writes nothing to development database
  ---
  duration_ms: 80.493913
  ...
1..6
# tests 6
# suites 0
# pass 6
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 93.204319
````

### 16. TS test src/graphql/modules/characterTierRanking/phaseB2Draft.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/characterTierRanking/phaseB2Draft.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 4676ms

````text
◇ injected env (0) from .env // tip: ⌘ suppress logs { quiet: true }
TAP version 13
# Subtest: Phase B2 batch shape, scope and draft status
ok 1 - Phase B2 batch shape, scope and draft status
  ---
  duration_ms: 3.069894
  ...
# Subtest: Phase B2 enum values and unique ranking keys are valid
ok 2 - Phase B2 enum values and unique ranking keys are valid
  ---
  duration_ms: 1.455872
  ...
# Subtest: Phase B2 explanations answer all five required questions in Vietnamese
ok 3 - Phase B2 explanations answer all five required questions in Vietnamese
  ---
  duration_ms: 0.657391
  ...
# Subtest: Phase B2 evidence is complete and independently sourced
ok 4 - Phase B2 evidence is complete and independently sourced
  ---
  duration_ms: 0.841245
  ...
# Subtest: Phase B2 proposed tiers match the published rubric arithmetic
ok 5 - Phase B2 proposed tiers match the published rubric arithmetic
  ---
  duration_ms: 0.492884
  ...
# Subtest: Phase B2 character IDs exist in the development database (read-only)
ok 6 - Phase B2 character IDs exist in the development database (read-only)
  ---
  duration_ms: 101.960858
  ...
# Subtest: Phase B2 drafts pass the real service as PENDING_REVIEW and never auto-approve
ok 7 - Phase B2 drafts pass the real service as PENDING_REVIEW and never auto-approve
  ---
  duration_ms: 5.986886
  ...
# Subtest: Phase B2 draft is rejected for non-admin context
ok 8 - Phase B2 draft is rejected for non-admin context
  ---
  duration_ms: 1.033481
  ...
# Subtest: Phase B2 GraphQL surface stays public-safe
ok 9 - Phase B2 GraphQL surface stays public-safe
  ---
  duration_ms: 112.802946
  ...
1..9
# tests 9
# suites 0
# pass 9
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 244.587894
````

### 17. TS test src/graphql/modules/characterTierRanking/phaseC1Smoke.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/characterTierRanking/phaseC1Smoke.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 4639ms

````text
◇ injected env (0) from .env // tip: ⌘ multiple files { path: ['.env.local', '.env'] }
TAP version 13
# Subtest: Phase C1 GraphQL smoke: Mitya still has two builds and one default
ok 1 - Phase C1 GraphQL smoke: Mitya still has two builds and one default
  ---
  duration_ms: 118.574081
  ...
# Subtest: Phase C1 GraphQL smoke: public tier lists stay empty
ok 2 - Phase C1 GraphQL smoke: public tier lists stay empty
  ---
  duration_ms: 9.761972
  ...
# Subtest: Phase C1 database remains write-free for rankings
ok 3 - Phase C1 database remains write-free for rankings
  ---
  duration_ms: 10.339917
  ...
1..3
# tests 3
# suites 0
# pass 3
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 148.167237
````

### 18. TS test src/graphql/modules/weaponTierRanking/db.integration.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/weaponTierRanking/db.integration.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 1509ms

````text
TAP version 13
# Subtest: development DB has the additive tables, zero rankings and intact legacy data
ok 1 - development DB has the additive tables, zero rankings and intact legacy data
  ---
  duration_ms: 175.081285
  ...
# Subtest: foreign keys and the null-safe unique index exist in PostgreSQL
ok 2 - foreign keys and the null-safe unique index exist in PostgreSQL
  ---
  duration_ms: 65.818587
  ...
# Subtest: all five weapon types, three roles and six tiers are accepted by the enums
ok 3 - all five weapon types, three roles and six tiers are accepted by the enums
  ---
  duration_ms: 43.937952
  ...
1..3
# tests 3
# suites 0
# pass 3
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 295.696642
````

### 19. TS test src/graphql/modules/weaponTierRanking/migration.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/weaponTierRanking/migration.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 1142ms

````text
TAP version 13
# Subtest: migration is additive and stays strictly inside weapon-tier scope
ok 1 - migration is additive and stays strictly inside weapon-tier scope
  ---
  duration_ms: 4.196355
  ...
# Subtest: migration creates exactly the approved weapon objects and a null-safe unique key
ok 2 - migration creates exactly the approved weapon objects and a null-safe unique key
  ---
  duration_ms: 0.397697
  ...
# Subtest: schema mirrors the migration and preserves legacy Weapon tier fields
ok 3 - schema mirrors the migration and preserves legacy Weapon tier fields
  ---
  duration_ms: 0.629016
  ...
# Subtest: rollback removes only the new objects and leaves every legacy table untouched
ok 4 - rollback removes only the new objects and leaves every legacy table untouched
  ---
  duration_ms: 0.633588
  ...
# Subtest: preflight record documents backup, target and migration isolation
ok 5 - preflight record documents backup, target and migration isolation
  ---
  duration_ms: 0.552177
  ...
1..5
# tests 5
# suites 0
# pass 5
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 25.984036
````

### 20. TS test src/graphql/modules/weaponTierRanking/weaponTierDataloader.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/weaponTierRanking/weaponTierDataloader.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 1232ms

````text
TAP version 13
# Subtest: weapon tier DataLoader loads only public rankings and batches by weapon ID
ok 1 - weapon tier DataLoader loads only public rankings and batches by weapon ID
  ---
  duration_ms: 5.510977
  ...
# Subtest: weapon tier DataLoader never exposes drafts; missing weapons return empty arrays
ok 2 - weapon tier DataLoader never exposes drafts; missing weapons return empty arrays
  ---
  duration_ms: 1.582376
  ...
1..2
# tests 2
# suites 0
# pass 2
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 19.59192
````

### 21. TS test src/graphql/modules/weaponTierRanking/weaponTierRanking.graphql.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/weaponTierRanking/weaponTierRanking.graphql.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 5497ms

````text
◇ injected env (0) from .env // tip: ⌁ auth for agents [www.vestauth.com]
TAP version 13
# Subtest: GraphQL surface is merged and exposes the approved query/filter set
ok 1 - GraphQL surface is merged and exposes the approved query/filter set
  ---
  duration_ms: 20.613342
  ...
# Subtest: public weaponTierRanks query resolves with only approved independent filters
ok 2 - public weaponTierRanks query resolves with only approved independent filters
  ---
  duration_ms: 17.520328
  ...
# Subtest: admin review queue is rejected for a non-admin context
ok 3 - admin review queue is rejected for a non-admin context
  ---
  duration_ms: 9.321135
  ...
# Subtest: Weapon.tierRanks uses its own DataLoader and never calls the ranking table directly
ok 4 - Weapon.tierRanks uses its own DataLoader and never calls the ranking table directly
  ---
  duration_ms: 3.58943
  ...
# Subtest: approval mutation is authorization-gated at the resolver layer
ok 5 - approval mutation is authorization-gated at the resolver layer
  ---
  duration_ms: 5.157423
  ...
1..5
# tests 5
# suites 0
# pass 5
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 135.82913
````

### 22. TS test src/graphql/modules/weaponTierRanking/weaponTierRanking.test.ts

- Command: `TS_NODE_COMPILER_OPTIONS="{\"rootDir\":\".\"}" npx ts-node --transpile-only src/graphql/modules/weaponTierRanking/weaponTierRanking.test.ts`
- CWD: `/home/tuan/Documents/GenshinHub/backend`
- Exit code: `0`
- Duration: 1320ms

````text
TAP version 13
# Subtest: public query hard-filters to approved independent publishable rows only
ok 1 - public query hard-filters to approved independent publishable rows only
  ---
  duration_ms: 6.026538
  ...
# Subtest: public query never fabricates rows for an unranked weapon
ok 2 - public query never fabricates rows for an unranked weapon
  ---
  duration_ms: 0.689895
  ...
# Subtest: admin listing, audit log and all writes require admin
ok 3 - admin listing, audit log and all writes require admin
  ---
  duration_ms: 2.835764
  ...
# Subtest: validation rejects invalid role, tier, refinement and version claims
ok 4 - validation rejects invalid role, tier, refinement and version claims
  ---
  duration_ms: 2.766218
  ...
# Subtest: SOURCE_MISSING rows can be stored without being promoted to verified
ok 5 - SOURCE_MISSING rows can be stored without being promoted to verified
  ---
  duration_ms: 2.248888
  ...
# Subtest: independent derivation requires explanation and structured evidence
ok 6 - independent derivation requires explanation and structured evidence
  ---
  duration_ms: 1.009962
  ...
# Subtest: source-derived derivation requires a source URL
ok 7 - source-derived derivation requires a source URL
  ---
  duration_ms: 0.53364
  ...
# Subtest: upsert creates a non-approved independent draft with an audit entry
ok 8 - upsert creates a non-approved independent draft with an audit entry
  ---
  duration_ms: 1.640857
  ...
# Subtest: weapon must exist and its DB type must match the input type
ok 9 - weapon must exist and its DB type must match the input type
  ---
  duration_ms: 1.114041
  ...
# Subtest: research row cannot be relabelled as independent or overwrite an approved ranking
ok 10 - research row cannot be relabelled as independent or overwrite an approved ranking
  ---
  duration_ms: 1.155332
  ...
# Subtest: stale concurrency token blocks an update
ok 11 - stale concurrency token blocks an update
  ---
  duration_ms: 0.636465
  ...
# Subtest: duplicate unique key race is reported clearly
ok 12 - duplicate unique key race is reported clearly
  ---
  duration_ms: 0.760938
  ...
# Subtest: approval is restricted to independent, explained, rights-verified rows and logs the admin
ok 13 - approval is restricted to independent, explained, rights-verified rows and logs the admin
  ---
  duration_ms: 1.374292
  ...
# Subtest: approval also refuses unexplained rows and already approved rows
ok 14 - approval also refuses unexplained rows and already approved rows
  ---
  duration_ms: 0.809822
  ...
# Subtest: CAS failure during approval is surfaced as concurrent modification
ok 15 - CAS failure during approval is surfaced as concurrent modification
  ---
  duration_ms: 0.660288
  ...
# Subtest: reject records reason and acting admin, and cannot rewrite an approved ranking
ok 16 - reject records reason and acting admin, and cannot rewrite an approved ranking
  ---
  duration_ms: 4.823345
  ...
# Subtest: audit log is admin-only and passes the ranking id through
ok 17 - audit log is admin-only and passes the ranking id through
  ---
  duration_ms: 0.470263
  ...
1..17
# tests 17
# suites 0
# pass 17
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 61.657679
````

### 23. Read-only development database count (after)

- Command: `node /tmp/opencode/d2/db-count.cjs`
- CWD: `/home/tuan/Documents/GenshinHub`
- Exit code: `0`
- Duration: 249ms

````text
{
  "database": "genshinhub",
  "Character": 131,
  "Weapon": 279,
  "CharacterBuild": 127,
  "CharacterBuildAudit": 127,
  "CharacterTierRanking": 0,
  "WeaponTierRank": 0,
  "WeaponTierAudit": 0
}
````

### 24. Phase D2 custom validation (post-check)

- Command: `node /tmp/opencode/d2/validate-d2.cjs`
- CWD: `/home/tuan/Documents/GenshinHub`
- Exit code: `0`
- Duration: 3421ms

````text
PASS  watched source checksums unchanged (no CONCURRENT_EDIT) :: 15/15 hashes match
PASS  all 6 Phase D2 artifacts exist :: 6/6 files
PASS  draft JSON parses and has 9 Character / 14 Weapon records :: 9 + 14
PASS  artifact checksums match canonical record arrays :: 2/2 recomputed
PASS  all per-record newChecksum values recompute correctly :: 23/23 recomputed
PASS  old checksums match frozen source records and differ from new checksums :: 23/23 linked
PASS  required schema fields present on all 23 revised records :: 23/23 complete
PASS  ID / role / tier mapping matches source records :: 9 + 14 mapped
PASS  tier values are within approved tier set :: SS/S/A/B/C/D only
PASS  constellation and refinement checks :: 9 constellations + 14 refinements
PASS  duplicate detection: no repeated stable keys :: 4 uniqueness groups
PASS  evidence is non-empty and gameplay assumptions explicit :: 23/23 records have evidence + assumptions
PASS  approval guards: nothing approved, importable or actor-populated :: 23/23 pending and non-importable
PASS  no SOURCE_DERIVED promotion and rights remain unverified :: rightsVerifiedTrue=0
PASS  no rarity / recommendation-count / external-editorial tier copying :: no forbidden tier-justification basis
PASS  Character: no tier changed; Raiden paused; 6 excluded drafts untouched :: 9 tiers kept, 1 paused, 6 excluded
PASS  Character game facts: Xiangling C0 and C6 handled correctly :: C0 conditional + C6 tested exception
PASS  Character game facts: Furina roles are distinct :: distinct role explanations
PASS  Character game facts: Neuvillette A1 vs playability and C0 interruption :: 3 reaction types != hard prerequisite
PASS  Character game facts: Zhongli RES shred and Yelan burst facts :: Zhongli + Yelan + Nahida verified
PASS  genshin-db local ground truth for key Character facts :: genshin-db@5.2.15 key facts intact
PASS  Weapon: exactly 2 tier changes remain unconfirmed :: 14302 + 14402 pending
PASS  Weapon: blocked / comparative records have correct status and confidence :: 12401 LOW/blocked, 13501 paused
PASS  Weapon game facts: Favonius R1 reliability uses R1, not R5 :: 11401 + 13407 R1-only
PASS  Weapon game facts: 11403 / 11418 / 11512 / 12502 conditions :: 4 conditional passives verified
PASS  Weapon game facts: tier-rereview dossiers are complete :: SS→S and S→A dossiers present
PASS  Weapon game facts: 14406 / 14509 / 15402 / 15508 corrected :: 4 corrected fact explanations
PASS  Weapon game-facts.json exact passive values still present :: 14/14 passive values intact
PASS  Freeze manifest is still internally consistent :: batch + manifest + decision sheet verified
PASS  FINAL_ADMIN_REVIEW.md has exactly 12 numbered answer items :: 1..12 present

D2_CUSTOM_VALIDATION=PASS checks=30 passed=30 failed=0
````

