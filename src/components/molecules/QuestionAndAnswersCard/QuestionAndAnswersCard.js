import styles from "./QuestionAndAnswersCard.module.css";
import QuizQuestion from "@/components/atoms/QuizQuestion/QuizQuestion";
import ButtonAnswer from "@/components/atoms/ButtonAnswer/ButtonAnswer";
import QuestionImage from "@/components/atoms/QuestionImage/QuestionImage";
import { QuizContext } from "@/context/AppContext";
import { useState } from "react";
import ButtonNext from "@/components/atoms/ButtonNext/ButtonNext";
import PopUpResults from "../PopUpResults/PopUpResults";

export default function QuestionAndAnswersCard() {
  const {
    selectedQuiz,
    setDisplayedQuestionIndex,
    displayedQuestionIndex,
    clickedAnswersResults,
    setClickedAnswersResults,
    showPopUpResults,
    setShowPopUpResults,
  } = QuizContext();

  const [currentClickedAnswerData, setCurrentClickedAnswerData] = useState({
    result: "",
    answer: "",
  });

  const totalQuestionsAnswered = clickedAnswersResults.totalAnswers;

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
  };

  const handleNextQuestion = () => {
    if (displayedQuestionIndex < 9) {
      setDisplayedQuestionIndex((prev) => prev + 1);
      setCurrentClickedAnswerData({ result: "", answer: "" });
    } else {
      setShowPopUpResults(true);
    }
  };

  return (
    <div className={styles.section}>
      {showPopUpResults && (
        <PopUpResults
          correctAnswers={`${clickedAnswersResults.correctAnswers} /
                    ${clickedAnswersResults.totalAnswers}`}
        />
      )}
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
      {currentClickedAnswerData.result !== "" && (
        <ButtonNext
          onClick={handleNextQuestion}
          buttonText={totalQuestionsAnswered < 10 ? "Επόμενη" : "Τέλος"}
        />
      )}
    </div>
  );
}
