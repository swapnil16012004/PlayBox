const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marvelSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  imgBanner: String,
  logo: String,
  description: String,
  video: String,
  category: {
    type: String,
    required: true,
  },
});

const historySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  imgBanner: String,
  logo: String,
  description: String,
  video: String,
  category: {
    type: String,
    required: true,
  },
});

const popularMovieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  imgBanner: String,
  logo: String,
  description: String,
  video: String,
  category: {
    type: String,
    required: true,
  },
});

const comedySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  imgBanner: String,
  logo: String,
  description: String,
  video: String,
  category: {
    type: String,
    required: true,
  },
});

const kidSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  imgBanner: String,
  logo: String,
  description: String,
  video: String,
  category: {
    type: String,
    required: true,
  },
});

const Marvel = mongoose.model("Marvel", marvelSchema);
const History = mongoose.model("History", historySchema);
const PopularMovie = mongoose.model("PopularMovie", popularMovieSchema);
const Comedy = mongoose.model("Comedy", comedySchema);
const Kid = mongoose.model("kid", kidSchema);
module.exports = { Marvel, History, PopularMovie, Comedy, Kid };
