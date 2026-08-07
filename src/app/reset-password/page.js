"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./reset-password.module.css";
import EyeIcon from "@/components/atoms/Icons/EyeIcon";
import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import PopUpInfoMessage from "@/components/templates/PopUpInfoMessage/PopUpInfoMessage";
import { QuizContext } from "@/context/AppContext";

export default function ResetPasswordPage() {
  const { ShowPopUpConfirmation, setShowPopUpConfirmation } = QuizContext();
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }
    setShowPopUpConfirmation(true);
  };

  return (
    <main className={styles.resetPasswordSection}>
      {ShowPopUpConfirmation && (
        <PopUpInfoMessage
          message="Ο κωδικός σου άλλαξε επιτυχώς!"
          redirectToHome
        />
      )}
      <h1>Νέος κωδικός</h1>

      <label className={styles.label}>
        <span className={styles.icon}>
          <EyeIcon onClick={() => setShowPassword((prev) => !prev)} />{" "}
        </span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Κωδικός"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        <span className={styles.icon}>
          <EyeIcon
            onClick={() => setShowConfirmationPassword((prev) => !prev)}
          />{" "}
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
