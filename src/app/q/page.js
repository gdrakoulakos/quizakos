import styles from "./q.module.css";
import QuizCard from "@/components/organisms/QuizCard/QuizCard";

export default function q() {
  return (
    <div className={styles.QuizNew}>
      <QuizCard />
    </div>
  );
}
