import Image from "next/image";
import styles from "./QuestionImage.module.css";

export default function QuestionImage() {
  return (
    <Image
      src={`/images/questions/music/note1.png`}
      alt="question image"
      className={styles.questionImage}
      width={240}
      height={120}
    />
  );
}
