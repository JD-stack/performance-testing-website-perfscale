const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ❗ REQUIRE JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

/* ===================== USER SIGNUP ===================== */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "user" // 👈 default role
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

/* ===================== USER LOGIN ===================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("USER LOGIN EMAIL:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🚫 Block admins from user login
    if (user.role !== "user") {
      return res.status(403).json({
        message: "Please use admin login"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("USER PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});

/* ===================== ADMIN LOGIN ===================== */
router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("ADMIN LOGIN EMAIL:", email);

    const admin = await User.findOne({ email });
    console.log("ADMIN FOUND:", admin);

    if (!admin || admin.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("ADMIN PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = jwt.sign(
      { userId: admin._id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Admin login failed" });
  }
});

module.exports = router;





