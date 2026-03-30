import Image from "next/image";
import styles from "./Award.module.css";
import { QuizContext } from "@/context/AppContext";

export default function Award({ awardData, width }) {
  const { setShowPopUpAwardsInfo } = QuizContext();

  return (
    <div className={styles.awardContainer}>
      {awardData.count > 1 && (
        <div className={styles.awardCounter}>{awardData.count}</div>
      )}
      <Image
        src={`/images/${awardData.img}.png`}
        alt="medal"
        className={styles.award}
        style={width ? { width: width } : null}
        width={100}
        height={60}
        onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
      />
    </div>
  );
}
