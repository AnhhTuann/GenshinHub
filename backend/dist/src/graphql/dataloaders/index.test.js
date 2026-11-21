"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = require("node:test");
const client_1 = require("@prisma/client");
const index_1 = require("./index");
(0, node_test_1.test)('teamMembersLoader preserves stored member order', async () => {
    const prisma = new client_1.PrismaClient();
    try {
        const team = await prisma.characterTeam.findFirstOrThrow({
            where: { characterId: 'mitya', name: 'Mitya Stella-Conduct Team #2' },
            select: {
                id: true,
                members: {
                    orderBy: [{ order: 'asc' }, { id: 'asc' }],
                    select: { characterId: true },
                },
            },
        });
        const loaders = (0, index_1.createLoaders)(prisma);
        const loaded = await loaders.teamMembersLoader.load(team.id);
        strict_1.default.deepEqual(loaded.map(member => member.characterId), team.members.map(member => member.characterId));
    }
    finally {
        await prisma.$disconnect();
    }
});
