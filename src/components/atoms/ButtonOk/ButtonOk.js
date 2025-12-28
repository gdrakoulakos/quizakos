import Link from "next/link";
import styles from "./ButtonOk.module.css";

export default function ButtonOk({ buttonText, onClick }) {
  return (
    <Link href="/" className={styles.okButton} onClick={onClick}>
      {buttonText}
    </Link>
  );
}
