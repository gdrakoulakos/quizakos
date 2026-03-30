import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpResults.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { QuizContext } from "@/context/AppContext";
import { useLaunchConfetti } from "@/customHooks";
import Award from "@/components/atoms/Award/Award";

export default function PopUpResults({ correctAnswers, lessonAndGrade }) {
  const { clickedAnswersResults, selectedQuizId, userProgressData } =
    QuizContext();
  const [congratulationsMessage, setCongratulationsMessage] = useState(null);
  const [resultImg, setResultImg] = useState("/images/quizakos/guizakos1.png");
  const [medal, setMedal] = useState(null);
  const [hoppingEffect, setHoppingEffect] = useState(false);
  const launchConfetti = useLaunchConfetti;

  const totalAnswersLength = clickedAnswersResults.totalAnswers;
  const correctAnswersLength = clickedAnswersResults.correctAnswers;
  const scorePercentage = (correctAnswersLength / totalAnswersLength) * 100;

  const hasStoredResult = useRef(false);
  const lessonExistsInStoredResults = userProgressData.find(
    (lesson) => lesson.lesson_id === selectedQuizId,
  );

  useEffect(() => {
    if (!selectedQuizId || hasStoredResult.current) return;
    hasStoredResult.current = true;

    const newResults = {
      lesson_id: selectedQuizId,
      best_score: scorePercentage,
      stars: correctAnswersLength * 10,
      lesson_and_grade: lessonAndGrade,
      gold_medals_counter: scorePercentage === 100 ? 1 : 0,
      silver_medals_counter:
        scorePercentage >= 80 && scorePercentage <= 90 ? 1 : 0,
      golden_ribbon: false,
      quiz_completed: scorePercentage >= 60 ? true : false,
    };

    if (!lessonExistsInStoredResults) {
      const updatedResults = [...userProgressData, newResults];
      localStorage.setItem("quiz_results", JSON.stringify(updatedResults));
      window.dispatchEvent(new Event("quiz_results_updated"));
    } else if (
      lessonExistsInStoredResults &&
      lessonExistsInStoredResults.best_score < scorePercentage
    ) {
      const updatedResults = userProgressData.map((lesson) =>
        lesson.lesson_id === selectedQuizId
          ? {
              ...lesson,
              best_score: scorePercentage,
              stars: Number(lesson.stars) + correctAnswersLength * 10,
              gold_medals_counter:
                scorePercentage === 100
                  ? (lesson.gold_medals_counter || 0) + 1
                  : lesson.gold_medals_counter,
              quiz_completed: true,
              silver_medals_counter:
                scorePercentage >= 80 && scorePercentage < 100
                  ? (lesson.silver_medals_counter || 0) + 1
                  : lesson.silver_medals_counter,
            }
          : lesson,
      );
      localStorage.setItem("quiz_results", JSON.stringify(updatedResults));
      window.dispatchEvent(new Event("quiz_results_updated"));
    } else if (
      lessonExistsInStoredResults &&
      lessonExistsInStoredResults.best_score >= scorePercentage
    ) {
      const updatedResults = userProgressData.map((lesson) =>
        lesson.lesson_id === selectedQuizId
          ? {
              ...lesson,
              stars: Number(lesson.stars) + correctAnswersLength * 10,
              gold_medals_counter:
                scorePercentage === 100
                  ? (lesson.gold_medals_counter || 0) + 1
                  : lesson.gold_medals_counter,
              quiz_completed: true,
              silver_medals_counter:
                scorePercentage >= 80 && scorePercentage < 100
                  ? (lesson.silver_medals_counter || 0) + 1
                  : lesson.silver_medals_counter,
            }
          : lesson,
      );
      localStorage.setItem("quiz_results", JSON.stringify(updatedResults));
      window.dispatchEvent(new Event("quiz_results_updated"));
    }
  }, [selectedQuizId, scorePercentage]);

  useEffect(() => {
    if (scorePercentage === 100) {
      setMedal("/images/medal-one-shadow.png");
      setResultImg("/images/quizakos/quizakos-with-friends-4.png");
      setCongratulationsMessage("ΜΠΡΑΒΟ! Τα κατάφερες τέλεια!");
      setHoppingEffect(true);
      setTimeout(() => {
        launchConfetti();
      }, 500);
    } else if (scorePercentage >= 80) {
      setMedal("/images/medal-two-shadow.png");
      setResultImg("/images/quizakos/quizakos4-shadow.png");
      setCongratulationsMessage("Μπράβο! Τα πήγες εξαιρετικά!");
    } else if (scorePercentage >= 60) {
      setResultImg("/images/quizakos/quizakos3-shadow.png");
      setCongratulationsMessage("Τα πήγες πολύ καλά! Συνέχισε έτσι!");
    } else if (scorePercentage >= 40) {
      setResultImg("/images/quizakos/quizakos2-shadow.png");
      setCongratulationsMessage("Ωραία προσπάθεια! Μπορείς και καλύτερα!");
    } else {
      setResultImg("/images/quizakos/quizakos1-shadow.png");
      setCongratulationsMessage("Μην τα παρατάς! Κάθε προσπάθεια μετράει!");
    }
  }, [scorePercentage]);

  useEffect(() => {
    if (!!lessonExistsInStoredResults) {
      const goldMedalsGained = lessonExistsInStoredResults.gold_medals_counter;
      const starsGained = lessonExistsInStoredResults.stars;
      const goldenRibbonGained =
        goldMedalsGained >= 1 && starsGained >= 1000 ? true : false;

      if (goldenRibbonGained && !lessonExistsInStoredResults.golden_ribbon) {
        setMedal("/images/golden-ribbon-shadow.png");
        const updatedResults = userProgressData.map((lesson) =>
          lesson.lesson_id === selectedQuizId
            ? {
                ...lesson,
                golden_ribbon: true,
              }
            : lesson,
        );
        localStorage.setItem("quiz_results", JSON.stringify(updatedResults));
        window.dispatchEvent(new Event("quiz_results_updated"));
      }
    }
    [lessonExistsInStoredResults, scorePercentage];
  });

  return (
    <motion.div
      className={styles.blurBackground}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.popUpResultsContainer}>
        {medal && (
          <motion.div
            className={styles.medalContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <Image
              className={styles.medal}
              src={medal}
              width={100}
              height={100}
              alt="Bravo icon"
            />
          </motion.div>
        )}
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
        {correctAnswersLength > 0 && (
          <div className={styles.starsEarned}>
            <div className={styles.congratulationsMessage}>
              {`+ ${correctAnswersLength * 10} `}
            </div>
            <Award awardData={{ img: "star-6" }} />
          </div>
        )}
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
