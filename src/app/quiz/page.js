"use client";
import PopUpResults from "@/components/molecules/PopUpResults/PopUpResults";
import styles from "./quiz.module.css";
import QuizCard from "@/components/organisms/QuizCard/QuizCard";
import { QuizContext } from "../../context/AppContext";
import { AnimatePresence, motion } from "motion/react";

export default function quiz() {
  const {
    clickedAnswersResults,
    setClickedAnswersResults,
    displayedQuestionIndex,
  } = QuizContext();

  const motionProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.2 },
  };

  const handleClickedPopUpOk = () => {
    setClickedAnswersResults({
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalAnswers: 0,
      incorrectAnswersData: [],
    });
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.QuizNew}
          key={displayedQuestionIndex}
          {...motionProps}
        >
          <QuizCard />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
