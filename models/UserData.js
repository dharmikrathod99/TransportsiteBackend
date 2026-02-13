import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    gokm: {
        type: String,
        required: true
    },
    comekm: {
        type: String,
        required: true
    },
    totlekm: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    rent: {
        type: String,
        required: true
    },
}, { timestamps: true });

const UserData = mongoose.model("UserData", userSchema);

export default UserData;
