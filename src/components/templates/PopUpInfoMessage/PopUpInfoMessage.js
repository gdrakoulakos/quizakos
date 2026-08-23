import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpInfoMessage.module.css";
import { QuizContext } from "@/context/AppContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import PopUpAwardsInfo from "@/components/templates/PopUpAwardsInfo/PopUpAwardsInfo";

export default function PopUpInfoMessage({
  message,
  action,
  redirectToHome = false,
  linkableText,
}) {
  const {
    setShowPopUpInfoMessage,
    displayedQuestionId,
    setShowPopUpAwardsInfo,
  } = QuizContext();
  const [isIdCopied, setIsIdCopied] = useState(false);

  const handleClick = () => {
    setShowPopUpInfoMessage(false);
    if (redirectToHome) {
      window.location.href = "/";
    }
  };

  return (
    <div className={styles.popupWrapper}>
      <PopUpAwardsInfo />
      <div className={styles.popupContent}>
        <p className={styles.message}>{message}</p>
        {action === "report-question" && (
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
        )}
        {isIdCopied && (
          <span className={styles.copiedText}>Το ID αντιγράφηκε!</span>
        )}

        {linkableText && (
          <p
            className={styles.clickableText}
            onClick={() => setShowPopUpAwardsInfo(true)}
          >
            {linkableText}
          </p>
        )}
        <div className={styles.buttonContainer}>
          <ButtonOk onClick={handleClick} buttonText="ΟΚ" />
        </div>
      </div>
    </div>
  );
}
