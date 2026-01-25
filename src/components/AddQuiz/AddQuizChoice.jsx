import React from "react";
import { useNavigate } from "react-router-dom";

const AddQuizChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-blue-200 to-pink-300">
      <h1 className="text-4xl font-bold mb-8">Create a Quiz</h1>

      <button
        onClick={() => navigate("/add-quiz/manual")}
        className="px-8 py-4 text-xl rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
      >
        📝 Create Manually
      </button>

      <button
        onClick={() => navigate("/add-quiz/ai")}
        className="px-8 py-4 text-xl rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
      >
        🤖 Generate with AI
      </button>
    </div>
  );
};

export default AddQuizChoice;
