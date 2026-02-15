import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpResults.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { QuizContext } from "@/context/AppContext";
import { useLaunchConfetti } from "@/customHooks";

export default function PopUpResults({ correctAnswers }) {
  const { clickedAnswersResults, selectedQuizId } = QuizContext();
  const [congratulationsMessage, setCongratulationsMessage] = useState(null);
  const [resultImg, setResultImg] = useState("/images/quizakos/guizakos1.png");
  const [hoppingEffect, setHoppingEffect] = useState(false);
  const launchConfetti = useLaunchConfetti;

  const totalAnswersLength = clickedAnswersResults.totalAnswers;
  const correctAnswersLength = clickedAnswersResults.correctAnswers;
  const scorePercentage = (correctAnswersLength / totalAnswersLength) * 100;

  useEffect(() => {
    if (!selectedQuizId) return;

    const storedResults = localStorage.getItem("quiz_results");
    const storedResultsArray = storedResults ? JSON.parse(storedResults) : [];
    const newResults = {
      lesson_id: selectedQuizId,
      score: scorePercentage,
      stars: scorePercentage,
    };
    const lessonExistsInStoredResults = storedResultsArray.find(
      (lesson) => lesson.lesson_id === selectedQuizId,
    );

    if (!lessonExistsInStoredResults) {
      const updatedResults = [...storedResultsArray, newResults];
      localStorage.setItem("quiz_results", JSON.stringify(updatedResults));
    } else if (
      lessonExistsInStoredResults &&
      lessonExistsInStoredResults.score < scorePercentage
    ) {
      const updatedResults = storedResultsArray.map((lesson) =>
        lesson.lesson_id === selectedQuizId
          ? {
              ...lesson,
              score: scorePercentage,
              stars: lesson.stars + scorePercentage,
            }
          : lesson,
      );
      localStorage.setItem("quiz_results", JSON.stringify(updatedResults));
    }
  }, [selectedQuizId, scorePercentage]);

  useEffect(() => {
    if (scorePercentage === 100) {
      setResultImg("/images/quizakos/guizakos-with-friends-4.png");
      setCongratulationsMessage("ΜΠΡΑΒΟ! Τα κατάφερες τέλεια!");
      setHoppingEffect(true);
      setTimeout(() => {
        launchConfetti();
      }, 500);
    } else if (scorePercentage >= 80) {
      setResultImg("/images/quizakos/guizakos4.png");
      setCongratulationsMessage("Μπράβο! Τα πήγες εξαιρετικά!");
    } else if (scorePercentage >= 60) {
      setResultImg("/images/quizakos/guizakos3.png");
      setCongratulationsMessage("Τα πήγες πολύ καλά! Συνέχισε έτσι!");
    } else if (scorePercentage >= 40) {
      setResultImg("/images/quizakos/guizakos2.png");
      setCongratulationsMessage("Ωραία προσπάθεια! Μπορείς και καλύτερα!");
    } else {
      setResultImg("/images/quizakos/guizakos1.png");
      setCongratulationsMessage("Μην τα παρατάς! Κάθε προσπάθεια μετράει!");
    }
  }, [scorePercentage]);

  return (
    <motion.div
      className={styles.blurBackground}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.popUpResultsContainer}>
        <Image
          className={`${styles.resultImage} ${hoppingEffect ? styles.hopping : ""}`}
          src={resultImg}
          width={500}
          height={500}
          alt="Bravo icon"
        />
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
