import styles from "./CardScore.module.css";
import Image from "next/image";
import { QuizContext } from "@/context/AppContext";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function CardScore({ lessonData }) {
  const {
    setShowPopUpConfirmation,
    setSelectedQuizId,
    setPopUpMessage,
    setShowPopUpAwardsInfo,
  } = QuizContext();
  const [gainedAwards, setGainedAwards] = useState([]);

  useEffect(() => {
    setGainedAwards(
      [
        lessonData.quiz_completed && { name: "book-completed" },
        lessonData.silver_medals_counter > 0 && {
          name: "silver-medal",
          count: lessonData.silver_medals_counter,
        },
        lessonData.gold_medals_counter > 0 && {
          name: "gold-medal",
          count: lessonData.gold_medals_counter,
        },
        lessonData.golden_ribbon && { name: "golden-ribbon-2" },
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

  console.log("gainedAwards", gainedAwards);

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
              src={`/images/star.png`}
              alt="star"
              className={styles.starIcon}
              width={30}
              height={30}
            />
            <div>{lessonData.stars}</div>
          </div>
          <div className={styles.gainedAwardContainer}>
            {gainedAwards.map((award) => (
              <div key={award.name} className={styles.awardContainer}>
                {award.count > 1 && (
                  <div className={styles.awardCounter}>{award.count}</div>
                )}
                <Image
                  key={award.name}
                  src={`/images/${award.name}.png`}
                  alt="medal"
                  className={`${styles.award} ${award.name === "golden-ribbon-2" ? styles.goldenRibbonAward : ""}`}
                  width={50}
                  height={50}
                  onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
