import React, { useState } from "react";

const AddQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [category, setCategory] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState("");

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleNext = () => {
    if (newQuestion && options.every(opt => opt) && correctOption) {
      setQuestions([...questions, { question: newQuestion, options, correctOption }]);
      setNewQuestion("");
      setOptions(["", "", "", ""]);
      setCorrectOption("");
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) setCurrentQuestion(currentQuestion - 1);
  };

  const handleSaveQuiz = () => {
    const quizData = { quizName, category, questions };
    console.log("Saving quiz:", quizData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-500 to-orange-500 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Add a Quiz</h1>
      
      <input type="text" placeholder="Enter Quiz Name" value={quizName} onChange={(e) => setQuizName(e.target.value)} className="p-3 mb-3 w-80 rounded-lg bg-red-400 text-white text-center" />
      
      <div className="flex gap-4">
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 w-40 rounded-lg bg-red-400 text-white text-center" />
        <input type="number" placeholder="No. of Questions" value={numQuestions} onChange={(e) => setNumQuestions(e.target.value)} className="p-3 w-40 rounded-lg bg-red-400 text-white text-center" />
      </div>
      
      <div className="my-4 text-xl text-white font-bold">{currentQuestion}/{numQuestions}</div>
      
      <input type="text" placeholder="Add Question" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} className="p-3 mb-3 w-96 rounded-lg bg-red-400 text-white text-center" />
      
      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, index) => (
          <input key={index} type="text" placeholder={`Option ${index + 1}`} value={opt} onChange={(e) => handleOptionChange(index, e.target.value)} className="p-3 rounded-lg bg-red-400 text-white text-center" />
        ))}
      </div>
      
      <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)} className="p-3 mt-3 rounded-lg bg-red-400 text-white text-center">
        <option value="">Select Correct Option</option>
        {options.map((opt, index) => opt && <option key={index} value={opt}>{opt}</option>)}
      </select>
      
      <div className="flex gap-4 mt-4">
        <button onClick={handlePrevious} className="px-6 py-2 bg-red-600 text-white rounded-lg">Previous</button>
        <button onClick={handleNext} className="px-6 py-2 bg-red-600 text-white rounded-lg">Next</button>
      </div>
      
      <button onClick={handleSaveQuiz} className="mt-6 px-6 py-2 bg-green-500 text-white rounded-lg">Save Quiz</button>
    </div>
  );
};

export default AddQuiz;
