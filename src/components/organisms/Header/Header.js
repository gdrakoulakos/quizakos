"use client";
import Link from "next/link";
import styles from "../Header/Header.module.css";
import Image from "next/image";
import LoginArea from "../LoginArea/LoginArea";
import { SignedIn } from "@clerk/nextjs";
import { motion } from "motion/react";

export default function Header() {
  return (
    <motion.header
      className={styles.menuContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 2 }}
    >
      <Link href={"/"}>
        <Image
          className={styles.logoIcon}
          src="/images/logo/logo-header.png"
          width={60}
          height={60}
          alt="forte quiz logo"
          loading="eager"
        />
      </Link>
      <SignedIn>
        <Link href={"/myQuizzes"} className={styles.myQuizzes}>
          Τα Quiz μου
        </Link>
      </SignedIn>
      <LoginArea />
    </motion.header>
  );
}
