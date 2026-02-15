"use client";
import CardsScore from "@/components/organisms/CardsScore/CardsScore";
import styles from "./myScore.module.css";
import { QuizContext } from "@/context/AppContext";
import Image from "next/image";
import { motion } from "motion/react";

export default function myScore() {
  const { userProgressData } = QuizContext();
  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div className={styles.scoreSection} {...motionProps}>
      <h1>Το σκορ μου</h1>
      {userProgressData ? (
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
