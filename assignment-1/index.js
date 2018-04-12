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

// https://scotch.io/tutorials/use-ejs-to-template-your-node-application
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { searches });
});

app.post('/', (req, res) => {
  console.log(req.body);
  searches.push(req.body);
  res.redirect('/');
});

// Start the server
app.listen(3000, () => {
  console.log('app is running on localhost:3000');
});
