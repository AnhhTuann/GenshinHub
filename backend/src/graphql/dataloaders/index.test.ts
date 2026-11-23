import 'dotenv/config';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { PrismaClient } from '@prisma/client';
import { createLoaders } from './index';

test('teamMembersLoader preserves stored member order', async () => {
  const prisma = new PrismaClient();
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
    const loaders = createLoaders(prisma);
    const loaded = await loaders.teamMembersLoader.load(team.id);
    assert.deepEqual(
      loaded.map(member => member.characterId),
      team.members.map(member => member.characterId),
    );
  } finally {
    await prisma.$disconnect();
  }
});
