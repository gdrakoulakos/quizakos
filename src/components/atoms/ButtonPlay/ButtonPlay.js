"use client";
import Link from "next/link";
import styles from "../ButtonPlay/ButtonPlay.module.css";
import { QuizContext } from "../../../context/AppContext";

export default function ButtonPlay({ id }) {
  const { setSelectedQuizId } = QuizContext();
  return (
    <div className={styles.buttonContainer}>
      <Link href={"/q"}>
        <button onClick={() => setSelectedQuizId(id)}>Παίξε!</button>
      </Link>
    </div>
  );
}
