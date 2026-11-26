import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { assertBackupSecrets, formatBackupLog } from './backupArtifact';

interface S3Like {
  send(command: any): Promise<any>;
}

export interface UploadBackupInput {
  filePath: string;
  key: string;
  env?: NodeJS.ProcessEnv;
  client?: S3Like;
}

export async function uploadBackupObjects(input: UploadBackupInput): Promise<{
  checksum: string;
  size: number;
  timestamp: string;
  log: string;
  objects: string[];
}> {
  const env = input.env ?? process.env;
  assertBackupSecrets(env);
  if (!input.key.startsWith('pgdump/') || input.key.includes('..')) {
    throw new Error('Backup object key must stay under pgdump/');
  }

  const dump = fs.readFileSync(input.filePath);
  if (dump.length === 0) throw new Error('Dump file is empty');
  const checksum = createHash('sha256').update(dump).digest('hex');
  const timestamp = new Date().toISOString();
  const filename = path.basename(input.filePath);

  const objects = [
    {
      key: input.key,
      body: dump,
      contentType: 'application/x-postgresql-custom',
    },
    {
      key: `${input.key}.sha256`,
      body: Buffer.from(`${checksum}  ${filename}\n`, 'utf8'),
      contentType: 'text/plain; charset=utf-8',
    },
    {
      key: `${input.key}.manifest.json`,
      body: Buffer.from(JSON.stringify({ filename, size: dump.length, timestamp, checksum }, null, 2), 'utf8'),
      contentType: 'application/json; charset=utf-8',
    },
  ];

  const client = input.client ?? new S3Client({
    region: env.AWS_REGION,
    endpoint: env.AWS_ENDPOINT_URL_S3,
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY!,
    },
    forcePathStyle: true,
  });
  const bucket = env.BACKUP_BUCKET!;

  for (const object of objects) {
    await client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: object.key,
      Body: object.body,
      ContentType: object.contentType,
      CacheControl: 'private, no-store',
      Metadata: {
        'content-sha256': checksum,
        'backup-timestamp': timestamp,
      },
    }));
    const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: object.key }));
    if (head?.ContentLength !== object.body.length) {
      throw new Error(`HeadObject size verification failed for ${object.key}`);
    }
    // The uploaded checksum metadata must round-trip exactly; a mismatch means
    // the object was altered or the wrong version was stored.
    if (head?.Metadata?.['content-sha256'] !== checksum) {
      throw new Error(`HeadObject checksum verification failed for ${object.key}`);
    }
  }

  const log = formatBackupLog({ filename, size: dump.length, timestamp, checksum });
  return { checksum, size: dump.length, timestamp, log, objects: objects.map((object) => object.key) };
}

if (require.main === module) {
  const filePath = process.argv[2];
  const key = process.argv[3];
  if (!filePath || !key) {
    console.error('Usage: backup:upload <dump-file> <pgdump/object-key>');
    process.exit(1);
  }
  uploadBackupObjects({ filePath, key })
    .then((result) => console.log(result.log))
    .catch((error) => {
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    });
}
