import styles from "./QuizHeader.module.css";
import { QuizContext } from "@/context/AppContext";
import Image from "next/image";
import ErrorIcon from "@mui/icons-material/Error";

export default function QuizHeader() {
  const {
    selectedQuiz,
    displayedQuestionIndex,
    clickedAnswersResults,
    setShowPopUpInfoMessage,
  } = QuizContext();

  const quizGrade = selectedQuiz?.grade;
  const quizLesson = selectedQuiz?.lesson;
  const quizQuestionCounter = selectedQuiz?.questions.length;
  const quizQuestionCurrentNum = displayedQuestionIndex + 1;
  const clickedCorrectAnswers = clickedAnswersResults.correctAnswers;

  const handleReferralClick = () => {
    setShowPopUpInfoMessage(true);
  };

  return (
    <div className={styles.quizHeader}>
      <div className={styles.leftHeader}>
        <p className={styles.questionCounter}>
          {quizQuestionCurrentNum}/{quizQuestionCounter}
        </p>
        <div className={styles.correctInfoContainer}>
          <Image
            className={styles.correctIcon}
            src={"/images/correct.png"}
            alt="correct answers icon"
            width={20}
            height={20}
          />
          <div className={styles.correctAnswers}>{clickedCorrectAnswers}</div>
        </div>
      </div>
      <div className={styles.info}>
        <p className={styles.lesson}>{quizLesson}</p>
        <p className={styles.grade}>{quizGrade}</p>
      </div>
      <div
        className={styles.rightHeader}
        onClick={() => handleReferralClick()}
        title="Αναφορά λάθους"
      >
        <ErrorIcon className={styles.referralIcon} />
        <p className={styles.referralText}>Αναφορά</p>
      </div>
    </div>
  );
}
