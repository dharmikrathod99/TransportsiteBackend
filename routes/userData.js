import express from "express";
import UserData from "../models/UserData.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const newUser = new UserData(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        console.error("SAVE ERROR:", err);
        res.status(500).json({ message: err.message });
    }
});

// READ ALL
router.get("/", async (req, res) => {
    const users = await UserData.find();
    res.json(users);
});

// UPDATE
router.put("/:id", async (req, res) => {
    const updatedUser = await UserData.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(updatedUser);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await UserData.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
});

export default router;
