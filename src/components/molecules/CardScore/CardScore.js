import styles from "./CardScore.module.css";
import Image from "next/image";

export default function CardScore({ lessonData }) {
  const quizCompleted = lessonData.score >= 60;

  return (
    <div key={lessonData.lesson_id} className={styles.scoreCard}>
      <div className={styles.title}>{lessonData.lesson_and_grade}</div>
      <div className={styles.scoreCardBody}>
        <div className={styles.status}>
          Κατάσταση:{" "}
          <div className={quizCompleted ? styles.statusCompleted : ""}>
            {lessonData.score >= 60 ? "Ολοκληρώθηκε!" : "Σε εκκρεμότητα"}
          </div>
        </div>
        <div className={styles.score}>
          Καλύτερη προσπάθεια: {lessonData.score}%
        </div>
        <div className={styles.bodyBottom}>
          <div className={styles.starsContainer}>
            <Image
              src={`/images/star.png`}
              alt="star"
              className={styles.starIcon}
              width={30}
              height={30}
            />
            <div>{lessonData.stars}</div>
          </div>
          {lessonData.score >= 80 && (
            <div className={styles.medal}>
              <Image
                src={`/images/${lessonData.score >= 100 ? "medal-one" : "medal-two"}.png`}
                alt="medal"
                className={styles.medal}
                width={50}
                height={50}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
