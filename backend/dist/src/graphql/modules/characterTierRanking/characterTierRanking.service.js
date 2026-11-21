"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAKES = exports.characterRankingContentChecksum = exports.canonicalSha256 = exports.CharacterTierRankingService = void 0;
exports.hasCharacterRightsProof = hasCharacterRightsProof;
exports.createCharacterTierRankingService = createCharacterTierRankingService;
const node_crypto_1 = require("node:crypto");
const versionedReview_1 = require("../phaseD3/versionedReview");
const tierReviewSecurity_1 = require("../tierReviewSecurity");
Object.defineProperty(exports, "canonicalSha256", { enumerable: true, get: function () { return tierReviewSecurity_1.canonicalSha256; } });
Object.defineProperty(exports, "characterRankingContentChecksum", { enumerable: true, get: function () { return tierReviewSecurity_1.characterRankingContentChecksum; } });
const ROLES = new Set(['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
const TIERS = new Set(['SS', 'S', 'A', 'B', 'C', 'D']);
// C1-C5 are valid future enum values, but no evaluation exists for v7.2.
const PHASE_B1_CONSTELLATIONS = new Set(['C0', 'C6']);
const DERIVATIONS = new Set(['INDEPENDENT', 'SOURCE_DERIVED', 'ADMIN_OVERRIDE']);
const REVIEW_FILTERS = ['approvalStatus', 'derivation'];
const PUBLIC_FILTERS = ['characterId', 'role', 'tier', 'constellation', 'gameVersion'];
const FAKES = new Set(['admin', 'admin-key', 'system', 'automation', 'test', 'agent', 'auto', 'script', 'ci', 'unknown']);
exports.FAKES = FAKES;
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}
function clampLimit(value, max) {
    const parsed = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(parsed))
        return max;
    return Math.min(Math.max(Math.trunc(parsed), 1), max);
}
function audit(action, actor, reason) {
    return { action, actor, at: new Date().toISOString(), ...(reason ? { reason } : {}) };
}
const reviewEvidenceFields = new Set([
    'auditLog', 'checksum', 'approvalChecksum', 'rightsVerified', 'rightsVerifiedBy',
    'rightsVerifiedAt', 'rightsNote', 'rightsProof',
]);
function draftEvidence(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return {};
    return Object.fromEntries(Object.entries(value).filter(([key]) => !reviewEvidenceFields.has(key)));
}
function rightsProof(row, actor, at, note) {
    const secret = process.env.ADMIN_JWT_SECRET;
    if (!secret?.trim())
        return null;
    return (0, node_crypto_1.createHmac)('sha256', secret)
        .update(JSON.stringify(['character-ranking-rights-v1', row.id, (0, tierReviewSecurity_1.characterRankingContentChecksum)(row), actor, at, note]))
        .digest('hex');
}
function hasCharacterRightsProof(row) {
    const { rightsVerified, rightsVerifiedBy, rightsVerifiedAt, rightsNote, rightsProof: storedProof } = row.evidence ?? {};
    if (rightsVerified !== true || !isNonEmptyString(rightsVerifiedBy) ||
        !isNonEmptyString(rightsVerifiedAt) || !isNonEmptyString(rightsNote) ||
        typeof storedProof !== 'string' || !/^[a-f0-9]{64}$/.test(storedProof)) {
        return false;
    }
    const proof = rightsProof(row, rightsVerifiedBy, rightsVerifiedAt, rightsNote);
    return proof !== null && (0, node_crypto_1.timingSafeEqual)(Buffer.from(storedProof, 'hex'), Buffer.from(proof, 'hex'));
}
function assertCurrentDossier(row) {
    if (row.gameVersion !== '7.2')
        return;
    const preview = (0, versionedReview_1.buildVersionedReviewPreview)(true);
    const key = `${row.characterId}|${row.role}|${row.constellation}`;
    if (preview.excludedCharacterDrafts.some(draft => draft.recordKey === key)) {
        throw new Error('CHARACTER_DOSSIER_BLOCKED');
    }
    const dossier = preview.records.find(record => record.kind === 'CHARACTER' &&
        `${record.targetId}|${record.role}|${record.conditionValue}` === key);
    if (!dossier)
        return;
    if (dossier.missingEvidence.length || dossier.reviewStatus.startsWith('NEEDS_MORE')) {
        throw new Error('CHARACTER_DOSSIER_BLOCKED');
    }
    const { recordSha256, ...evidence } = draftEvidence(row.evidence);
    if (recordSha256 !== dossier.currentChecksum || row.tier !== dossier.proposedTier ||
        row.explanationVi !== dossier.explanation || (0, tierReviewSecurity_1.canonicalSha256)(evidence) !== (0, tierReviewSecurity_1.canonicalSha256)(dossier.evidence)) {
        throw new Error('CHARACTER_DOSSIER_SUPERSEDED');
    }
}
function nextUpdatedAt(row) {
    return new Date(Math.max(Date.now(), new Date(row.updatedAt).getTime() + 1));
}
class CharacterTierRankingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    actor(context) {
        return (0, tierReviewSecurity_1.requireAdminActor)(context);
    }
    assertAdmin(context) {
        if (context?.user?.isAdmin !== true && context?.isAdmin !== true) {
            throw new Error('Unauthorized: Admin access required.');
        }
    }
    validateInput(input) {
        if (!isNonEmptyString(input?.characterId))
            throw new Error('CHARACTER_ID_REQUIRED');
        if (!ROLES.has(input.role))
            throw new Error('INVALID_ROLE');
        if (!TIERS.has(input.tier))
            throw new Error('INVALID_TIER');
        if (!PHASE_B1_CONSTELLATIONS.has(input.constellation)) {
            throw new Error('UNSUPPORTED_CONSTELLATION');
        }
        if (!isNonEmptyString(input.gameVersion))
            throw new Error('GAME_VERSION_REQUIRED');
        if (!isNonEmptyString(input.sourceUrl) || !isNonEmptyString(input.sourceName)) {
            throw new Error('SOURCE_PROVENANCE_REQUIRED');
        }
        const hasExplanation = isNonEmptyString(input.explanationVi) || isNonEmptyString(input.explanationEn);
        if (input.derivation === 'INDEPENDENT') {
            if (!hasExplanation)
                throw new Error('INDEPENDENT_EXPLANATION_REQUIRED');
            const evidence = input.evidence;
            if (!evidence ||
                typeof evidence !== 'object' ||
                !isNonEmptyString(evidence.rubric) ||
                !Array.isArray(evidence.primaryEvidence) ||
                evidence.primaryEvidence.length === 0 ||
                !isNonEmptyString(evidence.reviewer) ||
                !isNonEmptyString(evidence.verifiedAt)) {
                throw new Error('INDEPENDENT_EVIDENCE_REQUIRED');
            }
        }
        if (input.derivation === 'ADMIN_OVERRIDE' && !hasExplanation) {
            throw new Error('ADMIN_OVERRIDE_EXPLANATION_REQUIRED');
        }
        if (input.derivation && !DERIVATIONS.has(input.derivation)) {
            throw new Error('INVALID_DERIVATION');
        }
        if (input.expectedUpdatedAt !== undefined && (0, tierReviewSecurity_1.parseExpectedDate)(input.expectedUpdatedAt) === null) {
            throw new Error('INVALID_CONCURRENCY_TOKEN');
        }
        if (input.expectedChecksum !== undefined && input.expectedChecksum !== null) {
            if (typeof input.expectedChecksum !== 'string' || !/^[a-f0-9]{64}$/.test(input.expectedChecksum)) {
                throw new Error('INVALID_CHECKSUM');
            }
        }
    }
    /** Verifies that reviewed content did not change between preparation and decision. */
    verifyChecksum(row, expectedChecksum) {
        const contentChecksum = row?.evidence?.checksum;
        const computed = (0, tierReviewSecurity_1.characterRankingContentChecksum)(row);
        if (isNonEmptyString(contentChecksum) && contentChecksum !== computed) {
            throw new Error('CONTENT_CHANGED_AFTER_REVIEW');
        }
        if (isNonEmptyString(expectedChecksum)) {
            // D1-prepared rows carry the frozen artifact SHA; legacy rows fall back to
            // the content checksum. Either way the caller must present the reviewed hash.
            const artifactSha = row?.evidence?.recordSha256;
            const expected = isNonEmptyString(artifactSha) ? artifactSha : contentChecksum;
            if (!isNonEmptyString(expected))
                throw new Error('APPROVAL_CHECKSUM_REQUIRED');
            if (expectedChecksum !== expected)
                throw new Error('CHECKSUM_MISMATCH');
        }
    }
    async listPublic(args = {}) {
        const where = {
            approvalStatus: 'APPROVED',
            gameVersion: '7.2',
            derivation: 'INDEPENDENT',
        };
        for (const key of PUBLIC_FILTERS) {
            if (args?.[key] !== undefined && args[key] !== null)
                where[key] = args[key];
        }
        return this.prisma.characterTierRanking.findMany({
            where,
            orderBy: [
                { gameVersion: 'desc' },
                { role: 'asc' },
                { constellation: 'asc' },
                { tier: 'asc' },
            ],
            take: clampLimit(args?.limit, 500),
        });
    }
    async listAdmin(args = {}, context) {
        this.assertAdmin(context);
        const where = {};
        for (const key of [...PUBLIC_FILTERS, ...REVIEW_FILTERS]) {
            if (args?.[key] !== undefined && args[key] !== null)
                where[key] = args[key];
        }
        return this.prisma.characterTierRanking.findMany({
            where,
            orderBy: [{ gameVersion: 'desc' }, { characterId: 'asc' }, { role: 'asc' }],
            take: clampLimit(args?.limit, 1000),
        });
    }
    /** Server-derived audit trail stored with the ranking (no schema change required). */
    async listAuditLog(id, context) {
        this.assertAdmin(context);
        if (!isNonEmptyString(id))
            throw new Error('RANKING_ID_REQUIRED');
        const row = await this.prisma.characterTierRanking.findFirst({ where: { id } });
        if (!row)
            throw new Error('RANKING_NOT_FOUND');
        const entries = row.evidence?.auditLog;
        return Array.isArray(entries) ? entries : [];
    }
    async upsert(input, context) {
        const actor = this.actor(context);
        this.validateInput(input);
        const character = await this.prisma.character.findFirst({
            where: { id: input.characterId },
            select: { id: true },
        });
        if (!character)
            throw new Error('CHARACTER_NOT_FOUND');
        const existing = await this.prisma.characterTierRanking.findFirst({
            where: {
                characterId: input.characterId,
                role: input.role,
                constellation: input.constellation,
                gameVersion: input.gameVersion,
            },
        });
        if (existing?.approvalStatus === 'APPROVED') {
            throw new Error('APPROVED_RANKING_IMMUTABLE');
        }
        if (existing?.derivation === 'SOURCE_DERIVED' &&
            input.derivation &&
            input.derivation !== 'SOURCE_DERIVED') {
            throw new Error('SOURCE_DERIVED_DERIVATION_IMMUTABLE');
        }
        // A reviewed record may not be silently rewritten. Explicit resubmission requires
        // a reason and a concurrency token from the Admin UI.
        if (existing && ['REJECTED', 'NEEDS_REVIEW'].includes(existing.approvalStatus)) {
            if (!isNonEmptyString(input.resubmitReason))
                throw new Error('REVIEWED_RANKING_IMMUTABLE');
            if (input.expectedUpdatedAt === undefined)
                throw new Error('CONCURRENCY_TOKEN_REQUIRED');
        }
        const expectedDate = (0, tierReviewSecurity_1.parseExpectedDate)(input.expectedUpdatedAt);
        if (existing && expectedDate && new Date(existing.updatedAt).getTime() !== expectedDate.getTime()) {
            throw new Error('CONCURRENT_MODIFICATION');
        }
        const { approvalStatus: _approvalStatus, reviewedAt: _reviewedAt, approvedBy: _approvedBy, rejectionReason: _rejectionReason, id: _id, expectedUpdatedAt: _expectedUpdatedAt, expectedChecksum: _expectedChecksum, resubmitReason, lastReviewedDate: _lastReviewedDate, updatedAt: _updatedAt, createdAt: _createdAt, ...cleanInput } = input;
        const evidence = (0, tierReviewSecurity_1.appendCharacterAudit)({
            ...draftEvidence(cleanInput.evidence),
            auditLog: existing?.evidence?.auditLog,
        }, audit('UPSERTED', actor, resubmitReason));
        const data = {
            ...cleanInput,
            evidence,
            derivation: existing?.derivation ?? input.derivation ?? 'SOURCE_DERIVED',
            approvalStatus: 'PENDING_REVIEW',
            reviewedAt: null,
            approvedBy: null,
            rejectionReason: null,
        };
        // Bind the reviewed content to a stable checksum computed from the DB record
        // itself. Approval recomputes this and rejects any post-review content drift.
        data.evidence = { ...evidence, checksum: (0, tierReviewSecurity_1.characterRankingContentChecksum)(data) };
        try {
            if (existing) {
                const updated = await this.prisma.characterTierRanking.updateMany({
                    where: { id: existing.id, updatedAt: existing.updatedAt, approvalStatus: existing.approvalStatus },
                    data: { ...data, updatedAt: nextUpdatedAt(existing) },
                });
                if (updated.count !== 1)
                    throw new Error('CONCURRENT_MODIFICATION');
                return this.prisma.characterTierRanking.findFirst({ where: { id: existing.id } });
            }
            return await this.prisma.characterTierRanking.create({ data });
        }
        catch (error) {
            if (error?.code === 'P2002')
                throw new Error('DUPLICATE_RANKING_KEY');
            throw error;
        }
    }
    async transition(id, context, status, options) {
        const actor = this.actor(context);
        const row = await this.prisma.characterTierRanking.findFirst({ where: { id } });
        if (!row)
            throw new Error('RANKING_NOT_FOUND');
        if (row.approvalStatus === 'APPROVED')
            throw new Error('APPROVED_RANKING_IMMUTABLE');
        const expectedDate = (0, tierReviewSecurity_1.parseExpectedDate)(options.expectedUpdatedAt);
        if (options.expectedUpdatedAt != null && !expectedDate)
            throw new Error('INVALID_CONCURRENCY_TOKEN');
        if (expectedDate && expectedDate.getTime() !== new Date(row.updatedAt).getTime()) {
            throw new Error('CONCURRENT_MODIFICATION');
        }
        if (status === 'APPROVED') {
            this.assertApprovable(row, expectedDate, options.expectedChecksum);
        }
        else {
            this.verifyChecksum(row, options.expectedChecksum);
        }
        const reviewedAt = new Date();
        const result = await this.prisma.characterTierRanking.updateMany({
            where: { id, updatedAt: row.updatedAt, approvalStatus: row.approvalStatus },
            data: {
                approvalStatus: status,
                updatedAt: nextUpdatedAt(row),
                reviewedAt,
                lastReviewedDate: reviewedAt,
                approvedBy: actor,
                rejectionReason: options.reason ?? null,
                evidence: (0, tierReviewSecurity_1.appendCharacterAudit)(row.evidence, audit(options.action, actor, options.reason)),
            },
        });
        if (result.count !== 1)
            throw new Error('CONCURRENT_MODIFICATION');
        return this.prisma.characterTierRanking.findFirst({ where: { id } });
    }
    assertApprovable(row, expectedDate, expectedChecksum) {
        if (row.derivation !== 'INDEPENDENT')
            throw new Error('SOURCE_DERIVED_CANNOT_BE_APPROVED');
        if (row.approvalStatus !== 'PENDING_REVIEW')
            throw new Error('RANKING_NOT_PENDING');
        if (!expectedDate)
            throw new Error('CONCURRENCY_TOKEN_REQUIRED');
        if (!isNonEmptyString(expectedChecksum))
            throw new Error('APPROVAL_CHECKSUM_REQUIRED');
        if (!isNonEmptyString(row.explanationVi) && !isNonEmptyString(row.explanationEn)) {
            throw new Error('EXPLANATION_REQUIRED_FOR_APPROVAL');
        }
        if (!isNonEmptyString(row.evidence?.checksum))
            throw new Error('APPROVAL_CHECKSUM_REQUIRED');
        this.verifyChecksum(row, expectedChecksum);
        assertCurrentDossier(row);
        if (!hasCharacterRightsProof(row))
            throw new Error('RIGHTS_NOT_VERIFIED');
    }
    async approve(id, context, expectedUpdatedAt, expectedChecksum) {
        return this.transition(id, context, 'APPROVED', { expectedUpdatedAt, expectedChecksum, action: 'APPROVED' });
    }
    async requestChanges(id, reason, context, expectedUpdatedAt, expectedChecksum) {
        if (!isNonEmptyString(reason))
            throw new Error('CHANGE_REQUEST_REASON_REQUIRED');
        return this.transition(id, context, 'NEEDS_REVIEW', {
            reason, expectedUpdatedAt, expectedChecksum, action: 'REQUEST_CHANGES',
        });
    }
    async reject(id, reason, context, expectedUpdatedAt, expectedChecksum) {
        if (!isNonEmptyString(reason))
            throw new Error('REJECTION_REASON_REQUIRED');
        return this.transition(id, context, 'REJECTED', {
            reason, expectedUpdatedAt, expectedChecksum, action: 'REJECTED',
        });
    }
    /** Explicit Admin rights verification; never performed by automation. */
    async verifyRights(id, verified, note, context, expectedUpdatedAt) {
        const actor = this.actor(context);
        if (typeof verified !== 'boolean')
            throw new Error('RIGHTS_VERIFICATION_REQUIRED');
        if (verified && !isNonEmptyString(note))
            throw new Error('RIGHTS_NOTE_REQUIRED');
        const row = await this.prisma.characterTierRanking.findFirst({ where: { id } });
        if (!row)
            throw new Error('RANKING_NOT_FOUND');
        if (row.approvalStatus === 'APPROVED')
            throw new Error('APPROVED_RANKING_IMMUTABLE');
        const expectedDate = (0, tierReviewSecurity_1.parseExpectedDate)(expectedUpdatedAt);
        if (!expectedDate)
            throw new Error('CONCURRENCY_TOKEN_REQUIRED');
        if (row.approvalStatus !== 'PENDING_REVIEW')
            throw new Error('RANKING_NOT_PENDING');
        if (expectedDate.getTime() !== new Date(row.updatedAt).getTime())
            throw new Error('CONCURRENT_MODIFICATION');
        this.verifyChecksum(row);
        assertCurrentDossier(row);
        const entry = audit(verified ? 'RIGHTS_VERIFIED' : 'RIGHTS_REVOKED', actor, note);
        const proof = verified ? rightsProof(row, actor, entry.at, note) : null;
        if (verified && !proof)
            throw new Error('RIGHTS_VERIFICATION_NOT_CONFIGURED');
        const data = {
            updatedAt: nextUpdatedAt(row),
            evidence: {
                ...(0, tierReviewSecurity_1.appendCharacterAudit)(row.evidence, entry),
                checksum: (0, tierReviewSecurity_1.characterRankingContentChecksum)(row),
                rightsVerified: verified,
                rightsVerifiedBy: verified ? actor : null,
                rightsVerifiedAt: verified ? entry.at : null,
                rightsNote: note || null,
                rightsProof: proof,
            },
        };
        const updated = await this.prisma.characterTierRanking.updateMany({
            where: { id, updatedAt: expectedDate, approvalStatus: 'PENDING_REVIEW' }, data,
        });
        if (updated.count !== 1)
            throw new Error('CONCURRENT_MODIFICATION');
        return this.prisma.characterTierRanking.findFirst({ where: { id } });
    }
}
exports.CharacterTierRankingService = CharacterTierRankingService;
function createCharacterTierRankingService(prisma) {
    return new CharacterTierRankingService(prisma);
}
