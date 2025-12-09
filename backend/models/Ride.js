const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    //(ref: stackoverflow)
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    status: {
      type: String,
      enum: ["requested", "accepted", "declined", "completed"], // ride status (ai note: enum keeps it clean)
      default: "requested",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ride", rideSchema);
