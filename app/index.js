const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

var path = require('path')
var router = express.Router()

express.static('global')
app.use(express.static(path.join(__dirname, '/static')))
// Configuring the nj path as /templates
nunjucks.configure('templates', {
    autoescape: true,
    express: app
})

var io = require('socket.io').listen(app.listen(3000, '0.0.0.0', () => console.log('running!')))

io.on('connection', function(socket){
    console.log('a user connected')
})

//For Tracking When User Connects:
io.sockets.on("connection",function(socket){
    //var socket is the socket for the client who has connected.
    })
 
app.get('/', function(request, response){
    response.render('chat.html')
})
// test
