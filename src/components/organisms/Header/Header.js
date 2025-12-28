"use client";
import Link from "next/link";
import styles from "../Header/Header.module.css";
import { QuizContext } from "../../../context/AppContext";
import { useState } from "react";
import Image from "next/image";

export default function Header() {
  const { allQuizCategories } = QuizContext();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className={styles.menuContainer}>
        <div className={styles.active}>
          <div className={styles.menuIcon} onClick={toggleMenu}>
            <Image
              src={!isMenuOpen ? "/images/menu.png" : "/images/close.png"}
              width={30}
              height={30}
              alt="Menu icon"
            />
          </div>

          {isMenuOpen && (
            <div className={styles.openList}>
              <ul
                className={styles.myLinks}
                style={{ display: isMenuOpen ? "block" : "none" }}
              >
                {allQuizCategories.map((title, index) => (
                  <li key={index} onClick={toggleMenu}>
                    <Link href={"/"}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <p>
          <Link
            style={{
              color: "transparent",
              textDecoration: "none",
            }}
            href={"/quizResults"}
          >
            Hello
          </Link>
        </p>
        <div className={styles.logoIcon}>
          <Link href={"/"}>
            <Image
              src="/images/quiz.png"
              width={50}
              height={50}
              alt="quiz icon"
            />
          </Link>
        </div>
      </header>
    </>
  );
}
