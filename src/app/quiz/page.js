"use client";
import styles from "./quiz.module.css";
import QuizCardQuestion from "@/components/organisms/QuizCardQuestion/QuizCardQuestion";
import { QuizContext } from "../../context/AppContext";
import { AnimatePresence, motion } from "motion/react";
import LoadingSpinner from "@/components/organisms/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function quiz() {
  const { displayedQuestionIndex, selectedQuiz, setDefaultQuestions } =
    QuizContext();

  const motionProps = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.2 },
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("default_questions").select(`
        *,
        lesson:default_lessons!lesson_id (
          id,
          lesson_name,
          grade:default_grades!grade_id (
            id,
            grade_name
          )
        )
      `);

      if (error) {
        console.error(error);
      } else {
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setDefaultQuestions(shuffled);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {selectedQuiz ? (
        <AnimatePresence mode="wait">
          <div className={styles.quizSection}>
            <motion.div
              className={styles.quizNew}
              key={displayedQuestionIndex}
              {...motionProps}
            >
              <QuizCardQuestion />
            </motion.div>
          </div>
        </AnimatePresence>
      ) : (
        <LoadingSpinner message="Φόρτωση quiz..." />
      )}
    </>
  );
}
