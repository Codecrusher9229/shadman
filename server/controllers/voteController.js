const Participant = require("../models/futureParticipantModel");

// ✅ Function to handle voting
const castVote = async (req, res) => {
    try {
        const { id } = req.params;
        const participant = await Participant.findById(id);

        if (!participant) {
            return res.status(404).json({ message: "Participant not found" });
        }

        participant.votes += 1; // ✅ Increment vote count
        await participant.save();

        res.json({ message: "Vote recorded successfully", votes: participant.votes });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { castVote };
