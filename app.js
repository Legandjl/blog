const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const blogRouter = require("./routes/blog");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const passport = require("passport");
require("./passport");

const app = express();

require("dotenv").config();

//Set up mongoose connection
const mongoose = require("mongoose");

const mongoDB = process.env.DB || process.env.MONGODB_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/blog", blogRouter);

app.use(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  adminRouter
);

app.use("/auth", authRouter);

module.exports = app;
