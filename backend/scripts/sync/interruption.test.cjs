'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { test } = require('node:test');
const { setTimeout: wait } = require('node:timers/promises');
const { PrismaClient } = require('@prisma/client');

test('interrupted sync rolls back fixture rows and produces no snapshot', async () => {
  let target;
  try {
    target = new URL(process.env.SYNC_INTERRUPTION_DATABASE_URL ?? '');
  } catch {
    throw new Error('Supply a valid local disposable SYNC_INTERRUPTION_DATABASE_URL');
  }
  assert.equal(target.hostname, '127.0.0.1');
  assert.equal(target.port, '5434');
  assert.match(target.pathname, /^\/genshinhub_[a-z0-9_]+_test$/);
  const prisma = new PrismaClient({ datasourceUrl: target.href });
  const backend = path.resolve(__dirname, '../..');
  const backups = path.join(backend, 'backups');
  const snapshots = () => fs.existsSync(backups)
    ? fs.readdirSync(backups).filter(name => name.startsWith('snapshot_before_sync_')).sort()
    : [];
  const fixtureCounts = () => Promise.all([
    prisma.character.count({ where: { id: 'e2e-test-hero' } }),
    prisma.weapon.count({ where: { id: '998877' } }),
    prisma.artifactSet.count({ where: { id: '998878' } }),
    prisma.material.count({ where: { id: '998879' } }),
  ]);
  let child;
  let completion;
  let functionCreated = false;
  let triggerCreated = false;
  try {
    const [identity] = await prisma.$queryRaw`SELECT current_database() AS db`;
    assert.equal(identity.db, target.pathname.slice(1));
    assert.deepEqual(await fixtureCounts(), [0, 0, 0, 0]);
    const before = snapshots();
    await prisma.$executeRaw`
      CREATE FUNCTION release_fixture_delay() RETURNS trigger LANGUAGE plpgsql
      AS 'BEGIN PERFORM pg_sleep(30); RETURN NEW; END;'
    `;
    functionCreated = true;
    await prisma.$executeRaw`
      CREATE TRIGGER release_fixture_delay BEFORE INSERT ON "Weapon"
      FOR EACH ROW WHEN (NEW.id = '998877') EXECUTE FUNCTION release_fixture_delay()
    `;
    triggerCreated = true;
    child = spawn(process.execPath, ['-r', 'ts-node/register', 'scripts/sync/e2e.test.ts'], {
      cwd: backend,
      env: { ...process.env, DATABASE_URL: target.href, NODE_ENV: 'test', GRAPHQL_URL: 'http://127.0.0.1:4102/graphql' },
      stdio: 'ignore',
    });
    completion = new Promise((resolve, reject) => {
      child.once('exit', (code, signal) => resolve({ code, signal }));
      child.once('error', reject);
    });
    let paused = false;
    for (let attempt = 0; attempt < 120 && !paused && child.exitCode === null; attempt++) {
      const [activity] = await prisma.$queryRaw`
        SELECT EXISTS (
          SELECT 1 FROM pg_stat_activity
          WHERE datname=current_database() AND wait_event='PgSleep' AND query LIKE '%INSERT%Weapon%'
        ) AS paused
      `;
      paused = activity.paused;
      if (!paused) await wait(100);
    }
    assert.equal(paused, true, 'Expected the child to reach the paused fixture write');
    assert.equal(child.kill('SIGTERM'), true);
    assert.equal((await completion).signal, 'SIGTERM');
    // Dropping the trigger waits until the interrupted transaction releases its lock.
    await prisma.$executeRaw`DROP TRIGGER release_fixture_delay ON "Weapon"`;
    triggerCreated = false;
    assert.deepEqual(await fixtureCounts(), [0, 0, 0, 0]);
    assert.deepEqual(snapshots(), before);
  } finally {
    if (child?.exitCode === null && child.signalCode === null) {
      child.kill('SIGTERM');
      await completion?.catch(() => {});
    }
    if (triggerCreated) await prisma.$executeRaw`DROP TRIGGER release_fixture_delay ON "Weapon"`;
    if (functionCreated) await prisma.$executeRaw`DROP FUNCTION release_fixture_delay()`;
    await prisma.$disconnect();
  }
});
