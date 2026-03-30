import CardQuiz from "@/components/molecules/CardQuiz/CardQuiz";
import styles from "../CardQuizzes/CardQuizzes.module.css";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import ButtonSwiper from "@/components/atoms/ButtonSwiper/ButtonSwiper";
export default function CardQuizzes({ grades }) {
  const ref = useRef(null);
  const [showSwiper, setShowSwiper] = useState({ left: false, right: true });
  const [containerClass, setContainerClass] = useState("");
  const sortedLessons = grades?.lessons.sort((a, b) => a.id - b.id);

  useEffect(() => {
    if (!ref.current) return;
    const cardsFitInContainer =
      ref.current.scrollWidth - ref.current.clientWidth === 0;

    if (cardsFitInContainer) {
      setShowSwiper({ left: false, right: false });
      setContainerClass(styles.alignCenter);
    }
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;

    const handleScroll = () => {
      const current = container.scrollLeft;
      const max = container.scrollWidth - container.clientWidth;

      if (current <= 0) {
        setTimeout(() => {
          setShowSwiper({ left: false, right: true });
        }, 200);
      } else if (Math.ceil(current) >= max) {
        setTimeout(() => {
          setShowSwiper({ left: true, right: false });
        }, 200);
      } else {
        setTimeout(() => {
          setShowSwiper({ left: true, right: true });
        }, 200);
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

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
