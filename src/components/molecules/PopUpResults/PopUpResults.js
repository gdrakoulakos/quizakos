import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpResults.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { QuizContext } from "@/context/AppContext";
import { useLaunchConfetti } from "@/customHooks";

export default function PopUpResults({ correctAnswers }) {
  const { clickedAnswersResults } = QuizContext();
  const [congratulationsMessage, setCongratulationsMessage] =
    useState("/images/bravo3.png");
  const [resultImg, setResultImg] = useState("");
  const launchConfetti = useLaunchConfetti;

  const totalAnswersLength = clickedAnswersResults.totalAnswers;
  const correctAnswersLength = clickedAnswersResults.correctAnswers;
  const scorePercentage = (correctAnswersLength / totalAnswersLength) * 100;

  useEffect(() => {
    if (scorePercentage) {
      if (scorePercentage === 100) {
        setResultImg("/images/bravo4.gif");
        setCongratulationsMessage("ΜΠΡΑΒΟ! Τα κατάφερες τέλεια!");
        setTimeout(() => {
          launchConfetti();
        }, 500);
      } else if (scorePercentage >= 80) {
        setResultImg("/images/bravo3.png");
        setCongratulationsMessage("Μπράβο! Πολύ καλή προσπάθεια!");
      } else if (scorePercentage >= 60) {
        setResultImg("/images/bravo2.png");
        setCongratulationsMessage("Καλά τα πήγες! Συνέχισε έτσι!");
      } else if (scorePercentage >= 40) {
        setResultImg("/images/bravo2.png");
        setCongratulationsMessage("Ωραία προσπάθεια! Μπορείς και καλύτερα!");
      } else {
        setResultImg("/images/bravo2.png");
        setCongratulationsMessage("Μην τα παρατάς! Κάθε προσπάθεια μετράει!");
      }
    }
  }, []);

  return (
    <motion.div
      className={styles.blurBackground}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.popUpResultsContainer}>
        <Image src={resultImg} width={220} height={220} alt="Bravo icon" />
        <div className={styles.congratulationsMessage}>
          {congratulationsMessage}
        </div>
        <div className={styles.resultMessage}>{"Το σκορ σου είναι:"}</div>
        <div className={styles.correctAnswers}>{correctAnswers}</div>
        <Link href="/quizResults">
          <button className={styles.seeResultsButton}>
            Δες τα αποτελέσματα
          </button>
        </Link>
        <ButtonOk buttonText={"OK"} />
      </div>
    </motion.div>
  );
}
