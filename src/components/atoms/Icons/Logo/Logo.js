import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export default function Logo({ link, width, height, image = "5-shadow-2" }) {
  return (
    <Link href={link} className={styles.logoContainer}>
      <Image
        src={`/images/logo/logo-${image}.png`}
        alt="Logo"
        width={width}
        height={height}
        className={styles.logo}
        loading="eager"
      />
    </Link>
  );
}
