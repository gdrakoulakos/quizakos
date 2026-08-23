import styles from "./ButtonOk.module.css";
import { QuizContext } from "@/context/AppContext";

export default function ButtonOk({
  buttonText,
  onClick,
  isDisabled = false,
  fontSize,
}) {
  return (
    <button className={styles.okButton} onClick={onClick} disabled={isDisabled}>
      <span className={styles[fontSize]}>{buttonText}</span>
    </button>
  );
}
