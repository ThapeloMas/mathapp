import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import grade1Questions from "../data/grade1Questions.json";
import grade2Questions from "../data/grade2Questions.json";
import grade3Questions from "../data/grade3Questions.json";
import grade4Questions from "../data/grade4Questions.json";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const Quiz = ({ grade, onRouteChange, user }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [timeSpent, setTimeSpent] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState([]);
  const [timerActive, setTimerActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const questionSets = {
      1: grade1Questions,
      2: grade2Questions,
      3: grade3Questions,
      4: grade4Questions,
    };
    setQuestions(questionSets[grade] || []);
    setTimerActive(true);
  }, [grade]);

  useEffect(() => {
    let timer;
    if (timerActive && !showScore) {
      timer = setInterval(() => setTimeSpent((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, showScore]);

  // Initialize EmailJS with the public key (user ID)
  useEffect(() => {
    if (process.env.REACT_APP_EMAILJS_USER_ID) {
      emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);
    } else {
      console.error("EmailJS User ID is not defined in environment variables.");
    }
  }, []);

  const handleAnswer = async (isCorrect) => {
    setTimerActive(false);
    const timeForThisQuestion = timeSpent;

    if (isCorrect) {
      setAnswerStatus("correct");
      setFeedbackMessage("Well done, kid!");
      setScore(score + 1);
    } else {
      setAnswerStatus("incorrect");
      setFeedbackMessage("Sorry, you'll get it next time!");
    }

    setTotalTimeSpent([...totalTimeSpent, timeForThisQuestion]);

    setTimeout(async () => {
      setAnswerStatus(null);
      setFeedbackMessage("");
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setTimeSpent(0);
        setTimerActive(true);
      } else {
        setShowScore(true);
        if (score + (isCorrect ? 1 : 0) >= 5) {
          setShowFireworks(true);
          setTimeout(() => setShowFireworks(false), 5000);
        }

        try {
          await addDoc(collection(db, "quizResults"), {
            grade,
            totalQuestions: questions.length,
            correctAnswers: score + (isCorrect ? 1 : 0),
            wrongAnswers: questions.length - (score + (isCorrect ? 1 : 0)),
            timeSpentPerQuestion: [...totalTimeSpent, timeForThisQuestion],
            userId: user ? user.uid : "guest",
            timestamp: new Date().toISOString(),
          });
          console.log("Results saved to Firestore");
        } catch (error) {
          console.error("Error saving to Firestore:", error);
        }
      }
    }, 2000);
  };

  const handleQuit = () => {
    navigate("/");
  };

  const sendEmail = () => {
    if (!user || !user.email) {
      alert("No user logged in or email not available!");
      return;
    }

  
    // Check if EmailJS credentials are available
    if (
      !process.env.REACT_APP_EMAILJS_SERVICE_ID ||
      !process.env.REACT_APP_EMAILJS_TEMPLATE_ID ||
      !process.env.REACT_APP_EMAILJS_USER_ID
    ) {
      console.error(
        "EmailJS credentials are missing in environment variables."
      );
      alert("Email service is not properly configured. Contact support.");
      return;
    }

    const templateParams = {
      to_email: user.email,
      grade: grade,
      score: score,
      totalQuestions: questions.length,
      correctAnswers: score,
      wrongAnswers: questions.length - score,
      timeSpent: totalTimeSpent.reduce((a, b) => a + b, 0),
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Quiz results sent to your email!");
        },
        (error) => {
          console.error("Error sending email:", error);
          alert("Failed to send email: " + (error.text || "Unknown error"));
        }
      );
  };

  const particlesInit = async (engine) => {
    await loadFireworksPreset(engine);
  };

  const particlesOptions = {
    preset: "fireworks",
    background: { color: { value: "#000000" } },
    fullScreen: { enable: true, zIndex: 1000 },
  };

  if (questions.length === 0)
    return <div>No questions available for this grade</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`quiz-container ${
        answerStatus === "correct"
          ? "correct"
          : answerStatus === "incorrect"
          ? "incorrect"
          : ""
      }`}
      style={{ position: "relative", zIndex: 1 }}
    >
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}!
          {score >= 5 && <p>Great job! Enjoy the fireworks!</p>}
          <p>
            Total time spent: {totalTimeSpent.reduce((a, b) => a + b, 0)}{" "}
            seconds
          </p>
          {user ? <p>Saved for {user.email}</p> : <p>Played as Guest</p>}
          <button onClick={handleQuit} className="logout-button">
            Quit to Landing Page
          </button>
          {user && (
            <button onClick={sendEmail} className="send-results-button">
              Send Results to Parents
            </button>
          )}
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
            <div className="timer">Time: {timeSpent} seconds</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer.isCorrect)}
                disabled={answerStatus !== null}
              >
                {answer.text}
              </button>
            ))}
          </div>
          {feedbackMessage && (
            <div
              className={`feedback-message ${
                answerStatus === "correct"
                  ? "correct-feedback"
                  : "incorrect-feedback"
              }`}
            >
              {feedbackMessage}
            </div>
          )}
          <button onClick={handleQuit} className="logout-button">
            Quit
          </button>
        </>
      )}
      {showFireworks && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
        />
      )}
    </motion.div>
  );
};

export default Quiz;
