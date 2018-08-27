const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const movieKey = require('./movieKey');

const app = express();
app.use(bodyParser.json());

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/movies', function(req, res) {
  db.selectAll(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

// `https://api.themoviedb.org/3/movie/76341?api_key={api_key}`
