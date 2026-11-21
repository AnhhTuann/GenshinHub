"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaponTierRankingService = void 0;
exports.createWeaponTierRankingService = createWeaponTierRankingService;
const tierReviewSecurity_1 = require("../tierReviewSecurity");
const ROLES = new Set(['MAIN_DPS', 'SUB_DPS', 'SUPPORT']);
const TIERS = new Set(['SS', 'S', 'A', 'B', 'C', 'D']);
const REFINEMENT_CONTEXTS = new Set(['R1', 'R2', 'R3', 'R4', 'R5', 'UNSPECIFIED', 'SOURCE_MISSING']);
const DERIVATIONS = new Set(['INDEPENDENT', 'SOURCE_DERIVED', 'ADMIN_OVERRIDE']);
const VERSION_STATUSES = new Set(['VERIFIED', 'SOURCE_MISSING']);
const CONFIDENCES = new Set(['HIGH', 'MEDIUM', 'LOW']);
const AUDIT_ACTIONS = new Set(['CREATED', 'UPDATED', 'APPROVED', 'REJECTED', 'REQUEST_CHANGES', 'RIGHTS_VERIFIED']);
const PUBLIC_FILTERS = ['weaponId', 'weaponType', 'role', 'tier', 'refinementContext', 'versionKey', 'gameVersion'];
const ADMIN_REVIEW_FILTERS = ['reviewStatus', 'derivation', 'publishRightsVerified'];
function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}
function clampLimit(value, max) {
    const parsed = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(parsed))
        return max;
    return Math.min(Math.max(Math.trunc(parsed), 1), max);
}
function parseExpectedDate(value) {
    return (0, tierReviewSecurity_1.parseExpectedDate)(value);
}
class WeaponTierRankingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    assertAdmin(context) {
        if (context?.user?.isAdmin !== true && context?.isAdmin !== true) {
            throw new Error('Unauthorized: Admin access required.');
        }
    }
    actor(context) {
        return (0, tierReviewSecurity_1.requireAdminActor)(context);
    }
    /** Approval-time content/checksum revalidation; prevents post-review edits. */
    verifyChecksum(row, expectedChecksum) {
        const recorded = row?.sourceChecksum;
        if (typeof expectedChecksum === 'string' && expectedChecksum.length > 0) {
            if (!/^[a-f0-9]{64}$/.test(expectedChecksum))
                throw new Error('INVALID_CHECKSUM');
            if (typeof recorded !== 'string' || recorded !== expectedChecksum) {
                throw new Error('CHECKSUM_MISMATCH');
            }
        }
        const approvalChecksum = row?.evidence?.approvalChecksum;
        if (typeof approvalChecksum === 'string' && approvalChecksum !== (0, tierReviewSecurity_1.weaponRankingContentChecksum)(row)) {
            throw new Error('CONTENT_CHANGED_AFTER_REVIEW');
        }
    }
    validateInput(input) {
        if (!isNonEmptyString(input?.weaponId))
            throw new Error('WEAPON_ID_REQUIRED');
        if (!isNonEmptyString(input?.weaponType))
            throw new Error('WEAPON_TYPE_REQUIRED');
        if (!ROLES.has(input.role))
            throw new Error('INVALID_ROLE');
        if (!TIERS.has(input.tier))
            throw new Error('INVALID_TIER');
        if (!REFINEMENT_CONTEXTS.has(input.refinementContext))
            throw new Error('INVALID_REFINEMENT_CONTEXT');
        if (!VERSION_STATUSES.has(input.gameVersionStatus))
            throw new Error('INVALID_VERSION_STATUS');
        if (!isNonEmptyString(input.versionKey))
            throw new Error('VERSION_KEY_REQUIRED');
        if (input.confidence !== undefined && input.confidence !== null && !CONFIDENCES.has(input.confidence)) {
            throw new Error('INVALID_CONFIDENCE');
        }
        if (input.derivation !== undefined && !DERIVATIONS.has(input.derivation))
            throw new Error('INVALID_DERIVATION');
        if (input.expectedUpdatedAt !== undefined && parseExpectedDate(input.expectedUpdatedAt) === null) {
            throw new Error('INVALID_CONCURRENCY_TOKEN');
        }
        // Refinement level must agree with its non-null context; no implicit R1/R5 default.
        const isRankedRefinement = /^R[1-5]$/.test(input.refinementContext);
        if (isRankedRefinement) {
            const expected = Number(input.refinementContext.slice(1));
            if (input.refinementLevel !== expected)
                throw new Error('REFINEMENT_LEVEL_MISMATCH');
        }
        else if (input.refinementLevel !== undefined && input.refinementLevel !== null) {
            throw new Error('REFINEMENT_LEVEL_NOT_ALLOWED');
        }
        // SOURCE_MISSING must never be promoted into a verified version claim.
        if (input.gameVersionStatus === 'SOURCE_MISSING') {
            if (input.gameVersion !== undefined && input.gameVersion !== null)
                throw new Error('SOURCE_MISSING_VERSION_CONFLICT');
            if (input.versionKey !== 'UNSPECIFIED')
                throw new Error('SOURCE_MISSING_VERSION_KEY_CONFLICT');
        }
        else if (!isNonEmptyString(input.gameVersion)) {
            throw new Error('VERIFIED_VERSION_REQUIRED');
        }
        if (!isNonEmptyString(input.sourceName))
            throw new Error('SOURCE_PROVENANCE_REQUIRED');
        if (input.derivation === 'SOURCE_DERIVED' && !isNonEmptyString(input.sourceUrl)) {
            throw new Error('SOURCE_URL_REQUIRED');
        }
        const hasExplanation = isNonEmptyString(input.explanationVi);
        if (input.derivation === 'INDEPENDENT' || input.derivation === 'ADMIN_OVERRIDE') {
            if (!hasExplanation)
                throw new Error('EXPLANATION_REQUIRED');
        }
        if (input.derivation === 'INDEPENDENT') {
            const evidence = input.evidence;
            if (!evidence || typeof evidence !== 'object' ||
                !isNonEmptyString(evidence.rubric) ||
                !Array.isArray(evidence.primaryEvidence) || evidence.primaryEvidence.length === 0 ||
                !isNonEmptyString(evidence.reviewer) ||
                !isNonEmptyString(evidence.verifiedAt))
                throw new Error('INDEPENDENT_EVIDENCE_REQUIRED');
        }
    }
    async audit(action, rankingId, context, changes) {
        if (!AUDIT_ACTIONS.has(action))
            throw new Error('INVALID_AUDIT_ACTION');
        await this.prisma.weaponTierAudit.create({
            data: { rankingId, action, actor: this.actor(context), changes: changes ?? null },
        });
    }
    async listPublic(args = {}) {
        const where = {
            reviewStatus: 'APPROVED',
            derivation: 'INDEPENDENT',
            publishRightsVerified: true,
        };
        if (args?.gameVersion == null && args?.versionKey == null)
            where.versionKey = '7.2';
        for (const key of PUBLIC_FILTERS) {
            if (args?.[key] !== undefined && args[key] !== null)
                where[key] = args[key];
        }
        return this.prisma.weaponTierRank.findMany({
            where,
            orderBy: [{ versionKey: 'desc' }, { role: 'asc' }, { refinementContext: 'asc' }],
            take: clampLimit(args?.limit, 500),
        });
    }
    async listForWeapon(weaponId) {
        if (!isNonEmptyString(weaponId))
            return [];
        return this.listPublic({ weaponId });
    }
    async listAdmin(args = {}, context) {
        this.assertAdmin(context);
        const where = {};
        for (const key of [...PUBLIC_FILTERS, ...ADMIN_REVIEW_FILTERS]) {
            if (args?.[key] !== undefined && args[key] !== null)
                where[key] = args[key];
        }
        return this.prisma.weaponTierRank.findMany({
            where,
            orderBy: [{ versionKey: 'desc' }, { weaponId: 'asc' }, { role: 'asc' }],
            take: clampLimit(args?.limit, 1000),
        });
    }
    async listAuditLog(rankingId, context, limit = 200) {
        this.assertAdmin(context);
        if (!isNonEmptyString(rankingId))
            throw new Error('RANKING_ID_REQUIRED');
        return this.prisma.weaponTierAudit.findMany({
            where: { rankingId },
            orderBy: [{ createdAt: 'asc' }, { id: 'asc' }],
            take: clampLimit(limit, 200),
        });
    }
    async upsert(input, context) {
        this.assertAdmin(context);
        this.validateInput(input);
        const weapon = await this.prisma.weapon.findFirst({
            where: { id: input.weaponId },
            select: { id: true, type: true },
        });
        if (!weapon)
            throw new Error('WEAPON_NOT_FOUND');
        if (weapon.type !== input.weaponType)
            throw new Error('WEAPON_TYPE_MISMATCH');
        const existing = await this.prisma.weaponTierRank.findFirst({
            where: {
                weaponId: input.weaponId,
                role: input.role,
                versionKey: input.versionKey,
                refinementContext: input.refinementContext,
            },
        });
        if (existing?.reviewStatus === 'APPROVED')
            throw new Error('APPROVED_RANKING_IMMUTABLE');
        if (existing?.derivation === 'SOURCE_DERIVED' && input.derivation && input.derivation !== 'SOURCE_DERIVED') {
            throw new Error('SOURCE_DERIVED_DERIVATION_IMMUTABLE');
        }
        if (existing && ['REJECTED', 'NEEDS_REVIEW'].includes(existing.reviewStatus)) {
            if (!isNonEmptyString(input.resubmitReason))
                throw new Error('REVIEWED_RANKING_IMMUTABLE');
            if (input.expectedUpdatedAt === undefined)
                throw new Error('CONCURRENCY_TOKEN_REQUIRED');
        }
        const expectedDate = parseExpectedDate(input.expectedUpdatedAt);
        if (existing && expectedDate && new Date(existing.updatedAt).getTime() !== expectedDate.getTime()) {
            throw new Error('CONCURRENT_MODIFICATION');
        }
        const { approvalStatus: _approvalStatus, reviewedAt: _reviewedAt, approvedBy: _approvedBy, rejectionReason: _rejectionReason, id: _id, expectedUpdatedAt: _expectedUpdatedAt, expectedChecksum: _expectedChecksum, resubmitReason, updatedAt: _updatedAt, createdAt: _createdAt, 
        // Rights are never client-controlled on upsert. The only legitimate flip is
        // the explicit Admin verifyWeaponTierRights mutation with a CAS token.
        publishRightsVerified: _clientRights, ...cleanInput } = input;
        const derivation = existing?.derivation ?? input.derivation ?? 'SOURCE_DERIVED';
        const hasExplanation = isNonEmptyString(input.explanationVi);
        const hasEvidence = Boolean(input.evidence && typeof input.evidence === 'object');
        const reviewStatus = !hasExplanation || derivation === 'SOURCE_DERIVED' || !hasEvidence
            ? 'NEEDS_REVIEW'
            : 'PENDING_REVIEW';
        const data = {
            ...cleanInput,
            derivation,
            reviewStatus,
            publishRightsVerified: existing?.publishRightsVerified ?? false,
            reviewedAt: null,
            approvedBy: null,
            rejectionReason: null,
        };
        // Content checksum is computed by the server over the record itself. It is
        // recomputed and compared at approval time to detect post-review edits.
        data.evidence = {
            ...(data.evidence && typeof data.evidence === 'object' ? data.evidence : {}),
            approvalChecksum: (0, tierReviewSecurity_1.weaponRankingContentChecksum)(data),
        };
        try {
            let result;
            if (!existing) {
                result = await this.prisma.weaponTierRank.create({ data });
                await this.audit('CREATED', result.id, context, { reviewStatus, derivation });
                return result;
            }
            const where = { id: existing.id };
            if (expectedDate)
                where.updatedAt = expectedDate;
            const updated = await this.prisma.weaponTierRank.updateMany({ where, data });
            if (updated.count !== 1)
                throw new Error('CONCURRENT_MODIFICATION');
            result = await this.prisma.weaponTierRank.findFirst({ where: { id: existing.id } });
            await this.audit('UPDATED', existing.id, context, { reviewStatus, derivation, tier: input.tier });
            return result;
        }
        catch (error) {
            if (error?.code === 'P2002')
                throw new Error('DUPLICATE_RANKING_KEY');
            throw error;
        }
    }
    async approve(id, context, expectedUpdatedAt, expectedChecksum) {
        this.actor(context);
        const row = await this.prisma.weaponTierRank.findFirst({ where: { id } });
        if (!row)
            throw new Error('RANKING_NOT_FOUND');
        if (row.reviewStatus === 'APPROVED')
            throw new Error('ALREADY_APPROVED');
        if (row.derivation !== 'INDEPENDENT')
            throw new Error('NON_INDEPENDENT_CANNOT_BE_APPROVED');
        if (!isNonEmptyString(row.explanationVi))
            throw new Error('EXPLANATION_REQUIRED_FOR_APPROVAL');
        if (isNonEmptyString(row.sourceChecksum) && !isNonEmptyString(row.evidence?.rubric)) {
            throw new Error('EVIDENCE_REQUIRED_FOR_APPROVAL');
        }
        if (!row.publishRightsVerified)
            throw new Error('PUBLISH_RIGHTS_NOT_VERIFIED');
        this.verifyChecksum(row, expectedChecksum);
        const expectedDate = parseExpectedDate(expectedUpdatedAt) ?? new Date(row.updatedAt);
        const updated = await this.prisma.weaponTierRank.updateMany({
            where: { id, updatedAt: expectedDate, reviewStatus: row.reviewStatus },
            data: {
                reviewStatus: 'APPROVED',
                reviewedAt: new Date(),
                approvedBy: this.actor(context),
                rejectionReason: null,
            },
        });
        if (updated.count !== 1)
            throw new Error('CONCURRENT_MODIFICATION');
        await this.audit('APPROVED', id, context, { approvedBy: this.actor(context) });
        return this.prisma.weaponTierRank.findFirst({ where: { id } });
    }
    async reject(id, reason, context, expectedUpdatedAt, expectedChecksum) {
        this.assertAdmin(context);
        if (!isNonEmptyString(reason))
            throw new Error('REJECTION_REASON_REQUIRED');
        const row = await this.prisma.weaponTierRank.findFirst({ where: { id } });
        if (!row)
            throw new Error('RANKING_NOT_FOUND');
        if (row.reviewStatus === 'APPROVED')
            throw new Error('APPROVED_RANKING_IMMUTABLE');
        this.verifyChecksum(row, expectedChecksum);
        const expectedDate = parseExpectedDate(expectedUpdatedAt) ?? new Date(row.updatedAt);
        const updated = await this.prisma.weaponTierRank.updateMany({
            where: { id, updatedAt: expectedDate, reviewStatus: row.reviewStatus },
            data: {
                reviewStatus: 'REJECTED',
                reviewedAt: new Date(),
                approvedBy: this.actor(context),
                rejectionReason: reason,
            },
        });
        if (updated.count !== 1)
            throw new Error('CONCURRENT_MODIFICATION');
        await this.audit('REJECTED', id, context, { reason, approvedBy: this.actor(context) });
        return this.prisma.weaponTierRank.findFirst({ where: { id } });
    }
    /** Admin-only REQUEST_CHANGES decision. Uses NEEDS_REVIEW (existing Prisma enum). */
    async requestChanges(id, reason, context, expectedUpdatedAt, expectedChecksum) {
        this.actor(context);
        if (!isNonEmptyString(reason))
            throw new Error('CHANGE_REQUEST_REASON_REQUIRED');
        const row = await this.prisma.weaponTierRank.findFirst({ where: { id } });
        if (!row)
            throw new Error('RANKING_NOT_FOUND');
        if (row.reviewStatus === 'APPROVED')
            throw new Error('APPROVED_RANKING_IMMUTABLE');
        this.verifyChecksum(row, expectedChecksum);
        const expectedDate = parseExpectedDate(expectedUpdatedAt) ?? new Date(row.updatedAt);
        const updated = await this.prisma.weaponTierRank.updateMany({
            where: { id, updatedAt: expectedDate, reviewStatus: row.reviewStatus },
            data: {
                reviewStatus: 'NEEDS_REVIEW',
                reviewedAt: new Date(),
                approvedBy: this.actor(context),
                rejectionReason: reason,
            },
        });
        if (updated.count !== 1)
            throw new Error('CONCURRENT_MODIFICATION');
        await this.audit('REQUEST_CHANGES', id, context, { reason, actor: this.actor(context) });
        return this.prisma.weaponTierRank.findFirst({ where: { id } });
    }
    /** The single legitimate path that sets publishRightsVerified, Admin-only and CAS-guarded. */
    async verifyRights(id, verified, note, context, expectedUpdatedAt) {
        this.actor(context);
        if (typeof verified !== 'boolean')
            throw new Error('RIGHTS_VERIFICATION_REQUIRED');
        if (verified && !isNonEmptyString(note))
            throw new Error('RIGHTS_NOTE_REQUIRED');
        const row = await this.prisma.weaponTierRank.findFirst({ where: { id } });
        if (!row)
            throw new Error('RANKING_NOT_FOUND');
        if (row.reviewStatus === 'APPROVED')
            throw new Error('APPROVED_RANKING_IMMUTABLE');
        const expectedDate = parseExpectedDate(expectedUpdatedAt) ?? new Date(row.updatedAt);
        const updated = await this.prisma.weaponTierRank.updateMany({
            where: { id, updatedAt: expectedDate },
            data: {
                publishRightsVerified: verified,
                rightsNote: note || null,
                reviewedAt: new Date(),
            },
        });
        if (updated.count !== 1)
            throw new Error('CONCURRENT_MODIFICATION');
        await this.audit('RIGHTS_VERIFIED', id, context, { verified, note, actor: this.actor(context) });
        return this.prisma.weaponTierRank.findFirst({ where: { id } });
    }
}
exports.WeaponTierRankingService = WeaponTierRankingService;
function createWeaponTierRankingService(prisma) {
    return new WeaponTierRankingService(prisma);
}
