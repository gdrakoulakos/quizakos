"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./reset-password.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import PopUpInfoMessage from "@/components/templates/PopUpInfoMessage/PopUpInfoMessage";
import { QuizContext } from "@/context/AppContext";
import { validateSignUp } from "@/utils/validation";

export default function ResetPasswordPage() {
  const {
    validationMessage,
    setValidationMessage,
    showPopUpInfoMessage,
    setShowPopUpInfoMessage,
    setLoadingSpinner,
  } = QuizContext();
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const updatePassword = async () => {
    setLoadingSpinner({
      show: true,
      isFullScreen: true,
      message: "Αλλαγή κωδικού σε εξέλιξη...",
    });
    try {
      const validationErrors = validateSignUp({ password });
      const firstError = Object.values(validationErrors)[1];

      if (firstError) {
        setValidationMessage(firstError);
        setShowPopUpInfoMessage(true);
        return;
      }
      if (password !== confirmationPassword) {
        setValidationMessage("Οι κωδικοί δεν ταιριάζουν.");
        setShowPopUpInfoMessage(true);
        return;
      }
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        setValidationMessage(error.message);
        setShowPopUpInfoMessage(true);
        return;
      }
      setValidationMessage("Ο κωδικός σου άλλαξε με επιτυχία! 🎉");
      setShowPopUpInfoMessage(true);
    } catch (error) {
      console.error("Unexpected signup error:", error);
      setValidationMessage("Παρουσιάστηκε ένα απρόσμενο σφάλμα.");
      setShowPopUpInfoMessage(true);
    } finally {
      setLoadingSpinner({ show: false });
    }
  };

  return (
    <main className={styles.resetPasswordSection}>
      {showPopUpInfoMessage && (
        <PopUpInfoMessage
          message={validationMessage}
          redirectToHome={
            validationMessage === "Ο κωδικός σου άλλαξε με επιτυχία! 🎉"
          }
        />
      )}
      <h1>Νέος κωδικός</h1>

      <label className={styles.label}>
        <span
          className={styles.icon}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Κωδικός"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        <span
          className={styles.icon}
          onClick={() => setShowConfirmationPassword((prev) => !prev)}
        >
          {showConfirmationPassword ? (
            <VisibilityIcon />
          ) : (
            <VisibilityOffIcon />
          )}
        </span>
        <input
          type={showConfirmationPassword ? "text" : "password"}
          placeholder="Επιβεβαίωση Κωδικού"
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
        />
      </label>

      <ButtonOk onClick={updatePassword} buttonText="Αλλαγή κωδικού" />
    </main>
  );
}
