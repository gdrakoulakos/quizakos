"use client";

import { QuizContext } from "@/context/AppContext";
import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ show, message }) {
  const { loadingSpinner } = QuizContext();

  if (!loadingSpinner.show && !show) {
    return null;
  }

  return (
    <>
      {loadingSpinner.isFullScreen ? (
        <div className={styles.fullScreenLoadingSpinnerWrapper}>
          <div className={styles.fullScreenLoadingSpinnerContainer}>
            <div className={styles.loader} />
            <p className={styles.loaderMessage}>{loadingSpinner.message}</p>
          </div>
        </div>
      ) : (
        <div className={styles.loadingSpinnerWrapper}>
          <div className={styles.loadingSpinnerContainer}>
            <div className={styles.loader} />
            <p className={styles.loaderMessage}>{message}</p>
          </div>
        </div>
      )}
    </>
  );
}
