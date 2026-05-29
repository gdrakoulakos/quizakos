import styles from "./ButtonNext.module.css";
import { motion } from "motion/react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export default function ButtonNext({ onClick }) {
  return (
    <motion.div
      key="next"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={styles.buttonContainer}
      onClick={onClick}
    >
      <ArrowForwardIosRoundedIcon className={styles.buttonImage} />
    </motion.div>
  );
}
