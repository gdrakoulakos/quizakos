import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Theory</Link>
            </li>
            <li>
              <Link href="/">History</Link>
            </li>
            <li>
              <Link href="/">Instruments</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <p>This is the body</p>
      </main>
      <footer className={styles.footer}>
        <p>This is the footer</p>
      </footer>
    </div>
  );
}
