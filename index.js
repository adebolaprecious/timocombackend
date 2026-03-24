const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();
app.set("view engine", 'ejs');
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50Mb" }));
app.use(cors());
const connectDB = require("./database/connectDB");
// Routes
const UserRouter = require('./routers/user.routes');
const PostRouter = require('./routers/post.routes');
const ProfileRouter = require('./routers/profile.routes')

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/posts', PostRouter);
app.use('/api/v1', ProfileRouter);

// Database connection
// const DATABASE_URL = process.env.DATABASE_URI || process.env.MONGODB_URL;
// console.log("Attempting to connect to MongoDB...");

// mongoose.connect(DATABASE_URL)
//     .then(() => {
//         console.log("✅ Database connected successfully");
//     })
//     .catch((error) => {
//         console.log("❌ Failed to connect to DB");
//         console.log("Error details:", error.message);
//     });

// Server
const PORT = process.env.PORT || 5009;
app.listen(PORT, (err) => {
    if (err) {
        console.log("❌ Error starting server:", err);
    } else {
        console.log(`🚀 Server started successfully on port ${PORT}`);
    }
});

module.exports=async(req, res)=>{
  await connectDB()

  return app(req, res)
}