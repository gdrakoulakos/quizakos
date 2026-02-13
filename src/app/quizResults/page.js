"use client";
import React from "react";
import Image from "next/image";
import styles from "./quizResults.module.css";
import { QuizContext } from "@/context/AppContext";
import { motion } from "motion/react";
import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";

export default function quizResults() {
  const { selectedQuiz, clickedAnswersResults } = QuizContext();

  return (
    <>
      {selectedQuiz && (
        <motion.div
          className={styles.quizResultsSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.questionsInfo}>
            <h3 className={styles.quizGradeAndLesson}>
              {selectedQuiz.grade} / {selectedQuiz.lesson}
            </h3>
            <h3></h3>
            <h3>Σωστές Απαντήσεις: {clickedAnswersResults.correctAnswers}</h3>
            <h3>Λάθος Απαντήσεις: {clickedAnswersResults.incorrectAnswers}</h3>
          </div>
          <div className={styles.allQuestionsContainer}>
            {selectedQuiz?.questions?.map((question, questionIndex) => (
              <div key={questionIndex} className={styles.questionBlock}>
                <h3>{`${question.title}`}</h3>

                {question.question_img && (
                  <Image
                    src={`/images/questions/music/${question.question_img}`}
                    alt="question image"
                    className={styles.questionImage}
                    width={240}
                    height={120}
                  />
                )}

                {question.availableAnswers.map((answer, answerIndex) => (
                  <div key={answerIndex} className={styles.answersContainer}>
                    <button
                      className={
                        clickedAnswersResults.incorrectAnswersData.some(
                          (item) =>
                            item.id === question.id &&
                            item.incorrectAnswer === answer,
                        )
                          ? styles.incorrectAnswer
                          : question.correctAnswer === answer
                            ? styles.correctAnswer
                            : ""
                      }
                    >
                      {answer}
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className={styles.buttonOkContainer}>
            <ButtonOk buttonText="Επιστροφή" />
          </div>
        </motion.div>
      )}
    </>
  );
}
