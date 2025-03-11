"use client";
import styles from "./quiz.module.css";
import buttonStyles from "@/components/atoms/ButtonAnswer/ButtonAnswer.module.css"; // Import button styles
import { useEffect, useRef, useState } from "react";
import ButtonAnswer from "@/components/atoms/ButtonAnswer/ButtonAnswer";
import { QuizContext } from "../../context/AppContext";
import PopUpResults from "@/components/molecules/PopUpResults/PopUpResults";

export default function Quiz() {
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [completionStatus, setCompletionStatus] = useState(0);
  const [showPopUpResults, setShowPopUpResults] = useState(false);
  const [congratulationsMessage, setCongratulationsMessage] = useState(null);
  const [congratsImg, setCongratsImg] = useState(null);
  const [scorePercentage, setScorePercentage] = useState(null);
  const { selectedQuiz } = QuizContext();

  const questionRefs = useRef([]);
  const totalAvailableQuestions = selectedQuiz.questions.length;

  const scrollToNextQuestion = (nextIndex) => {
    if (questionRefs.current[nextIndex]) {
      questionRefs.current[nextIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleClickedAnswer = (
    answer,
    questionIndex,
    answerIndex,
    correctAnswer
  ) => {
    setCompletionStatus((prev) => prev + 100 / totalAvailableQuestions);
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

    setTimeout(() => {
      scrollToNextQuestion(questionIndex + 1);
    }, 2000);

    if (answer === correctAnswer) {
      setTotalCorrectAnswers((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (completionStatus === 100) {
      setTimeout(() => {
        setShowPopUpResults(true);
      }, 500);
      if (scorePercentage >= 90) {
        setCongratulationsMessage("Είσαι αληθινός γνώστης! Συνέχισε έτσι!");
        setCongratsImg("/images/bravo4.gif");
      } else if (scorePercentage >= 70) {
        setCongratulationsMessage(
          "Εξαιρετική προσπάθεια! Συνέχισε έτσι και θα φτάσεις στην κορυφή!"
        );
        setCongratsImg("/images/bravo3.png");
      } else if (scorePercentage >= 40) {
        setCongratulationsMessage("Καλή προσπάθεια! Μπορείς ακόμα καλύτερα!");
        setCongratsImg("/images/bravo2.png");
      } else {
        setCongratulationsMessage(
          "Μην το βάζεις κάτω! Προσπάθησε ξανά και θα τα καταφέρεις!"
        );
        setCongratsImg("/images/bravo1.png");
      }
    }
  }, [completionStatus]);

  useEffect(() => {
    setScorePercentage((totalCorrectAnswers / totalAvailableQuestions) * 100);
  }, [totalCorrectAnswers]);

  return (
    <>
      {showPopUpResults && (
        <PopUpResults
          congratsImg={congratsImg}
          congratulationsMessage={congratulationsMessage}
          resultMessage={"Το σκορ σου είναι:"}
          correctAnswers={`${totalCorrectAnswers} /
                ${totalAvailableQuestions}`}
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
                {totalAvailableQuestions}
              </div>
            </div>
          </div>
          <div className={styles.allQuestionsContainer}>
            {selectedQuiz?.questions?.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className={styles.questionBlock}
                ref={(el) => (questionRefs.current[questionIndex] = el)}
              >
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
                          handleClickedAnswer(
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
