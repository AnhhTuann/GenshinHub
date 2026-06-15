fetch('https://genshinhub.onrender.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ characters { id nameEn } }' })
})
  .then(res => res.json())
  .then(data => {
    console.log("Data length:", data.data ? data.data.characters.length : data.errors);
  })
  .catch(err => console.error(err));
