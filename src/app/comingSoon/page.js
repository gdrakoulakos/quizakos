"use client";
import Image from "next/image";
import styles from "./commingSoon.module.css";
import { motion, AnimatePresence } from "motion/react";

export default function commingSoon() {
  const randomNumber = Math.floor(Math.random() * 1000);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.comingSoonContainer}
        key={randomNumber}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.textContainer}>
          <h1>Σύντομα κοντά σου!</h1>
          <p className={styles.comingSoonText}>
            Ο Quizakos χρειάζεται λίγο χρόνο ακόμα για την συγκεκριμένη
            λειτουργία...
          </p>
        </div>
        <Image
          className={styles.comingSoonImage}
          src="/images/quizakos/quizakos-coding-3.png"
          alt="Coming Soon"
          width={400}
          height={400}
          loading="eager"
        />
      </motion.div>
    </AnimatePresence>
  );
}
