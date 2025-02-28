"use client";
import quizStyles from "./quiz.module.css";
import buttonStyles from "@/components/atoms/ButtonAnswer/ButtonAnswer.module.css"; // Import button styles
import { useState } from "react";
import ButtonAnswer from "@/components/atoms/ButtonAnswer/ButtonAnswer";
import { QuizContext } from "../../context/AppContext";

export default function Quiz() {
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const { quizData } = QuizContext();

  const handleAnswer = (answer, questionIndex, answerIndex, correctAnswer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: {
        ...prev[questionIndex],
        [answerIndex]:
          answer === correctAnswer
            ? buttonStyles.correctAnswer
            : buttonStyles.incorrectAnswer,
      },
    }));

    if (answer === correctAnswer) {
      setTotalCorrectAnswers((prev) => prev + 1);
    }
  };

  return (
    <div className={quizStyles.quizContainer}>
      <h1>{quizData.category}</h1>
      <h1>{quizData.subcategory}</h1>
      <h2>🕒 {quizData.time} seconds</h2>
      <h2>Correct Answers: {totalCorrectAnswers}</h2>

      {quizData?.questions?.map((question, questionIndex) => (
        <div key={questionIndex} className={quizStyles.questionBlock}>
          <h2>{`${question.id}. ${question.title}`}</h2>

          {question.availableAnswers.map((answer, answerIndex) => (
            <div key={answerIndex} className={quizStyles.quizAnswersContainer}>
              <span>
                <ButtonAnswer
                  className={`${buttonStyles.answerButton} ${
                    selectedAnswers[questionIndex]?.[answerIndex] || ""
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
                    Object.keys(selectedAnswers[questionIndex] || {}).length > 0
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
  );
}
