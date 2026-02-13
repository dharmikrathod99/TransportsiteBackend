import "./config/config.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import userDataRoutes from './routes/userData.js'

const app = express();

app.use(cors({
    origin: "https://transportsite.vercel.app",
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/userdata", userDataRoutes);

app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("✅ MongoDB Connected");
        app.listen(PORT, () => {
            console.log(`🚀 Server running on ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
