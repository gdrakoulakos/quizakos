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
      text: "Αν απαντήσεις σωστά σε όλες τις ερωτήσεις, κερδίζεις ένα χρυσό μετάλλιο και παίρνεις επιπλέον 50 αστέρια!",
    },
    {
      img: "golden-ribbon-3",
      text: "Συγκέντρωσε 1000 αστέρια και κέρδισε τουλάχιστον 1 χρυσό μετάλλιο για να ξεκλειδώσεις τη Χρυσή Ροζέτα!",
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
            <h1>Βραβεία</h1>
            <h3>Απάντησε σωστά και κέρδισε:</h3>
            <div className={styles.allAwards}>
              {awardsData.map((awardData, index) => (
                <div key={index} className={styles.awardContainer}>
                  <Award
                    awardData={awardData}
                    width={awardData.img === "golden-ribbon-3" ? 60 : undefined}
                    isGoldenRibbon={awardData.img === "golden-ribbon-3"}
                  />
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
