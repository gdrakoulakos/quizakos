"use client";
import Link from "next/link";
import styles from "../TabBar/TabBar.module.css";
import Image from "next/image";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { QuizContext } from "@/context/AppContext";
import Logo from "@/components/atoms/Icons/Logo/Logo";
import UserAvatar from "@/components/atoms/UserAvatar/UserAvatar";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const { isLoggedIn, loggedInUserName, isMobile, userAvatar } = QuizContext();
  const currentPageName = usePathname();
  const [menuPageClicked, setMenuPageClicked] = useState(currentPageName);

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
    <div className={styles.menuSection}>
      <div className={styles.logoWrapper}>
        <Logo link="/" width={135} height={40} />
      </div>

      <div className={styles.menuOptionsContainer}>
        {tabBarMenuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${styles.menuOption} ${menuPageClicked === item.href ? styles.selectedOption : ""}`}
            onClick={() => setMenuPageClicked(item.href)}
          >
            {item.icon}
            <span className={styles.menuOptionText}>{item.name}</span>
          </Link>
        ))}
        <Link
          href={"/login-register"}
          className={`${styles.accountContainer} ${menuPageClicked === "/login-register" ? styles.selectedOption : ""}`}
          onClick={() => setMenuPageClicked("/login-register")}
        >
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
    </div>
  );
}
