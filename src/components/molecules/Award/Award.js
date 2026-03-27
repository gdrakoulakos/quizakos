import Image from "next/image";
import styles from "./Award.module.css";
import { QuizContext } from "@/context/AppContext";

export default function Award({ awardData }) {
  const { setShowPopUpAwardsInfo } = QuizContext();

  const goldenRibbon = awardData.awardName === "goldenRibbon";

  return (
    <Image
      src={`/images/${awardData.img}.png`}
      alt="medal"
      className={`${styles.award} ${goldenRibbon ? styles.goldenRibbonAward : ""}`}
      width={100}
      height={60}
      onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
    />
  );
}
