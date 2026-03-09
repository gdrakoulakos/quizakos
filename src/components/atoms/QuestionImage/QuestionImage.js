import Image from "next/image";
import { QuizContext } from "@/context/AppContext";

import styles from "./QuestionImage.module.css";

export default function QuestionImage() {
  const { selectedQuiz, displayedQuestionIndex } = QuizContext();
  const imgSrc = selectedQuiz?.questions[displayedQuestionIndex]?.question_img;

  if (!imgSrc) {
    return null;
  }

  return (
    <Image
      src={`/images/questions/${imgSrc}`}
      alt="question image"
      className={styles.questionImage}
      width={240}
      height={120}
    />
  );
}
