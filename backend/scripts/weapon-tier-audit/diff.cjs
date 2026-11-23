'use strict';

/** Old-vs-new diff for weapon tiers. Read-only; produces review artifacts only. */
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..', '..');
const DIR = path.join(ROOT, 'docs', 'weapon-tier-audit');
const read = name => JSON.parse(fs.readFileSync(path.join(DIR, name), 'utf8'));

const HEADERS = ['Weapon', 'Type', 'Role', 'Current Tier', 'Proposed Tier', 'Refinement', 'Source', 'Status'];

function buildRows(draft, currentDb) {
  const byId = new Map(currentDb.weapons.map(w => [String(w.id), w]));
  return draft.records.map(record => {
    const current = record.weaponId ? byId.get(String(record.weaponId)) : null;
    const statuses = [];
    if (!record.weaponId) statuses.push('UNMATCHED');
    else if (!current || !current.tier) statuses.push('NEW');
    else if (current.tier === record.tier) statuses.push('UNCHANGED');
    else statuses.push('TIER_CHANGED');

    if (current && current.role && current.role !== record.role) statuses.push('ROLE_CHANGED');
    if (current && current.tier && current.tier !== record.tier) statuses.push('ADMIN_CONFLICT');
    if (current && current.refinement && current.refinement !== record.refinement) statuses.push('REFINEMENT_CHANGED');
    if (!record.explanationVi) statuses.push('EXPLANATION_MISSING');
    if (record.flags.includes('SOURCE_CONFLICT')) statuses.push('SOURCE_CONFLICT', 'DISPUTED');
    statuses.push('SOURCE_MISSING');
    if (record.reviewStatus === 'NEEDS_REVIEW') statuses.push('NEEDS_REVIEW');

    return {
      Weapon: record.nameEn || record.sourceId || '(unmatched)',
      Type: record.weaponType,
      Role: record.role,
      'Current Tier': current?.tier || '',
      'Proposed Tier': record.tier,
      Refinement: record.refinementAssumption,
      Source: record.sourceUrl || '',
      Status: statuses.join(';'),
    };
  });
}

const csvCell = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
const mdCell = value => String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');

function write() {
  const draft = read('snapshot-weapon-tier.draft.json');
  const currentDb = read('current-db.json');
  const rows = buildRows(draft, currentDb);

  const csv = [HEADERS.map(csvCell).join(','), ...rows.map(row => HEADERS.map(h => csvCell(row[h])).join(','))].join('\n') + '\n';
  fs.writeFileSync(path.join(DIR, 'diff-report.csv'), csv);

  const md = [
    `| ${HEADERS.join(' | ')} |`,
    `| ${HEADERS.map(() => '---').join(' | ')} |`,
    ...rows.map(row => `| ${HEADERS.map(h => mdCell(row[h])).join(' | ')} |`),
  ].join('\n') + '\n';
  fs.writeFileSync(path.join(DIR, 'diff-report.md'), md);

  const statusCounts = {};
  for (const row of rows) for (const s of row.Status.split(';')) statusCounts[s] = (statusCounts[s] || 0) + 1;
  const summary = { records: rows.length, statusCounts };
  fs.writeFileSync(path.join(DIR, 'diff-summary.json'), JSON.stringify(summary, null, 2) + '\n');
  return summary;
}

if (require.main === module) {
  const summary = write();
  console.log(JSON.stringify(summary, null, 2));
}

module.exports = { buildRows, write, HEADERS };
