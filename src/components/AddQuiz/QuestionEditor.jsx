import React from "react";

const QuestionEditor = ({ question, index, update, remove }) => {
  return (
    <div style={{ border: "1px solid #444", padding: 15, borderRadius: 8, marginBottom: 15 }}>
      <h3>Question {index + 1}</h3>

      <input
        type="text"
        value={question.questionText}
        placeholder="Enter question"
        onChange={(e) => update(index, "questionText", e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />

      <div style={{ marginTop: 10 }}>
        {question.options.map((opt, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => update(index, `option${i}`, e.target.value)}
            style={{ width: "48%", padding: 8, margin: "1%" }}
          />
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <label>Correct Option Index (0-3): </label>
        <input
          type="number"
          min={0}
          max={3}
          value={question.correctIndex}
          onChange={(e) => update(index, "correctIndex", e.target.value)}
          style={{ width: 60, padding: 6 }}
        />
      </div>

      <button
        onClick={() => remove(index)}
        style={{
          marginTop: 10,
          padding: 8,
          background: "#ff4444",
          color: "white",
          border: "none",
          borderRadius: 5
        }}
      >
        Remove Question
      </button>
    </div>
  );
};

export default QuestionEditor;
