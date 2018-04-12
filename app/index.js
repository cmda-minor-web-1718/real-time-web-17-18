const express = require('express');
const nunjucks = require('nunjucks');


const app = express();

var path = require('path');
var router = express.Router();

var unified = require('unified');
var english = require('retext-english');
var stringify = require('retext-stringify');
var profanities = require('retext-profanities');
var report = require('vfile-reporter');

let rooms = ['room1'];
let users = {};

unified = unified()
.use(english)
.use(profanities)
.use(stringify)


var test = unified.runSync(unified.parse('fuck this'));


express.static('global');
app.use(express.static(path.join(__dirname, '/static')));
// Configuring the nj path as /templates
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});
const server = app.listen(3000, '0.0.0.0', () => console.log('running!'));
const io = require('socket.io')(server);

function updateUserList(room) {
    console.log(users[room])
    io.to(room).emit('update userlist', {
        activeUsers : users[room]
    })
}



function joinRoom(socket, user, room) {
    socket.join(room)
    if (!users[room]) {
        users[room] = []
    };
    socket.emit('setup user client', {
        room: room
    })
    socket.to(room).broadcast.emit('user joined', {
        user: user, room:room 
    });
    users[room].push(user) 
    console.log(users)
    updateUserList(room)
    io.sockets.emit('update roomlist', {
        rooms : users
    })
};

function leaveRoom(socket, user, room){
    try {
        socket.leave(room)
        socket.to(room).broadcast.emit('user left', {
            user: user
        });

        users[room] = users[room].filter(u => u !== user)

        updateUserList(room)

    } catch(e){
        console.log(e)
    }
};

io.on('connection', function(socket){
   

  
    socket.on('disconnect', function () {
        try{
            leaveRoom(socket, socket.user, socket.room)
        }
        catch(e){

        }
    });

    socket.on('typing', function(param) {
        if(param != false){
            let string = `${socket.user} is typing...` 
            socket.to(socket.room).emit('typing', {message: string})
        }else {
            socket.to(socket.room).broadcast.emit('typing', false)
        }
        
    })

    socket.on('login temp user', function(data){
        socket.user = data.username;
        socket.color = '#'+Math.floor(Math.random()*16777215).toString(16);
        console.log(socket.color);
        socket.room = "General";
        joinRoom(socket, socket.user, socket.room);
    });
  

    socket.on('new message', function(data) {
        let cusswords = []
        let actualMessage = data.message
        console.log(data.message) 
        var bla = unified.process(data.message, function(err, message) {
            for(message of message.messages){
                console.log(message.profanitySeverity)
                if (message.profanitySeverity === 2){
                actualMessage = actualMessage.replace(String(message.actual), '*'.repeat(String(message.actual).length))
                cusswords.push(message.message)    
            }       
            }
        }) 
        console.log(cusswords)
        if (cusswords.length > 0) {
            socket.emit('profane message', {
                cusswords: cusswords,
                message: 'WATCH YOUR MOUTH YOUNG ONE',
            });
        }

        io.to(socket.room).emit('new message', {
          cusswords: [], 
          message: actualMessage,
          user: socket.user,
          user_color: socket.color 
        });
    });


    socket.on('change room', function(data){
      leaveRoom(socket, socket.user, socket.room);
      socket.room = data.room;
      joinRoom(socket, socket.user, socket.room);
    });
})
 
app.get('/', function(request, response){
  response.render('chat.html');
});

app.get('/chat', function(request, response){
  response.render('chat.html');
});

