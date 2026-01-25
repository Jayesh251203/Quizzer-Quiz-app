const Quiz = require("../models/QuizModel");

exports.createQuiz = async (req, res) => {
  try {
    const { title, description, difficulty, questions } = req.body;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Title and questions are required" });
    }

    const quiz = new Quiz({ title, description, difficulty, questions });
    const saved = await quiz.save();

    res.status(201).json(saved);
  } catch (err) {
    console.error("createQuiz error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    console.error("getQuizzes error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    console.error("getQuizById error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
