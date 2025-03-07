const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3001;

// Store data in a structured format with id, username, and email
let data = [
  { id: 1, username: 'initialuser', email: 'initial@example.com' }
];

// server added for data base
const server = http.createServer((req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // if (req.method === 'OPTIONS') {
  //   res.statusCode = 204;
  //   res.end();
  //   return;
  // }
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  // allowAllOrigins(req, res);
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from the backend!');
  } else if (path === '/api/data' && method === 'GET') {
    res.statusCode = 200;
    res.end(JSON.stringify(data));
  } else if (path === '/api/data/add' && method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const credentials = JSON.parse(body);
        const user = data.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password 
        );

        if (user) {
          res.statusCode = 200;
          res.end(JSON.stringify(user));
        } else {
          res.statusCode = 401;
          res.end(JSON.stringify({ message: 'invalid email or password' }));
        } 
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Invalid JSON data' }));
      }
    });
  } else if (path === '/api/data/add' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const newData = JSON.parse(body);
        if (newData.username && newData.email) {
          // Check if username and email are present
          const newId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
          newData.id = newId;
          data.push(newData);
          res.statusCode = 201;
          res.end(JSON.stringify(newData));
        }
        else{
          res.statusCode = 400;
          res.end(JSON.stringify({ message: 'username or email is missing' }));
        }
  
      } catch (error) {        
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Invalid JSON data' }));
      }
    });
  } else if (path.startsWith('/api/data/edit/') && method === 'PUT') {
    const id = parseInt(path.split('/').pop());
    const index = data.findIndex(item => item.id === id);
    if(index !== -1){
      let body = '';
      req.on('data', chunk => body+= chunk.toString());
      req.on('end', () => {
          const newData = JSON.parse(body);
          data[index] = {...data[index], ...newData}
          res.statusCode = 200;
          res.end(JSON.stringify(data[index]))
      })
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
 });

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});