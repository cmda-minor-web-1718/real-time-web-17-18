const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const searches = [
  {
    title: 'Till it\'s over',
    artist: 'Anderson.Paak'
  },
  {
    title: 'Da Vinci',
    artist: 'Weezer'
  },
  {
    title: 'Stadaarnietzodoeiets',
    artist: 'Fokko'
  },
];

// https://scotch.io/tutorials/use-ejs-to-template-your-node-application
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', express.static('static'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { searches });
});

app.post('/', (req, res) => {
  searches.push(req.body);
  res.redirect('/');
});

// Socket connection
io.on('connection', (socket) => {
  
});

// Start the server
server.listen(3000, () => {
  console.log('app is running on localhost:3000');
});
