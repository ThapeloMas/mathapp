import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GradeSelector = () => {
  const navigate = useNavigate();

  const handleGradeSelect = (grade) => {
    navigate(`/grade${grade}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="grade-selector"
    >
      <h1>Select Your Grade</h1>
      <div className="grade-buttons">
        {[1, 2, 3, 4].map((grade) => (
          <motion.button
            key={grade}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleGradeSelect(grade)}
          >
            Grade {grade}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default GradeSelector;
