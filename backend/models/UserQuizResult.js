const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
  userId: { type: String }, // keep flexible: later connect to real users
  answers: [{ type: Number }], // array of selected indexes (or -1 if not answered)
  score: { type: Number },
  takenAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("UserQuizResult", ResultSchema);
