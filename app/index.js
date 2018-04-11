const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

var path = require('path')
var router = express.Router()

let rooms = ['room1']
let users = {}

express.static('global')
app.use(express.static(path.join(__dirname, '/static')))
// Configuring the nj path as /templates
nunjucks.configure('templates', {
    autoescape: true,
    express: app
})
const server = app.listen(3000, '0.0.0.0', () => console.log('running!'))
const io = require('socket.io')(server)

function joinRoom(socket, user, room) {
    socket.join(room)
    if (!users[room]) {
        users[room] = []
    }
    socket.to(room).broadcast.emit('user joined', {
        user: user
    })
    users[room].push(user) 
    console.log(users[room])
}

function leaveRoom(socket, user, room){
    try {
        socket.to(room).broadcast.emit('user leaved', {
            user: user
        })

        users[room] = users[room].filter(user => user !== user)
        socket.leave(room)
    } catch(e){
        console.log(e)
    }
}

io.on('connection', function(socket){
 
    socket.user = "Anoniempje"
    socket.room = 'room1'

    joinRoom(socket, socket.user, socket.room)
  
    socket.on('disconnect', function () {
        leaveRoom(socket, socket.user, socket.room)
    });
  

    socket.on('new_message', function(data) {
        console.log(data)
        io.to(socket.room).emit('new_message', {
            message: data.message,
            user: socket.user
        })
    })


    socket.on('change room', function(data){
        socket.to(socket.room).broadcast.emit('user leaved', {
            user: socket.user
        })
        socket.leave(socket.room)
        socket.room = data.room
        joinRoom(socket, socket.user, socket.room)
    })

    // socket.on('change_username', (data) => {
    //     socket.username = data.username
    // })
})
 
app.get('/', function(request, response){
    response.render('createuser.html')
})
// test
