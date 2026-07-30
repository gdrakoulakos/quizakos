"use client";

import { useEffect, useState } from "react";
import styles from "./Anouncements.module.css";
import { AnimatePresence, motion } from "motion/react";

export default function Anouncements({ announcement, setAnnouncement }) {
  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  return (
    <AnimatePresence mode="wait">
      {announcement.display && (
        <motion.div
          className={styles.announcementsContainer}
          {...motionProps}
          key="announcementsContainer"
        >
          <div className={styles.container}>
            <button
              className={styles.closeButton}
              onClick={() => setAnnouncement({ display: false, message: "" })}
            >
              ×
            </button>
            <p className={styles.announcementText}>{announcement.message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
