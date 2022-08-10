const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/script.js', function(req, res) {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(__dirname + '/script.js');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});