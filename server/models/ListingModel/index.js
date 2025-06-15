const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseListingSchema = {
  title: { type: String, required: true },
  image: String,
  imgBanner: String,
  logo: String,
  description: String,
  video: String,
  category: { type: String, required: true },
};

const Marvel = mongoose.model("Marvel", new Schema(baseListingSchema));
const History = mongoose.model("History", new Schema(baseListingSchema));
const PopularMovie = mongoose.model(
  "PopularMovie",
  new Schema(baseListingSchema)
);
const Comedy = mongoose.model("Comedy", new Schema(baseListingSchema));
const Kid = mongoose.model("Kid", new Schema(baseListingSchema));

module.exports = { Marvel, History, PopularMovie, Comedy, Kid };
