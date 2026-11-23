/**
 * Sentinel values used by DEVELOPMENT-only maintenance for artifact rows whose
 * recommendation could not be independently verified. They are never real
 * artifact sets and must never be presented to users as one.
 */
export const UNVERIFIED_ARTIFACT_EN = 'NOT_VERIFIED';
export const UNVERIFIED_ARTIFACT_VI = 'CHUA_XAC_MINH';

export function isUnverifiedArtifact(name?: string | null): boolean {
  return name === UNVERIFIED_ARTIFACT_EN || name === UNVERIFIED_ARTIFACT_VI;
}

/** Human-readable label for an artifact row, with an honest unavailable-data fallback. */
export function artifactDisplayName(
  nameEn: string | null | undefined,
  nameVi: string | null | undefined,
  locale: string,
): string {
  if (isUnverifiedArtifact(nameEn)) {
    return locale === 'en' ? 'Recommendation not yet verified' : 'Khuyến nghị chưa được xác minh';
  }
  return locale === 'en' ? (nameEn || '') : (nameVi || nameEn || '');
}
