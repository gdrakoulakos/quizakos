import styles from "./QuizHeader.module.css";

export default function QuizHeader() {
  return (
    <div className={styles.quizHeader}>
      <p>6/10</p>
      <div className={styles.quizInfo}>
        <p className={styles.quizCategory}>Μουσική / Θεωρία 2</p>
      </div>
    </div>
  );
}
