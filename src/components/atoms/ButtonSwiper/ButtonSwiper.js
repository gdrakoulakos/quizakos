import { motion } from "motion/react";
import Image from "next/image";
import styles from "../ButtonSwiper/ButtonSwiper.module.css";
import { useEffect } from "react";

export default function ButtonSwiper({
  direction,
  ref,
  showSwiper,
  setShowSwiper,
}) {
  const motionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
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
    >
      <Image
        src={`/images/arrow-small-${direction}.png`}
        alt={`scroll to ${direction}`}
        width={30}
        height={30}
        onClick={() => scroll(direction === "right" ? 150 : -150)}
      />
    </motion.div>
  );
}
