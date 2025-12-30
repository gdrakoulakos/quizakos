import styles from "../Footer/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} George Drakoulakos. All Rights Reserved.
      </p>
    </footer>
  );
}
