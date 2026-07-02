import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.teamMember.deleteMany({
    where: { team: { characterId: 'diona' } }
  });
  await prisma.characterTeam.deleteMany({
    where: { characterId: 'diona' }
  });

  const teams = [
    {
      name: "Diona Melt Team #1",
      order: 1, rank: "1",
      description: "Hu Tao's damage is amplified by Melt. The Cryo resonance increases CRIT Rate by 15% against enemies affected by Cryo or Frozen.\n\nUse Hu Tao as the main DPS to trigger Melt reactions with Rosaria's Cryo application, while Xingqiu provides Vaporize and Freeze support. Diona provides shielding, healing, and Elemental Mastery boosts at C6 with Instructor set.\n\nTeam composition: Hu Tao (Pyro Main DPS), Xingqiu (Hydro Sub DPS), Rosaria (Cryo Sub DPS), Diona (Cryo Support)",
      members: [
        { characterId: "hu-tao", role: "Pyro Main DPS", roleDesc: "Main DPS whose Skill and Burst trigger Melt for amplified damage.", order: 1 },
        { characterId: "xingqiu", role: "Hydro Sub DPS", roleDesc: "His Burst applies Hydro continuously to enable Vaporize with Hu Tao and Freeze with Rosaria.", order: 2 },
        { characterId: "rosaria", role: "Cryo Sub DPS", roleDesc: "Her Burst applies Cryo for Melt and Freeze. Also grants nearby party members (excluding herself) 15% of her CRIT Rate as a buff for 10s after using Burst.", order: 3 },
        { characterId: "diona", role: "Cryo Support", roleDesc: "Provides shielding and healing. At C6, her Burst increases all party members' Elemental Mastery by 200. With 4-piece Instructor, triggering a reaction increases party Elemental Mastery by 120 for 8s.", order: 4 }
      ]
    },
    {
      name: "Diona Permafrost Team #1",
      order: 2, rank: "2",
      description: "Diona is a Support in the team. Ayaka's Cryo DMG reacts with Hydro attachment from Kokomi to trigger Freezing.\n\nAyaka's Cryo DMG reacts with Hydro from Kokomi to trigger Freezing, with Diona providing shield and Kazuha providing grouping and buffs.\n\nTeam composition: Kamisato Ayaka (Cryo Main DPS), Diona (Cryo Support), Kaedehara Kazuha (Anemo Support), Sangonomiya Kokomi (Hydro Support)",
      members: [
        { characterId: "kamisato-ayaka", role: "Cryo Main DPS", roleDesc: "Main DPS. Burst deals high Cryo DMG and enables Freezing.", order: 1 },
        { characterId: "diona", role: "Cryo Support", roleDesc: "Support. Shield provides safe environment and helps recharge Ayaka's Burst.", order: 2 },
        { characterId: "kaedehara-kazuha", role: "Anemo Support", roleDesc: "Support. Groups enemies, provides DMG buff and reduces enemy Resistance.", order: 3 },
        { characterId: "sangonomiya-kokomi", role: "Hydro Support", roleDesc: "Support/Healer. Skill triggers Hydro every 2s, enabling constant Freezing with Tenacity of the Millelith.", order: 4 }
      ]
    },
    {
      name: "Diona Permafrost",
      order: 3, rank: "3",
      description: "Ayaka's Cryo DMG reacts with Hydro attachment from Mona to trigger Freeze.\n\nAyaka's Cryo DMG reacts with Hydro from Mona to trigger Freezing, while Venti groups enemies and Diona provides shielding and healing.\n\nTeam composition: Kamisato Ayaka (Cryo Main DPS), Mona (Hydro Support), Diona (Cryo Support), Venti (Anemo Sub DPS)",
      members: [
        { characterId: "kamisato-ayaka", role: "Cryo Main DPS", roleDesc: "Ayaka's Elemental Burst deals high DMG and provides Cryo attachment for triggering Freeze.", order: 1 },
        { characterId: "mona", role: "Hydro Support", roleDesc: "Mona's Elemental Burst provides DMG increase and attaches Hydro to enemies with aid of Venti.", order: 2 },
        { characterId: "diona", role: "Cryo Support", roleDesc: "Diona's shield provides a safe environment and helps boost the recharge of Ayaka's Elemental Burst.", order: 3 },
        { characterId: "venti", role: "Anemo Sub DPS", roleDesc: "Venti's Elemental Burst groups enemies and applies crowd control, spreading Hydro from Mona.", order: 4 }
      ]
    },
    {
      name: "Diona Permafrost Team #3",
      order: 4, rank: "4",
      description: "A classic permafreeze team that locks enemies in Frozen while Ayaka deals massive Cryo damage.\n\nAyaka's Cryo damage reacts with Hydro from Mona to trigger Freezing, while Kazuha groups enemies and provides damage buffs, and Diona shields and heals.\n\nTeam composition: Kamisato Ayaka (Cryo Main DPS), Mona (Hydro Sub DPS), Diona (Cryo Support), Kaedehara Kazuha (Anemo Support)",
      members: [
        { characterId: "kamisato-ayaka", role: "Cryo Main DPS", roleDesc: "Ayaka's Burst deals high Cryo DMG and provides Cryo attachment for Freezing.", order: 1 },
        { characterId: "mona", role: "Hydro Sub DPS", roleDesc: "Mona's Burst provides DMG increase and she attaches Hydro to enemies with Kazuha's aid.", order: 2 },
        { characterId: "diona", role: "Cryo Support", roleDesc: "Diona's shield provides a safe environment and helps boost the recharge of Ayaka's Burst.", order: 3 },
        { characterId: "kaedehara-kazuha", role: "Anemo Support", roleDesc: "Kazuha groups enemies, applies crowd control, provides DMG buffs and reduces Elemental RES of enemies.", order: 4 }
      ]
    },
    {
      name: "Diona Melt Team #2",
      order: 5, rank: "5",
      description: "Diona is a Healer in the team. Klee's DMG is amplified by Melt.\n\nKlee's Pyro attacks trigger Melt with Ganyu's Cryo application from her Burst, while Kazuha groups enemies and buffs damage, and Diona shields and heals.\n\nTeam composition: Klee (Pyro Main DPS), Ganyu (Cryo Sub DPS), Kaedehara Kazuha (Anemo Support), Diona (Cryo Support)",
      members: [
        { characterId: "klee", role: "Pyro Main DPS", roleDesc: "Klee is the main DPS, her DMG is amplified by Melt in this team.", order: 1 },
        { characterId: "ganyu", role: "Cryo Sub DPS", roleDesc: "Ganyu deals DMG mainly by Elemental Burst at backstage. Ganyu Cryo attachment reacts with Pyro attachment from Klee to trigger Melt.", order: 2 },
        { characterId: "kaedehara-kazuha", role: "Anemo Support", roleDesc: "Kazuha can assist the team by grouping enemies together, applying crowd control, provide DMG buff to teammates and reduce Elemental Resistance of enemies.", order: 3 },
        { characterId: "diona", role: "Cryo Support", roleDesc: "Diona's shield provides safe environment for team members, and helps boost the recharge of Ganyu's Elemental Burst.", order: 4 }
      ]
    },
    {
      name: "Diona Melt Team #3",
      order: 6, rank: "6",
      description: "Diona is a Healer in the team. Diluc's DMG is amplified by Melt.\n\nDiluc's Melt reactions are enabled by Ayaka's Cryo application, while Venti groups enemies and spreads Cryo, and Diona provides shield and healing.\n\nTeam composition: Diluc (Pyro Main DPS), Kamisato Ayaka (Cryo Sub DPS), Venti (Anemo Sub DPS), Diona (Cryo Support)",
      members: [
        { characterId: "diluc", role: "Pyro Main DPS", roleDesc: "Diluc is the main DPS, his DMG is amplified by the Melt in this team.", order: 1 },
        { characterId: "kamisato-ayaka", role: "Cryo Sub DPS", roleDesc: "Ayaka deals DMG mainly by Elemental Burst at backstage. Ayaka's Cryo attachment reacts with Pyro attachment from Diluc to trigger Melt.", order: 2 },
        { characterId: "venti", role: "Anemo Sub DPS", roleDesc: "Venti's Elemental Burst can group enemies together and apply crowd control, and he can help spread Cryo attachment from Ayaka to enemies nearby.", order: 3 },
        { characterId: "diona", role: "Cryo Support", roleDesc: "Diona's shield provides safe environment for team members, and help boost the recharge of Ayaka's Elemental Burst.", order: 4 }
      ]
    }
  ];

  for (const t of teams) {
    await prisma.characterTeam.create({
      data: {
        characterId: 'diona',
        name: t.name,
        order: t.order,
        rank: t.rank,
        description: t.description,
        members: {
          create: t.members
        }
      }
    });
    console.log("Added team:", t.name);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
