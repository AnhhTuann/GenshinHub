'use strict';

/**
 * Builds the first INDEPENDENT GenshinHub weapon-ranking candidate batch.
 * Read-only against PostgreSQL. Candidates are never approved and never imported.
 */
const fs = require('node:fs');
const path = require('node:path');
const { openReadOnly } = require('../weapon-tier-audit/db.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const INPUT = path.join(__dirname, 'candidates.input.json');
const OUT = path.join(ROOT, 'docs', 'weapon-tier-independent', 'independent-candidates.json');

const ROLES = ['MAIN_DPS', 'SUB_DPS', 'SUPPORT'];
const TIERS = ['SS', 'S', 'A', 'B', 'C', 'D'];
const REFINEMENT = ['R1', 'R2', 'R3', 'R4', 'R5', 'UNSPECIFIED', 'SOURCE_MISSING'];

const ISSUE_CODES = [
  'WEAPON_ID_MISSING', 'TYPE_MISMATCH', 'INVALID_ROLE', 'INVALID_TIER', 'INVALID_REFINEMENT',
  'INVALID_VERSION', 'DUPLICATE_RANKING', 'ORPHAN_RECORD', 'ADMIN_CONFLICT', 'BAD_APPROVAL_STATUS',
  'SOURCE_PROVENANCE_MISSING', 'PUBLIC_VISIBILITY_LEAK', 'EXPLANATION_INCOMPLETE',
  'NOT_INDEPENDENT', 'AUDIT_LOG_INCONSISTENT', 'INVALID_OLD_TIER', 'TIER_REASON_MISSING',
  'GAMEPLAY_CONDITIONS_MISSING', 'SENSITIVITY_MISSING',
];

const isNonEmpty = value => typeof value === 'string' && value.trim().length > 0;

function sentenceCount(text) {
  return String(text || '').split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0).length;
}

function validateCandidate(candidate, weapons, seen, expectedVersion, expectedType, auditCount) {
  const issues = [];
  const add = (code, detail) => issues.push({ code, weaponId: candidate.weaponId, detail });
  const weapon = weapons.get(String(candidate.weaponId));

  if (!weapon) { add('WEAPON_ID_MISSING', 'no Weapon row'); add('ORPHAN_RECORD', 'no Weapon row'); }
  else {
    if (weapon.type !== expectedType) add('TYPE_MISMATCH', `${weapon.type} != ${expectedType}`);
    if (weapon.tier || weapon.role) add('ADMIN_CONFLICT', `tier=${weapon.tier} role=${weapon.role}`);
  }
  if (!ROLES.includes(candidate.role)) add('INVALID_ROLE', candidate.role);
  if (!TIERS.includes(candidate.tier)) add('INVALID_TIER', candidate.tier);
  if (!TIERS.includes(candidate.oldTier)) add('INVALID_OLD_TIER', candidate.oldTier);
  if (!isNonEmpty(candidate.tierReason)) add('TIER_REASON_MISSING', candidate.tierReason);
  if (!Array.isArray(candidate.gameplayConditions) || candidate.gameplayConditions.length === 0) {
    add('GAMEPLAY_CONDITIONS_MISSING', candidate.weaponId);
  }
  if (!isNonEmpty(candidate.sensitivity)) add('SENSITIVITY_MISSING', candidate.weaponId);
  if (!REFINEMENT.includes(candidate.refinementContext)) add('INVALID_REFINEMENT', candidate.refinementContext);
  else if (/^R[1-5]$/.test(candidate.refinementContext) && Number(candidate.refinementContext[1]) !== candidate.refinementLevel) {
    add('INVALID_REFINEMENT', 'level does not match context');
  }
  if (candidate.gameVersion !== expectedVersion || !/^\d+\.\d+$/.test(String(candidate.gameVersion))) {
    add('INVALID_VERSION', String(candidate.gameVersion));
  }

  const key = `${candidate.weaponId}|${candidate.role}|${candidate.gameVersion}|${candidate.refinementContext}`;
  if (seen.has(key)) add('DUPLICATE_RANKING', key);
  seen.add(key);

  if (candidate.reviewStatus !== 'PENDING_REVIEW') add('BAD_APPROVAL_STATUS', candidate.reviewStatus);
  const evidence = candidate.evidence || {};
  if (!candidate.sourceName || !evidence.rubric || !Array.isArray(evidence.primaryEvidence) ||
      evidence.primaryEvidence.length === 0 || !evidence.reviewer || !evidence.verifiedAt) {
    add('SOURCE_PROVENANCE_MISSING', 'rubric/evidence/reviewer missing');
  }
  if (candidate.publishRightsVerified !== false) add('PUBLIC_VISIBILITY_LEAK', 'draft must not be publishable');
  const sentences = sentenceCount(candidate.explanationVi);
  if (sentences < 2 || sentences > 4) add('EXPLANATION_INCOMPLETE', `sentences=${sentences}`);
  if (candidate.derivation !== 'INDEPENDENT' || /genshin-builds|gamewith|source.?derived/i.test(
    [candidate.sourceName, candidate.sourceUrl, candidate.explanationVi, JSON.stringify(evidence)].join(' '),
  )) add('NOT_INDEPENDENT', 'derivation or provenance points at an external ranking');
  if (auditCount !== 0) add('AUDIT_LOG_INCONSISTENT', `audit rows=${auditCount}`);
  return issues;
}

async function build() {
  const input = JSON.parse(fs.readFileSync(INPUT, 'utf8'));
  const { prisma, target } = openReadOnly();
  let weapons, auditCount;
  try {
    const [rows, audits] = await prisma.$transaction([
      prisma.weapon.findMany({ select: { id: true, nameEn: true, nameVi: true, type: true, rarity: true, tier: true, role: true } }),
      prisma.weaponTierAudit.count(),
    ]);
    weapons = new Map(rows.map(w => [String(w.id), w]));
    auditCount = audits;
  } finally {
    await prisma.$disconnect();
  }

  const seen = new Set();
  const records = [];
  const issues = [];

  for (const candidate of input.candidates) {
    const weapon = weapons.get(String(candidate.weaponId));
    const expectedType = input.typeMap[candidate.weaponType];
    const candidateIssues = validateCandidate(
      {
        ...candidate,
        gameVersion: input.evaluationVersion,
        sourceName: 'GenshinHub independent rubric',
        sourceUrl: null,
        reviewStatus: 'PENDING_REVIEW',
        derivation: 'INDEPENDENT',
        publishRightsVerified: false,
      },
      weapons, seen, input.evaluationVersion, expectedType, auditCount,
    );
    issues.push(...candidateIssues);
    if (!weapon) continue;
    records.push({
      id: `independent-${candidate.weaponId}-${candidate.role}-${candidate.refinementContext}`,
      weaponId: String(candidate.weaponId),
      nameEn: weapon.nameEn,
      nameVi: weapon.nameVi,
      weaponType: candidate.weaponType,
      dbWeaponType: weapon.type,
      rarity: weapon.rarity,
      role: candidate.role,
      tier: candidate.tier,
      oldTier: candidate.oldTier,
      tierChanged: candidate.oldTier !== candidate.tier,
      tierReason: candidate.tierReason,
      gameplayConditions: candidate.gameplayConditions,
      sensitivity: candidate.sensitivity,
      refinementContext: candidate.refinementContext,
      refinementLevel: candidate.refinementLevel,
      versionKey: input.evaluationVersion,
      gameVersion: input.evaluationVersion,
      gameVersionStatus: 'VERIFIED',
      explanationVi: candidate.explanationVi,
      evidence: candidate.evidence,
      rubricVersion: input.rubricVersion,
      confidence: candidate.confidence,
      sourceName: 'GenshinHub independent rubric',
      sourceUrl: null,
      sourceLocale: 'vi',
      publishRightsVerified: false,
      derivation: 'INDEPENDENT',
      reviewStatus: 'PENDING_REVIEW',
      reviewedAt: null,
      approvedBy: null,
      reviewNotes: 'Independent candidate only. Not approved. Not imported into any public ranking table.',
      logicalKey: `${candidate.weaponId}|${candidate.role}|${input.evaluationVersion}|${candidate.refinementContext}`,
    });
  }

  const counts = {};
  for (const issue of issues) counts[issue.code] = (counts[issue.code] || 0) + 1;
  const byRole = {}, byType = {}, byTier = {}, byOldTier = {}, byRefinement = {};
  let tierChanges = 0;
  for (const r of records) {
    byRole[r.role] = (byRole[r.role] || 0) + 1;
    byType[r.weaponType] = (byType[r.weaponType] || 0) + 1;
    byTier[r.tier] = (byTier[r.tier] || 0) + 1;
    byOldTier[r.oldTier] = (byOldTier[r.oldTier] || 0) + 1;
    byRefinement[r.refinementContext] = (byRefinement[r.refinementContext] || 0) + 1;
    if (r.tierChanged) tierChanges += 1;
  }

  const artifact = {
    description: 'Independent GenshinHub candidate batch. Editorial proposals only. Zero approved rankings, zero DB writes.',
    target,
    evaluationVersion: input.evaluationVersion,
    rubricVersion: input.rubricVersion,
    sourceDerivationNote: 'Not derived from the 296 Genshin-Builds research records; no external editorial text copied.',
    counts: { candidates: input.candidates.length, records: records.length, byRole, byType, byTier, byOldTier, byRefinement, tierChanges },
    validation: { ok: issues.length === 0, issues, counts, checkedCodes: ISSUE_CODES },
    records,
  };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(artifact, null, 2) + '\n');
  return artifact;
}

if (require.main === module) {
  build().then(a => {
    console.log(JSON.stringify({ records: a.records.length, validation: a.validation.counts || {}, ok: a.validation.ok }, null, 2));
    if (!a.validation.ok) process.exitCode = 1;
  }).catch(error => { console.error(error); process.exitCode = 1; });
}

module.exports = { build, validateCandidate, sentenceCount, ISSUE_CODES };
