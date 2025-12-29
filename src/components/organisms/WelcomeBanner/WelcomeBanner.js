import styles from "../WelcomeBanner/WelcomeBanner.module.css";

export default function WelcomeBanner() {
  return (
    <div className={styles.welcomeBanner}>
      <h3 className={styles.welcomeText}>Καλώς ήρθες στο</h3>{" "}
      <h1 className={styles.forteQuiz}>forteQuiz!</h1>
      <h3 className={styles.welcomeText}>
        Παίξε και δοκίμασε τις γνώσεις σου!
      </h3>
    </div>
  );
}
