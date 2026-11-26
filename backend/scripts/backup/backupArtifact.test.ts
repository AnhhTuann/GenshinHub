import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import {
  APPROVED_STAGING_HOST,
  assertBackupSecrets,
  assertStagingDatabaseUrl,
  buildBackupObjectKey,
  formatBackupLog,
  parsePgRestoreList,
} from './backupArtifact';
import { uploadBackupObjects } from './uploadBackup';

const ENV = {
  AWS_ACCESS_KEY_ID: 'test-access-key',
  AWS_SECRET_ACCESS_KEY: 'test-secret-key',
  AWS_ENDPOINT_URL_S3: 'https://br-hidden-frost-aouh1xm1.storage.c-2.ap-southeast-1.aws.neon.tech',
  AWS_REGION: 'ap-southeast-1',
  BACKUP_BUCKET: 'genshinhub-staging-backups',
} as NodeJS.ProcessEnv;

class FakeS3Client {
  calls: Array<{ command: string; input: any }> = [];
  sizes = new Map<string, number>();
  metadata = new Map<string, Record<string, string>>();
  forceMismatch = false;
  forceChecksumMismatch = false;

  async send(command: any): Promise<any> {
    const name = command.constructor.name;
    this.calls.push({ command: name, input: command.input });
    if (name === 'PutObjectCommand') {
      const body = command.input.Body;
      this.sizes.set(command.input.Key, Buffer.byteLength(typeof body === 'string' ? body : Buffer.from(body)));
      this.metadata.set(command.input.Key, { ...(command.input.Metadata ?? {}) });
      return {};
    }
    if (name === 'HeadObjectCommand') {
      const size = this.sizes.get(command.input.Key) ?? 0;
      const stored = this.metadata.get(command.input.Key) ?? {};
      return {
        ContentLength: this.forceMismatch ? size + 1 : size,
        Metadata: this.forceChecksumMismatch
          ? { ...stored, 'content-sha256': 'tampered-checksum' }
          : stored,
      };
    }
    return {};
  }
}

function tempDump(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'genshinhub-backup-'));
  const file = path.join(dir, 'genshinhub-neon-20261125T070000Z.dump');
  fs.writeFileSync(file, Buffer.from('pg_dump custom-format fixture bytes'));
  return file;
}

test('buildBackupObjectKey stores timestamped dumps under pgdump/', () => {
  assert.equal(
    buildBackupObjectKey('20261125T070000Z', 'genshinhub-neon-20261125T070000Z.dump'),
    'pgdump/genshinhub-neon-20261125T070000Z.dump',
  );
});

test('parsePgRestoreList requires a non-empty pg_restore table of contents', () => {
  const list = ['Archive', 'Table 1', 'Table 2'].join('\n');
  assert.equal(parsePgRestoreList(list), 3);
  assert.throws(() => parsePgRestoreList(''), /empty/i);
});

test('assertBackupSecrets fails safely by naming missing secrets only', () => {
  const partial = { ...ENV };
  delete partial.AWS_SECRET_ACCESS_KEY;
  delete partial.BACKUP_BUCKET;
  assert.throws(
    () => assertBackupSecrets(partial),
    (error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      return message.includes('AWS_SECRET_ACCESS_KEY')
        && message.includes('BACKUP_BUCKET')
        && !message.includes('test-access-key')
        && !message.includes('genshinhub-staging-backups');
    },
  );
});

test('assertStagingDatabaseUrl accepts only the exact approved staging hostname', () => {
  assert.equal(APPROVED_STAGING_HOST, 'ep-rapid-cell-ao0wi386.c-2.ap-southeast-1.aws.neon.tech');
  assert.doesNotThrow(() => assertStagingDatabaseUrl(
    `postgresql://user:secret@${APPROVED_STAGING_HOST}/neondb?sslmode=require`,
  ));
  assert.doesNotThrow(() => assertStagingDatabaseUrl(
    `postgres://user:secret@${APPROVED_STAGING_HOST}/neondb`,
  ));
});

test('assertStagingDatabaseUrl rejects other hosts before any pg_dump', () => {
  const forbidden = [
    undefined,
    '',
    'postgresql://user:secret@ep-some-other-branch.c-2.ap-southeast-1.aws.neon.tech/neondb',
    `postgresql://user:secret@${APPROVED_STAGING_HOST}.attacker.example/neondb`,
    `https://${APPROVED_STAGING_HOST}/neondb`,
    'not-a-url',
  ];
  for (const value of forbidden) {
    assert.throws(
      () => assertStagingDatabaseUrl(value),
      (error: unknown) => {
        const message = error instanceof Error ? error.message : String(error);
        return !message.includes('user:secret')
          && !message.includes('attacker.example')
          && !message.includes('not-a-url');
      },
      `expected rejection: ${value}`,
    );
  }
  assert.throws(() => assertStagingDatabaseUrl(
    'postgresql://user:secret@localhost:5432/genshinhub',
  ), /approved staging host/i);
});

test('formatBackupLog includes filename, size, timestamp and checksum', () => {
  const log = formatBackupLog({
    filename: 'dump.dump', size: 906432, timestamp: '2026-11-25T07:00:00Z', checksum: 'abc123',
  });
  for (const value of ['dump.dump', '906432', '2026-11-25T07:00:00Z', 'abc123']) {
    assert.ok(log.includes(value), `missing ${value}`);
  }
});

test('uploadBackupObjects uploads dump and sidecars then verifies each with HeadObject', async () => {
  const file = tempDump();
  const client = new FakeS3Client();
  const result = await uploadBackupObjects({
    filePath: file,
    key: 'pgdump/genshinhub-neon-20261125T070000Z.dump',
    env: ENV,
    client: client as any,
  });
  assert.match(result.checksum, /^[a-f0-9]{64}$/);
  assert.equal(result.objects.length, 3);
  const puts = client.calls.filter(c => c.command === 'PutObjectCommand');
  const heads = client.calls.filter(c => c.command === 'HeadObjectCommand');
  assert.equal(puts.length, 3);
  assert.equal(heads.length, 3);
  for (const put of puts) {
    assert.equal(put.input.Bucket, 'genshinhub-staging-backups');
    assert.match(put.input.Key, /^pgdump\//);
  }
  for (const head of heads) {
    assert.equal(head.input.Bucket, 'genshinhub-staging-backups');
  }
});

test('uploadBackupObjects throws when HeadObject size does not match the local dump', async () => {
  const file = tempDump();
  const client = new FakeS3Client();
  client.forceMismatch = true;
  await assert.rejects(
    uploadBackupObjects({
      filePath: file,
      key: 'pgdump/genshinhub-neon-20261125T070000Z.dump',
      env: ENV,
      client: client as any,
    }),
    /verification failed/i,
  );
});

test('uploadBackupObjects throws when HeadObject checksum metadata does not match', async () => {
  const file = tempDump();
  const client = new FakeS3Client();
  client.forceChecksumMismatch = true;
  await assert.rejects(
    uploadBackupObjects({
      filePath: file,
      key: 'pgdump/genshinhub-neon-20261125T070000Z.dump',
      env: ENV,
      client: client as any,
    }),
    /checksum verification failed/i,
  );
});

test('uploadBackupObjects refuses to run without required secrets', async () => {
  const file = tempDump();
  await assert.rejects(
    uploadBackupObjects({ filePath: file, key: 'pgdump/x.dump', env: {} as NodeJS.ProcessEnv, client: new FakeS3Client() as any }),
    /Missing required secrets/i,
  );
});

test('pgdump workflow schedules weekly backups and uses all required secrets', () => {
  const workflow = fs.readFileSync(path.resolve(__dirname, '../../../.github/workflows/neon-pgdump.yml'), 'utf8');
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /schedule:/);
  assert.match(workflow, /cron:/);
  for (const secret of [
    'NEON_DATABASE_URL', 'AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY',
    'AWS_ENDPOINT_URL_S3', 'AWS_REGION', 'BACKUP_BUCKET',
  ]) {
    assert.ok(workflow.includes(`secrets.${secret}`), `missing secret reference: ${secret}`);
  }
  assert.match(workflow, /pg_dump/);
  assert.match(workflow, /--format=custom/);
  assert.match(workflow, /--no-owner/);
  assert.match(workflow, /--no-acl/);
  assert.match(workflow, /pg_restore\s+--list/);
  assert.match(workflow, /sha256sum/);
  assert.match(workflow, /backup:verify-db/);
  assert.match(workflow, /backup:upload/);
  const verifyStep = workflow.indexOf('backup:verify-db');
  const dumpStep = workflow.indexOf('pg_dump --dbname');
  assert.ok(verifyStep > -1 && dumpStep > -1 && verifyStep < dumpStep,
    'staging host assertion must run before pg_dump');
});
