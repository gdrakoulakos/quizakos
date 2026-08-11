import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./UserProfile.module.css";
import { signOut, deleteAccount } from "@/services/authService";
import Image from "next/image";
import { QuizContext } from "@/context/AppContext";
import Award from "@/components/atoms/Award/Award";
import { useEffect, useState } from "react";

export default function UserProfile({ setIsLoading }) {
  const { awardsData, loggedInUserData, loggedInUserQuizProgress, isLoggedIn } =
    QuizContext();
  const [userFullName, setUserFullName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userAchievements, setUserAchievements] = useState({
    completedQuizzes: null,
    bestScore: null,
    stars: null,
    books: null,
    goldMedals: null,
    silverMedals: null,
    goldenRibbons: null,
  });
  const [awardsWithAchievements, setAwardsWithAchievements] = useState(null);

  useEffect(() => {
    if (!loggedInUserData || !loggedInUserQuizProgress || !isLoggedIn) return;

    const completedQuizzes = loggedInUserQuizProgress.filter(
      (lesson) => lesson.quiz_completed === true,
    );

    const bestScore = Math.max(
      ...loggedInUserQuizProgress.map((quiz) => quiz.best_score),
    );

    const goldenRibbons = loggedInUserQuizProgress.filter(
      (lesson) => lesson.golden_ribbon === true,
    );

    const stars = loggedInUserQuizProgress.reduce(
      (total, lesson) => total + (lesson.stars || 0),
      0,
    );

    const goldMedals = loggedInUserQuizProgress.reduce(
      (total, lesson) => total + (lesson.gold_medals_counter || 0),
      0,
    );

    const silverMedals = loggedInUserQuizProgress.reduce(
      (total, lesson) => total + (lesson.silver_medals_counter || 0),
      0,
    );

    setUserFullName(loggedInUserData?.user_metadata?.name);
    setUserEmail(loggedInUserData?.email);
    setUserAchievements({
      completedQuizzes: completedQuizzes.length,
      bestScore: bestScore,
      stars: stars,
      books: completedQuizzes.length,
      goldMedals: goldMedals,
      silverMedals: silverMedals,
      goldenRibbons: goldenRibbons.length,
    });
  }, [loggedInUserData, loggedInUserQuizProgress, isLoggedIn]);

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    const ok = window.confirm(
      "Θες σίγουρα να διαγράψεις τον λογαριασμό σου μαζί με τα βραβεία σου?",
    );

    if (ok) {
      deleteAccount();
    }
  };

  useEffect(() => {
    const achievementCountMap = {
      star: "stars",
      book: "books",
      silverMedal: "silverMedals",
      goldMedal: "goldMedals",
      goldenRibbon: "goldenRibbons",
    };

    const combinedAwards = awardsData.map((award) => ({
      ...award,
      count: userAchievements[achievementCountMap[award.name]] ?? 0,
    }));
    setAwardsWithAchievements(combinedAwards);
  }, [awardsData, userAchievements]);

  return (
    <div className={styles.userProfileSection}>
      <h1> Προφίλ</h1>

      <div className={styles.userProfile}>
        <div className={styles.userProfileInfo}>
          <Image
            className={styles.userIcon}
            src="/images/quizakos/quizakos-coding-3.png"
            alt="Coming Soon"
            width={70}
            height={70}
            loading="eager"
          />
          <div className={styles.userProfileDetails}>
            <p className={styles.userFullName}>{userFullName}</p>
            <p className={styles.userEmail}>{userEmail}</p>
          </div>
        </div>
        <hr className={styles.seperator} />
        <h2 className={styles.achievementsTitle}>Τα επιτεύγματά μου</h2>
        <div className={styles.achievementsContainer}>
          <div className={styles.achievementsHeaderContainer}>
            <div className={styles.achievementsSummary}>
              <p>Ολοκληρωμένα Κουίζ:</p>
              <p>{userAchievements?.completedQuizzes}</p>
            </div>
            <div className={styles.achievementsSummary}>
              <p>Καλύτερο Σκορ:</p>
              <p>{userAchievements?.bestScore}%</p>
            </div>
          </div>
          <div className={styles.awardsContainer}>
            {awardsWithAchievements &&
              awardsWithAchievements.map((award) => (
                <div key={award.img} className={styles.awardContainer}>
                  <Award
                    awardData={{
                      img: award.img,
                    }}
                    width={award.img === "golden-ribbon-3-tinypng" ? 45 : 30}
                  />
                  <p className={styles.awardCounter}>{award.count}</p>
                  <p className={styles.awardName}>
                    {award.count === 1 ? award.nameSingular : award.namePlural}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <hr className={styles.seperator} />

        <ButtonOk onClick={handleSignOut} buttonText="Αποσύνδεση" />

        <div className={styles.deleteAccountContainer}>
          <p>
            Για την διαγραφή του λογαριασμού σου, πάτησε{" "}
            <a className={styles.clickableText} onClick={handleDeleteAccount}>
              εδώ
            </a>{" "}
          </p>{" "}
        </div>
      </div>
    </div>
  );
}
