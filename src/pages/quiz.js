import styles from "../pages/quiz.module.css";

export default function Quiz() {
  return (
    <div className={styles.quizContainer}>
      <h1>Theory</h1>
      <h2>Which note is after A?</h2>
      <h1>🕒</h1>
      <h2>3</h2>
      <div className={styles.quizAnswers}>
        <h3>The note B is after A</h3>
        <h3>The note C is after A</h3>
        <h3>The note D is after A</h3>
        <h3>The note E is after A</h3>
      </div>
    </div>
  );
}
