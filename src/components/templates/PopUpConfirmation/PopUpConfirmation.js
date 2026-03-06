import styles from "./PopUpConfirmation.module.css";
import ButtonYesNo from "@/components/atoms/ButtonYesNo/ButtonYesNo";
import { QuizContext } from "@/context/AppContext";
import { motion } from "motion/react";

export default function PopUpConfirmation() {
  const { setShowPopUpConfirmation, selectedQuizId } = QuizContext();

  const buttonsData = [
    { name: "Ναι", action: "yes" },
    { name: "Όχι", action: "no" },
  ];

  const handleButtonClick = (action) => {
    if (action !== "yes") {
      setShowPopUpConfirmation(false);
      return;
    }
    try {
      const stored = localStorage.getItem("quiz_results");
      const progressData = stored ? JSON.parse(stored) : [];

      const updatedResults = progressData.filter(
        (lesson) => lesson.lesson_id !== selectedQuizId,
      );
      localStorage.setItem("quiz_results", JSON.stringify(updatedResults));
      window.dispatchEvent(new Event("quiz_results_updated"));
    } catch (error) {
      console.error("Failed to update quiz results:", error);
    }
    setShowPopUpConfirmation(false);
  };

  return (
    <div className={styles.popUpConfirmationWrapper}>
      <motion.div
        className={styles.popUpConfirmationSection}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3>
          Θες σίγουρα να διαγράψεις τα αποτελέσματα και τα βραβεία σου για το
          συγκεκριμένο μάθημα;
        </h3>
        <div className={styles.buttonContainer}>
          {buttonsData.map((button, index) => (
            <ButtonYesNo
              key={index}
              name={button.name}
              handleButtonClick={() => handleButtonClick(button.action)}
              action={button.action}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
