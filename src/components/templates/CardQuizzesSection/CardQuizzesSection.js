import CardQuizzes from "@/components/organisms/CardQuizzes/CardQuizzes";
import styles from "./CardQuizzesSection.module.css";
import LoadingSpinner from "@/components/organisms/LoadingSpinner/LoadingSpinner";

export default function CardQuizzesSection({ currentInstitutionData }) {
  return (
    <div className={styles.cardQuizzesSection}>
      {currentInstitutionData.length === 0 ? (
        <LoadingSpinner show={true} message="Φόρτωση quiz..." />
      ) : (
        currentInstitutionData?.map((data) => (
          <div key={data.id} className={styles.section}>
            <div key={data.id} className={styles.levelName}>
              {data.level_name}
            </div>
            {data.grades.map((grade) => (
              <CardQuizzes grades={grade} key={grade.id} />
            ))}
          </div>
        ))
      )}
    </div>
  );
}
