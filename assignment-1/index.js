const app = require('express')();

app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Start the server
app.listen(3000, () => {
  console.log('app is running on localhost:3000');
});

// https://scotch.io/tutorials/use-ejs-to-template-your-node-application
