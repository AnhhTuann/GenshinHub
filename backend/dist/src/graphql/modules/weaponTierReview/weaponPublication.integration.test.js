"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const node_crypto_1 = require("node:crypto");
const versionedReview_1 = require("../phaseD3/versionedReview");
const client_1 = require("@prisma/client");
const graphql_1 = require("graphql");
const schema_1 = require("@graphql-tools/schema");
const index_1 = require("../../index");
const weaponTierReview_sources_1 = require("./weaponTierReview.sources");
(0, node_test_1.test)('isolated PostgreSQL only publishes the exact revised decision with atomic audits', async () => {
    const url = new URL(process.env.WEAPON_PUBLICATION_TEST_DATABASE_URL ?? '');
    strict_1.default.match(url.hostname, /^(127\.0\.0\.1|localhost)$/);
    strict_1.default.match(url.pathname, /^\/genshinhub_test_weapon_publication_[a-z0-9]+$/);
    const prisma = new client_1.PrismaClient({ datasourceUrl: url.href });
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: index_1.typeDefs, resolvers: index_1.resolvers });
    const ctx = { prisma, isAdmin: true, adminActor: 'publication-fixture-operator' };
    const store = (0, weaponTierReview_sources_1.buildD2Store)();
    const call = (source, variableValues = {}, contextValue = ctx) => (0, graphql_1.graphql)({ schema, source, variableValues, contextValue });
    const binding = '$candidateId:String!, $batchSha256:String!, $recordSha256:String!, $expectedVersion:Int!';
    const args = 'candidateId:$candidateId,batchSha256:$batchSha256,recordSha256:$recordSha256,expectedVersion:$expectedVersion';
    const mutation = (field, extra, selection) => `mutation(${binding}) { ${field}(${args},sourceVersion:D2_REVISED${extra}) { ${selection} } }`;
    const publish = mutation('adminPublishWeaponTierReview', '', 'id tier sourceChecksum reviewStatus publishRightsVerified gameVersion');
    const rights = mutation('adminVerifyWeaponTierReviewRights', ',independentRanking:true,originalExplanation:true,noGenshinBuildsEditorialCopy:true,gameFactsAttributionCorrect:true,evidenceValid:true,note:"Isolated fixture rights"', 'version');
    const decide = (decision) => mutation('adminDecideWeaponTierReview', `,decision:${decision},reason:"Isolated fixture decision",evidenceAcknowledged:true`, 'version');
    const confirm = mutation('adminConfirmWeaponTierChange', ',confirmed:true', 'version');
    const bindingFor = (weaponId) => {
        const candidate = [...store.candidates.values()].find(item => item.weaponId === weaponId);
        return { candidateId: candidate.candidateId, batchSha256: store.batchSha256, recordSha256: candidate.recordSha256, expectedVersion: 0 };
    };
    const reject = (result, pattern) => strict_1.default.match(result.errors?.[0]?.message ?? '', pattern);
    const ok = (result) => {
        strict_1.default.equal(result.errors, undefined, JSON.stringify(result.errors));
        return Object.values(result.data)[0];
    };
    const apply = async (source, vars) => {
        vars.expectedVersion = ok(await call(source, vars)).version;
    };
    try {
        const [identity] = await prisma.$queryRaw `SELECT current_database() AS name`;
        strict_1.default.equal(identity.name, url.pathname.slice(1));
        for (const candidate of store.candidates.values()) {
            await prisma.weapon.create({ data: { id: candidate.weaponId, nameEn: candidate.weaponName,
                    nameVi: candidate.weaponName, type: candidate.dbWeaponType, rarity: 4,
                    baseAtk: 100, iconUrl: '' } });
        }
        const row = bindingFor('14302');
        reject(await call(publish, row, { prisma, isAdmin: false }), /Unauthorized/);
        reject(await call('mutation { approveWeaponTierRank(id:"legacy") { id } }'), /USE_AUTHORITATIVE/);
        reject(await call('mutation { verifyWeaponTierRights(id:"legacy",verified:true) { id } }'), /USE_AUTHORITATIVE/);
        reject(await call(publish.replace('D2_REVISED', 'FROZEN'), row), /FROZEN_REVIEW_READ_ONLY/);
        reject(await call(rights, { ...row, recordSha256: '0'.repeat(64) }), /RECORD_CHECKSUM_MISMATCH/);
        reject(await call(publish, row), /CONCURRENT_MODIFICATION/);
        reject(await call(decide('APPROVE'), row), /RIGHTS_NOT_VERIFIED/);
        strict_1.default.equal(await prisma.weaponTierReview.count(), 0);
        await apply(rights, row);
        reject(await call(decide('APPROVE'), row), /TIER_CHANGE_NOT_CONFIRMED/);
        await apply(confirm, row);
        await apply(decide('APPROVE'), row);
        reject(await call(publish, { ...row, expectedVersion: row.expectedVersion - 1 }), /CONCURRENT_MODIFICATION/);
        const failingTransaction = (work) => prisma.$transaction(tx => work({
            weaponTierReview: tx.weaponTierReview, weapon: tx.weapon, weaponTierRank: tx.weaponTierRank,
            weaponTierReviewAudit: tx.weaponTierReviewAudit,
            weaponTierAudit: { create: async () => { throw new Error('FIXTURE_AUDIT_FAILURE'); } },
        }));
        reject(await call(publish, row, { ...ctx, prisma: { $transaction: failingTransaction } }), /FIXTURE_AUDIT_FAILURE/);
        strict_1.default.equal(await prisma.weaponTierRank.count(), 0);
        strict_1.default.equal(await prisma.weaponTierAudit.count(), 0);
        strict_1.default.equal(await prisma.weaponTierReviewAudit.count({ where: { action: 'PUBLISHED' } }), 0);
        strict_1.default.equal((await prisma.weaponTierReview.findUniqueOrThrow({ where: { candidateId: row.candidateId } })).version, row.expectedVersion);
        const raced = await Promise.all([call(publish, row), call(publish, row)]);
        const [success] = raced.filter(result => !result.errors);
        strict_1.default.equal(raced.filter(result => !result.errors).length, 1);
        strict_1.default.equal(ok(success).tier, 'S');
        reject(raced.find(result => result.errors), /CONCURRENT_MODIFICATION|CANDIDATE_ALREADY_PUBLISHED/);
        strict_1.default.equal(await prisma.weaponTierRank.count(), 1);
        strict_1.default.equal(await prisma.weaponTierAudit.count({ where: { action: 'PUBLISHED' } }), 1);
        strict_1.default.equal(await prisma.weaponTierReviewAudit.count({ where: { action: 'PUBLISHED' } }), 1);
        const publicCtx = { prisma, isAdmin: false };
        strict_1.default.equal(ok(await call('{weaponTierRanks(versionKey:"7.2"){tier gameVersion publishRightsVerified}}', {}, publicCtx))[0].tier, 'S');
        strict_1.default.deepEqual(ok(await call('{weaponTierRanks(versionKey:"7.1"){id}}', {}, publicCtx)), []);
        for (const weaponId of ['12401', '13501', '14402']) {
            const blocked = bindingFor(weaponId);
            await apply(rights, blocked);
            reject(await call(decide('APPROVE'), blocked), /REVISION_EVIDENCE_INCOMPLETE|TIER_CHANGE_NOT_CONFIRMED/);
            reject(await call(publish, blocked), /CANDIDATE_NOT_IMPORT_ELIGIBLE/);
        }
        const rejected = bindingFor('15508');
        await apply(decide('REJECT'), rejected);
        reject(await call(publish, rejected), /CANDIDATE_NOT_IMPORT_ELIGIBLE/);
    }
    finally {
        await prisma.$disconnect();
    }
});
(0, node_test_1.test)('isolated Character review accepts the current D2 dossier and blocks Raiden C0', async () => {
    const url = new URL(process.env.WEAPON_PUBLICATION_TEST_DATABASE_URL ?? '');
    strict_1.default.match(url.hostname, /^(127\.0\.0\.1|localhost)$/);
    strict_1.default.match(url.pathname, /^\/genshinhub_test_weapon_publication_[a-z0-9]+$/);
    const prisma = new client_1.PrismaClient({ datasourceUrl: url.href });
    const previous = process.env.ADMIN_JWT_SECRET;
    process.env.ADMIN_JWT_SECRET = (0, node_crypto_1.randomBytes)(32).toString('hex');
    try {
        const [identity] = await prisma.$queryRaw `SELECT current_database() AS name`;
        strict_1.default.equal(identity.name, url.pathname.slice(1));
        const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: index_1.typeDefs, resolvers: index_1.resolvers });
        const contextValue = { prisma, isAdmin: true, adminActor: 'character-fixture-operator' };
        const run = (source, variableValues) => (0, graphql_1.graphql)({ schema, source, variableValues, contextValue });
        const fixtures = (0, versionedReview_1.buildVersionedReviewPreview)(true).records.filter(row => row.kind === 'CHARACTER' && (row.targetId === 'xiangling' && row.conditionValue === 'C6' ||
            row.targetId.includes('raiden') && row.conditionValue === 'C0'));
        strict_1.default.equal(fixtures.length, 2);
        for (const item of fixtures) {
            await prisma.character.create({ data: {
                    id: item.targetId, nameEn: item.targetName, nameVi: item.targetName,
                    titleEn: '', titleVi: '', rarity: 4, element: 'Pyro', weapon: 'Polearm', region: '',
                    avatarUrl: '', splashArtUrl: '', descriptionEn: '', descriptionVi: '', baseHp: 1, baseAtk: 1, baseDef: 1,
                } });
            const input = {
                characterId: item.targetId, role: item.role, constellation: item.conditionValue,
                tier: item.proposedTier, gameVersion: '7.2', derivation: 'INDEPENDENT',
                explanationVi: item.explanation, sourceName: 'D2 fixture', sourceUrl: 'https://example.invalid/d2',
                evidence: { ...item.evidence, recordSha256: item.currentChecksum },
            };
            const write = 'mutation($input:CharacterTierRankingInput!){upsertCharacterTierRanking(input:$input){id updatedAt}}';
            const verify = 'mutation($id:String!,$at:String!){verifyCharacterTierRights(id:$id,expectedUpdatedAt:$at,verified:true,note:"Fixture rights"){updatedAt}}';
            const expectVerified = item.targetId === 'xiangling';
            if (expectVerified) {
                const frozen = await run(write, { input: { ...input, evidence: { ...input.evidence, recordSha256: item.sourceChecksum } } });
                strict_1.default.equal(frozen.errors, undefined, JSON.stringify(frozen.errors));
                const stale = frozen.data.upsertCharacterTierRanking;
                const denied = await run(verify, { id: stale.id, at: stale.updatedAt });
                strict_1.default.match(denied.errors?.[0].message ?? '', /CHARACTER_DOSSIER_SUPERSEDED/);
            }
            const prepared = await run(write, { input });
            strict_1.default.equal(prepared.errors, undefined, JSON.stringify(prepared.errors));
            const draft = prepared.data.upsertCharacterTierRanking;
            const verified = await run(verify, { id: draft.id, at: draft.updatedAt });
            if (!expectVerified) {
                strict_1.default.match(verified.errors?.[0].message ?? '', /CHARACTER_DOSSIER_BLOCKED/);
                continue;
            }
            strict_1.default.equal(verified.errors, undefined, JSON.stringify(verified.errors));
            const date = verified.data.verifyCharacterTierRights.updatedAt;
            const approved = await run('mutation($id:String!,$at:String!,$hash:String!){approveCharacterTierRanking(id:$id,expectedUpdatedAt:$at,expectedChecksum:$hash){approvalStatus}}', { id: draft.id, at: date, hash: item.currentChecksum });
            strict_1.default.equal(approved.errors, undefined, JSON.stringify(approved.errors));
            strict_1.default.equal(approved.data.approveCharacterTierRanking.approvalStatus, 'APPROVED');
        }
    }
    finally {
        if (previous === undefined)
            delete process.env.ADMIN_JWT_SECRET;
        else
            process.env.ADMIN_JWT_SECRET = previous;
        await prisma.$disconnect();
    }
});
