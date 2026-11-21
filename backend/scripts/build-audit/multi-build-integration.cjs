'use strict';
const assert = require('node:assert/strict');
const { ApolloServer } = require('@apollo/server');
const { PrismaClient } = require('@prisma/client');
const { typeDefs, resolvers } = require('../../src/graphql');
const { createLoaders } = require('../../src/graphql/dataloaders');
const { writeTarget } = require('./apply.cjs');

async function main() {
  const config = process.env.DATABASE_URL;
  const database = 'genshinhub_multibuild_test_b49';
  assert.equal(writeTarget(config, database).database, database);
  const prisma = new PrismaClient({ datasourceUrl: config });
  const server = new ApolloServer({ typeDefs, resolvers });
  try {
    const [identity] = await prisma.$queryRaw`SELECT current_database() AS database, pg_is_in_recovery() AS recovery`;
    assert.deepEqual(identity, { database, recovery: false });
    const expected = await prisma.characterBuild.findMany({
      where: { characterId: 'mitya', reviewStatus: { in: ['APPROVED', 'LEGACY_IMPORT'] } },
      orderBy: { isDefault: 'desc' },
    });
    assert.equal(expected.length, 2);
    const [support, mainBuild] = expected;
    assert.ok(support.isDefault);
    const call = async (query, variables, { admin = false, error } = {}) => {
      const result = await server.executeOperation({ query, variables: { characterId: "mitya", ...variables } }, {
        contextValue: { prisma, user: { isAdmin: admin }, isAdmin: admin, dataloaders: createLoaders(prisma) },
      });
      assert.equal(result.body.kind, 'single');
      const response = result.body.singleResult;
      if (error) return assert.match(response.errors?.[0]?.message ?? '', error);
      assert.ok(!response.errors, JSON.stringify(response.errors));
      return response.data;
    };
    const all = await call(`{ character(id:"mitya") {
      defaultBuild { id } bestWeapons { weaponId } talentPriority teams { id }
      builds { id bestWeapons { weaponId } bestArtifacts { pieces artifactSetId mixSets { artifactSetId } }
      teams { id reviewStatus members { characterId order } } talentPriority } }
    }`);
    const data = all.character;
    assert.equal(data.defaultBuild.id, support.id);
    assert.deepEqual(data.bestWeapons, data.builds[0].bestWeapons);
    assert.notDeepEqual(data.builds[0].bestWeapons, data.builds[1].bestWeapons);
    assert.notDeepEqual(data.builds[0].talentPriority, data.builds[1].talentPriority);
    assert.equal(data.builds[0].teams.filter(team => team.reviewStatus === 'EXPERIMENTAL').length, 1);
    assert.equal(data.builds[1].teams.length, 2);
    for (const build of data.builds) {
      for (const team of build.teams) assert.deepEqual(team.members.map(member => member.order), [0,1,2,3]);
    }
    process.env.CHARACTER_BUILD_READ_MODE = 'legacy';
    const legacy = await call('{ character(id:"mitya"){ builds{id} defaultBuild{id} bestWeapons{weaponId} } }');
    assert.deepEqual(legacy.character.builds, []);
    assert.equal(legacy.character.defaultBuild, null);
    assert.deepEqual(legacy.character.bestWeapons.map(w => w.weaponId), data.builds[0].bestWeapons.map(w => w.weaponId));
    delete process.env.CHARACTER_BUILD_READ_MODE;
    await call('{ adminCharacterBuilds(characterId:"mitya"){id} }', {}, { error: /Admin access required/ });
    await call('mutation { updateCharacterTalents(id:"mitya",talentPriority:["Normal Attack"]){id} }', {}, { admin: true, error: /Choose a build/ });
    await assert.rejects(prisma.characterWeapon.create({ data: {
      buildId: mainBuild.id, characterId: 'albedo', nameEn: 'probe', nameVi: 'probe', weaponId: '14525', rank: 1, isF2P: false,
    } }), error => error.code === 'P2003');
    await assert.rejects(prisma.characterBuild.update({ where: { id: mainBuild.id }, data: { isDefault: true } }),
      error => error.code === 'P2002');
    const create = await call(`mutation ($name:String!){
      createCharacterBuild(characterId:"mitya", name:$name,playstyles:[SUPPORT]) { id version reviewStatus }
    }`, { name: `Test draft ${Date.now()}` }, { admin: true });
    const draft = create.createCharacterBuild;
    assert.equal(draft.reviewStatus,'DRAFT');
    const stage = `mutation ($id:ID!,$characterId:String!,$v:Int!,$input:CharacterBuildInput!){
      updateCharacterBuild(id:$id,characterId:$characterId,expectedVersion:$v,input:$input){ id version reviewStatus }
    }`;
    const stageArgs={id:draft.id,characterId:"mitya",v:draft.version,input:{notesEn:'Isolated test only',sands:['Elemental Mastery']}};
    const updates = await Promise.all([1, 2].map(() => server.executeOperation(
      { query: stage, variables: stageArgs },
      { contextValue: { prisma, user: { isAdmin: true }, isAdmin: true, dataloaders: createLoaders(prisma) } },
    )));
    const results = updates.map(row => row.body.singleResult);
    assert.equal(results.filter(row => !row.errors).length, 1);
    assert.equal(results.filter(row => row.errors?.[0].extensions.code === 'CONFLICT').length, 1);
    const updated = results.find(row => !row.errors).data;
    await call(stage,stageArgs,{admin:true,error:/Build changed/});
    const hidden = await call('query ($id:ID!){characterBuild(id:$id){id}}',{id:draft.id});
    assert.equal(hidden.characterBuild,null);
    const review = `mutation ($id:ID!,$characterId:String!,$v:Int!,$d:CharacterBuildReviewDecision!){
      reviewCharacterBuild(id:$id,characterId:$characterId,expectedVersion:$v,decision:$d){ id version reviewStatus sands }
    }`;
    const published=await call(review,{id:draft.id,v:updated.updateCharacterBuild.version,d:'APPROVE'},{admin:true});
    assert.deepEqual(published.reviewCharacterBuild.sands,['Elemental Mastery']);
    const changed = await call(stage,{id:draft.id,v:published.reviewCharacterBuild.version,input:{sands:['ATK%']}},{admin:true});
    const preserved = await call('query ($id:ID!){characterBuild(id:$id){sands}}',{id:draft.id});
    assert.deepEqual(preserved.characterBuild.sands,['Elemental Mastery']);
    const rejected = await call(review,{id:draft.id,v:changed.updateCharacterBuild.version,d:'REJECT'},{admin:true});
    assert.deepEqual(rejected.reviewCharacterBuild.sands,['Elemental Mastery']);
    const choose = `mutation ($id:ID!,$characterId:String!,$v:Int!){setDefaultCharacterBuild(id:$id,characterId:$characterId,expectedVersion:$v){id version isDefault}}`;
    const chosen = await call(choose,{id:draft.id,v:rejected.reviewCharacterBuild.version},{admin:true});
    assert.equal((await call('{ character(id:"mitya"){ defaultBuild{id} sands } }')).character.defaultBuild.id,draft.id);
    const currentSupport = await prisma.characterBuild.findUniqueOrThrow({where:{id:support.id}});
    await call(choose,{id:support.id,v:currentSupport.version},{admin:true});
    await call('mutation ($id:ID!,$characterId:String!,$v:Int!){archiveCharacterBuild(id:$id,characterId:$characterId,expectedVersion:$v){id}}',
      {id:draft.id,v:chosen.setDefaultCharacterBuild.version+1},{admin:true});
    const history = await call('query ($id:ID!){characterBuildAudits(buildId:$id){action}}',{id:draft.id},{admin:true});
    assert.ok(history.characterBuildAudits.some(row=>row.action==='ARCHIVED'));
    const after=await prisma.characterBuild.findUniqueOrThrow({where:{id:mainBuild.id}});
    assert.deepEqual(after,mainBuild);
    const original = await prisma.characterBuild.findUniqueOrThrow({ where: { id: 'legacy-albedo' } });
    const baseline = await prisma.characterBuild.findUnique({ where: { id: 'baseline-albedo' } });
    const legacyWeapons = await prisma.characterWeapon.findMany({
      where: { buildId: baseline?.id ?? original.id }, orderBy: [{ rank:'asc' }, { id:'asc' }],
    });
    assert.ok(legacyWeapons.length);
    const canonical = await prisma.weapon.findFirstOrThrow({
      where: { nameEn: legacyWeapons[0].nameEn }, select: { id: true },
    });
    const editable = await call('query { character(id:"albedo"){bestWeapons{catalogWeaponId} } }');
    assert.equal(editable.character.bestWeapons[0].catalogWeaponId, canonical.id);
    const edited = await call(stage, { id: original.id, characterId:"albedo", v: original.version, input: {
      weapons: [{ weaponId: canonical.id, isF2P: legacyWeapons[0].isF2P }],
    } }, { admin: true });
    await call(review, { id: original.id, characterId:"albedo", v: edited.updateCharacterBuild.version, d: 'APPROVE' }, { admin: true });
    assert.equal(await prisma.characterWeapon.count({ where: { buildId: original.id } }), 1);
    const savedBaseline = await prisma.characterWeapon.findMany({
      where: { buildId: 'baseline-albedo' }, orderBy: [{ rank:'asc' }, { id:'asc' }],
    });
    assert.deepEqual(savedBaseline, legacyWeapons.map(row => ({ ...row, buildId: 'baseline-albedo' })));
    process.env.CHARACTER_BUILD_READ_MODE = 'legacy';
    const restored = await call('{ character(id:"albedo"){bestWeapons{id}} }');
    assert.deepEqual(restored.character.bestWeapons.map(row => row.id), legacyWeapons.map(row => row.id));
    delete process.env.CHARACTER_BUILD_READ_MODE;
    console.log('Restored DB: FK, unique default, ordered isolated GraphQL payloads, legacy reads, Admin stages/publishes/rejects/archives and stale-version guard verified.');
  } finally {
    await server.stop();
    await prisma.$disconnect();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
