const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const rideRoutes = require("./routes/rideRoutes");
const profileRoutes = require("./routes/profileRoutes");

const { PORT, MONGO_URI } = require("./config");

// Initialize Express app
const app = express();

app.use(express.json());
//app.use(cors());

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/profile", profileRoutes);


module.exports = app;
