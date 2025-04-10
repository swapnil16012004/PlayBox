const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {
  Marvel,
  History,
  PopularMovie,
  Comedy,
  Kid,
} = require("../../models/ListingModel");
const multer = require("multer");
const { storage } = require("../../cloudConfig.js");
const upload = multer({ storage });
const { isLoggedIn } = require("../../middleware.js");

const models = {
  marvel: Marvel,
  history: History,
  popularMovie: PopularMovie,
  comedy: Comedy,
  kid: Kid,
};

// Fetch all listings for the home page
router.get("/", async (req, res) => {
  try {
    const marvelListings = await Marvel.find({});
    const historyListings = await History.find({});
    const popularMovieListings = await PopularMovie.find({});
    const comedyListings = await Comedy.find({});
    const kidListings = await Kid.find({});
    res.json({
      success: true,
      listings: {
        marvelListings,
        historyListings,
        popularMovieListings,
        comedyListings,
        kidListings,
      },
    });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Search listings
router.get("/search", async (req, res) => {
  const { key } = req.query;
  try {
    const searchResults = {
      marvelListings: await Marvel.find({}),
      historyListings: await History.find({}),
      popularMovieListings: await PopularMovie.find({}),
      comedyListings: await Comedy.find({}),
      kidListings: await Kid.find({}),
    };
    res.json({ success: true, searchResults, key });
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/new/:show", isLoggedIn, async (req, res) => {
  const { show } = req.params;
  if (!models[show]) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category" });
  }
});

// Add a new listing
router.post(
  "/:category",
  isLoggedIn,
  upload.fields([
    { name: "listing[image]", maxCount: 1 },
    { name: "listing[imgBanner]", maxCount: 1 },
    { name: "listing[logo]", maxCount: 1 },
  ]),
  async (req, res) => {
    const { category } = req.params;
    const Model = models[category];
    if (!Model) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category" });
    }

    try {
      const image = req.files["listing[image]"]?.[0]?.path;
      const imgBanner = req.files["listing[imgBanner]"]?.[0]?.path;
      const logo = req.files["listing[logo]"]?.[0]?.path;

      const newListing = new Model({
        ...req.body.listing,
        image,
        imgBanner,
        logo,
      });
      await newListing.save();
      res.json({ success: true, message: "New show added successfully!" });
    } catch (err) {
      console.error(`Error adding ${category} listing:`, err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
);

// Fetch listings by category
router.get("/:category", async (req, res) => {
  const { category } = req.params;
  const Model = models[category];

  if (!Model) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category" });
  }

  try {
    const listings = await Model.find({});
    res.json({ success: true, listings, category });
  } catch (err) {
    console.error(`Error fetching ${category} listings:`, err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Fetch listing details by ID
router.get("/:category/:id", async (req, res) => {
  const { category, id } = req.params;
  const Model = models[category];

  if (!Model) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category" });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const listing = await Model.findById(id);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }
    res.json({ success: true, listing });
  } catch (err) {
    console.error(`Error fetching ${category} listing with id ${id}:`, err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Video playback route
router.get("/:category/:id/video", isLoggedIn, async (req, res) => {
  const { category, id } = req.params;
  const Model = models[category];

  if (!Model) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid category" });
  }

  try {
    const listing = await Model.findById(id);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }
    console.log("Fetched Listing:", listing);
    if (!listing.video) {
      return res.status(400).json({
        success: false,
        message: "Video URL not found for this listing",
      });
    }
    const video =
      typeof listing.video === "object" ? listing.video.url : listing.video;
    res.json({ success: true, listing: { ...listing.toObject(), video } });
  } catch (err) {
    console.error(
      `Error fetching video for ${category} listing with id ${id}:`,
      err
    );
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
