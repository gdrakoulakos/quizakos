import ButtonYesNo from "@/components/atoms/ButtonYesNo/ButtonYesNo";
import styles from "./PopUpInfoMessage.module.css";
import { QuizContext } from "@/context/AppContext";

export default function PopUpInfoMessage({ message, action }) {
  const { setShowPopUpInfoMessage, displayedQuestionId } = QuizContext();

  const handleButtonClick = () => {
    setShowPopUpInfoMessage(false);
  };

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popupContent}>
        <p className={styles.message}>{message}</p>
        <p className={styles.questionId}>{displayedQuestionId}</p>
        <div className={styles.buttonContainer}>
          <ButtonYesNo
            handleButtonClick={() => handleButtonClick()}
            name="Κλείσιμο"
            action={action}
          />
        </div>
      </div>
    </div>
  );
}
