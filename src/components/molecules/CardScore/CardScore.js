import styles from "./CardScore.module.css";
import Image from "next/image";
import { QuizContext } from "@/context/AppContext";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function CardScore({ lessonData }) {
  const { setShowPopUpConfirmation, setSelectedQuizId } = QuizContext();
  const [gainedAwards, setGainedAwards] = useState([]);

  useEffect(() => {
    setGainedAwards(
      [
        lessonData.quiz_completed && "red-book-completed-shadow",
        lessonData.silver_medals_counter > 0 && "silver-medal",
        lessonData.gold_medals_counter > 0 && "gold-medal",
        lessonData.golden_ribbon && "golden-ribbon-2",
      ].filter(Boolean),
    );
  }, []);

  const quizCompleted = lessonData.best_score >= 60;

  const handleDeleteClick = (lessonId) => {
    setShowPopUpConfirmation(true);
    setSelectedQuizId(lessonId);
  };

  return (
    <motion.div
      key={lessonData.lesson_id}
      className={`${styles.scoreCard} ${
        lessonData.best_score >= 100 && lessonData.stars >= 1000
          ? styles.goldenRibbon
          : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={`/images/bin.svg`}
        alt="delete icon"
        className={styles.binIcon}
        width={30}
        height={30}
        onClick={() => handleDeleteClick(lessonData.lesson_id)}
      />
      <div className={styles.title}>{lessonData.lesson_and_grade}</div>
      <div className={styles.scoreCardBody}>
        <div className={styles.status}>
          Κατάσταση:{" "}
          <div className={quizCompleted ? styles.statusCompleted : ""}>
            {lessonData.best_score >= 60 ? "Ολοκληρώθηκε!" : "Σε εκκρεμότητα"}
          </div>
        </div>
        <div className={styles.score}>
          Καλύτερη προσπάθεια: {lessonData.best_score}%
        </div>
        <div className={styles.bodyBottom}>
          <div className={styles.starsContainer}>
            <Image
              src={`/images/star.png`}
              alt="star"
              className={styles.starIcon}
              width={30}
              height={30}
            />
            <div>{lessonData.stars}</div>
          </div>
          <div className={styles.gainedMedalsContainer}>
            {gainedAwards.map((award) => (
              <Image
                key={award}
                src={`/images/${award}.png`}
                alt="medal"
                className={`${styles.medal} ${award === "golden-ribbon-2" ? styles.goldenRibbonAward : ""}`}
                width={50}
                height={50}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
