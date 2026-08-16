import Image from "next/image";
import styles from "../WelcomeBanner/WelcomeBanner.module.css";

export default function WelcomeBanner() {
  return (
    <div className={styles.welcomeBanner}>
      <h3 className={styles.welcomeText}>Καλώς ήρθες στο</h3>
      <div>
        <Image
          src="/images/logo/logo-5-shadow-2.png"
          width={320}
          height={101}
          alt="quizakos logo"
          loading="eager"
        />
      </div>
      <div className={styles.welcomeText}>
        Παίξε και δοκίμασε τις γνώσεις σου!
      </div>
    </div>
  );
}
