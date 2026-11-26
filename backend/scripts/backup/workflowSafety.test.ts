import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const repoRoot = path.resolve(__dirname, '../../../');
const workflowDir = path.join(repoRoot, '.github', 'workflows');
const applyWorkflow = fs.readFileSync(path.join(workflowDir, 'genshin-data-sync-apply.yml'), 'utf8');
const dryRunWorkflow = fs.readFileSync(path.join(workflowDir, 'genshin-data-sync.yml'), 'utf8');

test('manual apply is staging-only and uses one verified Neon connection for every database operation', () => {
  assert.match(applyWorkflow, /^name: Genshin Data Sync — Apply \(staging\)$/m);
  assert.match(applyWorkflow, /^\s+environment: staging$/m);
  assert.doesNotMatch(applyWorkflow, /environment: production|secrets\.DATABASE_URL/);
  assert.match(applyWorkflow, /NEON_DATABASE_URL: \$\{\{ secrets\.NEON_DATABASE_URL \}\}/);
  const assignments = [...applyWorkflow.matchAll(/^\s+DATABASE_URL:\s*(.+)$/gm)].map((match) => match[1].trim());
  assert.ok(assignments.length >= 2, 'sync check and apply must receive DATABASE_URL');
  assert.ok(assignments.every((value) => value === '${{ secrets.NEON_DATABASE_URL }}'), 'no alternate DB secret may be used');
  const verifyIndex = applyWorkflow.indexOf('npm run backup:verify-db');
  const dumpIndex = applyWorkflow.indexOf('pg_dump --dbname="$NEON_DATABASE_URL"');
  const syncCheckIndex = applyWorkflow.indexOf('npm run sync:check');
  const syncRunIndex = applyWorkflow.indexOf('npm run sync:run');
  assert.ok(verifyIndex >= 0 && verifyIndex < dumpIndex, 'staging host must be verified before pg_dump');
  assert.ok(verifyIndex < syncCheckIndex && syncCheckIndex < syncRunIndex, 'staging host must be verified before dry-run and apply');
  assert.doesNotMatch(applyWorkflow, /assets-prod|assets_prod_|sync_report_prod|production sync/i);
});

test('scheduled dry-run reads only the exact verified staging endpoint and fails on sync errors', () => {
  assert.doesNotMatch(dryRunWorkflow, /secrets\.DATABASE_URL/);
  assert.match(dryRunWorkflow, /NEON_DATABASE_URL: \$\{\{ secrets\.NEON_DATABASE_URL \}\}/);
  assert.match(dryRunWorkflow, /npm run backup:verify-db/);
  assert.match(dryRunWorkflow, /export DATABASE_URL="\$NEON_DATABASE_URL"/);
  assert.match(dryRunWorkflow, /set -euo pipefail/);
  assert.ok(
    dryRunWorkflow.indexOf('npm run backup:verify-db') < dryRunWorkflow.indexOf('npm run sync:check'),
    'staging endpoint must be verified before the dry-run query',
  );
  assert.match(dryRunWorkflow, /staging environment approval/);
  assert.doesNotMatch(dryRunWorkflow, /production environment approval/);
});
