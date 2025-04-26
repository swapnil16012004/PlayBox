if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/UserModel");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const listingRouter = require("./services/ListingRoutes");
const userRouter = require("./services/UserRoutes");

const MONGO_URL =
  process.env.ATLASDB_URL ||
  "mongodb+srv://pawarswapnil3305:KxaibqIkJvmISEFf@cluster0.ej4mfzo.mongodb.net/gostream?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    if (process.env.NODE_ENV !== "production") {
      console.log("Connected to MongoDB");
    } else {
      console.log("Server is running in production mode");
    }
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

// const allowedOrigins = [
//   "http://localhost:3000",
//   "http://localhost:8080",
//   process.env.FRONTEND_URL,
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Normalize the origin by removing trailing slashes
//       const normalizedOrigin = origin ? origin.replace(/\/$/, "") : origin;

//       console.log("Request Origin:", normalizedOrigin);
//       console.log("Allowed Origins:", allowedOrigins);

//       if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
//         callback(null, true);
//       } else {
//         console.error(`Blocked by CORS: ${normalizedOrigin}`);
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: "*", // Allow all origins temporarily
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  },
  store,
};

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});

app.use("/api/listings", listingRouter);
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.redirect("/api/listings");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
