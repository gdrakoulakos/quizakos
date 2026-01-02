import CardQuiz from "@/components/molecules/CardQuiz/CardQuiz";
import styles from "../CardQuizzes/CardQuizzes.module.css";
import { QuizContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function CardQuizzes({ category }) {
  const { allQuizzes } = QuizContext();
  const quiz = allQuizzes.filter((q) => q.category === category);
  const ref = useRef(null);
  const [showSwiper, setShowSwiper] = useState({ left: false, right: true });

  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  const scroll = (scrollOffset) => {
    ref.current.scrollBy({
      left: scrollOffset,
      behavior: "smooth",
    });
  };

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
  }, [showSwiper]);

  return (
    <>
      <h1 className={styles.category}>{category}</h1>
      <div className={styles.cardsContainer} ref={ref}>
        {quiz.map((card) => (
          <CardQuiz
            key={card.id}
            id={card.id}
            quizCategory={card.quizCategory}
            name={card.subcategory}
            description={card.description}
            imgQuiz={card.imgQuiz}
          />
        ))}
        {quiz.length > 2 && (
          <>
            <AnimatePresence mode="sync">
              {showSwiper.left && (
                <motion.div key="left-arrow" {...motionProps}>
                  <Image
                    className={styles.swiperLeft}
                    src={"/images/arrow-small-left.png"}
                    alt="scroll to left"
                    width={30}
                    height={30}
                    onClick={() => scroll(-150)}
                  />
                </motion.div>
              )}
              {showSwiper.right && (
                <motion.div key="right-arrow" {...motionProps}>
                  <Image
                    className={styles.swiperRight}
                    src={"/images/arrow-small-right.png"}
                    alt="scroll to right"
                    width={30}
                    height={30}
                    onClick={() => scroll(150)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </>
  );
}
