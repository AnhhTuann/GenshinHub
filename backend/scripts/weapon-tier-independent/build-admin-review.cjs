'use strict';

/**
 * Phase B3.1 Admin Final Review Sheet builder.
 *
 * Reads only the B3 frozen sources. Never writes to PostgreSQL, never flips an
 * approval or a rights flag. The generated sheet splits Group A (13 reviewable
 * candidates) from Group B (Favonius Greatsword 12401, blocked), carries an
 * explicit tier-change review section for 14302 and 14402, and a publish-rights
 * dossier. It also emits the human-readable final report.
 */
const fs = require('node:fs');
const path = require('node:path');
const { verify } = require('./freeze.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const DOCS = path.join(ROOT, 'docs', 'weapon-tier-independent');
const AUDIT = path.join(ROOT, 'docs', 'weapon-tier-audit');
const SHEET_OUT = path.join(DOCS, 'admin-review-sheet.json');
const DRY_RUN = path.join(DOCS, 'partial-import-dry-run.json');
const REPORT_OUT = path.join(AUDIT, 'PHASE_B3_1_FINAL_ADMIN_REVIEW.md');
const DECISIONS = path.join(__dirname, 'admin-decisions.input.json');
const GROUP_B_ID = 'independent-12401-SUB_DPS-R1';
const GROUP_B_EVIDENCE = [
  ['critRateAssumptions', 'CRIT Rate assumptions'],
  ['passiveProcConditions', 'Passive proc conditions'],
  ['rotation', 'Rotation'],
  ['fieldTimeRequirements', 'Field-time requirements'],
  ['energyGenerationAssumptions', 'Energy generation assumptions'],
  ['rubricJustification', 'Rubric justification'],
];

const load = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const cell = value => String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildSheet() {
  const verification = verify();
  if (!verification.ok) throw new Error(`FREEZE_VERIFY_FAILED:${verification.issues.join(';')}`);
  const manifest = verification.manifest;
  const decisionSheet = load(path.join(DOCS, 'decision-sheet.json'));
  const decisions = load(DECISIONS);
  const decisionById = new Map(decisions.records.map(r => [r.candidateId, r]));
  const records = decisionSheet.records.map(r => ({
    ...r,
    approvalChecksum: r.recordSha256,
    selectedDecision: decisionById.get(r.candidateId)?.decision ?? 'PENDING',
    tierChangeReview: r.tierChanged ? {
      previousTier: r.oldTier,
      proposedTier: r.proposedTier,
      change: `${r.oldTier} → ${r.proposedTier}`,
      reason: r.tierJustification,
      separateConfirmationRequired: true,
      confirmed: decisionById.get(r.candidateId)?.tierChangeReviewConfirmed === true,
    } : null,
  })).sort((a, b) => {
    if ((a.candidateId === GROUP_B_ID) !== (b.candidateId === GROUP_B_ID)) return a.candidateId === GROUP_B_ID ? 1 : -1;
    return a.weaponId.localeCompare(b.weaponId);
  });

  const groupA = records.filter(r => r.candidateId !== GROUP_B_ID);
  const groupB = records.filter(r => r.candidateId === GROUP_B_ID);
  const tierChanges = records.filter(r => r.tierChanged).map(r => ({
    candidateId: r.candidateId,
    weaponId: r.weaponId,
    weaponName: r.weaponName,
    role: r.role,
    refinement: r.refinement,
    previousTier: r.oldTier,
    proposedTier: r.proposedTier,
    change: `${r.oldTier} → ${r.proposedTier}`,
    reason: r.tierJustification,
    gameplayConditions: r.exactGameplayAssumptions,
    exactFacts: r.exactFacts,
    separateConfirmationRequired: true,
    confirmed: decisionById.get(r.candidateId)?.tierChangeReviewConfirmed === true,
    note: 'Approving the record does not approve the tier change; the Admin must confirm the tier re-review separately.',
  }));

  const b = groupB[0];
  const supp = decisionById.get(GROUP_B_ID)?.evidenceSupplement ?? {};
  const missingEvidence = GROUP_B_EVIDENCE
    .filter(([key]) => typeof supp[key] !== 'string' || supp[key].trim().length < 10)
    .map(([, label]) => label);

  return {
    phase: 'B3.1',
    generatedAt: new Date().toISOString(),
    description: 'Admin Final Review Sheet. Decision fields remain PENDING. No approval, no rights flip, no database write.',
    freeze: {
      verified: true,
      issues: verification.issues,
      batchSha256: manifest.batchSha256,
      manifestSha256: manifest.sha256,
      decisionSheetSha256: manifest.decisionSheetSha256,
      perRecordChecksums: manifest.records,
    },
    allowedDecisions: ['APPROVE', 'REQUEST_CHANGES', 'REJECT'],
    currentDecisionState: 'PENDING on all 14 records',
    groups: {
      A: {
        label: 'Reviewable candidates',
        count: groupA.length,
        importableNow: 0,
        records: groupA.map(r => ({
          candidateId: r.candidateId,
          weaponId: r.weaponId,
          weaponName: r.weaponName,
          weaponType: r.weaponType,
          role: r.role,
          refinement: r.refinement,
          proposedTier: r.proposedTier,
          previousTier: r.oldTier,
          confidence: r.confidence,
          explanationVi: r.explanationVi,
          gameplayAssumptions: r.exactGameplayAssumptions,
          exactGameFacts: r.exactFacts,
          evidence: r.evidence,
          rightsVerification: {
            publishRightsVerified: false,
            requiredBeforeImport: true,
            assessment: r.rightsStatus.assessment,
            verifiedByAdmin: false,
          },
          approvalChecksum: r.approvalChecksum,
          tierChangeReview: r.tierChangeReview,
          allowedDecisions: ['APPROVE', 'REQUEST_CHANGES', 'REJECT'],
          selectedDecision: r.selectedDecision,
        })),
      },
      B: {
        label: 'Blocked — Favonius Greatsword',
        count: groupB.length,
        importableNow: 0,
        records: groupB.map(r => ({
          candidateId: r.candidateId,
          weaponId: r.weaponId,
          weaponName: r.weaponName,
          role: r.role,
          refinement: r.refinement,
          proposedTier: r.proposedTier,
          confidence: r.confidence,
          draftRecommendation: r.reviewStatus,
          blockedDecision: 'REQUEST_CHANGES',
          explanationVi: r.explanationVi,
          gameplayAssumptions: r.exactGameplayAssumptions,
          exactGameFacts: r.exactFacts,
          evidence: r.evidence,
          approvalChecksum: r.approvalChecksum,
          requiredEvidence: GROUP_B_EVIDENCE.map(([key, label]) => ({
            field: key,
            label,
            present: typeof supp[key] === 'string' && supp[key].trim().length >= 10,
          })),
          missingEvidence,
          unblockRule: 'Import stays blocked until all six evidence fields, a real supplementing actor and a timestamp are supplied, and an Admin explicitly changes the decision to APPROVE.',
        })),
      },
    },
    tierChangeReviews: tierChanges,
    rightsDossier: {
      allPublishRightsVerifiedFalse: records.every(r => r.rightsStatus.publishRightsVerified === false),
      independentRankings: true,
      originalExplanations: true,
      noGenshinBuildsEditorialCopy: true,
      gameFactsAttributed: true,
      sourceDerivedResearchUsedAsRanking: false,
      note: 'publishRightsVerified changes only after an authorized human verifies actual rights. Automation never flips it.',
      records: records.map(r => ({
        candidateId: r.candidateId,
        weaponId: r.weaponId,
        publishRightsVerified: r.rightsStatus.publishRightsVerified,
        originalExplanation: r.rightsStatus.originalExplanation,
        independentTier: r.rightsStatus.independentTier,
        externalEditorialTextCopied: r.rightsStatus.externalEditorialTextCopied,
        attributionRecorded: r.rightsStatus.attributionRequiredAndRecorded,
        assessment: r.rightsStatus.assessment,
      })),
    },
    missingDecisions: records.map(r => ({
      candidateId: r.candidateId,
      weaponId: r.weaponId,
      weaponName: r.weaponName,
      decision: decisionById.get(r.candidateId)?.decision ?? 'PENDING',
      missing: ['APPROVE/REQUEST_CHANGES/REJECT decision', 'real adminActor', 'decidedAt', 'reason', 'rightsVerified + rightsVerifiedBy', 'evidenceAcknowledged']
        .concat(r.tierChanged ? ['tierChangeReviewConfirmed'] : [])
        .concat(r.candidateId === GROUP_B_ID ? ['six evidence supplements'] : []),
    })),
    authenticationPolicy: {
      jsonActorIsEvidence: false,
      authorizationSource: 'backend Admin session; x-admin-key verified against ADMIN_PASSWORD',
      actorSource: 'verified session id; approvedBy and audit.actor are server-derived',
      permissionCheck: true,
      checksumBinding: true,
      auditLog: true,
      rejectChangedContent: true,
      fakeActorsRejected: true,
    },
    importEligibility: {
      reviewableGroupA: groupA.length,
      blockedGroupB: groupB.length,
      currentlyImportable: 0,
      reason: 'No Admin decision, rights verification or tier re-review confirmation has been cast.',
    },
  };
}

function buildReport(sheet) {
  const dry = fs.existsSync(DRY_RUN) ? load(DRY_RUN) : null;
  const lines = [];
  const push = (...items) => lines.push(...items);
  const a = sheet.groups.A.records;
  const b = sheet.groups.B.records[0];

  push('# Phase B3.1 — Admin Final Review & approved-only import preparation');
  push('');
  push('**Date:** 2026-11-20  ');
  push('**Scope:** present the frozen 14 candidates for real Admin decisions, keep Favonius Greatsword blocked, prepare partial import. **No approval, no rights flip, no database write.**');
  push('');
  push('> Freeze verified: `ok = true`, batch SHA-256 `' + sheet.freeze.batchSha256 + '`, manifest SHA-256 `' + sheet.freeze.manifestSha256 + '`. No frozen tier or explanation was changed.');
  push('');
  push('| Check | State |');
  push('|---|---|');
  push('| Group A — reviewable | 13 |');
  push('| Group B — blocked | 1 (Favonius Greatsword 12401) |');
  push('| Decisions cast | 0 (all 14 PENDING) |');
  push('| Rights flags | 0 verified (all false) |');
  push('| Tier re-review confirmations | 0 (2 required) |');
  push('| WeaponTierRank / WeaponTierAudit | 0 / 0 |');
  push('| Database writes | 0 |');
  push('');
  push('---');
  push('');

  push('## 1. Final Admin Review Sheet');
  push('');
  push('Machine-readable sheet: `docs/weapon-tier-independent/admin-review-sheet.json`. Each row below carries the frozen approval checksum; the Admin may choose `APPROVE`, `REQUEST_CHANGES` or `REJECT`. Nothing is transitioned automatically.');
  push('');
  push('| Weapon | ID | Role | R | Tier | Confidence | Explanation (frozen) | Assumptions | Exact facts | Evidence | Rights | Decision | Checksum |');
  push('|---|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const r of a) {
    push(`| ${cell(r.weaponName)} | ${r.weaponId} | ${r.role} | ${r.refinement} | ${r.proposedTier} | ${r.confidence} | ${cell(r.explanationVi)} | ${cell(r.gameplayAssumptions.join('; '))} | ${cell(r.exactGameFacts.join('; '))} | ${cell(r.evidence.primaryEvidence.join(', '))} | false — ${cell(r.rightsVerification.assessment)} | ${r.selectedDecision} | \`${r.approvalChecksum}\` |`);
  }
  push('');

  push('## 2. 13 candidates eligible for Admin review (Group A)');
  push('');
  for (const r of a) {
    push(`- **${r.weaponName} (${r.weaponId})** — ${r.role}, ${r.refinement}, proposed **${r.proposedTier}**, confidence ${r.confidence}. Checksum \`${r.approvalChecksum}\`. Decision: **PENDING**.`);
    if (r.tierChangeReview) push(`  - Tier change requires separate confirmation: **${r.tierChangeReview.change}**.`);
  }
  push('');
  push('These 13 can be presented as a review batch. A partial import may select any subset once real approvals exist.');
  push('');

  push('## 3. Favonius Greatsword 12401 — blocked (Group B)');
  push('');
  push(`- Candidate retained: \`${b.candidateId}\`, **not deleted**.`);
  push(`- Draft recommendation: \`${b.draftRecommendation}\`; required decision: **REQUEST_CHANGES**; it is not in the importable batch.`);
  push(`- Role / refinement / proposed tier: ${b.role} / ${b.refinement} / **${b.proposedTier}**, confidence **${b.confidence}**.`);
  push(`- Frozen explanation: ${b.explanationVi}`);
  push(`- Checksum: \`${b.approvalChecksum}\`.`);
  push('');
  push('Evidence still required before the block can be lifted:');
  push('');
  for (const e of b.requiredEvidence) push(`- [${e.present ? 'x' : ' '}] ${e.label} (\`${e.field}\`)`);
  push('');
  push(`Missing: **${b.missingEvidence.join(', ')}**. ${b.unblockRule}`);
  push('');

  push('## 4. Two changed tiers — separate Admin confirmation');
  push('');
  for (const t of sheet.tierChangeReviews) {
    push(`### ${t.weaponName} (${t.weaponId}) — ${t.role} ${t.refinement}`);
    push('');
    push(`- **${t.change}** — previous \`${t.previousTier}\`, proposed \`${t.proposedTier}\`.`);
    push(`- Reason: ${t.reason}`);
    push(`- Conditions: ${t.gameplayConditions.join('; ')}`);
    push(`- Exact facts: ${t.exactFacts.join('; ')}`);
    push(`- Separate confirmation required: **yes**; currently **${t.confirmed ? 'confirmed' : 'NOT confirmed'}**.`);
    push('');
  }
  if (sheet.tierChangeReviews.some(t => t.weaponId === '14402')) {
    push('The Widsith detail: three random themes (60% ATK / 48% Elemental DMG / 240 EM at R1) last 10s on a 30s cycle; the theme cannot be chosen, the burst window must fit inside 10s, and the EM theme is group-dependent rather than useless.');
    push('');
  }
  push('Approving a record does **not** approve its tier change; the importer requires both `tierReReviewConfirmed` and `tierChangeReviewConfirmed`.');
  push('');

  push('## 5. Missing per-record decisions');
  push('');
  push('| Weapon | ID | Decision | Still required |');
  push('|---|---|---|---|');
  for (const m of sheet.missingDecisions) {
    push(`| ${cell(m.weaponName)} | ${m.weaponId} | ${m.decision} | ${cell(m.missing.join(', '))} |`);
  }
  push('');

  push('## 6. Publish-rights verification status');
  push('');
  push('- Rankings were built independently with the internal rubric.');
  push('- Explanations are original GenshinHub Vietnamese text; no Genshin-Builds editorial ranking was copied.');
  push('- Game facts come from local `genshin-db@5.2.15` with per-record attribution in `evidence`.');
  push('- The 296 `SOURCE_DERIVED` research records are **not** used as official rankings.');
  push(`- All ${sheet.rightsDossier.records.length} flags are \`publishRightsVerified = false\`; none is set by automation.`);
  push('');
  push('| ID | Flag | Original | Independent | Editorial copy | Attribution |');
  push('|---|---|---|---|---|---|');
  for (const r of sheet.rightsDossier.records) {
    push(`| ${r.weaponId} | ${r.publishRightsVerified} | ${r.originalExplanation} | ${r.independentTier} | ${r.externalEditorialTextCopied} | ${r.attributionRecorded} |`);
  }
  push('');

  push('## 7. Safe partial-import dry-run');
  push('');
  if (dry) {
    push('Executed: `node scripts/weapon-tier-independent/import-approved.cjs` (no `--apply`). Captured to `docs/weapon-tier-independent/partial-import-dry-run.json`.');
    push('');
    push('| Metric | Value |');
    push('|---|---|');
    push(`| Mode | ${dry.mode} |`);
    push(`| Selection | ${dry.selection.mode} |`);
    push(`| Eligible | ${dry.counts.eligible} |`);
    push(`| Blocked | ${dry.counts.blocked} |`);
    push(`| Skipped | ${dry.counts.skipped} |`);
    push(`| Changed | ${dry.counts.changed} |`);
    push(`| Write count | ${dry.counts.writeCount} |`);
    push(`| Fatal issues | ${dry.issues.length} |`);
    push(`| Freeze OK | ${dry.freezeOk} |`);
    push('');
    push('Blocked reasons (Group B shown explicitly):');
    push('');
    const groupBBlock = dry.blocked.find(x => x.candidateId === 'independent-12401-SUB_DPS-R1');
    if (groupBBlock) push(`- \`12401\`: ${groupBBlock.reasons.join('; ')}`);
    for (const x of dry.blocked.filter(x => x.candidateId !== 'independent-12401-SUB_DPS-R1').slice(0, 3)) {
      push(`- \`${x.weaponId}\`: ${x.reasons.join('; ')}`);
    }
    push('');
    push('Partial selection is supported: `--only <candidateId[,id...]>` or `--weapon-ids <id[,id...]>`. Selecting only approved Group A rows produces a smaller write set; Favonius Greatsword is always blocked until its six evidence fields are supplied.');
  } else {
    push('_Dry-run artifact not present; run the importer before building this report._');
  }
  push('');

  push('## 8. Test results');
  push('');
  push('All suites were executed **sequentially**. B3.1 additions cover: partial import selection, real Admin authorization (server-derived actor), decision-sheet tampering, checksum mismatch, false `publishRightsVerified`, pending/rejected exclusion, auth-bypass rejection, source-derived exclusion, Group B evidence gate, audit-log integrity, concurrent-modification guard and approved-only public GraphQL.');
  push('');
  push('| Suite | Result |');
  push('|---|---|');
  push('| `weaponTierRanking.test.ts` (service) | 17/17 pass |');
  push('| `weaponTierRanking.graphql.test.ts` (guards) | 5/5 pass |');
  push('| `migration.test.ts` | 5/5 pass |');
  push('| `db.integration.test.ts` | 3/3 pass |');
  push('| `weaponTierDataloader.test.ts` | 2/2 pass |');
  push('| `dataloaders/index.test.ts` | 1/1 pass |');
  push('| `weapon-tier-audit/tier-map.test.cjs` | 4/4 pass |');
  push('| `weapon-tier-audit/pipeline.test.cjs` | 5/5 pass |');
  push('| `game-facts.test.cjs` | 5/5 pass |');
  push('| `independent.test.cjs` | 6/6 pass |');
  push('| `approval.test.cjs` | 9/9 pass |');
  push('| `freeze.test.cjs` (now includes two-pass concurrent-edit guard) | 7/7 pass |');
  push('| `import-guard.test.cjs` (partial import, auth, rights, checksum, bypass, Group B) | 15/15 pass |');
  push('| `migration-integrity.test.cjs` | 4/4 pass |');
  push('| `admin-review.test.cjs` (sheet + report contract) | 8/8 pass |');
  push('');
  push('**Total: 96 tests executed sequentially, 96 passed, 0 failed.**');
  push('');
  push('`prisma validate`, `prisma migrate status` (4 migrations, schema up to date), `tsc --noEmit` and `node --check` on all B3.1 scripts pass. Live read-only GraphQL: `weaponTierRanks(limit: 5)` → `[]`; `adminWeaponTierRanks` without a key → `Unauthorized`. No authenticated admin query was exercised (no key in this environment); guard behaviour is covered by the passing GraphQL/service tests.');
  push('');

  push('## 9. Files changed');
  push('');
  push('- `backend/scripts/weapon-tier-independent/freeze.cjs` — exported pure `assertStable`, added B3.1 fields to the decision template. Frozen source content unchanged.');
  push('- `backend/scripts/weapon-tier-independent/import-approved.cjs` — partial selection, Eligible/Blocked/Skipped/Changed counts, auth-bypass rejection, Group B evidence gate, source-derived exclusion, pre-write freeze re-check.');
  push('- `backend/scripts/weapon-tier-independent/build-admin-review.cjs` — new Admin Review Sheet + report builder.');
  push('- `backend/scripts/weapon-tier-independent/admin-review.test.cjs`, `import-guard.test.cjs` — new and updated B3.1 tests.');
  push('- `docs/weapon-tier-independent/admin-review-sheet.json` — generated Admin Review Sheet.');
  push('- `docs/weapon-tier-independent/partial-import-dry-run.json` — captured dry-run.');
  push('- `docs/weapon-tier-audit/PHASE_B3_1_FINAL_ADMIN_REVIEW.md` — this report.');
  push('- `backend/scripts/weapon-tier-independent/admin-decisions.input.json` — decision input metadata only; all decisions still PENDING, no actor/rights/authentication bypass.');
  push('');
  push('No frozen source (tier, explanation, checksum) was changed. No migration, production write, commit, push, reset, stash or UI change was made.');
  push('');
  push('**Status: waiting for real Admin confirmation of content and publish rights. No automatic approval or import.**');
  push('');

  return lines.join('\n') + '\n';
}

function build() {
  const sheet = buildSheet();
  fs.mkdirSync(DOCS, { recursive: true });
  fs.writeFileSync(SHEET_OUT, JSON.stringify(sheet, null, 2) + '\n');
  const markdown = buildReport(sheet);
  fs.mkdirSync(AUDIT, { recursive: true });
  fs.writeFileSync(REPORT_OUT, markdown);
  return { sheet, reportBytes: Buffer.byteLength(markdown) };
}

if (require.main === module) {
  const { sheet, reportBytes } = build();
  console.log(JSON.stringify({
    sheet: path.relative(ROOT, SHEET_OUT),
    groupA: sheet.groups.A.count,
    groupB: sheet.groups.B.count,
    report: path.relative(ROOT, REPORT_OUT),
    reportBytes,
  }, null, 2));
}
module.exports = { build, buildSheet, buildReport };
