import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner({ message, isFullScreen = false }) {
  return (
    <div
      className={
        isFullScreen
          ? styles.fullScreenLoadingSpinnerContainer
          : styles.loadingSpinnerContainer
      }
    >
      <div className={styles.loader} />
      <p className={styles.loaderMessage}>{message}</p>
    </div>
  );
}
