import React from "react";

const AINotes = ({ analysis }) => {
  if (!analysis) {
    return <p style={{ color: "white", textAlign: "center" }}>No AI notes available.</p>;
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "20px auto",
      background: "#1f2937",
      padding: "20px",
      borderRadius: "10px",
      color: "white"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>AI Study Notes</h2>

      <h3>Score</h3>
      <p>{analysis.score}</p>

      <h3>Strengths</h3>
      <ul>
        {analysis.strengths?.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <h3>Weaknesses</h3>
      <ul>
        {analysis.weaknesses?.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <h3>Quick Notes</h3>
      <ul>
        {analysis.quickNotes?.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <h3>Next Steps</h3>
      <ol>
        {analysis.nextSteps?.map((p, i) => <li key={i}>{p}</li>)}
      </ol>
    </div>
  );
};

export default AINotes;
