import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import QuizSelection from "./components/QuizSelection/QuizSelection";
import Quiz from "./components/quiz/Quiz";
import AddQuiz from "./components/AddQuiz/AddQuiz";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/quiz-selection" element={<QuizSelection />} /> 
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
