// backend/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) throw new Error("No token provided");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) throw new Error("User not found");

        req.user = user; // attach user to request
        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default auth; // ✅ Default export
