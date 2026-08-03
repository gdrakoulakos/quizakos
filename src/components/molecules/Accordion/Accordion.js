"use client";
import styles from "./Accordion.module.css";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function Accordion({ question, answer, id }) {
  const [showAnswer, setShowAnswer] = useState(false);

  const toggleAccordion = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className={styles.accordionContainer}>
      <div className={styles.questionContainer} onClick={toggleAccordion}>
        <div className={styles.question}>
          {id}. {question}
        </div>
        {showAnswer ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      <AnimatePresence>
        {showAnswer && (
          <motion.div
            className={`${styles.answer} ${showAnswer ? styles.show : ""}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
