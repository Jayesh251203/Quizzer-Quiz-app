import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmptyQuestion = () => ({ questionText: "", options: ["", "", "", ""], correctIndex: 0 });

const AddQuizForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([EmptyQuestion()]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const updateQuestion = (qIndex, field, value) => {
    const copy = [...questions];
    if (field === "questionText") copy[qIndex].questionText = value;
    if (field.startsWith("option")) {
      const idx = Number(field.replace("option", ""));
      copy[qIndex].options[idx] = value;
    }
    if (field === "correctIndex") copy[qIndex].correctIndex = Number(value);
    setQuestions(copy);
  };

  const addQuestion = () => setQuestions([...questions, EmptyQuestion()]);
  const removeQuestion = (i) => setQuestions(questions.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (!title || questions.length === 0) {
      alert("Provide title and at least one question");
      return;
    }
    try {
      const res = await fetch(`${backendUrl}/api/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, difficulty, questions })
      });
      const data = await res.json();
      if (res.ok) {
        alert("Quiz created!");
        navigate("/quiz-selection");
      } else {
        console.error("create quiz failed", data);
        alert("Failed to create quiz");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required style={{width:"100%", padding:8}}/>
        </div>
        <div style={{marginTop:8}}>
          <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} style={{width:"100%", padding:8}}/>
        </div>
        <div style={{marginTop:8}}>
          <label>Difficulty: </label>
          <select value={difficulty} onChange={e=>setDifficulty(e.target.value)}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>

        <hr />

        {questions.map((q, idx) => (
          <div key={idx} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
            <div>
              <input placeholder={`Question ${idx+1}`} value={q.questionText} onChange={e=>updateQuestion(idx, "questionText", e.target.value)} style={{width:"100%", padding:6}} />
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:8}}>
              {q.options.map((opt, optIdx) => (
                <input key={optIdx} placeholder={`Option ${optIdx}`} value={opt}
                  onChange={e=>updateQuestion(idx, `option${optIdx}`, e.target.value)} />
              ))}
            </div>
            <div style={{marginTop:8}}>
              <label>Correct option index (0-3): </label>
              <input type="number" min={0} max={3} value={q.correctIndex} onChange={e=>updateQuestion(idx, "correctIndex", e.target.value)} />
            </div>
            <div style={{marginTop:8}}>
              <button type="button" onClick={()=>removeQuestion(idx)} disabled={questions.length===1}>Remove</button>
            </div>
          </div>
        ))}

        <div>
          <button type="button" onClick={addQuestion}>Add Question</button>
        </div>

        <div style={{marginTop:12}}>
          <button type="submit">Create Quiz</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuizForm;
