import styles from "./ButtonOk.module.css";
import { QuizContext } from "@/context/AppContext";

export default function ButtonOk({ buttonText, onClick }) {
  const { isDesktop } = QuizContext();
  return (
    <button
      className={`${styles.okButton} ${
        isDesktop ? styles.large : styles.small
      }`}
      onClick={onClick}
    >
      <span>{buttonText}</span>
    </button>
  );
}
