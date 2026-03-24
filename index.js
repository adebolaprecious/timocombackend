const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express();

// View engine
app.set("view engine", 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50Mb" }));
app.use(cors());

// Database connection function
const connectDB = require("./database/connectDB");

// Routes - Make sure these files exist with correct case
const UserRouter = require('./routers/user.routes');
const PostRouter = require('./routers/post.routes');
const ProfileRouter = require('./routers/profile.routes');

// Use routes
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/posts', PostRouter);
app.use('/api/v1', ProfileRouter);

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

// Connect to database and export for Vercel
let isConnected = false;

const startServer = async (req, res) => {
    try {
        if (!isConnected) {
            await connectDB();
            isConnected = true;
            console.log("✅ Database connected successfully");
        }
        return app(req, res);
    } catch (error) {
        console.error("❌ Database connection error:", error);
        return res.status(500).json({ 
            message: "Database connection failed", 
            error: error.message 
        });
    }
};

// Export for Vercel (serverless)
module.exports = startServer;