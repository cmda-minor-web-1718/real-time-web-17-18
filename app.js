// modules laden (express als framework)
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup > templates weergeven
app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

//de routes defineren (zelfde structuur als mappen)
var indexRouter = require('./routes/index');
var detailRouter = require('./routes/detail');

// connect routers to routes, weblinkjes
app.use('/', indexRouter);
app.use('/', detailRouter);

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		console.log(msg)
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('App listening on port 3000!');
});
