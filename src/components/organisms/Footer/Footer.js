import styles from "../Footer/Footer.module.css";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        © {new Date().getFullYear()} George Drakoulakos. All Rights Reserved.
      </motion.p>
    </footer>
  );
}
