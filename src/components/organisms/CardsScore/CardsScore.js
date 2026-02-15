import CardScore from "@/components/molecules/CardScore/CardScore";
import styles from "./CardsScore.module.css";
import { QuizContext } from "@/context/AppContext";

export default function CardsScore({}) {
  const { userProgressData } = QuizContext();

  const sortedUserProgressData = userProgressData.sort(
    (a, b) => a.lesson_id - b.lesson_id,
  );

  return (
    <div className={styles.scoreCards}>
      {sortedUserProgressData.map((lessonData) => (
        <CardScore lessonData={lessonData} key={lessonData.lesson_id} />
      ))}
    </div>
  );
}
