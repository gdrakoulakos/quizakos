"use client";
import styles from "./quiz.module.css";
import buttonStyles from "@/components/atoms/ButtonAnswer/ButtonAnswer.module.css"; // Import button styles
import { useEffect, useState } from "react";
import ButtonAnswer from "@/components/atoms/ButtonAnswer/ButtonAnswer";
import { QuizContext } from "../../context/AppContext";
import PopUpResults from "@/components/molecules/PopUpResults/PopUpResults";

export default function Quiz() {
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [completionStatus, setCompletionStatus] = useState(0);
  const [showPopUpResults, setShowPopUpResults] = useState(false);
  const { selectedQuiz } = QuizContext();

  const handleAnswer = (answer, questionIndex, answerIndex, correctAnswer) => {
    setCompletionStatus((prev) => prev + 100 / selectedQuiz.questions.length);
    setSelectedAnswers((prev) => {
      const isCorrect = answer === correctAnswer;
      completionStatus + 8;
      return {
        ...prev,
        [questionIndex]: {
          ...prev[questionIndex],
          [answerIndex]: isCorrect
            ? buttonStyles.correctAnswer
            : buttonStyles.incorrectAnswer,
          correctIndex: isCorrect ? null : correctAnswer,
        },
      };
    });

    if (answer === correctAnswer) {
      setTotalCorrectAnswers((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (completionStatus === 100) {
      setTimeout(() => {
        setShowPopUpResults(true);
      }, 500);
    }
  }, [completionStatus]);

  return (
    <>
      {showPopUpResults && (
        <PopUpResults
          congratulationsMessage={"Μπράβο! Τα πήγες πολύ καλά!"}
          resultMessage={"Το σκορ σου είναι:"}
          correctAnswers={`${totalCorrectAnswers} /
                ${selectedQuiz.questions.length}`}
          onClick={() => setShowPopUpResults(false)}
        />
      )}
      {selectedQuiz && (
        <div className={styles.quizContainer}>
          <div className={styles.questionsInfo}>
            <div className={styles.questionsInfoTop}>
              <h3>{selectedQuiz.category}</h3>
              <h3>{selectedQuiz.subcategory}</h3>
            </div>
            <div className={styles.questionsInfoBottom}>
              <div className={styles.progressBarBorder}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${completionStatus}%` }}
                >{`${completionStatus}%`}</div>
              </div>
              <div className={styles.score}>
                Σωστές Απαντήσεις: {totalCorrectAnswers} /{" "}
                {selectedQuiz.questions.length}
              </div>
            </div>
          </div>
          <div className={styles.allQuestionsContainer}>
            {selectedQuiz?.questions?.map((question, questionIndex) => (
              <div key={questionIndex} className={styles.questionBlock}>
                <h3>{`${question.id}. ${question.title}`}</h3>

                {question.availableAnswers.map((answer, answerIndex) => (
                  <div key={answerIndex} className={styles.answersContainer}>
                    <span>
                      <ButtonAnswer
                        className={`${buttonStyles.answerButton} ${
                          selectedAnswers[questionIndex]?.[answerIndex] ||
                          (selectedAnswers[questionIndex]?.correctIndex ===
                          answer
                            ? buttonStyles.correctAnswer
                            : "")
                        }`}
                        onClick={() =>
                          handleAnswer(
                            answer,
                            questionIndex,
                            answerIndex,
                            question.correctAnswer
                          )
                        }
                        disabled={
                          Object.keys(selectedAnswers[questionIndex] || {})
                            .length > 0
                        }
                      >
                        {answer}
                      </ButtonAnswer>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
