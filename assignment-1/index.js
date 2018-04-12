const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const playlist = [
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

// Accept application/x-www-form-urlencoded POSTs
app.use(bodyParser.urlencoded({ extended: false }));

// Server files in the static folder when `/static` is requested
app.use('/static', express.static('static'));

// Render the homepage
app.get('/', (req, res) => {
  res.render('index', { playlist });
});

// Add new song to playlist and redirect back home
app.post('/', (req, res) => {
  playlist.push(req.body);

  io.emit('updatelist', playlist);

  res.redirect('/');
});

// Socket connection
io.on('connection', (socket) => {
  socket.on('newSong', (newSong) => {
    playlist.push(newSong);
    io.emit('updatelist', playlist);
  });
});

// Start the server
server.listen(3000, () => {
  console.log('app is running on localhost:3000');
});
