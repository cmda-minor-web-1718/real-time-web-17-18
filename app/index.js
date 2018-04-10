const express = require('express')
const nunjucks = require('nunjucks')


const app = express()





var router = express.Router()

express.static('public')

// Configuring the nj path as /templates
nunjucks.configure('templates', {
    autoescape: true,
    express: app
})

var io = require('socket.io').listen(app.listen(3000, '0.0.0.0', () => console.log('running!')))

io.on('connection', function(socket){
    console.log('a user connectsded')
})

//For Tracking When User Connects:
io.sockets.on("connection",function(socket){
    //var socket is the socket for the client who has connected.
    })
 
app.get('/', function(request, response){
    response.render('index.html')
})

app.get('/lol', function(request, response){
    response.render('index.html')
})

