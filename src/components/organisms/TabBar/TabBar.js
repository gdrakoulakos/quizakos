"use client";
import Link from "next/link";
import styles from "../TabBar/TabBar.module.css";
import Image from "next/image";
import { motion } from "motion/react";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import InfoIcon from "@mui/icons-material/Info";
import { QuizContext } from "@/context/AppContext";
import Logo from "@/components/atoms/Icons/Logo/Logo";

export default function TabBar() {
  const { isLoggedIn, loggedInUserName, isDesktop } = QuizContext();

  const tabBarMenuItems = [
    {
      name: "Αρχική",
      href: "/",
      icon: <HomeIcon fontSize="medium" />,
    },
    {
      name: "Σκορ",
      href: "/myScore",
      icon: <EmojiEventsIcon fontSize="medium" />,
    },
    {
      name: "Πληροφορίες",
      href: "/info",
      icon: <InfoIcon fontSize="medium" />,
    },
  ];

  return (
    <motion.div
      className={`${styles.menuSection} ${
        isDesktop ? styles.menuDesktop : styles.menuMobile
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      {isDesktop && <Logo link="/" width={135} height={40} />}
      <div className={styles.menuOptionsContainer}>
        {tabBarMenuItems.map((item) => (
          <Link key={item.name} href={item.href} className={styles.menuOption}>
            {item.icon}
            <span className={styles.menuOptionText}>{item.name}</span>
          </Link>
        ))}
      </div>
      <div className={styles.accountContainer}>
        <Link href={"/login-register"} className={styles.menuOption}>
          <button
            className={`${styles.accountButton} ${
              isDesktop ? styles.accountButtonLarge : styles.accountButtonSmall
            }`}
          >
            <span>{isLoggedIn ? loggedInUserName : "Σύνδεση"}</span>
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
