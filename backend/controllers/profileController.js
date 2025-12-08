// User model (ref: W3Schools mongoose basics)
const User = require("../models/User.js");

// Get profile (hide password - ref: StackOverflow tip)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
};

// Update profile (ref: W3Schools Mongoose update example)
const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates }, 
      { new: true } // return updated doc (common StackOverflow fix)
    ).select("-password");
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

// Delete profile (simple delete pattern - ref: MDN CRUD docs)
const deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete account", error: error.message });
  }
};

// Exporting functions
module.exports = { getProfile, updateProfile, deleteProfile };
