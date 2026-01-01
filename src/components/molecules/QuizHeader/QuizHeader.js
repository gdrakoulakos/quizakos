import styles from "./QuizHeader.module.css";
import { QuizContext } from "@/context/AppContext";
import Image from "next/image";
import { motion } from "motion/react";

export default function QuizHeader() {
  const { selectedQuiz, displayedQuestionIndex, clickedAnswersResults } =
    QuizContext();
  const quizCategory = selectedQuiz?.category;
  const quizSubcategory = selectedQuiz?.subcategory;
  const quizQuestionCounter = selectedQuiz?.questions.length;
  const quizQuestionCurrentNum = displayedQuestionIndex + 1;
  const clickedCorrectAnswers = clickedAnswersResults.correctAnswers;

  const motionProps = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.2 },
  };

  return (
    <div className={styles.quizHeader}>
      <p className={styles.questionCounter}>
        {quizQuestionCurrentNum}/{quizQuestionCounter}
      </p>
      <div className={styles.info}>
        <p className={styles.subcategory}>{quizSubcategory}</p>
        <p className={styles.category}>{quizCategory}</p>
      </div>
      <div className={styles.correctInfoContainer}>
        <Image
          className={styles.correctIcon}
          src={"/images/correct.png"}
          alt="correct answers icon"
          width={20}
          height={20}
        />
        <motion.div
          key={clickedCorrectAnswers}
          className={styles.correctAnswers}
          {...motionProps}
        >
          {clickedCorrectAnswers}
        </motion.div>
      </div>
    </div>
  );
}
