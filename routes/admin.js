import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// Admin-only
router.get("/admin-data", auth, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin only" });
    }

    res.json({ secret: "This is admin-only data" });
});

export default router;
