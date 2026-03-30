import CardQuiz from "@/components/molecules/CardQuiz/CardQuiz";
import styles from "../CardQuizzes/CardQuizzes.module.css";
import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import ButtonSwiper from "@/components/atoms/ButtonSwiper/ButtonSwiper";
import { useIsDesktop } from "@/customHooks";

export default function CardQuizzes({ grades }) {
  const ref = useRef(null);
  const [showSwiper, setShowSwiper] = useState({ left: false, right: true });
  const sortedLessons = grades?.lessons.sort((a, b) => a.id - b.id);
  const lessThanThreeLessons = sortedLessons.length < 3;
  const isDesktop = useIsDesktop();

  const containerClass = !isDesktop
    ? lessThanThreeLessons
      ? styles.mobileAndLessThanThreeLessons
      : styles.mobileAndMoreThanTwoLessons
    : styles.desktop;

  return (
    <>
      <h1 className={styles.grade}>{grades.grade_name}</h1>
      <div className={`${styles.cardsContainer} ${containerClass}`} ref={ref}>
        {sortedLessons.map((lesson) => (
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

        {sortedLessons.length > 2 && (
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
