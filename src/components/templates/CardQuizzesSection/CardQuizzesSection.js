import CardQuizzes from "@/components/organisms/CardQuizzes/CardQuizzes";
import styles from "./CardQuizzesSection.module.css";


export default function CardQuizzesSection({ currentInstitutionData }) {
  return (
    <div className={styles.cardQuizzesSection}>
      {currentInstitutionData?.map((data) => (
        <div key={data.id} className={styles.section}>
          <div key={data.id} className={styles.levelName}>
            {data.level_name}
          </div>
          {data.grades.map((grade) => (
            <CardQuizzes grades={grade} key={grade.id} />
          ))}
        </div>
      ))}
    </div>
  );
}
