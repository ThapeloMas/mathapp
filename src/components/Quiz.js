import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const Quiz = ({ grade }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, `grade${grade}`));
      const questionsData = querySnapshot.docs.map((doc) => doc.data());
      setQuestions(questionsData);
    };
    fetchQuestions();
  }, [grade]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="quiz-container"
    >
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}!
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
  );
};

export default Quiz;
