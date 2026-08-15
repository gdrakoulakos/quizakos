"use client";
import Link from "next/link";
import styles from "../TabBar/TabBar.module.css";
import Image from "next/image";
import { motion } from "motion/react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { QuizContext } from "@/context/AppContext";
import Logo from "@/components/atoms/Icons/Logo/Logo";
import UserAvatar from "@/components/atoms/UserAvatar/UserAvatar";

export default function TabBar() {
  const { isLoggedIn, loggedInUserName, isMobile, userAvatar } = QuizContext();

  const tabBarMenuItems = [
    {
      name: "Αρχική",
      href: "/",
      icon: <HomeRoundedIcon fontSize="medium" />,
    },
    {
      name: "Σκορ",
      href: "/myScore",
      icon: <EmojiEventsRoundedIcon fontSize="medium" />,
    },
    {
      name: "Οδηγίες",
      href: "/info",
      icon: <InfoIcon fontSize="medium" />,
    },
  ];

  return (
    <motion.div
      className={styles.menuSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <div className={styles.logoWrapper}>
        <Logo link="/" width={135} height={40} />
      </div>

      <div className={styles.menuOptionsContainer}>
        {tabBarMenuItems.map((item) => (
          <Link key={item.name} href={item.href} className={styles.menuOption}>
            {item.icon}
            <span className={styles.menuOptionText}>{item.name}</span>
          </Link>
        ))}
        <Link href={"/login-register"} className={styles.accountContainer}>
          {isLoggedIn ? (
            <div className={styles.avatarContainer}>
              <UserAvatar size={45} />
            </div>
          ) : (
            <>
              <AccountCircleIcon
                className={styles.loginIcon}
                fontSize={isMobile ? "medium" : "large"}
              />
              <span>{"Σύνδεση"}</span>
            </>
          )}
        </Link>
      </div>
    </motion.div>
  );
}
