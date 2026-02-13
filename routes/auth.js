import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

/* ======================
   REGISTER USER
====================== */
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase();

        // Check if user exists
        const userExists = await User.findOne({ email: normalizedEmail });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = new User({
            name,
            email: normalizedEmail,
            password: hashedPassword,
            role: "user" // default role
        });

        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully" });

    } catch (error) {
        console.error("Register Error:", error); // ✅ log full error
        res.status(500).json({ message: "Server error" });
    }
});


/* ======================
   LOGIN USER
====================== */
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Check user
        const user = await User.findOne({
            email: email.toLowerCase()
        });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 2️⃣ Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // 3️⃣ Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 4️⃣ Response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: `Bearer ${token}`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,   // 👈 IMPORTANT
            },
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
