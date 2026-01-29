import CardQuiz from "@/components/molecules/CardQuiz/CardQuiz";
import styles from "../CardQuizzes/CardQuizzes.module.css";
import { QuizContext } from "@/context/AppContext";
import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import ButtonSwiper from "@/components/atoms/ButtonSwiper/ButtonSwiper";

export default function CardQuizzes({ grade }) {
  const { defaultLessonsData, currentInstitutionData } = QuizContext();

  const quiz = currentInstitutionData?.lessons?.filter(
    (q) => q.grade_name === grade,
  );
  const ref = useRef(null);
  const [showSwiper, setShowSwiper] = useState({ left: false, right: true });

  return (
    <>
      <h1 className={styles.grade}>{grade}</h1>
      <div className={styles.cardsContainer} ref={ref}>
        {quiz.map((card) => (
          <CardQuiz
            key={card.lesson_id}
            id={card.lesson_id}
            lesson={card.lesson_name}
            description={card.quiz_description}
            imgQuiz={card.imgCard}
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
