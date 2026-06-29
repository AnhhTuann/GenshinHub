const query = `query { character(id: "aloy") { element } }`;
fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
.then(r => r.json())
.then(data => console.log(JSON.stringify(data)))
.catch(console.error);
