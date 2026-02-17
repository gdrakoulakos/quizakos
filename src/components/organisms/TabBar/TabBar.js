"use client";
import Link from "next/link";
import styles from "../TabBar/TabBar.module.css";
import { motion } from "motion/react";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import InfoIcon from "@mui/icons-material/Info";

export default function TabBar() {
  const tabBarMenuItems = [
    {
      name: "Αρχική",
      href: "/",
      icon: <HomeIcon fontSize="medium" />,
    },
    {
      name: "Τα σκορ μου",
      href: "/myScore",
      icon: <EmojiEventsIcon fontSize="medium" />,
    },
    {
      name: "Πληροφορίες",
      href: "/info",
      icon: <InfoIcon fontSize="medium" />,
    },
    {
      name: "Προφίλ",
      href: "/comingSoon",
      icon: <SentimentSatisfiedAltIcon fontSize="medium" />,
    },
  ];

  return (
    <motion.div
      className={styles.menuContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      {tabBarMenuItems.map((item) => (
        <Link key={item.name} href={item.href} className={styles.menuOption}>
          {item.icon}
          <span className={styles.menuOptionText}>{item.name}</span>
        </Link>
      ))}
    </motion.div>
  );
}
