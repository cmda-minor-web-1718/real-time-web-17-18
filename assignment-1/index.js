const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// app.engine('view engine','pug');

// current amount of users
var usernames = {};
var playlist = {};

server.listen(3000, () => {
  console.log('app is running on localhost:3000');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {

  socket.on('sendchat', function(data){
    console.log(data);
    socket.emit('updatechat', socket.username, data);
  });

  socket.on('adduser', function(username){
    socket.username = username;
    usernames[username] = username;
    socket.emit('updatechat', 'SERVER', 'you have connected')
    socket.broadcast.emit('updatechat', 'SERVER', username + 'have connected')
    io.sockets.emit('updateusers', usernames);
  })

  socket.on('chat message', function(msg){
    io.emit('chat message', socket.username + ': ' + msg);
  });

  socket.on('disconnect', function(disconnectmsg) {
    delete usernames[socket.username];
    io.sockets.emit('updateusers', usernames);
    socket.broadcast.emit('updatechat','SERVER',socket.username + " has disconnected");
  });
});


// maak een array om data te plaatsen.
