const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const DATABASE_URL = process.env.DATABASE_URI || process.env.MONGODB_URL;
        
        if (!DATABASE_URL) {
            throw new Error("Database URL not provided in environment variables");
        }
        
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("✅ MongoDB connected successfully");
        return true;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        throw error;
    }
};

module.exports = connectDB;