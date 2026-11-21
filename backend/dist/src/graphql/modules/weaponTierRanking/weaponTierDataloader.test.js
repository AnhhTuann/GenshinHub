"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const dataloaders_1 = require("../../dataloaders");
(0, node_test_1.test)('weapon tier DataLoader loads only public rankings and batches by weapon ID', async () => {
    const calls = [];
    const prisma = {
        weaponTierRank: {
            findMany: async (args) => {
                calls.push(args);
                return [
                    { id: 'r1', weaponId: '11401', tier: 'SS', reviewStatus: 'APPROVED' },
                    { id: 'r2', weaponId: '11512', tier: 'S', reviewStatus: 'APPROVED' },
                    { id: 'r3', weaponId: '11512', tier: 'S', reviewStatus: 'APPROVED' },
                ];
            },
        },
    };
    const loaders = (0, dataloaders_1.createLoaders)(prisma);
    const [a, b, c] = await Promise.all([
        loaders.weaponTierRanksLoader.load('11401'),
        loaders.weaponTierRanksLoader.load('11512'),
        loaders.weaponTierRanksLoader.load('11401'),
    ]);
    strict_1.default.equal(calls.length, 1, 'three loads must collapse to one batched query');
    strict_1.default.deepEqual(calls[0].where, {
        weaponId: { in: ['11401', '11512'] },
        derivation: 'INDEPENDENT',
        reviewStatus: 'APPROVED',
        publishRightsVerified: true,
        versionKey: '7.2',
    });
    strict_1.default.equal(a.length, 1);
    strict_1.default.equal(b.length, 2);
    strict_1.default.equal(a, c, 'cached key returns the identical array instance');
});
(0, node_test_1.test)('weapon tier DataLoader never exposes drafts; missing weapons return empty arrays', async () => {
    const queries = [];
    const prisma = {
        weaponTierRank: { findMany: async (args) => { queries.push(args); return []; } },
    };
    const loaders = (0, dataloaders_1.createLoaders)(prisma);
    strict_1.default.deepEqual(await loaders.weaponTierRanksLoader.load('not-ranked'), []);
    strict_1.default.deepEqual(queries[0].where.derivation, 'INDEPENDENT');
    strict_1.default.deepEqual(queries[0].where.reviewStatus, 'APPROVED');
    strict_1.default.equal(queries[0].where.publishRightsVerified, true);
});
