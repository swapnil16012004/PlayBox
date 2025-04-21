const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../../middleware.js");
const User = require("../../models/UserModel");

router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return res.status(500).json({ message: "Login failed", error: err });
      }
      res.status(201).json({
        message: `Dear ${username}, welcome to GoStream!`,
        user: registeredUser,
      });
    });
  } catch (e) {
    res.status(400).json({ message: "Signup failed", error: e.message });
  }
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: false,
  }),
  (req, res) => {
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, message: "Authentication failed" });
    }
    const { username } = req.body;
    console.log("Set-Cookie Header:", res.getHeaders()["set-cookie"]);
    res.status(200).json({
      message: `Welcome back to PlayBox, ${username}!`,
      success: true,
      user: req.user,
      redirectUrl: res.locals.redirectUrl || "/listings",
    });
  }
);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", success: false });
    }
    res.status(200).json({ success: true, message: "You are logged out!" });
  });
});

router.get("/checkLoginStatusFlag", (req, res) => {
  try {
    if (req.user) {
      res.json({ isLoggedIn: true, user: req.user });
    } else {
      res.json({ isLoggedIn: false });
    }
  } catch (err) {
    console.error("Error checking login status:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
});

// Add a show to the watchlist
router.post("/add", async (req, res) => {
  const { userId, showId } = req.body;

  if (!userId || !showId) {
    return res.status(400).json({ message: "Missing userId or showId" });
  }

  try {
    console.log("req.body", req.body);
    console.log("User ID:", userId);
    console.log("Show ID:", showId);

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.watchlist.map(String).includes(showId)) {
      user.watchlist.push(showId);
      await user.save({ validateModifiedOnly: true });
    }

    res
      .status(200)
      .json({ message: "Show added to watchlist", watchlist: user.watchlist });
  } catch (error) {
    console.error("Error in /add route:", error);
    res.status(500).json({ message: "Error adding to watchlist", error });
  }
});

// Remove a show from the watchlist
router.post("/remove", async (req, res) => {
  const { userId, showId } = req.body;

  if (!userId || !showId) {
    return res.status(400).json({ message: "Missing userId or showId" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.watchlist = user.watchlist.filter((id) => id.toString() !== showId);
    await user.save({ validateModifiedOnly: true });

    res.status(200).json({
      message: "Show removed from watchlist",
      watchlist: user.watchlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing from watchlist", error });
  }
});

// Fetch the user's watchlist
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: "Error fetching watchlist", error });
  }
});

module.exports = router;
