import Image from "next/image";
import styles from "./Award.module.css";

export default function Award({ awardImg }) {
  return (
    <Image
      src={`/images/${awardImg}.png`}
      alt="medal"
      className={styles.medal}
      width={60}
      height={60}
      //   onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
    />
  );
}
