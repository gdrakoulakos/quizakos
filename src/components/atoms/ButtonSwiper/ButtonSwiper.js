import { motion } from "motion/react";
import Image from "next/image";
import styles from "../ButtonSwiper/ButtonSwiper.module.css";

export default function ButtonSwiper({ direction, ref }) {
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

  return (
    <motion.div
      key={direction}
      {...motionProps}
      style={{ [direction]: "10px" }}
      className={styles.swiperButton}
      onClick={() => scroll(direction === "right" ? 150 : -150)}
    >
      <Image
        src={`/images/arrow-small-${direction}.png`}
        alt={`scroll to ${direction}`}
        width={30}
        height={30}
      />
    </motion.div>
  );
}
