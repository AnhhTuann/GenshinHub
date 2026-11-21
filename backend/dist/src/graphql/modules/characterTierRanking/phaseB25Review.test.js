"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const strict_1 = __importDefault(require("node:assert/strict"));
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_test_1 = require("node:test");
const client_1 = require("@prisma/client");
const draftPath = node_path_1.default.resolve(__dirname, '../../../../../docs/tierlist-v7.2-audit/PHASE_B2_RANKING_DRAFTS.json');
const batch = JSON.parse(node_fs_1.default.readFileSync(draftPath, 'utf8'));
const rankings = batch.rankings;
const allowed = new Set([
    'READY_FOR_ADMIN_REVIEW',
    'NEEDS_MORE_EVIDENCE',
    'RUBRIC_RECALIBRATION',
    'GAMEPLAY_ASSUMPTION_UNVERIFIED',
]);
function tier(score) {
    return score >= 86 ? 'SS' : score >= 76 ? 'S' : score >= 66 ? 'A' : score >= 56 ? 'B' : score >= 46 ? 'C' : 'D';
}
(0, node_test_1.test)('Phase B2.5 every ranking has a complete audit record', () => {
    strict_1.default.equal(rankings.length, 15);
    strict_1.default.ok(batch.method.b25Audit);
    for (const r of rankings) {
        const a = r.b25Review;
        strict_1.default.ok(a, `${r.characterId} missing b25Review`);
        strict_1.default.ok(allowed.has(a.category), `${r.characterId} invalid category ${a.category}`);
        strict_1.default.ok(typeof a.risks === 'string' && a.risks.length > 20);
        strict_1.default.ok(typeof a.recommendation === 'string' && a.recommendation.length > 20);
        strict_1.default.ok(a.sensitivity && typeof a.sensitivity.performanceOnly === 'number');
        strict_1.default.equal(a.sensitivity.performanceOnlyTier, tier(a.sensitivity.performanceOnly));
        // Audit must never mutate approval state or derivation.
        strict_1.default.equal(r.approvalStatus, 'PENDING_REVIEW');
        strict_1.default.equal(r.derivation, 'INDEPENDENT');
    }
});
(0, node_test_1.test)('Phase B2.5 performance-only sensitivity is arithmetically correct', () => {
    for (const r of rankings) {
        const s = r.evidence.rubricScores;
        // Drop the 20% evidence component and renormalise over the remaining 80%.
        const perf = +((0.30 * s.kit + 0.25 * s.flex + 0.15 * s.constellation + 0.10 * s.access) / 0.80).toFixed(1);
        strict_1.default.equal(r.b25Review.sensitivity.performanceOnly, perf, r.characterId);
        const flipped = tier(perf) !== r.proposedTier;
        if (flipped)
            strict_1.default.equal(r.b25Review.category, 'RUBRIC_RECALIBRATION', r.characterId);
    }
    const flipped = rankings.filter((r) => tier(r.b25Review.sensitivity.performanceOnly) !== r.proposedTier);
    strict_1.default.deepEqual(flipped.map((r) => `${r.characterId}|${r.role}|${r.constellation}`).sort(), [
        'bennett|SUPPORT|C0',
        'fischl|SUB_DPS|C0',
    ]);
});
(0, node_test_1.test)('Phase B2.5 energy costs match genshin-db talents attributes', () => {
    const expected = {
        bennett: 60, fischl: 60, xingqiu: 80, xiangling: 80,
        'kaedehara-kazuha': 60, furina: 60, neuvillette: 70,
        'raiden-shogun': 90, nahida: 50, zhongli: 40, yelan: 70, mitya: 60,
    };
    for (const r of rankings) {
        const cost = expected[r.characterId];
        strict_1.default.ok(r.evidence.primaryEvidence.some((p) => p.includes(`Energy Cost = ${cost}`)), `${r.characterId} missing energy evidence ${cost}`);
    }
    const byKey = (id, role) => rankings.find((r) => r.characterId === id && r.role === role);
    strict_1.default.match(byKey('nahida', 'SUPPORT').evidence.energyRequirements, /50/);
    strict_1.default.match(byKey('zhongli', 'SUPPORT').evidence.energyRequirements, /40/);
    strict_1.default.match(byKey('yelan', 'SUB_DPS').evidence.energyRequirements, /70/);
    strict_1.default.match(byKey('furina', 'SUB_DPS').evidence.energyRequirements, /60/);
    strict_1.default.match(byKey('furina', 'SUPPORT').evidence.energyRequirements, /60/);
});
(0, node_test_1.test)('Phase B2.5 corrected gameplay assumptions are explicit', () => {
    const kazuha = rankings.find((r) => r.characterId === 'kaedehara-kazuha');
    strict_1.default.ok(kazuha.evidence.primaryEvidence.some((p) => p.includes('Viridescent Venerer')));
    strict_1.default.ok(kazuha.teamAssumptions.some((a) => a.includes('Viridescent Venerer')));
    const neuv = rankings.find((r) => r.characterId === 'neuvillette');
    strict_1.default.ok(neuv.evidence.primaryEvidence.some((p) => p.includes('exist independently')));
    strict_1.default.ok(neuv.teamAssumptions.some((a) => a.includes('3 loai') && a.includes('KHAC NHAU')));
    const mitya = rankings.find((r) => r.characterId === 'mitya');
    strict_1.default.ok(mitya.evidence.primaryEvidence.some((p) => p.includes('Steady State')));
    strict_1.default.ok(mitya.evidence.primaryEvidence.some((p) => p.includes('14%')));
    strict_1.default.equal(mitya.b25Review.category, 'GAMEPLAY_ASSUMPTION_UNVERIFIED');
});
(0, node_test_1.test)('Phase B2.5 audit content is free of stray CJK characters', () => {
    const raw = node_fs_1.default.readFileSync(draftPath, 'utf8');
    strict_1.default.equal(/[\u4e00-\u9fff]/.test(raw), false);
});
(0, node_test_1.test)('Phase B2.5 still writes nothing to development database', async () => {
    const prisma = new client_1.PrismaClient();
    try {
        strict_1.default.equal(await prisma.characterTierRanking.count(), 0);
        strict_1.default.equal(await prisma.characterTierRanking.count({ where: { approvalStatus: 'APPROVED' } }), 0);
    }
    finally {
        await prisma.$disconnect();
    }
});
