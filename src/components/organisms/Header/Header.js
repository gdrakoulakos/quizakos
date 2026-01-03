"use client";
import Link from "next/link";
import styles from "../Header/Header.module.css";
import Image from "next/image";
import LoginArea from "../LoginArea/LoginArea";

export default function Header() {
  return (
    <>
      <header className={styles.menuContainer}>
        <div className={styles.logoIcon}>
          <Link href={"/"}>
            <Image
              src="/images/quiz.png"
              width={50}
              height={50}
              alt="quiz icon"
              loading="eager"
            />
          </Link>
        </div>
        <LoginArea />
      </header>
    </>
  );
}
