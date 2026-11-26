import { assertStagingDatabaseUrl } from './backupArtifact';

if (require.main === module) {
  try {
    assertStagingDatabaseUrl(process.env.NEON_DATABASE_URL);
    console.log('[backup] NEON_DATABASE_URL host verified as the approved staging endpoint');
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
