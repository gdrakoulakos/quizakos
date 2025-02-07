import styles from "../WelcomeBanner/WelcomeBanner.module.css";

export default function WelcomeBanner() {
  return (
    <div className={styles.welcomeBanner}>
      <h1>Welcome to forteQuiz</h1>
      <p>Play some Quizzes and test your music skills</p>
    </div>
  );
}
