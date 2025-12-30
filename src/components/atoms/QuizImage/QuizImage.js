import Image from "next/image";
import styles from "./QuizImage.module.css";

export default function QuizImage({ imgSrc }) {
  if (!imgSrc) {
    return null;
  }

  return (
    <Image
      src={`/images/quiz-categories/${imgSrc}`}
      alt={imgSrc}
      className={styles.quizImage}
      width={60}
      height={60}
    />
  );
}
