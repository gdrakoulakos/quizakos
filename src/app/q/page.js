"use client";
import PopUpResults from "@/components/molecules/PopUpResults/PopUpResults";
import styles from "./q.module.css";
import QuizCard from "@/components/organisms/QuizCard/QuizCard";
import { QuizContext } from "../../context/AppContext";
import { useState } from "react";

export default function q() {
  const [showPopUpResults, setShowPopUpResults] = useState(false);
  const { clickedAnswersResults, setClickedAnswersResults } = QuizContext();

  if (clickedAnswersResults.totalAnswers === 10 && !showPopUpResults) {
    setTimeout(() => {
      setShowPopUpResults(true);
    }, 2000);
  }

  const handleClickedPopUpOk = () => {
    setClickedAnswersResults({
      correctAnswers: 0,
      incorrectAnswers: 0,
      totalAnswers: 0,
      incorrectAnswersData: [],
    });
    setShowPopUpResults(false);
  };

  return (
    <>
      {showPopUpResults && (
        <PopUpResults
          congratsImg={"/images/bravo3.png"}
          congratulationsMessage={"Συγχαρητήρια!"}
          resultMessage={"Το σκορ σου είναι:"}
          correctAnswers={`${clickedAnswersResults.correctAnswers} /
                    ${clickedAnswersResults.totalAnswers}`}
          onClick={handleClickedPopUpOk}
        />
      )}
      <div className={styles.QuizNew}>
        <QuizCard />
      </div>
    </>
  );
}
