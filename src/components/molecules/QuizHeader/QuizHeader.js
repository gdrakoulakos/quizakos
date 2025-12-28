import styles from "./QuizHeader.module.css";
import { QuizContext } from "@/context/AppContext";

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
        <p className={styles.category}>
          {quizCategory} / {quizSubcategory}
        </p>
      </div>
      <p className={styles.correctAnswers}>✅ {clickedCorrectAnswers}</p>
    </div>
  );
}
