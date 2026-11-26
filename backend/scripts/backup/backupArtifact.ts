/**
 * The only database this backup workflow is allowed to read. A mismatched
 * hostname aborts before pg_dump; there is no fallback to another URL.
 */
export const APPROVED_STAGING_HOST = 'ep-rapid-cell-ao0wi386.c-2.ap-southeast-1.aws.neon.tech';

/** Validate without ever echoing the connection string or its credentials. */
export function assertStagingDatabaseUrl(raw: string | undefined): void {
  if (!raw || !raw.trim()) {
    throw new Error('NEON_DATABASE_URL secret is missing');
  }
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error('NEON_DATABASE_URL is not a valid connection string');
  }
  if (url.protocol !== 'postgres:' && url.protocol !== 'postgresql:') {
    throw new Error('NEON_DATABASE_URL must use the postgres or postgresql protocol');
  }
  if (url.hostname.toLowerCase() !== APPROVED_STAGING_HOST) {
    throw new Error(`NEON_DATABASE_URL host is not the approved staging host (expected ${APPROVED_STAGING_HOST})`);
  }
}

export const REQUIRED_BACKUP_ENV = [
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_ENDPOINT_URL_S3',
  'AWS_REGION',
  'BACKUP_BUCKET',
] as const;

/** Fail before touching a database or bucket when a secret is absent. */
export function assertBackupSecrets(env: NodeJS.ProcessEnv = process.env): void {
  const missing = REQUIRED_BACKUP_ENV.filter((name) => !(env[name] || '').trim());
  if (missing.length > 0) {
    throw new Error(`Missing required secrets: ${missing.join(', ')}`);
  }
}

export function buildBackupObjectKey(stamp: string, filename: string): string {
  const clean = String(filename).replace(/^.*[\\/]/, '').replace(/[^a-zA-Z0-9._-]/g, '_');
  if (!clean || clean.includes('..')) throw new Error('Invalid backup filename');
  return `pgdump/${clean}`;
}

export function parsePgRestoreList(output: string): number {
  const entries = String(output || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (entries.length === 0) throw new Error('pg_restore --list output is empty');
  return entries.length;
}

export interface BackupLogInfo {
  filename: string;
  size: number;
  timestamp: string;
  checksum: string;
}

export function formatBackupLog(info: BackupLogInfo): string {
  return `[backup] filename=${info.filename} size=${info.size} timestamp=${info.timestamp} sha256=${info.checksum}`;
}
