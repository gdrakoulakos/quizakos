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

  useEffect(() => {
    if (
      currentClickedAnswerData.result !== "" &&
      currentClickedAnswerData.answer === children
    ) {
      if (currentClickedAnswerData.result === "correct") {
        setAdditionalButtonStyle("correctAnswer");
      } else {
        setAdditionalButtonStyle("incorrectAnswer");
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
      disabled={currentClickedAnswerData?.result !== "" ? true : disabled}
    >
      {children}
    </button>
  );
}
