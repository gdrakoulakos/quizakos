import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpResults.module.css";
import Image from "next/image";

export default function PopUpResults({
  congratulationsMessage,
  resultMessage,
  correctAnswers,
  onClick,
  congratsImg,
}) {
  return (
    <div className={styles.blurBackground}>
      <div className={styles.popUpResultsContainer}>
        <Image src={congratsImg} width={220} height={220} alt="Bravo icon" />
        <div className={styles.congratulationsMessage}>
          {congratulationsMessage}
        </div>
        <div className={styles.resultMessage}>{resultMessage}</div>
        <div className={styles.correctAnswers}>{correctAnswers}</div>
        <button className={styles.seeResultsButton}>Δες τα αποτελέσματα</button>
        <ButtonOk onClick={onClick} buttonText={"OK"} />
      </div>
    </div>
  );
}
