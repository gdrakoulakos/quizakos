import styles from "./PopUpAwardsInfo.module.css";
import { QuizContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import Award from "@/components/atoms/Award/Award";

export default function PopUpAwardsInfo() {
  const { showPopUpAwardsInfo, setShowPopUpAwardsInfo } = QuizContext();

  const awardsData = [
    {
      img: "star-6",
      text: "Για κάθε σωστή απάντηση, κερδίζεις 10 αστέρια!",
    },
    {
      img: "book-completed",
      text: "Αν απαντήσεις σωστά στο 60% των ερωτήσεων (3 στις 5 ή 6 στις 10), κερδίζεις ένα βιβλίο!",
    },
    {
      img: "silver-medal",
      text: "Αν απαντήσεις σωστά στο 80% των ερωτήσεων (4 στις 5 ή 8 στις 10), κερδίζεις ένα ασημένιο μετάλλιο!",
    },
    {
      img: "gold-medal",
      text: "Αν απαντήσεις σωστά στο 100% των ερωτήσεων (5 στις 5 ή 10 στις 10), κερδίζεις ένα χρυσό μετάλλιο!",
    },
    {
      img: "golden-ribbon-2",
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
              {awardsData.map((awardData, index) => (
                <div key={index} className={styles.awardContainer}>
                  <Award awardData={awardData} />
                  <p>{awardData.text}</p>
                </div>
              ))}
            </div>
            <h4 className={styles.collectThemAll}>Κέρδισέ τα όλα! </h4>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
