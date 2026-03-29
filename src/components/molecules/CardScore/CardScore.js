import styles from "./CardScore.module.css";
import Image from "next/image";
import { QuizContext } from "@/context/AppContext";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Award from "../Award/Award";

export default function CardScore({ lessonData }) {
  const {
    setShowPopUpConfirmation,
    setSelectedQuizId,
    setPopUpMessage,
    setShowPopUpAwardsInfo,
  } = QuizContext();
  const [gainedAwards, setGainedAwards] = useState([]);
  const goldenRibbonGained = lessonData.golden_ribbon;

  useEffect(() => {
    setGainedAwards(
      [
        lessonData.quiz_completed && { img: "book-completed" },
        lessonData.silver_medals_counter > 0 && {
          img: "silver-medal",
          count: lessonData.silver_medals_counter,
        },
        lessonData.gold_medals_counter > 0 && {
          img: "gold-medal",
          count: lessonData.gold_medals_counter,
        },
      ].filter(Boolean),
    );
  }, []);

  const quizCompleted = lessonData.best_score >= 60;

  const handleDeleteClick = (lessonId) => {
    setShowPopUpConfirmation(true);
    setSelectedQuizId(lessonId);
    setPopUpMessage(
      "Θες σίγουρα να διαγράψεις τα αποτελέσματα και τα βραβεία σου για το συγκεκριμένο μάθημα;",
    );
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
      {goldenRibbonGained && (
        <Image
          src={`/images/golden-ribbon-2.png`}
          alt="golden ribbon"
          className={styles.goldenRibbonAward}
          width={50}
          height={50}
        />
      )}
      <Image
        src={`/images/bin.svg`}
        alt="delete icon"
        className={styles.binIcon}
        width={100}
        height={60}
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
          Καλύτερο Σκορ: {lessonData.best_score}%
        </div>
        <div className={styles.bodyBottom}>
          <div
            className={styles.starsContainer}
            onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
          >
            <Image
              src={`/images/star-6.png`}
              alt="star"
              className={styles.starIcon}
              width={20}
              height={20}
            />
            <div className={styles.starsCounter}>{lessonData.stars}</div>
          </div>
          <div className={styles.gainedAwardContainer}>
            {gainedAwards.map((award) => (
              <div key={award.name} className={styles.awardContainer}>
                {award.count > 1 && (
                  <div className={styles.awardCounter}>{award.count}</div>
                )}
                <Award key={award.name} awardData={award} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
