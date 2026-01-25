import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import "./Quiz.css";
import "./Animations.css";
import ProgressBar from './ProgressBar';

const Quiz = () => {
  const location = useLocation();
  const quiz = location.state?.quiz || null; // quiz object from backend or local

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      return <h2 className="text-white text-center text-2xl">No quiz data found.</h2>;
  }

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(new Array(quiz.questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showCorrectSolutions, setShowCorrectSolutions] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const selectOption = (optionIndex) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    if (index < quiz.questions.length - 1) {
      setIndex(index + 1);
    } else {
      calculateScore();
      setShowResults(true);
      triggerAnalysis();
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    selectedOptions.forEach((option, i) => {
      if (typeof option === "number" && option === quiz.questions[i].correctIndex) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelectedOptions(new Array(quiz.questions.length).fill(null));
    setShowResults(false);
    setShowCorrectSolutions(false);
    setAnalysis(null);
  };

  const progress = quiz.questions.length ? ((index + 1) / quiz.questions.length) * 100 : 0;

  const triggerAnalysis = async () => {
    try {
      setAnalysisLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/ai/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz, userAnswers: selectedOptions })
      });
      const data = await res.json();
      setAnalysis(data.analysis || null);
    } catch (err) {
      console.error("analysis error", err);
    } finally {
      setAnalysisLoading(false);
    }
  };

  return (
    <div className='container'>
      <label className="switch">
        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
        <span className="slider"></span>
      </label>

      <h1>{quiz.title || "Quiz App"}</h1>
      <hr />
      <ProgressBar progress={progress} />

      { showCorrectSolutions ? (
        <div className="results">
          <h2>Correct Solutions</h2>
          {quiz.questions.map((q, i) => (
            <div key={i} className="solution-item">
              <h3>{i + 1}. {q.questionText}</h3>
              <ul>
                {q.options.map((opt, optIdx) => {
                  const correct = q.correctIndex === optIdx;
                  const selected = selectedOptions[i] === optIdx;
                  return (
                    <li key={optIdx}
                      className={
                        selected && !correct ? 'wrong' :
                        selected && correct ? 'correct' :
                        correct ? 'correct-border' : ''
                      }>
                      {opt}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <button className="button-container" onClick={() => { setShowCorrectSolutions(false); setShowResults(true); }}>Back</button>
        </div>
      ) : showResults ? (
        <div className="results">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {quiz.questions.length}</p>

          <button className="button-container" onClick={() => { setShowCorrectSolutions(true); setShowResults(false); }}>
            View Correct Solutions
          </button>
          <button className="button-container" onClick={restartQuiz}>Restart Quiz</button>

          <div style={{ marginTop: 20 }}>
            <h3>AI Analysis</h3>
            {analysisLoading && <p>Analyzing... ⏳</p>}
            {analysis && (
              <div style={{ textAlign: "left", maxWidth: 800, margin: "8px auto", background: "#fff2", padding: 12, borderRadius: 8 }}>
                <p><strong>Score:</strong> {analysis.score}</p>
                <p><strong>Strengths:</strong></p>
                <ul>{(analysis.strengths || []).map((s, idx) => <li key={idx}>{s}</li>)}</ul>
                <p><strong>Weaknesses:</strong></p>
                <ul>{(analysis.weaknesses || []).map((w, idx) => <li key={idx}>{w}</li>)}</ul>
                <p><strong>Quick Notes:</strong></p>
                <ul>{(analysis.quickNotes || []).map((n, idx) => <li key={idx}>{n}</li>)}</ul>
                <p><strong>Next Steps:</strong></p>
                <ol>{(analysis.nextSteps || []).map((n, idx) => <li key={idx}>{n}</li>)}</ol>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <h2 className="question">{index + 1}. {quiz.questions[index].questionText}</h2>
          <ul>
            {quiz.questions[index].options.map((optText, optIdx) => (
              <li
                key={optIdx}
                className={selectedOptions[index] === optIdx ? 'selected' : ''}
                onClick={() => selectOption(optIdx)}
              >
                {optText}
              </li>
            ))}
          </ul>

          <div className="btn-container">
            <button className="button-container" onClick={handlePrevious} disabled={index === 0}>Previous</button>
            <button className="button-container" onClick={handleNext}>
              {index < quiz.questions.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
          <div className='index'>{index + 1} of {quiz.questions.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
