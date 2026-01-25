const express = require("express");
const router = express.Router();

const {
  generateQuiz,
  analyzeQuiz,
} = require("../controllers/aiQuizController");

router.post("/generate-quiz", generateQuiz);

router.post("/analyze", analyzeQuiz);

module.exports = router;
