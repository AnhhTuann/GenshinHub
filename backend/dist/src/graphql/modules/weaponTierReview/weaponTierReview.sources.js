"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.D2_SUFFIX = void 0;
exports.canonicalSha256 = canonicalSha256;
exports.buildD2Store = buildD2Store;
exports.trackedCandidateSha256 = trackedCandidateSha256;
exports.parseSourceVersion = parseSourceVersion;
const crypto = __importStar(require("node:crypto"));
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
const SHA256 = /^[a-f0-9]{64}$/;
exports.D2_SUFFIX = '::D2';
function stableStringify(value) {
    if (value === null || typeof value !== 'object')
        return JSON.stringify(value ?? null);
    if (Array.isArray(value))
        return `[${value.map(stableStringify).join(',')}]`;
    const obj = value;
    return `{${Object.keys(obj).sort().map(k => `${JSON.stringify(k)}:${stableStringify(obj[k])}`).join(',')}}`;
}
function canonicalSha256(value) {
    return crypto.createHash('sha256').update(stableStringify(value)).digest('hex');
}
function findRepoFile(relative) {
    const startPoints = [__dirname, process.cwd(), path.resolve(process.cwd(), 'backend')];
    for (const start of startPoints) {
        let dir = start;
        for (let i = 0; i < 10; i += 1) {
            const candidate = path.join(dir, relative);
            if (fs.existsSync(candidate))
                return candidate;
            const parent = path.dirname(dir);
            if (parent === dir)
                break;
            dir = parent;
        }
    }
    throw new Error(`REVIEW_SOURCE_NOT_FOUND:${relative}`);
}
function readJson(relative) {
    return JSON.parse(fs.readFileSync(findRepoFile(relative), 'utf8'));
}
/** Frozen B3.2 dossier, used as the lineage source for D2 revised records. */
function frozenDecisionSheet() {
    const manifest = readJson('docs/weapon-tier-independent/freeze-manifest.json');
    const sheet = readJson('docs/weapon-tier-independent/decision-sheet.json');
    if (!Array.isArray(manifest.records) || manifest.records.length !== 14)
        throw new Error('FROZEN_RECORD_COUNT_INVALID');
    if (!Array.isArray(sheet.records) || sheet.records.length !== 14)
        throw new Error('FROZEN_SHEET_COUNT_INVALID');
    const byId = new Map(sheet.records.map((r) => [r.candidateId, r]));
    const checksums = new Map(manifest.records.map((r) => [r.candidateId, r.sha256]));
    for (const record of sheet.records) {
        if (checksums.get(record.candidateId) !== record.recordSha256)
            throw new Error('FROZEN_LINEAGE_CHECKSUM_MISMATCH');
    }
    return { manifest, sheet, byId };
}
/**
 * Build the D2_REVISED store. Every checksum is recomputed from the artifact;
 * a hand-edited checksum or explanation fails closed.
 */
function buildD2Store() {
    const d2 = readJson('docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json');
    if (!Array.isArray(d2.records) || d2.records.length !== 14)
        throw new Error('D2_RECORD_COUNT_INVALID');
    if (!SHA256.test(String(d2.artifactSha256)))
        throw new Error('D2_ARTIFACT_CHECKSUM_INVALID');
    if (canonicalSha256(d2.records) !== d2.artifactSha256)
        throw new Error('D2_ARTIFACT_CHECKSUM_MISMATCH');
    const frozen = frozenDecisionSheet();
    const manifestById = new Map(frozen.manifest.records.map((r) => [r.candidateId, r.sha256]));
    const candidates = new Map();
    const groupOf = new Map();
    const previousByStableId = new Map();
    for (const record of d2.records) {
        const { newChecksum, ...rest } = record;
        if (!SHA256.test(String(newChecksum)) || canonicalSha256(rest) !== newChecksum) {
            throw new Error(`D2_RECORD_CHECKSUM_MISMATCH:${record.candidateId}`);
        }
        if (!SHA256.test(String(record.oldChecksum)) || manifestById.get(record.candidateId) !== record.oldChecksum) {
            throw new Error(`D2_LINEAGE_CHECKSUM_MISMATCH:${record.candidateId}`);
        }
        const base = frozen.byId.get(record.candidateId);
        if (!base)
            throw new Error(`D2_LINEAGE_RECORD_MISSING:${record.candidateId}`);
        const review = record.d2Review ?? {};
        const blockedFields = Array.isArray(review.blockedEvidence)
            ? review.blockedEvidence.map((entry) => String(entry?.field ?? '')).filter(Boolean)
            : [];
        const missing = Array.isArray(review.missingEvidence) ? review.missingEvidence.length : 0;
        const blockers = [
            ...(Array.isArray(review.missingEvidence) ? review.missingEvidence : []),
            ...(Array.isArray(review.blockedEvidence)
                ? review.blockedEvidence.map((entry) => String(entry?.label ?? entry?.field ?? '')) : []),
        ].filter(Boolean);
        const candidateId = `${record.candidateId}${exports.D2_SUFFIX}`;
        const needsEvidence = record.reviewStatus === 'NEEDS_MORE_EVIDENCE' ||
            record.reviewStatus === 'NEEDS_MORE_COMPARATIVE_EVIDENCE' || blockers.length > 0;
        groupOf.set(candidateId, needsEvidence ? 'B' : 'A');
        previousByStableId.set(record.candidateId, { candidateId: record.candidateId, recordSha256: record.oldChecksum });
        candidates.set(candidateId, {
            candidateId,
            stableCandidateId: record.candidateId,
            sourceVersion: 'D2_REVISED',
            previousCandidateId: record.candidateId,
            previousChecksum: record.oldChecksum,
            changeReason: record.changeReason ?? null,
            changedFields: Array.isArray(record.changedFields) ? record.changedFields : [],
            revisionStatus: record.reviewStatus,
            weaponId: String(record.weaponId ?? base.weaponId),
            weaponName: base.weaponName,
            weaponType: base.weaponType,
            dbWeaponType: base.dbWeaponType,
            role: record.role ?? base.role,
            refinement: record.refinement ?? base.refinement,
            refinementLevel: base.refinementLevel ?? null,
            oldTier: record.oldTier ?? base.oldTier ?? null,
            proposedTier: record.proposedTier ?? base.proposedTier,
            tierChanged: record.tierChanged === true,
            tierJustification: base.tierJustification ?? null,
            explanationVi: record.explanationVi ?? base.explanationVi,
            exactGameplayAssumptions: Array.isArray(record.gameplayAssumptions)
                ? record.gameplayAssumptions : (base.exactGameplayAssumptions ?? []),
            exactFacts: Array.isArray(base.exactFacts) ? base.exactFacts : [],
            evidence: {
                ...(base.evidence ?? {}),
                d2Evidence: record.evidence,
                d2Review: review,
                changedFields: record.changedFields ?? [],
            },
            confidence: record.confidence ?? base.confidence,
            gameVersion: base.gameVersionStatus === 'VERIFIED' && base.versionKey === base.gameVersion ? base.gameVersion : undefined,
            rubricVersion: base.rubricVersion,
            sourceName: base.sourceName,
            sourceLocale: base.sourceLocale,
            independent: record.rightsStatus?.sourceDerivedResearchUsedAsRanking === false &&
                base.rightsStatus?.independentTier === true,
            rightsStatus: record.rightsStatus ?? base.rightsStatus,
            recordSha256: newChecksum,
            reviewStatus: record.reviewStatus,
            requiredSupplementFields: blockedFields,
            requiredResolvedCount: missing,
            evidenceBlockers: blockers,
        });
    }
    return {
        sourceVersion: 'D2_REVISED',
        batchSha256: d2.artifactSha256,
        candidates,
        groupOf,
        previousByStableId,
    };
}
/** Checksums that belong to a tracked B3.2 or D2 candidate. */
function trackedCandidateSha256() {
    const map = new Map();
    const frozen = readJson('docs/weapon-tier-independent/freeze-manifest.json');
    for (const record of frozen.records ?? []) {
        if (SHA256.test(String(record.sha256))) {
            map.set(record.sha256, { candidateId: record.candidateId, sourceVersion: 'FROZEN' });
        }
    }
    const d2 = readJson('docs/tierlist/phase-d2/WEAPON_REVISED_DRAFT.json');
    for (const record of d2.records ?? []) {
        if (SHA256.test(String(record.newChecksum))) {
            map.set(record.newChecksum, { candidateId: `${record.candidateId}${exports.D2_SUFFIX}`, sourceVersion: 'D2_REVISED' });
        }
    }
    return map;
}
function parseSourceVersion(value) {
    if (value === undefined || value === null || value === '' || value === 'FROZEN')
        return 'FROZEN';
    if (value === 'D2_REVISED')
        return value;
    throw new Error('INVALID_SOURCE_VERSION');
}
