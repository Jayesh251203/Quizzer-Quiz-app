import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AIQuizPreview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { aiQuiz } = state;

  const [quiz, setQuiz] = useState(aiQuiz);

  const updateQuestion = (index, field, value) => {
    const updated = { ...quiz };
    updated.questions[index][field] = value;
    setQuiz(updated);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = { ...quiz };
    updated.questions[qIndex].options[optIndex] = value;
    setQuiz(updated);
  };

  const saveQuizToDB = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/quizzes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quiz),
      });

      if (res.ok) {
        alert("Quiz saved! 🎉");
        navigate("/quiz-selection");
      } else {
        alert("Failed to save quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Quiz Preview & Edit</h1>

      <input
        style={{ width: "100%", fontSize: 20, marginBottom: 20 }}
        value={quiz.title}
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />

      {quiz.questions.map((q, i) => (
        <div
          key={i}
          style={{
            border: "1px solid #ddd",
            padding: 15,
            marginBottom: 20,
            borderRadius: 8,
          }}
        >
          <input
            style={{ width: "100%", padding: 6, fontWeight: "bold" }}
            value={q.questionText}
            onChange={(e) => updateQuestion(i, "questionText", e.target.value)}
          />

          <div style={{ marginTop: 10 }}>
            {q.options.map((opt, idx) => (
              <div key={idx} style={{ marginBottom: 6 }}>
                <input
                  style={{
                    width: "80%",
                    padding: 6,
                    border:
                      q.correctIndex === idx
                        ? "2px solid green"
                        : "1px solid #aaa",
                  }}
                  value={opt}
                  onChange={(e) => updateOption(i, idx, e.target.value)}
                />

                <button
                  style={{
                    marginLeft: 8,
                    background:
                      q.correctIndex === idx ? "green" : "lightgray",
                    color: q.correctIndex === idx ? "white" : "black",
                    padding: "4px 8px",
                    borderRadius: 6,
                  }}
                  onClick={() => updateQuestion(i, "correctIndex", idx)}
                >
                  Correct
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={saveQuizToDB}
        style={{
          padding: 12,
          width: "100%",
          fontSize: 18,
          background: "green",
          color: "white",
        }}
      >
        Save Quiz to DB
      </button>

      <button
        onClick={() => navigate("/quiz", { state: { quiz } })}
        style={{
          padding: 12,
          width: "100%",
          fontSize: 18,
          marginTop: 10,
          background: "blue",
          color: "white",
        }}
      >
        Start Quiz →
      </button>
    </div>
  );
};

export default AIQuizPreview;
