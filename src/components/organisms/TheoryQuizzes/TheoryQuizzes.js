import CardQuiz from "@/components/molecules/CardQuiz/CardQuiz";
import notationAndStructure from "../../../data/quizQuestions/theory/notationAndStructure";
import chordsAndHarmony from "../../../data/quizQuestions/theory/chordsAndHarmony";
import styles from "../TheoryQuizzes/TheoryQuizzes.module.css";

export default function NotationAndStructure() {
  return (
    <div className={styles.allQuizContainer}>
      <h1>{notationAndStructure.category}</h1>
      <div className={styles.cardsContainer}>
        <CardQuiz
          data={notationAndStructure}
          name={notationAndStructure.subcategory}
          description={notationAndStructure.description}
        />
        <CardQuiz
          data={chordsAndHarmony}
          name={chordsAndHarmony.subcategory}
          description={chordsAndHarmony.description}
        />
      </div>

      {/* {cardQuizData.categories.map((category) => (
        <div key={category.id} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category.name}</h2>
          <div className={styles.quizContainer}>
            {category.quizzes.map((quiz) => (
              <CardQuiz
                key={quiz.id}
                quizName={quiz.name}
                quizDescription={quiz.description}
              />
            ))}
          </div>
        </div>
      ))} */}
    </div>
  );
}
