"use client";
import styles from "./page.module.css";
import WelcomeBanner from "@/components/organisms/WelcomeBanner/WelcomeBanner";
import Quizzes from "@/components/organisms/Quizzes/Quizzes";
import { QuizContext } from "../context/AppContext";
import { useEffect } from "react";
import { motion } from "motion/react";

export default function Home() {
  const {
    allQuizCategories,
    setDisplayedQuestionIndex,
    setClickedAnswersResults,
  } = QuizContext();

  useEffect(() => {
    setDisplayedQuestionIndex(0);
    setClickedAnswersResults({
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalAnswers: 0,
      incorrectAnswersData: [],
    });
  }, []);

  return (
    <motion.div
      className={styles.homePage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <WelcomeBanner />
      {allQuizCategories.map((quiz) => (
        <div key={quiz}>
          <Quizzes category={quiz} />
        </div>
      ))}
    </motion.div>
  );
}
