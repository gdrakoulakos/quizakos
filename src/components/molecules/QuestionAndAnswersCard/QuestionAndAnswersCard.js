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
        <ButtonAnswer children="Είναι το σύνολο των κανόνων ώστε οι νότες να αρμόζουν (ταιριάζουν) όταν ακούγονται ταυτόχρονα" />
        <ButtonAnswer children="Oι νότες να αρμόζουν" />
        <ButtonAnswer children="Oι νότες να αρμόζουν (ταιριάζουν) όταν ακούγονται ξεχωριστά η μία μετά την άλλη" />
        <ButtonAnswer children="Είναι το σύνολο των κανόνων ώστε οι νότες να αρμόζουν (ταιριάζουν) όταν ακούγονται ξεχωριστά η μία μετά την άλλη" />
      </div>
    </div>
  );
}
