fetch('https://genshinhub.onrender.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    query: `query GetAll { 
      weapons { id } 
      artifacts { id } 
      materials { id } 
      characters { id }
    }`
  })
})
  .then(res => res.json())
  .then(data => {
    if (data.errors) {
      console.error("Errors:", data.errors);
    } else {
      console.log("Success, data keys:", Object.keys(data.data));
    }
  })
  .catch(err => console.error(err));
