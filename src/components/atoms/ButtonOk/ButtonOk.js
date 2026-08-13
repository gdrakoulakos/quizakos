import styles from "./ButtonOk.module.css";
import { QuizContext } from "@/context/AppContext";

export default function ButtonOk({ buttonText, onClick, isDisabled = false }) {
  return (
    <button className={styles.okButton} onClick={onClick} disabled={isDisabled}>
      <span>{buttonText}</span>
    </button>
  );
}
