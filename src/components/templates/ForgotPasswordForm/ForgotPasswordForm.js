import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./ForgotPasswordForm.module.css";
import { resetPassword } from "@/services/authService";
import { useState } from "react";
import { QuizContext } from "@/context/AppContext";

export default function ForgotPasswordForm({
  setValidationMessage,
  setShowPopUpInfoMessage,
  setIsForgotPasswordClicked,
}) {
  const { setLoadingSpinner } = QuizContext();
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    try {
      setLoadingSpinner({
        show: true,
        isFullScreen: true,
        message: "Έναρξη διαδικασίας αλλαγής κωδικού...",
      });
      await resetPassword(email);
      setValidationMessage(
        "Σχεδόν έτοιμο! 🎉 Αν το email είναι καταχωρημένο, θα σου στείλουμε ένα link για να αλλάξεις τον κωδικό σου. Έλεγξε τα εισερχόμενά σου!",
      );
      setShowPopUpInfoMessage(true);
    } catch (error) {
      if (error?.message === "email rate limit exceeded") {
        setValidationMessage(
          "Δεν ήταν δυνατή η αποστολή του email αυτή τη στιγμή, επειδή έχει προσωρινά περιοριστεί η αποστολή email. Παρακαλώ δοκίμασε ξανά αργότερα.",
        );
        setShowPopUpInfoMessage(true);
        return;
      }
      setValidationMessage(error.message);
      setShowPopUpInfoMessage(true);
    } finally {
      setLoadingSpinner({ show: false });
    }
  };

  return (
    <div className={styles.forgotPasswordFormSection}>
      <h1> Επαναφορά κωδικού</h1>
      <label className={styles.label}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <ButtonOk
        onClick={handleResetPassword}
        buttonText="Αποστολή email αλλαγής κωδικού"
      />
      <p
        onClick={() => setIsForgotPasswordClicked(false)}
        className={styles.clickableText}
      >
        Επιστροφή
      </p>
    </div>
  );
}
