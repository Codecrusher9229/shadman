const mongoose = require("mongoose");

const FutureParticipantSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    candidateImg: { type: String, required: true },
    category: { type: String, required: true },
    votes: { type: Number, default: 0 } // ✅ Ensure votes field exists
});

module.exports = mongoose.model("FutureParticipant", FutureParticipantSchema);
