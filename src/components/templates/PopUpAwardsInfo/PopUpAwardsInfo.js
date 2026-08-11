import styles from "./PopUpAwardsInfo.module.css";
import { QuizContext } from "@/context/AppContext";
import { motion, AnimatePresence } from "motion/react";
import Award from "@/components/atoms/Award/Award";

export default function PopUpAwardsInfo() {
  const { showPopUpAwardsInfo, setShowPopUpAwardsInfo, awardsData } =
    QuizContext();

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
                    width={
                      awardData.img === "golden-ribbon-3-tinypng"
                        ? 60
                        : undefined
                    }
                    isGoldenRibbon={awardData.img === "golden-ribbon-3-tinypng"}
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
