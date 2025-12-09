const express = require("express");
const {
  requestRide,
  acceptRide,
  declineRide,
  getRideHistory,
  getAvailableRides,
} = require("../controllers/rideController");
const { verifyToken } = require("../middleware/authMiddleware"); //secures routes with jwt

const router = express.Router();

router.post("/request", verifyToken, requestRide); //create a new ride request
router.get("/available", verifyToken, getAvailableRides); //show all rides waiting for drivers
router.put("/accept/:id", verifyToken, acceptRide);//driver accepts a ride 
router.put("/decline/:id", verifyToken, declineRide);//driver rejects a ride  
router.get("/history", verifyToken, getRideHistory);//gets all rides

module.exports = router;
