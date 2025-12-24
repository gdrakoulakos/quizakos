import styles from "./QuizHeader.module.css";

export default function QuizHeader() {
  return (
    <div className={styles.quizHeader}>
      <p className={styles.questionNum}>3</p>
      <p className={styles.quizCategory}>Μουσική / Θεωρία</p>
      <p>✅ 6/10</p>
    </div>
  );
}
