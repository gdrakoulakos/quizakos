"use client";
import Link from "next/link";
import styles from "../ButtonPlay/ButtonPlay.module.css";
import { QuizContext } from "../../../context/AppContext";

export default function ButtonPlay({ id }) {
  const { setSelectedQuizId } = QuizContext();
  return (
    <div className={styles.buttonContainer}>
      <Link href={"/quiz"}>
        <button onClick={() => setSelectedQuizId(id)}>Play Now</button>
      </Link>
    </div>
  );
}
