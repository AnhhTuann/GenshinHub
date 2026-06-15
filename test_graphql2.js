fetch('https://genshinhub.onrender.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    query: `query GetCharacterById($id: String!) { character(id: $id) { id nameEn nameVi titleEn titleVi rarity element weapon region birthday avatarUrl splashArtUrl descriptionEn descriptionVi baseHp baseAtk baseDef fandomUrl talentPriority signatureWeapons { id nameEn nameVi iconUrl } teams { id name rank description members { id characterId role roleDesc weapons artifacts substats } } tier role recommendedC tierNoteEn tierNoteVi bestWeapons { id nameEn nameVi rank isF2P iconUrl subStat passiveDescEn passiveDescVi refinement rarity } bestArtifacts { id setNameEn setNameVi pieces sands goblet circlet subStatsPriority rarity iconUrl artifactSetId mixSets { nameEn nameVi iconUrl artifactSetId } } stats ascensionMats } }`,
    variables: { id: "arataki-itto" }
  })
})
  .then(res => res.json())
  .then(data => {
    if (data.errors) {
      console.error("GraphQL Errors:", JSON.stringify(data.errors, null, 2));
    } else {
      console.log("Success, data:", Object.keys(data.data));
    }
  })
  .catch(err => console.error(err));
