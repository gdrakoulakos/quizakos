import Image from "next/image";
import styles from "./Award.module.css";

export default function Award({ awardData }) {
  const goldenRibbon = awardData.awardName === "goldenRibbon";
  console.log("goldenRibbon", goldenRibbon);

  return (
    <Image
      src={`/images/${awardData.img}.png`}
      alt="medal"
      className={`${styles.award} ${goldenRibbon ? styles.awardLarge : ""}`}
      width={100}
      height={60}
      //   onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
    />
  );
}
