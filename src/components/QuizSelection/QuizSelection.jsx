import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Importing quiz data
import CN from "../quizzes/CN.json";
import DSA from "../quizzes/DSA.json";
import FOCS from "../quizzes/FOCS.json";
import thukai from "../quizzes/thukai.json";
import thukaii from "../quizzes/thukaii.json";

const QuizSelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Hardcoded quizzes
  const quizzes = {
    CN: CN,
    DSA: DSA,
    FOCS: FOCS,
    thukai : thukai,
    thukaii : thukaii,
  };

  console.log("Available Quizzes:", quizzes); // 🔥 Moved this below declaration

  const handleQuizSelection = (quiz) => {
    console.log("Selected Quiz:", quiz); // Debugging log
    navigate("/quiz", { state: { quiz } });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Select a Quiz</h1>

      {/* Add Quiz Button */}
      <button
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#ff6b6b",
          color: "white",
          cursor: "pointer",
          marginBottom: "20px",
        }}
        onClick={() => navigate("/add-quiz")}
      >
        ➕ Add Quiz
      </button>

      <br />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search quizzes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        style={{
          padding: "10px",
          fontSize: "14px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "80%",
          maxWidth: "400px",
          marginBottom: "20px",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {Object.entries(quizzes).map(([category, quizList]) => (
          <div key={category} style={{ textAlign: "center" }}>
            <h2 style={{ color: "#ff6b6b" }}>{category.toUpperCase()}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
              {quizList
                .filter((quiz) => quiz.title.toLowerCase().includes(searchTerm))
                .map((quiz, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizSelection(quiz)}
                    style={{
                      padding: "10px 15px",
                      fontSize: "20px",
                      borderRadius: "5px",
                      border: "none",
                      backgroundColor: "#34C759",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    {quiz.title}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizSelection;
