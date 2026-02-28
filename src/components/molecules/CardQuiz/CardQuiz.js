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
  const [gainedMedal, setGainedMedal] = useState({ gained: false, medal: "" });
  const lessonExistsInStoredResults = userProgressData.find(
    (lesson) => lesson.lesson_id === id,
  );

  useEffect(() => {
    if (!lessonExistsInStoredResults?.lesson_id) {
      setGainedMedal({ gained: true, medal: "medal-disabled-3" });
      return;
    }
    setStarsCounter(lessonExistsInStoredResults.stars);
    if (lessonExistsInStoredResults.score === 100) {
      setGainedMedal({ gained: true, medal: "medal-one" });
    } else if (lessonExistsInStoredResults.score >= 80) {
      setGainedMedal({ gained: true, medal: "medal-two" });
    } else {
      setGainedMedal({ gained: true, medal: "medal-disabled-3" });
    }

    if (lessonExistsInStoredResults.score >= 60) {
      setCompletedQuiz(true);
    }
  }, []);

  return (
    <div key={id} className={styles.quizCardContainer}>
      <Image
        src={`/images/red-book-${completedQuiz ? "completed" : "completed-3"}.png`}
        alt="completed quiz"
        className={styles.completedQuiz}
        width={45}
        height={45}
        onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
      />

      {gainedMedal.gained && (
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
            src={`/images/star${starsCounter ? "" : "-5"}.png`}
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
