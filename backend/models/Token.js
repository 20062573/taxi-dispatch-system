// mongoose init (ref: w3schools)
const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, required: true }, // stored token string
    expiresAt: { type: Date, required: true },  // expiry time (used for cleanup)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", tokenSchema);
