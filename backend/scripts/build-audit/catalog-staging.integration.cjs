'use strict';

// This runner exercises only draft creation and staging. It has no approval or development-write path.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('@apollo/server');
const { typeDefs, resolvers } = require('../../src/graphql');
const { createLoaders } = require('../../src/graphql/dataloaders');

async function main() {
  const url = new URL(process.env.BUILD_AUDIT_TEST_DATABASE_URL);
  assert.ok(['localhost','127.0.0.1'].includes(url.hostname));
  assert.match(url.pathname,/^\/genshinhub_test_build_completion_[a-z0-9]+$/);
  const prisma = new PrismaClient({datasourceUrl:url.href});
  const server = new ApolloServer({typeDefs,resolvers});
  const inventory = JSON.parse(fs.readFileSync(process.env.BUILD_AUDIT_INVENTORY,'utf8'));
  const {builds} = require('../../../docs/character-builds/proposed-builds.json');
  const call = async (query, variables={}, admin=true) => {
    const response = await server.executeOperation({query,variables},{contextValue:{
      prisma, dataloaders:createLoaders(prisma), isAdmin:admin, user:{isAdmin:admin,id:admin?'catalog-staging-isolated-fixture':undefined},
      adminActor:admin?'catalog-staging-isolated-fixture':undefined,
    }});
    assert.equal(response.body.kind,'single');
    return response.body.singleResult;
  };
  const ok = response => {
    assert.equal(response.errors,undefined,JSON.stringify(response.errors));
    return response.data;
  };
  try {
    const [identity] = await prisma.$queryRaw`SELECT current_database() AS name`;
    assert.equal(identity.name,url.pathname.slice(1));
    assert.equal(await prisma.character.count(),0,'Fresh test database required');
    await prisma.character.createMany({data:inventory.characters.map(({builds,bestWeapons,bestArtifacts,teams,...row}) =>
      Object.fromEntries(Object.entries(row).filter(([field,value])=>value!==null || !['stats','ascensionMats','talentMats'].includes(field))))});
    await prisma.weapon.createMany({data:inventory.weapons});
    await prisma.artifactSet.createMany({data:inventory.artifacts});
    const original = inventory.characters.find(owner=>owner.id==='mitya').builds;
    assert.equal(original.length,2);
    for (const {bestWeapons,bestArtifacts,teams,audits,...profile} of original) {
      await prisma.characterBuild.create({data:profile});
      await prisma.characterWeapon.createMany({data:bestWeapons});
      await prisma.characterArtifact.createMany({data:bestArtifacts});
      for (const {members,...team} of teams) {
        await prisma.characterTeam.create({data:team});
        await prisma.teamMember.createMany({data:members});
      }
    }
    const before = await prisma.characterBuild.findMany({where:{characterId:'mitya'},orderBy:{id:'asc'}});
    const create = 'mutation($c:String!,$name:String!,$roles:[CharacterBuildPlaystyle!]!){createCharacterBuild(characterId:$c,name:$name,playstyles:$roles){id version reviewStatus isDefault}}';
    const stage = 'mutation($id:ID!,$c:String!,$v:Int!,$input:CharacterBuildInput!){updateCharacterBuild(id:$id,characterId:$c,expectedVersion:$v,input:$input){version reviewStatus isDefault}}';
    const first = builds[0];
    const noAuth = await call(create,{c:first.characterId,name:first.patch.name,roles:first.patch.playstyles},false);
    assert.match(noAuth.errors?.[0]?.message??'',/Admin access required/);
    for (const candidate of builds) {
      const c = candidate.characterId;
      const created = ok(await call(create,{c,name:candidate.patch.name,roles:candidate.patch.playstyles})).createCharacterBuild;
      assert.equal(created.reviewStatus,'DRAFT');
      const variables = { id:created.id,c,v:created.version,input:candidate.patch };
      const staged = ok(await call(stage,variables)).updateCharacterBuild;
      assert.equal(staged.reviewStatus,'PENDING_REVIEW');
      assert.equal(staged.isDefault,false);
      const audit = await prisma.characterBuildAudit.findFirstOrThrow({where:{buildId:created.id,action:'STAGED'}});
      assert.equal(audit.version,staged.version);
      if (candidate === first) {
        const stale = await call(stage,variables);
        assert.equal(stale.errors?.[0]?.extensions.code,'CONFLICT');
        const result = ok(await call('query($id:ID!){characterBuild(id:$id){id}}',{id:created.id},false));
        assert.equal(result.characterBuild,null);
        const archived = ok(await call('mutation($id:ID!,$c:String!,$v:Int!){archiveCharacterBuild(id:$id,characterId:$c,expectedVersion:$v){reviewStatus}}',
          {id:created.id,c,v:staged.version})).archiveCharacterBuild;
        assert.equal(archived.reviewStatus,'REJECTED');
      }
    }
    assert.deepEqual(await prisma.characterBuild.findMany({where:{characterId:'mitya'},orderBy:{id:'asc'}}),before);
    assert.equal(await prisma.characterBuild.count({where:{isDefault:true}}),1);
    assert.equal(await prisma.characterBuildAudit.count({where:{action:'STAGED'}}),builds.length);
    assert.equal(await prisma.characterBuildAudit.count({where:{action:'PUBLISHED'}}),0);
    const mitya = ok(await call('{character(id:"mitya"){id builds{id teams{members{characterId}}} defaultBuild{id} bestWeapons{weaponId}}}',{},false)).character;
    assert.equal(mitya.builds.length,2);
    assert.equal(mitya.defaultBuild.id,'legacy-mitya');
    assert.equal(mitya.bestWeapons.length,6);
    assert.ok(mitya.builds.every(build=>build.teams.every(team=>team.members.length===4)));
    console.log(JSON.stringify({database:identity.name, pendingStaged:builds.length, writesToDevelopment:0,
      approvalMutations:0, protectedMityaBuilds:mitya.builds.length}));
  } finally {
    await server.stop();
    await prisma.$disconnect();
  }
}
main().catch(error=>{console.error(error);process.exitCode=1;});
