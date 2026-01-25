const { GoogleGenerativeAI } = require("@google/generative-ai");
const Quiz = require("../models/QuizModel");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch (err) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch (_) {}
    }
    return null;
  }
}

exports.generateQuiz = async (req, res) => {
  try {
    const { topic, difficulty = "medium", numQuestions = 5, saveToDB = false } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Create a quiz in STRICT JSON format.
Return ONLY JSON and nothing else.

{
  "title": "Quiz on ${topic}",
  "questions": [
    {
      "questionText": "question?",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0
    }
  ]
}

Topic: ${topic}
Difficulty: ${difficulty}
Number of Questions: ${numQuestions}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const parsed = tryParseJson(text);

    if (!parsed) {
      return res.status(500).json({
        message: "Parsing failed",
        raw: text,
      });
    }

    let savedQuiz = null;
    if (saveToDB) {
      savedQuiz = await Quiz.create(parsed);
    }

    res.json({ aiQuiz: parsed, savedQuiz });
  } catch (err) {
    console.error("AI GENERATE ERROR:", err);
    res.status(500).json({ message: err.message || "AI generation failed" });
  }
};

exports.analyzeQuiz = async (req, res) => {
  try {
    const { quiz, userAnswers } = req.body;

    if (!quiz || !userAnswers) {
      return res.status(400).json({ message: "quiz + userAnswers required" });
    }

    const summary = quiz.questions
      .map((q, i) => {
        const user = userAnswers[i];
        return `Q${i + 1}: ${q.questionText}
                Your Answer: ${q.options[user]}
                Correct Answer: ${q.options[q.correctIndex]}
                `;
      })
      .join("\n");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
Analyze the quiz attempt and return STRICT JSON:
{
 "score": "x/y",
 "strengths": [],
 "weaknesses": [],
 "quickNotes": [],
 "nextSteps": []
}

DATA:
${summary}
`;

    const response = await model.generateContent(prompt);
    const text = response.response.text().trim();
    const parsed = tryParseJson(text);

    if (!parsed) {
      return res.status(500).json({ message: "Failed to parse analysis", raw: text });
    }

    res.json({ analysis: parsed });
  } catch (err) {
    console.error("AI ANALYSIS ERROR:", err);
    res.status(500).json({ message: err.message || "AI analysis failed" });
  }
};
