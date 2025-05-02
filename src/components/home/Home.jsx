import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import backgroundImage from "../../assets/MacBook Air - 1.png";

const Home = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState("home");

  const handleNavigation = (section) => {
    if (section === "quiz") {
      navigate("/quiz-selection"); // 🔥 Change this to go to Quiz Selection first!
    } else if (section === "settings") {
      navigate("/settings");
    } else {
      setCurrentSection(section);
    }
  };
  

  return (
    <div className="home-container">
      {/* Background Image */}
      <img src={backgroundImage} alt="Background" className="bg-image" />

      {/* Navigation Bar */}
      <nav className="navbar">
        <button className="nav-button" onClick={() => handleNavigation("home")}>Home</button>
        <button className="nav-button" onClick={() => handleNavigation("about")}>About</button>
        <button className="nav-button" onClick={() => handleNavigation("settings")}>Settings</button>
        <button className="nav-button" onClick={() => handleNavigation("login")}>Login</button>
      </nav>

      {/* Page Content */}
      <AnimatePresence mode="wait">
        {currentSection === "home" && (
          <motion.div
            key="home"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="section"
          >
            <h1 className="app-title">WELCOME TO QUIZZER</h1>
            <motion.button
              className="start-quiz-btn"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNavigation("quiz")}
            >
              TAKE QUIZ
            </motion.button>
          </motion.div>
        )}

        {currentSection === "about" && (
          <motion.div
            key="about"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="section"
          >
            <h1>About Quizzer</h1>
            <p>This is a fun and engaging quiz platform to test your skills.</p>
          </motion.div>
        )}

        {currentSection === "login" && (
          <motion.div
            key="login"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="section"
          >
            <h1>Login / Sign Up</h1>
            <p>Login to save your progress and compete with others!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
