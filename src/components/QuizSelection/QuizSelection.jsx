import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizSelection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/api/quizzes`);
        const data = await res.json();
        setQuizzes(data);
      } catch (err) {
        console.error("fetch quizzes error", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleQuizSelection = (quiz) => {
    navigate("/quiz", { state: { quiz } });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Select a Quiz</h1>

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

      {loading ? <p>Loading quizzes...</p> : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {quizzes.length === 0 && <p>No quizzes available</p>}
          {quizzes
            .filter(q => q.title.toLowerCase().includes(searchTerm))
            .map((quiz, index) => (
              <div key={quiz._id || index} style={{ textAlign: "center" }}>
                <h2 style={{ color: "#34C759" }}>{quiz.title}</h2>
                <p style={{ maxWidth: 800, margin: "8px auto" }}>{quiz.description}</p>
                <button
                  onClick={() => handleQuizSelection(quiz)}
                  style={{
                    padding: "10px 15px",
                    fontSize: "16px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#34C759",
                    color: "white",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                >
                  Start Quiz
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default QuizSelection;
