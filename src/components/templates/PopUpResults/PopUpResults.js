import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpResults.module.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { QuizContext } from "@/context/AppContext";
import Award from "@/components/atoms/Award/Award";
import ReplayIcon from "@mui/icons-material/Replay";
import PopUpAwardsInfo from "../PopUpAwardsInfo/PopUpAwardsInfo";
import Typography from "@/components/atoms/Typography/Typography";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getQuizResultPresentation } from "@/utils/getQuizResultPresentation";
import { useLaunchConfetti } from "@/customHooks";

export default function PopUpResults({ correctAnswers, lessonAndGrade }) {
  const {
    clickedAnswersResults,
    selectedQuizId,
    userProgressData,
    setShowPopUpAwardsInfo,
    isLoggedIn,
    loggedInUserQuizProgress,
    loggedInUserName,
  } = QuizContext();
  const [congratulationsMessage, setCongratulationsMessage] = useState(null);
  const [resultImg, setResultImg] = useState("/images/quizakos/guizakos1.png");
  const [medal, setMedal] = useState(null);
  const [hoppingEffect, setHoppingEffect] = useState(false);
  const [alreadyPlayedQuizData, setAlreadyPlayedQuizData] = useState({
    isAlreadyPlayed: null,
    data: null,
  });
  const [isGoldenRibbonAwared, setIsGoldenRibbonAwared] = useState(false);
  const [isUserDataFetched, setIsUserDataFetched] = useState(false);
  const [quizProgressData, setQuizProgressData] = useState(null);
  const totalAnswersLength = clickedAnswersResults.totalAnswers;
  const correctAnswersLength = clickedAnswersResults.correctAnswers;
  const scorePercentage = (correctAnswersLength / totalAnswersLength) * 100;
  const hasStoredResult = useRef(false);
  const hasSavedToSupabase = useRef(false);
  const currentUserQuizProgress = isLoggedIn
    ? loggedInUserQuizProgress
    : userProgressData;

  const savedCurrentQuizProgress = currentUserQuizProgress.find(
    (quiz) => quiz.lesson_id === selectedQuizId,
  );

  const goldenRibbonAlertShown = useRef(false);
  const goldenRibbonIcon = "/images/golden-ribbon-3.png";
  const goldenRibbonCongratsMessage =
    "Καταπληκτικό! Κέρδισες τη Χρυσή Ροζέτα! Συγχαρητήρια!";
  const router = useRouter();
  const launchConfetti = useLaunchConfetti;

  useEffect(() => {
    const starsEarned =
      correctAnswersLength * 10 + (scorePercentage === 100 ? 50 : 0);

    const newStars =
      Number(savedCurrentQuizProgress?.stars) + starsEarned || starsEarned;

    const newGoldMedals =
      scorePercentage === 100
        ? (savedCurrentQuizProgress?.gold_medals_counter || 0) + 1
        : savedCurrentQuizProgress?.gold_medals_counter || 0;

    const newSilverMedals =
      scorePercentage >= 80 && scorePercentage < 100
        ? (savedCurrentQuizProgress?.silver_medals_counter || 0) + 1
        : savedCurrentQuizProgress?.silver_medals_counter || 0;

    const hasWonGoldenRibbon =
      (newStars >= 1000 &&
        newGoldMedals >= 1 &&
        !savedCurrentQuizProgress?.golden_ribbon) ||
      false;

    setQuizProgressData({
      lesson_id: selectedQuizId,
      lesson_and_grade: lessonAndGrade,
      best_score:
        Math.max(scorePercentage, savedCurrentQuizProgress?.best_score) ||
        scorePercentage,
      quiz_completed:
        savedCurrentQuizProgress?.quiz_completed === true ||
        scorePercentage >= 60,
      stars: newStars,
      gold_medals_counter: newGoldMedals,
      silver_medals_counter: newSilverMedals,
      golden_ribbon:
        savedCurrentQuizProgress?.golden_ribbon || hasWonGoldenRibbon,
    });

    if (hasWonGoldenRibbon && !goldenRibbonAlertShown.current) {
      goldenRibbonAlertShown.current = true;

      setIsGoldenRibbonAwared(true);
      setTimeout(() => {
        launchConfetti();
      }, 1000);
    }
  }, [scorePercentage, savedCurrentQuizProgress]);

  async function saveQuizProgress() {
    if (!isLoggedIn || hasSavedToSupabase.current) return;

    hasSavedToSupabase.current = true;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user || !quizProgressData) return;

    const databaseQuizProgress = {
      ...quizProgressData,
      user_id: user.id,
      username: loggedInUserName,
    };

    const { error } = await supabase
      .from("user_lesson_progress")
      .upsert(databaseQuizProgress, {
        onConflict: "user_id,lesson_id",
      });

    if (error) {
      console.error(error);
      return;
    }
  }

  useEffect(() => {
    if (!quizProgressData) return;

    saveQuizProgress();
  }, [quizProgressData]);

  useEffect(() => {
    if (
      !selectedQuizId ||
      hasStoredResult.current ||
      isLoggedIn ||
      !quizProgressData
    )
      return;
    hasStoredResult.current = true;

    let updatedResults;

    if (!savedCurrentQuizProgress) {
      updatedResults = [...userProgressData, quizProgressData];
    } else if (savedCurrentQuizProgress) {
      updatedResults = userProgressData.map((lesson) =>
        lesson.lesson_id === selectedQuizId ? quizProgressData : lesson,
      );
    }

    localStorage.setItem("quiz_results", JSON.stringify(updatedResults));
    window.dispatchEvent(new Event("quiz_results_updated"));

    const storedResults = JSON.parse(localStorage.getItem("quiz_results"));
    const lessonResults = storedResults.find(
      (lesson) => lesson.lesson_id === selectedQuizId,
    );
  }, [selectedQuizId, scorePercentage, quizProgressData]);

  useEffect(() => {
    getQuizResultPresentation(
      scorePercentage,
      setMedal,
      setResultImg,
      setCongratulationsMessage,
      setHoppingEffect,
    );
  }, [scorePercentage]);

  return (
    <motion.div
      className={styles.blurBackground}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <PopUpAwardsInfo />
      <div
        className={`${styles.popUpResultsContainer} ${isGoldenRibbonAwared ? styles.goldenRibbonAwared : ""} `}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={styles.correctAnswers}
        >
          {correctAnswers}
        </motion.div>

        {isGoldenRibbonAwared ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5, delay: 0.5 }}
          >
            <Image
              className={styles.goldenRibbonIcon}
              src={goldenRibbonIcon}
              width={150}
              height={182}
              alt="Bravo icon"
              loading="eager"
            />
          </motion.div>
        ) : (
          <Image
            className={`${styles.resultImage} ${hoppingEffect ? styles.hopping : ""}`}
            src={resultImg}
            width={500}
            height={500}
            alt="Bravo icon"
          />
        )}

        <div className={styles.congratulationsMessage}>
          {isGoldenRibbonAwared
            ? goldenRibbonCongratsMessage
            : congratulationsMessage}
        </div>
        {scorePercentage > 0 && (
          <div className={styles.awardsGainedMessage}>{"Κέρδισες:"}</div>
        )}
        <motion.div
          key={medal?.awardName}
          className={styles.awardContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className={styles.awards}>
            {medal && (
              <div className={styles.awardEarned}>
                <div className={styles.awardCounter}>+ 1</div>
                <Award awardData={medal} />
              </div>
            )}
            {correctAnswersLength > 0 && (
              <div
                className={styles.starsEarnedWrapper}
                onClick={() => setShowPopUpAwardsInfo(true)}
              >
                <div className={styles.awardEarned}>
                  <div className={styles.congratulationsMessage}>
                    {`+ ${correctAnswersLength * 10 + (scorePercentage === 100 ? 50 : 0)} `}
                  </div>
                  <Award awardData={{ img: "star-6-tinypng" }} />
                </div>
              </div>
            )}
          </div>
        </motion.div>
        {!isLoggedIn && correctAnswersLength > 0 && (
          <div className={styles.loginPrompt}>
            <button
              className={styles.loginButton}
              onClick={() => router.push("/login-register")}
            >
              Σύνδεση
            </button>
            <Typography
              text={
                "Κάνε σύνδεση για να έχεις τα βραβεία σου παντού, σε κάθε συσκευή!"
              }
              size={"small"}
            />
          </div>
        )}
        <div className={styles.actionButtonsContainer}>
          <Link href="/quizResults">
            <button className={styles.seeResultsButton}>Αποτελέσματα</button>
          </Link>

          <ButtonOk
            buttonText={"Επιστροφή"}
            onClick={() => (window.location.href = "/")}
          />
        </div>
        <button
          className={styles.playAgainButton}
          onClick={() => window.location.reload()}
        >
          <ReplayIcon /> Παίξε ξανά!
        </button>
      </div>
    </motion.div>
  );
}
