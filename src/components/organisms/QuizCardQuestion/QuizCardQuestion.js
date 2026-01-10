import QuestionAndAnswersCard from "@/components/molecules/QuestionAndAnswersCard/QuestionAndAnswersCard";
import QuizHeader from "@/components/molecules/QuizHeader/QuizHeader";
import styles from "./QuizCardQuestion.module.css";
import CompletionStatus from "@/components/molecules/CompletionStatus/CompletionStatus";
import { QuizContext } from "@/context/AppContext";

export default function QuizCardQuestion() {
  const { selectedQuiz } = QuizContext();

  if (!selectedQuiz) {
    return null;
  }

  return (
    <div className={styles.quizCard}>
      <QuizHeader />
      <CompletionStatus />
      <QuestionAndAnswersCard />
    </div>
  );
}
