import ButtonYesNo from "@/components/atoms/ButtonYesNo/ButtonYesNo";
import styles from "./PopUpInfoMessage.module.css";
import { QuizContext } from "@/context/AppContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

export default function PopUpInfoMessage({ message, action }) {
  const { setShowPopUpInfoMessage, displayedQuestionId } = QuizContext();
  const [isIdCopied, setIsIdCopied] = useState(false);

  const handleButtonClick = () => {
    setShowPopUpInfoMessage(false);
  };

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popupContent}>
        <p className={styles.message}>{message}</p>
        <div className={styles.questionIdContainer}>
          <p className={styles.questionId}>{displayedQuestionId}</p>
          <CopyToClipboard
            text={displayedQuestionId}
            onCopy={() => setIsIdCopied(true)}
            style={{ cursor: "pointer" }}
          >
            <ContentCopyIcon fontSize="small" />
          </CopyToClipboard>
        </div>
        {isIdCopied && (
          <span className={styles.copiedText}>Το ID αντιγράφηκε!</span>
        )}
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
