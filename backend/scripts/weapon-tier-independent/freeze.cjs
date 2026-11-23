'use strict';

/**
 * Phase B3 data freeze.
 *
 * Reads only. Computes a per-record and per-batch SHA-256 over the approved
 * *draft* artifacts, plus a file hash for every input named in the freeze
 * scope. Refuses to freeze if any file changes between the first and second
 * read (concurrent editor guard).
 *
 * The generated admin-decisions.input.json is intentionally NOT part of the
 * frozen files: it is the file the Admin fills in later.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { openReadOnly } = require('../weapon-tier-audit/db.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const DOCS = path.join(ROOT, 'docs', 'weapon-tier-independent');
const MANIFEST = path.join(DOCS, 'freeze-manifest.json');
const SHEET = path.join(DOCS, 'decision-sheet.json');
const DECISIONS = path.join(__dirname, 'admin-decisions.input.json');
const B26_REPORT = path.join(ROOT, 'docs', 'weapon-tier-audit', 'PHASE_B2_6_FINAL_REVIEW.md');

const FROZEN_FILES = [
  B26_REPORT,
  path.join(DOCS, 'approval-package.json'),
  path.join(__dirname, 'candidates.input.json'),
  path.join(__dirname, 'review.input.json'),
  path.join(DOCS, 'RUBRIC.md'),
  path.join(DOCS, 'independent-candidates.json'),
  path.join(DOCS, 'game-facts.json'),
];

const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));

function canonical(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  const keys = Object.keys(value).sort();
  return `{${keys.map(k => `${JSON.stringify(k)}:${canonical(value[k])}`).join(',')}}`;
}

function snapshotFiles() {
  const out = {};
  for (const file of FROZEN_FILES) {
    const stat = fs.statSync(file);
    out[path.relative(ROOT, file)] = {
      sha256: sha(fs.readFileSync(file)),
      size: stat.size,
      mtimeMs: stat.mtimeMs,
    };
  }
  return out;
}

function buildRecords() {
  const pkg = readJson(path.join(DOCS, 'approval-package.json'));
  const candidates = readJson(path.join(DOCS, 'independent-candidates.json'));
  const candidateById = new Map(candidates.records.map(r => [r.id, r]));
  return pkg.rows.map(row => {
    const candidate = candidateById.get(row.candidateId);
    if (!candidate) throw new Error(`FREEZE_ORPHAN_ROW:${row.candidateId}`);
    const payload = {
      candidateId: row.candidateId,
      weaponId: row.weaponId,
      role: row.role,
      refinement: row.refinement,
      tier: row.proposedTier,
      oldTier: row.oldTier,
      explanationVi: candidate.explanationVi,
      evidence: candidate.evidence,
      confidence: row.confidence,
      recommendation: row.recommendation,
      proposedDiff: row.proposedDiff,
    };
    return {
      candidateId: row.candidateId,
      weaponId: row.weaponId,
      sha256: sha(canonical(payload)),
    };
  }).sort((a, b) => a.candidateId.localeCompare(b.candidateId));
}

const batchHash = records => sha(records.map(r => `${r.candidateId}:${r.sha256}`).join('\n'));

function decisionSheet(manifest) {
  const pkg = readJson(path.join(DOCS, 'approval-package.json'));
  const candidates = readJson(path.join(DOCS, 'independent-candidates.json'));
  const candidateById = new Map(candidates.records.map(r => [r.id, r]));
  const hashById = new Map(manifest.records.map(r => [r.candidateId, r.sha256]));
  return {
    phase: 'B3',
    description: 'Per-ranking review dossier. Recommended decisions are NOT Admin decisions. No import is possible while any adminDecision is PENDING.',
    rubricVersion: 'v1.1',
    rightsPolicy: {
      autoVerified: false,
      requirement: 'An Admin must explicitly verify rights and enter a per-record decision with a real actor identity.',
      noExternalEditorialText: true,
      gameDataAttribution: 'genshin-db@5.2.15 + game-facts.json pinned in every record evidence block',
      noGenshinBuildsLicenseRequired: 'Applies only to genuinely independent text and tiers; no editorial text from Genshin-Builds was used.',
    },
    frozenBatchSha256: manifest.batchSha256,
    records: pkg.rows.map(row => {
      const candidate = candidateById.get(row.candidateId);
      return {
      candidateId: row.candidateId,
      weaponId: row.weaponId,
      weaponName: row.weaponName,
      weaponType: row.weaponType,
      dbWeaponType: candidate.dbWeaponType,
      role: row.role,
      refinement: row.refinement,
      refinementLevel: row.refinementLevel,
      proposedTier: row.proposedTier,
      oldTier: row.oldTier,
      tierChanged: row.tierChanged,
      confidence: row.confidence,
      exactGameplayAssumptions: row.gameplayConditions,
      tierJustification: row.tierReason,
      explanationVi: row.explanationVi,
      sensitivity: row.sensitivity,
      exactFacts: row.exactFacts,
      limitations: row.limitations,
      evidenceReferences: row.evidence,
      evidence: candidate.evidence,
      rubricVersion: candidate.rubricVersion,
      versionKey: candidate.gameVersion,
      gameVersion: candidate.gameVersion,
      gameVersionStatus: candidate.gameVersionStatus,
      sourceName: candidate.sourceName,
      sourceLocale: candidate.sourceLocale,
      rightsStatus: {
        publishRightsVerified: row.publishRightsVerified,
        assessment: row.rightsAssessment,
        originalExplanation: true,
        independentTier: true,
        externalEditorialTextCopied: false,
        gameFactsLicense: 'game data facts from local genshin-db; attribution recorded in evidence',
        attributionRequiredAndRecorded: true,
      },
      reviewRecommendation: row.recommendation === 'READY_FOR_ADMIN_REVIEW' ? 'APPROVE' : 'REQUEST_CHANGES',
      reviewStatus: row.recommendation,
      adminDecision: 'PENDING',
      recordSha256: hashById.get(row.candidateId),
      adminActionRequired: row.adminActionRequired,
      };
    }).sort((a, b) => a.weaponId.localeCompare(b.weaponId)),
  };
}

/** Pure two-pass guard: throws if any frozen file changed between reads. */
function assertStable(before, after) {
  const issues = [];
  for (const name of Object.keys(before)) {
    const a = before[name];
    const b = after[name];
    if (!b || a.sha256 !== b.sha256 || a.mtimeMs !== b.mtimeMs || a.size !== b.size) {
      issues.push(`UNSTABLE_INPUT:${name}`);
    }
  }
  if (Object.keys(after).length !== Object.keys(before).length) issues.push('UNSTABLE_INPUT:FILE_SET_CHANGED');
  if (issues.length) throw new Error(issues.join(';'));
  return true;
}

function decisionTemplate(manifest) {
  return {
    note: 'ADMIN DECISION INPUT — fill one decision per record. PENDING blocks all import. Use a real Admin identity; the server derives approvedBy/audit.actor from the authenticated context, not from this file.',
    allowedDecisions: ['APPROVE', 'REQUEST_CHANGES', 'REJECT', 'PENDING'],
    allowedActorsNote: 'admin-key/system/automation/test/agent are rejected as fake actors.',
    decidedBy: null,
    decidedAt: null,
    records: manifest.records.map(r => ({
      candidateId: r.candidateId,
      weaponId: r.weaponId,
      decision: 'PENDING',
      adminActor: null,
      decidedAt: null,
      reason: null,
      rightsVerified: false,
      rightsVerifiedBy: null,
      tierReReviewConfirmed: false,
      evidenceAcknowledged: false,
      reviewGroup: r.candidateId.startsWith('independent-12401-') ? 'B' : 'A',
      tierChangeReviewConfirmed: false,
      evidenceSupplement: r.candidateId.startsWith('independent-12401-')
        ? {
            critRateAssumptions: null,
            passiveProcConditions: null,
            rotation: null,
            fieldTimeRequirements: null,
            energyGenerationAssumptions: null,
            rubricJustification: null,
            supplementedBy: null,
            supplementedAt: null,
          }
        : null,
      recordSha256: r.sha256,
    })),
  };
}

async function build() {
  const before = snapshotFiles();
  const records = buildRecords();
  const batchSha256 = batchHash(records);
  const after = snapshotFiles();
  assertStable(before, after);

  const { prisma } = openReadOnly();
  let dbState;
  try {
    const [ranks, audits, weapons] = await prisma.$transaction([
      prisma.weaponTierRank.count(),
      prisma.weaponTierAudit.count(),
      prisma.weapon.count(),
    ]);
    dbState = { ranks, audits, weapons };
  } finally {
    await prisma.$disconnect();
  }
  if (dbState.ranks !== 0 || dbState.audits !== 0) throw new Error('FREEZE_DB_NOT_EMPTY');

  const manifest = {
    phase: 'B3',
    frozenAt: new Date().toISOString(),
    description: 'Frozen B3 draft checksums. Per-record hash covers the candidate, its evidence and its review decision. No approval or rights flag is part of this freeze.',
    files: before,
    records,
    batchSha256,
    dbStateAtFreeze: dbState,
    writeCount: 0,
  };
  const sheet = decisionSheet(manifest);
  sheet.sha256 = sha(canonical(sheet));
  manifest.decisionSheetSha256 = sheet.sha256;
  manifest.sha256 = sha(canonical({ files: manifest.files, records: manifest.records, batchSha256, decisionSheetSha256: sheet.sha256, dbStateAtFreeze: manifest.dbStateAtFreeze }));

  fs.mkdirSync(DOCS, { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
  fs.writeFileSync(SHEET, JSON.stringify(sheet, null, 2) + '\n');
  if (!fs.existsSync(DECISIONS)) fs.writeFileSync(DECISIONS, JSON.stringify(decisionTemplate(manifest), null, 2) + '\n');
  return { manifest, sheet };
}

function verify() {
  const manifest = readJson(MANIFEST);
  const issues = [];
  const currentFiles = snapshotFiles();
  for (const [name, expected] of Object.entries(manifest.files)) {
    const actual = currentFiles[name];
    if (!actual || actual.sha256 !== expected.sha256) issues.push(`FILE_CHANGED:${name}`);
  }
  if (Object.keys(currentFiles).length !== Object.keys(manifest.files).length) issues.push('FILE_SET_CHANGED');
  const records = buildRecords();
  const expectedById = new Map(manifest.records.map(r => [r.candidateId, r.sha256]));
  if (records.length !== manifest.records.length) issues.push('RECORD_COUNT_CHANGED');
  for (const r of records) {
    if (expectedById.get(r.candidateId) !== r.sha256) issues.push(`RECORD_CHANGED:${r.candidateId}`);
  }
  if (batchHash(records) !== manifest.batchSha256) issues.push('BATCH_HASH_MISMATCH');
  const sheet = readJson(SHEET);
  const sheetCopy = { ...sheet };
  delete sheetCopy.sha256;
  if (sha(canonical(sheetCopy)) !== sheet.sha256) issues.push('DECISION_SHEET_TAMPERED');
  if (sheet.sha256 !== manifest.decisionSheetSha256) issues.push('DECISION_SHEET_MANIFEST_MISMATCH');
  return { ok: issues.length === 0, issues, manifest };
}

async function verifyDbState() {
  const { prisma } = openReadOnly();
  try {
    const [ranks, audits] = await prisma.$transaction([
      prisma.weaponTierRank.count(),
      prisma.weaponTierAudit.count(),
    ]);
    return { ranks, audits, matchesFreeze: ranks === 0 && audits === 0 };
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  if (process.argv.includes('--verify')) {
    const result = verify();
    verifyDbState().then(db => {
      console.log(JSON.stringify({ ...result, db }, null, 2));
      if (!result.ok || !db.matchesFreeze) process.exitCode = 1;
    }).catch(e => { console.error(e); process.exitCode = 1; });
  } else {
    build().then(({ manifest }) => {
      console.log(JSON.stringify({ records: manifest.records.length, batchSha256: manifest.batchSha256, files: Object.keys(manifest.files).length }, null, 2));
    }).catch(e => { console.error(e); process.exitCode = 1; });
  }
}

module.exports = { build, verify, verifyDbState, canonical, sha, batchHash, assertStable, FROZEN_FILES };
