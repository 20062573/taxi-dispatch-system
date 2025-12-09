const express = require("express");
const { getProfile, updateProfile, deleteProfile } = require("../controllers/profileController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// get user profile,update profile data,delete user account. ref :w3schools
router.get("/", verifyToken, getProfile);
router.put("/", verifyToken, updateProfile);
router.delete("/", verifyToken, deleteProfile);

module.exports = router;
