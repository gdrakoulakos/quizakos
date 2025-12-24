import QuestionAndAnswersCard from "@/components/molecules/QuestionAndAnswersCard/QuestionAndAnswersCard";
import QuizHeader from "@/components/molecules/QuizHeader/QuizHeader";
import styles from "./QuizCard.module.css";
import CompletionStatus from "@/components/molecules/CompletionStatus/CompletionStatus";

export default function QuizCard() {
  return (
    <div className={styles.quizCard}>
      <QuizHeader />
      <CompletionStatus />
      <QuestionAndAnswersCard />
    </div>
  );
}
