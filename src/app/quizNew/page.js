import styles from "./quizNew.module.css";
import QuizCard from "@/components/organisms/QuizCard/QuizCard";

export default function QuizNew() {
  return (
    <div className={styles.QuizNew}>
      <QuizCard />
    </div>
  );
}
