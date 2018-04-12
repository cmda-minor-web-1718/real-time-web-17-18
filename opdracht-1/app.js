const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug')

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg)
  })
  socket.on('disconnect', function(){
    console.log('user disconnected')
  })
})

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
