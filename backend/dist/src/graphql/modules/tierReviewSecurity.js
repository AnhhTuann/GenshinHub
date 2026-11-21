"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFakeActor = isFakeActor;
exports.requireAdminActor = requireAdminActor;
exports.canonicalSha256 = canonicalSha256;
exports.characterRankingContentChecksum = characterRankingContentChecksum;
exports.weaponRankingContentChecksum = weaponRankingContentChecksum;
exports.appendCharacterAudit = appendCharacterAudit;
exports.parseExpectedDate = parseExpectedDate;
const node_crypto_1 = require("node:crypto");
/**
 * Shared guards for Phase D1 tier review. Actor identity is always derived from
 * the verified backend auth context; no client-supplied actor field is accepted.
 */
const FAKE_ACTORS = new Set([
    'admin', 'admin-key', 'system', 'automation', 'test', 'agent',
    'auto', 'script', 'ci', 'unknown', 'anonymous',
]);
function isFakeActor(value) {
    return FAKE_ACTORS.has(value.trim().toLowerCase());
}
/** Returns the verified admin actor or throws. Never falls back to a literal key name. */
function requireAdminActor(context) {
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
function canonicalSha256(value) {
    return (0, node_crypto_1.createHash)('sha256').update(stableStringify(value)).digest('hex');
}
function stableStringify(value) {
    if (value === null || typeof value !== 'object')
        return JSON.stringify(value ?? null);
    if (Array.isArray(value))
        return `[${value.map(stableStringify).join(',')}]`;
    const object = value;
    return `{${Object.keys(object).sort().map(key => `${JSON.stringify(key)}:${stableStringify(object[key])}`).join(',')}}`;
}
function withoutReviewMetadata(evidence) {
    if (!evidence || typeof evidence !== 'object' || Array.isArray(evidence))
        return evidence ?? null;
    const { checksum: _checksum, approvalChecksum: _approvalChecksum, auditLog: _auditLog, rightsVerified: _rightsVerified, rightsVerifiedBy: _rightsVerifiedBy, rightsNote: _rightsNote, ...rest } = evidence;
    return rest;
}
/** Content-only checksum: review/audit metadata is deliberately excluded. */
function characterRankingContentChecksum(row) {
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
function weaponRankingContentChecksum(row) {
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
function appendCharacterAudit(evidence, entry) {
    const base = (evidence && typeof evidence === 'object' && !Array.isArray(evidence) ? evidence : {});
    const existing = Array.isArray(base.auditLog) ? base.auditLog : [];
    return { ...base, auditLog: [...existing, entry] };
}
function parseExpectedDate(value) {
    if (value === undefined || value === null || value === '')
        return null;
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? null : date;
}
