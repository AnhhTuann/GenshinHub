const assert = require('node:assert/strict');
const { test } = require('node:test');

test('registry checker reports a newer compatible version without applying it', async () => {
  const { checkVersion } = require('./check-version.cjs');
  const result = await checkVersion('5.2.11', async () =>
    Response.json({ version: '5.2.15' }));
  assert.equal(result.updateAvailable, true);
  assert.equal(result.majorChange, false);
  assert.equal(result.latest, '5.2.15');
});

test('registry checker distinguishes major upgrades and registry errors', async () => {
  const { checkVersion } = require('./check-version.cjs');
  const result = await checkVersion('5.2.11', async () =>
    Response.json({ version: '6.0.0' }));
  assert.equal(result.majorChange, true);
  await assert.rejects(() => checkVersion('5.2.11', async () =>
    new Response(null, { status: 503 })), /503/);
});
