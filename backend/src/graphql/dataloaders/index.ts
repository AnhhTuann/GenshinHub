import { PrismaClient, CharacterWeapon, CharacterArtifact, CharacterTeam, TeamMember, CharacterBuild, WeaponTierRank, Weapon, ArtifactSet } from '@prisma/client';
import DataLoader from 'dataloader';

export interface MyLoaders {
  characterBuildsLoader: DataLoader<string, CharacterBuild[]>;
  buildWeaponsLoader: DataLoader<string, CharacterWeapon[]>;
  buildArtifactsLoader: DataLoader<string, CharacterArtifact[]>;
  buildTeamsLoader: DataLoader<string, CharacterTeam[]>;
  characterWeaponsLoader: DataLoader<string, CharacterWeapon[]>;
  characterArtifactsLoader: DataLoader<string, CharacterArtifact[]>;
  characterTeamsLoader: DataLoader<string, CharacterTeam[]>;
  teamMembersLoader: DataLoader<string, TeamMember[]>;
  weaponTierRanksLoader: DataLoader<string, WeaponTierRank[]>;
  // Per-row catalog lookups used by build fields. Batched to avoid one SQL
  // query per weapon/artifact on cold SSR requests.
  weaponByIdLoader: DataLoader<string, Weapon | null>;
  weaponByNameEnLoader: DataLoader<string, Weapon[]>;
  weaponByNameViLoader: DataLoader<string, Weapon[]>;
  artifactSetByNameLoader: DataLoader<string, ArtifactSet | null>;
}

export function createLoaders(prisma: PrismaClient): MyLoaders {
  const byKey = <T>(load: (keys: string[]) => Promise<T[]>, key: (row: T) => string | null) =>
    new DataLoader<string, T[]>(async keys => {
      const buckets = new Map<string, T[]>();
      for (const row of await load([...keys])) {
        const id = key(row);
        if (id === null) continue;
        const bucket = buckets.get(id) ?? [];
        bucket.push(row);
        buckets.set(id, bucket);
      }
      return keys.map(id => buckets.get(id) ?? []);
    });

  return {
    // MAINTENANCE is public but explicitly distinct from human APPROVED / legacy imports.
    characterBuildsLoader: byKey(keys => prisma.characterBuild.findMany({
      where: { characterId: { in: keys }, reviewStatus: { in: ['APPROVED', 'LEGACY_IMPORT', 'MAINTENANCE'] } },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'asc' }, { id: 'asc' }],
    }), row => row.characterId),
    buildWeaponsLoader: byKey(keys => prisma.characterWeapon.findMany({
      where: { buildId: { in: keys } }, orderBy: [{ rank: 'asc' }, { order: 'asc' }, { id: 'asc' }],
    }), row => row.buildId),
    buildArtifactsLoader: byKey(keys => prisma.characterArtifact.findMany({
      where: { buildId: { in: keys } }, orderBy: [{ order: 'asc' }, { id: 'asc' }],
    }), row => row.buildId),
    buildTeamsLoader: byKey(keys => prisma.characterTeam.findMany({
      where: { buildId: { in: keys } }, orderBy: [{ order: 'asc' }, { id: 'asc' }],
    }), row => row.buildId),
    // DataLoader for fetching Best Weapons by Character ID
    characterWeaponsLoader: new DataLoader<string, CharacterWeapon[]>(async (characterIds) => {
      const weapons = await prisma.characterWeapon.findMany({
        where: { characterId: { in: [...characterIds] }, OR: [
          { buildId: null }, { buildId: { in: characterIds.map(id => `legacy-${id}`) } },
        ] },
        orderBy: { rank: 'asc' },
      });
      
      // Group by characterId
      const grouped = weapons.reduce((acc, curr) => {
        if (!acc[curr.characterId]) acc[curr.characterId] = [];
        acc[curr.characterId].push(curr);
        return acc;
      }, {} as Record<string, CharacterWeapon[]>);
      
      // Return array in the exact same order and length as characterIds
      return characterIds.map(id => grouped[id] || []);
    }),

    // DataLoader for fetching Best Artifacts by Character ID
    characterArtifactsLoader: new DataLoader<string, CharacterArtifact[]>(async (characterIds) => {
      const artifacts = await prisma.characterArtifact.findMany({
        where: { characterId: { in: [...characterIds] }, OR: [
          { buildId: null }, { buildId: { in: characterIds.map(id => `legacy-${id}`) } },
        ] },
        orderBy: { order: 'asc' },
      });
      
      const grouped = artifacts.reduce((acc, curr) => {
        if (!acc[curr.characterId]) acc[curr.characterId] = [];
        acc[curr.characterId].push(curr);
        return acc;
      }, {} as Record<string, CharacterArtifact[]>);
      
      return characterIds.map(id => grouped[id] || []);
    }),

    // DataLoader for fetching Teams by Character ID
    characterTeamsLoader: new DataLoader<string, CharacterTeam[]>(async (characterIds) => {
      const teams = await prisma.characterTeam.findMany({
        where: { characterId: { in: [...characterIds] }, OR: [
          { buildId: null }, { buildId: { in: characterIds.map(id => `legacy-${id}`) } },
        ] },
        orderBy: { order: 'asc' },
      });
      
      const grouped = teams.reduce((acc, curr) => {
        if (!acc[curr.characterId]) acc[curr.characterId] = [];
        acc[curr.characterId].push(curr);
        return acc;
      }, {} as Record<string, CharacterTeam[]>);
      
      return characterIds.map(id => grouped[id] || []);
    }),

    // DataLoader for fetching Team Members by Team ID
    teamMembersLoader: new DataLoader<string, TeamMember[]>(async (teamIds) => {
      const members = await prisma.teamMember.findMany({
        where: { teamId: { in: [...teamIds] } },
        orderBy: [{ order: 'asc' }, { id: 'asc' }],
      });
      
      const grouped = members.reduce((acc, curr) => {
        if (!acc[curr.teamId]) acc[curr.teamId] = [];
        acc[curr.teamId].push(curr);
        return acc;
      }, {} as Record<string, TeamMember[]>);
      
      return teamIds.map(id => grouped[id] || []);
    }),

    // Public weapon rankings only. Never loads drafts, source-derived research or disputed rows.
    weaponTierRanksLoader: byKey(keys => prisma.weaponTierRank.findMany({
      where: {
        weaponId: { in: [...keys] },
        derivation: 'INDEPENDENT',
        reviewStatus: 'APPROVED',
        publishRightsVerified: true,
        versionKey: '7.2',
      },
      orderBy: [{ versionKey: 'desc' }, { role: 'asc' }, { refinementContext: 'asc' }],
    }), row => row.weaponId),
    weaponByIdLoader: new DataLoader<string, Weapon | null>(async ids => {
      const rows = await prisma.weapon.findMany({ where: { id: { in: [...ids] } } });
      const byId = new Map(rows.map(row => [row.id, row]));
      return ids.map(id => byId.get(id) ?? null);
    }),
    weaponByNameEnLoader: byKey(keys => prisma.weapon.findMany({
      where: { nameEn: { in: [...keys] } },
    }), row => row.nameEn),
    weaponByNameViLoader: byKey(keys => prisma.weapon.findMany({
      where: { nameVi: { in: [...keys] } },
    }), row => row.nameVi),
    artifactSetByNameLoader: new DataLoader<string, ArtifactSet | null>(async names => {
      const rows = await prisma.artifactSet.findMany({ where: { nameEn: { in: [...names] } } });
      const byName = new Map<string, ArtifactSet>();
      for (const row of rows) if (!byName.has(row.nameEn)) byName.set(row.nameEn, row);
      return names.map(name => byName.get(name) ?? null);
    }),
  };
}
