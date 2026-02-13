"use client";
import Link from "next/link";
import styles from "../ButtonPlay/ButtonPlay.module.css";
import { QuizContext } from "../../../context/AppContext";
import { useCookies } from "react-cookie";

export default function ButtonPlay({ id, totalQuestions }) {
  const { setSelectedQuizId, setNumberOfQuestions } = QuizContext();
  const [, setCookie] = useCookies(["quiz_id"]);

  const handleButtonClick = () => {
    setSelectedQuizId(id);
    setNumberOfQuestions(totalQuestions);
    setCookie("quiz_id", id, { path: "/" });
    setCookie("total_questions", totalQuestions, { path: "/" });
  };

  return (
    <div className={styles.buttonContainer}>
      <Link href={"/quiz"}>
        <button onClick={handleButtonClick}>Παίξε!</button>
      </Link>
    </div>
  );
}
