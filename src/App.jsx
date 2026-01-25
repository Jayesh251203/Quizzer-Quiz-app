import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import QuizSelection from "./components/QuizSelection/QuizSelection";
import Quiz from "./components/quiz/Quiz";
import AddQuizChoice from "./components/AddQuiz/AddQuizChoice";
import AddQuizForm from "./components/AddQuiz/AddQuizForm";
import AIQuizForm from "./components/AIQuiz/AIQuizForm";
import AIQuizPreview from "./components/AIQuiz/AIQuizPreview";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz-selection" element={<QuizSelection />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/add-quiz" element={<AddQuizChoice />} />
        <Route path="/add-quiz/manual" element={<AddQuizForm />} />
        <Route path="/add-quiz/ai" element={<AIQuizForm />} />
        <Route path="/ai-quiz-preview" element={<AIQuizPreview />} />
      </Routes>
    </Router>
  );
};


export default App;