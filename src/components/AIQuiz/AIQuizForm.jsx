import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AIQuizForm = () => {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const generateQuiz = async () => {
    if (!topic) return alert("Enter a topic");

    setLoading(true);

    try {
      const res = await fetch(`${backendUrl}/api/ai/generate-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, numQuestions }),
    });

        const data = await res.json();

        if (data.aiQuiz) {
        navigate("/ai-quiz-preview", { state: { aiQuiz: data.aiQuiz } });
        } else {
        alert("AI failed to generate quiz");
        }

    } catch (err) {
      console.error(err);
      alert("Backend error");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20 }}>
      <h2>Create AI Quiz</h2>

      <label>Topic</label>
      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="e.g. Computer Networks"
        style={{ width: "100%", padding: 10 }}
      />

      <label>Difficulty</label>
      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      >
        <option value="easy">easy</option>
        <option value="medium">medium</option>
        <option value="hard">hard</option>
      </select>

      <label>Number of Questions</label>
      <input
        type="number"
        min={1}
        max={20}
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <button
        onClick={generateQuiz}
        style={{
          width: "100%",
          marginTop: 20,
          padding: 12,
          background: "#34C759",
          color: "white",
          fontSize: 18,
          border: "none",
          borderRadius: 5
        }}
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </button>
    </div>
  );
};

export default AIQuizForm;
