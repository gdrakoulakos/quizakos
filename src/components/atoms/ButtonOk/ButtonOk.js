import styles from "./ButtonOk.module.css";

export default function ButtonOk({ buttonText, onClick }) {
  return (
    <p className={styles.okButton} onClick={onClick}>
      {buttonText}
    </p>
  );
}
