"use client";
import Link from "next/link";
import styles from "../ButtonPlay/ButtonPlay.module.css";
import { QuizContext } from "../../../context/AppContext";

export default function ButtonPlay({ quizCategory }) {
  const { setCategory, category } = QuizContext();
  console.log("category is", category);
  return (
    <div className={styles.buttonContainer}>
      <Link href={"/quiz"}>
        <button onClick={() => setCategory(quizCategory)}>Play Now</button>
      </Link>
    </div>
  );
}
