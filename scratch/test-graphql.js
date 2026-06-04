const http = require('http');

const query = JSON.stringify({
  query: `
    query GetCharacterById($id: String!) {
      character(id: $id) {
        id
        bestArtifacts {
          setName
          iconUrl
        }
      }
    }
  `,
  variables: { id: "hu-tao" }
});

const req = http.request({
  hostname: 'localhost',
  port: 4000,
  path: '/graphql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': query.length
  }
}, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    console.log("GraphQL Response Status:", res.statusCode);
    console.log("GraphQL Response Body:", JSON.stringify(JSON.parse(data), null, 2));
  });
});

req.on('error', console.error);
req.write(query);
req.end();
