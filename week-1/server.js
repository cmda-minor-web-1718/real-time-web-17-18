var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('static'))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', index)
  .get('/index.html', index)




function index(req, res) {
  // res.send('<h1>Hello world</h1>');

  res.render('index.ejs');
}

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


http.listen(3004, function() {
})
