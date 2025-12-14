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
  origin: [
    "http://localhost:3000",
    "https://taxi-dispatch-system.onrender.com",
    "https://*.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// Routes

// routes commented for testing
app.use("/api/auth", authRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/profile", profileRoutes);

app.get("/api/test", (req, res) => {
  res.send("server is running");
});

module.exports = app;
