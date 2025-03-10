// EDITED
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cron = require("node-cron"); // ✅ Schedule ke liye zaroori hai (Daily automatic tasks ke liye)

// ✅ Environment variables ko load karne ke liye
dotenv.config();

// ✅ Routes import kar rahe hain
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const registerRoutes = require("./routes/registerRoutes");
const futureRoutes = require("./routes/futureRoutes");
const voteRoutes = require("./routes/voteRoutes");

const app = express(); // ✅ Express app initialize kiya

// ✅ Middleware setup
app.use(cors()); // ✅ Cross-Origin Resource Sharing (CORS) allow kar raha hai
app.use(express.json()); // ✅ JSON data handle karne ke liye middleware

// ✅ Static files serve karne ke liye (uploads folder ko public bana raha hai)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes define kar rahe hain
app.use("/api", registerRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/future", futureRoutes);
app.use("/api", voteRoutes); 
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000; // ✅ Port define kar rahe hain, jo bhi environment me set hoga ya phir 5000

// ✅ Daily automatic cleanup ka ek function (Har raat 12 baje chalega)
cron.schedule("0 0 * * *", async () => {
    try {
        const today = new Date(); // ✅ Aaj ki date nikal rahe hain
        const expiredEvents = await Event.find({ date: { $lt: today } }); // ✅ Purane events find kar rahe hain

        if (expiredEvents.length > 0) {
            const expiredEventIds = expiredEvents.map(event => event._id); // ✅ Sab expired events ke IDs nikal rahe hain

            // ✅ In events ke participants delete karne ke liye
            await Participant.deleteMany({ event: { $in: expiredEventIds } });

            console.log(`🗑️ Deleted participants for ${expiredEvents.length} expired events.`);
        }
    } catch (error) {
        console.error("❌ Error cleaning expired participant data:", error);
    }
});

// ✅ MongoDB se connect kar rahe hain
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected"); // ✅ Connection successful message
        app.listen(PORT, () => console.log(`🚀 Server running on PORT ${PORT}`)); // ✅ Server start kar rahe hain
    })
    .catch(err => console.error("❌ Error: ", err)); // ✅ Agar error aaye to console me dikhao
