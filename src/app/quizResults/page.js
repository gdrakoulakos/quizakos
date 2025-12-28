"use client";
import React from "react";
import styles from "./quizResults.module.css";
import { QuizContext } from "@/context/AppContext";

export default function quizResults() {
  const { selectedQuiz } = QuizContext();
  console.log("selectedQuiz", selectedQuiz);

  return (
    <div className={styles.quizResultsSection}>
      {selectedQuiz.questions.map((quiz, index) => (
        <React.Fragment key={index}>
          <h2 className={styles.quizTitle}>{quiz?.title}</h2>

          {quiz.availableAnswers.map((answer, answerIndex) => (
            <div key={answerIndex} className={styles.answerContainer}>
              <p className={styles.answerText}>{answer}</p>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
