import ButtonPlay from "@/components/atoms/ButtonPlay/ButtonPlay";
import styles from "../CardQuiz/CardQuiz.module.css";
import QuizImage from "@/components/atoms/QuizImage/QuizImage";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { QuizContext } from "@/context/AppContext";
import Award from "../../atoms/Award/Award";

export default function CardQuiz({
  id,
  lesson,
  description,
  imgQuiz,
  totalQuestions,
}) {
  const {
    userProgressData,
    setShowPopUpAwardsInfo,
    isLoggedIn,
    loggedInUserQuizProgress,
  } = QuizContext();
  const [starsCounter, setStarsCounter] = useState("");
  const [awards, setAwards] = useState([]);
  const [goldenRibbonAward, setGoldenRibbonAward] = useState(false);
  const [userQuizProgress, setUserQuizProgress] = useState(null);
  const lessonExistsInStoredResults = userProgressData.find(
    (lesson) => lesson.lesson_id === id,
  );
  const awardsRendered = useRef(false);

  useEffect(() => {
    let currentProgress = null;

    if (isLoggedIn) {
      if (loggedInUserQuizProgress) {
        currentProgress = loggedInUserQuizProgress.find(
          (progress) => progress.lesson_id === id,
        );

        setUserQuizProgress(currentProgress);
      } else {
        setAwards([
          { awardName: "uncompleted", img: "book-uncompleted" },
          { awardName: "no-award", img: "medal-disabled-4" },
        ]);
        return;
      }
    } else if (!isLoggedIn && !lessonExistsInStoredResults) {
      setAwards([
        { awardName: "uncompleted", img: "book-uncompleted" },
        { awardName: "no-award", img: "medal-disabled-4" },
      ]);
      return;
    } else {
      currentProgress = lessonExistsInStoredResults;
      setUserQuizProgress(currentProgress);
    }

    if (!currentProgress) return;

    if (awardsRendered.current) return;

    awardsRendered.current = true;

    if (currentProgress.stars > 0) {
      setStarsCounter(currentProgress.stars);
    }

    if (currentProgress.best_score >= 60) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "completed",
          img: "book-completed",
        },
      ]);

      if (currentProgress.best_score < 80) {
        setAwards((prev) => [
          ...prev,
          {
            awardName: "no-award",
            img: "medal-disabled-4",
          },
        ]);
      }
    }

    if (currentProgress.silver_medals_counter >= 1) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "silverMedal",
          img: "silver-medal",
          count: currentProgress.silver_medals_counter,
        },
      ]);
    }

    if (currentProgress.gold_medals_counter >= 1) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "goldMedal",
          img: "gold-medal",
          count: currentProgress.gold_medals_counter,
        },
      ]);
    }

    if (
      currentProgress.gold_medals_counter >= 1 &&
      currentProgress.stars >= 1000
    ) {
      setGoldenRibbonAward(true);
    }

    if (currentProgress.best_score < 60) {
      setAwards([
        { awardName: "uncompleted", img: "book-uncompleted" },
        { awardName: "no-award", img: "medal-disabled-4" },
      ]);
    }
  }, [loggedInUserQuizProgress, isLoggedIn, lessonExistsInStoredResults]);

  return (
    <div
      key={id}
      className={`${styles.quizCardContainer} ${
        goldenRibbonAward ? styles.goldenRibbonBorder : ""
      }`}
    >
      <div className={styles.awardsContainer}>
        {awards.map((awardData, index) => (
          <Award key={index} awardData={awardData} />
        ))}
      </div>
      <div className={styles.goldenRibbonContainer}>
        {goldenRibbonAward && (
          <Award
            awardData={{ awardName: "goldenRibbon", img: "golden-ribbon-2" }}
            width={55}
          />
        )}
      </div>
      <div className={styles.cardTop}>
        <QuizImage imgSrc={imgQuiz} />
      </div>
      <div className={styles.cardBottom}>
        <h3>{lesson}</h3>
        <div className={styles.starsContainer}>
          <Image
            src={`/images/${starsCounter ? "star-6" : "star-disabled-3"}.png`}
            alt="star"
            className={styles.starIcon}
            width={20}
            height={20}
            onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
          />
          <div>{starsCounter}</div>
        </div>
        <p>{description}</p>
      </div>
      <ButtonPlay id={id} totalQuestions={totalQuestions} />
    </div>
  );
}
