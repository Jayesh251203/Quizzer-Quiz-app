import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import "./Quiz.css";
import "./Animations.css"; // Import animations
import ProgressBar from './ProgressBar'; // Import ProgressBar Component

// ✅ Importing quiz data (same as in QuizSelection.jsx)
// import CN from "../quizzes/CN.json";
// import DSA from "../quizzes/DSA.json";
// import FOCS from "../quizzes/FOCS.json";


const Quiz = () => {
  const location = useLocation();
  const quiz = location.state?.quiz || null;

  // Debugging log
  
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
      return <h2 className="text-white text-center text-2xl">No quiz data found.</h2>;
  }

  
  
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(new Array(quiz.questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showCorrectSolutions, setShowCorrectSolutions] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  
  console.log("Received Quiz Data:", quiz);
  console.log("Questions Data:", quiz.questions);
  console.log("Current Question Index:", index);
  console.log("Current Question:", quiz.questions[index]?.questionText);
  
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const selectOption = (optionLetter) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = optionLetter;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNext = () => {
    if (index < quiz.questions.length - 1) {
      setIndex(index + 1);
    } else {
      calculateScore();
      setShowResults(true);
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
      if (option === quiz.questions[i].correctOption) {
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
  };

  const progress = quiz.questions.length ? ((index + 1) / quiz.questions.length) * 100 : 0;

  return (
    <div className='container'>
      <label className="switch">
        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
        <span className="slider"></span>
      </label>

      <h1>Quiz App</h1>
      <hr />
      <ProgressBar progress={progress} />

      { showCorrectSolutions ? (
        <div className="results">
          <h2>Correct Solutions</h2>
          {quiz.questions.map((q, i) => (
            <div key={i} className="solution-item">
              <h3>{i + 1}. {q.questionText}</h3>
              <ul>
                {["A", "B", "C", "D"].map(option => (
                  <li 
                    key={option} 
                    className={
                      selectedOptions[i] === option && option !== q.correctOption ? 'wrong' :
                      selectedOptions[i] === option && option === q.correctOption ? 'correct' :
                      option === q.correctOption ? 'correct-border' : ''
                    }
                  >
                    {q[`option${option}`]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button className="button-container" onClick={() => { setShowCorrectSolutions(false); setShowResults(true); }}>Back</button>
        </div>
      ) 
      :showResults ? (
        <div className="results">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {quiz.questions.length}</p>
          <button className="button-container" onClick={() => { setShowCorrectSolutions(true); setShowResults(false); }}>
            View Correct Solutions
          </button>
          <button className="button-container" onClick={restartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <h2 className="question">{index + 1}. {quiz.questions[index].questionText}</h2>
          <ul>
            {["A", "B", "C", "D"].map(option => (
              <li 
                key={option} 
                className={selectedOptions[index] === option ? 'selected' : ''}
                onClick={() => selectOption(option)}
              >
                {quiz.questions[index][`option${option}`]}
              </li>
            ))}
          </ul>

          <div className="btn-container">
            <button className="button-container" onClick={handlePrevious} disabled={index === 0}>Previous</button>
            {index < quiz.questions.length - 1 ? (
              <button className="button-container" onClick={handleNext}>Next</button>
            ) : (
              <button className="button-container" onClick={handleNext}>Submit</button>
            )}
          </div>
          <div className='index'>{index + 1} of {quiz.questions.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
