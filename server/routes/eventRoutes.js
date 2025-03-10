const express = require("express");
const multer = require("multer");
const path = require("path");
const Event = require("../models/eventModel");

const router = express.Router();

// ✅ Multer Setup for Image Uploads
const storage = multer.diskStorage({
    destination: "./uploads/", // Images saved in 'uploads' folder
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// ✅ Fetch All Events (GET /api/events)
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error("❌ Error fetching events:", error);
        res.status(500).json({ message: "Server error. Try again later.", error: error.message });
    }
});

// ✅ Add New Event (POST /api/events/add)
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (!req.body.title || !req.body.date || !req.body.description || !req.file) {
            return res.status(400).json({ message: "All fields are required, including an image." });
        }

        // ✅ Debugging Logs
        console.log("📩 Received Request Body:", req.body);
        console.log("📷 Received File:", req.file);

        const newEvent = new Event({
            title: req.body.title,
            date: new Date(req.body.date), // ✅ Ensure date is stored in correct format
            description: req.body.description,
            imageUrl: `/uploads/${req.file.filename}`
        });

        await newEvent.save();
        res.status(201).json({ message: "✅ Event added successfully!", event: newEvent });

    } catch (error) {
        console.error("❌ Error adding event:", error);
        res.status(500).json({ message: "Server error. Please try again later.", error: error.message });
    }
});

// ✅ Delete Event (DELETE /api/events/:id)
router.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: "⚠️ Event not found." });
        }
        res.json({ message: "✅ Event deleted successfully!" });
    } catch (error) {
        console.error("❌ Error deleting event:", error);
        res.status(500).json({ message: "Server error while deleting event.", error: error.message });
    }
});

module.exports = router;
