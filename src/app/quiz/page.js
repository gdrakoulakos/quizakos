"use client";
import styles from "./quiz.module.css";
import QuizCardQuestion from "@/components/organisms/QuizCardQuestion/QuizCardQuestion";
import { QuizContext } from "../../context/AppContext";
import { AnimatePresence, motion } from "motion/react";

export default function quiz() {
  const { displayedQuestionIndex } = QuizContext();

  const motionProps = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.2 },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.QuizNew}
          key={displayedQuestionIndex}
          {...motionProps}
        >
          <QuizCardQuestion />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
