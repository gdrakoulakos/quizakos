"use client";
import styles from "./page.module.css";
import WelcomeBanner from "@/components/organisms/WelcomeBanner/WelcomeBanner";
import { QuizContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import CardQuizzesSection from "@/components/templates/CardQuizzesSection/CardQuizzesSection";
import LoadingSpinner from "@/components/organisms/LoadingSpinner/LoadingSpinner";
import Anouncements from "@/components/organisms/Anouncements/Anouncements";
import PopUpAwardsInfo from "@/components/templates/PopUpAwardsInfo/PopUpAwardsInfo";

export default function Home() {
  const {
    currentInstitutionData,
    setCurrentInstitution,
    setDisplayedQuestionIndex,
    setClickedAnswersResults,
    setShowPopUpResults,
    setSelectedQuiz,
  } = QuizContext();

  const [announcement, setAnnouncement] = useState({
    display: false,
    message: "",
  });

  useEffect(() => {
    setCurrentInstitution("default");
    setDisplayedQuestionIndex(0);
    setClickedAnswersResults({
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalAnswers: 0,
      incorrectAnswersData: [],
    });
    setShowPopUpResults(false);
    setSelectedQuiz(null);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    let message = "";

    if (params.get("loginSuccess")) {
      message = "Επιτυχής σύνδεση";
    }

    if (params.get("signupSuccess")) {
      message =
        "Έλεγξε το email σου και πάτησε το link επιβεβαίωσης για να ενεργοποιήσεις τον λογαριασμό σου!";
    }

    if (!message) return;

    window.history.replaceState({}, "", "/");

    const showTimer = setTimeout(() => {
      setAnnouncement({
        display: true,
        message,
      });
    }, 1500);

    const hideTimer = setTimeout(() => {
      setAnnouncement({
        display: false,
        message: "",
      });
    }, 11500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className={styles.homePageSection}>
      <PopUpAwardsInfo />
      <Anouncements
        announcement={announcement}
        setAnnouncement={setAnnouncement}
      />
      <div className={styles.homePage}>
        <WelcomeBanner />
      </div>
      <div key={"all-quizzes"} className={styles.allQuizzes}>
        {!currentInstitutionData ? (
          <LoadingSpinner />
        ) : (
          <CardQuizzesSection currentInstitutionData={currentInstitutionData} />
        )}
      </div>
    </div>
  );
}
