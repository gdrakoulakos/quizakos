import ButtonPlay from "@/components/atoms/ButtonPlay/ButtonPlay";
import styles from "../CardQuiz/CardQuiz.module.css";

export default function CardQuiz({ id, name, description }) {
  return (
    <div key={id} className={styles.quizCardContainer}>
      <div className={styles.cardTop}>
        <h1>🎼</h1>
      </div>
      <div className={styles.cardBottom}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <ButtonPlay id={id} />
    </div>
  );
}
