const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://joeejiasi:QiHsAd7SadFVRqrq@cluster0.qwz6mae.mongodb.net/book?retryWrites=true&w=majority"
        );
        console.log("✅ MongoDB connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;