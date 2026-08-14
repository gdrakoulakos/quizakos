"use client";

import { QuizContext } from "@/context/AppContext";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  const { loadingSpinner } = QuizContext();

  if (!loadingSpinner.show) {
    return null;
  }

  return (
    <div className={styles.loadingSpinnerWrapper}>
      <div
        className={
          loadingSpinner.isFullScreen
            ? styles.fullScreenLoadingSpinnerContainer
            : styles.loadingSpinnerContainer
        }
      >
        <div className={styles.loader} />
        <p className={styles.loaderMessage}>{loadingSpinner.message}</p>
      </div>
    </div>
  );
}
