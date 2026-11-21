'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { verify } = require('./freeze.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const SHEET = path.join(ROOT, 'docs', 'weapon-tier-independent', 'decision-sheet.json');
const DECISIONS = path.join(__dirname, 'admin-decisions.input.json');

const load = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const now = () => new Date().toISOString();

function context() {
  const freeze = verify();
  if (!freeze.ok) throw new Error(`freeze invalid: ${freeze.issues.join(';')}`);
  const { openReadOnly } = require('../weapon-tier-audit/db.cjs');
  return { freeze };
}

/** A fully populated, in-memory decision set. Never written to disk, never applied. */
function validDecisions(overrides = {}) {
  const sheet = load(SHEET);
  const actor = overrides.decidedBy ?? 'Admin Nguyen Van A';
  const records = sheet.records.map(r => {
    const base = {
      candidateId: r.candidateId,
      weaponId: r.weaponId,
      decision: 'APPROVE',
      adminActor: actor,
      decidedAt: now(),
      reason: 'Explicit per-record B3.1 approval after rights and content verification.',
      rightsVerified: true,
      rightsVerifiedBy: actor,
      tierReReviewConfirmed: true,
      tierChangeReviewConfirmed: true,
      evidenceAcknowledged: true,
      derivation: 'INDEPENDENT',
      recordSha256: r.recordSha256,
      reviewGroup: r.candidateId.startsWith('independent-12401-') ? 'B' : 'A',
      evidenceSupplement: r.candidateId.startsWith('independent-12401-')
        ? {
            critRateAssumptions: 'Minimum 55% CRIT Rate on the on-field claymore user.',
            passiveProcConditions: 'Windfall R1: 60% chance, 6 Energy, 12s ICD on an on-field CRIT hit.',
            rotation: '9s on-field window per rotation with 3 recorded CRIT hits.',
            fieldTimeRequirements: 'On-field time is required; off-field generates no Windfall particles.',
            energyGenerationAssumptions: 'Expected 1 proc per window at 60% chance = ~6 Energy per rotation.',
            rubricJustification: 'Tier A retained with LOW confidence because uptime is now quantified.',
            supplementedBy: actor,
            supplementedAt: now(),
          }
        : null,
    };
    return { ...base, ...(overrides.byId?.[r.candidateId] ?? {}) };
  });
  return {
    decidedBy: actor,
    decidedAt: now(),
    records,
    ...(overrides.top ?? {}),
  };
}

function readOnlyState() {
  const { openReadOnly } = require('../weapon-tier-audit/db.cjs');
  const { prisma } = openReadOnly();
  return prisma.$transaction([
    prisma.$queryRawUnsafe('SELECT migration_name, checksum FROM "_prisma_migrations" ORDER BY finished_at'),
    prisma.weapon.findMany({ select: { id: true, type: true, tier: true, role: true } }),
  ]).then(([migrationRows, weapons]) => ({ migrationRows, weapons })).finally(() => prisma.$disconnect());
}

function planCtx(state, extra = {}) {
  return {
    sheet: load(SHEET),
    dbState: { ranks: 0, audits: 0 },
    migrationRows: state.migrationRows,
    weapons: state.weapons,
    ...extra,
  };
}

module.exports = { ROOT, SHEET, DECISIONS, load, now, validDecisions, readOnlyState, planCtx, context };
