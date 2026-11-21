import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  canonicalSha256,
  characterRankingContentChecksum,
  weaponRankingContentChecksum,
  requireAdminActor,
} from './tierReviewSecurity';
import { createCharacterTierRankingService } from './characterTierRanking/characterTierRanking.service';
import { createWeaponTierRankingService } from './weaponTierRanking/weaponTierRanking.service';

const realAdmin: any = { user: { isAdmin: true }, adminActor: 'operator-42', isAdmin: true };

test('D1: actor is derived from the server context, never from JSON actor fields', () => {
  assert.equal(requireAdminActor(realAdmin), 'operator-42');
  for (const fake of ['admin', 'admin-key', 'system', 'automation', 'anonymous', '']) {
    assert.throws(() => requireAdminActor({ isAdmin: true, adminActor: fake }), /ADMIN_ACTOR_REQUIRED/);
  }
  assert.throws(() => requireAdminActor({ user: { isAdmin: false } }), /Unauthorized/);
  assert.throws(() => requireAdminActor({}), /Unauthorized/);
});

test('D1: content checksums are stable under key order and ignore review metadata', () => {
  const a = { b: 2, a: [1, { z: 3, y: 4 }] };
  const b = { a: [1, { y: 4, z: 3 }], b: 2 };
  assert.equal(canonicalSha256(a), canonicalSha256(b));
  const row = {
    characterId: 'xiangling', role: 'SUB_DPS', tier: 'S', constellation: 'C0',
    gameVersion: '7.2', explanationVi: 'x', derivation: 'INDEPENDENT',
    evidence: { rubric: 'r', primaryEvidence: ['e'], auditLog: [{ action: 'APPROVED' }], rightsVerified: true, rightsNote: 'n' },
  };
  const withAudit = characterRankingContentChecksum(row);
  const withoutAudit = characterRankingContentChecksum({
    ...row,
    evidence: { rubric: 'r', primaryEvidence: ['e'] },
  });
  assert.equal(withAudit, withoutAudit, 'audit/rights metadata must not change the content checksum');
  assert.notEqual(withAudit, characterRankingContentChecksum({ ...row, tier: 'SS' }));
});

test('D1: character approve refuses content changed after review', async () => {
  const stored = {
    id: 'r1', approvalStatus: 'PENDING_REVIEW', derivation: 'INDEPENDENT',
    explanationVi: 'vi explanation', updatedAt: new Date('2026-11-20T01:00:00Z'),
    evidence: { checksum: 'expected', rubric: 'r', primaryEvidence: ['e'] },
  };
  const prisma: any = {
    characterTierRanking: {
      findFirst: async () => ({ ...stored, tier: 'SS' }), // tier drift vs recorded checksum
    },
  };
  await assert.rejects(
    () => createCharacterTierRankingService(prisma).approve('r1', realAdmin, '2026-11-20T01:00:00.000Z', 'expected'),
    /CONTENT_CHANGED_AFTER_REVIEW/,
  );
});

test('D1: weapon approve refuses content changed after review', async () => {
  const row = {
    id: 'w1', reviewStatus: 'PENDING_REVIEW', derivation: 'INDEPENDENT',
    explanationVi: 'vi', publishRightsVerified: true, sourceChecksum: 'a'.repeat(64),
    updatedAt: new Date('2026-11-20T01:00:00Z'),
    evidence: { approvalChecksum: 'stored', rubric: 'r', primaryEvidence: ['e'] },
  };
  const prisma: any = { weaponTierRank: { findFirst: async () => ({ ...row, tier: 'A' }) } };
  // Recompute stored checksum to the CURRENT content so only the expectedChecksum
  // binding is under test; then corrupt content and verify CONTENT_CHANGED fires.
  const currentChecksum = weaponRankingContentChecksum(row);
  const corrupted = { ...row, tier: 'A', evidence: { ...row.evidence, approvalChecksum: currentChecksum } };
  const prisma2: any = { weaponTierRank: { findFirst: async () => corrupted } };
  await assert.rejects(
    () => createWeaponTierRankingService(prisma2).approve('w1', realAdmin, '2026-11-20T01:00:00.000Z', 'a'.repeat(64)),
    /CONTENT_CHANGED_AFTER_REVIEW/,
  );
  // keep prisma referenced so the first mock is not dead code in lint
  assert.ok(prisma);
});
