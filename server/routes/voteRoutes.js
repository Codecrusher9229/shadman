const express = require("express");
const FutureParticipant = require("../models/futureParticipantModel");
const { castVote } = require("../controllers/voteController");
const router = express.Router();

// ✅ Middleware to validate participant ID
const validateParticipant = async (req, res, next) => {
    try {
        const participant = await FutureParticipant.findById(req.params.id);
        if (!participant) {
            return res.status(404).json({ message: "⚠️ Participant not found" });
        }
        req.participant = participant; // Attach participant to request
        next();
    } catch (error) {
        console.error("❌ Error validating participant:", error);
        res.status(500).json({ message: "⚠️ Server error" });
    }
};

// ✅ POST: Cast a Vote
router.post("/:id", validateParticipant, async (req, res) => {
    try {
        const participant = req.participant;

        // ✅ Increment votes using findByIdAndUpdate
        const updatedParticipant = await FutureParticipant.findByIdAndUpdate(
            participant._id,
            { $inc: { votes: 1 } },  // ✅ Increment vote by 1
            { new: true } // ✅ Return updated document
        );

        res.status(200).json({ 
            message: "✅ Vote registered!", 
            votes: updatedParticipant.votes 
        });
    } catch (error) {
        console.error("❌ Error voting:", error);
        res.status(500).json({ message: "⚠️ Server error" });
    }
});
router.post("/:participantId", castVote); 
// ✅ GET: Fetch All Participants
router.get("/participants", async (req, res) => {
    try {
        const participants = await FutureParticipant.find();
        res.status(200).json(participants);
    } catch (error) {
        console.error("❌ Error fetching participants:", error);
        res.status(500).json({ message: "⚠️ Server error" });
    }
});

// ✅ GET: Leaderboard (Sorted by Votes)
router.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await FutureParticipant.find().sort({ votes: -1 }).limit(10);
        res.status(200).json(leaderboard);
    } catch (error) {
        console.error("❌ Error fetching leaderboard:", error);
        res.status(500).json({ message: "⚠️ Server error" });
    }
});

module.exports = router;
