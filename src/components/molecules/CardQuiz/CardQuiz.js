import ButtonPlay from "@/components/atoms/ButtonPlay/ButtonPlay";
import styles from "../CardQuiz/CardQuiz.module.css";
import QuizImage from "@/components/atoms/QuizImage/QuizImage";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const allLessonsResults = isLoggedIn
    ? loggedInUserQuizProgress
    : userProgressData;
  const lessonsResults = allLessonsResults.find(
    (lesson) => lesson.lesson_id === id,
  );

  useEffect(() => {
    if (!lessonsResults) {
      setAwards([
        { awardName: "uncompleted", img: "book-uncompleted" },
        { awardName: "no-award", img: "medal-disabled-4" },
      ]);
      return;
    }
    if (lessonsResults.quiz_completed === false) {
      setAwards([
        { awardName: "uncompleted", img: "book-uncompleted" },
        { awardName: "no-award", img: "medal-disabled-4" },
      ]);
    }
    if (lessonsResults.quiz_completed) {
      setAwards([
        {
          awardName: "completed",
          img: "book-completed",
        },
      ]);
    }
    if (lessonsResults.quiz_completed && lessonsResults.best_score < 80) {
      setAwards((prev) => [
        ...prev,
        { awardName: "no-award", img: "medal-disabled-4" },
      ]);
    }
    if (lessonsResults.stars > 0) {
      setStarsCounter(lessonsResults.stars);
    }
    if (lessonsResults.gold_medals_counter > 0) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "goldMedal",
          img: "gold-medal",
          count: lessonsResults.gold_medals_counter,
        },
      ]);
    }
    if (lessonsResults.silver_medals_counter > 0) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "silverMedal",
          img: "silver-medal",
          count: lessonsResults.silver_medals_counter,
        },
      ]);
    }
    if (lessonsResults.golden_ribbon) {
      setGoldenRibbonAward(true);
    }
  }, [isLoggedIn, lessonsResults]);

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
            awardData={{ awardName: "goldenRibbon", img: "golden-ribbon-3" }}
            width={65}
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
            loading="eager"
          />
          <div>{starsCounter}</div>
        </div>
        <p>{description}</p>
      </div>
      <ButtonPlay id={id} totalQuestions={totalQuestions} />
    </div>
  );
}
