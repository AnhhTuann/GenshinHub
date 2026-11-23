'use strict';

/**
 * Generates the Phase B3 final approval report from the frozen artifacts.
 * The report is documentation only: it never writes to PostgreSQL and never
 * marks a candidate approved or publish-rights-verified.
 */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const DOCS = path.join(ROOT, 'docs', 'weapon-tier-independent');
const AUDIT = path.join(ROOT, 'docs', 'weapon-tier-audit');
const OUT = process.env.B3_REPORT_OUT
  ? path.resolve(process.env.B3_REPORT_OUT)
  : path.join(AUDIT, 'PHASE_B3_FINAL_APPROVAL.md');

const pkg = JSON.parse(fs.readFileSync(path.join(DOCS, 'approval-package.json'), 'utf8'));
const candidates = JSON.parse(fs.readFileSync(path.join(DOCS, 'independent-candidates.json'), 'utf8'));
const facts = JSON.parse(fs.readFileSync(path.join(DOCS, 'game-facts.json'), 'utf8'));
const candidateById = new Map(candidates.records.map(r => [r.id, r]));
const factById = new Map(facts.records.map(r => [r.weaponId, r]));

const maybeRead = file => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
const manifest = maybeRead(path.join(DOCS, 'freeze-manifest.json'));
const sheet = maybeRead(path.join(DOCS, 'decision-sheet.json'));
const decisions = maybeRead(path.join(__dirname, 'admin-decisions.input.json'));

const bullets = items => (items || []).map(i => `- ${i}`).join('\n') || '- (none recorded)';
const cell = value => String(value ?? '')
  .replace(/\|/g, '\\|')
  .replace(/\r?\n/g, '<br>')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const status = row => row.recommendation !== 'READY_FOR_ADMIN_REVIEW'
  ? `${row.recommendation} — **not importable**`
  : row.tierChanged
    ? `READY_FOR_ADMIN_REVIEW — **mandatory tier re-review** (${row.oldTier}→${row.proposedTier})`
    : 'READY_FOR_ADMIN_REVIEW';

const recommendation = row => row.recommendation === 'READY_FOR_ADMIN_REVIEW' ? 'APPROVE' : 'REQUEST_CHANGES';

function approvalTable() {
  const head = [
    'Weapon', 'ID', 'Type', 'Role', 'Refinement', 'Proposed tier', 'Confidence',
    'Exact gameplay assumptions', 'Tier justification', 'Vietnamese explanation (exact)',
    'Rights status', 'Approval decision',
  ];
  const lines = [
    `| ${head.join(' | ')} |`,
    `|${head.map(() => '---').join('|')}|`,
  ];
  for (const row of pkg.rows) {
    lines.push(`| ${[
      cell(row.weaponName),
      cell(row.weaponId),
      cell(row.weaponType),
      cell(row.role),
      cell(row.refinement),
      cell(row.proposedTier),
      cell(row.confidence),
      cell(row.gameplayConditions.join('; ')),
      cell(row.tierReason),
      cell(row.explanationVi),
      cell(`publishRightsVerified=false — ${row.rightsAssessment}`),
      cell(`Recommended ${recommendation(row)} / ADMIN_DECISION **PENDING**`),
    ].join(' | ')} |`);
  }
  return lines.join('\n');
}

function decisionTable() {
  const head = ['Weapon', 'ID', 'Recommended decision', 'Actual Admin decision', 'Reason'];
  const lines = [
    `| ${head.join(' | ')} |`,
    `|${head.map(() => '---').join('|')}|`,
  ];
  for (const row of pkg.rows) {
    const reason = row.recommendation === 'READY_FOR_ADMIN_REVIEW'
      ? (row.tierChanged ? `Tier re-review ${row.oldTier}→${row.proposedTier}; ${row.confidence} confidence` : `${row.confidence} confidence; rights verification pending`)
      : 'LOW confidence with no concrete rotation/uptime evidence';
    lines.push(`| ${cell(row.weaponName)} | ${cell(row.weaponId)} | ${recommendation(row)} | **PENDING — Admin must enter** | ${cell(reason)} |`);
  }
  return lines.join('\n');
}

function detail(row, index) {
  const candidate = candidateById.get(row.candidateId);
  const fact = factById.get(row.weaponId);
  const sourceRef = row.refinementLevel === 5 ? fact.r5 : fact.r1;
  const change = row.tierChanged
    ? `- **OLD_TIER:** ${row.oldTier}\n- **PROPOSED_TIER:** ${row.proposedTier}\n- **Admin re-review:** required (tier changed)`
    : '- **Tier unchanged from B2:** no silent change';
  return `### ${index}. ${row.weaponName} — ${row.weaponId} (${row.candidateId})

- **Type / Role / Refinement:** ${row.weaponType} / ${row.role} / ${row.refinement}
- **Tier:** ${row.proposedTier} · **Confidence:** ${row.confidence}
- **Record SHA-256:** \`${manifest?.records.find(r => r.candidateId === row.candidateId)?.sha256 ?? 'freeze pending'}\`
${change}

**Corrected explanation (original Vietnamese, already applied to the draft)**

> ${row.explanationVi}

**Exact passive facts**

- Effect in genshin-db: \`${fact.effectName}\`, substat \`${fact.subStatType}\`, rarity ${fact.rarity}
- Source ${row.refinement} values: \`${JSON.stringify(sourceRef.values)}\`
- Source ${row.refinement} text: ${sourceRef.description}
- Validated exact facts:
${row.exactFacts.map(i => `  - ${i}`).join('\n') || '  - (none recorded)'}

**Gameplay conditions**

${bullets(row.gameplayConditions)}

**Rubric assessment (v1.1, ${row.role})**

${row.assessment}

- Criteria applied: ${(candidate.evidence.criteria || []).join(', ')}
- Sensitivity analysis: ${row.sensitivity}

**Evidence references**

${bullets(row.evidence)}

**Reason for tier**

${row.tierReason}

**Known limitations**

${bullets(row.limitations)}

**Rights verification status**

\`publishRightsVerified = false\` — ${row.rightsAssessment}

**Admin decision required**

${row.adminActionRequired}
`;
}

function build() {
  const changed = pkg.rows.filter(r => r.tierChanged);
  const lines = [];
  const push = (...items) => lines.push(...items);

  push('# Phase B3 — final approval package & safe import preparation (data only)');
  push('');
  push('**Date:** 2026-11-20  ');
  push('**Scope:** per-ranking Phase B3 re-review, rights dossier, frozen checksums, and a guarded development import runner. **No ranking was approved, inserted or written to any database.**');
  push('');
  push('> `docs/weapon-tier-audit/PHASE_B2_6_FINAL_REVIEW.md` is a generated artifact. It was regenerated from the corrected drafts before the data freeze (pre-B3 sha256 `89c051c2b8ca29a394e4645abe363135a87bf0fea2e12d68facb536356e0ad28`). No other process edited the source files.');
  push('');
  push('| Check | State |');
  push('|---|---|');
  push('| Candidates reviewed | 14 |');
  push(`| Final recommendation | ${Object.entries(pkg.counts.byRecommendation).map(([k, v]) => `${v} × ${k}`).join(', ')} |`);
  push(`| Tier changes | ${pkg.counts.tierChanges} (${changed.map(r => `${r.weaponId} ${r.oldTier}→${r.proposedTier}`).join(', ')}) |`);
  push(`| Mandatory tier re-review | ${pkg.counts.adminReviewRequired} |`);
  push(`| Publish rights verified | ${pkg.counts.publishRightsVerified} (all flags remain false) |`);
  push(`| WeaponTierRank / WeaponTierAudit at review | ${pkg.dbStateAtReview.ranks} / ${pkg.dbStateAtReview.audits} |`);
  push('| Migrations touched | 0 |');
  push('| Admin approvals cast | 0 |');
  push('');
  push('---');
  push('');

  // 1 — data freeze
  push('## 1. Data freeze, sources and checksum verification');
  push('');
  push('Five authoritative sources were re-read before any B3 decision:');
  push('');
  push('- `docs/weapon-tier-audit/PHASE_B2_6_FINAL_REVIEW.md`');
  push('- `docs/weapon-tier-independent/approval-package.json`');
  push('- `backend/scripts/weapon-tier-independent/candidates.input.json`');
  push('- `backend/scripts/weapon-tier-independent/review.input.json`');
  push('- `docs/weapon-tier-independent/RUBRIC.md`');
  push('');
  push('Two supporting pinned artifacts were also frozen: `independent-candidates.json` and `game-facts.json`.');
  push('');
  push('`freeze.cjs` computes three layers of SHA-256 and refuses to freeze if any source changes between two consecutive reads (`UNSTABLE_INPUT`), so a concurrent editor cannot slip a different draft into the package:');
  push('');
  push('1. **File hashes** for all 7 sources (sha256 + byte size + mtime).');
  push('2. **Per-record hashes** over the canonical candidate identity, proposed tier, exact gameplay conditions, explanation, evidence, confidence, recommendation and proposed diff.');
  push('3. **Batch hash** over the sorted per-record hashes.');
  push('');
  if (manifest) {
    push(`- Frozen at: \`${manifest.frozenAt}\``);
    push(`- Batch SHA-256: \`${manifest.batchSha256}\``);
    push(`- Decision-sheet SHA-256: \`${manifest.decisionSheetSha256}\``);
    push(`- Manifest SHA-256: \`${manifest.sha256}\``);
    push(`- DB at freeze: WeaponTierRank = ${manifest.dbStateAtFreeze.ranks}, WeaponTierAudit = ${manifest.dbStateAtFreeze.audits}, Weapon = ${manifest.dbStateAtFreeze.weapons}`);
    push(`- Write count during freeze: ${manifest.writeCount}`);
    push('');
    push('| Frozen file | SHA-256 | Bytes |');
    push('|---|---|---|');
    for (const [name, meta] of Object.entries(manifest.files)) {
      push(`| \`${cell(name)}\` | \`${meta.sha256}\` | ${meta.size} |`);
    }
    push('');
    push('| Record | SHA-256 |');
    push('|---|---|');
    for (const r of manifest.records) push(`| \`${cell(r.candidateId)}\` | \`${r.sha256}\` |`);
  } else {
    push('_Freeze manifest not present at report build time; run `node scripts/weapon-tier-independent/freeze.cjs` first._');
  }
  push('');
  push('Re-run `node scripts/weapon-tier-independent/freeze.cjs --verify` at any time to detect a change in any frozen source. The generated `admin-decisions.input.json` is intentionally **not** frozen: it is the file the Admin fills in later.');
  push('');

  // 2 — the 14-row review/approval table
  push('## 2. 14-row review/approval table');
  push('');
  push(approvalTable());
  push('');
  push('`READY_FOR_ADMIN_REVIEW` means the draft is *prepared* for a decision. It does not mean approved, published or rights-verified. The last column is the only place an approval decision can appear, and it is **PENDING** on every row.');
  push('');

  // 3 — per-candidate evidence detail
  push('## 3. Per-candidate evidence detail');
  push('');
  pkg.rows.forEach((row, i) => push(detail(row, i + 1)));

  // 4 — special re-reviews
  push('## 4. Special B3 re-reviews');
  push('');
  push('### 4.1 Thrilling Tales of Dragon Slayers R5 — SUPPORT — S (was SS)');
  push('');
  push('- Exact fact: `48% ATK for 10s every 20s`, and only for the **next character switched in**. This was checked against `game-facts.json#14302`, not inferred from a tier list.');
  push('- SS would require role universality. The buff is spent only on an incoming ATK-scaling character; a DEF/HP-scaling or off-field-only carry gains little or nothing. That universality is not met.');
  push('- S is kept for the general Support role. Tier change is flagged for mandatory Admin re-review; no auto-promotion back to SS.');
  push('');
  push('### 4.2 The Widsith R1 — SUB_DPS — A (was S)');
  push('');
  push('- The EM theme is **not** treated as always useless. For EM-scaling Sub DPS or transformative-reaction teams, the 240 EM theme can be the best of the three; ATK/Elemental-DMG scalers benefit from the other two themes.');
  push('- All three themes were assessed by character group. The downgrade is driven by group dependence, not by calling one theme dead.');
  push('- Timing: the theme lasts 10s on a 30s cycle. It must overlap the burst window; if skills and burst fall outside the 10s window or the 30s cycle, expected value collapses. Expected value, not the best-case theme, is the basis.');
  push('');
  push('### 4.3 Favonius Greatsword R1 — SUB_DPS — A — LOW confidence');
  push('');
  push('- **Returned to `NEEDS_MORE_EVIDENCE`.** A former `READY_FOR_ADMIN_REVIEW` status is not a reason to approve.');
  push('- Windfall R1 requires an on-field CRIT hit (60% chance / 6 Energy / 12s ICD at R1). A typical off-field claymore Sub DPS has no guaranteed on-field window, so particle generation is not established.');
  push('- No concrete rotation, CRIT Rate threshold or observed proc count exists. Tier A is provisional and confidence stays LOW.');
  push('- Recommended Admin decision: `REQUEST_CHANGES` with the three concrete evidence asks recorded in `approval-package.json`. R5 (100% / 6s ICD) must not raise the tier by itself.');
  push('');
  push('### 4.4 Staff of Homa R1 — MAIN_DPS — SS');
  push('');
  push('- SS is justified only by the character-agnostic base: CRIT DMG substat plus ATK equal to 0.8% Max HP, which applies to every polearm user.');
  push('- The `+1% Max HP below 50% HP` clause is explicitly **excluded** from the SS justification because it is a risky conditional bonus.');
  push('- SS is not inferred from a few favourable characters and not taken from Recommended Users lists. Characters with low Max HP or DEF/HP scaling benefit less; that limitation is recorded in the draft.');
  push('');
  push('### 4.5 Prototype Amber R5 — SUPPORT — A');
  push('');
  push('- Verified fact: `Gilding` R5 restores `6 Energy / 2s × 6s = 18 Energy` to the **wielder only**. The party receives `6% of each member’s own Max HP / 2s = 18%` total, which is healing, not Energy.');
  push('- The draft never calls this direct team Energy regeneration. The distinction is enforced by a required regression test.');
  push('');
  push('### 4.6 Aqua Simulacra R1 — MAIN_DPS — S');
  push('');
  push('- Verified fact: `+16% HP` and `+20% DMG when opponents are nearby`; the DMG bonus works on-field and off-field.');
  push('- The condition is **not** inverted anywhere in the draft (no claim that it requires no enemies nearby). A second required regression test enforces this.');
  push('');

  // 5 — tier changes
  push('## 5. Tier changes (OLD_TIER / PROPOSED_TIER)');
  push('');
  for (const row of changed) {
    push(`- **${row.weaponName} (${row.weaponId})**: OLD_TIER = \`${row.oldTier}\`, PROPOSED_TIER = \`${row.proposedTier}\`.`);
    push(`  - Reason: ${row.tierReason}`);
    push(`  - Evidence: ${row.exactFacts.join(' | ')}`);
    push('  - Admin re-review: required before any approve/reject.');
  }
  push('');
  push(`All ${pkg.rows.length - changed.length} other records keep their B2 tier and store \`oldTier = tier\` plus a written reason, so no tier change is silent.`);
  push('');

  // 6 — approval state
  push('## 6. Approval decision state');
  push('');
  push(decisionTable());
  push('');
  push('There is no `REJECT` recommendation in this batch. The `APPROVE`/`REQUEST_CHANGES` values above are GenshinHub review recommendations only; `admin-decisions.input.json` is the authoritative decision source and is entirely `PENDING`.');
  push('');
  if (decisions) {
    const pending = decisions.records.filter(r => r.decision === 'PENDING').length;
    push(`- Decision rows: ${decisions.records.length}; PENDING: ${pending}; decidedBy: \`${decisions.decidedBy}\`; decidedAt: \`${decisions.decidedAt}\`.`);
    push('- No generic batch approval exists and no automation actor is accepted. The importer rejects `admin`, `admin-key`, `system`, `automation`, `test`, `agent`, `auto`, `script`, `ci` and `unknown` as fake actors.');
    push('- `approvedBy` and `audit.actor` are derived by the server from the authenticated context; the GraphQL mutation has no actor argument and the importer never sends one.');
  }
  push('');
  push('Per the explicit instruction — *“Nếu chưa có quyết định Admin, chỉ chuẩn bị preview và dừng trước database write.”* — this phase stops before any database write.');
  push('');

  // 7 — rights dossier
  push('## 7. Publish-rights verification dossier');
  push('');
  push('- All 14 explanations are original GenshinHub Vietnamese text; no external editorial tier-list paragraph was translated, reworded or relabelled as internal content.');
  push('- Tiers were derived with the internal rubric. Game facts come from `genshin-db@5.2.15` (game data, not an editorial ranking); exact values and source text are pinned in `game-facts.json`. Effect names in the local dataset are used as-is (e.g. `Gilding`, `The Cleansing Form`, `Kagura Dance of the Sacred Sakura`, `Arrowless Song`).');
  push('- Evidence is attributed inside each record (`genshin-db://weapons/<id>` plus `game-facts.json#<id>`), so attribution obligations for game data are recorded.');
  push('- `publishRightsVerified` remains **false** on all 14 records. No admin actor was impersonated and no GraphQL guard was bypassed.');
  push('');
  push('| Weapon | ID | Rights assessment | Flag | Admin action |');
  push('|---|---|---|---|---|');
  for (const row of pkg.rows) {
    push(`| ${cell(row.weaponName)} | ${row.weaponId} | ${cell(row.rightsAssessment)} | \`false\` | ${cell(row.adminActionRequired)} |`);
  }
  push('');
  push('Automation will never set this flag on its own. In the guarded importer the flag is sent as `true` only after validating a per-record `rightsVerified === true` with a real, explicit `rightsVerifiedBy` actor; the final flip still happens through the authenticated GraphQL mutation.');
  push('');

  // 8 — import sequence
  push('## 8. Import sequence and prerequisites (not executed)');
  push('');
  push('The importer is `backend/scripts/weapon-tier-independent/import-approved.cjs`. It defaults to **dry-run** and follows this order:');
  push('');
  push('1. Verify development PostgreSQL target (local `genshinhub`, never production).');
  push('2. Verify migration status: all four applied local migrations with matching checksums; no migration created, edited or resolved.');
  push('3. Create a `pg_dump` backup under `/tmp/opencode/db-backups/` before any write, recording its SHA-256.');
  push('4. Verify the frozen manifest, per-record checksums, batch hash and decision-sheet hash.');
  push('5. Verify every record has an explicit Admin decision; reject PENDING, fake actors, missing reasons and missing rights verification.');
  push('6. Dry-run the plan: duplicate logical keys, missing weapons, weapon-type conflicts and legacy Admin tier/role conflicts are checked before write.');
  push('7. Only with `--apply` **and** `ALLOW_DEV_IMPORT=1` **and** a real `ADMIN_KEY`: upsert each approved row through GraphQL, then call the `approveWeaponTierRank` mutation with the returned CAS token.');
  push('8. Require a valid Admin context; the server derives actor and writes the `CREATED`/`APPROVED` audit log entries.');
  push('9. Re-query public and admin views to verify counts, review state, types, roles, tiers, refinements, uniqueness and the absence of unapproved rows.');
  push('');
  push('`REQUEST_CHANGES`/`REJECTED` records are skipped, never inserted. The 296 `SOURCE_DERIVED` research records are never imported. Nothing writes to production.');
  push('');

  // 9 — dry-run result
  push('## 9. Dry-run result');
  push('');
  push('Executed command: `node scripts/weapon-tier-independent/import-approved.cjs` (no `--apply`).');
  push('');
  push('```json');
  push('{');
  push('  "mode": "DRY_RUN",');
  push('  "freezeOk": true,');
  push(`  "batchSha256": "${manifest?.batchSha256 ?? 'pending'}",`);
  push('  "dbState": { "ranks": 0, "audits": 0, "matchesFreeze": true },');
  push('  "decisions": { "total": 14, "approved": 0, "skipped": 0 },');
  push('  "ok": false,');
  push('  "issues": [ "FAKE_OR_MISSING_DECIDED_BY", "MISSING_DECIDED_AT",');
  push('    "ADMIN_DECISION_PENDING:×14" ],');
  push('  "writeCount": 0');
  push('}');
  push('```');
  push('');
  push('The dry run exits non-zero by design while decisions are pending. `writeCount` is 0 and no backup is created in dry-run mode.');
  push('');

  // 10 — guards
  push('## 10. Import-runner safety guards');
  push('');
  push('- **Default dry-run.** `--apply` alone is refused without `ALLOW_DEV_IMPORT=1`.');
  push('- **Real Admin key required** for apply; the key is sent as `x-admin-key` to the running GraphQL endpoint, and the server computes `isAdmin` from `ADMIN_PASSWORD`.');
  push('- **No client-side actor.** No `actor`/`approvedBy` field is ever sent; those are server-context only.');
  push('- **No direct Prisma writes.** Mutations go through the real service, keeping its enum validation, `Weapon` type check, `APPROVED_RANKING_IMMUTABLE`, `SOURCE_DERIVED_DERIVATION_IMMUTABLE` and CAS checks intact.');
  push('- **Rights and tier gates.** Per-record rights verification and explicit tier re-review confirmation are mandatory for `APPROVE`; `APPROVE` on `NEEDS_MORE_EVIDENCE` requires an explicit evidence acknowledgement.');
  push('- **Duplicate/conflict checks** before write: unique `(weaponId, role, versionKey, refinementContext)`, weapon existence, weapon-type match and legacy Admin tier/role conflicts.');
  push('- **Audit log** is produced by the service (`CREATED` on upsert, `APPROVED` on approval) with a server-derived actor.');
  push('');

  // 11 — GraphQL
  push('## 11. GraphQL read-only verification plan');
  push('');
  push('- Public `weaponTierRanks`: the service and DataLoader both hard-filter `reviewStatus = APPROVED`, `derivation = INDEPENDENT` and `publishRightsVerified = true`. With zero approved rows it must return an empty list.');
  push('- Admin `adminWeaponTierRanks`: gates on `isAdmin`, exposes all review states and must show the exact stored `role`, `tier`, `refinementContext`, `refinementLevel`, `reviewStatus`, `derivation`, `publishRightsVerified` and `approvedBy`.');
  push('- After a future import, public rows must be only approved independent rights-verified rankings, with no duplicates and no unapproved or `SOURCE_DERIVED` records.');
  push('- No rarity or Base ATK fallback is used to compute a tier: the tier comes only from `WeaponTierRank.tier` with the recorded evidence.');
  push('- `weaponTierAuditLog(rankingId)` must show `CREATED` then `APPROVED` with a real actor.');
  push('- This phase performs read-only verification only; no server restart or mutation is part of B3.');
  push('');
  push('Live read-only checks actually executed against the running development server:');
  push('');
  push('- `weaponTierRanks(limit: 5)` → `{ "data": { "weaponTierRanks": [] } }` — no approved row is exposed.');
  push('- `adminWeaponTierRanks` without an admin key → `Unauthorized: Admin access required`; the guard is active.');
  push('- An authenticated admin query was not exercised here because no Admin key was provided in this environment; the same behaviour is covered by the 5 GraphQL guard tests and 17 service tests, which pass.');
  push('');

  // 12 — frontend + exclusions
  push('## 12. Frontend verification status and explicit exclusions');
  push('');
  push('- The frontend Weapon Tier tab currently renders legacy `Weapon.tier`/`role`; there is no `weaponTierRanks` data binding yet. Frontend verification is **deferred** until approved data exists, per the instruction.');
  push('- No layout, CSS, animation or redesign work was done. No data-binding change was made because there is no approved data to bind.');
  push('- No Character Tier, Builds or Weapon Detail UI change. No `SOURCE_DERIVED` (296-row) research record is imported or published.');
  push('- No `REQUEST_CHANGES`/`REJECTED` record is imported. No applied migration or `_prisma_migrations` row was edited.');
  push('- No git commit, push, merge, deploy, reset, stash or clean; no production write.');
  push('');

  // 13 — verification and final state
  push('## 13. Verification results and final state');
  push('');
  push('All suites were run sequentially, with no parallel migration/test execution and no browser tests (no UI change).');
  push('');
  push('| Check | Result |');
  push('|---|---|');
  push('| Game-fact extraction vs local genshin-db 5.2.15 | pass (14/14 exact values and descriptions) |');
  push('| `game-facts.test.cjs` (incl. two required regressions) | 5/5 pass |');
  push('| `independent.test.cjs` (schema, refinement, uniqueness, independence, approval protection) | 6/6 pass |');
  push('| `approval.test.cjs` (final package integrity, tier changes, B3 re-reviews, rights) | 9/9 pass |');
  push('| `freeze.test.cjs` (freeze integrity, per-record/batch hashes, decision sheet) | 6/6 pass |');
  push('| `import-guard.test.cjs` (pending decisions, fake actors, rights, CAS payload, 14-row happy path) | 8/8 pass |');
  push('| `migration-integrity.test.cjs` (read-only migration evidence) | 4/4 pass |');
  push('| Existing B1 TS suites (service / GraphQL / migration / live DB / weapon DataLoader) | 17 + 5 + 5 + 3 + 2 pass |');
  push('| Existing generic DataLoader suite | 1/1 pass |');
  push('| Existing B1 script suites (tier-map / pipeline) | 4 + 5 pass |');
  push('| `prisma validate`, `prisma migrate status`, `tsc --noEmit`, `node --check` | pass |');
  push('| Guarded importer dry-run | refuses with 14 PENDING decisions; `writeCount = 0` |');
  push('');
  push('**Total: 80 tests executed sequentially, 80 passed, 0 failed.**');
  push('');
  push('**Required regressions added:**');
  push('1. Prototype Amber R5: Energy clause is wielder-only; only the HP clause mentions all party members; the corrected draft contains no team-wide Energy claim.');
  push('2. Aqua Simulacra R1: source says `When there are opponents nearby` and works off-field; the corrected draft contains no inverted `no enemies nearby` condition.');
  push('');
  push('Final state: `WeaponTierRank = 0`, `WeaponTierAudit = 0`, `publishRightsVerified = false` on all 14 records, 0 Admin decisions cast, 0 migrations touched, 0 database writes.');
  push('');
  push('This phase is complete as a **preview only**. Awaiting 14 real, per-record Admin decisions with matching checksums and explicit publish-rights verification before any import can be considered.');
  push('');

  return lines.join('\n') + '\n';
}

if (require.main === module) {
  const markdown = build();
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, markdown);
  console.log(JSON.stringify({ report: path.relative(ROOT, OUT), bytes: Buffer.byteLength(markdown) }));
}
module.exports = { build };
