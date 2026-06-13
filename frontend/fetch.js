fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ characters { id nameEn avatarUrl splashArtUrl } }' })
})
.then(r => r.json())
.then(d => {
  const m1 = d.data.characters.find(c => c.id === 'manekin');
  const m2 = d.data.characters.find(c => c.id === 'manekina');
  console.log(m1);
  console.log(m2);
})
.catch(console.error);
