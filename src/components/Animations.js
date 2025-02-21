import { motion } from "framer-motion";

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 },
};

export const bounce = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
};
