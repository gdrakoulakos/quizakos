"use client";
import CardsScore from "@/components/organisms/CardsScore/CardsScore";
import styles from "./myScore.module.css";
import { QuizContext } from "@/context/AppContext";
import Image from "next/image";
import PopUpConfirmation from "@/components/templates/PopUpConfirmation/PopUpConfirmation";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import PopUpAwardsInfo from "@/components/templates/PopUpAwardsInfo/PopUpAwardsInfo";
import { supabase } from "@/lib/supabase";

export default function myScore() {
  const {
    userProgressData,
    showPopUpConfirmation,
    setDeleteAllScores,
    isLoggedIn,
    loggedInUserQuizProgress,
  } = QuizContext();

  const [userQuizData, setUserQuizData] = useState([]);

  useEffect(() => {
    setDeleteAllScores(false);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setUserQuizData(loggedInUserQuizProgress);
    } else {
      setUserQuizData(userProgressData);
    }
  }, [supabase, userProgressData, isLoggedIn, loggedInUserQuizProgress]);

  return (
    <motion.div
      className={styles.scoreSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PopUpAwardsInfo />
      <PopUpConfirmation />
      <h1>Το σκορ μου</h1>
      {userQuizData.length !== 0 ? (
        <CardsScore />
      ) : (
        <>
          <div className={styles.noScore}>
            Ωχ! Δεν βλέπω σκορ… Μάλλον δεν έχεις παίξει ακόμα κάποιο quiz!
          </div>
          <Image
            className={styles.noScoreIcon}
            src="/images/quizakos/quizakos12-shadow.png"
            alt="Quizakos"
            width={400}
            height={400}
            loading="eager"
          />
        </>
      )}
    </motion.div>
  );
}
