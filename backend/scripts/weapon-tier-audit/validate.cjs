'use strict';

/** Pure validation rules plus read-only DB cross-check for the weapon draft. */
const fs = require('node:fs');
const path = require('node:path');
const { openReadOnly } = require('./db.cjs');
const {
  VALID_TIERS, VALID_ROLES, VALID_TYPES, TYPE_TO_DB, REFINEMENT,
} = require('./tier-map.cjs');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const DIR = path.join(ROOT, 'docs', 'weapon-tier-audit');
const read = name => JSON.parse(fs.readFileSync(path.join(DIR, name), 'utf8'));

/** Validate a draft without touching the database. */
function validateDraft(draft, currentDb) {
  const issues = [];
  const byId = new Map(currentDb.weapons.map(w => [String(w.id), w]));
  const seen = new Map();
  const tierByWeaponRole = new Map();

  draft.records.forEach((record, index) => {
    const where = `records[${index}] ${record.weaponId || record.sourceId}/${record.role}`;
    const add = (code, detail) => issues.push({ code, where, detail });

    if (!VALID_TYPES.includes(record.weaponType)) add('INVALID_TYPE', record.weaponType);
    if (!VALID_ROLES.includes(record.role)) add('INVALID_ROLE', record.role);
    if (!VALID_TIERS.includes(record.tier)) add('INVALID_TIER', record.tier);
    if (record.refinement !== null && !(Number.isInteger(record.refinement) && record.refinement >= 1 && record.refinement <= 5)) {
      add('INVALID_REFINEMENT', String(record.refinement));
    }
    if (record.refinementAssumption !== REFINEMENT.assumption) add('INVALID_REFINEMENT_ASSUMPTION', record.refinementAssumption);
    if (record.gameVersion !== null) add('UNVERIFIED_VERSION', String(record.gameVersion));

    if (!record.weaponId) {
      add('UNMATCHED', record.sourceId);
      return;
    }

    const dbWeapon = byId.get(String(record.weaponId));
    if (!dbWeapon) { add('WEAPON_ID_MISSING', record.weaponId); return; }
    if (record.dbType && record.dbType !== TYPE_TO_DB[record.weaponType]) {
      add('TYPE_MISMATCH', `record ${record.dbType} != ${TYPE_TO_DB[record.weaponType]}`);
    }
    if (dbWeapon.type !== TYPE_TO_DB[record.weaponType]) {
      add('TYPE_MISMATCH', `${dbWeapon.type} != ${TYPE_TO_DB[record.weaponType]}`);
    }
    if (dbWeapon.rarity !== record.rarity) add('RARITY_MISMATCH', `${dbWeapon.rarity} != ${record.rarity}`);

    if (seen.has(record.logicalKey)) add('DUPLICATE_RANKING', record.logicalKey);
    seen.set(record.logicalKey, true);

    const wrKey = `${record.weaponId}|${record.role}`;
    const tiers = tierByWeaponRole.get(wrKey) || new Set();
    tiers.add(record.tier);
    tierByWeaponRole.set(wrKey, tiers);

    if (dbWeapon.tier) add('ADMIN_CONFLICT', `current tier ${dbWeapon.tier}`);
    if (dbWeapon.role) add('ADMIN_CONFLICT', `current role ${dbWeapon.role}`);
    if (!record.explanationVi) add('EXPLANATION_MISSING', wrKey);
    if (record.reviewStatus !== 'PENDING_REVIEW') add('NOT_APPROVED', record.reviewStatus);
  });

  for (const [key, tiers] of tierByWeaponRole) {
    if (tiers.size > 1) issues.push({ code: 'SOURCE_CONFLICT', where: key, detail: [...tiers].join(', ') });
  }

  const counts = {};
  for (const issue of issues) counts[issue.code] = (counts[issue.code] || 0) + 1;
  return {
    ok: issues.length === 0,
    records: draft.records.length,
    issues,
    counts,
    rightsVerified: draft.rightsVerified,
    gameVersionStatus: draft.gameVersionStatus,
  };
}

async function validateWithDb() {
  const draft = read('snapshot-weapon-tier.draft.json');
  const currentDb = read('current-db.json');
  const { target } = openReadOnly(); // validates target without issuing writes
  const report = { ...validateDraft(draft, currentDb), target, note: 'Draft validation only. No database write.' };
  const output = path.join(DIR, 'validation-report.json');
  fs.writeFileSync(output, JSON.stringify(report, null, 2) + '\n');
  return report;
}

if (require.main === module) {
  validateWithDb().then(r => console.log(JSON.stringify({ ok: r.ok, records: r.records, counts: r.counts }, null, 2)))
    .catch(error => { console.error(error); process.exitCode = 1; });
}

module.exports = { validateDraft, validateWithDb };
