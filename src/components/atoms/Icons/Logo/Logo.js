import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo({ link }) {
  return (
    <Link href={link} className={styles.logoContainer}>
      <Image
        src="/images/logo/logo-5-shadow.png"
        alt="Logo"
        width={135}
        height={40}
        className={styles.logo}
      />
    </Link>
  );
}
