import CardQuiz from "@/components/molecules/CardQuiz/CardQuiz";
import styles from "../Quizzes/Quizzes.module.css";
import { QuizContext } from "@/context/AppContext";

export default function Quizzes({ category }) {
  const { allQuizzes } = QuizContext();
  const quiz = allQuizzes.filter((q) => q.category === category);
  return (
    <>
      <h1>{category}</h1>
      <div className={styles.cardsContainer}>
        {quiz.map((card) => (
          <CardQuiz
            key={card.id}
            id={card.id}
            quizCategory={card.quizCategory}
            name={card.subcategory}
            description={card.description}
          />
        ))}
      </div>
    </>
  );
}
