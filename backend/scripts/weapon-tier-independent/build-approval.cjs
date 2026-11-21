'use strict';

/**
 * Builds the Phase B2 approval package from the existing candidate artifact and
 * read-only review decisions. Never writes to any database and never flips a
 * publish-rights or approval flag.
 */
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { openReadOnly } = require('../weapon-tier-audit/db.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const CANDIDATES = path.join(ROOT, 'docs', 'weapon-tier-independent', 'independent-candidates.json');
const REVIEW = path.join(__dirname, 'review.input.json');
const OUT = path.join(ROOT, 'docs', 'weapon-tier-independent', 'approval-package.json');

const ALLOWED = new Set([
  'READY_FOR_ADMIN_REVIEW', 'NEEDS_MORE_EVIDENCE', 'REFINEMENT_UNCLEAR',
  'TIER_DISPUTED', 'RIGHTS_REVIEW_REQUIRED',
]);

async function build() {
  const candidates = JSON.parse(fs.readFileSync(CANDIDATES, 'utf8'));
  const review = JSON.parse(fs.readFileSync(REVIEW, 'utf8'));
  const issues = [];
  const { prisma, target } = openReadOnly();
  let dbState;
  try {
    const [ranks, audits] = await prisma.$transaction([
      prisma.weaponTierRank.count(),
      prisma.weaponTierAudit.count(),
    ]);
    dbState = { ranks, audits };
  } finally {
    await prisma.$disconnect();
  }
  if (dbState.ranks !== 0 || dbState.audits !== 0) issues.push('DATABASE_RANKING_NOT_EMPTY');

  const rows = [];
  for (const candidate of candidates.records) {
    const decision = review.decisions[candidate.id];
    if (!decision) { issues.push(`MISSING_DECISION:${candidate.id}`); continue; }
    if (!ALLOWED.has(decision.recommendation)) issues.push(`INVALID_RECOMMENDATION:${candidate.id}`);
    if (candidate.reviewStatus !== 'PENDING_REVIEW') issues.push(`NOT_PENDING:${candidate.id}`);
    if (candidate.publishRightsVerified !== false) issues.push(`RIGHTS_ALREADY_TRUE:${candidate.id}`);
    if (candidate.derivation !== 'INDEPENDENT') issues.push(`NOT_INDEPENDENT:${candidate.id}`);
    if (candidate.approvedBy || candidate.reviewedAt) issues.push(`ALREADY_REVIEWED:${candidate.id}`);
    if (decision.proposedDiff && decision.proposedDiff.length > 0 && decision.recommendation === 'READY_FOR_ADMIN_REVIEW') {
      issues.push(`DIFF_ON_READY:${candidate.id}`);
    }
    if (candidate.tierChanged && (!candidate.tierReason || !Array.isArray(candidate.evidence.exactFacts) || candidate.evidence.exactFacts.length === 0)) {
      issues.push(`TIER_CHANGE_UNJUSTIFIED:${candidate.id}`);
    }
    if (!decision.adminDecisionRequired) issues.push(`ADMIN_DECISION_MISSING:${candidate.id}`);
    rows.push({
      candidateId: candidate.id,
      weaponId: candidate.weaponId,
      weaponName: candidate.nameEn,
      weaponType: candidate.weaponType,
      dbWeaponType: candidate.dbWeaponType,
      rarity: candidate.rarity,
      role: candidate.role,
      oldTier: candidate.oldTier,
      proposedTier: candidate.tier,
      tierChanged: candidate.tierChanged,
      adminReviewRequired: candidate.tierChanged || decision.recommendation !== 'READY_FOR_ADMIN_REVIEW',
      tierReason: candidate.tierReason,
      refinement: candidate.refinementContext,
      refinementLevel: candidate.refinementLevel,
      gameVersion: candidate.gameVersion,
      evidence: candidate.evidence.primaryEvidence,
      exactFacts: candidate.evidence.exactFacts,
      gameplayConditions: candidate.gameplayConditions,
      sensitivity: candidate.sensitivity,
      limitations: candidate.evidence.limitations ?? decision.limitations ?? [],
      explanationVi: candidate.explanationVi,
      confidence: candidate.confidence,
      derivation: candidate.derivation,
      reviewStatus: candidate.reviewStatus,
      publishRightsVerified: candidate.publishRightsVerified,
      recommendation: decision.recommendation,
      gameFact: decision.gameFact,
      assessment: decision.assessment,
      refinementCheck: decision.refinement,
      rightsAssessment: decision.rightsNote,
      proposedDiff: decision.proposedDiff ?? [],
      adminActionRequired: decision.adminDecisionRequired,
    });
  }

  const byRecommendation = {};
  for (const row of rows) byRecommendation[row.recommendation] = (byRecommendation[row.recommendation] || 0) + 1;
  const packageArtifact = {
    phase: 'B2.6',
    description: 'Read-only FINAL approval package. No ranking is approved, imported or written to PostgreSQL. Publish rights stay false until explicitly verified by an Admin.',
    target,
    reviewedAt: review.reviewedAt,
    gameDataSource: review.gameDataSource,
    candidateArtifactSha256: crypto.createHash('sha256').update(fs.readFileSync(CANDIDATES)).digest('hex'),
    dbStateAtReview: dbState,
    counts: {
      candidates: rows.length,
      byRecommendation,
      tierChanges: rows.filter(r => r.tierChanged).length,
      adminReviewRequired: rows.filter(r => r.adminReviewRequired).length,
      publishRightsVerified: rows.filter(r => r.publishRightsVerified).length,
    },
    validation: { ok: issues.length === 0, issues },
    allowedRecommendations: [...ALLOWED],
    rows,
  };
  fs.writeFileSync(OUT, JSON.stringify(packageArtifact, null, 2) + '\n');
  return packageArtifact;
}

if (require.main === module) {
  build().then(p => {
    console.log(JSON.stringify({ rows: p.rows.length, counts: p.counts, validation: p.validation }, null, 2));
    if (!p.validation.ok) process.exitCode = 1;
  }).catch(e => { console.error(e); process.exitCode = 1; });
}

module.exports = { build, ALLOWED };
