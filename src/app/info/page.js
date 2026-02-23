"use client";
import styles from "./info.module.css";
import { motion } from "motion/react";

export default function info() {
  return (
    <motion.div
      className={styles.infoSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Πληροφορίες</h1>
      <div className={styles.infoBody}>
        <p>
          Το Quizakos είναι μια πλατφόρμα που δημιουργήθηκε με στόχο να φέρει τα
          παιδιά του Δημοτικού και των Ωδείων πιο κοντά στη μάθηση μέσα από το
          παιχνίδι.
        </p>
        <p>
          Με διαδραστικά quizzes, το παιδί μαθαίνει και επαναλαμβάνει την ύλη με
          έναν ευχάριστο και ξεκούραστο τρόπο.
        </p>
        <p>
          Τα quizzes περιλαμβάνουν ερωτήσεις από όλα τα βασικά μαθήματα του
          Δημοτικού, καθώς και από τα θεωρητικά μαθήματα του Ωδείου, βοηθώντας
          το παιδί να εξασκηθεί, να ελέγξει τις γνώσεις του και να αποκτήσει
          αυτοπεποίθηση.
        </p>
        <p>
          Το περιεχόμενο είναι σχεδιασμένο ειδικά για παιδιά, χωρίς ακατάλληλο
          υλικό ή διαφημίσεις, προσφέροντας ένα ασφαλές και φιλικό περιβάλλον
          μάθησης. Νέες ερωτήσεις προστίθενται τακτικά.
        </p>
        <p>
          Αν έχετε οποιαδήποτε απορία ή θέλετε να επικοινωνήσετε με τον Quizako
          😊, μπορείτε να στείλετε email στο <strong>quizakos@gmail.com</strong>
          .
        </p>
        <p className={styles.copyRights}>
          {new Date().getFullYear()} George Drakoulakos <br /> All Rights
          Reserved
        </p>
      </div>
    </motion.div>
  );
}
