import CardScore from "@/components/molecules/CardScore/CardScore";
import styles from "./CardsScore.module.css";
import { QuizContext } from "@/context/AppContext";
import { AnimatePresence } from "motion/react";

export default function CardsScore({}) {
  const {
    userProgressData,
    setShowPopUpConfirmation,
    setPopUpMessage,
    setDeleteAllScores,
  } = QuizContext();

  const sortedUserProgressData = userProgressData.sort(
    (a, b) => a.lesson_id - b.lesson_id,
  );

  const handleButtonClick = () => {
    setShowPopUpConfirmation(true);
    setPopUpMessage(
      "Θες σίγουρα να διαγράψεις τα αποτελέσματα και τα βραβεία σου για όλα τα μαθήματα;",
    );
    setDeleteAllScores(true);
  };

  return (
    <div className={styles.scoreCards}>
      <AnimatePresence>
        {sortedUserProgressData.map((lessonData) => (
          <CardScore lessonData={lessonData} key={lessonData.lesson_id} />
        ))}
      </AnimatePresence>

      {sortedUserProgressData.length > 1 && (
        <button
          className={styles.deleteAllButton}
          onClick={() => handleButtonClick()}
        >
          Διαγραφή Όλων
        </button>
      )}
    </div>
  );
}
