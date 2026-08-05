import styles from "./ButtonOk.module.css";
import { QuizContext } from "@/context/AppContext";

export default function ButtonOk({ buttonText, onClick }) {
  const { isDesktop } = QuizContext();
  return (
    <button className={styles.okButton} onClick={onClick}>
      <span>{buttonText}</span>
    </button>
  );
}
