import ButtonPlay from "@/components/atoms/ButtonPlay/ButtonPlay";
import styles from "../CardQuiz/CardQuiz.module.css";
import QuizImage from "@/components/atoms/QuizImage/QuizImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { QuizContext } from "@/context/AppContext";

export default function CardQuiz({
  id,
  lesson,
  description,
  imgQuiz,
  totalQuestions,
}) {
  const { userProgressData, setShowPopUpAwardsInfo } = QuizContext();
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [starsCounter, setStarsCounter] = useState("");
  const [gainedMedal, setGainedMedal] = useState({ medal: "medal-disabled-3" });
  const lessonExistsInStoredResults = userProgressData.find(
    (lesson) => lesson.lesson_id === id,
  );
  const [awards, setAwards] = useState([
    { awardName: "completed", status: false },
    { awardName: "silverMedal", count: 0 },
    { awardName: "goldMedal", count: 0 },
    { awardName: "stars", count: "" },
    { awardName: "goldenRibbon", status: false },
  ]);

  console.log(
    "lessonExistsInStoredResults",
    lessonExistsInStoredResults?.silver_medals_counter,
  );

  useEffect(() => {
    if (!lessonExistsInStoredResults) return;
    console.log(
      "hellooooo",
      lessonExistsInStoredResults?.silver_medals_counter,
    );

    setAwards([
      {
        awardName: "completedQuiz",
        status: lessonExistsInStoredResults?.best_score >= 60 ? true : false,
      },
      {
        awardName: "silverMedal",
        count: lessonExistsInStoredResults?.silver_medals_counter,
      },
      {
        awardName: "goldMedal",
        count: lessonExistsInStoredResults?.gold_medals_counter,
      },
      {
        awardName: "stars",
        count: lessonExistsInStoredResults?.stars,
      },
      {
        awardName: "goldenRibbon",
        status:
          lessonExistsInStoredResults?.gold_medals_counter >= 1 &&
          lessonExistsInStoredResults?.stars >= 1000
            ? true
            : false,
      },
    ]);
  }, []);

  useEffect(() => {
    if (lessonExistsInStoredResults) {
      console.log(awards);
    }
  }, [awards]);

  // useEffect(() => {
  //   if (!lessonExistsInStoredResults) return;
  //   setStarsCounter(lessonExistsInStoredResults.stars);
  //   if (lessonExistsInStoredResults.gold_medals_counter >= 1) {
  //     if (lessonExistsInStoredResults.stars >= 1000) {
  //       setGainedMedal({ medal: "golden-ribbon-shadow" });
  //     } else {
  //       setGainedMedal({ medal: "medal-one-shadow" });
  //     }
  //   } else if (lessonExistsInStoredResults.silver_medals_counter >= 1) {
  //     setGainedMedal({ medal: "medal-two-shadow" });
  //   } else {
  //     setGainedMedal({ medal: "medal-disabled-3" });
  //   }
  //   if (lessonExistsInStoredResults.best_score >= 60) {
  //     setCompletedQuiz(true);
  //   }
  // }, []);

  return (
    <div
      key={id}
      className={`${styles.quizCardContainer} ${
        gainedMedal.medal === "golden-ribbon-shadow" ? styles.goldenRibbon : ""
      }`}
    >
      <Image
        src={`/images/red-book-${completedQuiz ? "completed-shadow" : "completed-3"}.png`}
        alt="completed quiz"
        className={styles.completedQuiz}
        width={45}
        height={45}
        onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
      />
      {gainedMedal.medal && (
        <Image
          src={`/images/${gainedMedal.medal}.png`}
          alt="medal"
          className={styles.medal}
          width={60}
          height={60}
          onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
        />
      )}
      <div className={styles.cardTop}>
        <QuizImage imgSrc={imgQuiz} />
      </div>
      <div className={styles.cardBottom}>
        <h3>{lesson}</h3>
        <div className={styles.starsContainer}>
          <Image
            src={`/images/${starsCounter ? "star-shadow" : "star-5"}.png`}
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
