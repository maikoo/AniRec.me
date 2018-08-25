const mongoose = require('mongoose');
const db = mongoose.connect(
  'mongodb://localhost:27017/test',
  { useMongoClient: true }
);
const conn = mongoose.connection;
mongoose.Promise = global.Promise;

conn.on('error', function() {
  console.log('mongoose connection error');
});

conn.once('open', function() {
  console.log('mongoose connected successfully');
});

var animeSchema = mongoose.Schema({
  name: String,
  description: String,
  page_url: String,
  pic_url: String,
  genre: {
    primary: String,
    secondary: String,
  },
  score: Number,
  release: Date,
});

var movieSchema = mongoose.Schema({
  name: String,
  description: String,
  page_url: String,
  pic_url: String,
  genre: {
    primary: String,
    secondary: String,
  },
  score: Number,
  release: Date,
});

var Anime = mongoose.model('Anime', animeSchema);
var Movie = mongoose.model('Movie', movieSchema);

var selectAllMovies = function(callback) {
  Movie.find({}, function(err, movies) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, movies);
    }
  });
};

var selectAllAnime = function(callback) {
  Anime.find({}, function(err, animes) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, animes);
    }
  });
};

module.exports = {
  selectAllMovies,
  selectAllAnime,
};
