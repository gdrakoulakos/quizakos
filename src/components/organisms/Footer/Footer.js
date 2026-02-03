import styles from "../Footer/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        © {new Date().getFullYear()} George Drakoulakos. All Rights Reserved.
      </p>
    </footer>
  );
}
