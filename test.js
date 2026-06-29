const query = `
  mutation {
    generateCharacterAI(nameEn: "Aloy") {
      id
      nameEn
    }
  }
`;

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'x-admin-key': 'your_admin_password_here'
  },
  body: JSON.stringify({ query })
})
.then(r => r.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(console.error);
