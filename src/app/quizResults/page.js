"use client";
import React from "react";
import Image from "next/image";
import styles from "./quizResults.module.css";
import { QuizContext } from "@/context/AppContext";
import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import Link from "next/link";

export default function quizResults() {
  const { selectedQuiz, clickedAnswersResults } = QuizContext();

  return (
    <>
      {selectedQuiz && (
        <div className={styles.quizResultsSection}>
          <div className={styles.questionsInfo}>
            <h3>{selectedQuiz.category}</h3>
            <h3>{selectedQuiz.subcategory}</h3>
            <h3>Σωστές Απαντήσεις:</h3>
          </div>
          <div className={styles.allQuestionsContainer}>
            {selectedQuiz?.questions?.map((question, questionIndex) => (
              <div key={questionIndex} className={styles.questionBlock}>
                <h3>{`${question.id}. ${question.title}`}</h3>

                {question.img && (
                  <Image
                    src={`/images/questions/music/${question.img}`}
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
                            item.incorrectAnswer === answer
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
          <Link className={styles.buttonOkContainer} href="/">
            <ButtonOk buttonText="Επιστροφή" />
          </Link>
        </div>
      )}
    </>
  );
}
