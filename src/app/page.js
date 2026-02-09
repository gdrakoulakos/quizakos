"use client";
import styles from "./page.module.css";
import WelcomeBanner from "@/components/organisms/WelcomeBanner/WelcomeBanner";
import { QuizContext } from "../context/AppContext";
import { useEffect } from "react";
import { motion } from "motion/react";
import CardQuizzesSection from "@/components/templates/CardQuizzesSection/CardQuizzesSection";
import LoadingSpinner from "@/components/organisms/LoadingSpinner/LoadingSpinner";
import Anouncements from "@/components/organisms/Anouncements/Anouncements";

export default function Home() {
  const {
    currentInstitutionData,
    setCurrentInstitution,
    setDisplayedQuestionIndex,
    setClickedAnswersResults,
    setShowPopUpResults,
    setSelectedQuiz,
  } = QuizContext();

  useEffect(() => {
    setCurrentInstitution("default");
    setDisplayedQuestionIndex(0);
    setClickedAnswersResults({
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalAnswers: 0,
      incorrectAnswersData: [],
    });
    setShowPopUpResults(false);
    setSelectedQuiz(null);
  }, []);

  return (
    <>
      <Anouncements />
      <motion.div
        className={styles.homePage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <WelcomeBanner />
      </motion.div>
      <motion.div
        key={"all-quizzes"}
        className={styles.allQuizzes}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {currentInstitutionData?.length === 0 ? (
          <LoadingSpinner message={"Φόρτωση..."} />
        ) : (
          <CardQuizzesSection currentInstitutionData={currentInstitutionData} />
        )}
      </motion.div>
    </>
  );
}
