import ButtonPlay from "@/components/atoms/ButtonPlay/ButtonPlay";
import styles from "../CardQuiz/CardQuiz.module.css";
import QuizImage from "@/components/atoms/QuizImage/QuizImage";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { QuizContext } from "@/context/AppContext";
import Award from "../Award/Award";

export default function CardQuiz({
  id,
  lesson,
  description,
  imgQuiz,
  totalQuestions,
}) {
  const { userProgressData, setShowPopUpAwardsInfo } = QuizContext();
  const [starsCounter, setStarsCounter] = useState("");
  const [awards, setAwards] = useState([]);
  const lessonExistsInStoredResults = userProgressData.find(
    (lesson) => lesson.lesson_id === id,
  );
  const awardsRendered = useRef(false);

  useEffect(() => {
    if (!lessonExistsInStoredResults) {
      setAwards([
        { awardName: "uncompleted", img: "book-uncompleted" },
        { awardName: "no-award", img: "medal-disabled-4" },
      ]);
      return;
    }
    if (awardsRendered.current) return;

    awardsRendered.current = true;

    if (lessonExistsInStoredResults.stars > 0) {
      setStarsCounter(lessonExistsInStoredResults.stars);
    }
    if (lessonExistsInStoredResults?.best_score >= 60) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "completed",
          img: "book-completed",
        },
      ]);
      if (lessonExistsInStoredResults?.best_score < 80) {
        setAwards((prev) => [
          ...prev,
          {
            awardName: "no-award",
            img: "medal-disabled-4",
          },
        ]);
      }
    }
    if (lessonExistsInStoredResults?.silver_medals_counter >= 1) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "silverMedal",
          img: "silver-medal",
          count: lessonExistsInStoredResults?.silver_medals_counter,
        },
      ]);
    }
    if (lessonExistsInStoredResults?.gold_medals_counter >= 1) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "goldMedal",
          img: "gold-medal",
          count: lessonExistsInStoredResults?.gold_medals_counter,
        },
      ]);
    }
    if (
      lessonExistsInStoredResults?.gold_medals_counter >= 1 &&
      lessonExistsInStoredResults?.stars >= 1000
    ) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "goldenRibbon",
          img: "golden-ribbon-2",
        },
      ]);
    }
    if (lessonExistsInStoredResults.best_score < 60) {
      setAwards([
        { awardName: "uncompleted", img: "book-uncompleted" },
        { awardName: "no-award", img: "medal-disabled-4" },
      ]);
    }
  }, []);

  return (
    <div
      key={id}
      className={`${styles.quizCardContainer} ${
        awards.some((award) => award.awardName === "goldenRibbon")
          ? styles.goldenRibbon
          : ""
      }`}
    >
      <div className={styles.awardsContainer}>
        {awards.map((awardData, index) => (
          <Award key={index} awardData={awardData} />
        ))}
      </div>
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
