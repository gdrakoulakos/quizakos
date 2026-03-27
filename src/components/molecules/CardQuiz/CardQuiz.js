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
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [starsCounter, setStarsCounter] = useState("");
  const [awards, setAwards] = useState([]);

  const lessonExistsInStoredResults = userProgressData.find(
    (lesson) => lesson.lesson_id === id,
  );

  const awardsRendered = useRef(false);

  useEffect(() => {
    if (!lessonExistsInStoredResults || awardsRendered.current) return;
    awardsRendered.current = true;

    if (lessonExistsInStoredResults.stars > 0) {
      setStarsCounter(lessonExistsInStoredResults.stars);
    }
    if (lessonExistsInStoredResults?.best_score >= 60) {
      setCompletedQuiz(true);
      setAwards((prev) => [
        ...prev,
        {
          awardName: "completed",
          img: "completed-shadow",
        },
      ]);
    }
    if (lessonExistsInStoredResults?.best_score >= 80) {
      setAwards((prev) => [
        ...prev,
        {
          awardName: "silverMedal",
          img: "medal-two-shadow",
          count: lessonExistsInStoredResults?.silver_medals_counter,
        },
      ]);
    }

    if (
      lessonExistsInStoredResults?.best_score === 100 &&
      lessonExistsInStoredResults?.stars >= 1000
    ) {
      setCompletedQuiz(true);
      setAwards((prev) => [
        ...prev,
        {
          awardName: "goldenRibbon",
          img: "golden-ribbon-shadow",
        },
      ]);
    } else if (lessonExistsInStoredResults?.best_score === 100) {
      setCompletedQuiz(true);
      setAwards((prev) => [
        ...prev,
        {
          awardName: "goldMedal",
          img: "medal-one-shadow",
          count: lessonExistsInStoredResults?.gold_medals_counter,
        },
      ]);
    } else {
      setAwards([{ awardName: "no-award", medal: "medal-disabled-3" }]);
    }
  }, []);

  // useEffect(() => {
  //   if (!lessonExistsInStoredResults) return;

  //   if (lessonExistsInStoredResults.stars > 0) {
  //     setStarsCounter(lessonExistsInStoredResults.stars);
  //   }
  //   if (lessonExistsInStoredResults?.best_score >= 60) {
  //     setCompletedQuiz(true);
  //     setAwards([
  //       {
  //         awardName: "completed",
  //         img: "completed-shadow",
  //         status: lessonExistsInStoredResults?.best_score >= 60 ? true : false,
  //       },
  //       {
  //         awardName: "silverMedal",
  //         img: "medal-two-shadow",
  //         count: lessonExistsInStoredResults?.silver_medals_counter,
  //         status:
  //           lessonExistsInStoredResults?.silver_medals_counter > 0
  //             ? true
  //             : false,
  //       },
  //       {
  //         awardName: "goldMedal",
  //         img: "medal-one-shadow",
  //         count: lessonExistsInStoredResults?.gold_medals_counter,
  //         status:
  //           lessonExistsInStoredResults?.gold_medals_counter > 0 ? true : false,
  //       },
  //       {
  //         awardName: "goldenRibbon",
  //         img: "golden-ribbon-shadow",
  //         status:
  //           lessonExistsInStoredResults?.gold_medals_counter >= 1 &&
  //           lessonExistsInStoredResults?.stars >= 1000
  //             ? true
  //             : false,
  //       },
  //     ]);
  //   }
  // }, []);

  if (awards.length > 0) {
    console.log(id, awards);
  }

  return (
    <div
      key={id}
      className={`${styles.quizCardContainer} ${
        awards.some((award) => award.awardName === "goldenRibbon")
          ? styles.goldenRibbon
          : ""
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
      <div className={styles.awardsContainer}>
        {awards.map((award, index) => (
          <Award key={index} awardImg={award.img} />
        ))}
      </div>
      {/* {awards && (
        <Image
          src={`/images/${awards.awardName}.png`}
          alt="medal"
          className={styles.medal}
          width={60}
          height={60}
          onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
        />
      )} */}
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
