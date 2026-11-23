import 'dotenv/config';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { test } from 'node:test';
import { PrismaClient } from '@prisma/client';

const draftPath = path.resolve(
  __dirname,
  '../../../../../docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json'
);
const batch = JSON.parse(fs.readFileSync(draftPath, 'utf8'));
const rankings = batch.rankings as any[];

const allowed = new Set([
  'READY_FOR_ADMIN_REVIEW',
  'NEEDS_MORE_EVIDENCE',
  'RUBRIC_RECALIBRATION',
  'GAMEPLAY_ASSUMPTION_UNVERIFIED',
]);

function tier(score: number) {
  return score >= 86 ? 'SS' : score >= 76 ? 'S' : score >= 66 ? 'A' : score >= 56 ? 'B' : score >= 46 ? 'C' : 'D';
}

test('Phase B2.5 every ranking has a complete audit record', () => {
  assert.equal(rankings.length, 15);
  assert.ok(batch.method.b25Audit);
  for (const r of rankings) {
    const a = r.b25Review;
    assert.ok(a, `${r.characterId} missing b25Review`);
    assert.ok(allowed.has(a.category), `${r.characterId} invalid category ${a.category}`);
    assert.ok(typeof a.risks === 'string' && a.risks.length > 20);
    assert.ok(typeof a.recommendation === 'string' && a.recommendation.length > 20);
    assert.ok(a.sensitivity && typeof a.sensitivity.performanceOnly === 'number');
    assert.equal(a.sensitivity.performanceOnlyTier, tier(a.sensitivity.performanceOnly));
    // Audit must never mutate approval state or derivation.
    assert.equal(r.approvalStatus, 'PENDING_REVIEW');
    assert.equal(r.derivation, 'INDEPENDENT');
  }
});

test('Phase B2.5 performance-only sensitivity is arithmetically correct', () => {
  for (const r of rankings) {
    const s = r.evidence.rubricScores;
    // Drop the 20% evidence component and renormalise over the remaining 80%.
    const perf = +((0.30 * s.kit + 0.25 * s.flex + 0.15 * s.constellation + 0.10 * s.access) / 0.80).toFixed(1);
    assert.equal(r.b25Review.sensitivity.performanceOnly, perf, r.characterId);
    const flipped = tier(perf) !== r.proposedTier;
    if (flipped) assert.equal(r.b25Review.category, 'RUBRIC_RECALIBRATION', r.characterId);
  }
  const flipped = rankings.filter((r) => tier(r.b25Review.sensitivity.performanceOnly) !== r.proposedTier);
  assert.deepEqual(flipped.map((r) => `${r.characterId}|${r.role}|${r.constellation}`).sort(), [
    'bennett|SUPPORT|C0',
    'fischl|SUB_DPS|C0',
  ]);
});

test('Phase B2.5 energy costs match genshin-db talents attributes', () => {
  const expected: Record<string, number> = {
    bennett: 60, fischl: 60, xingqiu: 80, xiangling: 80,
    'kaedehara-kazuha': 60, furina: 60, neuvillette: 70,
    'raiden-shogun': 90, nahida: 50, zhongli: 40, yelan: 70, mitya: 60,
  };
  for (const r of rankings) {
    const cost = expected[r.characterId];
    assert.ok(
      r.evidence.primaryEvidence.some((p: string) => p.includes(`Energy Cost = ${cost}`)),
      `${r.characterId} missing energy evidence ${cost}`
    );
  }
  const byKey = (id: string, role: string) => rankings.find((r) => r.characterId === id && r.role === role)!;
  assert.match(byKey('nahida', 'SUPPORT').evidence.energyRequirements, /50/);
  assert.match(byKey('zhongli', 'SUPPORT').evidence.energyRequirements, /40/);
  assert.match(byKey('yelan', 'SUB_DPS').evidence.energyRequirements, /70/);
  assert.match(byKey('furina', 'SUB_DPS').evidence.energyRequirements, /60/);
  assert.match(byKey('furina', 'SUPPORT').evidence.energyRequirements, /60/);
});

test('Phase B2.5 corrected gameplay assumptions are explicit', () => {
  const kazuha = rankings.find((r) => r.characterId === 'kaedehara-kazuha')!;
  assert.ok(kazuha.evidence.primaryEvidence.some((p: string) => p.includes('Viridescent Venerer')));
  assert.ok(kazuha.teamAssumptions.some((a: string) => a.includes('Viridescent Venerer')));

  const neuv = rankings.find((r) => r.characterId === 'neuvillette')!;
  assert.ok(neuv.evidence.primaryEvidence.some((p: string) => p.includes('exist independently')));
  assert.ok(neuv.teamAssumptions.some((a: string) => a.includes('3 loai') && a.includes('KHAC NHAU')));

  const mitya = rankings.find((r) => r.characterId === 'mitya')!;
  assert.ok(mitya.evidence.primaryEvidence.some((p: string) => p.includes('Steady State')));
  assert.ok(mitya.evidence.primaryEvidence.some((p: string) => p.includes('14%')));
  assert.equal(mitya.b25Review.category, 'GAMEPLAY_ASSUMPTION_UNVERIFIED');
});

test('Phase B2.5 audit content is free of stray CJK characters', () => {
  const raw = fs.readFileSync(draftPath, 'utf8');
  assert.equal(/[\u4e00-\u9fff]/.test(raw), false);
});

test('Phase B2.5 still writes nothing to development database', async () => {
  const prisma = new PrismaClient();
  try {
    assert.equal(await (prisma as any).characterTierRanking.count(), 0);
    assert.equal(await (prisma as any).characterTierRanking.count({ where: { approvalStatus: 'APPROVED' } }), 0);
  } finally {
    await prisma.$disconnect();
  }
});
