/**
 * Serverless and free-tier hosts have no durable filesystem. Uploads and
 * filesystem backups must fail closed there instead of writing to a directory
 * that disappears with the next instance.
 */
export function isStatelessHost(): boolean {
  return process.env.STATELESS_HOST === '1' || process.env.VERCEL === '1' || process.env.RENDER === '1';
}

export const STATELESS_STORAGE_MESSAGE =
  'Persistent filesystem storage is unavailable on this host. Use an external image URL and the documented Neon pg_dump backup workflow.';
