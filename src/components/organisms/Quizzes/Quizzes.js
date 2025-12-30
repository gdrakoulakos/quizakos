import CardQuiz from "@/components/molecules/CardQuiz/CardQuiz";
import styles from "../Quizzes/Quizzes.module.css";
import { QuizContext } from "@/context/AppContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Quizzes({ category }) {
  const { allQuizzes } = QuizContext();
  const quiz = allQuizzes.filter((q) => q.category === category);
  const ref = useRef(null);
  const [showSwiper, setShowSwiper] = useState({ left: false, right: true });

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

      if (current === 0) {
        setShowSwiper({ left: false, right: true });
      } else if (Math.ceil(current) >= max) {
        setShowSwiper({ left: true, right: false });
      } else {
        setShowSwiper({ left: true, right: true });
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
            {showSwiper.left && (
              <Image
                className={styles.swiperLeft}
                src={"/images/arrow-small-left.png"}
                alt="question image"
                width={30}
                height={30}
                onClick={() => scroll(-150)}
              />
            )}
            {showSwiper.right && (
              <Image
                className={styles.swiperRight}
                src={"/images/arrow-small-right.png"}
                alt="question image"
                width={30}
                height={30}
                onClick={() => scroll(150)}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
