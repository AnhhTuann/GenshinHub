'use strict';

/**
 * Read-only readiness check for the proposed multi-build migration.
 * Verifies approved files are intact, derives canonical playstyles generically,
 * and reports what would be imported. It never opens a database connection and
 * never writes a file.
 */
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { isDeepStrictEqual } = require('node:util');
const { verifyApproval } = require('./apply.cjs');
const { normalizePlaystyles } = require('./playstyle.cjs');

const APPROVED = [
  'backups/build-audit/mitya-main-dps.approved.json',
  'backups/build-audit/mitya-support-revised.approved.json',
];

function inspect(root = process.cwd()) {
  return APPROVED.map(relative => {
    const path = join(root, relative);
    const document = JSON.parse(readFileSync(path, 'utf8'));
    const verified = verifyApproval(document);
    const draft = verified.draft;
    const draftFile = join('scripts', 'build-audit', 'drafts', relative.split('/').at(-1).replace('.approved.json', '.json'));
    const workingDraft = JSON.parse(readFileSync(join(root, draftFile), 'utf8'));
    if (!isDeepStrictEqual(draft, workingDraft)) {
      throw new Error(`Approved payload differs from the working draft: ${draftFile}`);
    }
    return {
      file: relative,
      draftFile,
      characterId: draft.characterId,
      checksum: verified.approval.checksum,
      reviewer: verified.approval.reviewer,
      reviewedAt: verified.approval.reviewedAt,
      label: draft.playstyle,
      playstyles: normalizePlaystyles(draft.playstyle),
      counts: {
        weapons: draft.weapons.length,
        artifacts: draft.artifacts.length,
        teams: draft.teams.length,
        experimentalTeams: draft.teams.filter(team => /experimental/i.test(team.name) || /experimental/i.test(team.description ?? '')).length,
        teamsWithBuildCharacterOnField: draft.teams.filter(team => team.members.some(member => member.characterId === draft.characterId && /main dps/i.test(member.role ?? ''))).length,
        teamsWithBuildCharacterOffField: draft.teams.filter(team => team.members.some(member => member.characterId === draft.characterId && /sub dps|support/i.test(member.role ?? ''))).length,
      },
    };
  });
}

if (require.main === module) {
  const report = inspect();
  const duplicate = report.some((item, index) => report.findIndex(other => other.characterId === item.characterId &&
    JSON.stringify(other.playstyles) === JSON.stringify(item.playstyles)) !== index);
  console.log(JSON.stringify({ status: duplicate ? 'DUPLICATE_PLAYSTYLE' : 'READY_FOR_SCHEMA_REVIEW', builds: report }, null, 2));
  if (duplicate) process.exitCode = 1;
}

module.exports = { inspect };
