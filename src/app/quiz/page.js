"use client";
import PopUpResults from "@/components/molecules/PopUpResults/PopUpResults";
import styles from "./quiz.module.css";
import QuizCard from "@/components/organisms/QuizCard/QuizCard";
import { QuizContext } from "../../context/AppContext";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function quiz() {
  const [showPopUpResults, setShowPopUpResults] = useState(false);
  const {
    clickedAnswersResults,
    setClickedAnswersResults,
    displayedQuestionIndex,
  } = QuizContext();
  console.log("displayedQuestionIndex", displayedQuestionIndex);

  const motionProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.2 },
  };

  if (clickedAnswersResults.totalAnswers === 10 && !showPopUpResults) {
    setTimeout(() => {
      setShowPopUpResults(true);
    }, 2000);
  }

  const handleClickedPopUpOk = () => {
    setClickedAnswersResults({
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalAnswers: 0,
      incorrectAnswersData: [],
    });
    setShowPopUpResults(false);
  };

  return (
    <>
      {showPopUpResults && (
        <PopUpResults
          congratsImg={"/images/bravo3.png"}
          congratulationsMessage={"Συγχαρητήρια!"}
          resultMessage={"Το σκορ σου είναι:"}
          correctAnswers={`${clickedAnswersResults.correctAnswers} /
                    ${clickedAnswersResults.totalAnswers}`}
          onClick={handleClickedPopUpOk}
        />
      )}
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
