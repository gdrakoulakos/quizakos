"use client";
import CardsScore from "@/components/organisms/CardsScore/CardsScore";
import styles from "./myScore.module.css";
import { QuizContext } from "@/context/AppContext";
import Image from "next/image";
import { motion } from "motion/react";
import PopUpConfirmation from "@/components/templates/PopUpConfirmation/PopUpConfirmation";

export default function myScore() {
  const { userProgressData, showPopUpConfirmation } = QuizContext();
  const motionProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div className={styles.scoreSection} {...motionProps}>
      {showPopUpConfirmation && <PopUpConfirmation />}
      <h1>Το σκορ μου</h1>
      {userProgressData.length !== 0 ? (
        <CardsScore />
      ) : (
        <>
          <div className={styles.noScore}>
            Ωχ! Δεν βλέπω σκορ… Μάλλον δεν έχεις παίξει ακόμα κάποιο quiz!
          </div>
          <Image
            className={styles.noScoreIcon}
            src="/images/quizakos/quizakos12.png"
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
