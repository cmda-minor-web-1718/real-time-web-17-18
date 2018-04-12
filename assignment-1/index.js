const app = require('express')();
const bodyParser = require('body-parser');

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

// Routes
app.get('/', (req, res) => {
  res.render('index', { searches });
});

// Start the server
app.listen(3000, () => {
  console.log('app is running on localhost:3000');
});
