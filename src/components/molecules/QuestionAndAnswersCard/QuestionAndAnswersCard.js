import styles from "./QuestionAndAnswersCard.module.css";
import QuizQuestion from "@/components/atoms/QuizQuestion/QuizQuestion";
import ButtonAnswer from "@/components/atoms/ButtonAnswer/ButtonAnswer";
import QuestionImage from "@/components/atoms/QuestionImage/QuestionImage";
import { QuizContext } from "@/context/AppContext";
import { useState } from "react";

export default function QuestionAndAnswersCard() {
  const {
    selectedQuiz,
    setDisplayedQuestionIndex,
    displayedQuestionIndex,
    clickedAnswersResults,
    setClickedAnswersResults,
  } = QuizContext();

  const [currentClickedAnswerData, setCurrentClickedAnswerData] = useState({
    result: "",
    answer: "",
  });

  const availableAnswers =
    selectedQuiz?.questions[displayedQuestionIndex]?.availableAnswers;

  const correctAnswer =
    selectedQuiz?.questions[displayedQuestionIndex]?.correctAnswer;

  const handleClickedAnswer = (clickedAnswer) => {
    if (clickedAnswersResults.totalAnswers < 10) {
      if (clickedAnswer === correctAnswer) {
        setClickedAnswersResults((prev) => ({
          ...prev,
          correctAnswers: prev.correctAnswers + 1,
          totalAnswers: prev.totalAnswers + 1,
        }));
        setCurrentClickedAnswerData({
          result: "correct",
          answer: clickedAnswer,
        });
      } else {
        setClickedAnswersResults((prev) => ({
          ...prev,
          incorrectAnswers: prev.incorrectAnswers + 1,
          totalAnswers: prev.totalAnswers + 1,
          incorrectAnswersData: [
            ...prev.incorrectAnswersData,
            {
              id: selectedQuiz.questions[displayedQuestionIndex].id,
              incorrectAnswer: clickedAnswer,
            },
          ],
        }));
        setCurrentClickedAnswerData({
          result: "incorrect",
          answer: clickedAnswer,
        });
      }
    }
    if (displayedQuestionIndex < 9) {
      setTimeout(() => {
        setDisplayedQuestionIndex((prev) => prev + 1);
        setCurrentClickedAnswerData({ result: "", answer: "" });
      }, 2000);
    }
  };

  return (
    <div className={styles.section}>
      <div className={styles.questionContainer}>
        <QuestionImage />
        <QuizQuestion />
      </div>
      <div className={styles.answersContainer}>
        {availableAnswers?.map((availableAnswer, index) => (
          <ButtonAnswer
            key={index}
            children={availableAnswer}
            onClick={() => handleClickedAnswer(availableAnswer)}
            currentClickedAnswerData={currentClickedAnswerData}
            correctAnswer={correctAnswer}
          />
        ))}
      </div>
    </div>
  );
}
