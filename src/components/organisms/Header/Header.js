"use client";
import Link from "next/link";
import styles from "../Header/Header.module.css";
import Image from "next/image";
import LoginArea from "../LoginArea/LoginArea";
import { SignedIn } from "@clerk/nextjs";

export default function Header() {
  return (
    <>
      <header className={styles.menuContainer}>
        <div className={styles.logoIcon}>
          <Link href={"/"}>
            <Image
              src="/images/logo.png"
              width={60}
              height={60}
              alt="forte quiz logo"
              loading="eager"
            />
          </Link>
        </div>
        <SignedIn>
          <div className={styles.myQuizzes}>Τα Quiz μου</div>
        </SignedIn>
        <div className={styles.loginArea}>
          <LoginArea />
        </div>
      </header>
    </>
  );
}
