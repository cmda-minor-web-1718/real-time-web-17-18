const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// app.engine('view engine','pug');


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function() {
    io.emit('chat message', "user disconnected");
  });
});


server.listen(3000, () => {
  console.log('app is running on localhost:3000');
});
