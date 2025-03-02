"use client";
import Link from "next/link";
import styles from "../Header/Header.module.css";
import { QuizContext } from "../../../context/AppContext";

export default function Header() {
  const { allQuizCategories } = QuizContext();

  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            {allQuizCategories.map((title, index) => (
              <li key={index}>
                <Link href={"/"}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
