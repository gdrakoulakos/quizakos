import styles from "./QuestionAndAnswersCard.module.css";
import QuizQuestion from "@/components/atoms/QuizQuestion/QuizQuestion";
import ButtonAnswer from "@/components/atoms/ButtonAnswer/ButtonAnswer";
import QuestionImage from "@/components/atoms/QuestionImage/QuestionImage";

export default function QuestionAndAnswersCard() {
  return (
    <div className={styles.section}>
      <div className={styles.questionContainer}>
        <QuestionImage />
        <QuizQuestion />
      </div>
      <div className={styles.answersContainer}>
        <ButtonAnswer children="Λα" />
        <ButtonAnswer children="Ντο" />
        <ButtonAnswer children="Σι" />
        <ButtonAnswer children="Ρε" />
      </div>
    </div>
  );
}
