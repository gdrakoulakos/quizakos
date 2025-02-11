import ButtonPlay from "@/components/atoms/ButtonPlay/ButtonPlay";
import styles from "../CardQuiz/CardQuiz.module.css";

export default function CardQuiz({ quizName, quizDescription }) {
  return (
    <div className={styles.quizCardContainer}>
      <div className={styles.cardTop}>
        <h1>🎼</h1>
      </div>
      <div className={styles.cardBottom}>
        <h3>{quizName}</h3>
        <p>{quizDescription}</p>
      </div>
      <ButtonPlay />
    </div>
  );
}
