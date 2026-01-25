import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FloatingLines from "../FloatingLines/FloatingLines";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("home");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="home-container">

      {}
      <div className="floating-lines-wrapper">
        <FloatingLines />
      </div>

      {}
      <nav className="glass-nav">
        <button onClick={() => setCurrentSection("home")}>Home</button>
        <button onClick={() => setCurrentSection("about")}>About</button>
        <button onClick={() => setCurrentSection("settings")}>Settings</button>
        <button onClick={() => setCurrentSection("login")}>Login</button>

        {/* Theme Toggle */}
        <label className="switch">
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          />
          <span className="slider"></span>
        </label>
      </nav>

      {/* MAIN CONTENT */}
      <div className="content-wrapper">
        <AnimatePresence mode="wait">
          {currentSection === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="home-section"
            >
              <h1 className="title">QUIZZER</h1>
              <button
                onClick={() => navigate("/quiz-selection")}
                className="start-btn"
              >
                START QUIZ
              </button>
            </motion.div>
          )}

          {currentSection === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card"
            >
              <h1 className="sub-title">About Quizzer</h1>
              <p className="sub-text">AI powered quiz platform.</p>
            </motion.div>
          )}

          {currentSection === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card"
            >
              <h1 className="sub-title">Login / Register</h1>
              <p className="sub-text">Save progress & more.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Home;
