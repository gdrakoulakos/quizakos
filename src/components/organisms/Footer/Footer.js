import Link from "next/link";
import styles from "../Footer/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footerSection}>
      <p className={styles.copyRights}>
        © {new Date().getFullYear()} Γιώργος Δρακουλάκος <br /> Με επιφύλαξη
        παντός δικαιώματος
      </p>
      <Link href={"/privacyPolicy"} className={styles.privacyPolicy}>
        Πολιτική Απορρήτου
      </Link>
    </footer>
  );
}
