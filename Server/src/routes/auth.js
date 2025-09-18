import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // kontrollo nëse ekziston email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// LOGIN (nga më herët)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("👉 Login attempt:", email);

    const user = await User.findOne({ email });
    console.log("👉 Found user:", user);

    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    console.log("👉 Password in DB:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("👉 Password match:", isMatch);

    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    console.log("👉 JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
