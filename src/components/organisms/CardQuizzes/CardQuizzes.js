import CardQuiz from "@/components/molecules/CardQuiz/CardQuiz";
import styles from "../CardQuizzes/CardQuizzes.module.css";
import { QuizContext } from "@/context/AppContext";
import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import ButtonSwiper from "@/components/atoms/ButtonSwiper/ButtonSwiper";

export default function CardQuizzes({ category }) {
  const { defaultQuizCategoriesData } = QuizContext();
  const quiz = defaultQuizCategoriesData.filter((q) => q.category === category);
  const ref = useRef(null);
  const [showSwiper, setShowSwiper] = useState({ left: false, right: true });

  return (
    <>
      <h1 className={styles.category}>{category}</h1>
      <div className={styles.cardsContainer} ref={ref}>
        {quiz.map((card) => (
          <CardQuiz
            key={card.quiz_category_id}
            id={card.quiz_category_id}
            quizCategory={card.category}
            name={card.subcategory}
            description={card.quiz_description}
            imgQuiz={card.imgQuiz}
          />
        ))}
        {quiz.length > 2 && (
          <AnimatePresence mode="sync">
            {showSwiper.left && (
              <ButtonSwiper
                key="swiper-left"
                direction={"left"}
                ref={ref}
                setShowSwiper={setShowSwiper}
              />
            )}
            {showSwiper.right && (
              <ButtonSwiper
                key="swiper-right"
                direction={"right"}
                ref={ref}
                setShowSwiper={setShowSwiper}
              />
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  );
}
