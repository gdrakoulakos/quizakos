import styles from "./CompletionStatus.module.css";

export default function CompletionStatus() {
  return <progress className={styles.progress} max="10" value="6"></progress>;
}
