import styles from "../pages/quiz.module.css";
import theoryQuestions from "../data/theoryQuestions.json";
import { useState } from "react";

export default function Quiz() {
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Track clicked answers

  const handleAnswer = (answer, questionIndex, answerIndex, correctAnswer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: { ...prev[questionIndex], [answerIndex]: answer === correctAnswer ? styles.correctAnswer : styles.incorrectAnswer },
    }));

    if (answer === correctAnswer) {
      setTotalCorrectAnswers((prev) => prev + 1);
    }
  };

  return (
    <div className={styles.quizContainer}>
      <h1>{theoryQuestions.category}</h1>
      <h2>🕒 {theoryQuestions.time} seconds</h2>
      <h2>Correct Answers: {totalCorrectAnswers}</h2>

      {theoryQuestions.questions.map((question, questionIndex) => (
        <div key={questionIndex} className={styles.questionBlock}>
          <h2>{`${question.id}. ${question.title}`}</h2>

          {question.availableAnswers.map((answer, answerIndex) => (
            <div key={answerIndex} className={styles.quizAnswersContainer}>
              <span>
                <button
                  className={
                    selectedAnswers[questionIndex]?.[answerIndex] ||
                    styles.answerButton
                  }
                  onClick={() =>
                    handleAnswer(answer, questionIndex, answerIndex, question.correctAnswer)
                  }
                  disabled={Object.keys(selectedAnswers[questionIndex] || {}).length > 0} // Disable all buttons for this question after one is clicked
                >
                  {answer}
                </button>
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
