const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/script.js', function(req, res) {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(__dirname + '/script.js');
});

app.get('/eric.jpg', function(req, res) {
    res.set('Content-Type', 'text/javascript');
    res.sendFile(__dirname + '/eric.jpg');
  });

app.get('/style.css', function(req, res) {
    res.set('Content-Type', 'text/css');
    res.sendFile(__dirname + '/style.css');
  });

app.use("/assets/", express.static(path.join(__dirname, "/assets")));
app.use("/Rooms/", express.static(path.join(__dirname, "/Rooms")));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("message", (message) => {io.to(socket.roomID).emit("message", '<span class="chatName" >' + socket.character + "</span> : " +  message);});
    socket.on("scoreup", (point) => {io.to(socket.roomID).emit("scoreup", point)});
    socket.on("roomJoin", (id) => {
      socket.roomID = id;
      socket.join(id);
    })
    socket.on("roomQuit", (id) => {
      socket.leave(id);
    })
    socket.on("roomChange", (idFrom, idTo) => {
      socket.leave(idFrom);
      socket.roomID = idTo;
      socket.join(idTo);
    })
    socket.on("moveCircle", (circle, x, y) => {socket.to(socket.roomID).emit("moveCircle", circle, x, y);
  })
    socket.on("characterChoice", (char) => { socket.character = char; console.log(socket.character); })
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});