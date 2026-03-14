import Image from "next/image";
import styles from "../WelcomeBanner/WelcomeBanner.module.css";
import { motion } from "motion/react";

export default function WelcomeBanner() {
  return (
    <div className={styles.welcomeBanner}>
      <h3 className={styles.welcomeText}>Καλώς ήρθες στο</h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Image
          className={styles.quizakosLogo}
          src="/images/logo/logo-5-shadow.png"
          width={350}
          height={281}
          alt="quizakos logo"
          loading="eager"
        />
      </motion.div>
      <motion.div
        className={styles.welcomeText}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Παίξε και δοκίμασε τις γνώσεις σου!
      </motion.div>
    </div>
  );
}
