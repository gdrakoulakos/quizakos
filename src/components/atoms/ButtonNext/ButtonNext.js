import styles from "./ButtonNext.module.css";

export default function ButtonNext({ buttonText, onClick }) {
  return (
    <button className={styles.nextButton} onClick={onClick}>
      {buttonText}
    </button>
  );
}
