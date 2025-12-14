const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const { JWT_SECRET } = require("../config.js"); 

const register = async (req, res) => {
  console.log("REGISTER HIT:", req.body);
  try {
    const { name, email, password, role, phone, vehicleDetails } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
     password: hashedPassword,
      role,
      phone,
      vehicleDetails: role === "driver" ? vehicleDetails : undefined,
    });

    await user.save();

    res.status(201).json({ message: "Registration successful", user });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

module.exports = { register, login };
