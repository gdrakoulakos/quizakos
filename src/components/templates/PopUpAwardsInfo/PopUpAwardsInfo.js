import Image from "next/image";
import styles from "./PopUpAwardsInfo.module.css";
import { QuizContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "motion/react";

export default function PopUpAwardsInfo() {
  const { showPopUpAwardsInfo, setShowPopUpAwardsInfo } = QuizContext();

  const awardsData = [
    {
      name: "red-book-completed-shadow",
      text: "Αν απαντήσεις σωστά στο 60% των ερωτήσεων (3 στις 5 ή 6 στις 10), κερδίζεις ένα βιβλίο!",
    },
    {
      name: "medal-two-shadow",
      text: "Αν απαντήσεις σωστά στο 80% των ερωτήσεων (4 στις 5 ή 8 στις 10), κερδίζεις ένα ασημένιο μετάλλιο!",
    },
    {
      name: "medal-one-shadow",
      text: "Αν απαντήσεις σωστά στο 100% των ερωτήσεων (5 στις 5 ή 10 στις 10), κερδίζεις ένα χρυσό μετάλλιο!",
    },
    {
      name: "golden-ribbon-shadow",
      text: "Αν μαζέψεις 1000 αστέρια και κερδίσεις τουλάχιστον 1 χρυσό μετάλλιο, κερδίζεις την Χρυσή Ροζέτα!",
    },
  ];

  return (
    <AnimatePresence mode="wait">
      {showPopUpAwardsInfo && (
        <div
          key="popUpAwardsInfoWrapper"
          className={styles.popUpAwardsInfoWrapper}
          onClick={() => setShowPopUpAwardsInfo((prev) => !prev)}
        >
          <motion.div
            className={styles.popUpAwardsInfoContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className={styles.closeButton}
              onClick={(e) => {
                e.stopPropagation();
                setShowPopUpAwardsInfo((prev) => !prev);
              }}
            >
              ×
            </button>
            <h1>🏆 Βραβεία</h1>
            <h3>Απάντησε σωστά και κέρδισε βραβεία!</h3>
            <div className={styles.allAwards}>
              {awardsData.map((award, index) => (
                <div key={index} className={styles.awardContainer}>
                  <Image
                    src={`/images/${award.name}.png`}
                    alt={award.name}
                    width={50}
                    height={50}
                  />
                  <p>{award.text}</p>
                </div>
              ))}

              <div className={styles.starContainer}>
                <Image
                  src={`/images/star-shadow.png`}
                  alt="star"
                  className={styles.starIcon}
                  width={50}
                  height={50}
                />
                <div className={styles.starTextContainer}>
                  <p>Κάθε σωστή απάντηση σε γεμίζει με αστέρια: </p>
                  <ul>
                    <li>
                      Στα κουίζ με 10 ερωτήσεις, παίρνεις 10 αστέρια για κάθε
                      σωστή απάντηση!{" "}
                    </li>{" "}
                    <li>
                      Στα κουίζ με 5 ερωτήσεις, παίρνεις 20 αστέρια για κάθε
                      σωστή απάντηση!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <h4 className={styles.collectThemAll}>Κέρδισέ τα όλα! </h4>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
