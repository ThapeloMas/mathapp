import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import grade1Questions from "../data/grade1Questions.json";
import grade2Questions from "../data/grade2Questions.json";
import grade3Questions from "../data/grade3Questions.json";
import grade4Questions from "../data/grade4Questions.json";

const Quiz = ({ grade }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  useEffect(() => {
    const questionSets = {
      1: grade1Questions,
      2: grade2Questions,
      3: grade3Questions,
      4: grade4Questions,
    };
    setQuestions(questionSets[grade] || []);
  }, [grade]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      // Check if score is >= 5 to show fireworks
      if (score + (isCorrect ? 1 : 0) >= 5) {
        setShowFireworks(true);
        // Optional: Stop fireworks after 5 seconds
        setTimeout(() => setShowFireworks(false), 5000);
      }
    }
  };

  // Initialize the fireworks preset
  const particlesInit = async (engine) => {
    await loadFireworksPreset(engine);
  };

  const particlesOptions = {
    preset: "fireworks",
    background: {
      color: {
        value: "#000000", // Black background for better visibility
      },
    },
    fullScreen: {
      enable: true,
      zIndex: 1000, // Ensure fireworks appear above other content
    },
  };

  if (questions.length === 0)
    return <div>No questions available for this grade</div>;

  return (
    <>
      {showFireworks && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="quiz-container"
        style={{ position: "relative", zIndex: 1 }} // Ensure quiz content stays below fireworks
      >
        {showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}!
            {score >= 5 && <p>Great job! Enjoy the fireworks!</p>}
          </div>
        ) : (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer.isCorrect)}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </>
  );
};

export default Quiz;
