import styles from "./ButtonNext.module.css";
import { motion } from "motion/react";
import Image from "next/image";

export default function ButtonNext({ buttonText, onClick }) {
  return (
    <motion.div
      key={buttonText}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={styles.buttonContainer}
      onClick={onClick}
    >
      <Image
        src={"/images/next.svg"}
        alt="next question"
        width={50}
        height={50}
        className={styles.buttonImage}
      />
      <div className={styles.buttonText}>{buttonText}</div>
    </motion.div>
  );
}
