import CardQuiz from "@/components/molecules/CardQuiz/CardQuiz";
import styles from "../CardQuizzes/CardQuizzes.module.css";
import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import ButtonSwiper from "@/components/atoms/ButtonSwiper/ButtonSwiper";

export default function CardQuizzes({ grades }) {
  const ref = useRef(null);
  const [showSwiper, setShowSwiper] = useState({ left: false, right: true });

  return (
    <>
      <h1 className={styles.grade}>{grades.grade_name}</h1>
      <div className={styles.cardsContainer} ref={ref}>
        {grades.lessons.map((lesson) => (
          <div key={lesson.id}>
            <CardQuiz
              key={lesson.id}
              id={lesson.id}
              lesson={lesson.lesson_name}
              description={lesson.quiz_description}
              imgQuiz={lesson.imgCard}
              totalQuestions={grades.total_questions}
            />
          </div>
        ))}

        {grades.lessons.length > 2 && (
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
