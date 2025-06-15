const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/UserModel");
const { isLoggedIn } = require("../../middleware");

// Helper to create JWT
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = generateToken(newUser);
    res.status(201).json({
      message: `Dear ${username}, welcome to PlayBox!`,
      user: newUser,
      token,
    });
  } catch (e) {
    res.status(400).json({ message: "Signup failed", error: e.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request:", username, password); // ✅ Debug log

  try {
    const user = await User.findOne({ username });
    console.log("User from DB:", user); // ✅ Check if user is found

    if (!user)
      return res.status(400).json({ message: "Invalid username or password." });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch); // ✅ Confirm password match

    if (!isMatch)
      return res.status(400).json({ message: "Invalid username or password." });

    const token = generateToken(user);
    console.log("Token generated:", token); // ✅ Debug token

    res.status(200).json({
      message: `Welcome back to PlayBox, ${user.username}!`,
      user,
      token,
    });
  } catch (err) {
    console.error("Login failed:", err.message);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

// LOGOUT (client just removes token)
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out. Remove token on client." });
});

// CHECK LOGIN STATUS
router.get("/checkLoginStatusFlag", isLoggedIn, (req, res) => {
  if (req.user) {
    res.json({ isLoggedIn: true, user: req.user });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Add to Watchlist (protected)
router.post("/add", isLoggedIn, async (req, res) => {
  const { showId } = req.body;
  const user = req.user;

  if (!showId) {
    return res.status(400).json({ message: "Missing showId" });
  }

  try {
    const dbUser = await User.findById(user.id);
    if (!dbUser) return res.status(404).json({ message: "User not found" });

    if (!dbUser.watchlist.map(String).includes(showId)) {
      dbUser.watchlist.push(showId);
      await dbUser.save({ validateModifiedOnly: true });
    }

    res.status(200).json({
      message: "Show added to watchlist",
      watchlist: dbUser.watchlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding to watchlist", error });
  }
});

// Remove from Watchlist (protected)
router.post("/remove", isLoggedIn, async (req, res) => {
  const { showId } = req.body;
  const user = req.user;

  if (!showId) {
    return res.status(400).json({ message: "Missing showId" });
  }

  try {
    const dbUser = await User.findById(user.id);
    if (!dbUser) return res.status(404).json({ message: "User not found" });

    dbUser.watchlist = dbUser.watchlist.filter(
      (id) => id.toString() !== showId
    );
    await dbUser.save({ validateModifiedOnly: true });

    res.status(200).json({
      message: "Show removed from watchlist",
      watchlist: dbUser.watchlist,
    });
  } catch (error) {
    res.status(500).json({ message: "Error removing from watchlist", error });
  }
});

// Fetch Watchlist (protected)
router.get("/:userId", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    res.status(500).json({ message: "Error fetching watchlist", error });
  }
});

module.exports = router;
