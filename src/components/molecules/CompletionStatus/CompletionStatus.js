import { QuizContext } from "@/context/AppContext";
import styles from "./CompletionStatus.module.css";

export default function CompletionStatus() {
  const { selectedQuiz, displayedQuestionIndex } = QuizContext();
  const quizQuestionCounter = selectedQuiz?.questions.length;
  const quizQuestionCurrentNum = displayedQuestionIndex;

  return (
    <progress
      className={styles.progress}
      max={quizQuestionCounter}
      value={quizQuestionCurrentNum}
    ></progress>
  );
}
