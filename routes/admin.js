import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js"; // Make sure the path is correct

const router = express.Router();

// Admin-only secret route (keep if needed)
router.get("/admin-data", auth, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
    }

    res.json({ secret: "This is admin-only data" });
});

// ✅ NEW: Get all users (for admin dashboard)
router.get("/users", auth, async (req, res) => {
    try {
        // Only admin can access
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Admin only" });
        }

        const users = await User.find().sort({ createdAt: -1 }); 
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
