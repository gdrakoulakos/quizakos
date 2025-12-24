import styles from "./CompletionStatus.module.css";

export default function CompletionStatus() {
  return <progress className={styles.progress} max="100" value="70"></progress>;
}
