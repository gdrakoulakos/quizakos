import styles from "./QuizHeader.module.css";
import { QuizContext } from "@/context/AppContext";
import Image from "next/image";

export default function QuizHeader() {
  const { selectedQuiz, displayedQuestionIndex, clickedAnswersResults } =
    QuizContext();
  const quizCategory = selectedQuiz?.category;
  const quizSubcategory = selectedQuiz?.subcategory;
  const quizQuestionCounter = selectedQuiz?.questions.length;
  const quizQuestionCurrentNum = displayedQuestionIndex + 1;
  const clickedCorrectAnswers = clickedAnswersResults.correctAnswers;

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
        <div className={styles.correctAnswers}>{clickedCorrectAnswers}</div>
      </div>
    </div>
  );
}
