// Ride + User models (ref: W3S Mongoose basics)
const Ride = require("../models/Ride");
const User = require("../models/User");

// Request a ride (simple create - ref: MDN CRUD)
const requestRide = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation } = req.body;
    const customerId = req.user.id;

    if (!pickupLocation || !dropoffLocation)
      return res.status(400).json({ message: "Pickup and drop-off required" });

    const ride = await Ride.create({
      customerId,
      pickupLocation,
      dropoffLocation,
      status: "requested",
    });

    res.status(201).json({ message: "Ride requested successfully", ride });
  } catch (error) {
    res.status(500).json({ message: "Ride request failed", error: error.message });
  }
};

// Accept ride (ref: StackOverflow answer about checking status before update)
const acceptRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });
    if (ride.status !== "requested")
      return res.status(400).json({ message: "Ride already taken" });
    ride.driverId = req.user.id;
    ride.status = "accepted";
    await ride.save();
    const driver = await User.findById(req.user.id);
    if (!driver) return res.status(404).json({ message: "Driver not found" });

    driver.totalEarnings = (driver.totalEarnings || 0) + 50; // simple earning logic
    await driver.save();

    res.status(200).json({
      message: "Ride accepted and earnings updated (+€50)",
      ride,
      totalEarnings: driver.totalEarnings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to accept ride",
      error: error.message,
    });
  }
};

// Decline ride (ref: MDN update example)
const declineRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    ride.status = "declined";
    await ride.save();

    res.status(200).json({ message: "Ride declined", ride });
  } catch (error) {
    res.status(500).json({ message: "Failed to decline ride", error: error.message });
  }
};

// Update ride status (simple update - ref: W3S findByIdAndUpdate)
const updateRideStatus = async (req, res) => {
  try {
    const rideId = req.params.id;
    const { status } = req.body;

    const ride = await Ride.findByIdAndUpdate(rideId, { status }, { new: true });
    if (!ride) return res.status(404).json({ message: "Ride not found" });

    res.status(200).json({ message: "Ride status updated", ride });
  } catch (error) {
    res.status(500).json({ message: "Failed to update ride", error: error.message });
  }
};

// User ride history (ref: StackOverflow examples on populate)
const getRideHistory = async (req, res) => {
  try {
    const rides = await Ride.find({ customerId: req.user.id })
      .populate("driverId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ride history", error: error.message });
  }
};

// Driver sees available rides (ref: MDN filtering queries)
const getAvailableRides = async (req, res) => {
  try {
    if (req.user.role !== "driver")
      return res.status(403).json({ message: "Forbidden" });

    const rides = await Ride.find({ status: "requested" }).sort({ createdAt: -1 });
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch rides", error: error.message });
  }
};

// Export all functions
module.exports = {
  requestRide,
  acceptRide,
  declineRide,
  updateRideStatus,
  getRideHistory,
  getAvailableRides,
};
