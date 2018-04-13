const express = require('express');
const nunjucks = require('nunjucks');


const app = express();

var path = require('path');
var router = express.Router();

var roomFunctions = require('./room/');
var userFunctions = require('./user/');
var chatFunctions = require('./chat/');

express.static('global');

app.use(express.static(path.join(__dirname, '/static')));
// Configuring the nj path as /templates
nunjucks.configure('templates', {
  autoescape: true,
  express: app
});

const server = app.listen(3000, '0.0.0.0', () => console.log('running! on localhost:3000 '));
const io = require('socket.io')(server);

app.get('/', function(request, response){
    response.render('chat.html');
  });

io.on('connection', function(socket){
   
  socket.on('disconnect', function () {
    try{
      leaveRoom(io, socket, socket.user, socket.room);
    } catch(e){}   // Todo: add proper error handeling
  });

  socket.on('typing', function(param) {
    if(param != false){
      let string = `${socket.user} is typing...`; 
      socket.to(socket.room).emit('typing', {message: string});
    } else {
        socket.to(socket.room).broadcast.emit('typing', false);
    }
  });

  socket.on('login temp user', function(data){
      userFunctions.configureTempUser(io, socket, data);
  });

  socket.on('new message', function(data) {
    censoredMessage = chatFunctions.censorProfanity(data, socket);
    io.to(socket.room).emit('new message', {
      message: censoredMessage,
      user: socket.user,
      user_color: socket.color 
    });
  });


  socket.on('change room', function(data){
    roomFunctions.leaveRoom(io, socket, socket.user, socket.room);
    socket.room = data.room;
    roomFunctions.joinRoom(io, socket, socket.user, socket.room);
  });
});
 


