#!/usr/bin/env node

const { createServer } = require('http');
 
const port   = process.argv[2] || 8080;
const server = createServer();

server.on('request', (req, res) => {
  console.log(`request received`);

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({
    "date": (new Date()).toUTCString(),
    "queries": req.queries,
    "headers": req.headers
  })); // send response
  res.end();
});

server.listen(port, () => {
  console.log(`Server Listening at: ${server.address().address}:${server.address().port}`);
});
