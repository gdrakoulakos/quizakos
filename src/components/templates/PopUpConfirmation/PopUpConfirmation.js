import styles from "./PopUpConfirmation.module.css";
import ButtonYesNo from "@/components/atoms/ButtonYesNo/ButtonYesNo";
import { QuizContext } from "@/context/AppContext";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";

export default function PopUpConfirmation() {
  const {
    setShowPopUpConfirmation,
    selectedQuizId,
    popUpMessage,
    deleteAllScores,
    setDeleteAllScores,
    showPopUpConfirmation,
    isLoggedIn,
    loggedInUserQuizProgress,
    loggedInUserData,
    fetchUserQuizProgress,
  } = QuizContext();

  const buttonsData = [
    { name: "Ναι", action: "yes" },
    { name: "Όχι", action: "no" },
  ];

  const handleButtonClick = async (action) => {
    if (action !== "yes") {
      setShowPopUpConfirmation(false);
      setDeleteAllScores(false);
      return;
    }

    if (isLoggedIn) {
      const success = await deleteQuizProgress();
      if (!success) return;
      await fetchUserQuizProgress();
    }

    try {
      const stored = localStorage.getItem("quiz_results");
      const progressData = stored ? JSON.parse(stored) : [];

      const updatedResults = deleteAllScores
        ? []
        : progressData.filter((lesson) => lesson.lesson_id !== selectedQuizId);

      localStorage.setItem("quiz_results", JSON.stringify(updatedResults));

      window.dispatchEvent(new Event("quiz_results_updated"));
    } catch (error) {
      console.error(error);
    }

    setShowPopUpConfirmation(false);
  };

  async function deleteQuizProgress() {
    let query = supabase
      .from("user_lesson_progress")
      .delete()
      .eq("user_id", loggedInUserData?.id);

    if (!deleteAllScores) {
      query = query.eq("lesson_id", selectedQuizId);
    }

    const { error } = await query;

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  return (
    <>
      {showPopUpConfirmation && (
        <div className={styles.popUpConfirmationWrapper}>
          <motion.div
            className={styles.popUpConfirmationSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{popUpMessage}</h3>
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
      )}
    </>
  );
}
