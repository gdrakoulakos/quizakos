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

    const container = ref.current;

    const checkIfCardsFit = () => {
      const cardsFitInContainer =
        container.scrollWidth <= container.clientWidth;

      if (cardsFitInContainer) {
        setShowSwiper({ left: false, right: false });
        setContainerClass(styles.alignCenter);
      } else {
        setContainerClass("");
        setShowSwiper({ left: false, right: true });
      }
    };

    checkIfCardsFit();

    const resizeObserver = new ResizeObserver(() => {
      checkIfCardsFit();
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;

    const updateSwiper = () => {
      const fits = container.scrollWidth <= container.clientWidth;

      if (fits) {
        setContainerClass(styles.alignCenter);
        setShowSwiper({ left: false, right: false });
      } else {
        setContainerClass("");

        const current = container.scrollLeft;
        const max = container.scrollWidth - container.clientWidth;

        if (current <= 0) {
          setShowSwiper({ left: false, right: true });
        } else if (Math.ceil(current) >= max) {
          setShowSwiper({ left: true, right: false });
        } else {
          setShowSwiper({ left: true, right: true });
        }
      }
    };

    updateSwiper();

    const resizeObserver = new ResizeObserver(updateSwiper);
    resizeObserver.observe(container);

    container.addEventListener("scroll", updateSwiper);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener("scroll", updateSwiper);
    };
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
