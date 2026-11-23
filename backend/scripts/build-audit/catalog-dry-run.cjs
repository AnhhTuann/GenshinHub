'use strict';

const assert = require('node:assert/strict');
const { isDeepStrictEqual } = require('node:util');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const { digest } = require('./catalog-completion.cjs');
const { readInventory, developmentClient } = require('./catalog-inventory.cjs');

function dryRun(document, inventory, selection = {}) {
  const characters = new Map(inventory.characters.map(owner => [owner.id, owner]));
  const seen = new Set();
  const candidates = [];
  for (const { checksum, ...candidate } of document.builds) {
    if (selection.character && selection.character !== candidate.characterId) continue;
    if (selection.build && selection.build !== candidate.candidateId) continue;
    assert.ok(!seen.has(candidate.candidateId), 'Duplicate candidate identity');
    seen.add(candidate.candidateId);
    assert.equal(candidate.revision, document.revision, 'Different revision');
    assert.equal(digest(candidate), checksum, 'Candidate checksum mismatch');
    const owner = characters.get(candidate.characterId);
    assert.ok(owner, 'Missing candidate character');
    const baseline = candidate.baseline;
    const current = baseline && owner.builds.find(build => build.id === baseline.buildId);
    const named = owner.builds.find(build => build.name === candidate.patch.name && build.id !== current?.id);
    let outcome = candidate.confidence === 'LOW' ? 'EVIDENCE_HOLD' : 'REQUIRES_EXPLICIT_ADMIN_REVIEW';
    const pending = (current ?? named)?.audits.at(-1);
    if (pending?.action === 'STAGED' && pending.version === (current ?? named).version) {
      const stored = inventory.pendingPatches?.[(current ?? named).id];
      outcome = stored?.version === pending.version && isDeepStrictEqual(stored.changes,candidate.patch)
        ? 'ALREADY_STAGED' : 'PENDING_STAGE_CONFLICT';
    } else if (baseline && (!current || current.version !== baseline.version || digest(current) !== baseline.checksum)) {
      outcome = 'BASELINE_CHANGED';
    } else if (current?.reviewStatus === 'APPROVED') {
      outcome = 'APPROVED_BUILD_PROTECTED';
    } else if (named || owner.id === 'mitya') {
      outcome = 'PROTECTED_CONFLICT';
    }
    candidates.push({ candidateId:candidate.candidateId, characterId:candidate.characterId, checksum,
      expectedBaseline:baseline, existingDefault:owner.builds.find(build=>build.isDefault)?.id??null,
      requestedDefaultChange:false, requiresFirstDefaultDecision:!owner.builds.some(build=>build.isDefault),
      writeEligible:false, outcome });
  }
  if ((selection.character || selection.build) && !candidates.length) throw new Error('No matching candidate');
  return { revision:document.revision, mode:'DRY_RUN', writes:0, selection, candidates };
}

if (require.main === module) {
  const selection = {};
  for (let i = 2; i < process.argv.length; i += 2) {
    const name = { '--character': 'character', '--build': 'build' }[process.argv[i]];
    if (!name || !process.argv[i + 1] || selection[name]) throw new Error('Use --character ID and/or --build CANDIDATE_ID');
    selection[name] = process.argv[i + 1];
  }
  const file = path.resolve(__dirname, '../../../docs/character-builds/proposed-builds.json');
  const document = JSON.parse(readFileSync(file, 'utf8'));
  const prisma = developmentClient();
  readInventory(prisma).then(inventory => console.log(JSON.stringify(dryRun(document, inventory, selection), null, 2)))
    .catch(error => { console.error(error.code ?? error.message); process.exitCode = 1; })
    .finally(() => prisma.$disconnect());
}
module.exports = { dryRun };
