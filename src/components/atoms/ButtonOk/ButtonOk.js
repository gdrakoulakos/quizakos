import styles from "./ButtonOk.module.css";

export default function ButtonOk({ buttonText, onClick }) {
  return (
    <div className={styles.okButton} onClick={onClick}>
      {buttonText}
    </div>
  );
}
