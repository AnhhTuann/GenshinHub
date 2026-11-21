import { createHash } from 'node:crypto';

/**
 * Shared guards for Phase D1 tier review. Actor identity is always derived from
 * the verified backend auth context; no client-supplied actor field is accepted.
 */

const FAKE_ACTORS = new Set([
  'admin', 'admin-key', 'system', 'automation', 'test', 'agent',
  'auto', 'script', 'ci', 'unknown', 'anonymous',
]);

export function isFakeActor(value: string): boolean {
  return FAKE_ACTORS.has(value.trim().toLowerCase());
}

/** Returns the verified admin actor or throws. Never falls back to a literal key name. */
export function requireAdminActor(context: any): string {
  if (context?.user?.isAdmin !== true && context?.isAdmin !== true) {
    throw new Error('Unauthorized: Admin access required.');
  }
  const raw = context?.adminActor ?? context?.user?.id ?? context?.userId;
  if (typeof raw !== 'string' || raw.trim().length === 0 || isFakeActor(raw)) {
    throw new Error('ADMIN_ACTOR_REQUIRED');
  }
  return raw.trim();
}

/** Stable, order-independent hash used for approval checksum binding. */
export function canonicalSha256(value: unknown): string {
  return createHash('sha256').update(stableStringify(value)).digest('hex');
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value ?? null);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  const object = value as Record<string, unknown>;
  return `{${Object.keys(object).sort().map(key => `${JSON.stringify(key)}:${stableStringify(object[key])}`).join(',')}}`;
}

function withoutReviewMetadata(evidence: unknown): unknown {
  if (!evidence || typeof evidence !== 'object' || Array.isArray(evidence)) return evidence ?? null;
  const {
    checksum: _checksum,
    approvalChecksum: _approvalChecksum,
    auditLog: _auditLog,
    rightsVerified: _rightsVerified,
    rightsVerifiedBy: _rightsVerifiedBy,
    rightsNote: _rightsNote,
    ...rest
  } = evidence as Record<string, unknown>;
  return rest;
}

/** Content-only checksum: review/audit metadata is deliberately excluded. */
export function characterRankingContentChecksum(row: any): string {
  const evidence = withoutReviewMetadata(row?.evidence);
  // Character-only provenance fields are written after the content is hashed.
  const contentEvidence = evidence && typeof evidence === 'object' && !Array.isArray(evidence)
    ? Object.fromEntries(Object.entries(evidence).filter(([key]) => !['rightsVerifiedAt', 'rightsProof'].includes(key)))
    : evidence;
  return canonicalSha256({
    characterId: row?.characterId ?? null,
    role: row?.role ?? null,
    tier: row?.tier ?? null,
    constellation: row?.constellation ?? null,
    gameVersion: row?.gameVersion ?? null,
    explanationVi: row?.explanationVi ?? null,
    explanationEn: row?.explanationEn ?? null,
    sourceUrl: row?.sourceUrl ?? null,
    sourceName: row?.sourceName ?? null,
    sourceId: row?.sourceId ?? null,
    sourceGrid: row?.sourceGrid ?? null,
    sourceTierKey: row?.sourceTierKey ?? null,
    sourceMinConstellation: row?.sourceMinConstellation ?? null,
    derivation: row?.derivation ?? null,
    evidence: contentEvidence,
  });
}

export function weaponRankingContentChecksum(row: any): string {
  return canonicalSha256({
    weaponId: row?.weaponId ?? null,
    weaponType: row?.weaponType ?? null,
    role: row?.role ?? null,
    tier: row?.tier ?? null,
    refinementContext: row?.refinementContext ?? null,
    refinementLevel: row?.refinementLevel ?? null,
    versionKey: row?.versionKey ?? null,
    gameVersion: row?.gameVersion ?? null,
    gameVersionStatus: row?.gameVersionStatus ?? null,
    explanationVi: row?.explanationVi ?? null,
    rubricVersion: row?.rubricVersion ?? null,
    confidence: row?.confidence ?? null,
    sourceUrl: row?.sourceUrl ?? null,
    sourceName: row?.sourceName ?? null,
    sourceId: row?.sourceId ?? null,
    derivation: row?.derivation ?? null,
    evidence: withoutReviewMetadata(row?.evidence),
  });
}

export type AuditEntry = { action: string; actor: string; at: string; reason?: string };

export function appendCharacterAudit(evidence: unknown, entry: AuditEntry): any {
  const base = (evidence && typeof evidence === 'object' && !Array.isArray(evidence) ? evidence : {}) as Record<string, unknown>;
  const existing = Array.isArray(base.auditLog) ? base.auditLog : [];
  return { ...base, auditLog: [...existing, entry] };
}

export function parseExpectedDate(value: unknown): Date | null {
  if (value === undefined || value === null || value === '') return null;
  const date = new Date(String(value));
  return Number.isNaN(date.getTime()) ? null : date;
}
