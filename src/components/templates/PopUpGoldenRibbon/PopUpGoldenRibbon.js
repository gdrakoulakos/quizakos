import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpGoldenRibbon.module.css";
import Image from "next/image";
import { useEffect } from "react";
import { useLaunchConfetti } from "@/customHooks";
import { motion } from "motion/react";

export default function PopUpGoldenRibbon({ setShowPopUpGoldenRibbon }) {
  const launchConfetti = useLaunchConfetti;

  useEffect(() => {
    setTimeout(() => {
      launchConfetti();
    }, 1000);
  }, []);
  return (
    <motion.div
      className={styles.popupWrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.popupContent}>
        <motion.p
          className={styles.message}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Καταπληκτικό! Κέρδισες τη Χρυσή Ροζέτα! Συγχαρητήρια!
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5, delay: 0.5 }}
        >
          <Image
            className={styles.comingSoonImage}
            src="/images/golden-ribbon-2.png"
            alt="Coming Soon"
            width={136}
            height={167}
          />
        </motion.div>

        <div className={styles.buttonContainer}>
          <ButtonOk
            onClick={() => setShowPopUpGoldenRibbon((prev) => !prev)}
            buttonText="ΟΚ"
          />
        </div>
      </div>
    </motion.div>
  );
}
