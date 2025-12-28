import { useEffect, useState } from "react";
import styles from "./ButtonAnswer.module.css";

export default function ButtonAnswer({
  id = "",
  children,
  onClick,
  disabled,
  currentClickedAnswerData,
}) {
  const [additionalButtonStyle, setAdditionalButtonStyle] = useState("");
  console.log("currentClickedAnswerData", currentClickedAnswerData);

  useEffect(() => {
    if (
      currentClickedAnswerData.result !== "" &&
      currentClickedAnswerData.answer === children
    ) {
      if (currentClickedAnswerData.result === "correct") {
        console.log("Your answer is correct!", currentClickedAnswerData.answer);
        setAdditionalButtonStyle("correctAnswer");
      } else {
        setAdditionalButtonStyle("incorrectAnswer");
        console.log(
          "Your answer is incorrect.",
          currentClickedAnswerData.answer
        );
      }
    }
    return () => {
      setAdditionalButtonStyle("");
    };
  }, [currentClickedAnswerData]);

  return (
    <button
      id={id}
      className={`${styles.answerButton} ${styles[additionalButtonStyle]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
