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


app.get('/', function(request, response){
    response.render('index.html')
})

app.get('/lol', function(request, response){
    response.render('index.html')
})

app.listen(3000, '0.0.0.0', () => console.log('running!'))