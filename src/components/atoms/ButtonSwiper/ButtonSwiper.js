import { motion } from "motion/react";
import Image from "next/image";
import styles from "../ButtonSwiper/ButtonSwiper.module.css";

export default function ButtonSwiper({ direction, onClick }) {
  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  };

  return (
    <motion.div
      key={direction}
      {...motionProps}
      style={{ [direction]: "10px" }}
      className={styles.swiperButton}
    >
      <Image
        src={`/images/arrow-small-${direction}.png`}
        alt={`scroll to ${direction}`}
        width={30}
        height={30}
        onClick={onClick}
      />
    </motion.div>
  );
}
