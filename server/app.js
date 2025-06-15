if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");

const User = require("./models/UserModel");
const { isLoggedIn } = require("./middleware");
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

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:8080",
  process.env.FRONTEND_URL,
  "chrome-extension://amknoiejhlmhancpahfcfcfhllgkpbld",
];

app.use(
  cors({
    origin: (origin, callback) => {
      const normalizedOrigin = origin ? origin.replace(/\/$/, "") : origin;

      console.log("Request Origin:", normalizedOrigin);
      console.log("Allowed Origins:", allowedOrigins);

      if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
        callback(null, true);
      } else {
        console.error(`Blocked by CORS: ${normalizedOrigin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// ✅ Use middleware only on protected routes
app.use("/api/listings", listingRouter);

// ✅ Leave open routes unprotected
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.redirect("/api/listings");
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

// ✅ Error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).json({ message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
