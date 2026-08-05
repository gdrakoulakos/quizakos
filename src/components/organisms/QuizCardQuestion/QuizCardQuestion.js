import QuestionAndAnswersCard from "@/components/molecules/QuestionAndAnswersCard/QuestionAndAnswersCard";
import QuizHeader from "@/components/molecules/QuizHeader/QuizHeader";
import styles from "./QuizCardQuestion.module.css";
import CompletionStatus from "@/components/molecules/CompletionStatus/CompletionStatus";
import { QuizContext } from "@/context/AppContext";
import Logo from "@/components/atoms/Icons/Logo/Logo";

export default function QuizCardQuestion() {
  const { selectedQuiz } = QuizContext();

  if (!selectedQuiz) {
    return null;
  }

  return (
    <div className={styles.quizCard}>
      <div className={styles.logoWrapper}>
        <Logo link="/" width={190} height={55} />{" "}
      </div>
      <QuizHeader />
      <CompletionStatus />
      <QuestionAndAnswersCard />
    </div>
  );
}
